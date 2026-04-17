# react-native-printer-imin

iMin 打印机 React Native 原生模块插件，支持 iMin 全系列 Android 智能 POS 设备。

🌐 [English](#english) | 中文

---

## 目录

- [环境要求](#环境要求)
- [安装](#安装)
- [快速上手](#快速上手)
- [SDK 版本说明](#sdk-版本说明)
- [API 概览](#api-概览)
- [支持设备](#支持设备)
- [示例项目](#示例项目)
- [详细文档](#详细文档)
- [常见问题](#常见问题)
- [更新日志](#更新日志)
- [参与贡献](#参与贡献)
- [许可证](#许可证)

---

## 环境要求

| 依赖 | 最低版本 |
|------|---------|
| Node.js | >= 16.0.0 |
| React Native | >= 0.72 |
| Android SDK | minSdk 21, compileSdk 34 |
| Yarn | 3.x（项目使用 Yarn Workspaces） |

---

## 安装

```bash
npm install react-native-printer-imin
# 或
yarn add react-native-printer-imin
```

安装后需要重新编译原生代码（不支持 Expo Go）。

> 详细安装配置见 👉 [安装指南](./docs/installation-guide.md)

---

## 快速上手

```typescript
import PrinterImin, { IminPrintAlign } from 'react-native-printer-imin';

// 1. 初始化打印机
await PrinterImin.initPrinter();

// 2. 查询打印机状态
const status = await PrinterImin.getPrinterStatus();
console.log(status); // { code: '0', message: 'normal' }

// 3. 打印文本
await PrinterImin.printText('Hello World');

// 4. 打印二维码
await PrinterImin.printQrCode('https://www.imin.sg', {
  qrSize: 4,
  align: IminPrintAlign.center,
});

// 5. 走纸
await PrinterImin.printAndFeedPaper(100);
```

> 5 分钟上手教程 👉 [快速开始](./docs/quick-start.md)

---

## SDK 版本说明

插件会自动检测设备的 SDK 版本：

```typescript
console.log('SDK版本:', PrinterImin.version);
// 输出: "1.0.0" 或 "2.0.0"
```

| SDK 版本 | 功能 | 状态 |
|---------|------|------|
| 2.0 | 完整功能 + 标签打印 + 高级控制 | ✅ 推荐 |
| 1.0 | 基础打印功能 | 兼容支持 |

> 版本迁移指南 👉 [迁移指南](./docs/migration-guide.md)

---

## API 概览

### 基础控制

| 方法 | 说明 |
|------|------|
| `initPrinter()` | 初始化打印机 |
| `getPrinterStatus()` | 获取打印机状态 |
| `initPrinterParams()` | 重置打印参数 |
| `printerSelfChecking()` | 打印机自检 |
| `openCashBox()` | 打开钱箱 |

### 文本打印

| 方法 | 说明 |
|------|------|
| `printText(text, style?)` | 打印文本（支持字号、字体、对齐等） |
| `printTextBitmap(text, style?)` | 以位图方式打印文本（更多样式支持） |
| `printAntiWhiteText(text, style?)` | 打印反白文本 |
| `printColumnsText(columns)` | 打印多列文本（固定宽度） |
| `printColumnsString(columns)` | 打印多列文本（比例宽度） |

### 图片打印

| 方法 | 说明 |
|------|------|
| `printSingleBitmap(uri, style?)` | 打印单张图片 |
| `printMultiBitmap(uris, style?)` | 打印多张图片 |
| `printSingleBitmapBlackWhite(uri, style?)` | 打印黑白图片 |
| `printSingleBitmapColorChart(uri, style?)` | 打印彩色图片 |

### 条码 / 二维码

| 方法 | 说明 |
|------|------|
| `printQrCode(data, style?)` | 打印二维码 |
| `printDoubleQR(qr1, qr2, size)` | 打印双二维码 |
| `printBarCode(type, content, style?)` | 打印条形码 |

### 设备信息

| 方法 | 说明 |
|------|------|
| `getPrinterSerialNumber()` | 获取序列号 |
| `getPrinterModelName()` | 获取型号 |
| `getPrinterFirmwareVersion()` | 获取固件版本 |
| `getServiceVersion()` | 获取打印服务版本 |
| `getPrinterDensity()` | 获取打印浓度 |
| `getPrinterPaperDistance()` | 获取走纸距离 |
| `getPrinterMode()` | 获取打印模式 |

### 标签打印（SDK 2.0）

| 方法 | 说明 |
|------|------|
| `labelInitCanvas(style)` | 初始化标签画布 |
| `labelAddText(style)` | 添加文本到标签 |
| `labelAddBarCode(style)` | 添加条码到标签 |
| `labelAddQrCode(style)` | 添加二维码到标签 |
| `labelAddBitmap(style)` | 添加图片到标签 |
| `labelPrintCanvas()` | 打印标签画布 |

### 事务打印

| 方法 | 说明 |
|------|------|
| `enterPrinterBuffer(clean)` | 开启事务打印 |
| `commitPrinterBuffer()` | 提交事务 |
| `exitPrinterBuffer(commit)` | 退出事务 |

### 其他

| 方法 | 说明 |
|------|------|
| `sendRAWData(bytes)` | 发送 ESC/POS 原始指令 |
| `sendRAWDataHexStr(hex)` | 发送十六进制原始指令 |
| `fullCut()` | 全切纸 |
| `partialCut()` | 半切纸 |
| `printAndLineFeed()` | 打印并换行 |
| `printAndFeedPaper(distance)` | 打印并走纸 |

> 完整 API 参数详情、类型定义、代码示例 👉 [API 参考文档](./docs/api-reference.md)
>
> 实际应用场景示例 👉 [使用示例](./docs/examples.md)

---

## 支持设备

### 手持金融系列
M2-202, M2-203, M2 Pro, Swift 1, Swift 1 Pro, Swift 2, Swift 2 Pro, Swift 2 Ultra

### 平板终端系列
M2 Max, D1, D1 Pro, Falcon 1, Falcon 1 Pro, Falcon 2, Falcon 2 Pro, Swan 2, Swan 2 Pro, Heron 1, Heron 1 mini

### 桌面 POS 设备
D4, Swan 2, Falcon 2

---

## 示例项目

示例代码在 `example/` 目录下：

```bash
# 安装依赖
yarn

# 启动 Metro
cd example && npx react-native start

# 另开终端，运行 Android
cd example && npx react-native run-android
```

打包 Release APK：

```bash
cd example/android
./gradlew assembleRelease
# APK 输出: app/build/outputs/apk/release/
```

---

## 详细文档

### 🇨🇳 中文文档

| 文档 | 说明 | 适用人群 |
|------|------|---------|
| [📖 文档中心](./docs/README.md) | 主要文档入口 | 所有人 |
| [🚀 快速开始](./docs/quick-start.md) | 5 分钟上手 | 新手 |
| [⚙️ 安装指南](./docs/installation-guide.md) | 详细安装配置 | 所有人 |
| [📋 API 参考](./docs/api-reference.md) | 完整 API 文档（参数、类型、示例） | 所有人 |
| [👨‍💻 开发者指南](./docs/developer-guide.md) | 深入开发指导与最佳实践 | 进阶开发者 |
| [💡 使用示例](./docs/examples.md) | 实际应用场景代码 | 所有人 |
| [🔄 迁移指南](./docs/migration-guide.md) | SDK 1.0 → 2.0 升级 | 老版本用户 |
| [❓ 常见问题](./docs/faq.md) | FAQ | 遇到问题时 |

### 🇺🇸 English Documentation

| Document | Description | Audience |
|----------|-------------|----------|
| [📖 Doc Center](./docs/en/README.md) | Main documentation hub | Everyone |
| [🚀 Quick Start](./docs/en/quick-start.md) | Get started in 5 minutes | Beginners |
| [⚙️ Installation](./docs/en/installation-guide.md) | Setup instructions | Everyone |
| [📋 API Reference](./docs/en/api-reference.md) | Complete API docs (params, types, examples) | Everyone |
| [👨‍💻 Developer Guide](./docs/en/developer-guide.md) | Advanced development guide | Advanced |
| [❓ FAQ](./docs/en/faq.md) | Common questions | When stuck |

---

## 常见问题

**Q: 安装后报 "The package doesn't seem to be linked"**
A: 确保执行了 `npx react-native run-android` 重新编译原生代码，不支持 Expo Go。

**Q: 打印机初始化失败**
A: 先调用 `initPrinter()`，确认设备是 iMin 系列且打印服务已安装。

**Q: getPrinterMode() 调用卡住不返回**
A: 部分设备不支持该方法，建议加超时保护（参考 example 中 PrinterInfo 页面的实现）。

> 更多问题 👉 [中文 FAQ](./docs/faq.md) | [English FAQ](./docs/en/faq.md)

---

## 更新日志 / Changelog

### 0.10.11 — 2026-04-10
- 移除未使用的 IminStraElectronicSDK_V1.2.jar 依赖，减小包体积 / Removed unused IminStraElectronicSDK_V1.2.jar to reduce package size
- 更新 build.gradle 依赖配置，清理无用引用 / Cleaned up build.gradle dependencies

### 0.10.10
- 修复已知 bug，printText 空行问题 / Fixed printText blank line bug

### 0.10.8
- 修复已知 bug / Bug fixes

### 0.10.5
- 适配 A15 设备 / Added A15 device support

### 0.10.4
- 更新版本号 / Version bump

### 0.10.3
- 适配 .so 文件 Android 16k 页面 / Android 16k page .so file adaptation
- 更新 SDK: iminPrinterSDK-15_V1.3.2_2505261539.jar / Updated SDK: iminPrinterSDK-15_V1.3.2_2505261539.jar

### 0.10.2 — 2025-03-04
- 新增标签打印 API / Added label printing API

### 0.9.0
- 新增标签打印 API（labelInitCanvas, labelAddText 等） / Added label printing APIs (labelInitCanvas, labelAddText, etc.)

---

## 参与贡献

详见 [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 许可证

MIT

---

---

<a name="english"></a>

# react-native-printer-imin (English)

Native Module for iMin Printer SDK Plugin. Supports all iMin Android smart POS devices.

🌐 [中文](#react-native-printer-imin) | English

---

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Quick Start](#quick-start-1)
- [SDK Versions](#sdk-versions)
- [API Overview](#api-overview)
- [Supported Devices](#supported-devices)
- [Example Project](#example-project)
- [Documentation](#documentation)
- [FAQ](#faq)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [License](#license-1)

---

## Requirements

| Dependency | Minimum Version |
|-----------|----------------|
| Node.js | >= 16.0.0 |
| React Native | >= 0.72 |
| Android SDK | minSdk 21, compileSdk 34 |
| Yarn | 3.x (Yarn Workspaces) |

---

## Installation

```bash
npm install react-native-printer-imin
# or
yarn add react-native-printer-imin
```

Rebuild native code after installation (Expo Go not supported).

> Detailed setup 👉 [Installation Guide](./docs/en/installation-guide.md)

---

## Quick Start

```typescript
import PrinterImin, { IminPrintAlign } from 'react-native-printer-imin';

// 1. Initialize
await PrinterImin.initPrinter();

// 2. Check status
const status = await PrinterImin.getPrinterStatus();

// 3. Print text
await PrinterImin.printText('Hello World');

// 4. Print QR code
await PrinterImin.printQrCode('https://www.imin.sg', {
  qrSize: 4,
  align: IminPrintAlign.center,
});

// 5. Feed paper
await PrinterImin.printAndFeedPaper(100);
```

> 5-minute tutorial 👉 [Quick Start](./docs/en/quick-start.md)

---

## SDK Versions

```typescript
console.log('SDK Version:', PrinterImin.version);
// Output: "1.0.0" or "2.0.0"
```

| SDK Version | Features | Status |
|-------------|----------|--------|
| 2.0 | Full features + Label printing + Advanced control | ✅ Recommended |
| 1.0 | Basic printing | Compatible |

---

## API Overview

### Basic Control

| Method | Description |
|--------|-------------|
| `initPrinter()` | Initialize printer |
| `getPrinterStatus()` | Get printer status |
| `initPrinterParams()` | Reset print parameters |
| `printerSelfChecking()` | Printer self-check |
| `openCashBox()` | Open cash drawer |

### Text Printing

| Method | Description |
|--------|-------------|
| `printText(text, style?)` | Print text with styling |
| `printTextBitmap(text, style?)` | Print text as bitmap |
| `printColumnsText(columns)` | Print multi-column (fixed width) |
| `printColumnsString(columns)` | Print multi-column (proportional) |

### Image Printing

| Method | Description |
|--------|-------------|
| `printSingleBitmap(uri, style?)` | Print single image |
| `printMultiBitmap(uris, style?)` | Print multiple images |

### Barcode / QR Code

| Method | Description |
|--------|-------------|
| `printQrCode(data, style?)` | Print QR code |
| `printDoubleQR(qr1, qr2, size)` | Print dual QR codes |
| `printBarCode(type, content, style?)` | Print barcode |

### Label Printing (SDK 2.0)

| Method | Description |
|--------|-------------|
| `labelInitCanvas(style)` | Initialize label canvas |
| `labelAddText(style)` | Add text to label |
| `labelAddBarCode(style)` | Add barcode to label |
| `labelAddQrCode(style)` | Add QR code to label |
| `labelPrintCanvas()` | Print label canvas |

> Full API details 👉 [API Reference](./docs/en/api-reference.md)

---

## Supported Devices

### Handheld Finance Series
M2-202, M2-203, M2 Pro, Swift 1, Swift 1 Pro, Swift 2, Swift 2 Pro, Swift 2 Ultra

### Tablet Terminal Series
M2 Max, D1, D1 Pro, Falcon 1, Falcon 1 Pro, Falcon 2, Falcon 2 Pro, Swan 2, Swan 2 Pro, Heron 1, Heron 1 mini

### Desktop POS
D4, Swan 2, Falcon 2

---

## Example Project

```bash
yarn
cd example && npx react-native start
# In another terminal:
cd example && npx react-native run-android
```

Build Release APK:

```bash
cd example/android
./gradlew assembleRelease
```

---

## Documentation

| Document | Description |
|----------|-------------|
| [📖 Doc Center](./docs/en/README.md) | Main hub |
| [🚀 Quick Start](./docs/en/quick-start.md) | Get started in 5 min |
| [⚙️ Installation](./docs/en/installation-guide.md) | Setup guide |
| [📋 API Reference](./docs/en/api-reference.md) | Full API docs |
| [👨‍💻 Developer Guide](./docs/en/developer-guide.md) | Advanced guide |
| [❓ FAQ](./docs/en/faq.md) | Common questions |

---

## FAQ

**Q: "The package doesn't seem to be linked"**
A: Run `npx react-native run-android` to rebuild native code. Expo Go is not supported.

**Q: getPrinterMode() hangs**
A: Some devices don't support this method. Add a timeout wrapper (see PrinterInfo page in example).

> More questions 👉 [FAQ](./docs/en/faq.md)

---

## Changelog

> See [更新日志 / Changelog](#更新日志--changelog) above.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
