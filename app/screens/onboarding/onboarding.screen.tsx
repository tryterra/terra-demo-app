import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Image, Linking} from 'react-native';
import {onboardingStyle} from './onboarding.style';
import * as WebBrowser from 'expo-web-browser';
import {api_key} from '../../../env';
import {AppButton} from '../../utils.component';

// @ts-ignore

/// The getWidgetAsync function is an asynchronous function that fetches the widget session URL from the Terra API
/// and sets the url state using the setUrl function.
/// It takes an object with an onSuccess callback function as a parameter to set state back to the main component.
/// This function refers to: https://docs.tryterra.co/reference/generate-widget-session
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

/// The OnboardingScreen component uses the useState and useEffect hooks to manage the state of the url variable
/// and to fetch the widget session URL from the Terra API when the component is mounted.
/// It also includes a _handleURL function to close the browser when the authentication is completed and a _handlePressButtonAsync function to open the browser for authentication using the widget components.
/// To understand what this is doing detail: https://docs.tryterra.co/docs/authenticate-widget
/// You can choose to use terra in-build library through link above
// or alternatively querying API endPoint as below: This function refers to: https://docs.tryterra.co/reference/generate-widget-session
export const OnboardingScreen = () => {
  const [url, setUrl] = useState('');
  // /// Close the browser when authentication is completed.
  // /// Authentication completion can be detected by listening to the incoming link.
  const _handleURL = (event: {url: any}) => {
    WebBrowser.dismissBrowser();
    console.log(event.url);
  };
  // /// Open the browser for authentication using the Widget components.
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
      <View style={onboardingStyle.mainContainer}>
        <View style={onboardingStyle.imageContainer}>
          <Image source={require('../../../assets/onboarding/image1.png')} />
        </View>
        <View style={onboardingStyle.textContainer}>
          <Text style={onboardingStyle.text}>
            Widget to connect your app to all wearables
          </Text>
        </View>
        <View style={onboardingStyle.switchingBar}>
          <View style={onboardingStyle.circle1} />
          <View style={onboardingStyle.circle2} />
          <View style={onboardingStyle.circle2} />
        </View>
        <View style={onboardingStyle.textContainer2}>
          <Text style={onboardingStyle.text2}>
            Unlock to power of health data
          </Text>
        </View>
        <AppButton
          textStyle={onboardingStyle.appButtonText}
          styleButton={onboardingStyle.button1}
          onPress={_handlePressButtonAsync}
          title="Connect a Device"
        />
      </View>
    </SafeAreaView>
  );
};
