# 快速开始

本指南将帮助您快速上手 `react-native-printer-imin`，在几分钟内实现基本的打印功能。

## 前提条件

- 已完成 [安装配置](./installation-guide.md)
- 使用iMin品牌设备
- 设备内置热敏打印机

## 基础示例

### 1. 导入模块

```typescript
import React, { useEffect, useState } from 'react';
import { View, Button, Alert, Text } from 'react-native';
import PrinterImin, { IminPrintAlign, IminFontStyle } from 'react-native-printer-imin';
```

### 2. 创建基础组件

```typescript
const PrinterDemo = () => {
  const [printerStatus, setPrinterStatus] = useState<string>('未知');
  const [isInitialized, setIsInitialized] = useState(false);

  // 初始化打印机
  const initializePrinter = async () => {
    try {
      await PrinterImin.initPrinter();
      const status = await PrinterImin.getPrinterStatus();
      setPrinterStatus(status.message);
      setIsInitialized(true);
      Alert.alert('成功', '打印机初始化成功');
    } catch (error) {
      Alert.alert('错误', `初始化失败: ${error}`);
    }
  };

  // 基础文本打印
  const printBasicText = async () => {
    if (!isInitialized) {
      Alert.alert('提示', '请先初始化打印机');
      return;
    }

    try {
      await PrinterImin.printText('欢迎使用iMin打印机！');
      await PrinterImin.printText('Welcome to iMin Printer!');
      await PrinterImin.printAndLineFeed(); // 走纸一行
      Alert.alert('成功', '打印完成');
    } catch (error) {
      Alert.alert('错误', `打印失败: ${error}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>打印机状态: {printerStatus}</Text>
      <Text>SDK版本: {PrinterImin.version}</Text>
      
      <Button 
        title="初始化打印机" 
        onPress={initializePrinter} 
      />
      
      <Button 
        title="打印测试文本" 
        onPress={printBasicText}
        disabled={!isInitialized}
      />
    </View>
  );
};
```

## 常用功能示例

### 1. 带样式的文本打印

```typescript
const printStyledText = async () => {
  try {
    // 标题 - 大字体、居中、加粗
    await PrinterImin.printText('收银小票', {
      fontSize: 32,
      align: IminPrintAlign.center,
      fontStyle: IminFontStyle.bold
    });
    
    // 分割线
    await PrinterImin.printText('================================', {
      align: IminPrintAlign.center
    });
    
    // 商店信息 - 居中
    await PrinterImin.printText('iMin便利店', {
      fontSize: 24,
      align: IminPrintAlign.center
    });
    
    await PrinterImin.printText('地址: 深圳市南山区', {
      align: IminPrintAlign.center
    });
    
    await PrinterImin.printAndLineFeed();
    
  } catch (error) {
    Alert.alert('错误', `打印失败: ${error}`);
  }
};
```

### 2. 表格打印

```typescript
const printTable = async () => {
  try {
    // 表头
    await PrinterImin.printColumnsText([
      { text: '商品', width: 3, fontSize: 20, align: IminPrintAlign.left },
      { text: '数量', width: 1, fontSize: 20, align: IminPrintAlign.center },
      { text: '单价', width: 2, fontSize: 20, align: IminPrintAlign.right },
      { text: '小计', width: 2, fontSize: 20, align: IminPrintAlign.right }
    ]);
    
    // 分割线
    await PrinterImin.printText('--------------------------------');
    
    // 商品明细
    await PrinterImin.printColumnsText([
      { text: '可口可乐', width: 3, fontSize: 18, align: IminPrintAlign.left },
      { text: '2', width: 1, fontSize: 18, align: IminPrintAlign.center },
      { text: '3.50', width: 2, fontSize: 18, align: IminPrintAlign.right },
      { text: '7.00', width: 2, fontSize: 18, align: IminPrintAlign.right }
    ]);
    
    await PrinterImin.printColumnsText([
      { text: '薯片', width: 3, fontSize: 18, align: IminPrintAlign.left },
      { text: '1', width: 1, fontSize: 18, align: IminPrintAlign.center },
      { text: '5.00', width: 2, fontSize: 18, align: IminPrintAlign.right },
      { text: '5.00', width: 2, fontSize: 18, align: IminPrintAlign.right }
    ]);
    
    // 总计
    await PrinterImin.printText('--------------------------------');
    await PrinterImin.printColumnsText([
      { text: '总计:', width: 6, fontSize: 20, align: IminPrintAlign.right },
      { text: '12.00', width: 2, fontSize: 20, align: IminPrintAlign.right }
    ]);
    
  } catch (error) {
    Alert.alert('错误', `打印失败: ${error}`);
  }
};
```

### 3. 二维码打印

```typescript
import { IminQrcodeCorrectionLevel } from 'react-native-printer-imin';

