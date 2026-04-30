# react-native-printer-imin API Reference

## Device Info

| Paper Width | Printable Pixels | Cutter |
|-------------|-----------------|--------|
| 80mm | 576px | Yes (some models) |
| 58mm | 384px | No |

| SDK Version | Notes |
|-------------|-------|
| 2.0 | Full features, auto-used on Android 15+ devices |
| 1.0 | Basic printing, older devices |

```typescript
// Check current SDK version
console.log(PrinterImin.version); // "1.0.0" or "2.0.0"
```

---

## Method Quick Reference

### Initialization & Status

| Method | Description | SDK |
|--------|-------------|-----|
| `initPrinter()` | Initialize printer | 1.0+ |
| `getPrinterStatus()` | Get printer status | 1.0+ |
| `initPrinterParams()` | Reset print parameters | 2.0 |
| `printerSelfChecking()` | Print self-test page | 2.0 |
| `resetDevice()` | Restart printer | 1.0 |
| `unBindService()` | Unbind print service | 2.0 |
| `openLogs(open)` | Toggle logging | 1.0 |

### Text Printing

| Method | Description | SDK |
|--------|-------------|-----|
| `printText(text, style?)` | Print text | 1.0+ |
| `printAntiWhiteText(text, style?)` | Print reverse text | 1.0 |
| `printTextBitmap(text, style?)` | Print text as bitmap | 2.0 |
| `printColumnsText(cols)` | Print table row | 1.0+ |
| `printColumnsString(cols)` | Print table row (proportional width) | 2.0 |

### Text Style Settings

| Method | Description | SDK |
|--------|-------------|-----|
| `setTextSize(size)` | Set font size | 1.0 |
| `setTextTypeface(typeface)` | Set typeface | 1.0 |
| `setTextStyle(style)` | Set font style | 1.0 |
| `setAlignment(align)` | Set alignment | 1.0 |
| `setTextWidth(width)` | Set text width | 1.0 |
| `setTextLineSpacing(spacing)` | Set line spacing | 1.0 |

### Bitmap Text Style Settings

| Method | Description | SDK |
|--------|-------------|-----|
| `setTextBitmapTypeface(typeface)` | Bitmap typeface | 2.0 |
| `setTextBitmapSize(size)` | Bitmap font size | 2.0 |
| `setTextBitmapStyle(style)` | Bitmap font style | 2.0 |
| `setTextBitmapStrikeThru(bool)` | Bitmap strikethrough | 2.0 |
| `setTextBitmapUnderline(bool)` | Bitmap underline | 2.0 |
| `setTextBitmapLineSpacing(height)` | Bitmap line spacing | 2.0 |
| `setTextBitmapLetterSpacing(space)` | Bitmap letter spacing | 2.0 |
| `setTextBitmapAntiWhite(bool)` | Bitmap reverse white | 2.0 |

### Image Printing

| Method | Description | SDK |
|--------|-------------|-----|
| `printSingleBitmap(uri, style?)` | Print single image | 1.0+ |
| `printMultiBitmap(uris, style?)` | Print multiple images | 1.0+ |
| `printSingleBitmapBlackWhite(uri, style?)` | Print B&W image | 1.0 |
| `printSingleBitmapColorChart(uri, style?)` | Print color image | 2.0 |

### Barcode Printing

| Method | Description | SDK |
|--------|-------------|-----|
| `printBarCode(type, content, style?)` | Print barcode | 1.0+ |
| `setBarCodeWidth(width)` | Barcode width | 1.0+ |
| `setBarCodeHeight(height)` | Barcode height | 1.0+ |
| `setBarCodeContentPrintPos(pos)` | HRI character position | 1.0+ |

### QR Code Printing

| Method | Description | SDK |
|--------|-------------|-----|
| `printQrCode(data, style?)` | Print QR code | 1.0+ |
| `printDoubleQR(qr1, qr2, size)` | Print double QR code | 1.0+ |
| `setQrCodeSize(size)` | QR code size | 1.0+ |
| `setQrCodeErrorCorrectionLev(level)` | Error correction level | 1.0+ |
| `setLeftMargin(margin)` | Left margin | 1.0+ |
| `setCodeAlignment(align)` | Code alignment | 2.0 |

### Paper Feed & Cut

| Method | Description | SDK |
|--------|-------------|-----|
| `printAndLineFeed()` | Feed one line | 1.0+ |
| `printAndFeedPaper(height)` | Feed paper by height | 1.0+ |
| `setPageFormat(style)` | Paper format 0=80mm 1=58mm | 1.0+ |
| `partialCut()` | Partial cut | 1.0+ |
| `fullCut()` | Full cut | 2.0 |

