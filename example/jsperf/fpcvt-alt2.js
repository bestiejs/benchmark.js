



/*
Performance Test of encode_fp_value() vs. vanilla JS:

Test                                    Ops/sec

Classic : toString                      17,729
                                        ±2.01%
                                        17% slower

Classic : add to string (= '' + val)    21,278
                                        ±1.93%
                                        fastest

Classic :: toPrecision(max)             1,763
                                        ±0.22%
                                        92% slower

Custom :: v1                            2,191
                                        ±1.14%
                                        90% slower
*/


function encode_fp_value3(flt) {
  // sample JS code to encode a IEEE754 floating point value in a Unicode string.
  //
  // With provision to detect and store +0/-0 and +/-Inf and NaN
  //
  //
  // Post Scriptum: encoding a fp number like this takes 1-5 Unicode characters
  // (if we also encode mantissa length in the power character) so it MIGHT
  // be better to provide a separate encoding for when the fp value can be printed
  // in less bytes -- and then then there are the integers and decimal fractions
  // used often by humans: multiply by 1K or 1M and you get another series of
  // integers, most of the time!
  // modulo: we can use 0x8000 or any lower power of 2 to prevent producing illegal Unicode
  // sequences (the extra Unicode pages are triggered by a set of codes in the upper range
  // which we cannot create this way, so no unicode verifiers will ever catch us for being
  // illegal now!)
  //
  // WARNING: the exponent is not exactly 12 bits when you look at the Math.log2()
  //          output, as there are these near-zero values to consider up to exponent
  //          -1074 (-1074 + 52 = -1022 ;-) ) a.k.a. "denormalized zeroes":
  //
  //              Math.log2(Math.pow(2,-1074)) === -1074
  //              Math.log2(Math.pow(2,-1075)) === -Infinity
  //
  //              Math.pow(2,1023) * Math.pow(2,-1073) === 8.881784197001252e-16
  //              Math.pow(2,1023) * Math.pow(2,-1074) === 4.440892098500626e-16
  //              Math.pow(2,1023) * Math.pow(2,-1075) === 0
  //              Math.pow(2,1023) * Math.pow(2,-1076) === 0
  //

  if (!flt) {
    // +0, -0 or NaN:
    if (isNaN(flt)) {
      return String.fromCharCode(FPC_ENC_NAN);
    } else {
      // detect negative zero:
      var is_negzero = Math.atan2(0, flt);  // +0 --> 0, -0 --> PI
      if (is_negzero) {
        return String.fromCharCode(FPC_ENC_NEGATIVE_ZERO);
      } else {
        return String.fromCharCode(FPC_ENC_POSITIVE_ZERO);
      }
    }
  } else if (isFinite(flt)) {
    // encode sign in bit 12
    var s;
    if (flt < 0) {
      s = 4096;
      flt = -flt;
    } else {
      s = 0;
    }

    // extract power from fp value    (WARNING: MSIE does not support log2(), see MDN!)
    var exp2 = Math.log2(flt);
    var p = exp2 | 0;  // --> +1023..-1024, pardon!, -1074 (!!!)
    if (p < -1024) {
      // Correct for our process: we actually want the bits in the IEE754 exponent, hence
      // exponents lower than -1024, a.k.a. *denormalized zeroes*, are treated exactly
      // like that in our code as well: we will produce leading mantissa ZERO words then.
      p = -1024;
    } else {
      // Note:
      // We encode a certain range and type of values specially as that will deliver shorter Unicode
      // sequences: 'human' values like `4200` and `0.125` (1/8th) are almost always
      // not encoded *exactly* in IEE754 floats due to their base(2) storage nature.
      //
      // Here we detect quickly if the mantissa would span at most 3 decimal digits
      // and the exponent happens to be within reasonable range: when this is the
      // case, we encode them as a *decimal short float* in 13 bits, which happen
      // to fit snugly in the unicode word range 0x8000..0xC000 or in a larger
      // *decimal float* which spans two words: 13+15 bits.
      var dp = (exp2 * FPC_ENC_LOG2_TO_LOG10 + 1) | 0;
      var dy = flt / Math.pow(10, dp - 3);    // take mantissa (which is guaranteed to be in range [0.999 .. 0]) and multiply by 1000
      //console.log('decimal float test:', flt, exp2, exp2 * FPC_ENC_LOG2_TO_LOG10, p, dp, dy);

      // fist check exponent, only when in range perform the costly modulo operation
      // and comparison to further check conditions suitable for short float encoding.
      //
      // `dy < 1024` is not required, theoretically, but here as a precaution:
      if (dp >= -2 && dp <= 7 /* && dy < 1024 */) {
        var chk = dy % 1;
        //console.log('decimal float eligible? A:', flt, dy, chk, dp);
        if (chk === 0) {                     // alt check:   `(dy | 0) === dy`
          // this input value is potentially eligible for 'short decimal float encoding'...
          //
          // *short* decimal floats take 13-14 bits (10+~4) at 0x8000..0xCFFF as
          // short floats have exponent -3..+5 in $1000 0sxx .. $1100 1sxx:
          // --> 0x10..0x19 minus 0x10 --> [0x00..0x09] --> 10(!) exponent values.
          //
          // As we want to be able to store 'millions' (1E6) like that, our positive
          // range should reach +6, which leaves -3 (don't forget about the 0!);
          // we also want to support *milli* values (exponent = -3) which is
          // just feasible with this range.
          dp += 2;

          // short float eligible value for sure!
          var dc;

          //
          // Bits in word:
          // - 0..9: integer mantissa; values 0..1023
          // - 10: sign
          // - 11..14: exponent 0..9 with offset -3 --> -3..+6
          // - 15: set to signal special values; this bit is also set for some special Unicode characters,
          //       so we can only set this bit and have particular values in bits 0..14 at the same time
          //       in order to prevent a collision with those Unicode specials at 0xD800..0xDFFF.
          //
          // alt:                    __(!!s << 10)_   _dy_____
          dc = 0x8000 + (dp << 11) + (s ? 1024 : 0) + (dy | 0);                  // the `| 0` shouldn't be necessary but is there as a precaution
          //console.log('d10-dbg', dp, dy, s, '0x' + dc.toString(16), flt);
          return String.fromCharCode(dc);
        }
      }
    }

    // and produce the mantissa so that it's range now is [0..2>: for powers > 0
    // the value y will be >= 1 while for negative powers, i.e. tiny numbers, the
    // value 0 < y < 1.
    var y = flt / Math.pow(2, p);
    y /= 2;

    var a = '';
    var b = y;       // alt: y - 1, but that only gives numbers 0 < b < 1 for p > 0

    // and show the unicode character codes for debugging/diagnostics:
    //var dbg = [0 /* Note: this slot will be *correctly* filled at the end */];
    //console.log('dbg @ start', 0, p + 1024 + s, flt, dbg, s, p, y, b);

    for (var i = 0; b && i < FPC_ENC_MAXLEN; i++) {
      b *= FPC_ENC_MODULO;
      var c = b | 0;                  // grab the integer part
      var d = b - c;

      //dbg[i + 1] = c;
      //console.log('dbg @ step', i, c, flt, dbg, s, p, y, b, d, '0x' + c.toString(16));

      a += String.fromCharCode(c);
      b = d;
    }

    // encode sign + power + mantissa length in a Unicode char
    // (i E {0..4} as maximum size FPC_ENC_MAXLEN=4 ==> 3 bits of length @ bits 13.14.15 in word)
    //
    // Bits in word:
    // - 0..11: exponent; values -1024..+1023 with an offset of 1024 to make them all positive numbers
    // - 12: sign
    // - 13,14: length 1..4: the number of words following to define the mantissa
    // - 15: set to signal special values; this bit is also set for some special Unicode characters,
    //       so we can only set this bit and have particular values in bits 0..14 at the same time
    //       in order to prevent a collision with those Unicode specials at 0xD800..0xDFFF.
    //
    // Special values (with bit 15 set):
    // - +Inf
    // - -Inf
    // - NaN
    // - -0    (negative zero)
    // - +0    (positive zero)
    //
    --i;

    var h = p + 1024 + s + (i << 13 /* i * 8192 */ );   // brackets needed as + comes before <<   :-(
    a = String.fromCharCode(h) + a;
    //dbg[0] = h;
    //console.log('dbg @ end', i, h, flt, dbg, s, p, y, b, '0x' + h.toString(16));
    return a;
  } else {
    // -Inf / +Inf
    if (flt > 0) {
      return String.fromCharCode(FPC_ENC_POSITIVE_INFINITY);
    } else {
      return String.fromCharCode(FPC_ENC_NEGATIVE_INFINITY);
    }
  }
}








console.info('fpcvt-alt2 loaded');

