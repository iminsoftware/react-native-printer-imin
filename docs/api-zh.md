# react-native-printer-imin API 文档

## 设备信息

| 纸宽 | 可打印像素宽度 | 有切刀 |
|------|--------------|--------|
| 80mm | 576px | ✅ 部分型号 |
| 58mm | 384px | ❌ |

| SDK 版本 | 说明 |
|---------|------|
| 2.0 | 完整功能，Android 15+ 设备自动使用 |
| 1.0 | 基础打印功能，旧设备 |

```typescript
// 查看当前 SDK 版本
console.log(PrinterImin.version); // "1.0.0" 或 "2.0.0"
```

---

## 方法速查表

### 初始化与状态

| 方法 | 说明 | SDK |
|------|------|-----|
| `initPrinter()` | 初始化打印机 | 1.0+ |
| `getPrinterStatus()` | 获取打印机状态 | 1.0+ |
| `initPrinterParams()` | 重置打印参数 | 2.0 |
| `printerSelfChecking()` | 打印自检页 | 2.0 |
| `resetDevice()` | 重启打印机 | 1.0 |
| `unBindService()` | 解绑打印服务 | 2.0 |
| `openLogs(open)` | 开关日志 | 1.0 |

### 文本打印

| 方法 | 说明 | SDK |
|------|------|-----|
| `printText(text, style?)` | 打印文本 | 1.0+ |
| `printAntiWhiteText(text, style?)` | 打印反白文本 | 1.0 |
| `printTextBitmap(text, style?)` | 位图方式打印文本 | 2.0 |
| `printColumnsText(cols)` | 打印表格行 | 1.0+ |
| `printColumnsString(cols)` | 打印表格行（比例宽度） | 2.0 |

### 文本样式设置

| 方法 | 说明 | SDK |
|------|------|-----|
| `setTextSize(size)` | 设置字号 | 1.0 |
| `setTextTypeface(typeface)` | 设置字体 | 1.0 |
| `setTextStyle(style)` | 设置字体样式 | 1.0 |
| `setAlignment(align)` | 设置对齐方式 | 1.0 |
| `setTextWidth(width)` | 设置文本宽度 | 1.0 |
| `setTextLineSpacing(spacing)` | 设置行间距 | 1.0 |

### 位图文本样式设置

| 方法 | 说明 | SDK |
|------|------|-----|
| `setTextBitmapTypeface(typeface)` | 位图字体 | 2.0 |
| `setTextBitmapSize(size)` | 位图字号 | 2.0 |
| `setTextBitmapStyle(style)` | 位图字体样式 | 2.0 |
| `setTextBitmapStrikeThru(bool)` | 位图删除线 | 2.0 |
| `setTextBitmapUnderline(bool)` | 位图下划线 | 2.0 |
| `setTextBitmapLineSpacing(height)` | 位图行间距 | 2.0 |
| `setTextBitmapLetterSpacing(space)` | 位图字间距 | 2.0 |
| `setTextBitmapAntiWhite(bool)` | 位图反白 | 2.0 |

### 图片打印

| 方法 | 说明 | SDK |
|------|------|-----|
| `printSingleBitmap(uri, style?)` | 打印单张图片 | 1.0+ |
| `printMultiBitmap(uris, style?)` | 打印多张图片 | 1.0+ |
| `printSingleBitmapBlackWhite(uri, style?)` | 打印黑白图片 | 1.0 |
| `printSingleBitmapColorChart(uri, style?)` | 打印彩色图片 | 2.0 |

### 条码打印

| 方法 | 说明 | SDK |
|------|------|-----|
| `printBarCode(type, content, style?)` | 打印条码 | 1.0+ |
| `setBarCodeWidth(width)` | 条码宽度 | 1.0+ |
| `setBarCodeHeight(height)` | 条码高度 | 1.0+ |
| `setBarCodeContentPrintPos(pos)` | HRI 字符位置 | 1.0+ |

### QR 码打印

| 方法 | 说明 | SDK |
|------|------|-----|
| `printQrCode(data, style?)` | 打印 QR 码 | 1.0+ |
| `printDoubleQR(qr1, qr2, size)` | 打印双 QR 码 | 1.0+ |
| `setQrCodeSize(size)` | QR 码大小 | 1.0+ |
| `setQrCodeErrorCorrectionLev(level)` | 纠错等级 | 1.0+ |
| `setLeftMargin(margin)` | 左边距 | 1.0+ |
| `setCodeAlignment(align)` | 码对齐方式 | 2.0 |

