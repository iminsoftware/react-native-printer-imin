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
  code93 = 7,
  code128 = 8,
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

export interface IminTextPictureStyle {
  wordWrap?: boolean;
  fontSize?: number;
  typeface?: IminTypeface;
  fontStyle?: IminFontStyle;
  align?: IminPrintAlign;
  letterSpacing?: number;
  underline?: boolean;
  throughline?: boolean;
  lineHeight?: number;
  reverseWhite?: boolean;
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

export interface IminPictureStyle extends IminBaseStyle {
  align?: IminPrintAlign;
}

//2.0标签相关
export enum ShapeStyle {
  RECT_FILL,
  RECT_WHITE,
  RECT_REVERSE,
  BOX,
  CIRCLE,
  OVAL,
  PATH
}
export enum ImageAlgorithm {
  BINARIZATION,
  DITHERING
}

export enum Rotate {
  ROTATE_0,
  ROTATE_90,
  ROTATE_180,
  ROTATE_270
}

export enum ErrorLevel {
  L,
  M,
  Q,
  H
}

export enum Symbology {
  UPCA,
  UPCE,
  EAN13,
  EAN8,
  CODE39,
  ITF,
  CODABAR,
  CODE93,
  CODE128

}

export enum AlignLabel {
  DEFAULT,
  LEFT,
  CENTER,
  RIGHT
}

export enum HumanReadable {
  HIDE,
  POS_ONE,
  POS_TWO,
  POS_THREE
}

export interface LabelAreaStyle {
  style?: ShapeStyle;
  width?: number;
  height?: number;
  posX?: number;
  posY?: number;
  endX?: number;
  endY?: number;
  thick?: number;
}
export const defaultLabelAreaStyle: LabelAreaStyle = {
  style: ShapeStyle.RECT_FILL,
  width: 50,
  height: 50,
  posX: 0,
  posY: 0,
  endX: 50,
  endY: 50,
  thick: 1,
};

export interface LabelBarCodeStyle {
  barCode?: string;
  posX?: number;
  posY?: number;
  dotWidth?: number;
  barHeight?: number;
  readable?: HumanReadable;
  symbology?: Symbology;
  align?: AlignLabel;
  rotate?: Rotate;
  width?: number;
  height?: number;
}

export const defaultLabelBarCodeStyle: LabelBarCodeStyle = {
  barCode: '',
  posX: 0,
  posY: 0,
  dotWidth: 2,
  barHeight: 162,
  readable: HumanReadable.HIDE,
  symbology: Symbology.CODE39,
  align: AlignLabel.DEFAULT,
  rotate: Rotate.ROTATE_0,
  width: -1,
  height: -1,
};

export interface LabelBitmapStyle {
  bitmapUrl?: string;
  posX?: number;
  posY?: number;
  algorithm?: ImageAlgorithm;
  value?: number;
  width?: number;
  height?: number;
}
export const defaultLabelBitmapStyle: LabelBitmapStyle = {
  bitmapUrl: '',
  posX: 0,
  posY: 0,
  algorithm: ImageAlgorithm.BINARIZATION,
  value: 200,
  width: -1,
  height: -1,
};

export interface LabelCanvasStyle {
  width?: number;
  height?: number;
  posX?: number;
  posY?: number;
}

export const defaultLabelCanvasStyle: LabelCanvasStyle = {
  width: 50,
  height: 50,
  posX: 0,
  posY: 0,
};

export interface LabelQrCodeStyle {
  qrCode?: string;
  posX?: number;
  posY?: number;
  size?: number;
  errorLevel?: ErrorLevel;
  rotate?: Rotate;
  width?: number;
  height?: number;
}

export const defaultLabelQrCodeStyle: LabelQrCodeStyle = {
  qrCode: '',
  posX: 0,
  posY: 0,
  size: 4,
  errorLevel: ErrorLevel.L,
  rotate: Rotate.ROTATE_0,
  width: -1,
  height: -1,
};

export interface LabelTextStyle {
  text?: string;
  posX?: number;
  posY?: number;
  textSize?: number;
  textWidthRatio?: number;
  textHeightRatio?: number;
  width?: number;
  height?: number;
  align?: AlignLabel;
  rotate?: Rotate;
  textSpace?: number;
  enableBold?: boolean;
  enableUnderline?: boolean;
  enableStrikethrough?: boolean;
  enableItalics?: boolean;
  enAntiColor?: boolean;
}

export const defaultLabelTextStyle: LabelTextStyle = {
  text: '',
  posX: 0,
  posY: 0,
  textSize: 24,
  textWidthRatio: 1,
  textHeightRatio: 1,
  width: -1,
  height: -1,
  align: AlignLabel.DEFAULT,
  rotate: Rotate.ROTATE_0,
  textSpace: 0,
  enableBold: false,
  enableUnderline: false,
  enableStrikethrough: false,
  enableItalics: false,
  enAntiColor: false,
};

export interface LabelPrintBitmapStyle {
  bitmapUrl?: string;
  width?: number;
  height?: number;
}

//2.0标签打印相关

export type IminPrinterType = {
  version: string;
  receiveBroadcastStream: {
    listen: (
      callBackHandle: (payload: { eventName: string; eventData: any }) => void
    ) => () => void;
  };
  initPrinter: () => Promise<string>;
  getPrinterStatus: () => Promise<{ code: number; message: string }>;
  setTextSize: (size: number) => Promise<void>;
  setTextTypeface: (font: number) => Promise<void>;
  setTextStyle: (style: number) => Promise<void>;
  setAlignment: (align: number) => Promise<void>;
  setTextLineSpacing: (spacing: number) => Promise<void>;
  printText: (text: string, style?: IminTextStyle) => Promise<void>;
  printAntiWhiteText: (text: string, style?: IminTextStyle) => Promise<void>;
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
    uri: string,
    pictureStyle?: IminPictureStyle
  ) => Promise<void>;
  printMultiBitmap: (
    imgs: string[],
    pictureStyle?: IminPictureStyle
  ) => Promise<void>;
  printSingleBitmapBlackWhite: (
    uri: string,
    baseStyle?: IminBaseStyle
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
  openCashBox: () => Promise<void>;
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
  // 2.0
  getFontCodepage: () => Promise<string[]>;
  setFontCodepage: (codepage: number) => Promise<void>;
  getCurCodepage: () => Promise<string>;
  getEncodeList: () => Promise<string[]>;
  setPrinterEncode: (encode: number) => Promise<void>;
  getCurEncode: () => Promise<string>;
  getPrinterDensityList: () => Promise<string[]>;
  setPrinterDensity: (density: number) => Promise<void>;
  getPrinterDensity: () => Promise<number>;
  getPrinterSpeedList: () => Promise<string[]>;
  setPrinterSpeed: (speed: number) => Promise<void>;
  getPrinterSpeed: () => Promise<number>;
  getPrinterPaperTypeList: () => Promise<string[]>;
  getPrinterPaperType: () => Promise<number>;
  getPrinterSerialNumber: () => Promise<string>;
  getPrinterModelName: () => Promise<string>;
  getPrinterThermalHead: () => Promise<string>;
  getPrinterFirmwareVersion: () => Promise<string>;
  getServiceVersion: () => Promise<string>;
  getPrinterHardwareVersion: () => Promise<string>;
  getUsbPrinterVidPid: () => Promise<string>;
  getUsbDevicesName: () => Promise<string>;
  getPrinterPaperDistance: () => Promise<number>;
  getPrinterCutTimes: () => Promise<string>;
  getPrinterMode: () => Promise<number>;
  getDrawerStatus: () => Promise<boolean>;
  getOpenDrawerTimes: () => Promise<number>;
  printSingleBitmapColorChart: (
    uri: string,
    pictureStyle?: IminPictureStyle
  ) => Promise<void>;
  printerSelfChecking: () => Promise<void>;
  sendRAWData: (bytes: number[]) => Promise<void>;
  initPrinterParams: () => Promise<void>;
  unBindService: () => Promise<void>;
  fullCut: () => Promise<void>;
  printColumnsString: (
    cols: {
      text: string;
      width: number;
      align: IminPrintAlign;
      fontSize: number;
    }[]
  ) => Promise<void>;
  setCodeAlignment: (align: IminPrintAlign) => Promise<void>;
  setTextBitmapTypeface: (typeface: IminTypeface) => Promise<void>;
  setTextBitmapSize: (size: number) => Promise<void>;
  setTextBitmapStyle: (style: IminFontStyle) => Promise<void>;
  setTextBitmapStrikeThru: (strikeThru: boolean) => Promise<void>;
  setTextBitmapUnderline: (haveUnderline: boolean) => Promise<void>;
  setTextBitmapLineSpacing: (lineHeight: number) => Promise<void>;
  setTextBitmapLetterSpacing: (space: number) => Promise<void>;
  setTextBitmapAntiWhite: (antiWhite: boolean) => Promise<void>;
  printTextBitmap: (
    text: string,
    style?: IminTextPictureStyle
  ) => Promise<void>;
  enterPrinterBuffer: (isClean: boolean) => Promise<void>;
  commitPrinterBuffer: () => Promise<void>;
  exitPrinterBuffer: (isCommit: boolean) => Promise<void>;
  openLogs: (open: number) => Promise<void>;
  sendRAWDataHexStr: (byteStr: string) => Promise<void>;

  //标签
  labelInitCanvas: (labelCanvasStyle: LabelCanvasStyle) => Promise<void>;
  labelAddText: (labelTexStyle: LabelTextStyle) => Promise<void>;
  labelAddBarCode: (labelBarCodeStyle: LabelBarCodeStyle) => Promise<void>;
  labelAddQrCode: (labelQrCodeStyle: LabelQrCodeStyle) => Promise<void>;
  labelAddBitmap: (labelAddBitmap: LabelBitmapStyle) => Promise<void>;
  printLabelBitmap: (printLabelBitmap: LabelPrintBitmapStyle) => Promise<void>;
  labelAddArea: (labelAreaStyle: LabelAreaStyle) => Promise<void>;
  labelPrintCanvas: (printCount: number) => Promise<{ result: string, resultCode: number }>;
  //标签学习返回值
  labelLearning: () => Promise<{ result: string }>;
  setPrintModel: (printModel: number) => Promise<void>;
};
