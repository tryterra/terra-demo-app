import React from 'react';
import {SafeAreaView, View, Alert, Text} from 'react-native';
import {loginStyle} from './login.style';
import {AppButton} from '../../utils.component';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../app.navigator';

/// This code defines the LoginScreen component which renders a screen that allows the user to connect their fitness tracker widget
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
export const LoginScreen = ({navigation}: Props) => {
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
          onPress={() => navigation.navigate('Onboarding')}
          title="Connect a Widget"
        />
      </View>
    </SafeAreaView>
  );
};
