import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

export const InternetCheck = () => {
  // check internet
  NetInfo.fetch().then(state => {
    // console.log(state.isInternetReachable);
    // console.log(state.isConnected);
    if (state.isInternetReachable == false) {
      Toast.show({
        type: 'error',
        position: 'top',
        topOffset: 1,
        text1: 'No Internet Connection',
        text2: 'Please check your internet connection',

        visibilityTime: 3000,
      });
    }
  });
};
