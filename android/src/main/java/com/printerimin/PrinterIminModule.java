package com.printerimin;


import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;

import android.graphics.Bitmap;
import android.graphics.Typeface;
import android.graphics.BitmapFactory;
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


import com.imin.library.SystemPropManager;
import com.imin.printer.PrinterHelper;
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

@ReactModule(name = PrinterIminModule.NAME)
public class PrinterIminModule extends ReactContextBaseJavaModule {
  private final ReactApplicationContext reactContext;
  public static final String NAME = "PrinterImin";
  private IminPrintUtils iminPrintUtils;
  private IminPrintUtils.PrintConnectType connectType = IminPrintUtils.PrintConnectType.SPI;

  public PrinterIminModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    if (Build.MODEL.equals("W27_Pro") || Build.MODEL.equals("I23D01") || Build.MODEL.equals("I23M01") || Build.MODEL.equals("I23M02")) {
      //初始化 2.0 的 SDK。
      PrinterHelper.getInstance().initPrinterService(reactContext);
    } else {
      //初始化 1.0 SDK
      iminPrintUtils = IminPrintUtils.getInstance(reactContext);
      String deviceModel = SystemPropManager.getModel();
      if (deviceModel.contains("M2-203") || deviceModel.contains("M2-202") || deviceModel.contains("M2-Pro")) {
        connectType = IminPrintUtils.PrintConnectType.SPI;
      } else {
        connectType = IminPrintUtils.PrintConnectType.USB;
      }
      iminPrintUtils.resetDevice();
    }
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }


  @ReactMethod
  public void initPrinter(final Promise promise) {
    try {
      if (iminPrintUtils != null) {
        iminPrintUtils.initPrinter(connectType);
      }
      promise.resolve(true);
    } catch (Exception e) {
      promise.reject("ININTPRINTER_FAILED", e.getMessage());
    }
  }

  @ReactMethod
  public void getPrinterStatus(final Promise promise) {
    WritableMap payload = Arguments.createMap();
    if (iminPrintUtils != null) {
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
        iminPrintUtils.printText(text);
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
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("printAndLineFeed_failed", e.getMessage());
    }
  }

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
        int fontSizeColumn = col.getInt("fontSize");
        colsText[i] = textColumn;
        colsWidth[i] = widthColumn;
        colsAlign[i] = alignColumn;
        colsFontSize[i] = fontSizeColumn;
      }
      if (iminPrintUtils != null) {
        iminPrintUtils.printColumnsText(colsText, colsWidth, colsAlign, colsFontSize);
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
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("partialCut_failed", e.getMessage());
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
        Log.d("printSingleBitmap", "image:" + image);
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
        }
      } else {
        Bitmap image = Glide.with(reactContext).asBitmap().load(url).diskCacheStrategy(DiskCacheStrategy.NONE).skipMemoryCache(true).submit().get();
        Log.d("printSingleBitmap", "image:" + image);
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
      Log.d("printMultiBitmap", "config:" + config.getArray("urls"));
      ReadableArray urls = config.getArray("urls");
      ArrayList<Bitmap> bitmaps = new ArrayList<Bitmap>();
      if (config.hasKey("width") && config.hasKey("height")) {
        int width = config.getInt("width");
        int height = config.getInt("height");
        for (int i = 0; i < urls.size(); i++) {
          bitmaps.add(Glide.with(reactContext).asBitmap().load(urls.getString(i)).diskCacheStrategy(DiskCacheStrategy.NONE).skipMemoryCache(true).submit(width, height).get());
        }
        if (iminPrintUtils != null) {
          if (config.hasKey("align")) {
            int align = config.getInt("align");
            iminPrintUtils.printMultiBitmap(bitmaps, align);
          } else {
            iminPrintUtils.printMultiBitmap(bitmaps, 0);
          }
        }
      } else {
        for (int i = 0; i < urls.size(); i++) {
          bitmaps.add(Glide.with(reactContext).asBitmap().load(urls.getString(i)).diskCacheStrategy(DiskCacheStrategy.NONE).skipMemoryCache(true).submit().get());
        }
        if (iminPrintUtils != null) {
          if (config.hasKey("align")) {
            int align = config.getInt("align");
            iminPrintUtils.printMultiBitmap(bitmaps, align);
          } else {
            iminPrintUtils.printMultiBitmap(bitmaps, 0);
          }
        }
      }
      // // if (image.isRecycled()) {
      // //   return;
      // // }
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
        Log.d("printSingleBitmap", "image:" + image);
        if (iminPrintUtils != null) {
          iminPrintUtils.printSingleBitmapBlackWhite(image);
        }
      } else {
        Bitmap image = Glide.with(reactContext).asBitmap().load(url).diskCacheStrategy(DiskCacheStrategy.NONE).skipMemoryCache(true).submit().get();
        if (image.isRecycled()) {
          return;
        }
        Log.d("printSingleBitmap", "image:" + image);

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
      if (iminPrintUtils != null) {
        if (config.hasKey("align")) {
          int align = config.getInt("align");
          iminPrintUtils.printQrCode(qrStr, align);
        } else {
          iminPrintUtils.printQrCode(qrStr);
        }
        promise.resolve(null);
      }
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
         iminPrintUtils.openCashBox();
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
    } catch (Exception e) {
      promise.reject("resetDevice_failed", e.getMessage());
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
