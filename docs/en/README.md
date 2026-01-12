# React Native Printer iMin - Documentation Center

## Overview

`react-native-printer-imin` is a React Native native module designed specifically for iMin devices with built-in thermal printers. This SDK supports printing functionality across the entire iMin product line, enabling developers to easily implement thermal receipt printing.

### Supported Device Series

**Handheld Finance Series**
- M2-202, M2-203, M2 Pro
- Swift 1, Swift 2, Swift 2 Pro, Swift 2 Ultra

**Tablet Terminal Series**
- M2 Max, D1, D1 Pro
- Falcon 1, Swan 2, Falcon 2

**Desktop POS Equipment**
- D4, Swan 2, Falcon 2

### Printer Specifications

iMin products come with two types of built-in printers:
- **80mm paper width**: With cutter, compatible with 58mm (e.g., Falcon 1, Falcon 2)
- **58mm paper width**: Without cutter (e.g., D1, D1 Pro, M2 Max, Swift series)

## Quick Navigation

### 📚 Documentation Guide

| Document | Description | Target Audience |
|----------|-------------|-----------------|
| [Installation Guide](./installation-guide.md) | Detailed installation and configuration steps | All developers |
| [Quick Start](./quick-start.md) | Get started with basic features in 5 minutes | New developers |
| [API Reference](./api-reference.md) | Complete API documentation | All developers |
| [Developer Guide](./developer-guide.md) | In-depth development guidance and best practices | Advanced developers |
| [FAQ](./faq.md) | Frequently asked questions | Developers with issues |

### 🚀 Version Support

| SDK Version | Features | Current Status |
|-------------|----------|----------------|
| **2.0** | Complete features + Label printing + Advanced control | Recommended |
| **1.0** | Basic printing features | Compatible |

Current Latest Version: **v0.10.6**

**Version Detection**:
```typescript
console.log('SDK Version:', PrinterImin.version);
// Output: "1.0.0" or "2.0.0"
```

### 🛠️ Core Features

- ✅ **Text Printing** - Multiple fonts, styles, and alignments
- ✅ **Image Printing** - URL and local images with size control
- ✅ **QR Code Printing** - Adjustable size, error correction, and alignment
- ✅ **Barcode Printing** - Multiple barcode formats supported
- ✅ **Table Printing** - Flexible column layouts and alignment control
- ✅ **Label Printing** - SDK 2.0 exclusive feature
- ✅ **Device Control** - Paper cutting, cash drawer, status monitoring

## Quick Experience

### Installation

```bash
npm install react-native-printer-imin
```

### Basic Usage

```typescript
import PrinterImin from 'react-native-printer-imin';

// Initialize printer
await PrinterImin.initPrinter();

// Print text
await PrinterImin.printText('Hello iMin Printer!');

// Print QR code
await PrinterImin.printQrCode('https://www.imin.sg');
```

## Version History

### v0.10.6 (Latest)
- Support for A15 devices
- Updated SDK to latest version
- Fixed Android 16k page adaptation issues

### v0.10.1
- Added label printing API
- Enhanced label printing functionality

### v0.9.0
- Major version update
- Added SDK 2.0 support

## Technical Support

### Development Resources
- **GitHub Repository**: [react-native-printer-imin](https://github.com/iminsoftware/react-native-printer-imin)
- **Example Code**: [example directory](../../example/)
- **Issue Reporting**: [GitHub Issues](https://github.com/iminsoftware/react-native-printer-imin/issues)

### Contact Us
- **Development Team**: iminsoftware
- **Email**: softwareteam@imin.sg
- **Website**: https://www.imin.sg

## License

MIT License - See [LICENSE](../../LICENSE) file for details

---

**Start Your Printing Journey** 👉 [Installation Guide](./installation-guide.md)