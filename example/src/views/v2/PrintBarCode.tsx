import * as React from 'react';
import { ScrollView } from 'react-native';
import {
  Space,
  Card,
  Cell,
  TextInput,
  Blank,
  Button,
  Selector,
} from '@fruits-chain/react-native-xiaoshu';
import PrinterImin, {
  IminPrintAlign,
  IminBarcodeType,
  IminBarcodeTextPos,
} from 'react-native-printer-imin';
export default function PrintBarCode() {

    //声明属性要和接口里面的属性保持一致
  const [barCodeContent, setBarCodeContent] = React.useState('');
  const [barCodeWidth, setBarCodeWidth] = React.useState('');
  const [widthPlaceholder, setWidthPlaceholder] = React.useState('Please enter');
  const [barCodeHeight, setBarCodeHeight] = React.useState('');
  const [heightPlaceholder, setHeightPlaceholder] = React.useState('Please enter');
  const [align, setAlign] = React.useState<number>(IminPrintAlign.left);
  const [position, setBarCodeHriPosition] = React.useState<number>(IminBarcodeTextPos.none);
  const [barCodeType, setBarCodeType] = React.useState<number>(
    IminBarcodeType.code39
  );

  const barCodeTypeMap: { [key: number]: string } = {
    [IminBarcodeType.upcA]: 'upcA',
    [IminBarcodeType.upcE]: 'upcE',
    [IminBarcodeType.jan13]: 'jan13',
    [IminBarcodeType.jan8]: 'jan8',
    [IminBarcodeType.code39]: 'code39',
    [IminBarcodeType.itf]: 'itf',
    [IminBarcodeType.codabar]: 'codabar',
    [IminBarcodeType.code93]: 'code93',
    [IminBarcodeType.code128]: 'code128',
  };

  return (
    <ScrollView>
      <Space direction="vertical">
        <Card>
          <Cell
            title="BarCode Content"
            vertical
            value={
              <TextInput
                value={barCodeContent}
                onChange={(value) => setBarCodeContent(value)}
                placeholder="Please enter "
                textAlign="left"
              />
            }
          />
          <Cell
            title="BarCode Width"
            vertical
            value={
              <TextInput
                value={barCodeWidth}
                onChange={(value) => {
                    if (value === '') {
                        setBarCodeWidth('');
                        return;
                      }
                    const newValue = parseInt(value, 10);
                   if (!isNaN(newValue) && newValue >= 1 && newValue <= 6) {
                       setBarCodeWidth(newValue.toString());
                    }

                }}
                placeholder={widthPlaceholder}
                onFocus={() => setWidthPlaceholder('(1 <= width <= 6)')}
                onBlur={() => setWidthPlaceholder('Please enter')}
                textAlign="left"
              />
            }
          />
          <Cell
            title="BarCode Height"
            vertical
            value={
              <TextInput
                value={barCodeHeight}
                onChange={(value) => {
                    if (value === '') {
                        setBarCodeHeight('');
                        return;
                      }
                    const newValue = parseInt(value, 10);
                    if (!isNaN(newValue) && newValue <= 255) {
                        setBarCodeHeight(newValue.toString());
                    }
                }}
                placeholder={heightPlaceholder}
                onFocus={() => setHeightPlaceholder('(24 <= height <= 255)')}
                onBlur={() => setHeightPlaceholder('Please enter')}
                textAlign="left"
              />
            }
          />

         <Cell
                      title="BarCode Type"
                      vertical
                      value={barCodeTypeMap[barCodeType] || 'code39'}
                      isLink
                      onPress={() => {
                        Selector({
                          title: 'Please select',
                          options: [
                            {
                              label: 'upcA',
                              value: IminBarcodeType.upcA,
                            },
                            {
                              label: 'upcE',
                              value: IminBarcodeType.upcE,
                            },
                            {
                              label: 'jan13',
                              value: IminBarcodeType.jan13,
                            },
                            {
                              label: 'jan8',
                              value: IminBarcodeType.jan8,
                            },
                            {
                              label: 'code39',
                              value: IminBarcodeType.code39,
                            },
                            {
                              label: 'itf',
                              value: IminBarcodeType.itf,
                            },
                            {
                              label: 'codabar',
                              value: IminBarcodeType.codabar,
                            },
                            {
                              label: 'code93',
                              value: IminBarcodeType.code93,
                            },
                            {
                              label: 'code128',
                              value: IminBarcodeType.code128,
                            },
                          ],
                          value: barCodeType,
                          cancellable: true,
                        }).then((k) => {
                          setBarCodeType(k as number);
                        });
                      }}
                    />
            <Cell
                      title="BarCode HRI Position"
                      vertical
                      value={
                        position
                          ? position === IminBarcodeTextPos.aboveText
                            ? 'aboveText'
                            : position === IminBarcodeTextPos.belowText
                            ? 'belowText'
                            : 'both'
                          : 'None'
                      }
                      isLink
                      onPress={() => {
                        Selector({
                          title: 'Please select',
                          options: [
                            {
                              label: 'None',
                              value: IminBarcodeTextPos.none,
                            },
                            {
                              label: 'aboveText',
                              value: IminBarcodeTextPos.aboveText,
                            },
                            {
                              label: 'belowText',
                              value: IminBarcodeTextPos.belowText,
                            },
                            {
                              label: 'both',
                              value: IminBarcodeTextPos.both,
                            },
                          ],
                          value: position,
                          cancellable: true,
                        }).then((k) => {
                          setBarCodeHriPosition(k as number);
                        });
                      }}
                    />

          <Cell
            title="Align"
            vertical
            value={
              align
                ? align === IminPrintAlign.center
                  ? 'center'
                  : 'right'
                : 'left'
            }
            isLink
            onPress={() => {
              Selector({
                title: 'Please select',
                options: [
                  {
                    label: 'Left',
                    value: IminPrintAlign.left,
                  },
                  {
                    label: 'Center',
                    value: IminPrintAlign.center,
                  },
                  {
                    label: 'Right',
                    value: IminPrintAlign.right,
                  },
                ],
                value: align,
                cancellable: true,
              }).then((k) => {
                setAlign(k as number);
              });
            }}
          />


          <Blank top={10} bottom={10} />
          <Button
            type="primary"
            text="Print BarCode"
            onPress={() => {
                const width = barCodeWidth ? Number(barCodeWidth) : 2;
                const height = barCodeHeight ? Number(barCodeHeight) : 70;
                PrinterImin.setBarCodeWidth(width);
                PrinterImin.setBarCodeHeight(height);

                PrinterImin.printBarCode(barCodeType,barCodeContent,{
                    position,
                    align,
                });
    
              PrinterImin.printAndFeedPaper(70);
            }}
          />
        </Card>
      </Space>
    </ScrollView>
  );
}
