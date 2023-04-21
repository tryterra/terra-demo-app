import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoadingScreen} from './screens/loading/loading.screen';
import {LoginScreen} from './screens/login/login.screen';
import {RequestDataScreen} from './screens/requestData/requestData.screen';
import {DateScreen} from './screens/date/date.screen';
import {DataScreen} from './screens/data/data.screen';
import {OnboardingScreen} from './screens/onboarding/onboarding.screen';

/// This is a component from the @react-navigation/native-stack library that creates a stack navigator.
const Stack = createNativeStackNavigator();

/// This is the main function that sets up the navigation for the app.
/// It creates a stack navigator, sets up a linking configuration to handle deep links and redirection from browser back to app,
/// and defines the screens for the app.
function AppNavigation() {
  const config = {
    screens: {
      RequestData: {
        path: 'request',
        parse: {
          user_id: (user_id: any) => String(user_id),
          reference_id: (reference_id: any) => String(reference_id),
          resource: (resource: any) => String(resource),
        },
      },
      Login: {
        path: 'login',
      },
    },
  };
  const linking = {
    prefixes: ['https://terraficapp.com', 'terraficapp://'],
    config,
  };
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={LoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="RequestData" component={RequestDataScreen} />
        <Stack.Screen name="Date" component={DateScreen} />
        <Stack.Screen name="Data" component={DataScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <LoadingScreen />
  );
}

export default AppNavigation;
