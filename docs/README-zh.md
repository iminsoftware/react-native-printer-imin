# react-native-printer-imin

> 语言: [English](README.md) | **中文**

iMin 内置热敏打印机 React Native 原生模块插件，支持文本、图片、条码、QR 码、标签打印。

## 设备信息

| 纸宽 | 可打印像素宽度 | 有切刀 |
|------|--------------|--------|
| 80mm | 576px | 部分型号 |
| 58mm | 384px | 无 |

| SDK 版本 | 说明 |
|---------|------|
| 2.0 | 完整功能，Android 15+ 设备 |
| 1.0 | 基础打印功能，旧设备 |

## 安装

```bash
npm install react-native-printer-imin
# 或
yarn add react-native-printer-imin
```

安装后需要重新编译原生代码（不支持 Expo Go）：

```bash
cd android && ./gradlew clean && cd ..
npx react-native run-android
```

### Android 配置

如果启用了 ProGuard，在 `android/app/proguard-rules.pro` 中添加：

```proguard
-keep class com.imin.** { *; }
-keep class com.printerimin.** { *; }
-dontwarn com.imin.**
```

## 快速开始

```typescript
import PrinterImin, { IminPrintAlign, IminFontStyle } from 'react-native-printer-imin';

// 1. 初始化
await PrinterImin.initPrinter();

// 2. 检查状态
const status = await PrinterImin.getPrinterStatus();
if (status.code !== '0') {
  console.log('打印机异常:', status.message);
  return;
}

// 3. 打印文本
await PrinterImin.printText('Hello World', {
  fontSize: 28,
  fontStyle: 1,  // 加粗
  align: 1,      // 居中
});

// 4. 打印 QR 码
await PrinterImin.printQrCode('https://www.imin.sg', {
  qrSize: 6,
  align: 1,
});

// 5. 走纸
await PrinterImin.printAndFeedPaper(100);
```

## 小票打印示例

```typescript
const printReceipt = async () => {
  await PrinterImin.initPrinter();

  await PrinterImin.printText('COFFEE SHOP', {
    fontSize: 32, fontStyle: 1, align: 1,
  });
  await PrinterImin.printText('123 Main Street', { align: 1 });
  await PrinterImin.printAndLineFeed();
  await PrinterImin.printText('--------------------------------');

  // width 是像素宽度，80mm 纸总宽 576px
  await PrinterImin.printColumnsText([
    { text: 'Coffee', width: 250, fontSize: 24, align: 0 },
    { text: 'x2',     width: 100, fontSize: 24, align: 1 },
    { text: '$7.00',  width: 150, fontSize: 24, align: 2 },
  ]);

  await PrinterImin.printText('--------------------------------');
  await PrinterImin.printColumnsText([
    { text: 'TOTAL',  width: 300, fontSize: 28, align: 0 },
    { text: '$9.50',  width: 150, fontSize: 28, align: 2 },
  ]);

  await PrinterImin.printAndLineFeed();
  await PrinterImin.printQrCode('receipt-12345', { qrSize: 5, align: 1 });
  await PrinterImin.printText('Thank you!', { align: 1 });
  await PrinterImin.partialCut();
};
```

## 错误处理

```typescript
try {
  const status = await PrinterImin.getPrinterStatus();
  if (status.code !== '0') {
    throw new Error('打印机异常: ' + status.message);
  }
  await PrinterImin.printText('Hello World');
} catch (e) {
  console.error('打印错误:', e);
}
```

## API 文档

完整方法参考 -> [api-zh.md](api-zh.md)

## 资源

- [npm Package](https://www.npmjs.com/package/react-native-printer-imin)
- [GitHub Repository](https://github.com/iminsoftware/react-native-printer-imin)
- [iMin 官方打印 SDK 文档](https://oss-sg.imin.sg/docs/en/PrinterSDK.html)
