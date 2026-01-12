# Frequently Asked Questions (FAQ)

## Installation and Configuration Issues

### Q: Getting "The package doesn't seem to be linked" error after installation

**A**: This is usually a linking issue. Try the following solutions:

1. **React Native >= 0.60 (Auto-linking)**:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npx react-native run-android
   ```

2. **React Native < 0.60 (Manual linking)**:
   ```bash
   npx react-native link react-native-printer-imin
   ```

3. **Check if using Expo Go**: This package doesn't support Expo Go, requires development build or ejected project.

### Q: Android build fails with dependency not found error

**A**: Check repository configuration in `android/build.gradle`:

```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://www.jitpack.io' }
        maven { url "https://maven.google.com" }
    }
}
```

### Q: Runtime permission error

**A**: Add necessary permissions in `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

For Android 6.0+, runtime permission requests are also needed.

## Device Compatibility Issues

### Q: Error when running on non-iMin devices

**A**: This SDK is designed specifically for iMin devices and won't work properly on other devices. Please ensure:
- Using iMin brand device
- Device has built-in thermal printer
- Android system version >= 5.0

### Q: How to check if device is supported

**A**: You can check using the following method:

```typescript
const checkDevice = async () => {
  try {
    await PrinterImin.initPrinter();
    const status = await PrinterImin.getPrinterStatus();
    console.log('Device supported, status:', status);
    return true;
  } catch (error) {
    console.log('Device not supported or printer unavailable:', error);
    return false;
  }
};
```

### Q: Which iMin device models are supported

**A**: Supported devices include:

**Handheld Finance Series**:
- M2-202, M2-203, M2 Pro
- Swift 1, Swift 2, Swift 2 Pro, Swift 2 Ultra, Swift 1 Pro

**Tablet Terminal Series**:
- M2 Max, D1, D1 Pro
- Falcon 1, Swan 2, Falcon 2, Falcon 2 Pro, Falcon 1 Pro, Swan 2 Pro

**Desktop POS Equipment**:
- D4, Swan 2, Falcon 2

## Printing Function Issues

### Q: Print content is incomplete or truncated

**A**: Possible causes and solutions:

1. **Paper width issue**:
   ```typescript
   // Set correct paper format
   await PrinterImin.setPageFormat(1); // 58mm
   // or
   await PrinterImin.setPageFormat(0); // 80mm
   ```

2. **Text width setting**:
   ```typescript
   // Set appropriate text width
   await PrinterImin.setTextWidth(200);
   ```

3. **Font size too large**:
   ```typescript
   // Use appropriate font size
   await PrinterImin.setTextSize(24);
   ```

### Q: Image printing fails or displays abnormally

**A**: Image printing issue solutions:

1. **Check image URL**:
   ```typescript
   // Ensure URL is accessible
   const testUrl = 'https://example.com/image.jpg';
   ```

2. **Adjust image size**:
   ```typescript
   await PrinterImin.printSingleBitmap(imageUrl, {
     width: 200,  // Don't exceed paper width
     height: 100,
     align: IminPrintAlign.center
   });
   ```

3. **Use local images**:
   ```typescript
   // Prioritize local resources
   const localImage = 'file:///android_asset/logo.png';
   ```

### Q: QR code printing is blurry or unscannable

**A**: QR code quality optimization:

1. **Adjust QR code size**:
   ```typescript
   await PrinterImin.printQrCode(data, {
     qrSize: 6, // Increase size
     errorCorrectionLevel: IminQrcodeCorrectionLevel.levelH // High error correction
   });
   ```

2. **Check content length**:
   - Overly long content affects QR code quality
   - Recommend using short URLs

3. **Set appropriate error correction level**:
   - `levelL`: ~7% error correction capability
   - `levelM`: ~15% error correction capability  
   - `levelQ`: ~25% error correction capability
   - `levelH`: ~30% error correction capability

### Q: Paper cutting function doesn't work

**A**: Paper cutting function limitations:

```typescript
try {
  await PrinterImin.partialCut();
} catch (error) {
  console.log('Device does not support paper cutting');
  // Only devices with cutter support this function
  // e.g., Falcon 1, Falcon 2, Falcon 2 Pro, Falcon 1 Pro, Swan 2 Pro (80mm version)
}
```

## Performance and Stability Issues

### Q: Printing speed is very slow

**A**: Performance optimization suggestions:

1. **Use buffer**:
   ```typescript
   await PrinterImin.enterPrinterBuffer(true);
   
   // Batch add print content
   await PrinterImin.printText('Content 1');
   await PrinterImin.printText('Content 2');
   
   // Print all at once
   await PrinterImin.commitPrinterBuffer();
   await PrinterImin.exitPrinterBuffer(false);
   ```

2. **Optimize images**:
   - Use appropriate image sizes
   - Compress image file sizes
   - Prioritize local images

3. **Reduce setting switches**:
   ```typescript
   // Avoid frequent setting changes
   await PrinterImin.setTextSize(24);
   await PrinterImin.setAlignment(IminPrintAlign.center);
   
   // Batch print content with same format
   await PrinterImin.printText('Content 1');
   await PrinterImin.printText('Content 2');
   ```

### Q: App crashes or memory leaks

**A**: Stability optimization:

1. **Properly manage event listeners**:
   ```typescript
   useEffect(() => {
     const unsubscribe = PrinterImin.receiveBroadcastStream.listen(callback);
     
     return () => {
       unsubscribe(); // Important: cancel listening when component unmounts
     };
   }, []);
   ```

2. **Error handling**:
   ```typescript
   const safePrint = async () => {
     try {
       await PrinterImin.printText('Test');
     } catch (error) {
       console.error('Print failed:', error);
       // Don't let errors crash the app
     }
   };
   ```

