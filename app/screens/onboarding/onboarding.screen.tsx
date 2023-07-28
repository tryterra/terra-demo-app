import React, {useEffect, useRef} from 'react';
import {SafeAreaView, View, Text, Image, Linking} from 'react-native';
import {onboardingStyle} from './onboarding.style';
import * as WebBrowser from 'expo-web-browser';
import {api_key} from '../../../env';
import {AppButton} from '../../utils.component';
import {getWidgetAsync} from '../../helpers/helpers';

/// The OnboardingScreen component uses the useState and useEffect hooks to manage the state of the url variable
/// and to fetch the widget session URL from the Terra API when the component is mounted.
/// It also includes a _handleURL function to close the browser when the authentication is completed and a _handlePressButtonAsync function to open the browser for authentication using the widget components.
/// To understand what this is doing detail: https://docs.tryterra.co/docs/authenticate-widget
/// You can choose to use terra in-build library through link above
// or alternatively querying API endPoint as below: This function refers to: https://docs.tryterra.co/reference/generate-widget-session
export const OnboardingScreen = () => {
  const url = useRef('');
  /// Close the browser when authentication is completed.
  /// Authentication completion can be detected by listening to the incoming link.
  const _handleURL = (event: {url: any}) => {
    WebBrowser.dismissBrowser();
    console.log('redirected url: ', event.url);
  };

  /// Open the browser for authentication using the Widget components.
  const _handlePressButtonAsync = async () => {
    url.current = await getWidgetAsync();
    await WebBrowser.openBrowserAsync(url.current);
  };

  useEffect(() => {
    Linking.addEventListener('url', _handleURL);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={onboardingStyle.mainContainer}>
        <View style={onboardingStyle.imageContainer}>
          <Image
            style={{height: 270, width: 270}}
            source={require('../../../assets/onboarding/image1.png')}
          />
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
