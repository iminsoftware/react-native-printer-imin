import * as React from 'react';
import { Provider } from '@fruits-chain/react-native-xiaoshu';
import PrinterImin from 'react-native-printer-imin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewHomePage from './views/v2';
import PrinterInfoPage from './views/v2/PrinterInfo';
import CashBoxInfoPage from './views/v2/CashBoxInfo';
import TransactionPage from './views/v2/Transaction';
import PrintTextPage from './views/v2/PrintText';
import PrintBarCodePage from './views/v2/PrintBarCode';
import HomePage from './views/v1';
import { LanguageProvider, LanguageContext } from './LanguageContext';
const Stack = createNativeStackNavigator();
export default function App() {
  const [printerStatus, setPrinterStatus] = React.useState<{
    code: string;
    message: string;
  }>();
  React.useEffect(() => {
    const close = PrinterImin.receiveBroadcastStream.listen((payload) => {
      console.log(payload.eventData, payload.eventName);
      if (payload.eventName === 'printer_status') {
        setPrinterStatus(payload.eventData);
        console.log(printerStatus);
      }
    });
    return () => {
      close();
    };
  }, [printerStatus]);
  console.log('version:', PrinterImin.version);
  return (
    <Provider>
    <LanguageProvider>
      <LanguageContext.Consumer>
       {({ language }) => (
       <NavigationContainer key={language} >
        <Stack.Navigator initialRouteName="Home">
          {PrinterImin.version === '2.0.0' ? (
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
              <Stack.Screen name="PrintText" component={PrintTextPage} />
              <Stack.Screen name="PrintBarCode" component={PrintBarCodePage} />
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
      )}
      </LanguageContext.Consumer>
     </LanguageProvider>
    </Provider>
  );
}
