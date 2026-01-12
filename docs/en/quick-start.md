# Quick Start

This guide will help you get started with `react-native-printer-imin` quickly and implement basic printing functionality within minutes.

## Prerequisites

- Completed [Installation and Configuration](./installation-guide.md)
- Using iMin brand device
- Device has built-in thermal printer

## Basic Example

### 1. Import Module

```typescript
import React, { useEffect, useState } from 'react';
import { View, Button, Alert, Text } from 'react-native';
import PrinterImin, { IminPrintAlign, IminFontStyle } from 'react-native-printer-imin';
```

### 2. Create Basic Component

```typescript
const PrinterDemo = () => {
  const [printerStatus, setPrinterStatus] = useState<string>('Unknown');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize printer
  const initializePrinter = async () => {
    try {
      await PrinterImin.initPrinter();
      const status = await PrinterImin.getPrinterStatus();
      setPrinterStatus(status.message);
      setIsInitialized(true);
      Alert.alert('Success', 'Printer initialized successfully');
    } catch (error) {
      Alert.alert('Error', `Initialization failed: ${error}`);
    }
  };

  // Basic text printing
  const printBasicText = async () => {
    if (!isInitialized) {
      Alert.alert('Notice', 'Please initialize printer first');
      return;
    }

    try {
      await PrinterImin.printText('Welcome to iMin Printer!');
      await PrinterImin.printText('欢迎使用iMin打印机！');
      await PrinterImin.printAndLineFeed(); // Feed paper one line
      Alert.alert('Success', 'Print completed');
    } catch (error) {
      Alert.alert('Error', `Print failed: ${error}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Printer Status: {printerStatus}</Text>
      <Text>SDK Version: {PrinterImin.version}</Text>
      
      <Button 
        title="Initialize Printer" 
        onPress={initializePrinter} 
      />
      
      <Button 
        title="Print Test Text" 
        onPress={printBasicText}
        disabled={!isInitialized}
      />
    </View>
  );
};
```

## Common Feature Examples

### 1. Styled Text Printing

```typescript
const printStyledText = async () => {
  try {
    // Title - Large font, centered, bold
    await PrinterImin.printText('RECEIPT', {
      fontSize: 32,
      align: IminPrintAlign.center,
      fontStyle: IminFontStyle.bold
    });
    
    // Separator line
    await PrinterImin.printText('================================', {
      align: IminPrintAlign.center
    });
    
    // Store info - Centered
    await PrinterImin.printText('iMin Convenience Store', {
      fontSize: 24,
      align: IminPrintAlign.center
    });
    
    await PrinterImin.printText('Address: Shenzhen Nanshan District', {
      align: IminPrintAlign.center
    });
    
    await PrinterImin.printAndLineFeed();
    
  } catch (error) {
    Alert.alert('Error', `Print failed: ${error}`);
  }
};
```

### 2. Table Printing

```typescript
const printTable = async () => {
  try {
    // Table header
    await PrinterImin.printColumnsText([
      { text: 'Item', width: 3, fontSize: 20, align: IminPrintAlign.left },
      { text: 'Qty', width: 1, fontSize: 20, align: IminPrintAlign.center },
      { text: 'Price', width: 2, fontSize: 20, align: IminPrintAlign.right },
      { text: 'Total', width: 2, fontSize: 20, align: IminPrintAlign.right }
    ]);
    
    // Separator line
    await PrinterImin.printText('--------------------------------');
    
    // Item details
    await PrinterImin.printColumnsText([
      { text: 'Coca Cola', width: 3, fontSize: 18, align: IminPrintAlign.left },
      { text: '2', width: 1, fontSize: 18, align: IminPrintAlign.center },
      { text: '3.50', width: 2, fontSize: 18, align: IminPrintAlign.right },
      { text: '7.00', width: 2, fontSize: 18, align: IminPrintAlign.right }
    ]);
    
    await PrinterImin.printColumnsText([
      { text: 'Chips', width: 3, fontSize: 18, align: IminPrintAlign.left },
      { text: '1', width: 1, fontSize: 18, align: IminPrintAlign.center },
      { text: '5.00', width: 2, fontSize: 18, align: IminPrintAlign.right },
      { text: '5.00', width: 2, fontSize: 18, align: IminPrintAlign.right }
    ]);
    
    // Total
    await PrinterImin.printText('--------------------------------');
    await PrinterImin.printColumnsText([
      { text: 'Total:', width: 6, fontSize: 20, align: IminPrintAlign.right },
      { text: '12.00', width: 2, fontSize: 20, align: IminPrintAlign.right }
    ]);
    
  } catch (error) {
    Alert.alert('Error', `Print failed: ${error}`);
  }
};
```

### 3. QR Code Printing

```typescript
import { IminQrcodeCorrectionLevel } from 'react-native-printer-imin';

