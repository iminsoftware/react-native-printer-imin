import * as React from 'react';
import { Provider } from '@fruits-chain/react-native-xiaoshu';
import PrinterImin from 'react-native-printer-imin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewHomePage from './views/v2';
import PrinterInfoPage from './views/v2/PrinterInfo';
import CashBoxInfoPage from './views/v2/CashBoxInfo';
import TransactionPage from './views/v2/Transaction';
import HomePage from './views/v1';
const Stack = createNativeStackNavigator();
export default function App() {
  const [sdkVersion, setSdkVersion] = React.useState<boolean>(false);
  const [printerStatus, setPrinterStatus] = React.useState<{
    code: string;
    message: string;
  }>();
  React.useEffect(() => {
    const close = PrinterImin.receiveBroadcastStream.listen((payload) => {
      console.log(payload.eventData, payload.eventName);
      if (payload.eventName === 'printer_sdk_version') {
        setSdkVersion(payload.eventData);
      } else if (payload.eventName === 'printer_status') {
        setPrinterStatus(payload.eventData);
        console.log(printerStatus);
      }
    });
    return () => {
      close();
    };
  }, [printerStatus, sdkVersion]);
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {sdkVersion ? (
            <>
              <Stack.Screen
                name="Home"
                options={{
                  title: 'v2 Printer API',
                }}
              >
                {(props) => {
                  return (
                    <NewHomePage {...props} printerStatus={printerStatus} />
                  );
                }}
              </Stack.Screen>
              <Stack.Screen name="PrinterInfo" component={PrinterInfoPage} />
              <Stack.Screen name="CashBoxInfo" component={CashBoxInfoPage} />
              <Stack.Screen name="Transaction" component={TransactionPage} />
            </>
          ) : (
            <Stack.Screen
              name="Home"
              component={HomePage}
              options={{ title: 'v1 Printer API' }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
