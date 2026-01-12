# Developer Guide

## Project Overview

`react-native-printer-imin` is a React Native native module designed specifically for iMin devices with built-in thermal printers. This SDK supports printing functionality across the entire iMin product line, enabling developers to easily implement thermal receipt printing.

### Supported Devices

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
- **80mm paper width**: With cutter, compatible with 58mm (e.g., Falcon 1, Falcon 2、Falcon 2 Pro、Falcon 1 Pro)
- **58mm paper width**: Without cutter (e.g., D1, D1 Pro, M2 Max, Swift series)

## Architecture Design

### Project Structure

```
react-native-printer-imin/
├── src/                    # TypeScript source code
│   ├── index.tsx          # Main API exports
│   ├── typing.ts          # Type definitions
│   └── __tests__/         # Unit tests
├── android/               # Android native implementation
│   ├── src/main/java/     # Java source code
│   ├── libs/              # iMin SDK JAR files
│   └── jniLibs/           # Native library files
├── example/               # Example application
├── docs/                  # Documentation
└── lib/                   # Build output
```

### Core Components

1. **PrinterSDK**: Main API interface, encapsulating all printing functions
2. **NativeModules.PrinterImin**: React Native bridge module
3. **Event Listener**: Supports printer status broadcast listening

## API Version Overview

### SDK 1.0 vs 2.0

The project supports two API versions simultaneously:

**SDK 1.0**
- Basic printing functionality
- Text, image, QR code, barcode printing
- Simple style settings

**SDK 2.0**
- Enhanced printing functionality
- Label printing support
- More printer parameter control
- Buffer management
- Device information retrieval

### Version Detection

```typescript
import PrinterImin from 'react-native-printer-imin';

console.log('SDK Version:', PrinterImin.version);
// Output: "1.0.0" or "2.0.0"
```

## Core Feature Modules

### 1. Printer Initialization and Status

```typescript
// Initialize printer
await PrinterImin.initPrinter();

// Get printer status
const status = await PrinterImin.getPrinterStatus();
console.log(status.message);

// Listen for printer status changes
const unsubscribe = PrinterImin.receiveBroadcastStream.listen((payload) => {
  if (payload.eventName === 'printer_status') {
    console.log('Printer status:', payload.eventData);
  }
});
```

### 2. Text Printing

```typescript
import { IminTextStyle, IminPrintAlign, IminFontStyle } from 'react-native-printer-imin';

// Basic text printing
await PrinterImin.printText('Hello World');

// Styled text printing
await PrinterImin.printText('Hello World', {
  fontSize: 24,
  align: IminPrintAlign.center,
  fontStyle: IminFontStyle.bold,
  wordWrap: false
});

// Inverted text printing
await PrinterImin.printAntiWhiteText('Inverted Text', {
  fontSize: 20,
  align: IminPrintAlign.center
});
```

### 3. Image Printing

```typescript
// Single image printing
await PrinterImin.printSingleBitmap('https://example.com/image.jpg', {
  width: 200,
  height: 100,
  align: IminPrintAlign.center
});

// Multiple image printing
await PrinterImin.printMultiBitmap([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg'
], {
  width: 150,
  height: 75
});

// Inverted image printing
await PrinterImin.printSingleBitmapBlackWhite('https://example.com/image.jpg', {
  width: 200,
  height: 100
});
```

### 4. QR Code Printing

```typescript
import { IminQrCodeStyle, IminQrcodeCorrectionLevel } from 'react-native-printer-imin';

// Basic QR code printing
await PrinterImin.printQrCode('https://www.example.com');

// Styled QR code printing
await PrinterImin.printQrCode('https://www.example.com', {
  qrSize: 6,
  align: IminPrintAlign.center,
  leftMargin: 10,
  errorCorrectionLevel: IminQrcodeCorrectionLevel.levelH
});

// Double QR code printing
await PrinterImin.printDoubleQR(
  { text: 'QR Code 1' },
  { text: 'QR Code 2' },
  5
);
```

### 5. Barcode Printing

```typescript
import { IminBarcodeType, IminBarCodeStyle, IminBarcodeTextPos } from 'react-native-printer-imin';

// Basic barcode printing
await PrinterImin.printBarCode(IminBarcodeType.code128, '1234567890');

// Styled barcode printing
await PrinterImin.printBarCode(IminBarcodeType.code128, '1234567890', {
  width: 2,
  height: 100,
  position: IminBarcodeTextPos.belowText,
  align: IminPrintAlign.center
});
```

### 6. Table Printing

