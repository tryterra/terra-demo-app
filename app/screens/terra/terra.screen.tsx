import React from 'react';
import {
  SafeAreaView,
  View,
  Alert,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {terraStyle} from './terra.style';
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// @ts-ignore
const AppButton = ({onPress, title, styleButton}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styleButton}>
      <Text style={terraStyle.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const HeartbeatIcon = (
  <FontAwesome name="heartbeat" size={25} style={terraStyle.icon} />
);

export const TerraScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={terraStyle.mainContainer}>
        <View style={terraStyle.terraExclude}>
          <Image source={require('../../../assets/logo/Exclude.png')} />
        </View>
        <View style={terraStyle.textContainer1}>
          <Text style={terraStyle.text1}>
            Terra widget demo uses Terra to connect your wearable data to their
            services
          </Text>
        </View>
        <View style={terraStyle.rulesContainer}>
          <View style={terraStyle.innerIconTextContainer}>
            {HeartbeatIcon}
            <View>
              <Text style={terraStyle.ruleTitle}>Trusted & secure</Text>
              <Text style={terraStyle.ruleText}>
                Your information is handled anonymously with end-to-end
                encryption. Your credentials are not shared with Terra
              </Text>
            </View>
          </View>
          <View>
            {HeartbeatIcon}
            <Text style={terraStyle.ruleTitle}>Trusted & secure</Text>
            <Text style={terraStyle.ruleText}>
              Your information is handled anonymously with end-to-end
              encryption. Your credentials are not shared with Terra
            </Text>
          </View>
          <View>
            {HeartbeatIcon}
            <Text style={terraStyle.ruleTitle}>Trusted & secure</Text>
            <Text style={terraStyle.ruleText}>
              Your information is handled anonymously with end-to-end
              encryption. Your credentials are not shared with Terra
            </Text>
          </View>
          <AppButton
            styleButton={terraStyle.button1}
            onPress={() => Alert.alert('Simple Button pressed')}
            title="Continue"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