### 走纸与切纸

| 方法 | 说明 | SDK |
|------|------|-----|
| `printAndLineFeed()` | 走一行纸 | 1.0+ |
| `printAndFeedPaper(height)` | 走纸指定高度 | 1.0+ |
| `setPageFormat(style)` | 纸张规格 0=80mm 1=58mm | 1.0+ |
| `partialCut()` | 半切 | 1.0+ |
| `fullCut()` | 全切 | 2.0 |

### 事务打印

| 方法 | 说明 | SDK |
|------|------|-----|
| `enterPrinterBuffer(clean)` | 进入缓冲区 | 2.0 |
| `commitPrinterBuffer()` | 提交缓冲区 | 2.0 |
| `exitPrinterBuffer(commit)` | 退出缓冲区 | 2.0 |

### 标签打印

| 方法 | 说明 | SDK |
|------|------|-----|
| `labelInitCanvas(style)` | 初始化标签画布 | 2.0 |
| `labelAddText(style)` | 添加文本 | 2.0 |
| `labelAddBarCode(style)` | 添加条码 | 2.0 |
| `labelAddQrCode(style)` | 添加 QR 码 | 2.0 |
| `labelAddArea(style)` | 添加形状 | 2.0 |
| `labelAddBitmap(style)` | 添加图片 | 2.0 |
| `labelPrintCanvas(count)` | 打印标签 | 2.0 |
| `printLabelBitmap(style)` | 打印标签位图 | 2.0 |
| `labelLearning()` | 标签学习 | 2.0 |
| `setPrintModel(model)` | 打印模式 0=热敏 1=标签 | 2.0 |

### 钱箱与设备信息

| 方法 | 说明 | SDK |
|------|------|-----|
| `openCashBox()` | 打开钱箱 | 1.0+ |
| `getDrawerStatus()` | 钱箱状态 | 2.0 |
| `getOpenDrawerTimes()` | 开箱次数 | 2.0 |
| `getPrinterSerialNumber()` | 序列号 | 2.0 |
| `getPrinterModelName()` | 型号 | 2.0 |
| `getPrinterThermalHead()` | 热敏头型号 | 2.0 |
| `getPrinterFirmwareVersion()` | 固件版本 | 2.0 |
| `getPrinterHardwareVersion()` | 硬件版本 | 2.0 |
| `getServiceVersion()` | 服务版本 | 2.0 |
| `getUsbPrinterVidPid()` | USB VID/PID | 2.0 |
| `getUsbDevicesName()` | USB 设备名 | 2.0 |
| `getPrinterDensity()` | 打印浓度 | 2.0 |
| `getPrinterPaperDistance()` | 打印长度 | 2.0 |
| `getPrinterPaperType()` | 纸张类型 | 2.0 |
| `getPrinterCutTimes()` | 切刀次数 | 2.0 |
| `getPrinterMode()` | 打印机模式 | 2.0 |

### 打印机配置

| 方法 | 说明 | SDK |
|------|------|-----|
| `getPrinterDensityList()` | 可用浓度列表 | 2.0 |
| `setPrinterDensity(density)` | 设置浓度 | 2.0 |
| `getPrinterSpeedList()` | 可用速度列表 | 2.0 |
| `setPrinterSpeed(speed)` | 设置速度 | 2.0 |
| `getPrinterSpeed()` | 获取速度 | 2.0 |
| `getPrinterPaperTypeList()` | 纸张类型列表 | 2.0 |
| `getFontCodepage()` | 代码页列表 | 2.0 |
| `setFontCodepage(codepage)` | 设置代码页 | 2.0 |
| `getCurCodepage()` | 当前代码页 | 2.0 |
| `getEncodeList()` | 编码列表 | 2.0 |
| `setPrinterEncode(encode)` | 设置编码 | 2.0 |
| `getCurEncode()` | 当前编码 | 2.0 |

### RAW 数据

| 方法 | 说明 | SDK |
|------|------|-----|
| `sendRAWData(bytes)` | 发送原始字节数据 | 2.0 |
| `sendRAWDataHexStr(hex)` | 发送十六进制字符串 | 1.0 |

