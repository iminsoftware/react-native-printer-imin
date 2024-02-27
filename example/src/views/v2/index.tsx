import * as React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card, Space, Row, Col } from '@fruits-chain/react-native-xiaoshu';
export default function NewHome() {
  const handlerInintPrinter = () => {};
  return (
    <ScrollView>
      <Space direction="vertical">
        <Card title="v2 Printer API">
          <Row gap={6} justify="flex-start">
            <Col span={12}>
              <Text style={styles.item} onPress={handlerInintPrinter}>
                initPrinter
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