### Transaction Printing

| Method | Description | SDK |
|--------|-------------|-----|
| `enterPrinterBuffer(clean)` | Enter buffer mode | 2.0 |
| `commitPrinterBuffer()` | Commit buffer | 2.0 |
| `exitPrinterBuffer(commit)` | Exit buffer mode | 2.0 |

### Label Printing

| Method | Description | SDK |
|--------|-------------|-----|
| `labelInitCanvas(style)` | Initialize label canvas | 2.0 |
| `labelAddText(style)` | Add text | 2.0 |
| `labelAddBarCode(style)` | Add barcode | 2.0 |
| `labelAddQrCode(style)` | Add QR code | 2.0 |
| `labelAddArea(style)` | Add shape | 2.0 |
| `labelAddBitmap(style)` | Add image | 2.0 |
| `labelPrintCanvas(count)` | Print label | 2.0 |
| `printLabelBitmap(style)` | Print label bitmap | 2.0 |
| `labelLearning()` | Label learning | 2.0 |
| `setPrintModel(model)` | Print mode 0=thermal 1=label | 2.0 |

### Cash Drawer & Device Info

| Method | Description | SDK |
|--------|-------------|-----|
| `openCashBox()` | Open cash drawer | 1.0+ |
| `getDrawerStatus()` | Drawer status | 2.0 |
| `getOpenDrawerTimes()` | Open drawer count | 2.0 |
| `getPrinterSerialNumber()` | Serial number | 2.0 |
| `getPrinterModelName()` | Model name | 2.0 |
| `getPrinterFirmwareVersion()` | Firmware version | 2.0 |
| `getPrinterMode()` | Printer mode | 2.0 |

### RAW Data

| Method | Description | SDK |
|--------|-------------|-----|
| `sendRAWData(bytes)` | Send raw byte data | 2.0 |
| `sendRAWDataHexStr(hex)` | Send hex string | 1.0 |

---

## Detailed API


### Initialization & Status

#### initPrinter() `[1.0+]`

Initialize the printer. Must be called before any print operation.

```typescript
await PrinterImin.initPrinter();
```

#### getPrinterStatus() `[1.0+]`

Get printer status.

Returns: `{ code: string, message: string }`

| code | Meaning |
|------|---------|
| 0 | Normal |
| 1 | Not connected / not powered on |
| 3 | Print head open |
| 5 | Overheated |
| 7 | Paper missing |
| 8 | Paper running out |
| 99 | Other error |

```typescript
const status = await PrinterImin.getPrinterStatus();
if (status.code === '0') {
  console.log('Printer ready');
} else {
  console.log('Error:', status.message);
}
```

#### initPrinterParams() `[2.0]`

Reset print parameters to defaults.

```typescript
await PrinterImin.initPrinterParams();
```

#### resetDevice() `[1.0]`

Restart the printer.

> Only works on 1.0 devices. No effect on 2.0 devices.

```typescript
await PrinterImin.resetDevice();
```

#### printerSelfChecking() `[2.0]`

Print a self-test page.

```typescript
await PrinterImin.printerSelfChecking();
```

#### openLogs(open) `[1.0]`

Toggle print logging.

| Param | Type | Description |
|-------|------|-------------|
| open | number | 1=enable 0=disable |

```typescript
await PrinterImin.openLogs(1);
```

#### receiveBroadcastStream `[1.0+]`

Listen for printer status broadcasts.

```typescript
const unsubscribe = PrinterImin.receiveBroadcastStream.listen((payload) => {
  console.log('Event:', payload.eventName, payload.eventData);
});

// Stop listening
unsubscribe();
```

---

### Text Printing

#### printText(text, style?) `[1.0+]`

Print text.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| text | string | Yes | Text content |
| style | object | - | Text style |

**style properties:**

```typescript
{
  fontSize?: number,        // Font size
  fontStyle?: number,       // 0=normal 1=bold 2=italic 3=boldItalic
  typeface?: number,        // 0=default 1=monospace 2=bold 3=sansSerif 4=serif
  align?: number,           // 0=left 1=center 2=right
  width?: number,           // Text width (pixels)
  space?: number,           // Line spacing
  wordWrap?: boolean,       // Auto line wrap
}
```

> On 2.0 devices, fontSize/fontStyle/typeface may not take effect. Use `printTextBitmap()` for styled text on 2.0.

```typescript
// Simple
await PrinterImin.printText('Hello World');

// With style
await PrinterImin.printText('Title', {
  fontSize: 32,
  fontStyle: 1,  // bold
  align: 1,      // center
});
```