---

## 详细 API


### 初始化与状态

#### initPrinter() `[1.0+]`

初始化打印机，所有打印操作前必须调用。

```typescript
await PrinterImin.initPrinter();
```

#### getPrinterStatus() `[1.0+]`

获取打印机状态。

返回: `{ code: string, message: string }`

| code | 含义 |
|------|------|
| 0 | 正常 |
| 1 | 未连接/未开机 |
| 3 | 打印头打开 |
| 5 | 打印头过热 |
| 7 | 缺纸 |
| 8 | 纸将耗尽 |
| 99 | 其他错误 |

```typescript
const status = await PrinterImin.getPrinterStatus();
if (status.code === '0') {
  console.log('打印机就绪');
} else {
  console.log('异常:', status.message);
}
```

#### initPrinterParams() `[2.0]`

重置打印参数到默认值。

```typescript
await PrinterImin.initPrinterParams();
```

#### resetDevice() `[1.0]`

重启打印机。

> ⚠️ 仅在 1.0 设备上生效，2.0 设备调用无效果。

```typescript
await PrinterImin.resetDevice();
```

#### printerSelfChecking() `[2.0]`

打印自检页。

```typescript
await PrinterImin.printerSelfChecking();
```

#### openLogs(open) `[1.0]`

开关打印日志。

| 参数 | 类型 | 说明 |
|------|------|------|
| open | number | 1=开启 0=关闭 |

```typescript
await PrinterImin.openLogs(1);
```

#### receiveBroadcastStream `[1.0+]`

监听打印机状态广播。

```typescript
const unsubscribe = PrinterImin.receiveBroadcastStream.listen((payload) => {
  console.log('事件:', payload.eventName, payload.eventData);
});

// 取消监听
unsubscribe();
```

---

### 文本打印

#### printText(text, style?) `[1.0+]`

打印文本。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| text | string | ✅ | 打印内容 |
| style | object | - | 文本样式 |

**style 属性：**

```typescript
{
  fontSize?: number,        // 字号
  fontStyle?: number,       // 0=正常 1=加粗 2=斜体 3=粗斜
  typeface?: number,        // 0=默认 1=等宽 2=粗体 3=无衬线 4=衬线
  align?: number,           // 0=左 1=中 2=右
  width?: number,           // 文本宽度（像素）
  space?: number,           // 行间距
  wordWrap?: boolean,       // 自动换行
}
```

> ⚠️ 在 2.0 设备上，fontSize/fontStyle/typeface 可能不生效。如需样式控制，建议用 `printTextBitmap()`。

```typescript
// 简单打印
await PrinterImin.printText('Hello World');

// 带样式
await PrinterImin.printText('标题', {
  fontSize: 32,
  fontStyle: 1,  // 加粗
  align: 1,      // 居中
});
```

#### printAntiWhiteText(text, style?) `[1.0]`

打印反白文本（白字黑底）。参数同 `printText`。

> ⚠️ 仅在 1.0 设备上生效。

```typescript
await PrinterImin.printAntiWhiteText('反白文本');
```

#### printTextBitmap(text, style?) `[2.0]`

以位图方式打印文本，支持更丰富的样式。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| text | string | ✅ | 打印内容 |
| style | object | - | 位图文本样式 |

**style 属性：**

```typescript
{
  fontSize?: number,        // 字号
  fontStyle?: number,       // 0=正常 1=加粗 2=斜体 3=粗斜
  typeface?: number,        // 0=默认 1=等宽 2=粗体 3=无衬线 4=衬线
  align?: number,           // 0=左 1=中 2=右
  letterSpacing?: number,   // 字间距
  underline?: boolean,      // 下划线
  throughline?: boolean,    // 删除线
  lineHeight?: number,      // 行高
  reverseWhite?: boolean,   // 反白
}
```

```typescript
await PrinterImin.printTextBitmap('位图文本', {
  fontSize: 32,
  fontStyle: 1,
  underline: true,
  align: 1,
});
```

#### printColumnsText(cols) `[1.0+]`

打印表格行。

> ⚠️ `width` 在 `printColumnsText` 中是像素宽度。80mm 纸总宽 576px，58mm 纸总宽 384px。

