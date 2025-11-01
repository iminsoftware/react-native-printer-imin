# react-native-printer-imin

Native Module For iMin Printer SDK Plugin

## Installation

```sh
npm install react-native-printer-imin
```

## Usage

```js
import PrinterImin from 'react-native-printer-imin';

// ...
PrinterImin.initPrinter();

PrinterImin.getPrinterStatus().then((info) => {
  console.log(info);
});

PrinterImin.printText('hello world');
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
# 更新0.10.5 版本 Updated to version 0.10.5
更新内容 ： 适配A15  Update details: Adapted for A15
# 更新0.10.4版本  Updated to version 0.10.4
 更新内容： 更新版本号  Update details: Updated version number
# 更新0.10.3版本  Updated to version 0.10.3
fix: adapt .so file for android 16k page, update SDK to iminPrinterSDK-15_V1.3.2_2505261539.jar
更新内容：fix: all->适配.so文件安卓16k页面,更新SDK:iminPrinterSDK-15_V1.3.2_2505261539.jar
# 更新版本号0.10.2
# 更新0.10.1版本
 #  新增标签打印api
# 编辑 package.json 文件，将 "version": "0.8.0" 更新为 "version": "0.9.0"