3. **Avoid concurrent printing**:
   ```typescript
   class PrintQueue {
     private isProcessing = false;
     
     async addTask(task: () => Promise<void>) {
       if (this.isProcessing) {
         console.log('Print queue busy, please wait');
         return;
       }
       
       this.isProcessing = true;
       try {
         await task();
       } finally {
         this.isProcessing = false;
       }
     }
   }
   ```

## API Usage Issues

### Q: What's the difference between SDK 1.0 and 2.0

**A**: Version differences:

| Feature | SDK 1.0 | SDK 2.0 |
|---------|---------|---------|
| Basic printing | ✅ | ✅ |
| Text/Image/QR code | ✅ | ✅ |
| Label printing | ❌ | ✅ |
| Buffer management | ❌ | ✅ |
| Device info retrieval | ❌ | ✅ |
| Advanced parameter control | ❌ | ✅ |

Check version:
```typescript
console.log('Current SDK version:', PrinterImin.version);
```

### Q: How to listen for printer status changes

**A**: Use broadcast listening:

```typescript
const [printerStatus, setPrinterStatus] = useState(null);

useEffect(() => {
  const unsubscribe = PrinterImin.receiveBroadcastStream.listen((payload) => {
    if (payload.eventName === 'printer_status') {
      setPrinterStatus(payload.eventData);
      console.log('Printer status changed:', payload.eventData);
    }
  });

  return unsubscribe;
}, []);
```

### Q: How to control column width in table printing

**A**: Column width control explanation:

```typescript
await PrinterImin.printColumnsText([
  {
    text: 'Product Name',
    width: 4, // Relative width, total width is sum of all column widths
    fontSize: 20,
    align: IminPrintAlign.left
  },
  {
    text: 'Qty',
    width: 1, // Narrower column
    fontSize: 20,
    align: IminPrintAlign.center
  },
  {
    text: 'Price',
    width: 3, // Medium width
    fontSize: 20,
    align: IminPrintAlign.right
  }
]);
// Actual column width ratio is 4:1:3
```

## Debugging and Troubleshooting

### Q: How to enable debug logs

**A**: Debug mode settings:

```typescript
// Enable debug logs
await PrinterImin.openLogs(1);

// Disable debug logs
await PrinterImin.openLogs(0);
```

Recommended to enable in development environment:
```typescript
if (__DEV__) {
  PrinterImin.openLogs(1);
}
```

### Q: How to send raw print commands

**A**: Use raw data sending:

```typescript
// Send hexadecimal string
await PrinterImin.sendRAWDataHexStr('1B40'); // ESC @

// Send byte array (SDK 2.0)
await PrinterImin.sendRAWData([0x1B, 0x40]);
```

### Q: How to troubleshoot when printer is not responding

**A**: Troubleshooting steps:

1. **Check device**:
   ```typescript
   const checkDevice = async () => {
     try {
       const status = await PrinterImin.getPrinterStatus();
       console.log('Printer status:', status);
       return status.code === 0;
     } catch (error) {
       console.error('Device check failed:', error);
       return false;
     }
   };
   ```

2. **Reinitialize**:
   ```typescript
   try {
     await PrinterImin.resetDevice();
     await PrinterImin.initPrinter();
   } catch (error) {
     console.error('Reset failed:', error);
   }
   ```

3. **Check paper and hardware**:
   - Confirm sufficient printing paper
   - Check if print head is overheated
   - Ensure device has sufficient battery

## Best Practices Issues

### Q: Production environment deployment considerations

**A**: Production environment recommendations:

1. **Error handling**:
   ```typescript
   const productionPrint = async (content: string) => {
     try {
       const status = await PrinterImin.getPrinterStatus();
       if (status.code !== 0) {
         throw new Error(`Printer error: ${status.message}`);
       }
       
       await PrinterImin.printText(content);
       
     } catch (error) {
       // Log error
       console.error('Print failed:', error);
       
       // User-friendly error message
       Alert.alert('Print Failed', 'Please check printer status and try again');
       
       // Optional: send error report to server
       // reportError(error);
     }
   };
   ```

2. **Performance monitoring**:
   ```typescript
   const monitoredPrint = async (content: string) => {
     const startTime = Date.now();
     
     try {
       await PrinterImin.printText(content);
       const duration = Date.now() - startTime;
       console.log(`Print duration: ${duration}ms`);
     } catch (error) {
       console.error('Print failed:', error);
     }
   };
   ```

3. **Disable debug logs**:
   ```typescript
   // Disable debug in production
   if (!__DEV__) {
     PrinterImin.openLogs(0);
   }
   ```

### Q: How to implement print queue management

**A**: Queue management implementation:

```typescript
class PrinterQueue {
  private queue: Array<() => Promise<void>> = [];
  private isProcessing = false;

  async add(task: () => Promise<void>): Promise<void> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          await task();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
      
      this.process();
    });
  }

  private async process() {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        try {
          await task();
        } catch (error) {
          console.error('Queue task failed:', error);
        }
      }
    }

    this.isProcessing = false;
  }
}

// Usage example
const printerQueue = new PrinterQueue();

const printReceipt = async () => {
  await printerQueue.add(async () => {
    await PrinterImin.printText('Receipt content');
  });
};
```

## Technical Support

If the above FAQ doesn't solve your problem, please:

1. Check [GitHub Issues](https://github.com/iminsoftware/react-native-printer-imin/issues)
2. Search existing issues or create a new Issue
3. Provide detailed error information and environment configuration
4. Contact technical support: huayan.xie@imin.com

When submitting an Issue, please include:
- Device model and Android version
- React Native version
- SDK version
- Complete error logs
- Steps to reproduce