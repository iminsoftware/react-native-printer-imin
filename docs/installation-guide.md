# 安装指南

## 系统要求

### React Native版本支持
- React Native >= 0.60.0
- Node.js >= 16.0.0

### 平台支持
- ✅ Android (主要支持)
- ❌ iOS (暂不支持)

### 设备要求
- 必须是iMin品牌设备
- 设备需内置热敏打印机
- Android系统版本 >= 5.0

## 安装步骤

### 1. 安装npm包

```bash
npm install react-native-printer-imin
```

或使用yarn：

```bash
yarn add react-native-printer-imin
```

### 2. Android配置

#### 2.1 自动链接 (React Native >= 0.60)

对于React Native 0.60及以上版本，包会自动链接。只需要重新构建项目：

```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

#### 2.2 手动链接 (React Native < 0.60)

如果使用较旧版本的React Native，需要手动链接：

```bash
npx react-native link react-native-printer-imin
```

#### 2.3 权限配置

在 `android/app/src/main/AndroidManifest.xml` 中添加必要权限：

```xml
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

#### 2.4 ProGuard配置 (如果启用了代码混淆)

在 `android/app/proguard-rules.pro` 中添加：

```proguard
-keep class com.imin.** { *; }
-keep class com.printerimin.** { *; }
-dontwarn com.imin.**
```

### 3. 验证安装

创建一个简单的测试文件来验证安装：

```typescript
import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import PrinterImin from 'react-native-printer-imin';

const TestPrinter = () => {
  useEffect(() => {
    // 检查SDK版本
    console.log('SDK版本:', PrinterImin.version);
  }, []);

  const testPrinter = async () => {
    try {
      // 初始化打印机
      await PrinterImin.initPrinter();
      
      // 获取打印机状态
      const status = await PrinterImin.getPrinterStatus();
      Alert.alert('打印机状态', status.message);
      
      // 测试打印
      await PrinterImin.printText('安装测试成功！');
      await PrinterImin.printAndLineFeed();
      
    } catch (error) {
      Alert.alert('错误', `测试失败: ${error}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="测试打印机" onPress={testPrinter} />
    </View>
  );
};

export default TestPrinter;
```

## 常见安装问题

### 1. 链接错误

**错误信息**: `The package 'react-native-printer-imin' doesn't seem to be linked`

**解决方案**:
1. 确保已运行 `pod install` (iOS项目)
2. 重新构建项目
3. 检查是否使用Expo Go (不支持原生模块)

```bash
# 清理并重新构建
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### 2. Android构建失败

**错误信息**: `Could not find com.imin:printerlibrary`

**解决方案**:
检查 `android/build.gradle` 中的仓库配置：

```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://www.jitpack.io' }
        // 确保包含所有必要的仓库
    }
}
```

### 3. 运行时错误

**错误信息**: `Native module cannot be null`

**解决方案**:
1. 确保设备是iMin品牌设备
2. 检查Android版本兼容性
3. 重新安装并重新构建项目

```bash
npm uninstall react-native-printer-imin
npm install react-native-printer-imin
npx react-native run-android
```

### 4. 权限问题

**错误信息**: `Permission denied`

**解决方案**:
1. 检查AndroidManifest.xml中的权限配置
2. 对于Android 6.0+，可能需要运行时权限请求

```typescript
import { PermissionsAndroid } from 'react-native';

const requestPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);
    
    if (granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('存储权限已获取');
    }
  } catch (err) {
    console.warn(err);
  }
};
```

## 开发环境配置

### 1. TypeScript支持

如果使用TypeScript，类型定义已包含在包中：

```typescript
import PrinterImin, { 
  IminPrintAlign, 
  IminTextStyle,
  IminPictureStyle 
} from 'react-native-printer-imin';
```

### 2. 调试配置

启用调试模式以获取更多日志信息：

```typescript
// 在开发环境中启用调试
if (__DEV__) {
  PrinterImin.openLogs(1);
}
```

### 3. Metro配置

如果遇到Metro打包问题，在 `metro.config.js` 中添加：

```javascript
module.exports = {
  resolver: {
    assetExts: ['bin', 'txt', 'jpg', 'png', 'json'],
  },
};
```

## 升级指南

### 从旧版本升级

1. **备份当前代码**
2. **更新包版本**:
   ```bash
   npm update react-native-printer-imin
   ```
3. **检查API变更**: 参考 [API文档](./api-reference.md)
4. **重新构建项目**:
   ```bash
   cd android && ./gradlew clean && cd ..
   npx react-native run-android
   ```

### 版本兼容性

| SDK版本 | React Native版本 | Android版本 |
|---------|------------------|-------------|
| 0.10.x  | >= 0.60.0       | >= 5.0      |
| 0.9.x   | >= 0.60.0       | >= 5.0      |
| 0.8.x   | >= 0.60.0       | >= 4.4      |

## 下一步

安装完成后，建议阅读以下文档：

1. [快速开始](./quick-start.md) - 基础使用示例
2. [API参考](./api-reference.md) - 完整API文档
3. [开发者指南](./developer-guide.md) - 深入开发指导
4. [示例代码](../example/) - 完整示例应用

## 技术支持

如果在安装过程中遇到问题：

1. 查看 [常见问题](./faq.md)
2. 搜索 [GitHub Issues](https://github.com/iminsoftware/react-native-printer-imin/issues)
3. 提交新的Issue并提供详细的错误信息和环境配置