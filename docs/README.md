# React Native Printer iMin - 文档中心

## 概述

`react-native-printer-imin` 是专为iMin设备内置热敏打印机设计的React Native原生模块。该SDK支持iMin全系列产品的打印功能，让开发者能够轻松实现热敏小票打印。

### 支持的设备系列

**手持金融系列**
- M2-202、M2-203、M2 Pro
- Swift 1、Swift 2、Swift 2 Pro、Swift 2 Ultra、Swift 1 Pro

**平板终端系列**
- M2 Max、D1、D1 Pro
- Falcon 1、Swan 2、Falcon 2、Falcon 2 Pro、Falcon 1 Pro、Swan 2 Pro

**桌面收银设备**
- D4、Swan 2、Falcon 2

### 打印机规格

iMin产品配备两种内置打印机：
- **80mm纸宽**：带切刀，兼容58mm（如Falcon 1、Falcon 2、Falcon 2 Pro、Falcon 1 Pro、Swan 2 Pro）
- **58mm纸宽**：无切刀（如D1、D1 Pro、M2 Max、Swift系列）

## 快速导航

### 📚 文档指南

| 文档 | 描述 | 适用人群 |
|------|------|----------|
| [安装指南](./installation-guide.md) | 详细的安装和配置步骤 | 所有开发者 |
| [快速开始](./quick-start.md) | 5分钟上手基础功能 | 新手开发者 |
| [API参考](./api-reference.md) | 完整的API文档 | 所有开发者 |
| [开发者指南](./developer-guide.md) | 深入的开发指导和最佳实践 | 进阶开发者 |
| [常见问题](./faq.md) | 常见问题解答 | 遇到问题的开发者 |

### 🚀 版本支持

| SDK版本 | 功能特性 | 当前状态 |
|---------|----------|----------|
| **2.0** | 完整功能 + 标签打印 + 高级控制 | 推荐使用 |
| **1.0** | 基础打印功能 | 兼容支持 |

当前最新版本：**v0.10.6**

**版本检测**:
```typescript
console.log('SDK版本:', PrinterImin.version);
// 输出: "1.0.0" 或 "2.0.0"
```

### 🛠️ 核心功能

- ✅ **文本打印** - 支持多种字体、样式和对齐方式
- ✅ **图片打印** - 支持URL和本地图片，多种尺寸控制
- ✅ **二维码打印** - 可调节大小、纠错级别和对齐方式
- ✅ **条形码打印** - 支持多种条形码格式
- ✅ **表格打印** - 灵活的列布局和对齐控制
- ✅ **标签打印** - SDK 2.0专有功能
- ✅ **设备控制** - 切纸、开钱箱、状态监听

## 快速体验

### 安装

```bash
npm install react-native-printer-imin
```

### 基础使用

```typescript
import PrinterImin from 'react-native-printer-imin';

// 初始化打印机
await PrinterImin.initPrinter();

// 打印文本
await PrinterImin.printText('Hello iMin Printer!');

// 打印二维码
await PrinterImin.printQrCode('https://www.imin.sg');
```

## 版本历史

### v0.10.6 (最新)
- 适配A15设备
- 更新SDK到最新版本
- 修复Android 16k页面适配问题

### v0.10.1
- 新增标签打印API
- 增强标签打印功能

### v0.9.0
- 重大版本更新
- 新增SDK 2.0支持

## 技术支持

### 开发资源
- **GitHub仓库**: [react-native-printer-imin](https://github.com/iminsoftware/react-native-printer-imin)
- **示例代码**: [example目录](../example/)
- **问题反馈**: [GitHub Issues](https://github.com/iminsoftware/react-native-printer-imin/issues)

### 联系我们
- **开发团队**: iminsoftware
- **邮箱**: huayan.xie@imin.com
- **官网**: https://www.imin.sg

## 许可证

MIT License - 详见 [LICENSE](../LICENSE) 文件

---

**开始您的打印之旅** 👉 [安装指南](./installation-guide.md)