```typescript
// Print table
await PrinterImin.printColumnsText([
  {
    text: 'Product',
    width: 2,
    fontSize: 24,
    align: IminPrintAlign.left
  },
  {
    text: 'Qty',
    width: 1,
    fontSize: 24,
    align: IminPrintAlign.center
  },
  {
    text: 'Price',
    width: 2,
    fontSize: 24,
    align: IminPrintAlign.right
  }
]);
```

## SDK 2.0 Advanced Features

### 1. Label Printing

```typescript
import {
  LabelCanvasStyle,
  LabelTextStyle,
  LabelBarCodeStyle,
  LabelQrCodeStyle
} from 'react-native-printer-imin';

// Initialize label canvas
await PrinterImin.labelInitCanvas({
  width: 100,
  height: 50,
  posX: 0,
  posY: 0
});

// Add text to label
await PrinterImin.labelAddText({
  text: 'Label Text',
  posX: 10,
  posY: 10,
  textSize: 24
});

// Add barcode to label
await PrinterImin.labelAddBarCode({
  barCode: '1234567890',
  posX: 10,
  posY: 30,
  dotWidth: 2,
  barHeight: 50
});

// Print label
const result = await PrinterImin.labelPrintCanvas(1);
console.log('Print result:', result);
```

### 2. Buffer Management

```typescript
// Enter print buffer
await PrinterImin.enterPrinterBuffer(true);

// Add print content to buffer
await PrinterImin.printText('Buffer content 1');
await PrinterImin.printText('Buffer content 2');

// Commit buffer content for printing
await PrinterImin.commitPrinterBuffer();

// Exit buffer
await PrinterImin.exitPrinterBuffer(false);
```

### 3. Device Information Retrieval

```typescript
// Get printer information
const serialNumber = await PrinterImin.getPrinterSerialNumber();
const modelName = await PrinterImin.getPrinterModelName();
const firmwareVersion = await PrinterImin.getPrinterFirmwareVersion();
const hardwareVersion = await PrinterImin.getPrinterHardwareVersion();

console.log('Device info:', {
  serialNumber,
  modelName,
  firmwareVersion,
  hardwareVersion
});

// Get printer parameters
const density = await PrinterImin.getPrinterDensity();
const speed = await PrinterImin.getPrinterSpeed();
const paperType = await PrinterImin.getPrinterPaperType();
```

## Error Handling and Debugging

### 1. Error Handling

```typescript
try {
  await PrinterImin.initPrinter();
  await PrinterImin.printText('Test print');
} catch (error) {
  console.error('Print failed:', error);

  // Check printer status
  const status = await PrinterImin.getPrinterStatus();
  if (status.code !== 0) {
    console.error('Printer error:', status.message);
  }
}
```

### 2. Debug Mode

```typescript
// Enable debug logs
await PrinterImin.openLogs(1);

// Disable debug logs
await PrinterImin.openLogs(0);
```

### 3. Common Issues

**Printer Not Responding**
- Check if device is iMin device
- Confirm printer initialization success
- Check printer status

**Incomplete Print Content**
- Check if paper is sufficient
- Confirm print content doesn't exceed paper width
- Check printer settings

**Image Print Failure**
- Confirm image URL is accessible
- Check if image format is supported
- Verify image size settings

## Best Practices

### 1. Initialization Process

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
      console.error('Printer initialization failed:', error);
      return false;
    }
  }
}
```

### 2. Status Monitoring

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

### 3. Print Queue Management

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
          console.error('Print task failed:', error);
        }
      }
    }

    this.isProcessing = false;
  }
}
```

## Performance Optimization

### 1. Image Optimization

- Use appropriate image sizes, avoid oversized images
- Prioritize local image resources
- Cache network images

### 2. Batch Printing

- Use buffer management for batch print content
- Organize print order reasonably, reduce setting switches
- Avoid frequent printer status queries

### 3. Memory Management

- Release unnecessary resources promptly
- Avoid holding large amounts of image data for long periods
- Use event listeners reasonably

## Version Update History

### v0.10.6 (Current Version)
- Support for A15 devices
- Updated SDK to iminPrinterSDK-15_V1.3.2_2505261539.jar
- Fixed Android 16k page .so file adaptation issues

### v0.10.1
- Added label printing API
- Enhanced label printing functionality

### v0.9.0
- Major version update
- Added SDK 2.0 support

## Technical Support

- **GitHub Repository**: https://github.com/iminsoftware/react-native-printer-imin
- **Issue Reporting**: https://github.com/iminsoftware/react-native-printer-imin/issues
- **Development Team**: iminsoftware <softwareteam@imin.sg>

## License

MIT License - See [LICENSE](../../LICENSE) file for details
