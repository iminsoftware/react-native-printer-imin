# API Reference

This document provides detailed descriptions of all API interfaces in `react-native-printer-imin`.

## Table of Contents

- [Basic APIs](#basic-apis)
- [Text Printing](#text-printing)
- [Image Printing](#image-printing)
- [QR Code Printing](#qr-code-printing)
- [Barcode Printing](#barcode-printing)
- [Table Printing](#table-printing)
- [Device Control](#device-control)
- [SDK 2.0 APIs](#sdk-20-apis)
- [Label Printing](#label-printing)
- [Type Definitions](#type-definitions)

## Basic APIs

### initPrinter()

Initialize the printer.

```typescript
initPrinter(): Promise<string>
```

**Returns**: Promise<string> - Initialization result message

**Example**:
```typescript
try {
  const result = await PrinterImin.initPrinter();
  console.log('Initialization successful:', result);
} catch (error) {
  console.error('Initialization failed:', error);
}
```

### getPrinterStatus()

Get current printer status.

```typescript
getPrinterStatus(): Promise<{code: number, message: string}>
```

**Returns**: 
- `code`: Status code (0 means normal)
- `message`: Status description

**Example**:
```typescript
const status = await PrinterImin.getPrinterStatus();
if (status.code === 0) {
  console.log('Printer normal:', status.message);
} else {
  console.error('Printer error:', status.message);
}
```

### receiveBroadcastStream

Listen for printer status broadcasts.

```typescript
receiveBroadcastStream: {
  listen(callback: (payload: {eventName: string, eventData: any}) => void): () => void
}
```

**Parameters**:
- `callback`: Callback function that receives broadcast data

**Returns**: Function to cancel listening

**Example**:
```typescript
const unsubscribe = PrinterImin.receiveBroadcastStream.listen((payload) => {
  console.log('Event name:', payload.eventName);
  console.log('Event data:', payload.eventData);
});

// Cancel listening
unsubscribe();
```

## Text Printing

### printText()

Print text content.

```typescript
printText(text: string, style?: IminTextStyle): Promise<void>
```

**Parameters**:
- `text`: Text to print
- `style`: Optional text style

**IminTextStyle Interface**:
```typescript
interface IminTextStyle {
  wordWrap?: boolean;      // Auto line wrap
  fontSize?: number;       // Font size
  space?: number;          // Line spacing
  width?: number;          // Text width
  typeface?: IminTypeface; // Font type
  fontStyle?: IminFontStyle; // Font style
  align?: IminPrintAlign;  // Alignment
}
```

**Example**:
```typescript
// Basic text printing
await PrinterImin.printText('Hello World');

// Styled text printing
await PrinterImin.printText('Title Text', {
  fontSize: 32,
  align: IminPrintAlign.center,
  fontStyle: IminFontStyle.bold
});
```

### printAntiWhiteText()

Print inverted text (white text on black background).

```typescript
printAntiWhiteText(text: string, style?: IminTextStyle): Promise<void>
```

**Parameters**: Same as `printText()`

**Example**:
```typescript
await PrinterImin.printAntiWhiteText('Important Notice', {
  fontSize: 24,
  align: IminPrintAlign.center
});
```

### Text Format Settings

#### setTextSize()

Set text size.

```typescript
setTextSize(size: number): Promise<void>
```

#### setTextTypeface()

Set font type.

```typescript
setTextTypeface(typeface: IminTypeface): Promise<void>
```

#### setTextStyle()

Set font style.

```typescript
setTextStyle(style: IminFontStyle): Promise<void>
```

#### setAlignment()

Set alignment.

```typescript
setAlignment(align: IminPrintAlign): Promise<void>
```

#### setTextLineSpacing()

Set line spacing.

```typescript
setTextLineSpacing(spacing: number): Promise<void>
```

#### setTextWidth()

Set text width.

```typescript
setTextWidth(width: number): Promise<void>
```

## Image Printing

### printSingleBitmap()

Print a single image.

```typescript
printSingleBitmap(uri: string, pictureStyle?: IminPictureStyle): Promise<void>
```

**Parameters**:
- `uri`: Image URL or local path
- `pictureStyle`: Optional image style

**IminPictureStyle Interface**:
```typescript
interface IminPictureStyle {
  width?: number;          // Image width
  height?: number;         // Image height
  align?: IminPrintAlign;  // Alignment
}
```

**Example**:
```typescript
// Basic image printing
await PrinterImin.printSingleBitmap('https://example.com/logo.png');

// Styled image printing
await PrinterImin.printSingleBitmap('https://example.com/logo.png', {
  width: 200,
  height: 100,
  align: IminPrintAlign.center
});
```

### printMultiBitmap()

Print multiple images.

```typescript
printMultiBitmap(imgs: string[], pictureStyle?: IminPictureStyle): Promise<void>
```

**Parameters**:
- `imgs`: Array of image URLs
- `pictureStyle`: Optional image style

### printSingleBitmapBlackWhite()

Print inverted image.

```typescript
printSingleBitmapBlackWhite(uri: string, baseStyle?: IminBaseStyle): Promise<void>
```

## QR Code Printing

### printQrCode()

Print QR code.

```typescript
printQrCode(data: string, qrCodeStyle?: IminQrCodeStyle): Promise<void>
```

**Parameters**:
- `data`: QR code content
- `qrCodeStyle`: Optional QR code style

**IminQrCodeStyle Interface**:
```typescript
interface IminQrCodeStyle {
  qrSize?: number;                           // QR code size
  align?: IminPrintAlign;                    // Alignment
  leftMargin?: number;                       // Left margin
  errorCorrectionLevel?: IminQrcodeCorrectionLevel; // Error correction level
}
```

**Example**:
```typescript
await PrinterImin.printQrCode('https://www.example.com', {
  qrSize: 6,
  align: IminPrintAlign.center,
  errorCorrectionLevel: IminQrcodeCorrectionLevel.levelH
});
```

### printDoubleQR()

Print double QR codes.

```typescript
printDoubleQR(
  qrCode1: IminDoubleQRCodeStyle,
  qrCode2: IminDoubleQRCodeStyle,
  doubleQRSize: number
): Promise<void>
```

**IminDoubleQRCodeStyle Interface**:
```typescript
interface IminDoubleQRCodeStyle {
  text: string;        // QR code content
  level?: number;      // Error level
  leftMargin?: number; // Left margin
  version?: number;    // Version
}
```

### QR Code Setting Methods

#### setQrCodeSize()
```typescript
setQrCodeSize(qrSize: number): Promise<void>
```

#### setLeftMargin()
```typescript
setLeftMargin(margin: number): Promise<void>
```

#### setQrCodeErrorCorrectionLev()
```typescript
setQrCodeErrorCorrectionLev(level: IminQrcodeCorrectionLevel): Promise<void>
```

## Barcode Printing

### printBarCode()

Print barcode.

```typescript
printBarCode(
  barCodeType: IminBarcodeType,
  barCodeContent: string,
  style?: IminBarCodeStyle
): Promise<void>
```

**Parameters**:
- `barCodeType`: Barcode type
- `barCodeContent`: Barcode content
- `style`: Optional barcode style

**IminBarCodeStyle Interface**:
```typescript
interface IminBarCodeStyle {
  width?: number;                    // Barcode width
  height?: number;                   // Barcode height
  position?: IminBarcodeTextPos;     // Text position
  align?: IminPrintAlign;            // Alignment
}
```

**Example**:
```typescript
await PrinterImin.printBarCode(
  IminBarcodeType.code128,
  '1234567890',
  {
    width: 2,
    height: 100,
    position: IminBarcodeTextPos.belowText,
    align: IminPrintAlign.center
  }
);
```

### Barcode Setting Methods

#### setBarCodeWidth()
```typescript
setBarCodeWidth(width: number): Promise<void>
```

#### setBarCodeHeight()
```typescript
setBarCodeHeight(height: number): Promise<void>
```

#### setBarCodeContentPrintPos()
```typescript
setBarCodeContentPrintPos(position: IminBarcodeTextPos): Promise<void>
```

## Table Printing

### printColumnsText()

Print table/column text.

```typescript
printColumnsText(cols: ColumnMaker[]): Promise<void>
```

**ColumnMaker Interface**:
```typescript
interface ColumnMaker {
  text: string;            // Column content
  width: number;           // Column width
  align: IminPrintAlign;   // Alignment
  fontSize: number;        // Font size
}
```

**Example**:
```typescript
await PrinterImin.printColumnsText([
  {
    text: 'Product Name',
    width: 3,
    fontSize: 20,
    align: IminPrintAlign.left
  },
  {
    text: 'Qty',
    width: 1,
    fontSize: 20,
    align: IminPrintAlign.center
  },
  {
    text: 'Price',
    width: 2,
    fontSize: 20,
    align: IminPrintAlign.right
  }
]);
```

## Device Control

### printAndLineFeed()

Feed paper one line.

```typescript
printAndLineFeed(): Promise<void>
```

### printAndFeedPaper()

Feed paper specified height.

```typescript
printAndFeedPaper(height: number): Promise<void>
```

**Parameters**:
- `height`: Paper feed height (1-1016)

### setPageFormat()

Set paper format.

```typescript
setPageFormat(style?: number): Promise<void>
```

**Parameters**:
- `style`: Paper format (0-80mm, 1-58mm)

### partialCut()

Cut paper (only for devices with cutter).

```typescript
partialCut(): Promise<void>
```

### openCashBox()

Open cash drawer.

```typescript
openCashBox(): Promise<void>
```

### resetDevice()

Reset printer.

```typescript
resetDevice(): Promise<void>
```

### setInitIminPrinter()

Set initialize printer.

```typescript
setInitIminPrinter(isDefault: boolean): Promise<void>
```

## SDK 2.0 APIs

### Device Information

#### getPrinterSerialNumber()
```typescript
getPrinterSerialNumber(): Promise<string>
```

#### getPrinterModelName()
```typescript
getPrinterModelName(): Promise<string>
```

#### getPrinterFirmwareVersion()
```typescript
getPrinterFirmwareVersion(): Promise<string>
```

#### getPrinterHardwareVersion()
```typescript
getPrinterHardwareVersion(): Promise<string>
```

### Print Parameter Control

#### getPrinterDensity() / setPrinterDensity()
```typescript
getPrinterDensity(): Promise<number>
setPrinterDensity(density: number): Promise<void>
```

#### getPrinterSpeed() / setPrinterSpeed()
```typescript
getPrinterSpeed(): Promise<number>
setPrinterSpeed(speed: number): Promise<void>
```

### Buffer Management

#### enterPrinterBuffer()
```typescript
enterPrinterBuffer(isClean: boolean): Promise<void>
```

#### commitPrinterBuffer()
```typescript
commitPrinterBuffer(): Promise<void>
```

#### exitPrinterBuffer()
```typescript
exitPrinterBuffer(isCommit: boolean): Promise<void>
```

### Bitmap Text Printing

#### printTextBitmap()
```typescript
printTextBitmap(text: string, style?: IminTextPictureStyle): Promise<void>
```

**IminTextPictureStyle Interface**:
```typescript
interface IminTextPictureStyle {
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
```

## Label Printing

### labelInitCanvas()

Initialize label canvas.

```typescript
labelInitCanvas(labelCanvasStyle: LabelCanvasStyle): Promise<void>
```

### labelAddText()

Add text to label.

```typescript
labelAddText(labelTextStyle: LabelTextStyle): Promise<void>
```

### labelAddBarCode()

Add barcode to label.

```typescript
labelAddBarCode(labelBarCodeStyle: LabelBarCodeStyle): Promise<void>
```

### labelAddQrCode()

Add QR code to label.

```typescript
labelAddQrCode(labelQrCodeStyle: LabelQrCodeStyle): Promise<void>
```

### labelAddBitmap()

Add image to label.

```typescript
labelAddBitmap(labelBitmapStyle: LabelBitmapStyle): Promise<void>
```

### labelPrintCanvas()

Print label canvas.

```typescript
labelPrintCanvas(printCount: number): Promise<{result: string, resultCode: number}>
```

## Type Definitions

### Enum Types

#### IminPrintAlign
```typescript
enum IminPrintAlign {
  left = 0,
  center = 1,
  right = 2
}
```

#### IminFontStyle
```typescript
enum IminFontStyle {
  normal = 0,
  bold = 1,
  italic = 2,
  boldItalic = 3
}
```

#### IminTypeface
```typescript
enum IminTypeface {
  Default = 0,
  Monospace = 1,
  DefaultBold = 2,
  SansSerif = 3,
  Serif = 4
}
```

#### IminQrcodeCorrectionLevel
```typescript
enum IminQrcodeCorrectionLevel {
  levelL = 48,
  levelM = 49,
  levelQ = 50,
  levelH = 51
}
```

#### IminBarcodeType
```typescript
enum IminBarcodeType {
  upcA = 0,
  upcE = 1,
  jan13 = 2,
  jan8 = 3,
  code39 = 4,
  itf = 5,
  codabar = 6,
  code93 = 7,
  code128 = 8
}
```

#### IminBarcodeTextPos
```typescript
enum IminBarcodeTextPos {
  none = 0,
  aboveText = 1,
  belowText = 2,
  both = 3
}
```

### Debug Functions

#### openLogs()

Enable/disable debug logs.

```typescript
openLogs(open: number): Promise<void>
```

**Parameters**:
- `open`: 1-enable, 0-disable

#### sendRAWDataHexStr()

Send raw hexadecimal data.

```typescript
sendRAWDataHexStr(byteStr: string): Promise<void>
```

## Error Handling

All API methods return Promises and can be handled with try-catch:

```typescript
try {
  await PrinterImin.printText('Test text');
} catch (error) {
  console.error('Print failed:', error);
  
  // Check specific error types
  if (error.toString().includes('paper')) {
    // Handle paper out error
  } else if (error.toString().includes('temperature')) {
    // Handle overheating error
  }
}
```

## Version Compatibility

- SDK 1.0: Basic printing features
- SDK 2.0: All 1.0 features + Label printing + Advanced device control

Use `PrinterImin.version` to check current SDK version.