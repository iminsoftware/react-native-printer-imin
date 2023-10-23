// enum IminTypeface {
//   Default = 0,
//   Monospace = 1,
//   DefaultBold = 2,
//   SansSerif = 3,
//   Serif = 4,
// }
// enum IminFontStyle {
//   normal = 0,
//   bold = 1,
//   italic = 2,
//   boldItalic = 3,
// }

export enum IminPrintAlign {
  left = 0,
  center = 1,
  right = 2,
}
// enum IminQrcodeCorrectionLevel {
//   levelL = 48,
//   levelM = 49,
//   levelQ = 50,
//   levelH = 51,
// }

// enum IminBarcodeTextPos {
//   none = 0,
//   aboveText = 1,
//   belowText = 2,
//   both = 3,
// }
// enum IminBarcodeType {
//   upcA = 0,
//   upcE = 1,
//   jan13 = 2,
//   jan8 = 3,
//   code39 = 4,
//   itf = 5,
//   codabar = 6,
//   code128 = 73,
// }

// interface TextStyle {
//   wordWrap: boolean;
//   fontSize: number;
//   space: number;
//   width: number;
//   typeface: IminTypeface;
//   fontStyle: IminFontStyle;
//   align: IminPrintAlign;
// }

export type IminPrinterType = {
  initPrinter: () => Promise<string>;
  getPrinterStatus: () => Promise<{ code: number; message: string }>;
  printText: (text: string) => Promise<void>;
};
