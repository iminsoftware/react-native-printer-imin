package com.printerimin;

import android.graphics.Bitmap;
import android.graphics.Typeface;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;

import com.imin.library.IminSDKManager;
import com.imin.library.SystemPropManager;
import com.imin.printerlib.Callback;
import com.imin.printerlib.IminPrintUtils;
import com.imin.printerlib.print.PrintUtils;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

@ReactModule(name = PrinterIminModule.NAME)
public class PrinterIminModule extends ReactContextBaseJavaModule {
  private final ReactApplicationContext reactContext;
  public static final String NAME = "PrinterImin";
  private IminPrintUtils iminPrintUtils;
  private IminPrintUtils.PrintConnectType connectType = IminPrintUtils.PrintConnectType.SPI;

  public PrinterIminModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    iminPrintUtils = IminPrintUtils.getInstance(reactContext);
    String deviceModel = SystemPropManager.getModel();
    if (deviceModel.contains("M2-203") || deviceModel.contains("M2-202") || deviceModel.contains("M2-Pro")) {
      connectType = IminPrintUtils.PrintConnectType.SPI;
    } else {
      connectType = IminPrintUtils.PrintConnectType.USB;
    }
    iminPrintUtils.resetDevice();
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }


  @ReactMethod
  public void initPrinter(final Promise promise) {
    try {
      iminPrintUtils.initPrinter(connectType);
      promise.resolve(true);
    } catch (Exception e) {
      promise.reject("ININTPRINTER_FAILED", e.getMessage());
    }
  }

  @ReactMethod
  public void getPrinterStatus(final Promise promise) {
    WritableMap payload = Arguments.createMap();
    if (connectType.equals(IminPrintUtils.PrintConnectType.SPI)) {
      iminPrintUtils.getPrinterStatus(connectType, new Callback() {
        @Override
        public void callback(int status) {
          payload.putString("message", getPrinterStatusText(status));
          payload.putString("code", String.format("%d", status));
          promise.resolve(payload);
        }
      });
    } else {
      int status = iminPrintUtils.getPrinterStatus(connectType);
      payload.putString("message", getPrinterStatusText(status));
      payload.putString("code", String.format("%d", status));
      promise.resolve(payload);
    }
  }

  @ReactMethod
  public void printText(String text, final Promise promise) {
    try {
      iminPrintUtils.printText(text);
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("printText_failed", e.getMessage());
    }
  }

  private String getPrinterStatusText(int code) {
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
