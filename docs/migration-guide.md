# 迁移指南

本指南帮助开发者从旧版本升级到新版本，以及在不同SDK版本之间进行迁移。

## 目录

- [版本升级](#版本升级)
- [SDK 1.0 到 2.0 迁移](#sdk-10-到-20-迁移)
- [API变更说明](#api变更说明)
- [兼容性处理](#兼容性处理)
- [常见迁移问题](#常见迁移问题)

## 版本升级

### 从 0.9.x 升级到 0.10.x

#### 1. 更新依赖

```bash
npm update react-native-printer-imin
```

#### 2. 主要变更

**新增功能**:
- 支持A15设备
- 更新底层SDK
- 修复Android 16k页面适配问题

**破坏性变更**:
- 无破坏性变更，向后兼容

#### 3. 升级步骤

```bash
# 1. 更新包
npm update react-native-printer-imin

# 2. 清理构建缓存
cd android
./gradlew clean
cd ..

# 3. 重新构建
npx react-native run-android
```

### 从 0.8.x 升级到 0.9.x

#### 1. 重大变更

- 引入SDK 2.0支持
- 新增标签打印功能
- 增强设备信息获取能力

#### 2. 升级检查清单

- [ ] 检查当前使用的API是否有变更
- [ ] 测试现有打印功能
- [ ] 考虑使用新的2.0功能
- [ ] 更新错误处理逻辑

## SDK 1.0 到 2.0 迁移

### 版本检测

首先检查当前运行的SDK版本：

```typescript
import PrinterImin from 'react-native-printer-imin';

const checkSDKVersion = () => {
  console.log('当前SDK版本:', PrinterImin.version);
  
  if (PrinterImin.version === '2.0.0') {
    console.log('支持所有2.0功能');
  } else {
    console.log('仅支持1.0基础功能');
  }
};
```

### 兼容性代码

为了同时支持1.0和2.0，可以使用特性检测：

```typescript
class PrinterManager {
  private isSDK2(): boolean {
    return PrinterImin.version === '2.0.0';
  }

  async getDeviceInfo(): Promise<any> {
    if (!this.isSDK2()) {
      return {
        version: '1.0',
        message: 'SDK 1.0不支持设备信息获取'
      };
    }

    try {
      return {
        version: '2.0',
        serialNumber: await PrinterImin.getPrinterSerialNumber(),
        modelName: await PrinterImin.getPrinterModelName(),
        firmwareVersion: await PrinterImin.getPrinterFirmwareVersion()
      };
    } catch (error) {
      console.error('获取设备信息失败:', error);
      return null;
    }
  }

  async printWithBuffer(printTasks: (() => Promise<void>)[]): Promise<void> {
    if (!this.isSDK2()) {
      // SDK 1.0 - 直接执行打印任务
      for (const task of printTasks) {
        await task();
      }
      return;
    }

    // SDK 2.0 - 使用缓冲区
    try {
      await PrinterImin.enterPrinterBuffer(true);
      
      for (const task of printTasks) {
        await task();
      }
      
      await PrinterImin.commitPrinterBuffer();
      await PrinterImin.exitPrinterBuffer(false);
    } catch (error) {
      await PrinterImin.exitPrinterBuffer(false);
      throw error;
    }
  }

  async printLabel(labelData: any): Promise<void> {
    if (!this.isSDK2()) {
      throw new Error('标签打印需要SDK 2.0支持');
    }

    // 使用2.0标签打印功能
    await PrinterImin.labelInitCanvas(labelData.canvas);
    await PrinterImin.labelAddText(labelData.text);
    await PrinterImin.labelPrintCanvas(1);
  }
}
```

### 渐进式迁移策略

#### 阶段1: 基础兼容

```typescript
// 原有代码保持不变
const printBasicReceipt = async () => {
  await PrinterImin.initPrinter();
  await PrinterImin.printText('收据标题');
  await PrinterImin.printAndLineFeed();
};

// 新增2.0功能检测
const printEnhancedReceipt = async () => {
  await PrinterImin.initPrinter();
  
  // 基础打印（1.0和2.0都支持）
  await PrinterImin.printText('收据标题');
  
  // 2.0增强功能
  if (PrinterImin.version === '2.0.0') {
    try {
      const deviceInfo = await PrinterImin.getPrinterModelName();
      await PrinterImin.printText(`设备: ${deviceInfo}`);
    } catch (error) {
      console.log('获取设备信息失败，跳过');
    }
  }
  
  await PrinterImin.printAndLineFeed();
};
```

#### 阶段2: 功能增强

```typescript
// 利用2.0新功能优化性能
const printBatchReceipts = async (receipts: any[]) => {
  if (PrinterImin.version === '2.0.0') {
    // 使用缓冲区批量打印
    await PrinterImin.enterPrinterBuffer(true);
    
    for (const receipt of receipts) {
      await printSingleReceipt(receipt);
    }
    
    await PrinterImin.commitPrinterBuffer();
    await PrinterImin.exitPrinterBuffer(false);
  } else {
    // 1.0逐个打印
    for (const receipt of receipts) {
      await printSingleReceipt(receipt);
    }
  }
};
```

#### 阶段3: 完全迁移

```typescript
// 完全使用2.0功能的新代码
const modernPrintingService = {
  async initialize() {
    await PrinterImin.initPrinter();
    
    if (PrinterImin.version !== '2.0.0') {
      console.warn('建议升级到SDK 2.0以获得最佳体验');
    }
  },

  async printReceipt(data: any) {
    const tasks = [
      () => this.printHeader(data.header),
      () => this.printItems(data.items),
      () => this.printFooter(data.footer)
    ];

    if (PrinterImin.version === '2.0.0') {
      await this.printWithBuffer(tasks);
    } else {
      for (const task of tasks) {
        await task();
      }
    }
  },

  async printLabel(labelData: any) {
    if (PrinterImin.version !== '2.0.0') {
      throw new Error('标签打印功能需要SDK 2.0');
    }

    await PrinterImin.labelInitCanvas(labelData.canvas);
    // ... 标签打印逻辑
  }
};
```

## API变更说明

### 新增API (SDK 2.0)

#### 设备信息获取
```typescript
// 新增 - 仅2.0支持
await PrinterImin.getPrinterSerialNumber();
await PrinterImin.getPrinterModelName();
await PrinterImin.getPrinterFirmwareVersion();
await PrinterImin.getPrinterHardwareVersion();
```

#### 缓冲区管理
```typescript
// 新增 - 仅2.0支持
await PrinterImin.enterPrinterBuffer(true);
await PrinterImin.commitPrinterBuffer();
await PrinterImin.exitPrinterBuffer(false);
```

#### 标签打印
```typescript
// 新增 - 仅2.0支持
await PrinterImin.labelInitCanvas(canvasStyle);
await PrinterImin.labelAddText(textStyle);
await PrinterImin.labelAddBarCode(barcodeStyle);
await PrinterImin.labelPrintCanvas(count);
```

#### 高级文本打印
```typescript
// 新增 - 仅2.0支持
await PrinterImin.printTextBitmap(text, style);
await PrinterImin.setTextBitmapTypeface(typeface);
await PrinterImin.setTextBitmapSize(size);
```

### 保持兼容的API

以下API在1.0和2.0中保持完全兼容：

```typescript
// 基础功能 - 1.0和2.0都支持
await PrinterImin.initPrinter();
await PrinterImin.getPrinterStatus();
await PrinterImin.printText(text, style);
await PrinterImin.printAntiWhiteText(text, style);
await PrinterImin.printSingleBitmap(url, style);
await PrinterImin.printQrCode(data, style);
await PrinterImin.printBarCode(type, content, style);
await PrinterImin.printColumnsText(columns);
await PrinterImin.printAndLineFeed();
await PrinterImin.partialCut();
await PrinterImin.openCashBox();
```

### 类型定义变更

#### 新增类型 (SDK 2.0)

```typescript
// 标签相关类型
interface LabelCanvasStyle {
  width?: number;
  height?: number;
  posX?: number;
  posY?: number;
}

interface LabelTextStyle {
  text?: string;
  posX?: number;
  posY?: number;
  textSize?: number;
  // ... 更多属性
}

// 位图文本样式
interface IminTextPictureStyle {
  wordWrap?: boolean;
  fontSize?: number;
  typeface?: IminTypeface;
  fontStyle?: IminFontStyle;
  align?: IminPrintAlign;
  letterSpacing?: number;
  underline?: boolean;
  throughline?: boolean;
  lineHeight?: number;
  reverseWhite?: boolean;
}
```

## 兼容性处理

### 条件编译

```typescript
// 创建兼容性包装器
class PrinterCompat {
  static async printTextWithStyle(text: string, style: any) {
    if (PrinterImin.version === '2.0.0' && style.bitmap) {
      // 使用2.0的位图文本功能
      await PrinterImin.printTextBitmap(text, style);
    } else {
      // 使用1.0的普通文本功能
      await PrinterImin.printText(text, style);
    }
  }

  static async getDeviceInfoSafe(): Promise<any> {
    if (PrinterImin.version === '2.0.0') {
      try {
        return {
          serialNumber: await PrinterImin.getPrinterSerialNumber(),
          modelName: await PrinterImin.getPrinterModelName(),
          version: await PrinterImin.getFirmwareVersion()
        };
      } catch (error) {
        console.warn('获取设备信息失败:', error);
      }
    }
    
    return {
      message: 'SDK 1.0不支持设备信息获取'
    };
  }

  static async batchPrint(tasks: (() => Promise<void>)[]) {
    if (PrinterImin.version === '2.0.0') {
      // 使用缓冲区优化
      await PrinterImin.enterPrinterBuffer(true);
      try {
        for (const task of tasks) {
          await task();
        }
        await PrinterImin.commitPrinterBuffer();
      } finally {
        await PrinterImin.exitPrinterBuffer(false);
      }
    } else {
      // 直接执行
      for (const task of tasks) {
        await task();
      }
    }
  }
}
```

### 功能降级

```typescript
// 优雅降级示例
const printReceiptWithFallback = async (receiptData: any) => {
  try {
    if (PrinterImin.version === '2.0.0') {
      // 尝试使用2.0高级功能
      await printAdvancedReceipt(receiptData);
    } else {
      // 使用1.0基础功能
      await printBasicReceipt(receiptData);
    }
  } catch (error) {
    console.error('高级打印失败，尝试基础打印:', error);
    
    // 降级到最基础的打印方式
    try {
      await printMinimalReceipt(receiptData);
    } catch (fallbackError) {
      throw new Error(`所有打印方式都失败: ${fallbackError}`);
    }
  }
};

const printAdvancedReceipt = async (data: any) => {
  // 使用2.0缓冲区和高级功能
  await PrinterImin.enterPrinterBuffer(true);
  // ... 复杂打印逻辑
  await PrinterImin.commitPrinterBuffer();
};

const printBasicReceipt = async (data: any) => {
  // 使用1.0基础功能
  await PrinterImin.printText(data.title);
  await PrinterImin.printText(data.content);
};

const printMinimalReceipt = async (data: any) => {
  // 最简单的打印方式
  await PrinterImin.printText(`订单: ${data.id}`);
  await PrinterImin.printText(`金额: ${data.total}`);
};
```

## 常见迁移问题

### 1. 版本检测失败

**问题**: 无法正确检测SDK版本

**解决方案**:
```typescript
const getSafeSDKVersion = (): string => {
  try {
    return PrinterImin.version || '1.0.0';
  } catch (error) {
    console.warn('获取SDK版本失败，默认为1.0.0');
    return '1.0.0';
  }
};
```

### 2. 新API调用失败

**问题**: 在1.0设备上调用2.0 API导致崩溃

**解决方案**:
```typescript
const safeCall = async <T>(
  apiCall: () => Promise<T>,
  fallback?: () => Promise<T>
): Promise<T | null> => {
  try {
    return await apiCall();
  } catch (error) {
    console.warn('API调用失败:', error);
    
    if (fallback) {
      try {
        return await fallback();
      } catch (fallbackError) {
        console.error('降级方案也失败:', fallbackError);
      }
    }
    
    return null;
  }
};

// 使用示例
const deviceInfo = await safeCall(
  () => PrinterImin.getPrinterSerialNumber(),
  () => Promise.resolve('未知设备')
);
```

### 3. 类型兼容性问题

**问题**: TypeScript类型定义不匹配

**解决方案**:
```typescript
// 创建兼容性类型
type CompatibleTextStyle = IminTextStyle & Partial<IminTextPictureStyle>;

const printCompatibleText = async (text: string, style?: CompatibleTextStyle) => {
  if (PrinterImin.version === '2.0.0' && style?.letterSpacing) {
    // 使用2.0特有属性
    const textPictureStyle: IminTextPictureStyle = {
      ...style,
      letterSpacing: style.letterSpacing
    };
    await PrinterImin.printTextBitmap(text, textPictureStyle);
  } else {
    // 使用1.0兼容属性
    const textStyle: IminTextStyle = {
      fontSize: style?.fontSize,
      align: style?.align,
      fontStyle: style?.fontStyle
    };
    await PrinterImin.printText(text, textStyle);
  }
};
```

### 4. 性能回退

**问题**: 从2.0降级到1.0后性能下降

**解决方案**:
```typescript
// 实现客户端缓冲区模拟
class ClientBuffer {
  private tasks: (() => Promise<void>)[] = [];
  
  add(task: () => Promise<void>) {
    this.tasks.push(task);
  }
  
  async commit() {
    for (const task of this.tasks) {
      await task();
    }
    this.tasks = [];
  }
  
  clear() {
    this.tasks = [];
  }
}

const clientBuffer = new ClientBuffer();

// 兼容的缓冲区接口
const compatEnterBuffer = async () => {
  if (PrinterImin.version === '2.0.0') {
    await PrinterImin.enterPrinterBuffer(true);
  } else {
    clientBuffer.clear();
  }
};

const compatCommitBuffer = async () => {
  if (PrinterImin.version === '2.0.0') {
    await PrinterImin.commitPrinterBuffer();
    await PrinterImin.exitPrinterBuffer(false);
  } else {
    await clientBuffer.commit();
  }
};
```

## 迁移检查清单

### 升级前检查

- [ ] 备份当前代码
- [ ] 记录当前使用的API列表
- [ ] 测试现有功能是否正常
- [ ] 检查依赖的React Native版本

### 升级过程

- [ ] 更新npm包
- [ ] 清理构建缓存
- [ ] 重新构建项目
- [ ] 运行基础功能测试

### 升级后验证

- [ ] 所有原有功能正常工作
- [ ] 新功能可以正常使用
- [ ] 性能没有明显下降
- [ ] 错误处理仍然有效

### 可选优化

- [ ] 使用2.0新功能优化性能
- [ ] 实现标签打印功能
- [ ] 添加设备信息获取
- [ ] 优化错误处理逻辑

## 技术支持

如果在迁移过程中遇到问题：

1. 查看 [常见问题](./faq.md)
2. 参考 [API文档](./api-reference.md)
3. 查看 [GitHub Issues](https://github.com/iminsoftware/react-native-printer-imin/issues)
4. 联系技术支持: huayan.xie@imin.com

提交问题时请包含：
- 迁移前后的版本号
- 具体的错误信息
- 相关的代码片段
- 设备型号和系统版本