import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Alert, Text, TouchableOpacity} from 'react-native';
import {DataScreenStyle} from './data.style';
import BottomSheet from './BottomSheet';
import {DateScreenStyle} from '../date/date.style';
import * as WebBrowser from 'expo-web-browser';
import {Backbutton} from '../requestData/requestData.screen';
import {utilsStyle} from '../../utils.style';
import {api_key} from '../../../env';
import {
  DatePopUp,
  AppButton,
  showDateText,
  AppButtonWithIcon,
  getLeafElement,
  JSONValue,
} from '../../utils.component';
import {
  Connections,
  DataMessage,
  getActivity,
  getBody,
  getDaily,
  getMenstruation,
  getNutrition,
  getSleep,
} from 'terra-react';
import {getWidgetAsync} from '../onboarding/onboarding.screen';

// A custom component that takes two props, name and data, and renders them as two Text components in a row.
// @ts-ignore
const Row = props => {
  return (
    <View style={[props.style]}>
      <Text>{props.name}</Text>
      <Text>{props.data}</Text>
    </View>
  );
};

/// A custom component that renders three buttons for connecting to different health data sources.
const ConnectionPopUp = (props: {cancelOnPress: any}) => {
  const [url, setUrl] = useState('');
  const _handlePressButtonAsync = async () => {
    await getWidgetAsync({onSuccess: setUrl});
    await WebBrowser.openBrowserAsync(url);
    // setResult(result);
  };
  useEffect(() => {
    getWidgetAsync({onSuccess: setUrl});
  }, []);
  return (
    <View>
      <View style={DataScreenStyle.sliderIndicatorRow}>
        <View style={DataScreenStyle.sliderIndicator} />
      </View>
      <AppButton
        styleButton={DataScreenStyle.button1}
        textStyle={DataScreenStyle.connectText}
        onPress={_handlePressButtonAsync}
        title="Connect a Widget"
      />
      <AppButton
        styleButton={DataScreenStyle.button2}
        textStyle={DataScreenStyle.connectText}
        onPress={() => Alert.alert('Simple Button pressed')}
        title="Connect a Device"
      />
      <AppButton
        styleButton={DataScreenStyle.button3}
        textStyle={DataScreenStyle.cancelText}
        onPress={props.cancelOnPress}
        title="Cancel"
      />
    </View>
  );
};

/// Performing mobile SDKs data request for APPLE GOOGLE SAMSUNG FREESTYLE_LIBRE. Detail check:
/// https://docs.tryterra.co/reference/reference-react-native-sdk.
// @ts-ignore
const native_data = async props => {
  var response: DataMessage;
  if (props.requestedDataType.toLowerCase() == 'body') {
    response = await getBody(
      props.connection,
      props.fromDate,
      props.toDate,
      false,
      false,
    );
  } else if (props.requestedDataType.toLowerCase() == 'daily') {
    response = await getDaily(
      props.connection,
      props.fromDate,
      props.toDate,
      false,
    );
  } else if (props.requestedDataType.toLowerCase() == 'activity') {
    response = await getActivity(
      props.connection,
      props.fromDate,
      props.toDate,
      false,
    );
  } else if (props.requestedDataType.toLowerCase() == 'menstruation') {
    response = await getMenstruation(
      props.connection,
      props.fromDate,
      props.toDate,
      false,
    );
  } else if (props.requestedDataType.toLowerCase() == 'nutrition') {
    response = await getNutrition(
      props.connection,
      props.fromDate,
      props.toDate,
      false,
    );
  } else if (props.requestedDataType.toLowerCase() == 'sleep') {
    response = await getSleep(
      props.connection,
      props.fromDate,
      props.toDate,
      false,
    );
  }
  // @ts-ignore
  const health_key = Object.keys(response.data['data'][0]);
  var result_payload: [string, JSONValue][] = [];
  health_key.map(key => {
    // @ts-ignore
    var first_element = getLeafElement(response.data['data'][0][key]);
    if (first_element == null || first_element == undefined) {
      first_element = 'empty';
    }
    result_payload.push([key, first_element]);
  });
  props.setPayloadMethod(result_payload);
};

/// Performing request through directly querying Terra API EndPoint. Detail example check:
/// https://docs.tryterra.co/reference/get-activity-data
// @ts-ignore
const api_request_data = async props => {
  try {
    const response = await fetch(
      `https://api.tryterra.co/v2/${props.requestedDataType.toLowerCase()}?user_id=${
        props.user_id
      }&start_date=${props.fromDate}&end_date=${
        props.toDate
      }&to_webhook=false&with_samples=false`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'dev-id': 'testingTerra',
          'x-api-key': api_key,
        },
      },
    );
    const json = await response.json();
    const health_key = Object.keys(json.data[0]);
    var result_payload: [string, JSONValue][] = [];
    health_key.map(key => {
      var first_element = getLeafElement(json.data[0][key]);
      if (first_element == null || first_element == undefined) {
        first_element = 'empty';
      }
      result_payload.push([key, first_element]);
    });
    props.setPayloadMethod(result_payload);

    return json;
  } catch (error) {
    console.error(error);
  }
};

