import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {DataScreenStyle} from './screens/data/data.style';
import {utilsStyle} from './utils.style';
import Ionicons from 'react-native-vector-icons/Ionicons';

/// A function that takes a Date object and returns a string that represents the date in the format of "DD MMM YYYY".
export const showDateText = (date: Date) => {
  var day = date.getDate(); //To get the Current Date
  var month = date.toLocaleString('default', {month: 'short'}); //To get the Current Month
  var year = date.getFullYear(); //To get the Current Year
  return day + ' ' + month + ' ' + year;
};

/// A function that takes a Date object and returns a string that represents the date in the format of "YYYY-MM-DD".
export const dateParam = (date: Date) => {
  return date.toISOString().split('T')[0];
};

/// A function that takes a Date object and returns a string that represents the date in the format of "DD MonthName YYYY".
export const showDateTextLong = (date: Date) => {
  var day = date.getDate(); //To get the Current Date
  var month = date.toLocaleString('default', {month: 'long'}); //To get the Current Month
  var year = date.getFullYear(); //To get the Current Year
  return day + ' ' + month + ' ' + year;
};

/// A component that displays a date picker and a "Done" button. It takes a setDate function, a value of type Date, and an optional
/// onDismiss function that will be called when the user dismisses the picker.
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

/// A component that displays a button with a title.
/// It takes an onPress function that will be called when the button is pressed, a title string,
/// a styleButton object of type ViewStyle that will be used to style the button,
/// and a textStyle object of type TextStyle that will be used to style the text inside the button.
interface appButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  styleButton: any;
  textStyle: any;
  icon?: ImageSourcePropType;
}
export const AppButton = ({
  onPress,
  title,
  styleButton,
  textStyle,
}: appButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styleButton}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

/// A component that displays a button with an icon and a title.
/// It takes an onPress function that will be called when the button is pressed, a title string,
/// a styleButton object of type ViewStyle that will be used to style the button,
/// a textStyle object of type TextStyle that will be used to style the text inside the button,
/// and an icon of type ImageSourcePropType that will be used to display the icon.
export const AppButtonWithIcon = ({
  onPress,
  title,
  styleButton,
  textStyle,
  icon,
}: appButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styleButton}>
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {icon && <Image source={icon} />}
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export type JSONValue = string | number | boolean | null | JSONValue[];

/// A function that takes a JSON object and returns the first leaf node of the object.
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

/// An array of tuples that represents example data entries.
export var example_entries: [string, string][] = [
  ['Weight', '78.6kg'],
  ['Height', '5.6ft'],
  ['BloodSugar', '99 mg/dL'],
  ['BloodPressure', '99 mg/dL'],
  ['Data', '99 mg/dL'],
];

/// A component that displays a date picker and a "Done" button. It takes a testID string,
/// a value of type Date, a mode string that determines the mode of the picker,
/// a is24Hour boolean that determines whether to use a 24-hour clock,
/// an onChange function that will be called when the user selects a date,
/// a display string that determines the display mode of the picker,
/// and an optional onDismiss function that will be called when the user dismisses the picker.
export const DatePopUp = (props: {
  testID: string | undefined;
  value: Date;
  is24Hour: boolean | undefined;
  onChange:
    | ((event: DateTimePickerEvent, date?: Date | undefined) => void)
    | undefined;
  onDismiss: ((event: GestureResponderEvent) => void) | undefined;
}) => {
  return (
    <View style={{justifyContent: 'flex-end'}}>
      <DateTimePicker
        testID={props.testID}
        value={props.value}
        mode={'date'}
        is24Hour={props.is24Hour}
        onChange={props.onChange}
        display={'spinner'}
      />
      <TouchableOpacity
        onPress={props.onDismiss}
        style={DataScreenStyle.connectionPopUpButton}>
        <Text style={DataScreenStyle.connectText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

/// A component that displays a back button with an arrow icon.
/// It takes a navigateTo function that will be called when the button is pressed.
export const Backbutton = (props: {
  navigateTo: ((event: GestureResponderEvent) => void) | undefined;
}) => (
  <TouchableOpacity style={utilsStyle.backButton} onPress={props.navigateTo}>
    <Ionicons
      name="arrow-back-sharp"
      size={25}
      style={utilsStyle.backButton.backArrow}
    />
  </TouchableOpacity>
);
