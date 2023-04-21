import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, Image} from 'react-native';
import {requestDataScreenStyle} from './requestData.style';
import {utilsStyle} from '../../utils.style';
import {Backbutton} from '../../utils.component';

/**
Renders an icon based on the provided value.
@param {string} value - The value to determine the icon to display.
@return {JSX.Element} - The icon component.
 */
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

/**
Renders the request data screen.
@param {Object} props - The props to pass to the component.
@param {Object} props.route - The route object containing information about the current screen.
@param {Object} props.navigation - The navigation object used for screen navigation.
@return {JSX.Element} - The request data screen component.
*/
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
              key={value}
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
