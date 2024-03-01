import * as React from 'react';
import { ScrollView } from 'react-native';
import { Space, Cell, Card } from '@fruits-chain/react-native-xiaoshu';
export default function PrinterInfo({
  route,
}: {
  route: {
    params?: {
      serialNumber?: string;
      modelName?: string;
      thermalHead?: string;
      firmwareVersion?: string;
      printServiceVersion?: string;
      hardwareVersion?: string;
      usbPrinterVidPid?: string;
      usbDevicesName?: string;
      printerDensity?: number;
      paperDistance?: number;
      paperType?: number;
      printerCutTimes?: string;
      printerMode?: number;
    };
  };
}) {
  const {
    serialNumber,
    modelName,
    thermalHead,
    firmwareVersion,
    printServiceVersion,
    hardwareVersion,
    usbPrinterVidPid,
    usbDevicesName,
    printerDensity,
    paperDistance,
    paperType,
    printerCutTimes,
    printerMode,
  } = route.params!;
  return (
    <ScrollView>
      <Space direction="vertical">
        <Card>
          <Cell title="SerialNumber" value={serialNumber} />
          <Cell title="ModelName" value={modelName} />
          <Cell title="ThermalHead" value={thermalHead} />
          <Cell title="FirmwareVersion" value={firmwareVersion} />
          <Cell title="PrintServiceVersion" value={printServiceVersion} />
          <Cell title="HardwareVersion" value={hardwareVersion} />
          <Cell title="UsbPrinterVidPid" value={usbPrinterVidPid} />
          <Cell title="UsbDevicesName" value={usbDevicesName} />
          <Cell title="PrinterDensity" value={printerDensity} />
          <Cell title="PaperDistance" value={paperDistance} />
          <Cell title="PaperType" value={paperType} />
          <Cell title="PrinterCutTimes" value={printerCutTimes} />
          <Cell title="PrinterMode" value={printerMode} />
        </Card>
      </Space>
    </ScrollView>
  );
}
