import java.applet.Applet;
public class nano extends Applet {
  public long nanoTime() {
    return java.lang.System.nanoTime();
  }
}