import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Keyboard,
  PermissionsAndroid,
  type Permission,
} from 'react-native';
import {
  Dialog,
  Card,
  Space,
  Row,
  Col,
  TextInput,
  Button,
  Blank,
  Toast,
} from '@fruits-chain/react-native-xiaoshu';
import PrinterImin, {
  IminPrintAlign,
  IminFontStyle,
  IminTypeface,
  IminBarcodeType,
  IminQrcodeCorrectionLevel,
  IminBarcodeTextPos,
} from 'react-native-printer-imin';
import { InfoCircleOutline } from '@fruits-chain/icons-react-native';
export default function Home() {
  const toastClose = React.useRef<{
    close: () => void;
  }>();
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
  const [dialogState, setDialogState] = React.useState({
    cDialog: {
      value: '',
      show: false,
    },
  });
  const closeDialog = React.useCallback(() => {
    Keyboard.dismiss();
    setDialogState((s) => ({
      ...s,
      cDialog: {
        ...s.cDialog,
        show: false,
      },
    }));
  }, []);
  const handleConfirm = React.useCallback(() => {
    Keyboard.dismiss();
    setDialogState((s) => ({
      ...s,
      cDialog: {
        ...s.cDialog,
        show: false,
      },
    }));
    PrinterImin.printText(dialogState.cDialog.value, {
      fontSize: 20,
      align: IminPrintAlign.left,
      fontStyle: IminFontStyle.boldItalic,
      typeface: IminTypeface.Monospace,
    });
    PrinterImin.printAndFeedPaper(100);
    PrinterImin.partialCut();
  }, [dialogState.cDialog.value]);
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
                  onPress={() => {
                    setDialogState((s) => ({
                      ...s,
                      cDialog: {
                        ...s.cDialog,
                        value:
                          'iMin advocates the core values of "Integrity, Customer First, Invention&Creation, Patience”, using cloud-based technology to help businesses to get  access to the Internet and also increases their data base, by providing more solutions so that their business can take a step further. Through their efficiency enhancement, cost improvement, service innovation, and  better services for consumers, these aspect will drives the entire industry development.',
                        show: true,
                      },
                    }));
                  }}
                >
                  PrinterText
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() => {
                    PrinterImin.printAntiWhiteText(
                      'iMin advocates the core values of "Integrity, Customer First, Invention&Creation, Patience”, using cloud-based technology to help businesses to get  access to the Internet and also increases their data base, by providing more solutions so ',
                      {
                        fontSize: 30,
                        align: IminPrintAlign.center,
                      }
                    );
                    PrinterImin.printAndFeedPaper(100);
                  }}
                >
                  printAntiWhiteText
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() => PrinterImin.setTextLineSpacing(1.0)}
                >
                  setTextLineSpacing
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() => {
                    PrinterImin.printColumnsText([
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
                    PrinterImin.printAndFeedPaper(100);
                  }}
                >
                  printColumnsText
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() => {
                    PrinterImin.printSingleBitmap(base64Img);
                    PrinterImin.printAndFeedPaper(100);
                  }}
                >
                  printSingleBitmap
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() => {
                    PrinterImin.printMultiBitmap([base64Img, base64Img], {
                      align: IminPrintAlign.center,
                      width: 220,
                      height: 40,
                    });
                    PrinterImin.printAndFeedPaper(100);
                  }}
                >
                  printMultiBitmap
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() => {
                    PrinterImin.printSingleBitmapBlackWhite(base64Img);
                    PrinterImin.printAndFeedPaper(100);
                  }}
                >
                  printSingleBitmapBlackWhite
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() => {
                    PrinterImin.printBarCode(
                      IminBarcodeType.jan13,
                      '0123456789012',
                      {
                        align: IminPrintAlign.center,
                        position: IminBarcodeTextPos.aboveText,
                      }
                    );
                    PrinterImin.printAndFeedPaper(100);
                  }}
                >
                  printBarCode
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() =>
                    PrinterImin.printQrCode('https://www.imin.sg', {
                      align: IminPrintAlign.center,
                      errorCorrectionLevel: IminQrcodeCorrectionLevel.levelH,
                      qrSize: 4,
                    })
                  }
                >
                  printQrCode
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() =>
                    PrinterImin.printDoubleQR(
                      { text: 'https://www.imin.sg' },
                      { text: 'https://www.imin.sg' },
                      5
                    )
                  }
                >
                  printDoubleQR
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() => PrinterImin.partialCut()}
                >
                  partialCut
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() => PrinterImin.openCashBox()}
                >
                  openCashBox
                </Text>
              </Col>
            </Row>
          </Card>
        </Space>
      </ScrollView>
      <Dialog.Keyboard
        title="Print Text"
        visible={dialogState.cDialog.show}
        showConfirmButton={false}
        showCancelButton={false}
        closeOnPressOverlay={false}
        showClose
        onPressClose={closeDialog}
      >
        <Blank top={24} bottom={32} left={24} right={24}>
          <TextInput
            placeholder="Please enter content"
            bordered
            clearable
            type="textarea"
            showWordLimit
            maxLength={500}
            onChange={(text) => {
              setDialogState((s) => ({
                ...s,
                cDialog: {
                  ...s.cDialog,
                  value: text,
                  show: true,
                },
              }));
            }}
            rows={4}
            value={dialogState.cDialog.value}
          />
        </Blank>
        <Blank bottom={24} left={24} right={24}>
          <Button text="确定" type="primary" onPress={handleConfirm} />
        </Blank>
      </Dialog.Keyboard>
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
