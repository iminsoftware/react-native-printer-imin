import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  PermissionsAndroid,
  Permission,
} from 'react-native';
import {
  Space,
  Row,
  Col,
  Card,
  Toast,
} from '@fruits-chain/react-native-xiaoshu';
import { InfoCircleOutline } from '@fruits-chain/icons-react-native';
import PrinterImin, {
  IminPrintAlign,
  // IminTypeface,
  IminQrcodeCorrectionLevel,
  IminBarcodeType,
  IminBarcodeTextPos,
} from 'react-native-printer-imin';

export default function NewHome({
  printerStatus,
  navigation,
}: {
  printerStatus?: { code: string; message: string };
  navigation: {
    navigate: (name: string, params?: Record<string, any>) => void;
    push: (arg0: string) => void;
  };
}) {
  const toastClose = React.useRef<{
    close: () => void;
  }>();

  React.useEffect(() => {
    if (printerStatus) {
      if (toastClose.current) {
        toastClose.current.close();
      }
      toastClose.current = Toast({
        type: 'icon',
        message: `${printerStatus.message}`,
        icon: <InfoCircleOutline size={40} color="#f30" />,
      });
    }
  });
  const getMediaFilePermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ] as Permission[]);
      if (
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.granted
      ) {
        console.log('You can use the read External Storage');
      }
      if (
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.granted
      ) {
        console.log('You can use the write External Storage');
      }
    } catch (e) {
      console.error(e);
    }
  };
  getMediaFilePermission();
  return (
    <>
      <ScrollView>
        <Space direction="vertical">
          <Card>
            <Row gap={6} justify="flex-start">
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() => PrinterImin.initPrinter()}
                >
                  initPrinter
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () => {
                    const info = await PrinterImin.getPrinterStatus();
                    if (info) {
                      if (toastClose.current) {
                        toastClose.current.close();
                      }
                      toastClose.current = Toast({
                        type: 'icon',
                        message: `${info.message}`,
                        icon: <InfoCircleOutline size={40} color="#f30" />,
                      });
                    }
                  }}
                >
                  getPrinterStatus
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () => {
                    await navigation.navigate('PrinterInfo', {
                      serialNumber: await PrinterImin.getPrinterSerialNumber(),
                      modelName: await PrinterImin.getPrinterModelName(),
                      thermalHead: await PrinterImin.getPrinterThermalHead(),
                      firmwareVersion:
                        await PrinterImin.getPrinterFirmwareVersion(),
                      printServiceVersion:
                        await PrinterImin.getServiceVersion(),
                      hardwareVersion:
                        await PrinterImin.getPrinterHardwareVersion(),
                      usbPrinterVidPid: await PrinterImin.getUsbPrinterVidPid(),
                      usbDevicesName: await PrinterImin.getUsbDevicesName(),
                      printerDensity: await PrinterImin.getPrinterDensity(),
                      paperDistance:
                        await PrinterImin.getPrinterPaperDistance(),
                      paperType: await PrinterImin.getPrinterPaperType(),
                      printerCutTimes: await PrinterImin.getPrinterCutTimes(),
                      printerMode: await PrinterImin.getPrinterMode(),
                    });
                  }}
                >
                  Printer Info
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () => {
                    await PrinterImin.initPrinterParams();
                  }}
                >
                  initPrinterParams
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () => await PrinterImin.openCashBox()}
                >
                  openCashBox
                </Text>
              </Col>
              {/* <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () => {
                    await navigation.navigate('CashBoxInfo', {
                      drawerStatus: await PrinterImin.getDrawerStatus(),
                      openDrawerTimes: await PrinterImin.getOpenDrawerTimes(),
                    });
                  }}
                >
                  CashBox info
                </Text>
              </Col> */}
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () => await PrinterImin.printerSelfChecking()}
                >
                  printerSelfChecking
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() => {
                    navigation.navigate('PrintText');
                  }}
                >
                  printText
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () => {
                    const arr = [
                      0x1b, 0x40, 0x1b, 0x4d, 0x00, 0x1b, 0x61, 0x00, 0x1d,
                      0x21, 0x11, 0x1b, 0x45, 0x00, 0x1b, 0x47, 0x00, 0x1b,
                      0x61, 0x00, 0x1b, 0x45, 0x01, 0x1b, 0x47, 0x01, 0xb1,
                      0xbe, 0xb5, 0xea, 0xc1, 0xf4, 0xb4, 0xe6, 0x0a, 0x1b,
                      0x4d, 0x00, 0x1b, 0x61, 0x00, 0x1d, 0x21, 0x00, 0x1b,
                      0x45, 0x00, 0x1b, 0x47, 0x00, 0x1b, 0x61, 0x00, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x0a, 0x1b, 0x40, 0x1b, 0x4d,
                      0x00, 0x1b, 0x61, 0x00, 0x1d, 0x21, 0x11, 0x1b, 0x45,
                      0x00, 0x1b, 0x47, 0x00, 0x1b, 0x61, 0x00, 0x1b, 0x45,
                      0x01, 0x1b, 0x47, 0x01, 0x1b, 0x61, 0x01, 0x23, 0x31,
                      0x35, 0x20, 0xb0, 0xd9, 0xb6, 0xc8, 0xcd, 0xe2, 0xc2,
                      0xf4, 0x0a, 0x5b, 0xbb, 0xf5, 0xb5, 0xbd, 0xb8, 0xb6,
                      0xbf, 0xee, 0x5d, 0x0a, 0x1b, 0x4d, 0x00, 0x1b, 0x61,
                      0x00, 0x1d, 0x21, 0x00, 0x1b, 0x45, 0x00, 0x1b, 0x47,
                      0x00, 0x1b, 0x61, 0x00, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x0a, 0x1b, 0x40, 0x1b, 0x4d, 0x00, 0x1b, 0x61, 0x00,
                      0x1d, 0x21, 0x01, 0x1b, 0x45, 0x00, 0x1b, 0x47, 0x00,
                      0x1b, 0x61, 0x00, 0xc6, 0xda, 0xcd, 0xfb, 0xcb, 0xcd,
                      0xb4, 0xef, 0xca, 0xb1, 0xbc, 0xe4, 0xa3, 0xba, 0xc1,
                      0xa2, 0xbc, 0xb4, 0xc5, 0xe4, 0xcb, 0xcd, 0x0a, 0xb6,
                      0xa9, 0xb5, 0xa5, 0xb1, 0xb8, 0xd7, 0xa2, 0xa3, 0xba,
                      0xc7, 0xeb, 0xcb, 0xcd, 0xb5, 0xbd, 0xbf, 0xfc, 0xbf,
                      0xc6, 0xce, 0xf7, 0xc3, 0xc5, 0x2c, 0xb2, 0xbb, 0xd2,
                      0xaa, 0xc0, 0xb1, 0x0a, 0xb7, 0xa2, 0xc6, 0xb1, 0xd0,
                      0xc5, 0xcf, 0xa2, 0xa3, 0xba, 0xb0, 0xd9, 0xb6, 0xc8,
                      0xcd, 0xe2, 0xc2, 0xf4, 0xb7, 0xa2, 0xc6, 0xb1, 0x0a,
                      0x1b, 0x4d, 0x00, 0x1b, 0x61, 0x00, 0x1d, 0x21, 0x00,
                      0x1b, 0x45, 0x00, 0x1b, 0x47, 0x00, 0x1b, 0x61, 0x00,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x0a, 0x1b, 0x40, 0x1b,
                      0x4d, 0x00, 0x1b, 0x61, 0x00, 0x1d, 0x21, 0x00, 0x1b,
                      0x45, 0x00, 0x1b, 0x47, 0x00, 0x1b, 0x61, 0x00, 0xb6,
                      0xa9, 0xb5, 0xa5, 0xb1, 0xe0, 0xba, 0xc5, 0xa3, 0xba,
                      0x31, 0x34, 0x31, 0x38, 0x37, 0x31, 0x38, 0x36, 0x39,
                      0x31, 0x31, 0x36, 0x38, 0x39, 0x0a, 0xcf, 0xc2, 0xb5,
                      0xa5, 0xca, 0xb1, 0xbc, 0xe4, 0xa3, 0xba, 0x32, 0x30,
                      0x31, 0x34, 0x2d, 0x31, 0x32, 0x2d, 0x31, 0x36, 0x20,
                      0x31, 0x36, 0x3a, 0x33, 0x31, 0x0a, 0x1b, 0x4d, 0x00,
                      0x1b, 0x61, 0x00, 0x1d, 0x21, 0x00, 0x1b, 0x45, 0x00,
                      0x1b, 0x47, 0x00, 0x1b, 0x61, 0x00, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x0a, 0x1b, 0x40, 0x1b, 0x4d, 0x00, 0x1b,
                      0x61, 0x00, 0x1d, 0x21, 0x01, 0x1b, 0x45, 0x00, 0x1b,
                      0x47, 0x00, 0x1b, 0x61, 0x00, 0xb2, 0xcb, 0xc6, 0xb7,
                      0xc3, 0xfb, 0xb3, 0xc6, 0x20, 0x20, 0x20, 0x20, 0x20,
                      0x20, 0x20, 0x20, 0x20, 0xca, 0xfd, 0xc1, 0xbf, 0x20,
                      0x20, 0x20, 0x20, 0x20, 0xbd, 0xf0, 0xb6, 0xee, 0x0a,
                      0x1b, 0x4d, 0x00, 0x1b, 0x61, 0x00, 0x1d, 0x21, 0x00,
                      0x1b, 0x45, 0x00, 0x1b, 0x47, 0x00, 0x1b, 0x61, 0x00,
                      0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d,
                      0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d,
                      0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d,
                      0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x0a, 0x1b, 0x4d, 0x00,
                      0x1b, 0x61, 0x00, 0x1d, 0x21, 0x01, 0x1b, 0x45, 0x00,
                      0x1b, 0x47, 0x00, 0x1b, 0x61, 0x00, 0xcf, 0xe3, 0xc0,
                      0xb1, 0xc3, 0xe6, 0xcc, 0xd7, 0xb2, 0xcd, 0x1b, 0x24,
                      0xf2, 0x00, 0x31, 0x1b, 0x24, 0x25, 0x01, 0xa3, 0xa4,
                      0x34, 0x30, 0x2e, 0x30, 0x30, 0x0a, 0x1b, 0x4d, 0x00,
                      0x1b, 0x61, 0x00, 0x1d, 0x21, 0x00, 0x1b, 0x45, 0x00,
                      0x1b, 0x47, 0x00, 0x1b, 0x61, 0x00, 0x1b, 0x4d, 0x00,
                      0x1b, 0x61, 0x00, 0x1d, 0x21, 0x00, 0x1b, 0x45, 0x00,
                      0x1b, 0x47, 0x00, 0x1b, 0x61, 0x00, 0x1b, 0x4d, 0x00,
                      0x1b, 0x61, 0x00, 0x1d, 0x21, 0x01, 0x1b, 0x45, 0x00,
                      0x1b, 0x47, 0x00, 0x1b, 0x61, 0x00, 0xcb, 0xd8, 0xca,
                      0xb3, 0xcc, 0xec, 0xcf, 0xc2, 0xba, 0xba, 0xb1, 0xa4,
                      0x1b, 0x24, 0xf2, 0x00, 0x31, 0x1b, 0x24, 0x25, 0x01,
                      0xa3, 0xa4, 0x33, 0x38, 0x2e, 0x30, 0x30, 0x0a, 0x1b,
                      0x4d, 0x00, 0x1b, 0x61, 0x00, 0x1d, 0x21, 0x00, 0x1b,
                      0x45, 0x00, 0x1b, 0x47, 0x00, 0x1b, 0x61, 0x00, 0x1b,
                      0x4d, 0x00, 0x1b, 0x61, 0x00, 0x1d, 0x21, 0x00, 0x1b,
                      0x45, 0x00, 0x1b, 0x47, 0x00, 0x1b, 0x61, 0x00, 0x1b,
                      0x40, 0x1b, 0x4d, 0x00, 0x1b, 0x61, 0x00, 0x1d, 0x21,
                      0x00, 0x1b, 0x45, 0x00, 0x1b, 0x47, 0x00, 0x1b, 0x61,
                      0x00, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d,
                      0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d,
                      0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d,
                      0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x2d, 0x0a, 0x1b, 0x40,
                      0x1b, 0x4d, 0x00, 0x1b, 0x61, 0x00, 0x1d, 0x21, 0x00,
                      0x1b, 0x45, 0x00, 0x1b, 0x47, 0x00, 0x1b, 0x61, 0x00,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x0a, 0x1b, 0x4d, 0x00,
                      0x1b, 0x61, 0x00, 0x1d, 0x21, 0x01, 0x1b, 0x45, 0x00,
                      0x1b, 0x47, 0x00, 0x1b, 0x61, 0x00, 0xd0, 0xd5, 0xc3,
                      0xfb, 0xa3, 0xba, 0xb0, 0xd9, 0xb6, 0xc8, 0xb2, 0xe2,
                      0xca, 0xd4, 0x0a, 0xb5, 0xd8, 0xd6, 0xb7, 0xa3, 0xba,
                      0xbf, 0xfc, 0xbf, 0xc6, 0xbf, 0xc6, 0xbc, 0xbc, 0xb4,
                      0xf3, 0xcf, 0xc3, 0x0a, 0xb5, 0xe7, 0xbb, 0xb0, 0xa3,
                      0xba, 0x31, 0x38, 0x37, 0x30, 0x30, 0x30, 0x30, 0x30,
                      0x30, 0x30, 0x30, 0x0a, 0x1b, 0x40, 0x1b, 0x4d, 0x00,
                      0x1b, 0x61, 0x00, 0x1d, 0x21, 0x00, 0x1b, 0x45, 0x00,
                      0x1b, 0x47, 0x00, 0x1b, 0x61, 0x00, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x0a, 0xb0, 0xd9, 0xb6, 0xc8, 0xb2, 0xe2,
                      0xca, 0xd4, 0xc9, 0xcc, 0xbb, 0xa7, 0x0a, 0x31, 0x38,
                      0x37, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x0a,
                      0x1b, 0x4d, 0x00, 0x1b, 0x61, 0x00, 0x1d, 0x21, 0x00,
                      0x1b, 0x45, 0x00, 0x1b, 0x47, 0x00, 0x1b, 0x61, 0x00,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x2a,
                      0x2a, 0x2a, 0x2a, 0x2a, 0x2a, 0x0a, 0x1b, 0x4d, 0x00,
                      0x1b, 0x61, 0x00, 0x1d, 0x21, 0x00, 0x1b, 0x45, 0x00,
                      0x1b, 0x47, 0x00, 0x1b, 0x61, 0x00, 0x1b, 0x61, 0x01,
                      0x23, 0x31, 0x35, 0x20, 0xb0, 0xd9, 0xb6, 0xc8, 0xcd,
                      0xe2, 0xc2, 0xf4, 0x20, 0x20, 0x31, 0x31, 0xd4, 0xc2,
                      0x30, 0x39, 0xc8, 0xd5, 0x20, 0x31, 0x37, 0x3a, 0x35,
                      0x30, 0x3a, 0x33, 0x30, 0x0a, 0x0a, 0x0a, 0x0a, 0x0a,
                    ];
                    await PrinterImin.sendRAWData(arr);
                  }}
                >
                  sendRAWData
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () => {
                    await PrinterImin.printColumnsText([
                      {
                        text: '语文',
                        width: 100,
                        fontSize: 26,
                        align: IminPrintAlign.left,
                      },
                      {
                        text: '88',
                        width: 70,
                        fontSize: 26,
                        align: IminPrintAlign.left,
                      },
                      {
                        text: 'A-',
                        width: 50,
                        fontSize: 26,
                        align: IminPrintAlign.left,
                      },
                      {
                        text: '陈老师',
                        width: 120,
                        fontSize: 26,
                        align: IminPrintAlign.left,
                      },
                    ]);
                    await PrinterImin.printColumnsText([
                      {
                        text: '语文',
                        width: 100,
                        fontSize: 26,
                        align: IminPrintAlign.left,
                      },
                      {
                        text: '88',
                        width: 70,
                        fontSize: 26,
                        align: IminPrintAlign.left,
                      },
                      {
                        text: 'A-',
                        width: 50,
                        fontSize: 26,
                        align: IminPrintAlign.left,
                      },
                      {
                        text: '陈老师',
                        width: 120,
                        fontSize: 26,
                        align: IminPrintAlign.left,
                      },
                    ]);
                    await PrinterImin.printAndFeedPaper(100);
                  }}
                >
                  printColumnsText
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () => {
                    await PrinterImin.printColumnsString([
                      {
                        text: '语文',
                        width: 1,
                        fontSize: 26,
                        align: IminPrintAlign.left,
                      },
                      {
                        text: '88',
                        width: 1,
                        fontSize: 26,
                        align: IminPrintAlign.left,
                      },
                      {
                        text: 'A-',
                        width: 1,
                        fontSize: 26,
                        align: IminPrintAlign.left,
                      },
                      {
                        text: '陈老师',
                        width: 1,
                        fontSize: 26,
                        align: IminPrintAlign.left,
                      },
                    ]);
                    await PrinterImin.printAndFeedPaper(100);
                  }}
                >
                  printColumnsString
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () => {
                    await PrinterImin.printSingleBitmap(base64Img);
                    await PrinterImin.printAndFeedPaper(100);
                  }}
                >
                  printSingleBitmap
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () => {
                    await PrinterImin.printMultiBitmap([base64Img, base64Img]);
                    await PrinterImin.printAndFeedPaper(100);
                  }}
                >
                  printMultiBitmap
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () => {
                    await PrinterImin.printSingleBitmapColorChart(base64Img);
                    await PrinterImin.printAndFeedPaper(100);
                  }}
                >
                  printSingleBitmapColorChart
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () =>
                    await PrinterImin.setCodeAlignment(IminPrintAlign.right)
                  }
                >
                  setCodeAlignment
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () => {
                    await PrinterImin.fullCut();
                    await PrinterImin.printAndFeedPaper(70);
                  }}
                >
                  fullCut
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () => {
                    await PrinterImin.partialCut();
                    await PrinterImin.printAndFeedPaper(70);
                  }}
                >
                  partialCut
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () => {
                    await PrinterImin.printQrCode('https://www.imin.sg', {
                      align: IminPrintAlign.center,
                      errorCorrectionLevel: IminQrcodeCorrectionLevel.levelH,
                      qrSize: 4,
                    });
                    await PrinterImin.printAndFeedPaper(100);
                  }}
                >
                  printQrCode
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () => {
                    await PrinterImin.printBarCode(
                      IminBarcodeType.jan13,
                      '0123456789012',
                      {
                        align: IminPrintAlign.center,
                        position: IminBarcodeTextPos.aboveText,
                        width: 400,
                        height: 50,
                      }
                    );
                    await PrinterImin.printAndFeedPaper(100);
                  }}
                >
                  printBarCode
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={async () => {
                    await PrinterImin.printDoubleQR(
                      {
                        text: 'https://www.imin.sg',
                        level: IminQrcodeCorrectionLevel.levelH,
                      },
                      {
                        text: 'https://www.imin.sg',
                        level: IminQrcodeCorrectionLevel.levelQ,
                      },
                      5
                    );
                    await PrinterImin.printAndFeedPaper(100);
                  }}
                >
                  printDoubleQR
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() => {
                    navigation.navigate('Transaction');
                  }}
                >
                  transaction printing
                </Text>
              </Col>
            </Row>
          </Card>
        </Space>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 100,
    lineHeight: 90,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    borderStyle: 'solid',
    marginVertical: 5,
  },
});
const base64Img = `data:image/png;base64,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`;
