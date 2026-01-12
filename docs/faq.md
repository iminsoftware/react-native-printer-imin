# 常见问题 (FAQ)

## 安装和配置问题

### Q: 安装后提示 "The package doesn't seem to be linked"

**A**: 这通常是链接问题，请尝试以下解决方案：

1. **React Native >= 0.60 (自动链接)**:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npx react-native run-android
   ```

2. **React Native < 0.60 (手动链接)**:
   ```bash
   npx react-native link react-native-printer-imin
   ```

3. **检查是否使用Expo Go**: 此包不支持Expo Go，需要使用开发构建或ejected项目。

### Q: Android构建失败，提示找不到依赖

**A**: 检查 `android/build.gradle` 文件中的仓库配置：

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

### Q: 运行时提示权限错误

**A**: 在 `android/app/src/main/AndroidManifest.xml` 中添加必要权限：

```xml
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

对于Android 6.0+，还需要运行时权限请求。

## 设备兼容性问题

### Q: 在非iMin设备上运行报错

**A**: 此SDK专为iMin设备设计，在其他设备上无法正常工作。请确保：
- 使用iMin品牌设备
- 设备内置热敏打印机
- Android系统版本 >= 5.0

### Q: 如何检查设备是否支持

**A**: 可以通过以下方式检查：

```typescript
const checkDevice = async () => {
  try {
    await PrinterImin.initPrinter();
    const status = await PrinterImin.getPrinterStatus();
    console.log('设备支持，状态:', status);
    return true;
  } catch (error) {
    console.log('设备不支持或打印机不可用:', error);
    return false;
  }
};
```

### Q: 支持哪些iMin设备型号

**A**: 支持的设备包括：

**手持金融系列**:
- M2-202, M2-203, M2 Pro
- Swift 1, Swift 2, Swift 2 Pro, Swift 2 Ultra

**平板终端系列**:
- M2 Max, D1, D1 Pro
- Falcon 1, Swan 2, Falcon 2

**桌面收银设备**:
- D4, Swan 2, Falcon 2

## 打印功能问题

### Q: 打印内容不完整或被截断

**A**: 可能的原因和解决方案：

1. **纸张宽度问题**:
   ```typescript
   // 设置正确的纸张格式
   await PrinterImin.setPageFormat(1); // 58mm
   // 或
   await PrinterImin.setPageFormat(0); // 80mm
   ```

2. **文本宽度设置**:
   ```typescript
   // 设置合适的文本宽度
   await PrinterImin.setTextWidth(200);
   ```

3. **字体大小过大**:
   ```typescript
   // 使用合适的字体大小
   await PrinterImin.setTextSize(24);
   ```

### Q: 图片打印失败或显示异常

**A**: 图片打印问题的解决方案：

1. **检查图片URL**:
   ```typescript
   // 确保URL可访问
   const testUrl = 'https://example.com/image.jpg';
   ```

2. **调整图片尺寸**:
   ```typescript
   await PrinterImin.printSingleBitmap(imageUrl, {
     width: 200,  // 不要超过纸张宽度
     height: 100,
     align: IminPrintAlign.center
   });
   ```

3. **使用本地图片**:
   ```typescript
   // 优先使用本地资源
   const localImage = 'file:///android_asset/logo.png';
   ```

### Q: 二维码打印模糊或无法扫描

**A**: 二维码质量优化：

1. **调整二维码大小**:
   ```typescript
   await PrinterImin.printQrCode(data, {
     qrSize: 6, // 增大尺寸
     errorCorrectionLevel: IminQrcodeCorrectionLevel.levelH // 高纠错级别
   });
   ```

2. **检查内容长度**:
   - 内容过长会影响二维码质量
   - 建议使用短链接

3. **设置合适的纠错级别**:
   - `levelL`: 约7%的纠错能力
   - `levelM`: 约15%的纠错能力  
   - `levelQ`: 约25%的纠错能力
   - `levelH`: 约30%的纠错能力

### Q: 切纸功能不工作

**A**: 切纸功能限制：

```typescript
try {
  await PrinterImin.partialCut();
} catch (error) {
  console.log('设备不支持切纸功能');
  // 只有带切刀的设备才支持此功能
  // 如: Falcon 1, Falcon 2 (80mm版本)
}
```

## 性能和稳定性问题

### Q: 打印速度很慢

**A**: 性能优化建议：

1. **使用缓冲区**:
   ```typescript
   await PrinterImin.enterPrinterBuffer(true);
   
   // 批量添加打印内容
   await PrinterImin.printText('内容1');
   await PrinterImin.printText('内容2');
   
   // 一次性打印
   await PrinterImin.commitPrinterBuffer();
   await PrinterImin.exitPrinterBuffer(false);
   ```

2. **优化图片**:
   - 使用适当的图片尺寸
   - 压缩图片文件大小
   - 优先使用本地图片

3. **减少设置切换**:
   ```typescript
   // 避免频繁切换设置
   await PrinterImin.setTextSize(24);
   await PrinterImin.setAlignment(IminPrintAlign.center);
   
   // 批量打印相同格式的内容
   await PrinterImin.printText('内容1');
   await PrinterImin.printText('内容2');
   ```

### Q: 应用崩溃或内存泄漏

**A**: 稳定性优化：

1. **正确管理事件监听**:
   ```typescript
   useEffect(() => {
     const unsubscribe = PrinterImin.receiveBroadcastStream.listen(callback);
     
     return () => {
       unsubscribe(); // 重要：组件卸载时取消监听
     };
   }, []);
   ```

