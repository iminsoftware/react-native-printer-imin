# API参考文档

本文档详细描述了 `react-native-printer-imin` 的所有API接口。

## 目录

- [基础API](#基础api)
- [文本打印](#文本打印)
- [图片打印](#图片打印)
- [二维码打印](#二维码打印)
- [条形码打印](#条形码打印)
- [表格打印](#表格打印)
- [设备控制](#设备控制)
- [SDK 2.0 API](#sdk-20-api)
- [标签打印](#标签打印)
- [类型定义](#类型定义)

## 基础API

### initPrinter()

初始化打印机。

```typescript
initPrinter(): Promise<string>
```

**返回值**: Promise<string> - 初始化结果消息

**示例**:
```typescript
try {
  const result = await PrinterImin.initPrinter();
  console.log('初始化成功:', result);
} catch (error) {
  console.error('初始化失败:', error);
}
```

### getPrinterStatus()

获取打印机当前状态。

```typescript
getPrinterStatus(): Promise<{code: number, message: string}>
```

**返回值**: 
- `code`: 状态码 (0表示正常)
- `message`: 状态描述信息

**示例**:
```typescript
const status = await PrinterImin.getPrinterStatus();
if (status.code === 0) {
  console.log('打印机正常:', status.message);
} else {
  console.error('打印机异常:', status.message);
}
```

### receiveBroadcastStream

监听打印机状态广播。

```typescript
receiveBroadcastStream: {
  listen(callback: (payload: {eventName: string, eventData: any}) => void): () => void
}
```

**参数**:
- `callback`: 回调函数，接收广播数据

**返回值**: 取消监听的函数

**示例**:
```typescript
const unsubscribe = PrinterImin.receiveBroadcastStream.listen((payload) => {
  console.log('事件名:', payload.eventName);
  console.log('事件数据:', payload.eventData);
});

// 取消监听
unsubscribe();
```

## 文本打印

### printText()

打印文本内容。

```typescript
printText(text: string, style?: IminTextStyle): Promise<void>
```

**参数**:
- `text`: 要打印的文本
- `style`: 可选的文本样式

**IminTextStyle接口**:
```typescript
interface IminTextStyle {
  wordWrap?: boolean;      // 是否自动换行
  fontSize?: number;       // 字体大小
  space?: number;          // 行间距
  width?: number;          // 文本宽度
  typeface?: IminTypeface; // 字体类型
  fontStyle?: IminFontStyle; // 字体样式
  align?: IminPrintAlign;  // 对齐方式
}
```

**示例**:
```typescript
// 基础文本打印
await PrinterImin.printText('Hello World');

// 带样式的文本打印
await PrinterImin.printText('标题文本', {
  fontSize: 32,
  align: IminPrintAlign.center,
  fontStyle: IminFontStyle.bold
});
```

### printAntiWhiteText()

打印反白文本（黑底白字）。

```typescript
printAntiWhiteText(text: string, style?: IminTextStyle): Promise<void>
```

**参数**: 与 `printText()` 相同

**示例**:
```typescript
await PrinterImin.printAntiWhiteText('重要提示', {
  fontSize: 24,
  align: IminPrintAlign.center
});
```

### 文本格式设置

#### setTextSize()

设置文本大小。

```typescript
setTextSize(size: number): Promise<void>
```

#### setTextTypeface()

设置字体类型。

```typescript
setTextTypeface(typeface: IminTypeface): Promise<void>
```

#### setTextStyle()

设置字体样式。

```typescript
setTextStyle(style: IminFontStyle): Promise<void>
```

#### setAlignment()

设置对齐方式。

```typescript
setAlignment(align: IminPrintAlign): Promise<void>
```

#### setTextLineSpacing()

设置行间距。

```typescript
setTextLineSpacing(spacing: number): Promise<void>
```

#### setTextWidth()

设置文本宽度。

```typescript
setTextWidth(width: number): Promise<void>
```

## 图片打印

### printSingleBitmap()

打印单张图片。

```typescript
printSingleBitmap(uri: string, pictureStyle?: IminPictureStyle): Promise<void>
```

**参数**:
- `uri`: 图片URL或本地路径
- `pictureStyle`: 可选的图片样式

**IminPictureStyle接口**:
```typescript
interface IminPictureStyle {
  width?: number;          // 图片宽度
  height?: number;         // 图片高度
  align?: IminPrintAlign;  // 对齐方式
}
```

**示例**:
```typescript
// 基础图片打印
await PrinterImin.printSingleBitmap('https://example.com/logo.png');

// 带样式的图片打印
await PrinterImin.printSingleBitmap('https://example.com/logo.png', {
  width: 200,
  height: 100,
  align: IminPrintAlign.center
});
```

### printMultiBitmap()

打印多张图片。

```typescript
printMultiBitmap(imgs: string[], pictureStyle?: IminPictureStyle): Promise<void>
```

**参数**:
- `imgs`: 图片URL数组
- `pictureStyle`: 可选的图片样式

### printSingleBitmapBlackWhite()

打印反白图片。

```typescript
printSingleBitmapBlackWhite(uri: string, baseStyle?: IminBaseStyle): Promise<void>
```

## 二维码打印

### printQrCode()

打印二维码。

```typescript
printQrCode(data: string, qrCodeStyle?: IminQrCodeStyle): Promise<void>
```

**参数**:
- `data`: 二维码内容
- `qrCodeStyle`: 可选的二维码样式

**IminQrCodeStyle接口**:
```typescript
interface IminQrCodeStyle {
  qrSize?: number;                           // 二维码大小
  align?: IminPrintAlign;                    // 对齐方式
  leftMargin?: number;                       // 左边距
  errorCorrectionLevel?: IminQrcodeCorrectionLevel; // 纠错级别
}
```

**示例**:
```typescript
await PrinterImin.printQrCode('https://www.example.com', {
  qrSize: 6,
  align: IminPrintAlign.center,
  errorCorrectionLevel: IminQrcodeCorrectionLevel.levelH
});
```

### printDoubleQR()

打印双二维码。

```typescript
printDoubleQR(
  qrCode1: IminDoubleQRCodeStyle,
  qrCode2: IminDoubleQRCodeStyle,
  doubleQRSize: number
): Promise<void>
```

**IminDoubleQRCodeStyle接口**:
```typescript
interface IminDoubleQRCodeStyle {
  text: string;        // 二维码内容
  level?: number;      // 误差等级
  leftMargin?: number; // 左边距
  version?: number;    // 版本
}
```

### 二维码设置方法

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

## 条形码打印

### printBarCode()

打印条形码。

```typescript
printBarCode(
  barCodeType: IminBarcodeType,
  barCodeContent: string,
  style?: IminBarCodeStyle
): Promise<void>
```

**参数**:
- `barCodeType`: 条形码类型
- `barCodeContent`: 条形码内容
- `style`: 可选的条形码样式

**IminBarCodeStyle接口**:
```typescript
interface IminBarCodeStyle {
  width?: number;                    // 条形码宽度
  height?: number;                   // 条形码高度
  position?: IminBarcodeTextPos;     // 文本位置
  align?: IminPrintAlign;            // 对齐方式
}
```

**示例**:
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

### 条形码设置方法

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

## 表格打印

### printColumnsText()

打印表格/列文本。

```typescript
printColumnsText(cols: ColumnMaker[]): Promise<void>
```

**ColumnMaker接口**:
```typescript
interface ColumnMaker {
  text: string;            // 列内容
  width: number;           // 列宽度
  align: IminPrintAlign;   // 对齐方式
  fontSize: number;        // 字体大小
}
```

**示例**:
```typescript
await PrinterImin.printColumnsText([
  {
    text: '商品名称',
    width: 3,
    fontSize: 20,
    align: IminPrintAlign.left
  },
  {
    text: '数量',
    width: 1,
    fontSize: 20,
    align: IminPrintAlign.center
  },
  {
    text: '价格',
    width: 2,
    fontSize: 20,
    align: IminPrintAlign.right
  }
]);
```

## 设备控制

### printAndLineFeed()

走纸一行。

```typescript
printAndLineFeed(): Promise<void>
```

### printAndFeedPaper()

走纸指定高度。

```typescript
printAndFeedPaper(height: number): Promise<void>
```

**参数**:
- `height`: 走纸高度 (1-1016)

### setPageFormat()

设置纸张规格。

```typescript
setPageFormat(style?: number): Promise<void>
```

**参数**:
- `style`: 纸张规格 (0-80mm, 1-58mm)

### partialCut()

切纸（仅支持带切刀的设备）。

```typescript
partialCut(): Promise<void>
```

### openCashBox()

打开钱箱。

```typescript
openCashBox(): Promise<void>
```

### resetDevice()

重置打印机。

```typescript
resetDevice(): Promise<void>
```

### setInitIminPrinter()

设置初始化打印机。

```typescript
setInitIminPrinter(isDefault: boolean): Promise<void>
```

## SDK 2.0 API

### 设备信息获取

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

### 打印参数控制

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

### 缓冲区管理

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

### 位图文本打印

#### printTextBitmap()
```typescript
printTextBitmap(text: string, style?: IminTextPictureStyle): Promise<void>
```

**IminTextPictureStyle接口**:
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

## 标签打印

### labelInitCanvas()

初始化标签画布。

```typescript
labelInitCanvas(labelCanvasStyle: LabelCanvasStyle): Promise<void>
```

### labelAddText()

添加文本到标签。

```typescript
labelAddText(labelTextStyle: LabelTextStyle): Promise<void>
```

### labelAddBarCode()

添加条形码到标签。

```typescript
labelAddBarCode(labelBarCodeStyle: LabelBarCodeStyle): Promise<void>
```

### labelAddQrCode()

添加二维码到标签。

```typescript
labelAddQrCode(labelQrCodeStyle: LabelQrCodeStyle): Promise<void>
```

### labelAddBitmap()

添加图片到标签。

```typescript
labelAddBitmap(labelBitmapStyle: LabelBitmapStyle): Promise<void>
```

### labelPrintCanvas()

打印标签画布。

```typescript
labelPrintCanvas(printCount: number): Promise<{result: string, resultCode: number}>
```

## 类型定义

### 枚举类型

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

### 调试功能

#### openLogs()

开启/关闭调试日志。

```typescript
openLogs(open: number): Promise<void>
```

**参数**:
- `open`: 1-开启, 0-关闭

#### sendRAWDataHexStr()

发送原始十六进制数据。

```typescript
sendRAWDataHexStr(byteStr: string): Promise<void>
```

## 错误处理

所有API方法都返回Promise，可以使用try-catch进行错误处理：

```typescript
try {
  await PrinterImin.printText('测试文本');
} catch (error) {
  console.error('打印失败:', error);
  
  // 检查具体错误类型
  if (error.toString().includes('paper')) {
    // 处理缺纸错误
  } else if (error.toString().includes('temperature')) {
    // 处理过热错误
  }
}
```

## 版本兼容性

- SDK 1.0: 基础打印功能
- SDK 2.0: 包含所有1.0功能 + 标签打印 + 高级设备控制

使用 `PrinterImin.version` 检查当前SDK版本。