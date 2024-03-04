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
  IminTypeface,
  IminFontStyle,
} from 'react-native-printer-imin';
export default function PrintText() {
  const [textValue, setTextValue] = React.useState(
    'iMin advocates the core values of "Integrity, Customer First, Invention&Creation, Patience”, using cloud-based technology to help businesses to get  access to the Internet and also increases their data base, by providing more solutions so that their business can take a step further. Through their efficiency enhancement, cost improvement, service innovation, and  better services for consumers, these aspect will drives the entire industry development.'
  );
  const [letterSpacing, setLetterSpacing] = React.useState('');
  const [fontSize, setFontSize] = React.useState('');
  const [lineHeight, setLineHeight] = React.useState('');
  const [wordWrap, setWordWrap] = React.useState<number>(-1);
  const [reverseWhite, setReverseWhite] = React.useState<number>(-1);
  const [underLine, setUnderLine] = React.useState<number>(-1);
  const [throughLine, setThroughLine] = React.useState<number>(-1);
  const [align, setAlign] = React.useState<number>(IminPrintAlign.left);
  const [typeface, setTypeface] = React.useState<number>(IminTypeface.Default);
  const [fontStyle, setFontStyle] = React.useState<number>(
    IminFontStyle.normal
  );
  return (
    <ScrollView>
      <Space direction="vertical">
        <Card>
          <Cell
            title="Content"
            vertical
            value={
              <TextInput
                type="textarea"
                value={textValue}
                placeholder="Please enter ..."
                bordered
                maxLength={1000}
                showWordLimit
                onChange={(value) => setTextValue(value)}
              />
            }
          />
          <Cell
            title="Letter Spacing"
            value={
              <TextInput
                value={letterSpacing}
                onChange={(value) => setLetterSpacing(value)}
                placeholder="Please enter ..."
                textAlign="right"
              />
            }
          />
          <Cell
            title="Line Height"
            value={
              <TextInput
                value={lineHeight}
                onChange={(value) => setLineHeight(value)}
                placeholder="Please enter ..."
                textAlign="right"
              />
            }
          />
          <Cell
            title="Font Size"
            value={
              <TextInput
                value={fontSize}
                onChange={(value) => setFontSize(value)}
                placeholder="Please enter ..."
                textAlign="right"
              />
            }
          />
          <Cell
            title="Word wrap"
            value={
              wordWrap !== -1 ? (Number(wordWrap) ? 'Yes' : 'No') : 'Default'
            }
            isLink
            onPress={() => {
              Selector({
                title: 'Please select',
                options: [
                  {
                    label: 'Default',
                    value: -1,
                  },
                  {
                    label: 'Yes',
                    value: 1,
                  },
                  {
                    label: 'No',
                    value: 0,
                  },
                ],
                value: wordWrap,
                cancellable: true,
              }).then((k) => {
                setWordWrap(k as number);
              });
            }}
          />
          <Cell
            title="Reverse White"
            value={
              reverseWhite !== -1
                ? Number(reverseWhite)
                  ? 'Yes'
                  : 'No'
                : 'Default'
            }
            isLink
            onPress={() => {
              Selector({
                title: 'Please select',
                options: [
                  {
                    label: 'Default',
                    value: -1,
                  },
                  {
                    label: 'Yes',
                    value: 1,
                  },
                  {
                    label: 'No',
                    value: 0,
                  },
                ],
                value: reverseWhite,
                cancellable: true,
              }).then((k) => {
                setReverseWhite(k as number);
              });
            }}
          />
          <Cell
            title="Under Line"
            value={
              underLine !== -1 ? (Number(underLine) ? 'Yes' : 'No') : 'Default'
            }
            isLink
            onPress={() => {
              Selector({
                title: 'Please select',
                options: [
                  {
                    label: 'Default',
                    value: -1,
                  },
                  {
                    label: 'Yes',
                    value: 1,
                  },
                  {
                    label: 'No',
                    value: 0,
                  },
                ],
                value: underLine,
                cancellable: true,
              }).then((k) => {
                setUnderLine(k as number);
              });
            }}
          />
          <Cell
            title="Through Line"
            value={
              throughLine !== -1
                ? Number(throughLine)
                  ? 'Yes'
                  : 'No'
                : 'Default'
            }
            isLink
            onPress={() => {
              Selector({
                title: 'Please select',
                options: [
                  {
                    label: 'Default',
                    value: -1,
                  },
                  {
                    label: 'Yes',
                    value: 1,
                  },
                  {
                    label: 'No',
                    value: 0,
                  },
                ],
                value: throughLine,
                cancellable: true,
              }).then((k) => {
                setThroughLine(k as number);
              });
            }}
          />
          <Cell
            title="Align"
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
          <Cell
            title="Typeface"
            value={
              typeface
                ? typeface === IminTypeface.Monospace
                  ? 'Monospace'
                  : typeface === IminTypeface.DefaultBold
                  ? 'DefaultBold'
                  : typeface === IminTypeface.SansSerif
                  ? 'SansSerif'
                  : 'Serif'
                : 'Default'
            }
            isLink
            onPress={() => {
              Selector({
                title: 'Please select',
                options: [
                  {
                    label: 'Default',
                    value: IminTypeface.Default,
                  },
                  {
                    label: 'Monospace',
                    value: IminTypeface.Monospace,
                  },
                  {
                    label: 'DefaultBold',
                    value: IminTypeface.DefaultBold,
                  },
                  {
                    label: 'SansSerif',
                    value: IminTypeface.SansSerif,
                  },
                  {
                    label: 'Serif',
                    value: IminTypeface.Serif,
                  },
                ],
                value: typeface,
                cancellable: true,
              }).then((k) => {
                setTypeface(k as number);
              });
            }}
          />
          <Cell
            title="Font Style"
            value={
              fontStyle
                ? fontStyle === IminFontStyle.bold
                  ? 'Bold'
                  : fontStyle === IminFontStyle.italic
                  ? 'Italic'
                  : 'BoldItalic'
                : 'Normal'
            }
            isLink
            onPress={() => {
              Selector({
                title: 'Please select',
                options: [
                  {
                    label: 'Normal',
                    value: IminFontStyle.normal,
                  },
                  {
                    label: 'Bold',
                    value: IminFontStyle.bold,
                  },
                  {
                    label: 'Italic',
                    value: IminFontStyle.italic,
                  },
                  {
                    label: 'BoldItalic',
                    value: IminFontStyle.boldItalic,
                  },
                ],
                value: fontStyle,
                cancellable: true,
              }).then((k) => {
                setFontStyle(k as number);
              });
            }}
          />
          <Blank top={10} bottom={10} />
          <Button
            type="primary"
            text="Print Text"
            onPress={() => {
              PrinterImin.printTextBitmap(textValue, {
                align,
                fontSize: fontSize ? Number(fontSize) : undefined,
                typeface,
                wordWrap: wordWrap !== -1 ? Boolean(wordWrap) : undefined,
                reverseWhite:
                  reverseWhite !== -1 ? Boolean(reverseWhite) : undefined,
                throughline:
                  throughLine !== -1 ? Boolean(throughLine) : undefined,
                underline: underLine !== -1 ? Boolean(underLine) : undefined,
                fontStyle,
              });
              PrinterImin.printAndFeedPaper(70);
            }}
          />
        </Card>
      </Space>
    </ScrollView>
  );
}
