# react-native-printer-imin

Native Module For iMin Printer SDK Plugin

## Installation

```sh
npm install react-native-printer-imin
```

## Usage

```js
import PrinterImin from 'react-native-printer-imin';

// Initialize printer
await PrinterImin.initPrinter();

// Check printer status
const status = await PrinterImin.getPrinterStatus();
console.log(status);

// Print text
await PrinterImin.printText('Hello World');
```

## Documentation

📚 **Complete documentation is available in multiple languages:**

### 🇨🇳 中文文档 (Chinese Documentation)

| Document | Description |
|----------|-------------|
| [📖 文档中心](./docs/README.md) | 主要文档中心 |
| [🚀 快速开始](./docs/quick-start.md) | 5分钟快速上手 |
| [⚙️ 安装指南](./docs/installation-guide.md) | 详细安装配置说明 |
| [📋 API参考](./docs/api-reference.md) | 完整API文档 |
| [👨‍💻 开发者指南](./docs/developer-guide.md) | 深入开发指导 |
| [💡 使用示例](./docs/examples.md) | 实际应用场景示例 |
| [🔄 迁移指南](./docs/migration-guide.md) | 版本升级指导 |
| [❓ 常见问题](./docs/faq.md) | 常见问题解答 |

### 🇺🇸 English Documentation

| Document | Description |
|----------|-------------|
| [📖 Documentation Center](./docs/en/README.md) | Main documentation hub |
| [🚀 Quick Start](./docs/en/quick-start.md) | Get started in 5 minutes |
| [⚙️ Installation Guide](./docs/en/installation-guide.md) | Detailed setup instructions |
| [📋 API Reference](./docs/en/api-reference.md) | Complete API documentation |
| [👨‍💻 Developer Guide](./docs/en/developer-guide.md) | Advanced development guide |
| [❓ FAQ](./docs/en/faq.md) | Frequently asked questions |

### Quick Links

- **Example App**: [example/](./example/)
- **GitHub Issues**: [Report Issues](https://github.com/iminsoftware/react-native-printer-imin/issues)

## Features

- ✅ **Text Printing** - Multiple fonts, styles, and alignments
- ✅ **Image Printing** - URL and local images with size control
- ✅ **QR Code Printing** - Customizable size, error correction, and alignment
- ✅ **Barcode Printing** - Multiple barcode formats supported
- ✅ **Table Printing** - Flexible column layouts
- ✅ **Label Printing** - SDK 2.0 exclusive feature
- ✅ **Device Control** - Paper cutting, cash drawer, status monitoring

## Supported Devices

### Handheld Finance Series
- M2-202, M2-203, M2 Pro
- Swift 1, Swift 2, Swift 2 Pro, Swift 2 Ultra, Swift 1 Pro

### Tablet Terminal Series  
- M2 Max, D1, D1 Pro
- Falcon 1, Swan 2, Falcon 2, Falcon 2 Pro, Falcon 1 Pro, Swan 2 Pro, Heron 1, Heron 1 mini

### Desktop POS Equipment
- D4, Swan 2, Falcon 2

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
# 更新0.10.5 版本 Updated to version 0.10.5
更新内容 ： 适配A15  Update details: Adapted for A15
# 更新0.10.4版本  Updated to version 0.10.4
 更新内容： 更新版本号  Update details: Updated version number
# 更新0.10.3版本  Updated to version 0.10.3
fix: adapt .so file for android 16k page, update SDK to iminPrinterSDK-15_V1.3.2_2505261539.jar
更新内容：fix: all->适配.so文件安卓16k页面,更新SDK:iminPrinterSDK-15_V1.3.2_2505261539.jar
# 更新版本号0.10.2
# 更新0.10.1版本
 #  新增标签打印api
# 编辑 package.json 文件，将 "version": "0.8.0" 更新为 "version": "0.9.0"


