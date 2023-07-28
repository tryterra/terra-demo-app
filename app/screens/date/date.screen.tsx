import React, {useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {DateScreenStyle} from './date.style';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import BottomSheet from '../data/BottomSheet';
import {utilsStyle} from '../../utils.style';
import {
  AppButton,
  Backbutton,
  dateParam,
  DateTimePickerAdvance,
  showDateTextLong,
} from '../../utils.component';
import {RootStackParamList} from '../../app.navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

/// This is a React functional component that renders a screen for choosing dates for data request.
/// It receives the necessary route parameters from its parent component.
/// It uses React hooks to manage state, including the selected dates and whether to show the date pickers.
/// It also uses various imported components from utils.component to structure and render the screen.
/// The component also contains logic to handle button presses and navigation to the next screen.
type Props = NativeStackScreenProps<RootStackParamList, 'Date'>;
export const DateScreen = ({route, navigation}: Props) => {
  const {user_id, resource, reference_id, requestedDataType} = route.params;
  const today = new Date();
  const yesterday = new Date();
  const [fromDate, setFromDate] = useState(
    new Date(yesterday.setDate(yesterday.getDate() - 1)),
  );
  const [toDate, setToDate] = useState(today);
  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);
  const calendar = (
    <EvilIcons name="calendar" size={35} style={DateScreenStyle.icon} />
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <View style={DateScreenStyle.mainContainer}>
        <View style={utilsStyle.header}>
          <Backbutton navigateTo={() => navigation.goBack()} />
          <View style={utilsStyle.headerTextFrame}>
            <Text style={utilsStyle.headerText}>Request Data</Text>
          </View>
          <View style={{width: 31, height: 31}} />
        </View>
        <View style={DateScreenStyle.chooseDateCard}>
          <Text style={DateScreenStyle.text}>Choose Date</Text>
          <View style={{flexDirection: 'column', gap: 16}}>
            <View style={DateScreenStyle.dateInputFrame}>
              <Text style={DateScreenStyle.dateText}>From:</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <AppButton
                  title={showDateTextLong(fromDate)}
                  onPress={() => {
                    setFromShow(true);
                  }}
                  textStyle={DateScreenStyle.dateText2}
                  styleButton={undefined}
                />
                {calendar}
              </View>
            </View>
            <View style={DateScreenStyle.dateInputFrame}>
              <Text style={DateScreenStyle.dateText}>To:</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <AppButton
                  title={showDateTextLong(toDate)}
                  onPress={() => {
                    setToShow(true);
                  }}
                  textStyle={DateScreenStyle.dateText2}
                  styleButton={undefined}
                />
                {calendar}
              </View>
            </View>
          </View>
          <View style={DateScreenStyle.dateDisplayer}>
            <Text style={DateScreenStyle.displayedDateText}>
              The data you’re requesting will be displayed for the date range
              you select here.
            </Text>
          </View>
        </View>
      </View>
      <View style={DateScreenStyle.continueFrame}>
        <AppButton
          title="Cancel Request"
          onPress={() => navigation.goBack()}
          textStyle={
            DateScreenStyle.continueFrame.buttonContainer.appButtonTextBlack
          }
          styleButton={undefined}
        />
        <AppButton
          title="Continue"
          styleButton={DateScreenStyle.continueFrame.buttonContainer}
          onPress={() =>
            navigation.navigate('Data', {
              previousFromDate: dateParam(fromDate),
              previousToDate: dateParam(toDate),
              requestedDataType: requestedDataType,
              user_id: user_id,
              resource: resource,
              reference_id: reference_id,
            })
          }
          textStyle={
            DateScreenStyle.continueFrame.buttonContainer.appButtonTextWhite
          }
        />
      </View>
      <View>
        {fromShow && (
          <BottomSheet
            onDismiss={() => {
              setFromShow(false);
            }}>
            <DateTimePickerAdvance
              value={fromDate}
              setDate={setFromDate}
              onDismiss={() => {
                setFromShow(false);
              }}
            />
          </BottomSheet>
        )}
        {toShow && (
          <BottomSheet
            onDismiss={() => {
              setToShow(false);
            }}>
            <DateTimePickerAdvance
              value={toDate}
              setDate={setToDate}
              onDismiss={() => {
                setToShow(false);
              }}
            />
          </BottomSheet>
        )}
      </View>
    </SafeAreaView>
  );
};
