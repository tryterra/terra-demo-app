import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Alert,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {DataScreenStyle} from './data.style';
import BottomSheet from './BottomSheet';
import {DateScreenStyle} from '../date/date.style';
import * as WebBrowser from 'expo-web-browser';
import {utilsStyle} from '../../utils.style';
import {api_key} from '../../../env';
import {
  DatePopUp,
  AppButton,
  showDateText,
  AppButtonWithIcon,
  getLeafElement,
  JSONValue,
  Backbutton,
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
import {getRequestData, getWidgetAsync} from '../../helpers/helpers';
import {RootStackParamList} from '../../app.navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';

// A custom component that takes two props, name and data, and renders them as two Text components in a row.
interface rowProps {
  style: ViewStyle;
  name: string;
  data: JSONValue;
}
const Row = (props: rowProps) => {
  return (
    <View style={[props.style]}>
      <Text>{props.name}</Text>
      <Text>{props.data}</Text>
    </View>
  );
};

/// A custom component that renders three buttons for connecting to different health data sources.
const ConnectionPopUp = (props: {cancelOnPress: any}) => {
  const url = useRef('');
  const _handlePressButtonAsync = async () => {
    url.current = await getWidgetAsync();
  };
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
interface nativeDataProps {
  requestedDataType: string;
  connection: Connections | undefined;
  fromDate: Date;
  toDate: Date;
  setPayloadMethod: React.Dispatch<React.SetStateAction<[string, JSONValue][]>>;
}
const nativeData = async (props: nativeDataProps) => {
  let response: DataMessage;
  const {requestedDataType, connection, fromDate, toDate, setPayloadMethod} =
    props;
  connection ??
    (() => {
      throw new Error("Connection can't be undefined");
    })();
  if (requestedDataType.toLowerCase() === 'body') {
    response = await getBody(connection, fromDate, toDate, false, false);
  } else if (requestedDataType.toLowerCase() === 'daily') {
    response = await getDaily(connection, fromDate, toDate, false);
  } else if (requestedDataType.toLowerCase() === 'activity') {
    response = await getActivity(connection, fromDate, toDate, false);
  } else if (requestedDataType.toLowerCase() === 'menstruation') {
    response = await getMenstruation(connection, fromDate, toDate, false);
  } else if (requestedDataType.toLowerCase() === 'nutrition') {
    response = await getNutrition(connection, fromDate, toDate, false);
  } else {
    console.log('sleep data', fromDate, toDate);
    response = await getSleep(connection, fromDate, toDate, false);
  }

  var result_payload: [string, JSONValue][] = [];
  try {
    // @ts-ignore
    let data = response.data['data'];
    if (data.length == 0) {
      throw console.error();
    }
    console.log('successfully retrieved data');

    const health_key = Object.keys(data[0]);
    health_key.map(key => {
      var first_element = getLeafElement(data[0][key]);
      if (first_element == null || first_element == undefined) {
        first_element = 'empty';
      }
      result_payload.push([key, first_element]);
    });
  } catch (error) {
    console.error(response.error, response.data);
    props.setPayloadMethod([
      ['data', 'too much data requested'],
      ['date', 'consider requesting 1 day of data instead'],
    ]);
  }
  props.setPayloadMethod(result_payload);
};

/// This component provides functionality for the user to select a health data type,
/// connect to a health data source, and view health data within a specified date range.
type Props = NativeStackScreenProps<RootStackParamList, 'Data'>;
export const DataScreen = ({route, navigation}: Props) => {
  const {
    previousFromDate,
    previousToDate,
    requestedDataType,
    user_id,
    reference_id,
    resource,
  } = route.params;

  const fromDate = useRef(new Date(previousFromDate));
  const toDate = useRef(new Date(previousFromDate));
  const [openModal, setOpenModal] = useState(false);
  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);
  const [payload, setPayload] = useState<[string, JSONValue][]>([]);

  const onChangeFromDate = (event: DateTimePickerEvent, date?: Date) => {
    date && (fromDate.current = date);
  };
  const onChangeToDate = (event: DateTimePickerEvent, date?: Date) => {
    date && (toDate.current = date);
  };

  /// request that checks if the resource variable is equal to APPLE, GOOGLE, or SAMSUNG.
  /// If it is, the function calls native_data with some arguments, otherwise it calls api_request_data.
  const request = async () => {
    if (resource == 'APPLE' || resource == 'GOOGLE' || resource == 'SAMSUNG') {
      let connection;
      if (resource == 'APPLE') {
        connection = Connections.APPLE_HEALTH;
      } else if (resource == 'GOOGLE') {
        connection = Connections.GOOGLE;
      } else if (resource == 'SAMSUNG') {
        connection = Connections.SAMSUNG;
      }
      nativeData({
        connection: connection,
        setPayloadMethod: setPayload,
        fromDate: fromDate.current,
        toDate: toDate.current,
        requestedDataType: requestedDataType,
      });
    } else {
      let data_payload = await getRequestData({
        fromDate: previousFromDate,
        toDate: previousToDate,
        requestedDataType: requestedDataType,
        user_id: user_id,
      });
      const health_key = Object.keys(data_payload.data[0]);
      var result_payload: [string, JSONValue][] = [];
      health_key.map(key => {
        var first_element = getLeafElement(data_payload.data[0][key]);
        if (first_element == null || first_element == undefined) {
          first_element = 'empty';
        }
        result_payload.push([key, first_element]);
      });

      if (result_payload !== undefined) {
        setPayload(result_payload);
      }
    }
  };
  useEffect(() => {
    request();
  }, []);

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
              {showDateText(fromDate.current)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setToShow(true)}
            style={DataScreenStyle.dateContainer}>
            <Text style={DataScreenStyle.dateText}>To:</Text>
            <Text style={DateScreenStyle.dateText2}>
              {showDateText(toDate.current)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[DataScreenStyle.mainDataFrame, {alignSelf: 'center'}]}>
          {payload.map((entry, index) => {
            if (index <= 10) {
              return (
                <Row
                  key={index}
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
              setOpenModal(true);
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
              setOpenModal(false);
            }}>
            <ConnectionPopUp
              cancelOnPress={() => {
                setOpenModal(false);
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
              value={fromDate.current}
              is24Hour={true}
              onChange={onChangeFromDate}
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
              value={toDate.current}
              is24Hour={true}
              onChange={onChangeToDate}
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
