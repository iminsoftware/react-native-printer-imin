# react-native-printer-imin

Native module for iMin built-in thermal printers on Android.

> [中文文档](./docs/README-zh.md) | [English Docs](./docs/README.md)

## Installation

```bash
npm install react-native-printer-imin
```

Rebuild native code after installation (Expo Go not supported).

## Quick Start

```typescript
import PrinterImin from 'react-native-printer-imin';

await PrinterImin.initPrinter();
await PrinterImin.printText('Hello World');
await PrinterImin.printAndLineFeed();
```

## Features

- Text printing with custom fonts, styles, alignment
- Image printing (URL)
- Barcode printing (UPC, EAN, Code128, etc.)
- QR code and double QR code printing
- Label printing with canvas-based layout `[2.0]`
- Transaction printing (buffer management) `[2.0]`
- Cash drawer control
- Paper cutting (on devices with cutter)

## SDK Versions

| SDK | Devices | Features |
|-----|---------|----------|
| 2.0 | Android 15+ | Full feature set |
| 1.0 | Older devices | Basic printing |

## Documentation

- [English Docs](./docs/README.md) | [API Reference](./docs/api.md)
- [中文文档](./docs/README-zh.md) | [API 文档](./docs/api-zh.md)

## Supported Devices

All iMin Android devices with built-in thermal printers.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md)

## Li

MIT
