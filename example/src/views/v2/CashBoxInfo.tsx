import * as React from 'react';
import { ScrollView } from 'react-native';
import { Space, Cell, Card } from '@fruits-chain/react-native-xiaoshu';
export default function CashBoxInfo({
  route,
}: {
  route: {
    params?: {
      drawerStatus?: boolean;
      openDrawerTimes?: number;
    };
  };
}) {
  const { drawerStatus, openDrawerTimes } = route.params!;
  return (
    <ScrollView>
      <Space direction="vertical">
        <Card>
          <Cell title="Drawer Status" value={drawerStatus} />
          <Cell title="Open DrawerTimes" value={openDrawerTimes} />
        </Card>
      </Space>
    </ScrollView>
  );
}