const printQRCode = async () => {
  try {
    await PrinterImin.printText('扫码支付:', {
      align: IminPrintAlign.center,
      fontSize: 24
    });
    
    await PrinterImin.printQrCode('https://pay.example.com/order/12345', {
      qrSize: 6,
      align: IminPrintAlign.center,
      errorCorrectionLevel: IminQrcodeCorrectionLevel.levelM
    });
    
    await PrinterImin.printText('请使用微信或支付宝扫码', {
      align: IminPrintAlign.center
    });
    
  } catch (error) {
    Alert.alert('错误', `打印失败: ${error}`);
  }
};
```

### 4. 图片打印

```typescript
const printImage = async () => {
  try {
    // 打印logo
    await PrinterImin.printSingleBitmap('https://example.com/logo.png', {
      width: 200,
      height: 100,
      align: IminPrintAlign.center
    });
    
    await PrinterImin.printAndLineFeed();
    
  } catch (error) {
    Alert.alert('错误', `打印失败: ${error}`);
  }
};
```

## 完整的收银小票示例

```typescript
const printReceipt = async () => {
  try {
    // 1. 打印logo (如果有)
    // await printImage();
    
    // 2. 打印标题
    await PrinterImin.printText('购物小票', {
      fontSize: 32,
      align: IminPrintAlign.center,
      fontStyle: IminFontStyle.bold
    });
    
    // 3. 商店信息
    await PrinterImin.printText('================================');
    await PrinterImin.printText('iMin便利店', {
      fontSize: 24,
      align: IminPrintAlign.center
    });
    await PrinterImin.printText('电话: 0755-12345678', {
      align: IminPrintAlign.center
    });
    await PrinterImin.printText('地址: 深圳市南山区科技园', {
      align: IminPrintAlign.center
    });
    
    // 4. 订单信息
    await PrinterImin.printText('================================');
    const now = new Date();
    await PrinterImin.printText(`时间: ${now.toLocaleString()}`);
    await PrinterImin.printText('订单号: 20240112001');
    await PrinterImin.printText('收银员: 张三');
    
    // 5. 商品明细
    await PrinterImin.printText('--------------------------------');
    await printTable();
    
    // 6. 支付信息
    await PrinterImin.printText('--------------------------------');
    await PrinterImin.printText('支付方式: 微信支付');
    await PrinterImin.printText('实收金额: ¥12.00', {
      fontSize: 24,
      fontStyle: IminFontStyle.bold
    });
    
    // 7. 二维码
    await PrinterImin.printText('--------------------------------');
    await printQRCode();
    
    // 8. 结尾
    await PrinterImin.printText('谢谢惠顾，欢迎再次光临！', {
      align: IminPrintAlign.center
    });
    
    // 9. 走纸并切纸 (如果支持)
    await PrinterImin.printAndFeedPaper(50);
    try {
      await PrinterImin.partialCut(); // 仅支持带切刀的设备
    } catch (e) {
      console.log('设备不支持切纸功能');
    }
    
    Alert.alert('成功', '小票打印完成');
    
  } catch (error) {
    Alert.alert('错误', `打印失败: ${error}`);
  }
};
```

## 状态监听

```typescript
const PrinterWithStatus = () => {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    // 监听打印机状态变化
    const unsubscribe = PrinterImin.receiveBroadcastStream.listen((payload) => {
      console.log('收到广播:', payload);
      
      if (payload.eventName === 'printer_status') {
        setStatus(payload.eventData);
      }
    });

    // 组件卸载时取消监听
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      {status && (
        <Text>打印机状态: {status.message}</Text>
      )}
      {/* 其他组件 */}
    </View>
  );
};
```

## 错误处理最佳实践

```typescript
const safePrint = async (printFunction: () => Promise<void>) => {
  try {
    // 检查打印机状态
    const status = await PrinterImin.getPrinterStatus();
    if (status.code !== 0) {
      Alert.alert('打印机错误', status.message);
      return;
    }
    
    // 执行打印
    await printFunction();
    
  } catch (error) {
    console.error('打印错误:', error);
    
    // 根据错误类型给出不同提示
    if (error.toString().includes('paper')) {
      Alert.alert('错误', '打印纸不足，请更换打印纸');
    } else if (error.toString().includes('temperature')) {
      Alert.alert('错误', '打印头过热，请稍后再试');
    } else {
      Alert.alert('错误', `打印失败: ${error}`);
    }
  }
};

// 使用示例
const handlePrint = () => {
  safePrint(async () => {
    await PrinterImin.printText('安全打印测试');
  });
};
```

## 下一步

现在您已经掌握了基础用法，可以继续学习：

1. [API参考文档](./api-reference.md) - 查看所有可用的API
2. [开发者指南](./developer-guide.md) - 深入了解高级功能
3. [示例应用](../example/) - 查看完整的示例代码
4. [常见问题](./faq.md) - 解决常见问题

## 提示

- 在生产环境中，建议添加适当的错误处理和用户反馈
- 对于大量打印任务，考虑使用缓冲区管理功能
- 定期检查打印机状态，确保打印质量
- 根据设备型号调整打印参数以获得最佳效果