2. **错误处理**:
   ```typescript
   const safePrint = async () => {
     try {
       await PrinterImin.printText('测试');
     } catch (error) {
       console.error('打印失败:', error);
       // 不要让错误导致应用崩溃
     }
   };
   ```

3. **避免并发打印**:
   ```typescript
   class PrintQueue {
     private isProcessing = false;
     
     async addTask(task: () => Promise<void>) {
       if (this.isProcessing) {
         console.log('打印队列忙碌，请稍后');
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

## API使用问题

### Q: SDK 1.0 和 2.0 有什么区别

**A**: 版本差异：

| 功能 | SDK 1.0 | SDK 2.0 |
|------|---------|---------|
| 基础打印 | ✅ | ✅ |
| 文本/图片/二维码 | ✅ | ✅ |
| 标签打印 | ❌ | ✅ |
| 缓冲区管理 | ❌ | ✅ |
| 设备信息获取 | ❌ | ✅ |
| 高级参数控制 | ❌ | ✅ |

检查版本：
```typescript
console.log('当前SDK版本:', PrinterImin.version);
```

### Q: 如何监听打印机状态变化

**A**: 使用广播监听：

```typescript
const [printerStatus, setPrinterStatus] = useState(null);

useEffect(() => {
  const unsubscribe = PrinterImin.receiveBroadcastStream.listen((payload) => {
    if (payload.eventName === 'printer_status') {
      setPrinterStatus(payload.eventData);
      console.log('打印机状态变化:', payload.eventData);
    }
  });

  return unsubscribe;
}, []);
```

### Q: 表格打印如何控制列宽

**A**: 列宽控制说明：

```typescript
await PrinterImin.printColumnsText([
  {
    text: '商品名称',
    width: 4, // 相对宽度，总宽度为所有列宽度之和
    fontSize: 20,
    align: IminPrintAlign.left
  },
  {
    text: '数量',
    width: 1, // 较窄的列
    fontSize: 20,
    align: IminPrintAlign.center
  },
  {
    text: '价格',
    width: 3, // 中等宽度
    fontSize: 20,
    align: IminPrintAlign.right
  }
]);
// 实际列宽比例为 4:1:3
```

## 调试和故障排除

### Q: 如何开启调试日志

**A**: 调试模式设置：

```typescript
// 开启调试日志
await PrinterImin.openLogs(1);

// 关闭调试日志
await PrinterImin.openLogs(0);
```

在开发环境中建议开启：
```typescript
if (__DEV__) {
  PrinterImin.openLogs(1);
}
```

### Q: 如何发送原始打印指令

**A**: 使用原始数据发送：

```typescript
// 发送十六进制字符串
await PrinterImin.sendRAWDataHexStr('1B40'); // ESC @

// 发送字节数组 (SDK 2.0)
await PrinterImin.sendRAWData([0x1B, 0x40]);
```

### Q: 打印机无响应如何排查

**A**: 故障排查步骤：

1. **检查设备**:
   ```typescript
   const checkDevice = async () => {
     try {
       const status = await PrinterImin.getPrinterStatus();
       console.log('打印机状态:', status);
       return status.code === 0;
     } catch (error) {
       console.error('设备检查失败:', error);
       return false;
     }
   };
   ```

2. **重新初始化**:
   ```typescript
   try {
     await PrinterImin.resetDevice();
     await PrinterImin.initPrinter();
   } catch (error) {
     console.error('重置失败:', error);
   }
   ```

3. **检查纸张和硬件**:
   - 确认有足够的打印纸
   - 检查打印头是否过热
   - 确认设备电量充足

## 最佳实践问题

### Q: 生产环境部署注意事项

**A**: 生产环境建议：

1. **错误处理**:
   ```typescript
   const productionPrint = async (content: string) => {
     try {
       const status = await PrinterImin.getPrinterStatus();
       if (status.code !== 0) {
         throw new Error(`打印机错误: ${status.message}`);
       }
       
       await PrinterImin.printText(content);
       
     } catch (error) {
       // 记录错误日志
       console.error('打印失败:', error);
       
       // 用户友好的错误提示
       Alert.alert('打印失败', '请检查打印机状态后重试');
       
       // 可选：发送错误报告到服务器
       // reportError(error);
     }
   };
   ```

2. **性能监控**:
   ```typescript
   const monitoredPrint = async (content: string) => {
     const startTime = Date.now();
     
     try {
       await PrinterImin.printText(content);
       const duration = Date.now() - startTime;
       console.log(`打印耗时: ${duration}ms`);
     } catch (error) {
       console.error('打印失败:', error);
     }
   };
   ```

3. **关闭调试日志**:
   ```typescript
   // 生产环境关闭调试
   if (!__DEV__) {
     PrinterImin.openLogs(0);
   }
   ```

### Q: 如何实现打印队列管理

**A**: 队列管理实现：

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
          console.error('队列任务失败:', error);
        }
      }
    }

    this.isProcessing = false;
  }
}

// 使用示例
const printerQueue = new PrinterQueue();

const printReceipt = async () => {
  await printerQueue.add(async () => {
    await PrinterImin.printText('收据内容');
  });
};
```

## 技术支持

如果以上FAQ没有解决您的问题，请：

1. 查看 [GitHub Issues](https://github.com/iminsoftware/react-native-printer-imin/issues)
2. 搜索已有问题或创建新的Issue
3. 提供详细的错误信息和环境配置
4. 联系技术支持: softwareteam@imin.sg

提交Issue时请包含：
- 设备型号和Android版本
- React Native版本
- SDK版本
- 完整的错误日志
- 复现步骤