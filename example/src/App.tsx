import * as React from 'react';
import { PermissionsAndroid, type Permission } from 'react-native';
import { Provider } from '@fruits-chain/react-native-xiaoshu';
import PrinterImin from 'react-native-printer-imin';
import NewHome from './views/v2';
import Home from './views/v1';

export default function App() {
  const [sdkVersion, setSdkVersion] = React.useState<boolean>(false);
  React.useEffect(() => {
    const close = PrinterImin.receiveBroadcastStream.listen((payload) => {
      console.log(payload.eventData, payload.eventName);
      if (payload.eventName === 'printer_sdk_version') {
        setSdkVersion(payload.eventData);
      }
    });
    return () => {
      close();
    };
  }, []);
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
  return <Provider>{sdkVersion ? <NewHome /> : <Home />}</Provider>;
}
