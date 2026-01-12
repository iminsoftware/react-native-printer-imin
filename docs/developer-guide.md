# React Native Printer iMin - 开发者指南

## 项目概述

`react-native-printer-imin` 是一个专为iMin设备内置热敏打印机设计的React Native原生模块。该SDK支持iMin全系列产品的打印功能，包括手持金融系列、平板终端系列和桌面收银设备。

### 支持的设备

**手持金融系列**
- M2-202、M2-203、M2 Pro
- Swift 1、Swift 2、Swift 2 Pro、Swift 2 Ultra

**平板终端系列**
- M2 Max、D1、D1 Pro
- Falcon 1、Swan 2、Falcon 2、Falcon 2 Pro、Falcon 1 Pro

**桌面收银设备**
- D4、Swan 2、Falcon 2

### 打印机规格

iMin产品配备两种内置打印机：
- **80mm纸宽**：带切刀，兼容58mm（如Falcon 1、Falcon 2、Falcon 2 Pro、Falcon 1 Pro）
- **58mm纸宽**：无切刀（如D1、D1 Pro、M2 Max、Swift系列）

## 架构设计

### 项目结构

```
react-native-printer-imin/
├── src/                    # TypeScript源码
│   ├── index.tsx          # 主要API导出
│   ├── typing.ts          # 类型定义
│   └── __tests__/         # 单元测试
├── android/               # Android原生实现
│   ├── src/main/java/     # Java源码
│   ├── libs/              # iMin SDK JAR包
│   └── jniLibs/           # 原生库文件
├── example/               # 示例应用
├── docs/                  # 文档
└── lib/                   # 编译输出
```

### 核心组件

1. **PrinterSDK**: 主要API接口，封装所有打印功能
2. **NativeModules.PrinterImin**: React Native桥接模块
3. **事件监听器**: 支持打印机状态广播监听

## API版本说明

### SDK 1.0 vs 2.0

项目同时支持两个版本的API：

**SDK 1.0**
- 基础打印功能
- 文本、图片、二维码、条形码打印
- 简单的样式设置

**SDK 2.0**
- 增强的打印功能
- 标签打印支持
- 更多打印机参数控制
- 缓冲区管理
- 设备信息获取

### 版本检测

```typescript
import PrinterImin from 'react-native-printer-imin';

console.log('SDK版本:', PrinterImin.version);
// 输出: "1.0.0" 或 "2.0.0"
```

## 核心功能模块

### 1. 打印机初始化与状态

```typescript
// 初始化打印机
await PrinterImin.initPrinter();

// 获取打印机状态
const status = await PrinterImin.getPrinterStatus();
console.log(status.message);

// 监听打印机状态变化
const unsubscribe = PrinterImin.receiveBroadcastStream.listen((payload) => {
  if (payload.eventName === 'printer_status') {
    console.log('打印机状态:', payload.eventData);
  }
});
```

### 2. 文本打印

```typescript
import { IminTextStyle, IminPrintAlign, IminFontStyle } from 'react-native-printer-imin';

// 基础文本打印
await PrinterImin.printText('Hello World');

// 带样式的文本打印
await PrinterImin.printText('Hello World', {
  fontSize: 24,
  align: IminPrintAlign.center,
  fontStyle: IminFontStyle.bold,
  wordWrap: false
});

// 反白文本打印
await PrinterImin.printAntiWhiteText('反白文本', {
  fontSize: 20,
  align: IminPrintAlign.center
});
```

### 3. 图片打印

```typescript
// 单张图片打印
await PrinterImin.printSingleBitmap('https://example.com/image.jpg', {
  width: 200,
  height: 100,
  align: IminPrintAlign.center
});

// 多张图片打印
await PrinterImin.printMultiBitmap([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg'
], {
  width: 150,
  height: 75
});

// 反白图片打印
await PrinterImin.printSingleBitmapBlackWhite('https://example.com/image.jpg', {
  width: 200,
  height: 100
});
```

### 4. 二维码打印

```typescript
import { IminQrCodeStyle, IminQrcodeCorrectionLevel } from 'react-native-printer-imin';

// 基础二维码打印
await PrinterImin.printQrCode('https://www.example.com');

// 带样式的二维码打印
await PrinterImin.printQrCode('https://www.example.com', {
  qrSize: 6,
  align: IminPrintAlign.center,
  leftMargin: 10,
  errorCorrectionLevel: IminQrcodeCorrectionLevel.levelH
});

// 双二维码打印
await PrinterImin.printDoubleQR(
  { text: 'QR Code 1' },
  { text: 'QR Code 2' },
  5
);
```

### 5. 条形码打印

```typescript
import { IminBarcodeType, IminBarCodeStyle, IminBarcodeTextPos } from 'react-native-printer-imin';

// 基础条形码打印
await PrinterImin.printBarCode(IminBarcodeType.code128, '1234567890');

// 带样式的条形码打印
await PrinterImin.printBarCode(IminBarcodeType.code128, '1234567890', {
  width: 2,
  height: 100,
  position: IminBarcodeTextPos.belowText,
  align: IminPrintAlign.center
});
```

### 6. 表格打印

```typescript
// 打印表格
await PrinterImin.printColumnsText([
  {
    text: '商品',
    width: 2,
    fontSize: 24,
    align: IminPrintAlign.left
  },
  {
    text: '数量',
    width: 1,
    fontSize: 24,
    align: IminPrintAlign.center
  },
  {
    text: '价格',
    width: 2,
    fontSize: 24,
    align: IminPrintAlign.right
  }
]);
```

## SDK 2.0 高级功能

### 1. 标签打印

