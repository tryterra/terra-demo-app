import {API_KEY, REFERENCE_ID} from '../../env';
import {JSONValue, getLeafElement} from '../utils.component';

/// The getWidgetAsync function is an asynchronous function that fetches the widget session URL from the Terra API
/// and sets the url state using the setUrl function.
/// It takes an object with an onSuccess callback function as a parameter to set state back to the main component.
/// This function refers to: https://docs.tryterra.co/reference/generate-widget-session
export const getWidgetAsync = async () => {
  try {
    const response = await fetch(
      'https://api.tryterra.co/v2/auth/generateWidgetSession',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'dev-id': 'testingTerra',
          'content-type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({
          reference_id: REFERENCE_ID,
          providers:
            'GARMIN,WITHINGS,FITBIT,GOOGLE,OURA,WAHOO,PELOTON,ZWIFT,TRAININGPEAKS,FREESTYLELIBRE,DEXCOM,COROS,HUAWEI,OMRON,RENPHO,POLAR,SUUNTO,EIGHT,APPLE,CONCEPT2,WHOOP,IFIT,TEMPO,CRONOMETER,FATSECRET,NUTRACHECK,UNDERARMOUR',
          language: 'en',
          auth_success_redirect_url: 'terraficapp://request',
          auth_failure_redirect_url: 'terraficapp://login',
        }),
      },
    );
    const json = await response.json();
    return json.url;
  } catch (error) {
    console.error(error);
  }
};

/// Performing request through directly querying Terra API EndPoint. Detail example check:
/// https://docs.tryterra.co/reference/get-activity-data
interface requestDataProps {
  fromDate: string;
  toDate: string;
  requestedDataType: string;
  user_id: string;
}
export const getRequestData = async (props: requestDataProps) => {
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
          'x-api-key': API_KEY,
        },
      },
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