#### printAntiWhiteText(text, style?) `[1.0]`

Print reverse text (white on black). Same params as `printText`.

> Only works on 1.0 devices.

```typescript
await PrinterImin.printAntiWhiteText('Reverse Text');
```

#### printTextBitmap(text, style?) `[2.0]`

Print text as bitmap with richer style support.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| text | string | Yes | Text content |
| style | object | - | Bitmap text style |

**style properties:**

```typescript
{
  fontSize?: number,        // Font size
  fontStyle?: number,       // 0=normal 1=bold 2=italic 3=boldItalic
  typeface?: number,        // 0=default 1=monospace 2=bold 3=sansSerif 4=serif
  align?: number,           // 0=left 1=center 2=right
  letterSpacing?: number,   // Letter spacing
  underline?: boolean,      // Underline
  throughline?: boolean,    // Strikethrough
  lineHeight?: number,      // Line height
  reverseWhite?: boolean,   // Reverse white
}
```

```typescript
await PrinterImin.printTextBitmap('Bitmap Text', {
  fontSize: 32,
  fontStyle: 1,
  underline: true,
  align: 1,
});
```

#### printColumnsText(cols) `[1.0+]`

Print a table row.

> `width` is pixel width. 80mm paper = 576px total, 58mm paper = 384px total.

```typescript
await PrinterImin.printColumnsText([
  { text: 'Coffee', width: 250, fontSize: 24, align: 0 },
  { text: 'x2',     width: 100, fontSize: 24, align: 1 },
  { text: '$7.00',  width: 150, fontSize: 24, align: 2 },
]);
```

#### printColumnsString(cols) `[2.0]`

Print a table row (proportional width mode).

> Unlike `printColumnsText`, `width` here is a proportional weight (e.g. 1:2:1), not pixel width.

```typescript
await PrinterImin.printColumnsString([
  { text: 'Item',  width: 2, fontSize: 24, align: 0 },
  { text: 'Price', width: 1, fontSize: 24, align: 2 },
]);
```

---

### Image Printing

#### printSingleBitmap(uri, style?) `[1.0+]`

Print a single image.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| uri | string | Yes | Image URL |
| style | object | - | Image style |

**style properties:**

```typescript
{
  width?: number,   // Image width (pixels)
  height?: number,  // Image height (pixels)
  align?: number,   // 0=left 1=center 2=right
}
```

```typescript
await PrinterImin.printSingleBitmap('https://example.com/logo.png', {
  width: 250,
  height: 80,
  align: 1,
});
```

#### printMultiBitmap(uris, style?) `[1.0+]`

Print multiple images. First param is URL array, style same as `printSingleBitmap`.

#### printSingleBitmapBlackWhite(uri, style?) `[1.0]`

Print B&W image.

```typescript
await PrinterImin.printSingleBitmapBlackWhite('https://example.com/img.png', {
  width: 200,
  height: 100,
});
```

#### printSingleBitmapColorChart(uri, style?) `[2.0]`

Print color image. Same params as `printSingleBitmap`.

---

### Barcode Printing

#### printBarCode(type, content, style?) `[1.0+]`

Print a barcode.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| type | number | Yes | Barcode type, see table below |
| content | string | Yes | Barcode content |
| style | object | - | Barcode style |

**Barcode types:**

| Value | Type |
|-------|------|
| 0 | UPC-A |
| 1 | UPC-E |
| 2 | EAN-13 |
| 3 | EAN-8 |
| 4 | Code 39 |
| 5 | ITF |
| 6 | Codabar |
| 7 | Code 93 |
| 8 | Code 128 |

**style properties:**

```typescript
{
  width?: number,     // Barcode width 2-6
  height?: number,    // Barcode height 1-255
  position?: number,  // HRI position: 0=none 1=above 2=below 3=both
  align?: number,     // 0=left 1=center 2=right
}
```

```typescript
await PrinterImin.printBarCode(8, '1234567890', {
  width: 3,
  height: 100,
  position: 2,
  align: 1,
});
```

---

### QR Code Printing

#### printQrCode(data, style?) `[1.0+]`

Print a QR code.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| data | string | Yes | QR code content |
| style | object | - | QR code style |

**style properties:**

```typescript
{
  qrSize?: number,               // QR code size
  align?: number,                 // 0=left 1=center 2=right
  leftMargin?: number,            // Left margin
  errorCorrectionLevel?: number,  // 48=L(7%) 49=M(15%) 50=Q(25%) 51=H(30%)
}
```

