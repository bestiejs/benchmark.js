/** 
 * Simple class to expose nanoTime() to JavaScript.
 * Compile using:
 *   javac -g:none -target 1.5 nano.java
 *   jar cfM nano.jar nano.class
 */
import java.applet.Applet;
public class nano extends Applet {
  public long nanoTime() {
    return java.lang.System.nanoTime();
  }
}