import React from 'react';
import {StatusBar, View} from 'react-native';
import MainApp from './src/router';
import store from './src/Redux/store';
import {Provider} from 'react-redux';
const App = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <Provider store={store}>
        <MainApp />
      </Provider>
    </View>
  );
};

export default App;
