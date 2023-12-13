import {
  NativeModules,
  Platform,
  Image,
  type ImageSourcePropType,
  type ImageResolvedAssetSource,
} from 'react-native';
import type { IminPrinterType, IminTextStyle } from './typing';
import {
  IminPrintAlign,
  IminTypeface,
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
    PrinterImin.printText(textStr).then(() => {
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
    PrinterImin.printAntiWhiteText(textStr).then(() => {
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
  printSingleBitmap(
    uri: string | ImageSourcePropType,
    pictureStyle?: IminPictureStyle
  ) {
    const path = Image.resolveAssetSource(uri as ImageSourcePropType);
    console.log('path', path);
    return PrinterImin.printSingleBitmap({
      url: path?.uri || uri,
      align: pictureStyle?.align,
      width: pictureStyle?.width,
      height: pictureStyle?.height,
    });
  },
  printMultiBitmap(
    imgs: (string | ImageSourcePropType)[],
    pictureStyle?: IminPictureStyle
  ) {
    const imgList: (
      | ImageResolvedAssetSource['uri']
      | string
      | ImageSourcePropType
    )[] = [];
    imgs.forEach((imgUri) => {
      imgList.push(
        Image.resolveAssetSource(imgUri as ImageSourcePropType)?.uri || imgUri
      );
    });
    return PrinterImin.printMultiBitmap({
      urls: imgList,
      align: pictureStyle?.align,
      width: pictureStyle?.width,
      height: pictureStyle?.height,
    });
  },
  printSingleBitmapBlackWhite(
    uri: string | ImageSourcePropType,
    baseStyle?: IminBaseStyle
  ) {
    const path = Image.resolveAssetSource(uri as ImageSourcePropType);
    return PrinterImin.printSingleBitmapBlackWhite({
      url: path?.uri || uri,
      width: baseStyle?.width,
      height: baseStyle?.height,
    });
  },
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
    if (style !== undefined) {
      if (style.width !== undefined) {
        PrinterImin.setBarCodeWidth(style.width);
      }
      if (style.height !== undefined) {
        PrinterImin.setBarCodeHeight(style.height);
      }
      if (style.position !== undefined) {
        PrinterImin.setBarCodeContentPrintPos(style.position);
      }
    }
    return PrinterImin.printBarCode({
      data: barCodeContent,
      type: barCodeType,
      align: style?.align,
    });
  },
  setDoubleQRSize: PrinterImin.setDoubleQRSize,
  setDoubleQR1Level: PrinterImin.setDoubleQR1Level,
  setDoubleQR2Level: PrinterImin.setDoubleQR2Level,
  setDoubleQR1MarginLeft: PrinterImin.setDoubleQR1MarginLeft,
  setDoubleQR2MarginLeft: PrinterImin.setDoubleQR2MarginLeft,
  setDoubleQR1Version: PrinterImin.setDoubleQR1Version,
  setDoubleQR2Version: PrinterImin.setDoubleQR2Version,
  printQrCode(data: string, qrCodeStyle?: IminQrCodeStyle) {
    if (qrCodeStyle !== undefined) {
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
    }
    return PrinterImin.printQrCode({ data, align: qrCodeStyle?.align });
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
};

export default PrinterSDK;
