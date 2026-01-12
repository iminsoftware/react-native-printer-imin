# 使用示例

本文档提供了各种实际使用场景的完整代码示例，帮助开发者快速理解和应用API。

## 目录

- [基础示例](#基础示例)
- [商业场景示例](#商业场景示例)
- [高级功能示例](#高级功能示例)
- [错误处理示例](#错误处理示例)
- [性能优化示例](#性能优化示例)

## 基础示例

### 1. 打印机初始化和状态检查

```typescript
import React, { useState, useEffect } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import PrinterImin from 'react-native-printer-imin';

const PrinterInitExample = () => {
  const [status, setStatus] = useState<string>('未初始化');
  const [isReady, setIsReady] = useState(false);

  const initializePrinter = async () => {
    try {
      setStatus('初始化中...');
      
      // 初始化打印机
      await PrinterImin.initPrinter();
      
      // 检查状态
      const printerStatus = await PrinterImin.getPrinterStatus();
      
      if (printerStatus.code === 0) {
        setStatus('打印机就绪');
        setIsReady(true);
      } else {
        setStatus(`错误: ${printerStatus.message}`);
        setIsReady(false);
      }
      
    } catch (error) {
      setStatus(`初始化失败: ${error}`);
      setIsReady(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>状态: {status}</Text>
      <Text>SDK版本: {PrinterImin.version}</Text>
      
      <Button 
        title="初始化打印机" 
        onPress={initializePrinter} 
      />
      
      <Button 
        title="测试打印" 
        disabled={!isReady}
        onPress={async () => {
          try {
            await PrinterImin.printText('测试打印成功！');
            Alert.alert('成功', '打印完成');
          } catch (error) {
            Alert.alert('错误', `打印失败: ${error}`);
          }
        }}
      />
    </View>
  );
};
```

### 2. 基础文本打印

```typescript
import { IminPrintAlign, IminFontStyle, IminTypeface } from 'react-native-printer-imin';

const BasicTextExample = () => {
  const printBasicText = async () => {
    try {
      // 标题
      await PrinterImin.printText('欢迎光临', {
        fontSize: 32,
        align: IminPrintAlign.center,
        fontStyle: IminFontStyle.bold
      });
      
      // 副标题
      await PrinterImin.printText('iMin智能设备', {
        fontSize: 24,
        align: IminPrintAlign.center,
        typeface: IminTypeface.SansSerif
      });
      
      // 分割线
      await PrinterImin.printText('================================');
      
      // 普通文本
      await PrinterImin.printText('这是普通文本');
      
      // 左对齐
      await PrinterImin.printText('左对齐文本', {
        align: IminPrintAlign.left
      });
      
      // 右对齐
      await PrinterImin.printText('右对齐文本', {
        align: IminPrintAlign.right
      });
      
      // 反白文本
      await PrinterImin.printAntiWhiteText('重要提示', {
        fontSize: 20,
        align: IminPrintAlign.center
      });
      
      // 走纸
      await PrinterImin.printAndLineFeed();
      
    } catch (error) {
      console.error('打印失败:', error);
    }
  };

  return (
    <Button title="打印基础文本" onPress={printBasicText} />
  );
};
```

## 商业场景示例

### 1. 完整收银小票

```typescript
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  timestamp: Date;
}

const printReceipt = async (order: Order) => {
  try {
    // 1. 店铺Logo (如果有)
    try {
      await PrinterImin.printSingleBitmap('https://example.com/logo.png', {
        width: 200,
        height: 80,
        align: IminPrintAlign.center
      });
    } catch (e) {
      console.log('Logo打印失败，跳过');
    }
    
    // 2. 店铺信息
    await PrinterImin.printText('iMin便利店', {
      fontSize: 28,
      align: IminPrintAlign.center,
      fontStyle: IminFontStyle.bold
    });
    
    await PrinterImin.printText('地址: 深圳市南山区科技园', {
      align: IminPrintAlign.center
    });
    
    await PrinterImin.printText('电话: 0755-12345678', {
      align: IminPrintAlign.center
    });
    
    // 3. 分割线
    await PrinterImin.printText('================================');
    
    // 4. 订单信息
    await PrinterImin.printText(`订单号: ${order.id}`);
    await PrinterImin.printText(`时间: ${order.timestamp.toLocaleString()}`);
    await PrinterImin.printText('收银员: 张三');
    
    // 5. 商品明细表头
    await PrinterImin.printText('--------------------------------');
    await PrinterImin.printColumnsText([
      { text: '商品', width: 3, fontSize: 18, align: IminPrintAlign.left },
      { text: '数量', width: 1, fontSize: 18, align: IminPrintAlign.center },
      { text: '单价', width: 2, fontSize: 18, align: IminPrintAlign.right },
      { text: '小计', width: 2, fontSize: 18, align: IminPrintAlign.right }
    ]);
    
    await PrinterImin.printText('--------------------------------');
    
    // 6. 商品明细
    for (const item of order.items) {
      await PrinterImin.printColumnsText([
        { text: item.name, width: 3, fontSize: 16, align: IminPrintAlign.left },
        { text: item.quantity.toString(), width: 1, fontSize: 16, align: IminPrintAlign.center },
        { text: `¥${item.price.toFixed(2)}`, width: 2, fontSize: 16, align: IminPrintAlign.right },
        { text: `¥${item.total.toFixed(2)}`, width: 2, fontSize: 16, align: IminPrintAlign.right }
      ]);
    }
    
    // 7. 合计信息
    await PrinterImin.printText('--------------------------------');
    await PrinterImin.printColumnsText([
      { text: '小计:', width: 6, fontSize: 18, align: IminPrintAlign.right },
      { text: `¥${order.subtotal.toFixed(2)}`, width: 2, fontSize: 18, align: IminPrintAlign.right }
    ]);
    
    await PrinterImin.printColumnsText([
      { text: '税费:', width: 6, fontSize: 18, align: IminPrintAlign.right },
      { text: `¥${order.tax.toFixed(2)}`, width: 2, fontSize: 18, align: IminPrintAlign.right }
    ]);
    
    await PrinterImin.printColumnsText([
      { text: '总计:', width: 6, fontSize: 20, align: IminPrintAlign.right },
      { text: `¥${order.total.toFixed(2)}`, width: 2, fontSize: 20, align: IminPrintAlign.right }
    ]);
    
    // 8. 支付信息
    await PrinterImin.printText('================================');
    await PrinterImin.printText(`支付方式: ${order.paymentMethod}`, {
      fontSize: 18
    });
    
    await PrinterImin.printText(`实收金额: ¥${order.total.toFixed(2)}`, {
      fontSize: 20,
      fontStyle: IminFontStyle.bold
    });
    
    // 9. 二维码 (用于查询订单或评价)
    await PrinterImin.printText('--------------------------------');
    await PrinterImin.printText('扫码查询订单详情', {
      align: IminPrintAlign.center
    });
    
    await PrinterImin.printQrCode(`https://shop.example.com/order/${order.id}`, {
      qrSize: 5,
      align: IminPrintAlign.center
    });
    
    // 10. 结尾
    await PrinterImin.printText('谢谢惠顾，欢迎再次光临！', {
      align: IminPrintAlign.center,
      fontSize: 18
    });
    
    // 11. 走纸和切纸
    await PrinterImin.printAndFeedPaper(50);
    
    try {
      await PrinterImin.partialCut();
    } catch (e) {
      console.log('设备不支持切纸');
    }
    
  } catch (error) {
    throw new Error(`小票打印失败: ${error}`);
  }
};

// 使用示例
const ReceiptExample = () => {
  const sampleOrder: Order = {
    id: 'ORD20240112001',
    items: [
      { name: '可口可乐 330ml', quantity: 2, price: 3.5, total: 7.0 },
      { name: '薯片 原味', quantity: 1, price: 5.0, total: 5.0 },
      { name: '矿泉水 500ml', quantity: 3, price: 2.0, total: 6.0 }
    ],
    subtotal: 18.0,
    tax: 1.8,
    total: 19.8,
    paymentMethod: '微信支付',
    timestamp: new Date()
  };

  return (
    <Button 
      title="打印收银小票" 
      onPress={() => printReceipt(sampleOrder)} 
    />
  );
};
```

### 2. 外卖订单小票

```typescript
interface DeliveryOrder {
  orderNo: string;
  customerName: string;
  customerPhone: string;
  address: string;
  items: OrderItem[];
  deliveryFee: number;
  total: number;
  note?: string;
  estimatedTime: string;
}

const printDeliveryOrder = async (order: DeliveryOrder) => {
  try {
    // 标题
    await PrinterImin.printText('外卖订单', {
      fontSize: 32,
      align: IminPrintAlign.center,
      fontStyle: IminFontStyle.bold
    });
    
    // 订单信息
    await PrinterImin.printText('================================');
    await PrinterImin.printText(`订单号: ${order.orderNo}`);
    await PrinterImin.printText(`下单时间: ${new Date().toLocaleString()}`);
    await PrinterImin.printText(`预计送达: ${order.estimatedTime}`);
    
    // 客户信息
    await PrinterImin.printText('--------------------------------');
    await PrinterImin.printText('客户信息:', {
      fontStyle: IminFontStyle.bold
    });
    await PrinterImin.printText(`姓名: ${order.customerName}`);
    await PrinterImin.printText(`电话: ${order.customerPhone}`);
    await PrinterImin.printText(`地址: ${order.address}`);
    
    // 商品明细
    await PrinterImin.printText('--------------------------------');
    await PrinterImin.printText('商品明细:', {
      fontStyle: IminFontStyle.bold
    });
    
    for (const item of order.items) {
      await PrinterImin.printColumnsText([
        { text: item.name, width: 4, fontSize: 16, align: IminPrintAlign.left },
        { text: `x${item.quantity}`, width: 2, fontSize: 16, align: IminPrintAlign.center },
        { text: `¥${item.total.toFixed(2)}`, width: 2, fontSize: 16, align: IminPrintAlign.right }
      ]);
    }
    
    // 费用明细
    await PrinterImin.printText('--------------------------------');
    const subtotal = order.items.reduce((sum, item) => sum + item.total, 0);
    
    await PrinterImin.printColumnsText([
      { text: '餐费小计:', width: 6, fontSize: 16, align: IminPrintAlign.right },
      { text: `¥${subtotal.toFixed(2)}`, width: 2, fontSize: 16, align: IminPrintAlign.right }
    ]);
    
    await PrinterImin.printColumnsText([
      { text: '配送费:', width: 6, fontSize: 16, align: IminPrintAlign.right },
      { text: `¥${order.deliveryFee.toFixed(2)}`, width: 2, fontSize: 16, align: IminPrintAlign.right }
    ]);
    
    await PrinterImin.printColumnsText([
      { text: '订单总额:', width: 6, fontSize: 18, align: IminPrintAlign.right },
      { text: `¥${order.total.toFixed(2)}`, width: 2, fontSize: 18, align: IminPrintAlign.right }
    ]);
    
    // 备注
    if (order.note) {
      await PrinterImin.printText('--------------------------------');
      await PrinterImin.printText('备注:', {
        fontStyle: IminFontStyle.bold
      });
      await PrinterImin.printText(order.note);
    }
    
    // 二维码
    await PrinterImin.printText('================================');
    await PrinterImin.printText('扫码跟踪订单', {
      align: IminPrintAlign.center
    });
    
    await PrinterImin.printQrCode(`https://delivery.example.com/track/${order.orderNo}`, {
      qrSize: 4,
      align: IminPrintAlign.center
    });
    
    await PrinterImin.printAndFeedPaper(30);
    
  } catch (error) {
    throw new Error(`外卖单打印失败: ${error}`);
  }
};
```

### 3. 会员卡打印

```typescript
interface MemberCard {
  memberNo: string;
  memberName: string;
  phone: string;
  level: string;
  points: number;
  balance: number;
  expireDate: string;
}

const printMemberCard = async (member: MemberCard) => {
  try {
    // 卡片标题
    await PrinterImin.printText('会员卡', {
      fontSize: 32,
      align: IminPrintAlign.center,
      fontStyle: IminFontStyle.bold
    });
    
    await PrinterImin.printText('iMin便利店', {
      fontSize: 24,
      align: IminPrintAlign.center
    });
    
    // 会员信息
    await PrinterImin.printText('================================');
    
    await PrinterImin.printColumnsText([
      { text: '会员号:', width: 3, fontSize: 18, align: IminPrintAlign.left },
      { text: member.memberNo, width: 5, fontSize: 18, align: IminPrintAlign.left }
    ]);
    
    await PrinterImin.printColumnsText([
      { text: '姓名:', width: 3, fontSize: 18, align: IminPrintAlign.left },
      { text: member.memberName, width: 5, fontSize: 18, align: IminPrintAlign.left }
    ]);
    
    await PrinterImin.printColumnsText([
      { text: '手机:', width: 3, fontSize: 18, align: IminPrintAlign.left },
      { text: member.phone, width: 5, fontSize: 18, align: IminPrintAlign.left }
    ]);
    
    await PrinterImin.printColumnsText([
      { text: '等级:', width: 3, fontSize: 18, align: IminPrintAlign.left },
      { text: member.level, width: 5, fontSize: 18, align: IminPrintAlign.left }
    ]);
    
    // 账户信息
    await PrinterImin.printText('--------------------------------');
    
    await PrinterImin.printColumnsText([
      { text: '积分:', width: 4, fontSize: 20, align: IminPrintAlign.left },
      { text: member.points.toString(), width: 4, fontSize: 20, align: IminPrintAlign.right }
    ]);
    
    await PrinterImin.printColumnsText([
      { text: '余额:', width: 4, fontSize: 20, align: IminPrintAlign.left },
      { text: `¥${member.balance.toFixed(2)}`, width: 4, fontSize: 20, align: IminPrintAlign.right }
    ]);
    
    await PrinterImin.printText(`有效期至: ${member.expireDate}`, {
      align: IminPrintAlign.center
    });
    
    // 会员码
    await PrinterImin.printText('--------------------------------');
    await PrinterImin.printText('会员码', {
      align: IminPrintAlign.center,
      fontSize: 18
    });
    
    // 条形码
    await PrinterImin.printBarCode(
      IminBarcodeType.code128,
      member.memberNo,
      {
        height: 60,
        align: IminPrintAlign.center
      }
    );
    
    // 二维码
    await PrinterImin.printQrCode(member.memberNo, {
      qrSize: 4,
      align: IminPrintAlign.center
    });
    
    await PrinterImin.printText('请妥善保管此卡', {
      align: IminPrintAlign.center,
      fontSize: 16
    });
    
    await PrinterImin.printAndFeedPaper(40);
    
  } catch (error) {
    throw new Error(`会员卡打印失败: ${error}`);
  }
};
```

## 高级功能示例

### 1. SDK 2.0 标签打印

```typescript
import { 
  LabelCanvasStyle, 
  LabelTextStyle, 
  LabelBarCodeStyle,
  LabelQrCodeStyle,
  Symbology,
  AlignLabel,
  Rotate 
} from 'react-native-printer-imin';

const printProductLabel = async (product: {
  name: string;
  barcode: string;
  price: number;
  qrCode: string;
}) => {
  try {
    // 初始化标签画布 (50mm x 30mm)
    await PrinterImin.labelInitCanvas({
      width: 200,  // 像素宽度
      height: 120, // 像素高度
      posX: 0,
      posY: 0
    });
    
    // 添加商品名称
    await PrinterImin.labelAddText({
      text: product.name,
      posX: 10,
      posY: 10,
      textSize: 16,
      width: 180,
      height: 20,
      align: AlignLabel.CENTER,
      enableBold: true
    });
    
    // 添加价格
    await PrinterImin.labelAddText({
      text: `¥${product.price.toFixed(2)}`,
      posX: 10,
      posY: 35,
      textSize: 20,
      width: 80,
      height: 25,
      align: AlignLabel.LEFT,
      enableBold: true
    });
    
    // 添加条形码
    await PrinterImin.labelAddBarCode({
      barCode: product.barcode,
      posX: 10,
      posY: 65,
      dotWidth: 1,
      barHeight: 30,
      symbology: Symbology.CODE128,
      width: 120,
      height: 30
    });
    
    // 添加二维码
    await PrinterImin.labelAddQrCode({
      qrCode: product.qrCode,
      posX: 140,
      posY: 35,
      size: 3,
      width: 50,
      height: 50
    });
    
    // 打印标签
    const result = await PrinterImin.labelPrintCanvas(1);
    console.log('标签打印结果:', result);
    
  } catch (error) {
    throw new Error(`标签打印失败: ${error}`);
  }
};

// 使用示例
const LabelExample = () => {
  const sampleProduct = {
    name: '可口可乐 330ml',
    barcode: '1234567890123',
    price: 3.50,
    qrCode: 'https://product.example.com/1234567890123'
  };

  return (
    <Button 
      title="打印商品标签" 
      onPress={() => printProductLabel(sampleProduct)} 
    />
  );
};
```

### 2. 缓冲区批量打印

```typescript
const batchPrintWithBuffer = async (orders: Order[]) => {
  try {
    // 进入缓冲区模式
    await PrinterImin.enterPrinterBuffer(true);
    
    // 批量添加打印内容
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      
      // 添加订单标题
      await PrinterImin.printText(`订单 ${i + 1}/${orders.length}`, {
        fontSize: 24,
        align: IminPrintAlign.center,
        fontStyle: IminFontStyle.bold
      });
      
      // 添加订单详情
      await PrinterImin.printText(`订单号: ${order.id}`);
      await PrinterImin.printText(`金额: ¥${order.total.toFixed(2)}`);
      
      // 添加分割线
      await PrinterImin.printText('--------------------------------');
      
      // 如果不是最后一个订单，添加分页
      if (i < orders.length - 1) {
        await PrinterImin.printAndFeedPaper(50);
      }
    }
    
    // 提交缓冲区，一次性打印所有内容
    await PrinterImin.commitPrinterBuffer();
    
    // 退出缓冲区
    await PrinterImin.exitPrinterBuffer(false);
    
    console.log(`成功批量打印 ${orders.length} 个订单`);
    
  } catch (error) {
    // 如果出错，退出缓冲区但不提交
    try {
      await PrinterImin.exitPrinterBuffer(false);
    } catch (e) {
      console.error('退出缓冲区失败:', e);
    }
    
    throw new Error(`批量打印失败: ${error}`);
  }
};
```

### 3. 设备信息获取和诊断

```typescript
const DeviceDiagnostics = () => {
  const [deviceInfo, setDeviceInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const getDeviceInfo = async () => {
    if (PrinterImin.version !== '2.0.0') {
      Alert.alert('提示', '设备信息功能需要SDK 2.0');
      return;
    }

    setIsLoading(true);
    
    try {
      const info = {
        serialNumber: await PrinterImin.getPrinterSerialNumber(),
        modelName: await PrinterImin.getPrinterModelName(),
        firmwareVersion: await PrinterImin.getPrinterFirmwareVersion(),
        hardwareVersion: await PrinterImin.getPrinterHardwareVersion(),
        serviceVersion: await PrinterImin.getServiceVersion(),
        density: await PrinterImin.getPrinterDensity(),
        speed: await PrinterImin.getPrinterSpeed(),
        paperType: await PrinterImin.getPrinterPaperType(),
        cutTimes: await PrinterImin.getPrinterCutTimes(),
        drawerStatus: await PrinterImin.getDrawerStatus(),
        openDrawerTimes: await PrinterImin.getOpenDrawerTimes()
      };
      
      setDeviceInfo(info);
      
    } catch (error) {
      Alert.alert('错误', `获取设备信息失败: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const printDeviceInfo = async () => {
    try {
      await PrinterImin.printText('设备信息报告', {
        fontSize: 24,
        align: IminPrintAlign.center,
        fontStyle: IminFontStyle.bold
      });
      
      await PrinterImin.printText('================================');
      
      Object.entries(deviceInfo).forEach(async ([key, value]) => {
        await PrinterImin.printText(`${key}: ${value}`);
      });
      
      await PrinterImin.printText('================================');
      await PrinterImin.printText(`生成时间: ${new Date().toLocaleString()}`);
      
      await PrinterImin.printAndFeedPaper(30);
      
    } catch (error) {
      Alert.alert('错误', `打印设备信息失败: ${error}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button 
        title={isLoading ? "获取中..." : "获取设备信息"} 
        onPress={getDeviceInfo}
        disabled={isLoading}
      />
      
      {Object.keys(deviceInfo).length > 0 && (
        <>
          <Text style={{ marginTop: 20, fontWeight: 'bold' }}>设备信息:</Text>
          {Object.entries(deviceInfo).map(([key, value]) => (
            <Text key={key}>{key}: {String(value)}</Text>
          ))}
          
          <Button 
            title="打印设备信息" 
            onPress={printDeviceInfo}
            style={{ marginTop: 10 }}
          />
        </>
      )}
    </View>
  );
};
```

## 错误处理示例

### 1. 全面的错误处理

```typescript
enum PrinterErrorType {
  INITIALIZATION_FAILED = 'INITIALIZATION_FAILED',
  PAPER_OUT = 'PAPER_OUT',
  OVERHEATED = 'OVERHEATED',
  DEVICE_BUSY = 'DEVICE_BUSY',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

class PrinterError extends Error {
  type: PrinterErrorType;
  originalError: any;

  constructor(type: PrinterErrorType, message: string, originalError?: any) {
    super(message);
    this.type = type;
    this.originalError = originalError;
  }
}

const classifyError = (error: any): PrinterError => {
  const errorStr = error.toString().toLowerCase();
  
  if (errorStr.includes('paper') || errorStr.includes('纸')) {
    return new PrinterError(
      PrinterErrorType.PAPER_OUT,
      '打印纸不足，请更换打印纸',
      error
    );
  }
  
  if (errorStr.includes('temperature') || errorStr.includes('热')) {
    return new PrinterError(
      PrinterErrorType.OVERHEATED,
      '打印头过热，请稍后再试',
      error
    );
  }
  
  if (errorStr.includes('busy') || errorStr.includes('忙')) {
    return new PrinterError(
      PrinterErrorType.DEVICE_BUSY,
      '设备忙碌，请稍后再试',
      error
    );
  }
  
  if (errorStr.includes('network') || errorStr.includes('网络')) {
    return new PrinterError(
      PrinterErrorType.NETWORK_ERROR,
      '网络连接失败，请检查网络',
      error
    );
  }
  
  return new PrinterError(
    PrinterErrorType.UNKNOWN_ERROR,
    `未知错误: ${error}`,
    error
  );
};

const safePrint = async (printFunction: () => Promise<void>): Promise<boolean> => {
  try {
    // 检查打印机状态
    const status = await PrinterImin.getPrinterStatus();
    if (status.code !== 0) {
      throw new PrinterError(
        PrinterErrorType.INITIALIZATION_FAILED,
        `打印机状态异常: ${status.message}`
      );
    }
    
    // 执行打印
    await printFunction();
    return true;
    
  } catch (error) {
    const printerError = classifyError(error);
    
    // 根据错误类型进行不同处理
    switch (printerError.type) {
      case PrinterErrorType.PAPER_OUT:
        Alert.alert('缺纸提醒', printerError.message, [
          { text: '确定', style: 'default' }
        ]);
        break;
        
      case PrinterErrorType.OVERHEATED:
        Alert.alert('设备过热', printerError.message, [
          { text: '确定', style: 'default' }
        ]);
        break;
        
      case PrinterErrorType.DEVICE_BUSY:
        // 可以尝试重试
        Alert.alert('设备忙碌', printerError.message, [
          { text: '取消', style: 'cancel' },
          { text: '重试', onPress: () => safePrint(printFunction) }
        ]);
        break;
        
      default:
        Alert.alert('打印失败', printerError.message);
        break;
    }
    
    // 记录错误日志
    console.error('打印错误:', {
      type: printerError.type,
      message: printerError.message,
      originalError: printerError.originalError
    });
    
    return false;
  }
};

// 使用示例
const ErrorHandlingExample = () => {
  const handlePrint = () => {
    safePrint(async () => {
      await PrinterImin.printText('测试打印');
      await PrinterImin.printAndLineFeed();
    });
  };

  return <Button title="安全打印" onPress={handlePrint} />;
};
```

## 性能优化示例

### 1. 打印队列管理

```typescript
class PrinterQueue {
  private queue: Array<{
    id: string;
    task: () => Promise<void>;
    resolve: (value: boolean) => void;
    reject: (error: any) => void;
  }> = [];
  
  private isProcessing = false;
  private maxRetries = 3;

  async add(task: () => Promise<void>): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const id = Date.now().toString();
      
      this.queue.push({
        id,
        task,
        resolve,
        reject
      });
      
      console.log(`任务 ${id} 已加入队列，当前队列长度: ${this.queue.length}`);
      
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;
    console.log('开始处理打印队列');

    while (this.queue.length > 0) {
      const item = this.queue.shift();
      if (!item) continue;

      let retries = 0;
      let success = false;

      while (retries < this.maxRetries && !success) {
        try {
          console.log(`执行任务 ${item.id}，重试次数: ${retries}`);
          
          await item.task();
          success = true;
          item.resolve(true);
          
          console.log(`任务 ${item.id} 执行成功`);
          
        } catch (error) {
          retries++;
          console.error(`任务 ${item.id} 执行失败 (${retries}/${this.maxRetries}):`, error);
          
          if (retries >= this.maxRetries) {
            item.reject(error);
          } else {
            // 等待一段时间后重试
            await new Promise(resolve => setTimeout(resolve, 1000 * retries));
          }
        }
      }
    }

    this.isProcessing = false;
    console.log('打印队列处理完成');
  }

  getQueueLength(): number {
    return this.queue.length;
  }

  clear() {
    this.queue.forEach(item => {
      item.reject(new Error('队列已清空'));
    });
    this.queue = [];
  }
}

// 全局打印队列实例
const printerQueue = new PrinterQueue();

// 使用示例
const QueueExample = () => {
  const [queueLength, setQueueLength] = useState(0);

  const addPrintTask = (content: string) => {
    printerQueue.add(async () => {
      await PrinterImin.printText(content);
      await PrinterImin.printAndLineFeed();
    }).then(() => {
      console.log('打印任务完成');
    }).catch((error) => {
      console.error('打印任务失败:', error);
    });
    
    setQueueLength(printerQueue.getQueueLength());
  };

  return (
    <View>
      <Text>队列长度: {queueLength}</Text>
      
      <Button 
        title="添加打印任务1" 
        onPress={() => addPrintTask('打印任务 1')} 
      />
      
      <Button 
        title="添加打印任务2" 
        onPress={() => addPrintTask('打印任务 2')} 
      />
      
      <Button 
        title="清空队列" 
        onPress={() => {
          printerQueue.clear();
          setQueueLength(0);
        }} 
      />
    </View>
  );
};
```

### 2. 图片缓存和优化

```typescript
import { Image } from 'react-native';

class ImageCache {
  private cache = new Map<string, string>();
  private maxCacheSize = 50;

  async getOptimizedImage(url: string, maxWidth: number = 200): Promise<string> {
    const cacheKey = `${url}_${maxWidth}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      // 获取图片尺寸
      const { width, height } = await this.getImageSize(url);
      
      // 计算缩放比例
      const scale = Math.min(maxWidth / width, 1);
      const newWidth = Math.floor(width * scale);
      const newHeight = Math.floor(height * scale);
      
      // 这里可以实现图片压缩逻辑
      // 简化示例，直接返回原URL
      const optimizedUrl = url;
      
      // 添加到缓存
      this.addToCache(cacheKey, optimizedUrl);
      
      return optimizedUrl;
      
    } catch (error) {
      console.error('图片优化失败:', error);
      return url;
    }
  }

  private getImageSize(url: string): Promise<{width: number, height: number}> {
    return new Promise((resolve, reject) => {
      Image.getSize(
        url,
        (width, height) => resolve({ width, height }),
        reject
      );
    });
  }

  private addToCache(key: string, value: string) {
    if (this.cache.size >= this.maxCacheSize) {
      // 删除最旧的缓存项
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, value);
  }

  clear() {
    this.cache.clear();
  }
}

const imageCache = new ImageCache();

// 优化的图片打印函数
const printOptimizedImage = async (imageUrl: string) => {
  try {
    const optimizedUrl = await imageCache.getOptimizedImage(imageUrl, 200);
    
    await PrinterImin.printSingleBitmap(optimizedUrl, {
      width: 200,
      align: IminPrintAlign.center
    });
    
  } catch (error) {
    console.error('优化图片打印失败:', error);
  }
};
```

这些示例涵盖了从基础使用到高级功能的各种场景，可以帮助开发者快速理解和应用API。建议根据实际需求选择合适的示例进行参考和修改。