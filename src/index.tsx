import { NativeModules, Platform } from 'react-native';
import type { IminPrinterType } from './typing';
export { IminPrintAlign } from './typing';
const LINKING_ERROR =
  `The package 'react-native-printer-imin' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const PrinterImin = NativeModules.PrinterImin
  ? NativeModules.PrinterImin
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const PrinterSDK: IminPrinterType = {
  initPrinter: PrinterImin.initPrinter,
  getPrinterStatus: PrinterImin.getPrinterStatus,
  printText: PrinterImin.printText,
};

export default PrinterSDK;