```typescript
await PrinterImin.printColumnsText([
  { text: 'Coffee', width: 250, fontSize: 24, align: 0 },
  { text: 'x2',     width: 100, fontSize: 24, align: 1 },
  { text: '$7.00',  width: 150, fontSize: 24, align: 2 },
]);
```

#### printColumnsString(cols) `[2.0]`

打印表格行（比例宽度模式）。

> ⚠️ 与 `printColumnsText` 不同，这里的 `width` 是比例权重（如 1:2:1），不是像素值。

```typescript
await PrinterImin.printColumnsString([
  { text: 'Item',  width: 2, fontSize: 24, align: 0 },
  { text: 'Price', width: 1, fontSize: 24, align: 2 },
]);
```

---

### 图片打印

#### printSingleBitmap(uri, style?) `[1.0+]`

打印单张图片。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| uri | string | ✅ | 图片 URL |
| style | object | - | 图片样式 |

**style 属性：**

```typescript
{
  width?: number,   // 图片宽度（像素）
  height?: number,  // 图片高度（像素）
  align?: number,   // 0=左 1=中 2=右
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

打印多张图片。参数同 `printSingleBitmap`，第一个参数改为 URL 数组。

```typescript
await PrinterImin.printMultiBitmap(
  ['https://example.com/img1.png', 'https://example.com/img2.png'],
  { align: 1, width: 200, height: 80 }
);
```

#### printSingleBitmapBlackWhite(uri, style?) `[1.0]`

打印黑白图片。

```typescript
await PrinterImin.printSingleBitmapBlackWhite('https://example.com/img.png', {
  width: 200,
  height: 100,
});
```

#### printSingleBitmapColorChart(uri, style?) `[2.0]`

打印彩色图片。参数同 `printSingleBitmap`。

---

### 条码打印

#### printBarCode(type, content, style?) `[1.0+]`

打印条码。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | number | ✅ | 条码类型，见下表 |
| content | string | ✅ | 条码内容 |
| style | object | - | 条码样式 |

**条码类型：**

| 值 | 类型 |
|----|------|
| 0 | UPC-A |
| 1 | UPC-E |
| 2 | EAN-13 |
| 3 | EAN-8 |
| 4 | Code 39 |
| 5 | ITF |
| 6 | Codabar |
| 7 | Code 93 |
| 8 | Code 128 |

**style 属性：**

```typescript
{
  width?: number,     // 条码宽度 2-6
  height?: number,    // 条码高度 1-255
  position?: number,  // HRI 字符位置: 0=不显示 1=上方 2=下方 3=上下都显示
  align?: number,     // 0=左 1=中 2=右
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

### QR 码打印

#### printQrCode(data, style?) `[1.0+]`

打印 QR 码。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| data | string | ✅ | QR 码内容 |
| style | object | - | QR 码样式 |

**style 属性：**

```typescript
{
  qrSize?: number,               // QR 码大小
  align?: number,                 // 0=左 1=中 2=右
  leftMargin?: number,            // 左边距
  errorCorrectionLevel?: number,  // 纠错: 48=L(7%) 49=M(15%) 50=Q(25%) 51=H(30%)
}
```

```typescript
await PrinterImin.printQrCode('https://www.imin.sg', {
  qrSize: 6,
  align: 1,
  errorCorrectionLevel: 51,  // H 级纠错
});
```

#### printDoubleQR(qr1, qr2, size) `[1.0+]`

打印双 QR 码。

```typescript
await PrinterImin.printDoubleQR(
  { text: 'www.imin.sg' },
  { text: 'www.google.com' },
  5  // 大小
);
```

---

### 走纸与切纸

#### printAndLineFeed() `[1.0+]`

走一行纸。

```typescript
await PrinterImin.printAndLineFeed();
```

#### printAndFeedPaper(height) `[1.0+]`

走纸指定高度。

| 参数 | 类型 | 说明 |
|------|------|------|
| height | number | 走纸高度 1-1016 |

```typescript
await PrinterImin.printAndFeedPaper(100);
```

#### setPageFormat(style) `[1.0+]`

设置纸张规格。

| 参数 | 类型 | 说明 |
|------|------|------|
| style | number | 0=80mm 1=58mm |

```typescript
await PrinterImin.setPageFormat(0); // 80mm
```

#### partialCut() `[1.0+]`

半切纸。仅有切刀的设备。

```typescript
await PrinterImin.partialCut();
```

#### fullCut() `[2.0]`

全切纸。仅有切刀的设备。

> ⚠️ 仅在 2.0 设备上生效，1.0 设备调用无效果。

```typescript
await PrinterImin.fullCut();
```

---

### 事务打印

事务打印允许将多个打印命令缓存后一次性提交。

```typescript
try {
  await PrinterImin.enterPrinterBuffer(true);  // 进入缓冲区
  await PrinterImin.printText('第一行');
  await PrinterImin.printText('第二行');
  await PrinterImin.commitPrinterBuffer();      // 提交打印
  await PrinterImin.exitPrinterBuffer(true);    // 退出缓冲区
} catch (e) {
  await PrinterImin.exitPrinterBuffer(false);   // 出错丢弃
}
```

---

### 标签打印

标签打印流程：初始化画布 → 添加元素 → 打印。

#### 完整示例

```typescript
// 1. 初始化画布
await PrinterImin.labelInitCanvas({
  width: 400,
  height: 240,
  posX: 0,
  posY: 0,
});

// 2. 添加文本
await PrinterImin.labelAddText({
  text: 'Fuji Apple',
  posX: 20,
  posY: 20,
  textSize: 28,
  enableBold: true,
});

// 3. 添加价格
await PrinterImin.labelAddText({
  text: '$16.98',
  posX: 20,
  posY: 60,
  textSize: 40,
  enableBold: true,
});

// 4. 添加条码
await PrinterImin.labelAddBarCode({
  barCode: '{B123456',
  posX: 20,
  posY: 120,
  symbology: 8,  // CODE128
  dotWidth: 2,
  barHeight: 50,
  readable: 2,   // POS_TWO
});

// 5. 添加边框
await PrinterImin.labelAddArea({
  style: 3,      // BOX
  posX: 5,
  posY: 5,
  width: 390,
  height: 230,
  thick: 2,
});

// 6. 打印 1 份
await PrinterImin.labelPrintCanvas(1);
```

#### labelInitCanvas(style) `[2.0]`

```typescript
{
  width?: number,   // 画布宽度（默认 50）
  height?: number,  // 画布高度（默认 50）
  posX?: number,    // X 偏移（默认 0）
  posY?: number,    // Y 偏移（默认 0）
}
```

#### labelAddText(style) `[2.0]`

```typescript
{
  text?: string,              // 文本内容
  posX?: number,              // X 坐标（默认 0）
  posY?: number,              // Y 坐标（默认 0）
  textSize?: number,          // 字号（默认 24）
  textWidthRatio?: number,    // 宽度比（默认 1）
  textHeightRatio?: number,   // 高度比（默认 1）
  width?: number,             // 文本区域宽度（-1=自动）
  height?: number,            // 文本区域高度（-1=自动）
  align?: number,             // 0=默认 1=左 2=中 3=右
  rotate?: number,            // 0=0° 1=90° 2=180° 3=270°
  textSpace?: number,         // 字间距（默认 0）
  enableBold?: boolean,       // 加粗
  enableUnderline?: boolean,  // 下划线
  enableStrikethrough?: boolean, // 删除线
  enableItalics?: boolean,    // 斜体
  enAntiColor?: boolean,      // 反色
}
```

#### labelAddBarCode(style) `[2.0]`

```typescript
{
  barCode?: string,     // 条码内容
  posX?: number,        // X 坐标（默认 0）
  posY?: number,        // Y 坐标（默认 0）
  dotWidth?: number,    // 点宽度（默认 2）
  barHeight?: number,   // 条码高度（默认 162）
  readable?: number,    // 0=隐藏 1=位置1 2=位置2 3=位置3
  symbology?: number,   // 0=UPCA 1=UPCE 2=EAN13 3=EAN8 4=CODE39 5=ITF 6=CODABAR 7=CODE93 8=CODE128
  align?: number,       // 0=默认 1=左 2=中 3=右
  rotate?: number,      // 0=0° 1=90° 2=180° 3=270°
  width?: number,       // 区域宽度（-1=自动）
  height?: number,      // 区域高度（-1=自动）
}
```

#### labelAddQrCode(style) `[2.0]`

```typescript
{
  qrCode?: string,      // QR 码内容
  posX?: number,        // X 坐标（默认 0）
  posY?: number,        // Y 坐标（默认 0）
  size?: number,        // QR 码大小（默认 4）
  errorLevel?: number,  // 0=L 1=M 2=Q 3=H
  rotate?: number,      // 0=0° 1=90° 2=180° 3=270°
  width?: number,       // 区域宽度（-1=自动）
  height?: number,      // 区域高度（-1=自动）
}
```

#### labelAddArea(style) `[2.0]`

```typescript
{
  style?: number,   // 0=填充矩形 1=白色矩形 2=反色矩形 3=边框 4=圆 5=椭圆 6=路径
  posX?: number,    // 起始 X
  posY?: number,    // 起始 Y
  endX?: number,    // 结束 X（路径模式）
  endY?: number,    // 结束 Y（路径模式）
  width?: number,   // 宽度
  height?: number,  // 高度
  thick?: number,   // 线条粗细
}
```

#### labelAddBitmap(style) `[2.0]`

```typescript
{
  bitmapUrl?: string,       // 图片 URL
  posX?: number,            // X 坐标
  posY?: number,            // Y 坐标
  algorithm?: number,       // 0=二值化 1=抖动
  value?: number,           // 阈值（默认 200）
  width?: number,           // 宽度（-1=自动）
  height?: number,          // 高度（-1=自动）
}
```

#### labelPrintCanvas(count) `[2.0]`

打印标签画布。

| 参数 | 类型 | 说明 |
|------|------|------|
| count | number | 打印份数 |

返回: `{ result: string, resultCode: number }`

#### labelLearning() `[2.0]`

标签学习（自动检测标签间距）。

返回: `{ result: string }`

#### setPrintModel(model) `[2.0]`

设置打印模式。

| 参数 | 类型 | 说明 |
|------|------|------|
| model | number | 0=热敏 1=标签 |

---

### 钱箱控制

#### openCashBox() `[1.0+]`

```typescript
await PrinterImin.openCashBox();
```

#### getDrawerStatus() `[2.0]`

返回: `boolean`

#### getOpenDrawerTimes() `[2.0]`

返回: `number`

---

### 打印机信息

以下方法均为 `[2.0]`，返回 `string` 或 `number`。

```typescript
const serial = await PrinterImin.getPrinterSerialNumber();
const model = await PrinterImin.getPrinterModelName();
const thermal = await PrinterImin.getPrinterThermalHead();
const firmware = await PrinterImin.getPrinterFirmwareVersion();
const hardware = await PrinterImin.getPrinterHardwareVersion();
const service = await PrinterImin.getServiceVersion();
const vidPid = await PrinterImin.getUsbPrinterVidPid();
const usbName = await PrinterImin.getUsbDevicesName();
const density = await PrinterImin.getPrinterDensity();
const distance = await PrinterImin.getPrinterPaperDistance();
const paperType = await PrinterImin.getPrinterPaperType();
const cutTimes = await PrinterImin.getPrinterCutTimes();
const mode = await PrinterImin.getPrinterMode();
```

---

### 打印机配置

```typescript
// 浓度
const densityList = await PrinterImin.getPrinterDensityList();
await PrinterImin.setPrinterDensity(100);

// 速度
const speedList = await PrinterImin.getPrinterSpeedList();
await PrinterImin.setPrinterSpeed(3);
const speed = await PrinterImin.getPrinterSpeed();

// 纸张类型
const paperTypes = await PrinterImin.getPrinterPaperTypeList();

// 代码页
const codepages = await PrinterImin.getFontCodepage();
await PrinterImin.setFontCodepage(0);
const curCodepage = await PrinterImin.getCurCodepage();

// 编码
const encodeList = await PrinterImin.getEncodeList();
await PrinterImin.setPrinterEncode(0);
const curEncode = await PrinterImin.getCurEncode();
```

---

### RAW 数据

#### sendRAWData(bytes) `[2.0]`

发送原始 ESC/POS 字节数据。

```typescript
await PrinterImin.sendRAWData([0x1B, 0x40]); // ESC @ 初始化
```

#### sendRAWDataHexStr(hex) `[1.0]`

发送十六进制字符串。

```typescript
await PrinterImin.sendRAWDataHexStr('0A'); // 换行
```
