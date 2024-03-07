import { NativeModules, Platform, NativeEventEmitter } from 'react-native';

import {
  IminPrintAlign,
  IminTypeface,
  IminPrinterType,
  IminFontStyle,
  IminQrcodeCorrectionLevel,
  IminBarCodeToBitmapFormat,
  IminBarCodeStyle,
  IminBarcodeType,
  IminBarcodeTextPos,
  IminQrCodeStyle,
  IminDoubleQRCodeStyle,
  IminPictureStyle,
  IminBaseStyle,
  IminTextStyle,
  IminTextPictureStyle,
} from './typing';
export {
  IminPrintAlign,
  IminFontStyle,
  IminTypeface,
  IminQrcodeCorrectionLevel,
  IminBarCodeToBitmapFormat,
  IminBarCodeStyle,
  IminBarcodeType,
  IminBarcodeTextPos,
  IminQrCodeStyle,
  IminDoubleQRCodeStyle,
  IminPictureStyle,
  IminBaseStyle,
  IminTextPictureStyle,
};
const LINKING_ERROR =
  `The package 'react-native-printer-imin' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const PrinterImin = NativeModules.PrinterImin
  ? NativeModules.PrinterImin
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const PrinterSDK: IminPrinterType = {
  version: PrinterImin.SDK_VERSION_IMIN as string,
  receiveBroadcastStream: {
    listen(
      callBackHandle: (payload: { eventName: string; eventData: any }) => void
    ) {
      const eventEmitter = new NativeEventEmitter(NativeModules.PrinterImin);
      const eventListener = eventEmitter.addListener(
        'eventBroadcast',
        (payload: { eventName: string; eventData: any }) => {
          callBackHandle(payload);
        }
      );
      // PrinterImin.getUsePrinterSdkVersion();
      return () => {
        eventListener.remove();
      };
    },
  },
  initPrinter: PrinterImin.initPrinter,
  getPrinterStatus: PrinterImin.getPrinterStatus,
  setTextSize: PrinterImin.setTextSize,
  setTextTypeface: PrinterImin.setTextTypeface,
  setTextStyle: PrinterImin.setTextStyle,
  setAlignment: PrinterImin.setAlignment,
  setTextLineSpacing: PrinterImin.setTextLineSpacing,
  printText(text: string, style?: IminTextStyle) {
    let textStr = `${text}\n`;
    if (style) {
      if (style.wordWrap !== undefined && style.wordWrap === false) {
        textStr = text;
      }
      if (style.align !== undefined) {
        PrinterImin.setAlignment(style.align);
      }
      if (style.width !== undefined) {
        PrinterImin.setTextWidth(style.width);
      }

      if (style.fontSize !== undefined) {
        PrinterImin.setTextSize(style.fontSize);
      }
      if (style.typeface !== undefined) {
        PrinterImin.setTextTypeface(style.typeface);
      }
      if (style.fontStyle !== undefined) {
        PrinterImin.setTextStyle(style.fontStyle);
      }
    }
    return PrinterImin.printText(textStr).then(() => {
      if (style?.align !== undefined) {
        PrinterImin.setAlignment(IminPrintAlign.left);
      }
      if (style?.typeface !== undefined) {
        PrinterImin.setTextTypeface(IminTypeface.Default);
      }
      if (style?.fontStyle !== undefined) {
        PrinterImin.setTextStyle(IminFontStyle.normal);
      }
    });
  },
  printAntiWhiteText(text: string, style?: IminTextStyle) {
    let textStr = `${text}\n`;
    if (style) {
      if (style.wordWrap !== undefined && style.wordWrap === false) {
        textStr = text;
      }

      if (style.align !== undefined) {
        PrinterImin.setAlignment(style.align);
      }
      if (style.width !== undefined) {
        PrinterImin.setTextWidth(style.width);
      }

      if (style.fontSize !== undefined) {
        PrinterImin.setTextSize(style.fontSize);
      }
      if (style.typeface !== undefined) {
        PrinterImin.setTextTypeface(style.typeface);
      }
      if (style.fontStyle !== undefined) {
        PrinterImin.setTextStyle(style.fontStyle);
      }
    }
    return PrinterImin.printAntiWhiteText(textStr).then(() => {
      if (style?.align !== undefined) {
        PrinterImin.setAlignment(IminPrintAlign.left);
      }
      if (style?.typeface !== undefined) {
        PrinterImin.setTextTypeface(IminTypeface.Default);
      }
      if (style?.fontStyle !== undefined) {
        PrinterImin.setTextStyle(IminFontStyle.normal);
      }
    });
  },
  setTextWidth: PrinterImin.setTextWidth,
  printAndLineFeed: PrinterImin.printAndLineFeed,
  printAndFeedPaper: PrinterImin.printAndFeedPaper,
  printColumnsText: PrinterImin.printColumnsText,
  setPageFormat: PrinterImin.setPageFormat,
  partialCut: PrinterImin.partialCut,
  printSingleBitmap(uri: string, pictureStyle?: IminPictureStyle) {
    return PrinterImin.printSingleBitmap({
      url: uri,
      align: pictureStyle?.align,
      width: pictureStyle?.width,
      height: pictureStyle?.height,
    });
  },
  printMultiBitmap(imgs: string[], pictureStyle?: IminPictureStyle) {
    return PrinterImin.printMultiBitmap({
      urls: imgs,
      align: pictureStyle?.align,
      width: pictureStyle?.width,
      height: pictureStyle?.height,
    });
  },
  printSingleBitmapBlackWhite(uri: string, baseStyle?: IminBaseStyle) {
    return PrinterImin.printSingleBitmapBlackWhite({
      url: uri,
      width: baseStyle?.width,
      height: baseStyle?.height,
    });
  },
  openCashBox: PrinterImin.openCashBox,
  setQrCodeSize: PrinterImin.setQrCodeSize,
  setLeftMargin: PrinterImin.setLeftMargin,
  setQrCodeErrorCorrectionLev: PrinterImin.setQrCodeErrorCorrectionLev,
  setBarCodeWidth: PrinterImin.setBarCodeWidth,
  setBarCodeHeight: PrinterImin.setBarCodeHeight,
  setBarCodeContentPrintPos: PrinterImin.setBarCodeContentPrintPos,
  printBarCode(
    barCodeType: IminBarcodeType,
    barCodeContent: string,
    style?: IminBarCodeStyle
  ) {
    const params: {
      data: string;
      type: number;
      width?: number;
      height?: number;
      position?: number;
      align?: number;
    } = { data: barCodeContent, type: barCodeType };
    if (style !== undefined) {
      if (
        style.width !== undefined &&
        style.height !== undefined &&
        style.position !== undefined &&
        style.align !== undefined
      ) {
        params.width = style.width;
        params.height = style.height;
        params.position = style.position;
        params.align = style.align;
      } else {
        if (style.width !== undefined) {
          PrinterImin.setBarCodeWidth(style.width);
        }
        if (style.height !== undefined) {
          PrinterImin.setBarCodeHeight(style.height);
        }
        if (style.position !== undefined) {
          PrinterImin.setBarCodeContentPrintPos(style.position);
        }
        if (style.align !== undefined) {
          params.align = style.align;
        }
      }
    }
    return PrinterImin.printBarCode(params);
  },
  setDoubleQRSize: PrinterImin.setDoubleQRSize,
  setDoubleQR1Level: PrinterImin.setDoubleQR1Level,
  setDoubleQR2Level: PrinterImin.setDoubleQR2Level,
  setDoubleQR1MarginLeft: PrinterImin.setDoubleQR1MarginLeft,
  setDoubleQR2MarginLeft: PrinterImin.setDoubleQR2MarginLeft,
  setDoubleQR1Version: PrinterImin.setDoubleQR1Version,
  setDoubleQR2Version: PrinterImin.setDoubleQR2Version,
  printQrCode(data: string, qrCodeStyle?: IminQrCodeStyle) {
    const params: {
      data: string;
      align?: number;
      qrSize?: number;
      level?: number;
    } = { data };
    if (qrCodeStyle !== undefined) {
      if (
        qrCodeStyle.qrSize !== undefined &&
        qrCodeStyle.errorCorrectionLevel !== undefined &&
        qrCodeStyle.align !== undefined
      ) {
        params.align = qrCodeStyle.align;
        params.qrSize = qrCodeStyle.qrSize;
        params.level = qrCodeStyle.errorCorrectionLevel;
        if (qrCodeStyle.leftMargin !== undefined) {
          PrinterImin.setLeftMargin(qrCodeStyle.leftMargin);
        }
      } else {
        if (qrCodeStyle.qrSize !== undefined) {
          PrinterImin.setQrCodeSize(qrCodeStyle.qrSize);
        }
        if (qrCodeStyle.leftMargin !== undefined) {
          PrinterImin.setLeftMargin(qrCodeStyle.leftMargin);
        }
        if (qrCodeStyle.errorCorrectionLevel !== undefined) {
          PrinterImin.setQrCodeErrorCorrectionLev(
            qrCodeStyle.errorCorrectionLevel
          );
        }
        if (qrCodeStyle.align !== undefined) {
          params.align = qrCodeStyle.align;
        }
      }
    }
    return PrinterImin.printQrCode(params);
  },
  printDoubleQR(
    qrCode1: IminDoubleQRCodeStyle,
    qrCode2: IminDoubleQRCodeStyle,
    doubleQRSize: number
  ) {
    if (qrCode1.leftMargin !== undefined) {
      PrinterImin.setDoubleQR1MarginLeft(qrCode1.leftMargin);
    }
    if (qrCode2.leftMargin !== undefined) {
      PrinterImin.setDoubleQR2MarginLeft(qrCode2.leftMargin);
    }
    if (qrCode1.level !== undefined) {
      PrinterImin.setDoubleQR1Level(qrCode1.level);
    }
    if (qrCode2.level !== undefined) {
      PrinterImin.setDoubleQR2Level(qrCode2.level);
    }
    if (qrCode1.version !== undefined) {
      PrinterImin.setDoubleQR1Version(qrCode1.version);
    }
    if (qrCode2.version !== undefined) {
      PrinterImin.setDoubleQR2Version(qrCode2.version);
    }
    if (doubleQRSize !== undefined) {
      PrinterImin.setDoubleQRSize(doubleQRSize);
    }
    return PrinterImin.printDoubleQR({
      qrCode1Text: qrCode1.text,
      qrCode2Text: qrCode2.text,
    });
  },
  setInitIminPrinter: PrinterImin.setInitIminPrinter,
  resetDevice: PrinterImin.resetDevice,
  // 2.0
  getFontCodepage: PrinterImin.getFontCodepage,
  setFontCodepage: PrinterImin.setFontCodepage,
  getCurCodepage: PrinterImin.getCurCodepage,
  getEncodeList: PrinterImin.getEncodeList,
  setPrinterEncode: PrinterImin.setPrinterEncode,
  getCurEncode: PrinterImin.getCurEncode,
  getPrinterDensityList: PrinterImin.getPrinterDensityList,
  setPrinterDensity: PrinterImin.setPrinterDensity,
  getPrinterDensity: PrinterImin.getPrinterDensity,
  getPrinterSpeedList: PrinterImin.getPrinterSpeedList,
  setPrinterSpeed: PrinterImin.setPrinterSpeed,
  getPrinterSpeed: PrinterImin.getPrinterSpeed,
  getPrinterPaperTypeList: PrinterImin.getPrinterPaperTypeList,
  getPrinterPaperType: PrinterImin.getPrinterPaperType,
  getPrinterSerialNumber: PrinterImin.getPrinterSerialNumber,
  getPrinterModelName: PrinterImin.getPrinterModelName,
  getPrinterThermalHead: PrinterImin.getPrinterThermalHead,
  getPrinterFirmwareVersion: PrinterImin.getPrinterFirmwareVersion,
  getServiceVersion: PrinterImin.getServiceVersion,
  getPrinterHardwareVersion: PrinterImin.getPrinterHardwareVersion,
  getUsbPrinterVidPid: PrinterImin.getUsbPrinterVidPid,
  getUsbDevicesName: PrinterImin.getUsbDevicesName,
  getPrinterPaperDistance: PrinterImin.getPrinterPaperDistance,
  getPrinterCutTimes: PrinterImin.getPrinterCutTimes,
  getPrinterMode: PrinterImin.getPrinterMode,
  getDrawerStatus: PrinterImin.getDrawerStatus,
  getOpenDrawerTimes: PrinterImin.getOpenDrawerTimes,
  printerSelfChecking: PrinterImin.printerSelfChecking,
  printSingleBitmapColorChart(uri: string, pictureStyle?: IminPictureStyle) {
    return PrinterImin.printSingleBitmap({
      url: uri,
      align: pictureStyle?.align,
      width: pictureStyle?.width,
      height: pictureStyle?.height,
    });
  },
  sendRAWData: PrinterImin.sendRAWData,
  unBindService: PrinterImin.unBindService,
  initPrinterParams: PrinterImin.initPrinterParams,
  fullCut: PrinterImin.fullCut,
  printColumnsString: PrinterImin.printColumnsString,
  setCodeAlignment: PrinterImin.setCodeAlignment,
  setTextBitmapTypeface: PrinterImin.setTextBitmapTypeface,
  setTextBitmapSize: PrinterImin.setTextBitmapSize,
  setTextBitmapStyle: PrinterImin.setTextBitmapStyle,
  setTextBitmapStrikeThru: PrinterImin.setTextBitmapStrikeThru,
  setTextBitmapUnderline: PrinterImin.setTextBitmapUnderline,
  setTextBitmapLineSpacing: PrinterImin.setTextBitmapLineSpacing,
  setTextBitmapLetterSpacing: PrinterImin.setTextBitmapLetterSpacing,
  setTextBitmapAntiWhite: PrinterImin.setTextBitmapAntiWhite,
  printTextBitmap(text: string, style?: IminTextPictureStyle) {
    let textStr = `${text}\n`;
    if (style) {
      if (style.wordWrap !== undefined && style.wordWrap === false) {
        textStr = text;
      }
      if (style.fontSize !== undefined) {
        PrinterImin.setTextBitmapSize(style.fontSize);
      }
      if (style.typeface !== undefined) {
        PrinterImin.setTextBitmapTypeface(style.typeface);
      }
      if (style.fontStyle !== undefined) {
        PrinterImin.setTextBitmapStyle(style.fontStyle);
      }
      if (style.throughline !== undefined) {
        PrinterImin.setTextBitmapStrikeThru(style.throughline);
      }
      if (style.underline !== undefined) {
        PrinterImin.setTextBitmapUnderline(style.underline);
      }
      if (style.lineHeight !== undefined) {
        PrinterImin.setTextBitmapLineSpacing(style.lineHeight);
      }
      if (style.letterSpacing !== undefined) {
        PrinterImin.setTextBitmapLetterSpacing(style.letterSpacing);
      }
      if (style.reverseWhite !== undefined) {
        PrinterImin.setTextBitmapAntiWhite(style.reverseWhite);
      }
    }
    return PrinterImin.printTextBitmap({ text: textStr, align: style?.align });
  },
  enterPrinterBuffer: PrinterImin.enterPrinterBuffer,
  commitPrinterBuffer: PrinterImin.commitPrinterBuffer,
  exitPrinterBuffer: PrinterImin.exitPrinterBuffer,
};

export default PrinterSDK;
