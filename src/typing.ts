import type { ImageSourcePropType } from 'react-native';
export enum IminTypeface {
  Default = 0,
  Monospace = 1,
  DefaultBold = 2,
  SansSerif = 3,
  Serif = 4,
}
export enum IminFontStyle {
  normal = 0,
  bold = 1,
  italic = 2,
  boldItalic = 3,
}

export enum IminPrintAlign {
  left = 0,
  center = 1,
  right = 2,
}
export enum IminQrcodeCorrectionLevel {
  levelL = 48,
  levelM = 49,
  levelQ = 50,
  levelH = 51,
}

export enum IminBarcodeTextPos {
  none = 0,
  aboveText = 1,
  belowText = 2,
  both = 3,
}
export enum IminBarcodeType {
  upcA = 0,
  upcE = 1,
  jan13 = 2,
  jan8 = 3,
  code39 = 4,
  itf = 5,
  codabar = 6,
  code128 = 73,
}

export enum IminBarCodeToBitmapFormat {
  aztec = 0,
  codabar = 1,
  code39 = 2,
  code93 = 3,
  code128 = 4,
  dataMatrix = 5,
  ean13 = 6,
  itf = 7,
  maxicode = 8,
  pdf417 = 9,
  qrCode = 10,
  rss14 = 11,
  rssExpanded = 12,
  upcA = 13,
  upcE = 14,
  upcEanExteNsion = 15,
}
export interface IminBaseStyle {
  width?: number;
  height?: number;
}

export interface IminBarCodeStyle extends IminBaseStyle {
  position?: IminBarcodeTextPos;
  align?: IminPrintAlign;
}

export interface IminTextStyle {
  wordWrap?: boolean;
  fontSize?: number;
  space?: number;
  width?: number;
  typeface?: IminTypeface;
  fontStyle?: IminFontStyle;
  align?: IminPrintAlign;
}

export interface IminDoubleQRCodeStyle {
  text: string;
  level?: number;
  leftMargin?: number;
  version?: number;
}
export interface IminQrCodeStyle {
  qrSize?: number;
  align?: IminPrintAlign;
  leftMargin?: number;
  errorCorrectionLevel?: IminQrcodeCorrectionLevel;
}

export type IminPrinterType = {
  initPrinter: () => Promise<string>;
  getPrinterStatus: () => Promise<{ code: number; message: string }>;
  setTextSize: (size: number) => Promise<void>;
  setTextTypeface: (font: number) => Promise<void>;
  setTextStyle: (style: number) => Promise<void>;
  setAlignment: (align: number) => Promise<void>;
  setTextLineSpacing: (spacing: number) => Promise<void>;
  printText: (text: string, style?: IminTextStyle) => void;
  printAntiWhiteText: (text: string, style?: IminTextStyle) => void;
  setTextWidth: (width: number) => Promise<void>;
  printAndLineFeed: () => Promise<void>;
  printAndFeedPaper: (height: number) => Promise<void>;
  printColumnsText: (
    cols: {
      text: string;
      width: number;
      align: IminPrintAlign;
      fontSize: number;
    }[]
  ) => Promise<void>;
  setPageFormat: (style?: number) => Promise<void>;
  partialCut: () => Promise<void>;
  printSingleBitmap: (
    uri: string | ImageSourcePropType,
    align?: IminPrintAlign
  ) => Promise<void>;
  printMultiBitmap: (
    imgs: (string | ImageSourcePropType)[],
    align?: IminPrintAlign
  ) => Promise<void>;
  printSingleBitmapBlackWhite: (
    uri: string | ImageSourcePropType
  ) => Promise<void>;
  setQrCodeSize: (qrSize: number) => Promise<void>;
  setLeftMargin: (margin: number) => Promise<void>;
  setQrCodeErrorCorrectionLev: (
    level: IminQrcodeCorrectionLevel
  ) => Promise<void>;
  setBarCodeWidth: (width: number) => Promise<void>;
  setBarCodeHeight: (height: number) => Promise<void>;
  setBarCodeContentPrintPos: (position: IminBarcodeTextPos) => Promise<void>;
  printBarCode: (
    barCodeType: IminBarcodeType,
    barCodeContent: string,
    style?: IminBarCodeStyle
  ) => Promise<void>;
  setDoubleQRSize: (size: number) => Promise<void>;
  setDoubleQR1Level: (level: number) => Promise<void>;
  setDoubleQR2Level: (level: number) => Promise<void>;
  setDoubleQR1MarginLeft: (leftMargin: number) => Promise<void>;
  setDoubleQR2MarginLeft: (leftMargin: number) => Promise<void>;
  setDoubleQR1Version: (version: number) => Promise<void>;
  setDoubleQR2Version: (version: number) => Promise<void>;
  printQrCode: (data: string, qrCodeStyle?: IminQrCodeStyle) => Promise<void>;
  printDoubleQR: (
    qrCode1: IminDoubleQRCodeStyle,
    qrCode2: IminDoubleQRCodeStyle,
    doubleQRSize: number
  ) => Promise<void>;
  setInitIminPrinter: (isDefaultPrinter: boolean) => Promise<void>;
  resetDevice: () => Promise<void>;
};