/// This component provides functionality for the user to select a health data type,
/// connect to a health data source, and view health data within a specified date range.
// @ts-ignore
export const DataScreen = ({route, navigation}) => {
  const {
    previousFromDate,
    previousToDate,
    requestedDataType,
    user_id,
    reference_id,
    resource,
  } = route.params;
  const [openModal, setopenModal] = useState(false);
  const [fromDate, setFromDate] = useState(new Date(previousFromDate));
  const [toDate, setToDate] = useState(new Date(previousToDate));
  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);
  const [payload, setPayload] = useState([]);
  const onChangeFromDate = (
    event: any,
    selectedDate: React.SetStateAction<Date>,
  ) => {
    setFromDate(selectedDate);
  };
  const onChangeToDate = (
    event: any,
    selectedDate: React.SetStateAction<Date>,
  ) => {
    setToDate(selectedDate);
  };

  /// request that checks if the resource variable is equal to APPLE, GOOGLE, or SAMSUNG.
  /// If it is, the function calls native_data with some arguments, otherwise it calls api_request_data.
  const request = () => {
    if (resource == 'APPLE' || resource == 'GOOGLE' || resource == 'SAMSUNG') {
      let connection;
      if (resource == 'APPLE') {
        connection = Connections.APPLE_HEALTH;
      } else if (resource == 'GOOGLE') {
        connection = Connections.GOOGLE;
      } else if (resource == 'SAMSUNG') {
        connection = Connections.SAMSUNG;
      }
      native_data({
        connection: connection,
        setPayloadMethod: setPayload,
        fromDate: fromDate,
        toDate: toDate,
        requestedDataType: requestedDataType,
      });
    } else {
      api_request_data({
        setPayloadMethod: setPayload,
        fromDate: previousFromDate,
        toDate: previousToDate,
        requestedDataType: requestedDataType,
        user_id: user_id,
        reference_id: reference_id,
        resource: resource,
      });
    }
  };
  useEffect(() => {
    request();
  }, [
    previousFromDate,
    previousToDate,
    reference_id,
    requestedDataType,
    resource,
    user_id,
  ]);
  var entries: [string, string][] = payload;

  // @ts-ignore
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <View>
        <View style={utilsStyle.header}>
          <Backbutton navigateTo={() => navigation.goBack()} />
          <View style={utilsStyle.headerTextFrame}>
            <Text style={utilsStyle.headerText}>Body Data</Text>
          </View>
          <View style={{width: 31, height: 31}} />
        </View>
        <View
          style={{
            alignSelf: 'center',
            top: 30,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          <TouchableOpacity
            onPress={() => setFromShow(true)}
            style={DataScreenStyle.dateContainer}>
            <Text style={DataScreenStyle.dateText}>From:</Text>
            <Text style={DateScreenStyle.dateText2}>
              {showDateText(fromDate)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setToShow(true)}
            style={DataScreenStyle.dateContainer}>
            <Text style={DataScreenStyle.dateText}>To:</Text>
            <Text style={DateScreenStyle.dateText2}>
              {showDateText(toDate)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[DataScreenStyle.mainDataFrame, {alignSelf: 'center'}]}>
          {entries.map((entry, index) => {
            if (index <= 10) {
              return (
                <Row
                  key={entry}
                  style={
                    index % 2 == 0
                      ? DataScreenStyle.whiteRow
                      : DataScreenStyle.blueRow
                  }
                  name={entry[0]}
                  data={entry[1]}
                />
              );
            }
          })}
        </View>
        <View
          style={{
            alignSelf: 'center',
            top: 60,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          <AppButtonWithIcon
            styleButton={DataScreenStyle.connectButton}
            icon={require('../../../assets/data/watch.png')}
            textStyle={DataScreenStyle.connectButton.text}
            title="Connect"
            onPress={() => {
              setopenModal(true);
            }}
          />
          <AppButtonWithIcon
            styleButton={DataScreenStyle.connectButton}
            icon={require('../../../assets/data/file.png')}
            textStyle={DataScreenStyle.connectButton.text}
            title="Request Data"
            onPress={() => {
              request();
            }}
          />
        </View>
        {openModal && (
          <BottomSheet
            onDismiss={() => {
              setopenModal(false);
            }}>
            <ConnectionPopUp
              cancelOnPress={() => {
                setopenModal(false);
              }}
            />
          </BottomSheet>
        )}
        {fromShow && (
          <BottomSheet
            onDismiss={() => {
              setFromShow(false);
            }}>
            <DatePopUp
              testID="dateTimePicker"
              value={fromDate}
              mode={'date'}
              is24Hour={true}
              // @ts-ignore
              onChange={onChangeFromDate}
              display="spinner"
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
            <DatePopUp
              testID="dateTimePicker"
              value={toDate}
              mode={'date'}
              is24Hour={true}
              // @ts-ignore
              onChange={onChangeToDate}
              display="spinner"
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
