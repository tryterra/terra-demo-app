import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
} from 'react-native';
import {requestDataScreenStyle} from './requestData.style';
import {utilsStyle} from '../../utils.style';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';

// @ts-ignore
const ImageIcon = ({value}) => {
  var icon =
    value == 'Body'
      ? require('../../../assets/requestData/body.png')
      : value == 'Daily'
      ? require('../../../assets/requestData/daily.png')
      : value == 'Activity'
      ? require('../../../assets/requestData/activity.png')
      : value == 'Menstruation'
      ? require('../../../assets/requestData/menstruation.png')
      : value == 'Sleep'
      ? require('../../../assets/requestData/sleep.png')
      : require('../../../assets/requestData/nuitrition.png');
  return (
    <View
      style={{
        top: -10,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={icon} />
    </View>
  );
};

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
// @ts-ignore
export const RequestDataScreen = ({route, navigation}) => {
  const values: string[] = [
    'Body',
    'Daily',
    'Activity',
    'Sleep',
    'Menstruation',
    'Nutrition',
  ];
  const {user_id, resource, reference_id} = route.params;
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={requestDataScreenStyle.mainContainer}>
        <View style={utilsStyle.header}>
          <Backbutton navigateTo={() => navigation.navigate('Login')} />
          <View style={utilsStyle.headerTextFrame}>
            <Text style={utilsStyle.headerText}>Request Data</Text>
          </View>
          <View style={{width: 31, height: 31}} />
        </View>
        <View style={requestDataScreenStyle.componentContainer}>
          {values.map(value => (
            <TouchableOpacity
              style={requestDataScreenStyle.component}
              onPress={() =>
                navigation.navigate('Date', {
                  requestedDataType: value,
                  user_id: user_id,
                  resource: resource,
                  reference_id: reference_id,
                })
              }>
              <ImageIcon value={value} />
              <Text style={requestDataScreenStyle.buttonText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};
