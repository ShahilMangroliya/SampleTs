import React from 'react';
import {View, StatusBar, Platform, StyleSheet} from 'react-native';
import iPhoneXHelper from './iphoneXhelper';

const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? (iPhoneXHelper.isIphoneX() ? 40 : 30) : 0;
const BaseScreen = (props: any) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: STATUSBAR_HEIGHT,
          backgroundColor: props.backgroundColor,
        }}>
        <StatusBar
          backgroundColor={props.backgroundColor}
          barStyle={props.barStyle}
          translucent={props.translucent}
        />
      </View>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#21232F',
  },
});

export default BaseScreen;
