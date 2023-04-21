import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Alert, Text, Linking} from 'react-native';
import {loginStyle} from './login.style';
import * as WebBrowser from 'expo-web-browser';
import {api_key} from '../../../env';
import {AppButton} from '../../utils.component';

export const getWidgetAsync = async (props: {onSuccess: any}) => {
  try {
    const response = await fetch(
      'https://api.tryterra.co/v2/auth/generateWidgetSession',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'dev-id': 'testingTerra',
          'content-type': 'application/json',
          'x-api-key': api_key,
        },
        body: JSON.stringify({
          reference_id: 'your_users_id',
          providers:
            'GARMIN,WITHINGS,FITBIT,GOOGLE,OURA,WAHOO,PELOTON,ZWIFT,TRAININGPEAKS,FREESTYLELIBRE,DEXCOM,COROS,HUAWEI,OMRON,RENPHO,POLAR,SUUNTO,EIGHT,APPLE,CONCEPT2,WHOOP,IFIT,TEMPO,CRONOMETER,FATSECRET,NUTRACHECK,UNDERARMOUR',
          language: 'en',
          auth_success_redirect_url: 'terraficapp://request',
          auth_failure_redirect_url: 'terraficapp://login',
        }),
      },
    );
    const json = await response.json();
    props.onSuccess(json.url);
  } catch (error) {
    console.error(error);
  }
};

export const LoginScreen = () => {
  const [url, setUrl] = useState('');

  const _handleURL = (event: {url: any}) => {
    WebBrowser.dismissBrowser();
    console.log(event.url);
  };
  const _handlePressButtonAsync = async () => {
    getWidgetAsync({onSuccess: setUrl});
    await WebBrowser.openBrowserAsync(url);
  };
  useEffect(() => {
    getWidgetAsync({onSuccess: setUrl});
    Linking.addEventListener('url', _handleURL);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={loginStyle.mainContainer}>
        <Text style={loginStyle.terraLogo}>Terra</Text>
        <AppButton
          styleButton={loginStyle.button1}
          textStyle={loginStyle.appButtonText}
          onPress={() => Alert.alert('This function is coming soon')}
          title="Connect a Device"
        />
        <AppButton
          styleButton={loginStyle.button2}
          textStyle={loginStyle.appButtonText}
          onPress={_handlePressButtonAsync}
          title="Connect a Widget"
        />
      </View>
    </SafeAreaView>
  );
};
