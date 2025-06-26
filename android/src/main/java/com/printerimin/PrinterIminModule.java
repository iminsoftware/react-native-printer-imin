package com.printerimin;


import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;

import android.annotation.SuppressLint;
import android.graphics.Bitmap;
import android.graphics.Typeface;
import android.os.IBinder;
import android.os.RemoteException;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

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
import com.facebook.react.modules.core.DeviceEventManagerModule;


import com.imin.printer.ILabelPrintResult;
import com.imin.printer.INeoPrinterCallback;
import com.imin.printer.PrinterHelper;
import com.imin.printer.enums.Align;
import com.imin.printer.enums.ErrorLevel;
import com.imin.printer.enums.HumanReadable;
import com.imin.printer.enums.ImageAlgorithm;
import com.imin.printer.enums.Rotate;
import com.imin.printer.enums.Shape;
import com.imin.printer.enums.Symbology;
import com.imin.printer.label.LabelAreaStyle;
import com.imin.printer.label.LabelBarCodeStyle;
import com.imin.printer.label.LabelBitmapStyle;
import com.imin.printer.label.LabelCanvasStyle;
import com.imin.printer.label.LabelQrCodeStyle;
import com.imin.printer.label.LabelTextStyle;
import com.imin.printerlib.Callback;
import com.imin.printerlib.IminPrintUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import org.json.JSONException;


import java.lang.RuntimeException;

import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.BroadcastReceiver;

@ReactModule(name = PrinterIminModule.NAME)
public class PrinterIminModule extends ReactContextBaseJavaModule {
  private final ReactApplicationContext reactContext;
  public static final String NAME = "PrinterImin";
  private IminPrintUtils iminPrintUtils;
  // private String[] modelArry = {"W27_Pro", "I23M01", "I23M02", "I23D01", "D4-503 Pro", "D4-504 Pro", "D4-505 Pro", "MS2-11", "MS2-12", "MS1-15"};
  private static final String ACTION_PRITER_STATUS_CHANGE = "com.imin.printerservice.PRITER_STATUS_CHANGE";
  private static final String ACTION_POGOPIN_STATUS_CHANGE = "com.imin.printerservice.PRITER_CONNECT_STATUS_CHANGE";
  private String sdkVersion = "1.0.0";
  private static final String ACTION_PRITER_STATUS = "status";
  private IminPrintUtils.PrintConnectType connectType = IminPrintUtils.PrintConnectType.USB;
  public static final String TAG = "IminPrinterReactNativePlugin";
  private BroadcastReceiver mBroadcastReceiver;

  public PrinterIminModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    // List<String> modelList = Arrays.asList(modelArry);
    if (Build.MODEL.contains("W27_Pro") || Build.MODEL.contains("I23D") || Build.MODEL.contains("I23M") || Build.MODEL.contains("I24D") || Build.MODEL.contains("I24T") || Build.MODEL.contains("I24M")) {
      //初始化 2.0 的 SDK。
      PrinterHelper.getInstance().initPrinterService(reactContext);
      sdkVersion = "2.0.0";
    }
    // if (modelList.contains(Build.MODEL)) {
    //   //初始化 2.0 的 SDK。
    //   PrinterHelper.getInstance().initPrinterService(reactContext);
    //   sdkVersion = "2.0.0";
    // }
    else {
      //初始化 1.0 SDK

      iminPrintUtils = IminPrintUtils.getInstance(reactContext);
      String deviceModel = Utils.getInstance().getModel();
      if (deviceModel.contains("M2-203") || deviceModel.contains("M2-202") || deviceModel.contains("M2-Pro")) {
        connectType = IminPrintUtils.PrintConnectType.SPI;
      } else {
        connectType = IminPrintUtils.PrintConnectType.USB;
      }
      iminPrintUtils.setIsOpenLog(IminPrintUtils.isOpenLog == 1 ? 0 : 1);
      iminPrintUtils.resetDevice();
      sdkVersion = "1.0.0";
    }
    initializeBroadcastReceiver();
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {

    try {
      reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    } catch (RuntimeException e) {
      Log.e(TAG, "java.lang.RuntimeException: Trying to invoke JS before CatalystInstance has been set!", e);
    }
  }

