import * as React from 'react';
import { ScrollView, StyleSheet, Text, Keyboard } from 'react-native';
import {
  Dialog,
  Card,
  Space,
  Row,
  Col,
  TextInput,
  Button,
  Blank,
  // Toast,
} from '@fruits-chain/react-native-xiaoshu';
import PrinterImin, {
  IminPrintAlign,
  IminFontStyle,
  IminTypeface,
  IminBarcodeType,
  IminQrcodeCorrectionLevel,
  IminBarcodeTextPos,
} from 'react-native-printer-imin';
// import { InfoCircleOutline } from '@fruits-chain/icons-react-native';
export default function Home() {
  // const [status, setStatus] = React.useState<{
  //   code: number;
  //   message: string;
  // }>();
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
  const handlerPrinterStatus = () => {
    PrinterImin.getPrinterStatus().then((info) => {
      console.log(info, '========');
      // setStatus(info);
      // Toast({
      //   type: 'icon',
      //   message: `${status?.message}`,
      //   icon: <InfoCircleOutline size={40} color="#f30" />,
      // });
    });
  };
  return (
    <>
      <ScrollView>
        <Space direction="vertical">
          <Card title="Printer API">
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
                <Text style={styles.item} onPress={handlerPrinterStatus}>
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
                  onPress={() =>
                    PrinterImin.printAntiWhiteText('打印反白文字', {
                      fontSize: 30,
                      align: IminPrintAlign.center,
                    })
                  }
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
                  onPress={() =>
                    PrinterImin.printColumnsText([
                      {
                        text: '1',
                        width: 1,
                        fontSize: 26,
                        align: IminPrintAlign.center,
                      },
                      {
                        text: 'iMin',
                        width: 2,
                        fontSize: 26,
                        align: IminPrintAlign.left,
                      },
                      {
                        text: 'iMin',
                        width: 1,
                        fontSize: 26,
                        align: IminPrintAlign.right,
                      },
                    ])
                  }
                >
                  printColumnsText
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() =>
                    PrinterImin.printSingleBitmap(require('../../logo.png'))
                  }
                >
                  printSingleBitmap
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() =>
                    PrinterImin.printMultiBitmap(
                      [require('../../logo.png'), require('../../logo.png')],
                      { align: IminPrintAlign.center, width: 220, height: 40 }
                    )
                  }
                >
                  printMultiBitmap
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() =>
                    PrinterImin.printSingleBitmapBlackWhite(
                      require('../../logo.png')
                    )
                  }
                >
                  printSingleBitmapBlackWhite
                </Text>
              </Col>
              <Col span={12}>
                <Text
                  style={styles.item}
                  onPress={() =>
                    PrinterImin.printBarCode(
                      IminBarcodeType.jan13,
                      '0123456789012',
                      {
                        align: IminPrintAlign.center,
                        position: IminBarcodeTextPos.aboveText,
                        width: 400,
                        height: 50,
                      }
                    )
                  }
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
