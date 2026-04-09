import * as React from 'react';
import { ScrollView, ActivityIndicator, View } from 'react-native';
import { Space, Cell, Card } from '@fruits-chain/react-native-xiaoshu';
import PrinterImin from 'react-native-printer-imin';

const TIMEOUT_MS = 5000;

const withTimeout = (promise: Promise<any>, ms: number): Promise<any> =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Timeout')), ms);
    promise
      .then((val) => {
        clearTimeout(timer);
        resolve(val);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });

const formatValue = (val: any): string => {
  if (val === null || val === undefined || val === '') {
    return 'N/A';
  }
  return String(val);
};

type InfoItem = {
  title: string;
  key: string;
  fn: () => Promise<any>;
};

const INFO_ITEMS: InfoItem[] = [
  { title: 'SerialNumber', key: 'serialNumber', fn: () => PrinterImin.getPrinterSerialNumber() },
  { title: 'ModelName', key: 'modelName', fn: () => PrinterImin.getPrinterModelName() },
  { title: 'ThermalHead', key: 'thermalHead', fn: () => PrinterImin.getPrinterThermalHead() },
  { title: 'FirmwareVersion', key: 'firmwareVersion', fn: () => PrinterImin.getPrinterFirmwareVersion() },
  { title: 'PrintServiceVersion', key: 'printServiceVersion', fn: () => PrinterImin.getServiceVersion() },
  { title: 'HardwareVersion', key: 'hardwareVersion', fn: () => PrinterImin.getPrinterHardwareVersion() },
  { title: 'UsbPrinterVidPid', key: 'usbPrinterVidPid', fn: () => PrinterImin.getUsbPrinterVidPid() },
  { title: 'UsbDevicesName', key: 'usbDevicesName', fn: () => PrinterImin.getUsbDevicesName() },
  { title: 'PrinterDensity', key: 'printerDensity', fn: () => PrinterImin.getPrinterDensity() },
  { title: 'PaperDistance', key: 'paperDistance', fn: () => PrinterImin.getPrinterPaperDistance() },
  { title: 'PaperType', key: 'paperType', fn: () => PrinterImin.getPrinterPaperType() },
  { title: 'PrinterCutTimes', key: 'printerCutTimes', fn: () => PrinterImin.getPrinterCutTimes() },
  { title: 'PrinterMode', key: 'printerMode', fn: () => PrinterImin.getPrinterMode() },
];

export default function PrinterInfo() {
  const [loading, setLoading] = React.useState(true);
  const [info, setInfo] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    let isMounted = true;

    const fetchInfo = async () => {
      const data: Record<string, string> = {};

      for (const item of INFO_ITEMS) {
        try {
          const result = await withTimeout(item.fn(), TIMEOUT_MS);
          data[item.key] = formatValue(result);
        } catch {
          data[item.key] = 'N/A';
        }
      }

      if (isMounted) {
        setInfo(data);
        setLoading(false);
      }
    };

    fetchInfo().catch(() => {
      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView>
      <Space direction="vertical">
        <Card>
          {INFO_ITEMS.map((item) => (
            <Cell
              key={item.key}
              title={item.title}
              value={info[item.key] ?? 'N/A'}
            />
          ))}
        </Card>
      </Space>
    </ScrollView>
  );
}