const printQRCode = async () => {
  try {
    await PrinterImin.printText('Scan to Pay:', {
      align: IminPrintAlign.center,
      fontSize: 24
    });
    
    await PrinterImin.printQrCode('https://pay.example.com/order/12345', {
      qrSize: 6,
      align: IminPrintAlign.center,
      errorCorrectionLevel: IminQrcodeCorrectionLevel.levelM
    });
    
    await PrinterImin.printText('Please use WeChat or Alipay to scan', {
      align: IminPrintAlign.center
    });
    
  } catch (error) {
    Alert.alert('Error', `Print failed: ${error}`);
  }
};
```

### 4. Image Printing

```typescript
const printImage = async () => {
  try {
    // Print logo
    await PrinterImin.printSingleBitmap('https://example.com/logo.png', {
      width: 200,
      height: 100,
      align: IminPrintAlign.center
    });
    
    await PrinterImin.printAndLineFeed();
    
  } catch (error) {
    Alert.alert('Error', `Print failed: ${error}`);
  }
};
```

## Complete Receipt Example

```typescript
const printReceipt = async () => {
  try {
    // 1. Print logo (if available)
    // await printImage();
    
    // 2. Print title
    await PrinterImin.printText('SHOPPING RECEIPT', {
      fontSize: 32,
      align: IminPrintAlign.center,
      fontStyle: IminFontStyle.bold
    });
    
    // 3. Store information
    await PrinterImin.printText('================================');
    await PrinterImin.printText('iMin Convenience Store', {
      fontSize: 24,
      align: IminPrintAlign.center
    });
    await PrinterImin.printText('Phone: 0755-12345678', {
      align: IminPrintAlign.center
    });
    await PrinterImin.printText('Address: Shenzhen Nanshan Tech Park', {
      align: IminPrintAlign.center
    });
    
    // 4. Order information
    await PrinterImin.printText('================================');
    const now = new Date();
    await PrinterImin.printText(`Time: ${now.toLocaleString()}`);
    await PrinterImin.printText('Order No: 20240112001');
    await PrinterImin.printText('Cashier: John');
    
    // 5. Item details
    await PrinterImin.printText('--------------------------------');
    await printTable();
    
    // 6. Payment information
    await PrinterImin.printText('--------------------------------');
    await PrinterImin.printText('Payment Method: WeChat Pay');
    await PrinterImin.printText('Amount Paid: $12.00', {
      fontSize: 24,
      fontStyle: IminFontStyle.bold
    });
    
    // 7. QR code
    await PrinterImin.printText('--------------------------------');
    await printQRCode();
    
    // 8. Footer
    await PrinterImin.printText('Thank you for your visit!', {
      align: IminPrintAlign.center
    });
    
    // 9. Feed paper and cut (if supported)
    await PrinterImin.printAndFeedPaper(50);
    try {
      await PrinterImin.partialCut(); // Only for devices with cutter
    } catch (e) {
      console.log('Device does not support paper cutting');
    }
    
    Alert.alert('Success', 'Receipt printed successfully');
    
  } catch (error) {
    Alert.alert('Error', `Print failed: ${error}`);
  }
};
```

## Status Monitoring

```typescript
const PrinterWithStatus = () => {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    // Listen for printer status changes
    const unsubscribe = PrinterImin.receiveBroadcastStream.listen((payload) => {
      console.log('Received broadcast:', payload);
      
      if (payload.eventName === 'printer_status') {
        setStatus(payload.eventData);
      }
    });

    // Unsubscribe when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      {status && (
        <Text>Printer Status: {status.message}</Text>
      )}
      {/* Other components */}
    </View>
  );
};
```

## Error Handling Best Practices

```typescript
const safePrint = async (printFunction: () => Promise<void>) => {
  try {
    // Check printer status
    const status = await PrinterImin.getPrinterStatus();
    if (status.code !== 0) {
      Alert.alert('Printer Error', status.message);
      return;
    }
    
    // Execute print
    await printFunction();
    
  } catch (error) {
    console.error('Print error:', error);
    
    // Provide different messages based on error type
    if (error.toString().includes('paper')) {
      Alert.alert('Error', 'Paper out, please replace paper');
    } else if (error.toString().includes('temperature')) {
      Alert.alert('Error', 'Print head overheated, please wait');
    } else {
      Alert.alert('Error', `Print failed: ${error}`);
    }
  }
};

// Usage example
const handlePrint = () => {
  safePrint(async () => {
    await PrinterImin.printText('Safe print test');
  });
};
```

## Next Steps

Now that you've mastered the basics, you can continue learning:

1. [API Reference](./api-reference.md) - View all available APIs
2. [Developer Guide](./developer-guide.md) - Learn about advanced features
3. [Example Application](../../example/) - View complete example code
4. [FAQ](./faq.md) - Solve common issues

## Tips

- Add appropriate error handling and user feedback in production environments
- Consider using buffer management for large print jobs
- Regularly check printer status to ensure print quality
- Adjust print parameters based on device model for optimal results