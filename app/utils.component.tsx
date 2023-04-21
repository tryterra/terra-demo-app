import React from 'react';
import {
    Falsy,
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  RecursiveArray,
  RegisteredStyle,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {DataScreenStyle} from "./screens/data/data.style";

export const showDateText = (date: Date) => {
  var day = date.getDate(); //To get the Current Date
  var month = date.toLocaleString('default', {month: 'short'}); //To get the Current Month
  var year = date.getFullYear(); //To get the Current Year
  return day + ' ' + month + ' ' + year;
};

export const dateParam = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const showDateTextLong = (date: Date) => {
  var day = date.getDate(); //To get the Current Date
  var month = date.toLocaleString('default', {month: 'long'}); //To get the Current Month
  var year = date.getFullYear(); //To get the Current Year
  return day + ' ' + month + ' ' + year;
};

export const DateTimePickerAdvance = (props: {
  setDate: (arg0: any) => void;
  value: Date;
  onDismiss: ((event: GestureResponderEvent) => void) | undefined;
}) => {
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    props.setDate(currentDate);
  };
  return (
    <View style={{justifyContent: 'flex-end'}}>
      <DateTimePicker
        testID="dateTimePicker"
        value={props.value}
        mode={'date'}
        is24Hour={true}
        onChange={onChange}
        display="spinner"
      />
      <TouchableOpacity
        onPress={props.onDismiss}
        style={DataScreenStyle.connectionPopUpButton}>
        <Text style={DataScreenStyle.connectText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

// @ts-ignore
export const AppButton = ({onPress, title, styleButton, textStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styleButton}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

// @ts-ignore
export const AppButtonWithIcon = ({onPress, title, styleButton, textStyle, icon}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styleButton}>
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={icon} />
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export type JSONValue = string | number | boolean | null | {} | JSONValue[];

export function getLeafElement(jsonObj: JSONValue): JSONValue {
  if (Array.isArray(jsonObj)) {
    return getLeafElement(jsonObj[0]);
  } else if (typeof jsonObj === 'object' && jsonObj !== null) {
    // @ts-ignore
    const firstValue = jsonObj[Object.keys(jsonObj)[0]];
    return getLeafElement(firstValue);
  } else {
    return jsonObj;
  }
}

export var example_entries: [string, string][] = [
  ['Weight', '78.6kg'],
  ['Height', '5.6ft'],
  ['BloodSugar', '99 mg/dL'],
  ['BloodPressure', '99 mg/dL'],
  ['Data', '99 mg/dL'],
];

export const DatePopUp = (props: {
  testID: string | undefined;
  value: Date;
  mode: string | undefined;
  is24Hour: boolean | undefined;
  onChange:
    | ((event: DateTimePickerEvent, date?: Date | undefined) => void)
    | undefined;
  display: string | undefined;
  onDismiss: ((event: GestureResponderEvent) => void) | undefined;
}) => {
  return (
    <View style={{justifyContent: 'flex-end'}}>
      <DateTimePicker
        testID={props.testID}
        value={props.value}
        // @ts-ignore
        mode={props.mode}
        is24Hour={props.is24Hour}
        onChange={props.onChange}
        // @ts-ignore
        display={props.display}
      />
      <TouchableOpacity
        onPress={props.onDismiss}
        style={DataScreenStyle.connectionPopUpButton}>
        <Text style={DataScreenStyle.connectText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};