  @ReactMethod
  public void initPrinter(final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.initPrinter(connectType);
      } else {
        PrinterHelper.getInstance().initPrinter(reactContext.getPackageName(), null);
      }
      promise.resolve(true);
    } catch (Exception e) {
      promise.reject("ININTPRINTER_FAILED", e.getMessage());
    }
  }

  @ReactMethod
  public void getPrinterStatus(final Promise promise) {
    try {
      WritableMap payload = Arguments.createMap();
      if (iminPrintUtils != null) {
        if (connectType.equals(IminPrintUtils.PrintConnectType.SPI)) {
          iminPrintUtils.getPrinterStatus(connectType, new Callback() {
            @Override
            public void callback(int status) {
              payload.putString("message", Utils.getInstance().getPrinterStatusText(status));
              payload.putString("code", String.format("%d", status));
              promise.resolve(payload);
            }
          });
        } else {
          int status = iminPrintUtils.getPrinterStatus(connectType);
          payload.putString("message", Utils.getInstance().getPrinterStatusText(status));
          payload.putString("code", String.format("%d", status));
          promise.resolve(payload);
        }
      } else {
        int status = PrinterHelper.getInstance().getPrinterStatus();
        payload.putString("message", Utils.getInstance().getPrinterStatusText(status));
        payload.putString("code", String.format("%d", status));
        promise.resolve(payload);
      }
      payload.putString("message", "sdsd");
      payload.putString("code", "1");
      promise.resolve(payload);
    } catch (Exception e) {
      promise.reject("getPrinterStatus_failed", e.getMessage());
    }

  }

  @ReactMethod
  public void setTextSize(int size, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setTextSize(size);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setTextSize_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setTextTypeface(int font, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        switch (font) {
          case 1:
            iminPrintUtils.setTextTypeface(Typeface.MONOSPACE);
            break;
          case 2:
            iminPrintUtils.setTextTypeface(Typeface.DEFAULT_BOLD);
            break;
          case 3:
            iminPrintUtils.setTextTypeface(Typeface.SANS_SERIF);
            break;
          case 4:
            iminPrintUtils.setTextTypeface(Typeface.SERIF);
            break;
          default:
            iminPrintUtils.setTextTypeface(Typeface.DEFAULT);
            break;
        }
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setTextTypeface_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setTextStyle(int style, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setTextStyle(style);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setTextStyle_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setAlignment(int alignment, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setAlignment(alignment);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setAlignment_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setTextLineSpacing(float space, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setTextLineSpacing(space);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setTextLineSpacing_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void printText(String text, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.printText(text + "\n");
      } else {
        PrinterHelper.getInstance().printText(text + "\n", null);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("printText_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void printAntiWhiteText(String text, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.printAntiWhiteText(text);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("printAntiWhiteText_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setTextWidth(int width, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setTextWidth(width);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setTextWidth_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void printAndLineFeed(final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.printAndLineFeed();
      } else {
        PrinterHelper.getInstance().printAndLineFeed();
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("printAndLineFeed_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void printAndFeedPaper(int height, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.printAndFeedPaper(height);
      } else {
        PrinterHelper.getInstance().printAndFeedPaper(height);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("printAndLineFeed_failed", e.getMessage());
    }
  }

  @SuppressLint("LongLogTag")
  @ReactMethod
  public void printColumnsText(ReadableArray cols, final Promise promise) {
    try {
      String[] colsText = new String[cols.size()];
      int[] colsWidth = new int[cols.size()];
      int[] colsAlign = new int[cols.size()];
      int[] colsFontSize = new int[cols.size()];
      for (int i = 0; i < cols.size(); i++) {
        ReadableMap col = cols.getMap(i);
        String textColumn = col.getString("text");
        int widthColumn = col.getInt("width");
        int alignColumn = col.getInt("align");
        Log.d(TAG, "printColumnsText: colsText" + textColumn);
        int fontSizeColumn = col.getInt("fontSize");
        colsText[i] = textColumn;
        colsWidth[i] = widthColumn;
        colsAlign[i] = alignColumn;
        colsFontSize[i] = fontSizeColumn;
      }
      Log.d(TAG, "printColumnsText: colsText" + colsText);
      Log.d(TAG, "printColumnsText: colsWidth" + colsWidth);
      Log.d(TAG, "printColumnsText: colsAlign" + colsAlign);
      Log.d(TAG, "printColumnsText: colsFontSize" + colsFontSize);
      if (iminPrintUtils != null) {
        iminPrintUtils.printColumnsText(colsText, colsWidth, colsAlign, colsFontSize);
      } else {
        PrinterHelper.getInstance().printColumnsText(colsText, colsWidth, colsAlign, colsFontSize, null);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("printColumnsText_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setPageFormat(int style, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setPageFormat(style);
      } else {
        PrinterHelper.getInstance().setPageFormat(style);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setPageFormat_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void partialCut(final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.partialCut();
      } else {
        PrinterHelper.getInstance().partialCut();
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("partialCut_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void fullCut(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().fullCut();
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("fullCut_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void printSingleBitmap(ReadableMap config, final Promise promise) {
    try {
      String url = config.getString("url");
      if (config.hasKey("width") && config.hasKey("height")) {
        int width = config.getInt("width");
        int height = config.getInt("height");
        Bitmap image = Glide.with(reactContext).asBitmap().load(url).diskCacheStrategy(DiskCacheStrategy.NONE).skipMemoryCache(true).submit(width, height).get();
        if (image.isRecycled()) {
          return;
        }
        if (iminPrintUtils != null) {
          if (config.hasKey("align")) {
            int align = config.getInt("align");
            iminPrintUtils.printSingleBitmap(image, align);
          } else {
            iminPrintUtils.printSingleBitmap(image);
          }
        } else {
          if (config.hasKey("align")) {
            int align = config.getInt("align");
            PrinterHelper.getInstance().printBitmapWithAlign(image, align, null);
          } else {
            PrinterHelper.getInstance().printBitmap(image, null);
          }
        }
      } else {
        Bitmap image = Glide.with(reactContext).asBitmap().load(url).diskCacheStrategy(DiskCacheStrategy.NONE).skipMemoryCache(true).submit().get();
        if (image.isRecycled()) {
          return;
        }
        if (iminPrintUtils != null) {
          if (config.hasKey("align")) {
            int align = config.getInt("align");
            iminPrintUtils.printSingleBitmap(image, align);
          } else {
            iminPrintUtils.printSingleBitmap(image);
          }
        } else {
          if (config.hasKey("align")) {
            int align = config.getInt("align");
            PrinterHelper.getInstance().printBitmapWithAlign(image, align, null);
          } else {
            PrinterHelper.getInstance().printBitmap(image, null);
          }
        }
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("printSingleBitmap_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void printMultiBitmap(ReadableMap config, final Promise promise) {
    try {
      ReadableArray urls = config.getArray("urls");
      ArrayList<Bitmap> bitmaps = new ArrayList<Bitmap>();
      if (config.hasKey("width") && config.hasKey("height")) {
        int width = config.getInt("width");
        int height = config.getInt("height");
        for (int i = 0; i < urls.size(); i++) {
          Bitmap image = Glide.with(reactContext).asBitmap().load(urls.getString(i)).diskCacheStrategy(DiskCacheStrategy.NONE).skipMemoryCache(true).submit(width, height).get();
          if (!image.isRecycled()) {
            bitmaps.add(image);
          }
        }
        if (iminPrintUtils != null) {
          if (config.hasKey("align")) {
            int align = config.getInt("align");
            iminPrintUtils.printMultiBitmap(bitmaps, align);
          } else {
            iminPrintUtils.printMultiBitmap(bitmaps, 0);
          }
        } else {
          if (config.hasKey("align")) {
            int align = config.getInt("align");
            PrinterHelper.getInstance().printMultiBitmapWithAlign(bitmaps, align, null);
          } else {
            PrinterHelper.getInstance().printMultiBitmap(bitmaps, null);
          }
        }
      } else {
        for (int i = 0; i < urls.size(); i++) {
          Bitmap image = Glide.with(reactContext).asBitmap().load(urls.getString(i)).diskCacheStrategy(DiskCacheStrategy.NONE).skipMemoryCache(true).submit().get();
          if (!image.isRecycled()) {
            bitmaps.add(image);
          }
        }
        if (iminPrintUtils != null) {
          if (config.hasKey("align")) {
            int align = config.getInt("align");
            iminPrintUtils.printMultiBitmap(bitmaps, align);
          } else {
            iminPrintUtils.printMultiBitmap(bitmaps, 0);
          }
        } else {
          if (config.hasKey("align")) {
            int align = config.getInt("align");
            PrinterHelper.getInstance().printMultiBitmapWithAlign(bitmaps, align, null);
          } else {
            PrinterHelper.getInstance().printMultiBitmap(bitmaps, null);
          }
        }
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("printMultiBitmap_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void printSingleBitmapBlackWhite(ReadableMap config, final Promise promise) {
    try {
      String url = config.getString("url");
      if (config.hasKey("width") && config.hasKey("height")) {
        int width = config.getInt("width");
        int height = config.getInt("height");
        Bitmap image = Glide.with(reactContext).asBitmap().load(url).diskCacheStrategy(DiskCacheStrategy.NONE).skipMemoryCache(true).submit(width, height).get();
        if (image.isRecycled()) {
          return;
        }
        if (iminPrintUtils != null) {
          iminPrintUtils.printSingleBitmapBlackWhite(image);
        }
      } else {
        Bitmap image = Glide.with(reactContext).asBitmap().load(url).diskCacheStrategy(DiskCacheStrategy.NONE).skipMemoryCache(true).submit().get();
        if (image.isRecycled()) {
          return;
        }
        if (iminPrintUtils != null) {
          iminPrintUtils.printSingleBitmapBlackWhite(image);
        }
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("printSingleBitmapBlackWhite_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setQrCodeSize(int qrSize, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setQrCodeSize(qrSize);
      } else {
        PrinterHelper.getInstance().setQrCodeSize(qrSize);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setQrCodeSize_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setLeftMargin(int margin, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setLeftMargin(margin);
      } else {
        PrinterHelper.getInstance().setLeftMargin(margin);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setLeftMargin_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setBarCodeWidth(int width, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setBarCodeWidth(width);
      } else {
        PrinterHelper.getInstance().setBarCodeWidth(width);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setBarCodeWidth_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setBarCodeHeight(int height, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setBarCodeHeight(height);
      } else {
        PrinterHelper.getInstance().setBarCodeHeight(height);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setBarCodeHeight_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setBarCodeContentPrintPos(int position, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setBarCodeContentPrintPos(position);
      } else {
        PrinterHelper.getInstance().setBarCodeContentPrintPos(position);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setBarCodeContentPrintPos_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void printBarCode(ReadableMap config, final Promise promise) {
    try {
      String barCodeContent = config.getString("data");
      int barCodeType = config.getInt("type");
      if (iminPrintUtils != null) {
        if (config.hasKey("align")) {
          int barCodeAlign = config.getInt("align");
          iminPrintUtils.printBarCode(barCodeType, barCodeContent, barCodeAlign);
        } else {
          iminPrintUtils.printBarCode(barCodeType, barCodeContent);
        }
      } else {
        if (config.hasKey("align")) {
          int barCodeAlign = config.getInt("align");
          if (config.hasKey("position") && config.hasKey("height") && config.hasKey("width")) {
            int position = config.getInt("position");
            int height = config.getInt("height");
            int width = config.getInt("width");
            PrinterHelper.getInstance().printBarCodeWithFull(barCodeContent, barCodeType, width, height, barCodeAlign, position, null);
          } else {
            PrinterHelper.getInstance().printBarCodeWithAlign(barCodeContent, barCodeType, barCodeAlign, null);
          }
        } else {
          PrinterHelper.getInstance().printBarCode(barCodeContent, barCodeType, null);
        }
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("printBarCode_failed", e.getMessage());
    }

  }

  @ReactMethod
  public void setDoubleQRSize(int size, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setDoubleQRSize(size);
      } else {
        PrinterHelper.getInstance().setDoubleQRSize(size);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setDoubleQRSize_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setDoubleQR1Level(int level, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setDoubleQR1Level(level);
      } else {
        PrinterHelper.getInstance().setDoubleQR1Level(level);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setDoubleQR1Level_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setDoubleQR2Level(int level, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setDoubleQR2Level(level);
      } else {
        PrinterHelper.getInstance().setDoubleQR2Level(level);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setDoubleQR2Level_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setDoubleQR1MarginLeft(int leftMargin, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setDoubleQR1MarginLeft(leftMargin);
      } else {
        PrinterHelper.getInstance().setDoubleQR1MarginLeft(leftMargin);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setDoubleQR1MarginLeft_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setDoubleQR2MarginLeft(int leftMargin, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setDoubleQR2MarginLeft(leftMargin);
      } else {
        PrinterHelper.getInstance().setDoubleQR2MarginLeft(leftMargin);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setDoubleQR2MarginLeft_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setQrCodeErrorCorrectionLev(int level, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setQrCodeErrorCorrectionLev(level);
      } else {
        PrinterHelper.getInstance().setQrCodeErrorCorrectionLev(level);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setQrCodeErrorCorrectionLev_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setDoubleQR1Version(int version, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setDoubleQR1Version(version);
      } else {
        PrinterHelper.getInstance().setDoubleQR1Version(version);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setDoubleQR1Version_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setDoubleQR2Version(int version, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setDoubleQR2Version(version);
      } else {
        PrinterHelper.getInstance().setDoubleQR2Version(version);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setDoubleQR2Version_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void printQrCode(ReadableMap config, final Promise promise) {
    try {
      String qrStr = config.getString("data");
      if (config.hasKey("align")) {
        int align = config.getInt("align");
        if (iminPrintUtils != null) {
          iminPrintUtils.printQrCode(qrStr, align);
        } else {
          if (config.hasKey("qrSize") && config.hasKey("level")) {
            int qrSize = config.getInt("qrSize");
            int qrLevel = config.getInt("level");
            PrinterHelper.getInstance().printQRCodeWithFull(qrStr, qrSize, qrLevel, align, null);
          } else {
            PrinterHelper.getInstance().printQrCodeWithAlign(qrStr, align, null);
          }
        }
      } else {
        if (iminPrintUtils != null) {
          iminPrintUtils.printQrCode(qrStr);
        } else {
          PrinterHelper.getInstance().printQrCode(qrStr, null);
        }
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("printQrCode_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void printDoubleQR(ReadableMap config, final Promise promise) {
    try {
      String qrCode1Text = config.getString("qrCode1Text");
      String qrCode2Text = config.getString("qrCode2Text");
      if (iminPrintUtils != null) {
        iminPrintUtils.printDoubleQR(qrCode1Text, qrCode2Text);
      } else {
        PrinterHelper.getInstance().printDoubleQR(qrCode1Text, qrCode2Text, null);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("printDoubleQR_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void openCashBox(final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        Utils.getInstance().opencashBox();
      } else {
        PrinterHelper.getInstance().openDrawer();
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("openCashBox_failed", e.getMessage());
    }

  }


  @ReactMethod
  public void setInitIminPrinter(boolean isDefault, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setInitIminPrinter(isDefault);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setInitIminPrinter_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void resetDevice(final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.resetDevice();
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("resetDevice_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void printerSelfChecking(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().printerSelfChecking(null);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("printerSelfChecking_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void openLogs(int open, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.setIsOpenLog(open);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setIsOpenLog_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void sendRAWDataHexStr(String byteStr, final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.sendRAWData(byteStr);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("sendRAWDataHexStr_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void printSingleBitmapColorChart(ReadableMap config, final Promise promise) {
    try {
      String url = config.getString("url");
      if (config.hasKey("width") && config.hasKey("height")) {
        int width = config.getInt("width");
        int height = config.getInt("height");
        Bitmap image = Glide.with(reactContext).asBitmap().load(url).diskCacheStrategy(DiskCacheStrategy.NONE).skipMemoryCache(true).submit(width, height).get();
        if (image.isRecycled()) {
          return;
        }
        if (iminPrintUtils == null) {
          if (config.hasKey("align")) {
            int align = config.getInt("align");
            PrinterHelper.getInstance().printBitmapColorChartWithAlign(image, align, null);
          } else {
            PrinterHelper.getInstance().printBitmapColorChart(image, null);
          }
        }
      } else {
        Bitmap image = Glide.with(reactContext).asBitmap().load(url).diskCacheStrategy(DiskCacheStrategy.NONE).skipMemoryCache(true).submit().get();
        if (image.isRecycled()) {
          return;
        }
        if (iminPrintUtils == null) {
          if (config.hasKey("align")) {
            int align = config.getInt("align");
            PrinterHelper.getInstance().printBitmapColorChartWithAlign(image, align, null);
          } else {
            PrinterHelper.getInstance().printBitmapColorChart(image, null);
          }
        }
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("printSingleBitmap_failed", e.getMessage());
    }
  }


  @ReactMethod
  public void sendRAWData(ReadableArray bytes, final Promise promise) {
    try {
      // 处理接收到的 Uint8Array 数据
      byte[] rawData = new byte[bytes.size()];
      for (int i = 0; i < bytes.size(); i++) {
        rawData[i] = (byte) bytes.getInt(i);
      }
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().sendRAWData(rawData, null);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("sendRAWData_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void printColumnsString(ReadableArray cols, final Promise promise) {
    try {
      String[] colsText = new String[cols.size()];
      int[] colsWidth = new int[cols.size()];
      int[] colsAlign = new int[cols.size()];
      int[] colsFontSize = new int[cols.size()];
      for (int i = 0; i < cols.size(); i++) {
        ReadableMap col = cols.getMap(i);
        String textColumn = col.getString("text");
        int widthColumn = col.getInt("width");
        int alignColumn = col.getInt("align");
        int fontSizeColumn = col.getInt("fontSize");
        colsText[i] = textColumn;
        colsWidth[i] = widthColumn;
        colsAlign[i] = alignColumn;
        colsFontSize[i] = fontSizeColumn;
      }
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().printColumnsString(colsText, colsWidth, colsAlign, colsFontSize, null);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("printColumnsString_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void unBindService(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().deInitPrinterService(reactContext);
      }
    } catch (Exception e) {
      promise.reject("unBindService_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void initPrinterParams(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().initPrinterParams();
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("initPrinterParams_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getFontCodepage(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        List<String> fontCodepage = PrinterHelper.getInstance().getFontCodepage();
        promise.resolve(fontCodepage);
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getFontCodepage_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setFontCodepage(int codepage, final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().setFontCodepage(codepage);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setFontCodepage_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getCurCodepage(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        String curCodepage = PrinterHelper.getInstance().getCurCodepage();
        promise.resolve(curCodepage);
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getCurCodepage_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getEncodeList(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        List<String> encodeList = PrinterHelper.getInstance().getEncodeList();
        promise.resolve(encodeList);
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getEncodeList_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setPrinterEncode(int encode, final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().setPrinterEncode(encode);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setPrinterEncode_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getCurEncode(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        String curEncode = PrinterHelper.getInstance().getCurEncode();
        promise.resolve(curEncode);
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getCurEncode_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getPrinterDensityList(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        List<String> printerDensityList = PrinterHelper.getInstance().getPrinterDensityList();
        promise.resolve(printerDensityList);
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getPrinterDensityList_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setPrinterDensity(int density, final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().setPrinterDensity(density);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setPrinterDensity_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getPrinterDensity(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        promise.resolve(PrinterHelper.getInstance().getPrinterDensity());
      } else {
        promise.resolve(null);
      }

    } catch (Exception e) {
      promise.reject("getPrinterDensity_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getPrinterSpeedList(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        List<String> printerSpeedList = PrinterHelper.getInstance().getPrinterSpeedList();
        promise.resolve(printerSpeedList);
      } else {
        promise.resolve(null);
      }

    } catch (Exception e) {
      promise.reject("getPrinterSpeedList_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setPrinterSpeed(int speed, final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().setPrinterSpeed(speed);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setPrinterSpeed_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getPrinterSpeed(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        int printerSpeed = PrinterHelper.getInstance().getPrinterSpeed();
        promise.resolve(printerSpeed);
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getPrinterSpeed_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getPrinterPaperTypeList(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        List<String> printerPaperTypeList = PrinterHelper.getInstance().getPrinterPaperTypeList();
        promise.resolve(printerPaperTypeList);
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getPrinterPaperTypeList_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getPrinterPaperType(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        promise.resolve(PrinterHelper.getInstance().getPrinterPaperType());
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getPrinterPaperType_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getPrinterSerialNumber(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().getPrinterSerialNumber(new INeoPrinterCallback() {
          @Override
          public void onRunResult(boolean isSuccess) throws RemoteException {
          }

          @Override
          public void onReturnString(String s) throws RemoteException {
            promise.resolve(s);
          }

          @Override
          public void onRaiseException(int code, String msg) throws RemoteException {
          }

          @Override
          public void onPrintResult(int code, String msg) throws RemoteException {
          }
        });
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getPrinterSerialNumber_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getPrinterModelName(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().getPrinterModelName(new INeoPrinterCallback() {
          @Override
          public void onRunResult(boolean isSuccess) throws RemoteException {
          }

          @Override
          public void onReturnString(String s) throws RemoteException {
            promise.resolve(s);
          }

          @Override
          public void onRaiseException(int code, String msg) throws RemoteException {
          }

          @Override
          public void onPrintResult(int code, String msg) throws RemoteException {
          }
        });
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getPrinterModelName_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getPrinterThermalHead(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().getPrinterThermalHead(new INeoPrinterCallback() {
          @Override
          public void onRunResult(boolean isSuccess) throws RemoteException {
          }

          @Override
          public void onReturnString(String s) throws RemoteException {
            promise.resolve(s);
          }

          @Override
          public void onRaiseException(int code, String msg) throws RemoteException {
          }

          @Override
          public void onPrintResult(int code, String msg) throws RemoteException {
          }
        });
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getPrinterThermalHead_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getPrinterFirmwareVersion(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().getPrinterFirmwareVersion(new INeoPrinterCallback() {
          @Override
          public void onRunResult(boolean isSuccess) throws RemoteException {
          }

          @Override
          public void onReturnString(String s) throws RemoteException {
            promise.resolve(s);
          }

          @Override
          public void onRaiseException(int code, String msg) throws RemoteException {
          }

          @Override
          public void onPrintResult(int code, String msg) throws RemoteException {
          }
        });
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getPrinterFirmwareVersion_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getPrinterHardwareVersion(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().getPrinterHardwareVersion(new INeoPrinterCallback() {
          @Override
          public void onRunResult(boolean isSuccess) throws RemoteException {
          }

          @Override
          public void onReturnString(String s) throws RemoteException {
            promise.resolve(s);
          }

          @Override
          public void onRaiseException(int code, String msg) throws RemoteException {
          }

          @Override
          public void onPrintResult(int code, String msg) throws RemoteException {
          }
        });
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getPrinterHardwareVersion_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getPrinterPaperDistance(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().getPrinterPaperDistance(new INeoPrinterCallback() {
          @Override
          public void onRunResult(boolean isSuccess) throws RemoteException {
          }

          @Override
          public void onReturnString(String s) throws RemoteException {
            promise.resolve(s);
          }

          @Override
          public void onRaiseException(int code, String msg) throws RemoteException {
          }

          @Override
          public void onPrintResult(int code, String msg) throws RemoteException {
          }
        });
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getPrinterPaperDistance_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getPrinterCutTimes(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().getPrinterCutTimes(new INeoPrinterCallback() {
          @Override
          public void onRunResult(boolean isSuccess) throws RemoteException {
          }

          @Override
          public void onReturnString(String s) throws RemoteException {
            promise.resolve(s);
          }

          @Override
          public void onRaiseException(int code, String msg) throws RemoteException {
          }

          @Override
          public void onPrintResult(int code, String msg) throws RemoteException {
          }
        });
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getPrinterCutTimes_failed", e.getMessage());
    }
  }


  @ReactMethod
  public void getPrinterMode(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        Log.e("IminPrinter", "getPrintModel: 获取当前打印机模式");
//        WritableMap payload = Arguments.createMap();
        PrinterHelper.getInstance().labelGetPrinterMode(new INeoPrinterCallback() {
          @Override
          public void onRunResult(boolean isSuccess) throws RemoteException {

          }

          @Override
          public void onReturnString(String string) throws RemoteException {
            Log.e("IminPrinter", "getPrintModel: 获取当前打印机模式" + string);
            if (string != null && !string.isEmpty()) {
//              payload.putString("result",string);
              if (string.equalsIgnoreCase("Label")) {
                promise.resolve(1);
              } else {
                promise.resolve(0);
              }
            }
          }

          @Override
          public void onRaiseException(int code, String msg) throws RemoteException {
          }

          @Override
          public void onPrintResult(int code, String msg) throws RemoteException {
          }

          @Override
          public IBinder asBinder() {
            return null;
          }
        });

//        promise.resolve(PrinterHelper.getInstance().getPrinterMode());
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getPrinterMode_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getDrawerStatus(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        promise.resolve(PrinterHelper.getInstance().getDrawerStatus());
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getDrawerStatus_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getOpenDrawerTimes(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        promise.resolve(PrinterHelper.getInstance().getOpenDrawerTimes());
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getOpenDrawerTimes_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getServiceVersion(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        promise.resolve(PrinterHelper.getInstance().getServiceVersion());
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getServiceVersion_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getUsbPrinterVidPid(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        promise.resolve(PrinterHelper.getInstance().getUsbPrinterVidPid());
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getUsbPrinterVidPid_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void getUsbDevicesName(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        promise.resolve(PrinterHelper.getInstance().getUsbDevicesName());
      } else {
        promise.resolve(null);
      }
    } catch (Exception e) {
      promise.reject("getUsbDevicesName_failed", e.getMessage());
    }
  }


  @ReactMethod
  public void setCodeAlignment(int align, final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().setCodeAlignment(align);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setCodeAlignment_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setTextBitmapTypeface(int typeface, final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        switch (typeface) {
          case 1:
            PrinterHelper.getInstance().setTextBitmapTypeface("Typeface.MONOSPACE");
            break;
          case 2:
            PrinterHelper.getInstance().setTextBitmapTypeface("Typeface.DEFAULT_BOLD");
            break;
          case 3:
            PrinterHelper.getInstance().setTextBitmapTypeface("Typeface.SANS_SERIF");
            break;
          case 4:
            PrinterHelper.getInstance().setTextBitmapTypeface("Typeface.SERIF");
            break;
          default:
            PrinterHelper.getInstance().setTextBitmapTypeface("Typeface.DEFAULT");
            break;
        }
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setTextBitmapTypeface_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setTextBitmapSize(int size, final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().setTextBitmapSize(size);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setTextBitmapSize_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setTextBitmapStyle(int style, final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().setTextBitmapStyle(style);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setTextBitmapStyle_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setTextBitmapStrikeThru(boolean strikeThru, final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().setTextBitmapStrikeThru(strikeThru);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setTextBitmapStrikeThru_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setTextBitmapUnderline(boolean haveUnderline, final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().setTextBitmapUnderline(haveUnderline);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setTextBitmapUnderline_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setTextBitmapLineSpacing(float lineHeight, final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().setTextBitmapLineSpacing(lineHeight);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setTextBitmapLineSpacing_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setTextBitmapLetterSpacing(float space, final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().setTextBitmapLetterSpacing(space);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setTextBitmapLetterSpacing_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void setTextBitmapAntiWhite(boolean antiWhite, final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().setTextBitmapAntiWhite(antiWhite);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("setTextBitmapAntiWhite_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void printTextBitmap(ReadableMap config, final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        String text = config.getString("text");
        if (config.hasKey("align")) {
          int align = config.getInt("align");
          PrinterHelper.getInstance().printTextBitmapWithAli(text + "\n", align, null);
        } else {
          PrinterHelper.getInstance().printTextBitmap(text + "\n", null);
        }
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("printTextBitmap_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void enterPrinterBuffer(boolean isClean, final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().enterPrinterBuffer(isClean);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("enterPrinterBuffer_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void commitPrinterBuffer(final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().commitPrinterBuffer(null);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("commitPrinterBuffer_failed", e.getMessage());
    }
  }

  @ReactMethod
  public void exitPrinterBuffer(boolean isCommit, final Promise promise) {
    try {
      if (iminPrintUtils == null) {
        PrinterHelper.getInstance().exitPrinterBuffer(isCommit);
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("exitPrinterBuffer_failed", e.getMessage());
    }
  }

  //标签相关的API
  //标签初始化
  @ReactMethod
  public void labelInitCanvas(ReadableMap config, final Promise promise) {
    if (iminPrintUtils == null) {
      Integer width = (Integer) config.getInt("width");
      Integer height1 = (Integer) config.getInt("height");
      Integer posX = (Integer) config.getInt("posX");
      Integer posY = (Integer) config.getInt("posY");

      // 使用解析后的数据
      Log.e("IminPrinter", "labelInitCanvas:" + width + " " + height1 + " " + posX + " ,y= " + posY);
      PrinterHelper.getInstance().labelInitCanvas(LabelCanvasStyle.getCanvasStyle()
        .setWidth(width)
        .setHeight(height1)
        .setPosX(posX)
        .setPosY(posY)
      );

      promise.resolve(true);
    }
  }

  //绘制文本内容
  @ReactMethod
  public void labelAddText(ReadableMap config, final Promise promise) {
    Log.e("IminPrinter", "labelAddText: 点击绘制文本");
    if (iminPrintUtils == null) {
      String textLabel = config.getString("text");
      // 手动解析每个参数
      Integer posX = (Integer) config.getInt("posX");
      Integer posY = (Integer) config.getInt("posY");
      Integer textSize = (Integer) config.getInt("textSize");
      Integer textWidthRatio = (Integer) config.getInt("textWidthRatio");
      Integer textHeightRatio = (Integer) config.getInt("textHeightRatio");
      Integer width = (Integer) config.getInt("width");
      Integer height1 = (Integer) config.getInt("height");
      Integer alignStr = config.getInt("align");
      Integer rotateStr = config.getInt("rotate");
      Integer textSpace = (Integer) config.getInt("textSpace");
      Boolean enableBold = (Boolean) config.getBoolean("enableBold");
      Boolean enableUnderline = (Boolean) config.getBoolean("enableUnderline");
      Boolean enableStrikethrough = (Boolean) config.getBoolean("enableStrikethrough");
      Boolean enableItalics = (Boolean) config.getBoolean("enableItalics");
      Boolean enAntiColor = (Boolean) config.getBoolean("enAntiColor");

      // 将字符串转换为枚举类型
      Align align = Align.values()[alignStr];
      Rotate rotate = Rotate.values()[rotateStr];


      Log.e("IminPrinter", "labelAddText: 点击绘制文本 " + textLabel + ",width=" +
        width + " ,height1= " + height1 + " ,posX= " + posX + " ,posY= " + posY +
        " ,rotateStr= " + rotateStr + " ,enableBold= " + enableBold + "  " + align + "   " + rotate);


      PrinterHelper.getInstance().labelAddText(textLabel, LabelTextStyle.getTextStyle()
        .setPosX(posX)
        .setPosY(posY)
        .setTextSize(textSize)
        .setTextWidthRatio(textWidthRatio)
        .setTextHeightRatio(textHeightRatio)
        .setWidth(width)
        .setHeight(height1)
        .setAlign(align)
        .setRotate(rotate)
        .setTextSpace(textSpace)
        .setEnableBold(enableBold)
        .setEnableUnderline(enableUnderline)
        .setEnableStrikethrough(enableStrikethrough)
        .setEnableItalics(enableItalics)
        .setEnAntiColor(enAntiColor)

      );
      promise.resolve(true);
    }
  }

  //绘制条形码内容
  @ReactMethod
  public void labelAddBarCode(ReadableMap config, final Promise promise) {
    if (iminPrintUtils == null) {
      String barCode = config.getString("barCode");
      // 直接从 map 获取各个属性
      Integer posX = (Integer) config.getInt("posX");
      Integer posY = (Integer) config.getInt("posY");
      Integer dotWidth = (Integer) config.getInt("dotWidth");
      Integer barHeight = (Integer) config.getInt("barHeight");
      Integer readable = config.getInt("readable");
      Integer symbology = config.getInt("symbology");
      Integer alignStr = config.getInt("align");
      Integer rotateStr = config.getInt("rotate");
      Integer width = (Integer) config.getInt("width");
      Integer height1 = (Integer) config.getInt("height");

      Rotate rotate = Rotate.values()[rotateStr];
      Align align = Align.values()[alignStr];
      HumanReadable readable1 = HumanReadable.values()[readable];
      Symbology symbology1 = Symbology.values()[symbology];

      Log.e("IminPrinter", "labelAddBarCode: 绘制条形码内容 " + barCode + ",width=" +
        width + " ,height1= " + height1 + " ,posX= " + posX + " ,posY= " + posY + " ,readable= " + readable + " ,symbology= " + symbology + "  ,HumanReadable=>   " + readable1);

      PrinterHelper.getInstance().labelAddBarCode(barCode, LabelBarCodeStyle.getBarCodeStyle()
        .setPosX(posX)
        .setPosY(posY)
        .setSymbology(symbology1)
        .setDotWidth(dotWidth)
        .setBarHeight(barHeight)
        .setReadable(readable1)
        .setAlign(align)
        .setRotate(rotate)
        .setWidth(width)
        .setHeight(height1)
      );

      promise.resolve(true);
    }

    Log.e("IminPrinter", "labelAddBarCode: 绘制条形码内容");
  }

  //绘制二维码内容
  @ReactMethod
  public void labelAddQrCode(ReadableMap config, final Promise promise) {
    Log.e("IminPrinter", "labelAddQrCode: 绘制二维码内容");
    if (iminPrintUtils == null) {

      if (config != null) {
        String qrCode = config.getString("qrCode");

        // 直接从 map 获取各个属性
        Integer posX = (Integer) config.getInt("posX");
        Integer posY = (Integer) config.getInt("posY");
        Integer size1 = (Integer) config.getInt("size");
        Integer errorLevelStr = config.getInt("errorLevel");
        Integer rotateStr = config.getInt("rotate");
        Integer width = (Integer) config.getInt("width");
        Integer height1 = (Integer) config.getInt("height");
        Log.e("IminPrinter", "labelAddQrCode: 绘制二维码内容 " + qrCode + ",width=" +
          width + " ,height1= " + height1 + " ,posX= " + posX + " ,posY= " + posY + " ,errorLevelStr= " + errorLevelStr + " ,size= " + size1);

        Rotate rotate = Rotate.values()[rotateStr];
        ErrorLevel errorLevel = ErrorLevel.values()[errorLevelStr];


        PrinterHelper.getInstance().labelAddQrCode(qrCode, LabelQrCodeStyle.getQrCodeStyle()
          .setPosX(posX)
          .setPosY(posY)
          .setSize(size1)
          .setErrorLevel(errorLevel)
          .setRotate(rotate)
          .setWidth(width)
          .setHeight(height1)
        );

      }
      promise.resolve(true);
    }
  }

  //绘制图像
  @ReactMethod
  public void labelAddBitmap(ReadableMap config, final Promise promise) {
    Log.e("IminPrinter", "labelAddBitmap: 绘制图像");
    if (iminPrintUtils == null) {
      try {
        String bitmapUrl = config.getString("bitmapUrl");
        Integer posX = (Integer) config.getInt("posX");
        Integer posY = (Integer) config.getInt("posY");
        Integer algorithm =  config.getInt("algorithm");
        Integer value = (Integer) config.getInt("value");
        Integer width = (Integer) config.getInt("width");
        Integer height1 = (Integer) config.getInt("height");

        ImageAlgorithm imageAlgorithm = ImageAlgorithm.values()[algorithm];

        Log.e("IminPrinter", "labelAddBitmap: 绘制图像 " + bitmapUrl + " ,width=" + width + " ,height1= " + height1 + " ,posX= " + posX + " ,posY= " + posY + " ,algorithm= " + algorithm + " ,value= " + value);

        Bitmap bitmap = null;
        if (bitmapUrl == null || bitmapUrl.isEmpty()) {
          promise.resolve(false);
        } else {
          bitmap = Glide.with(reactContext).asBitmap().load(bitmapUrl).diskCacheStrategy(DiskCacheStrategy.NONE).skipMemoryCache(true).submit(width, height1).get();
        }

        PrinterHelper.getInstance().labelAddBitmap(bitmap, LabelBitmapStyle.getBitmapStyle()
          .setPosX(posX)
          .setPosY(posY)
          .setAlgorithm(imageAlgorithm)
          .setValue(value)
          .setWidth(width)
          .setHeight(height1)
        );
        promise.resolve(true);
      }catch (Exception e){
        Log.e("IminPrinter", "labelAddBitmap: "+e.getMessage());
        promise.resolve(false);
      }

    }
  }

  //打印标签样式的图片
  @ReactMethod
  public void printLabelBitmap(ReadableMap config, final Promise promise) {
    Log.e("IminPrinter", "printLabelBitmap: 打印标签样式的图片");
    if (iminPrintUtils == null) {

      try {
        String bitmapUrl = config.getString("bitmapUrl");
        Integer width = (Integer) config.getInt("width");
        Integer height1 = (Integer) config.getInt("height");

        Log.e("IminPrinter", "labelAddArea: 绘制特殊图形 " + ",width=" +
          width + " ,height1= " + height1 + "  ,bitmapUrl= " + bitmapUrl );

        Bitmap bitmap = null;
        if (bitmapUrl == null || bitmapUrl.isEmpty()) {
          promise.resolve(false);
        } else {
          bitmap = Glide.with(reactContext).asBitmap().load(bitmapUrl).diskCacheStrategy(DiskCacheStrategy.NONE).skipMemoryCache(true).submit(width, height1).get();
        }

        PrinterHelper.getInstance().labelAddBitmap(bitmap, LabelBitmapStyle.getBitmapStyle()
          .setWidth(width)
          .setHeight(height1)
        );

        promise.resolve(true);

      } catch (Exception e) {
        Log.e("IminPrinter", "printLabelBitmap: 打印标签样式的图片 e " + e.getMessage());
        promise.resolve(false);
      }

    }
  }

  //绘制特殊图形
  @ReactMethod
  public void labelAddArea(ReadableMap config, final Promise promise) {
    if (iminPrintUtils == null) {
      Log.e("IminPrinter", "labelAddArea: 绘制特殊图形 " + config.getInt("style"));
      // 获取具体的参数
      if (config != null) {
        Integer style = config.getInt("style");
        Integer width = (Integer) config.getInt("width");
        Integer height1 = (Integer) config.getInt("height");
        Integer posX = (Integer) config.getInt("posX");
        Integer posY = (Integer) config.getInt("posY");
        Integer endX = (Integer) config.getInt("endX");
        Integer endY = (Integer) config.getInt("endY");
        Integer thick = (Integer) config.getInt("thick");
        Log.e("IminPrinter", "labelAddArea: 绘制特殊图形 " + style + ",width=" +
          width + " ,height1= " + height1 + " ,posX= " + posX + " ,posY= " + posY + " ,endX= " + endX + " ,endY= " + endY + " ,thick= " + thick);
        // 转换字符串到枚举
        Shape styleShape = Shape.values()[style];
        Log.e("IminPrinter", "labelAddArea: 绘制特殊图形 " + styleShape);
        PrinterHelper.getInstance().labelAddArea(LabelAreaStyle.getAreaStyle()
          .setStyle(styleShape)
          .setWidth(width)
          .setHeight(height1)
          .setPosX(posX)
          .setPosY(posY)
          .setEndX(endX)
          .setEndY(endY)
          .setThick(thick));
        promise.resolve(true);
      }
    }
  }

  //打印绘制的内容
  @ReactMethod
  public void labelPrintCanvas(int printCount, final Promise promise) {
    if (iminPrintUtils == null) {
      Log.e("IminPrinter", "labelPrintCanvas: 打印绘制的内容 =>" + printCount);
      WritableMap payload = Arguments.createMap();
      PrinterHelper.getInstance().labelPrintCanvas(printCount, new ILabelPrintResult() {
        @Override
        public void onResult(int resultCode, String message) throws RemoteException {
          payload.putString("result", message);
          payload.putInt("resultCode",resultCode);
          promise.resolve(payload);
        }

        @Override
        public IBinder asBinder() {
          return null;
        }
      });
    }
  }

  //标签学习
  @ReactMethod
  public void labelLearning(final Promise promise) {
    if (iminPrintUtils == null) {
      WritableMap payload = Arguments.createMap();
      PrinterHelper.getInstance().labelPaperLearning(new INeoPrinterCallback() {
        @Override
        public void onRunResult(boolean isSuccess) throws RemoteException {

        }

        @Override
        public void onReturnString(String s) throws RemoteException {
          Log.e("IminPrinter", "labelLearning: 标签学习" + s);
          payload.putString("result", s);
          promise.resolve(payload);
        }

        @Override
        public void onRaiseException(int code, String msg) throws RemoteException {

        }

        @Override
        public void onPrintResult(int code, String msg) throws RemoteException {

        }
      });
    }
  }

  //设置打印模式
  @ReactMethod
  public void setPrintModel(int printModel, final Promise promise) {
    if (iminPrintUtils == null) {
      Log.e("IminPrinter", "setPrintModel: 设置打印模式" + printModel);
      PrinterHelper.getInstance().setPrinterMode(printModel);
      promise.resolve(true);
    }
  }

  private BroadcastReceiver createChargingStateBroadcastReceiver() {
    return new BroadcastReceiver() {
      @Override
      public void onReceive(Context context, Intent intent) {
        int status = intent.getIntExtra(ACTION_PRITER_STATUS, -1);
        Log.d(TAG, "打印机状态：" + intent.getAction());
        // 发送事件到React Native
        if (intent.getAction().equals(ACTION_PRITER_STATUS_CHANGE)) {
          WritableMap result = Arguments.createMap();
          WritableMap payload = Arguments.createMap();
          payload.putString("message", Utils.getInstance().getPrinterStatusText(status));
          payload.putString("code", String.format("%d", status));
          result.putMap("eventData", payload);
          result.putString("eventName", "printer_status");
          sendEvent(reactContext, "eventBroadcast", result);
        }
      }
    };
  }

  private void initializeBroadcastReceiver() {
    IntentFilter intentFilter = new IntentFilter();
    mBroadcastReceiver = createChargingStateBroadcastReceiver();
    intentFilter.addAction(ACTION_PRITER_STATUS_CHANGE);
    intentFilter.addAction(ACTION_POGOPIN_STATUS_CHANGE);
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        getReactApplicationContext().registerReceiver(mBroadcastReceiver, intentFilter, Context.RECEIVER_EXPORTED);
    } else {
        getReactApplicationContext().registerReceiver(mBroadcastReceiver, intentFilter);
    }
  }

  @ReactMethod
  public void addListener(String eventName) {
  }

  @ReactMethod
  public void removeListeners(Integer count) {
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put("SDK_VERSION_IMIN", sdkVersion);
    return constants;
  }

}
