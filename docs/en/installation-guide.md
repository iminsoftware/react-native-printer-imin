# Installation Guide

## System Requirements

### React Native Version Support
- React Native >= 0.60.0
- Node.js >= 16.0.0

### Platform Support
- ✅ Android (Primary support)
- ❌ iOS (Not supported)

### Device Requirements
- Must be iMin brand devices
- Device must have built-in thermal printer
- Android system version >= 5.0

## Installation Steps

### 1. Install npm Package

```bash
npm install react-native-printer-imin
```

Or using yarn:

```bash
yarn add react-native-printer-imin
```

### 2. Android Configuration

#### 2.1 Auto-linking (React Native >= 0.60)

For React Native 0.60 and above, the package will be auto-linked. Just rebuild the project:

```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

#### 2.2 Manual Linking (React Native < 0.60)

If using older versions of React Native, manual linking is required:

```bash
npx react-native link react-native-printer-imin
```

#### 2.3 Permission Configuration

Add necessary permissions in `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

#### 2.4 ProGuard Configuration (if code obfuscation is enabled)

Add to `android/app/proguard-rules.pro`:

```proguard
-keep class com.imin.** { *; }
-keep class com.printerimin.** { *; }
-dontwarn com.imin.**
```

### 3. Installation Verification

Create a simple test file to verify installation:

```typescript
import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import PrinterImin from 'react-native-printer-imin';

const TestPrinter = () => {
  useEffect(() => {
    // Check SDK version
    console.log('SDK Version:', PrinterImin.version);
  }, []);

  const testPrinter = async () => {
    try {
      // Initialize printer
      await PrinterImin.initPrinter();
      
      // Get printer status
      const status = await PrinterImin.getPrinterStatus();
      Alert.alert('Printer Status', status.message);
      
      // Test print
      await PrinterImin.printText('Installation test successful!');
      await PrinterImin.printAndLineFeed();
      
    } catch (error) {
      Alert.alert('Error', `Test failed: ${error}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Test Printer" onPress={testPrinter} />
    </View>
  );
};

export default TestPrinter;
```

## Common Installation Issues

### 1. Linking Error

**Error message**: `The package 'react-native-printer-imin' doesn't seem to be linked`

**Solution**:
1. Ensure you have run `pod install` (iOS projects)
2. Rebuild the project
3. Check if using Expo Go (native modules not supported)

```bash
# Clean and rebuild
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### 2. Android Build Failure

**Error message**: `Could not find com.imin:printerlibrary`

**Solution**:
Check repository configuration in `android/build.gradle`:

```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://www.jitpack.io' }
        // Ensure all necessary repositories are included
    }
}
```

### 3. Runtime Error

**Error message**: `Native module cannot be null`

**Solution**:
1. Ensure device is iMin brand
2. Check Android version compatibility
3. Reinstall and rebuild project

```bash
npm uninstall react-native-printer-imin
npm install react-native-printer-imin
npx react-native run-android
```

### 4. Permission Issues

**Error message**: `Permission denied`

**Solution**:
1. Check AndroidManifest.xml permission configuration
2. For Android 6.0+, runtime permission requests may be needed

```typescript
import { PermissionsAndroid } from 'react-native';

const requestPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);
    
    if (granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permission granted');
    }
  } catch (err) {
    console.warn(err);
  }
};
```

## Development Environment Configuration

### 1. TypeScript Support

If using TypeScript, type definitions are included in the package:

```typescript
import PrinterImin, { 
  IminPrintAlign, 
  IminTextStyle,
  IminPictureStyle 
} from 'react-native-printer-imin';
```

### 2. Debug Configuration

Enable debug mode for more logging information:

```typescript
// Enable debug in development environment
if (__DEV__) {
  PrinterImin.openLogs(1);
}
```

### 3. Metro Configuration

If encountering Metro bundling issues, add to `metro.config.js`:

```javascript
module.exports = {
  resolver: {
    assetExts: ['bin', 'txt', 'jpg', 'png', 'json'],
  },
};
```

## Upgrade Guide

### Upgrading from Older Versions

1. **Backup current code**
2. **Update package version**:
   ```bash
   npm update react-native-printer-imin
   ```
3. **Check API changes**: Refer to [API Documentation](./api-reference.md)
4. **Rebuild project**:
   ```bash
   cd android && ./gradlew clean && cd ..
   npx react-native run-android
   ```

### Version Compatibility

| SDK Version | React Native Version | Android Version |
|-------------|---------------------|-----------------|
| 0.10.x      | >= 0.60.0          | >= 5.0          |
| 0.9.x       | >= 0.60.0          | >= 5.0          |
| 0.8.x       | >= 0.60.0          | >= 4.4          |

## Next Steps

After successful installation, we recommend reading the following documentation:

1. [Quick Start](./quick-start.md) - Basic usage examples
2. [API Reference](./api-reference.md) - Complete API documentation
3. [Developer Guide](./developer-guide.md) - In-depth development guidance
4. [Example Code](../../example/) - Complete example application

## Technical Support

If you encounter issues during installation:

1. Check [FAQ](./faq.md)
2. Search [GitHub Issues](https://github.com/iminsoftware/react-native-printer-imin/issues)
3. Submit a new Issue with detailed error information and environment configuration