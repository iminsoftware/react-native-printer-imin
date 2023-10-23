import * as React from 'react';

import { Card, Row, Col, Space } from '@fruits-chain/react-native-xiaoshu';
import { ScrollView, Text, StyleSheet, ToastAndroid } from 'react-native';
import PrinterImin from 'react-native-printer-imin';

export default function App() {
  const handlerPrinterStatus = () => {
    PrinterImin.getPrinterStatus().then((info) => {
      console.log(info);
      ToastAndroid.show(info.message, ToastAndroid.SHORT);
    });
  };
  const handlerInintPrinter = () => {
    PrinterImin.initPrinter().then(() => {
      console.log('===INITPRINTER===');
    });
  };
  const handlerPrinterText = () => {
    PrinterImin.printText(
      'iMin advocates the core values of "Integrity, Customer First, Invention&Creation, Patience”, using cloud-based technology to help businesses to get  access to the Internet and also increases their data base, by providing more solutions so that their business can take a step further. Through their efficiency enhancement, cost improvement, service innovation, and  better services for consumers, these aspect will drives the entire industry development.'
    );
  };

  return (
    <ScrollView>
      <Space direction="vertical">
        <Card title="Printer API">
          <Row gap={12}>
            <Col span={8}>
              <Text style={styles.item} onPress={handlerInintPrinter}>
                initPrinter
              </Text>
            </Col>
            <Col span={8}>
              <Text style={styles.item} onPress={handlerPrinterStatus}>
                getPrinterStatus
              </Text>
            </Col>
            <Col span={8}>
              <Text style={styles.item} onPress={handlerPrinterText}>
                PrinterText
              </Text>
            </Col>
          </Row>
        </Card>
      </Space>
    </ScrollView>
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
