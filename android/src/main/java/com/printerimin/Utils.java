package com.printerimin;

public class Utils {
  public static Utils getInstance() {
    return new Utils();
  }

  public String getPrinterStatusText(int code) {
    if (code == 0) {
      return "Printer is normal!";
    } else if (code == 1) {
      return "The printer and call library do not match!";
    } else if (code == 3) {
      return "Print head open!";
    } else if (code == 4) {
      return "The cutter is not reset!!";
    } else if (code == 5) {
      return "Overheated!";
    } else if (code == 6) {
      return "Black label error!";
    } else if (code == 7) {
      return "Paper Jam!";
    } else if (code == 8) {
      return "Paper Out!";
    } else if (code == 99) {
      return "Other errors!";
    } else {
      return "Printer is not connected or powered on!";
    }
  }
}