```typescript
import {
  LabelCanvasStyle,
  LabelTextStyle,
  LabelBarCodeStyle,
  LabelQrCodeStyle
} from 'react-native-printer-imin';

// 初始化标签画布
await PrinterImin.labelInitCanvas({
  width: 100,
  height: 50,
  posX: 0,
  posY: 0
});

// 添加文本到标签
await PrinterImin.labelAddText({
  text: '标签文本',
  posX: 10,
  posY: 10,
  textSize: 24
});

// 添加条形码到标签
await PrinterImin.labelAddBarCode({
  barCode: '1234567890',
  posX: 10,
  posY: 30,
  dotWidth: 2,
  barHeight: 50
});

// 打印标签
const result = await PrinterImin.labelPrintCanvas(1);
console.log('打印结果:', result);
```

### 2. 缓冲区管理

```typescript
// 进入打印缓冲区
await PrinterImin.enterPrinterBuffer(true);

// 添加打印内容到缓冲区
await PrinterImin.printText('缓冲区内容1');
await PrinterImin.printText('缓冲区内容2');

// 提交缓冲区内容进行打印
await PrinterImin.commitPrinterBuffer();

// 退出缓冲区
await PrinterImin.exitPrinterBuffer(false);
```

### 3. 设备信息获取

```typescript
// 获取打印机信息
const serialNumber = await PrinterImin.getPrinterSerialNumber();
const modelName = await PrinterImin.getPrinterModelName();
const firmwareVersion = await PrinterImin.getPrinterFirmwareVersion();
const hardwareVersion = await PrinterImin.getPrinterHardwareVersion();

console.log('设备信息:', {
  serialNumber,
  modelName,
  firmwareVersion,
  hardwareVersion
});

// 获取打印机参数
const density = await PrinterImin.getPrinterDensity();
const speed = await PrinterImin.getPrinterSpeed();
const paperType = await PrinterImin.getPrinterPaperType();
```

## 错误处理与调试

### 1. 错误处理

```typescript
try {
  await PrinterImin.initPrinter();
  await PrinterImin.printText('测试打印');
} catch (error) {
  console.error('打印失败:', error);

  // 检查打印机状态
  const status = await PrinterImin.getPrinterStatus();
  if (status.code !== 0) {
    console.error('打印机错误:', status.message);
  }
}
```

### 2. 调试模式

```typescript
// 开启调试日志
await PrinterImin.openLogs(1);

// 关闭调试日志
await PrinterImin.openLogs(0);
```

### 3. 常见问题

**打印机无响应**
- 检查设备是否为iMin设备
- 确认打印机初始化是否成功
- 检查打印机状态

**打印内容不完整**
- 检查纸张是否充足
- 确认打印内容是否超出纸张宽度
- 检查打印机设置

**图片打印失败**
- 确认图片URL可访问
- 检查图片格式是否支持
- 验证图片尺寸设置

## 最佳实践

### 1. 初始化流程

```typescript
class PrinterManager {
  private static instance: PrinterManager;
  private isInitialized = false;

  static getInstance(): PrinterManager {
    if (!PrinterManager.instance) {
      PrinterManager.instance = new PrinterManager();
    }
    return PrinterManager.instance;
  }

  async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;

    try {
      await PrinterImin.initPrinter();
      const status = await PrinterImin.getPrinterStatus();

      if (status.code === 0) {
        this.isInitialized = true;
        return true;
      }

      throw new Error(status.message);
    } catch (error) {
      console.error('打印机初始化失败:', error);
      return false;
    }
  }
}
```

### 2. 状态监听

```typescript
class PrinterStatusManager {
  private statusListener?: () => void;

  startListening(callback: (status: any) => void) {
    this.statusListener = PrinterImin.receiveBroadcastStream.listen((payload) => {
      if (payload.eventName === 'printer_status') {
        callback(payload.eventData);
      }
    });
  }

  stopListening() {
    if (this.statusListener) {
      this.statusListener();
      this.statusListener = undefined;
    }
  }
}
```

### 3. 打印队列管理

```typescript
class PrintQueue {
  private queue: (() => Promise<void>)[] = [];
  private isProcessing = false;

  async addTask(task: () => Promise<void>) {
    this.queue.push(task);
    if (!this.isProcessing) {
      await this.processQueue();
    }
  }

  private async processQueue() {
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        try {
          await task();
        } catch (error) {
          console.error('打印任务失败:', error);
        }
      }
    }

    this.isProcessing = false;
  }
}
```

## 性能优化

### 1. 图片优化

- 使用适当的图片尺寸，避免过大的图片
- 优先使用本地图片资源
- 对网络图片进行缓存处理

### 2. 批量打印

- 使用缓冲区管理批量打印内容
- 合理组织打印顺序，减少设置切换
- 避免频繁的打印机状态查询

### 3. 内存管理

- 及时释放不需要的资源
- 避免长时间持有大量图片数据
- 合理使用事件监听器

## 版本更新记录

### v0.10.6 (当前版本)
- 适配A15设备
- 更新SDK到iminPrinterSDK-15_V1.3.2_2505261539.jar
- 修复Android 16k页面.so文件适配问题

### v0.10.1
- 新增标签打印API
- 增强标签打印功能

### v0.9.0
- 重大版本更新
- 新增2.0 API支持

## 技术支持

- **GitHub仓库**: https://github.com/iminsoftware/react-native-printer-imin
- **问题反馈**: https://github.com/iminsoftware/react-native-printer-imin/issues
- **开发团队**: iminsoftware <softwareteam@imin.sg>

## 许可证

MIT License - 详见 [LICENSE](../LICENSE) 文件