```typescript
await PrinterImin.printQrCode('https://www.imin.sg', {
  qrSize: 6,
  align: 1,
  errorCorrectionLevel: 51,  // H level
});
```

#### printDoubleQR(qr1, qr2, size) `[1.0+]`

Print double QR codes.

```typescript
await PrinterImin.printDoubleQR(
  { text: 'www.imin.sg' },
  { text: 'www.google.com' },
  5
);
```

---

### Paper Feed & Cut

#### printAndLineFeed() `[1.0+]`

```typescript
await PrinterImin.printAndLineFeed();
```

#### printAndFeedPaper(height) `[1.0+]`

| Param | Type | Description |
|-------|------|-------------|
| height | number | Feed height 1-1016 |

```typescript
await PrinterImin.printAndFeedPaper(100);
```

#### setPageFormat(style) `[1.0+]`

| Param | Type | Description |
|-------|------|-------------|
| style | number | 0=80mm 1=58mm |

#### partialCut() `[1.0+]`

Partial paper cut. Only for devices with cutter.

```typescript
await PrinterImin.partialCut();
```

#### fullCut() `[2.0]`

Full paper cut. Only for devices with cutter.

> Only works on 2.0 devices. No effect on 1.0 devices.

```typescript
await PrinterImin.fullCut();
```

---

### Transaction Printing

Cache multiple print commands and submit at once.

```typescript
try {
  await PrinterImin.enterPrinterBuffer(true);  // Enter buffer
  await PrinterImin.printText('Line 1');
  await PrinterImin.printText('Line 2');
  await PrinterImin.commitPrinterBuffer();      // Commit
  await PrinterImin.exitPrinterBuffer(true);    // Exit
} catch (e) {
  await PrinterImin.exitPrinterBuffer(false);   // Discard on error
}
```

---

### Label Printing

Workflow: initialize canvas -> add elements -> print.

#### Full Example

```typescript
// 1. Initialize canvas
await PrinterImin.labelInitCanvas({
  width: 400, height: 240, posX: 0, posY: 0,
});

// 2. Add title
await PrinterImin.labelAddText({
  text: 'Fuji Apple', posX: 20, posY: 20, textSize: 28, enableBold: true,
});

// 3. Add price
await PrinterImin.labelAddText({
  text: '$16.98', posX: 20, posY: 60, textSize: 40, enableBold: true,
});

// 4. Add barcode
await PrinterImin.labelAddBarCode({
  barCode: '{B123456', posX: 20, posY: 120,
  symbology: 8, dotWidth: 2, barHeight: 50, readable: 2,
});

// 5. Add border
await PrinterImin.labelAddArea({
  style: 3, posX: 5, posY: 5, width: 390, height: 230, thick: 2,
});

// 6. Print 1 copy
await PrinterImin.labelPrintCanvas(1);
```

> For detailed label style properties, see the Chinese version [api-zh.md](api-zh.md) — the TypeScript interface definitions are identical.

---

### Cash Drawer

#### openCashBox() `[1.0+]`

```typescript
await PrinterImin.openCashBox();
```

#### getDrawerStatus() `[2.0]`

Returns: `boolean`

#### getOpenDrawerTimes() `[2.0]`

Returns: `number`

---

### Printer Info

All methods below are `[2.0]`, return `string` or `number`.

```typescript
const serial = await PrinterImin.getPrinterSerialNumber();
const model = await PrinterImin.getPrinterModelName();
const firmware = await PrinterImin.getPrinterFirmwareVersion();
const hardware = await PrinterImin.getPrinterHardwareVersion();
const service = await PrinterImin.getServiceVersion();
const density = await PrinterImin.getPrinterDensity();
const mode = await PrinterImin.getPrinterMode();
```

---

### Printer Configuration

```typescript
// Density
const densityList = await PrinterImin.getPrinterDensityList();
await PrinterImin.setPrinterDensity(100);

// Speed
const speedList = await PrinterImin.getPrinterSpeedList();
await PrinterImin.setPrinterSpeed(3);

// Codepage
const codepages = await PrinterImin.getFontCodepage();
await PrinterImin.setFontCodepage(0);

// Encoding
const encodeList = await PrinterImin.getEncodeList();
await PrinterImin.setPrinterEncode(0);
```

---

### RAW Data

#### sendRAWData(bytes) `[2.0]`

Send raw ESC/POS byte data.

```typescript
await PrinterImin.sendRAWData([0x1B, 0x40]); // ESC @ initialize
```

#### sendRAWDataHexStr(hex) `[1.0]`

Send hex string.

```typescript
await PrinterImin.sendRAWDataHexStr('0A'); // Line feed
```
