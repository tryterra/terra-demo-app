import React from 'react';
import {
  SafeAreaView,
  Button,
  View,
  Alert,
  Text,
  TouchableOpacity, Image,
} from 'react-native';
import {onboardingStyle} from './onboarding.style';

// @ts-ignore
const AppButton = ({onPress, title, styleButton}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styleButton}>
      <Text style={onboardingStyle.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export const OnboardingScreen = () => {
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
          styleButton={onboardingStyle.button1}
          onPress={() => Alert.alert('Simple Button pressed')}
          title="Connect a Device"
        />

      </View>
    </SafeAreaView>
  );
};
