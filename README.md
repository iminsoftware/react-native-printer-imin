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
