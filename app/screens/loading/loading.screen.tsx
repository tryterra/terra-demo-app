import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, TouchableWithoutFeedback} from 'react-native';
import {loadingStyle} from './loading.style';
/// create a .env under file under the project directory and put your api_key.
import {mobile_api_keu} from '../../../env';
import {Connections, getUserId, initConnection, initTerra} from 'terra-react';

/// This is a React Native functional component that displays a loading screen while initializing a connection to a health app API
/// Setup for mobile SDKs: https://docs.tryterra.co/docs/react-native-project
/// This is the only way to obtain data from APPLE, SAMSUNG, GOOGLE, FREESTYLE_LIBRE currently.
// @ts-ignore
export const LoadingScreen = ({navigation}) => {
  /// You must include Privacy setting to Info.list before doing this. Check Terra Guild for more detail
  /// Setup for mobile SDKs: https://docs.tryterra.co/docs/react-native-project
  const start_connection = async () => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'dev-id': 'testing',
        'x-api-key': mobile_api_keu,
      },
    };
    try {
      const response = await fetch(
        'https://api.tryterra.co/v2/auth/generateAuthToken',
        options,
      );
      const json = await response.json();
      const terraClient = await initTerra('testing', 'Jeffrey');
      const connection = await initConnection(
        Connections.APPLE_HEALTH,
        json.token,
        false,
      );
      console.log(connection);
      console.log(await getUserId(0));
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    start_connection();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
        <View style={loadingStyle.mainContainer}>
          <Text style={loadingStyle.terraLogo}>Terra</Text>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
