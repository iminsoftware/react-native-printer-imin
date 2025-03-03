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

# 更新版本号
# 更新0.10.1版本
 #  新增标签打印api
# 编辑 package.json 文件，将 "version": "0.8.0" 更新为 "version": "0.9.0"


