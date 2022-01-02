import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {useNavigation, StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {addUid} from '../../Redux';
const splash = (props: {addUid: (arg0: string) => void}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigation = useNavigation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    ckeckUid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ckeckUid = () => {
    try {
      AsyncStorage.getItem('uid').then(user => {
        if (user == null) {
          openScreen('Login');
        } else {
          props.addUid(user || '');
          openScreen('Home');
        }
      });
    } catch (error) {
      Alert.alert(error);
    }
  };

  const openScreen = (screen: string) => {
    navigation.dispatch(StackActions.replace(screen));
  };
  return (
    <View style={styles.container}>
      <Text>splash</Text>
    </View>
  );
};

// export default splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (
  dispatch: (arg0: {type: string; payload: string}) => any,
) => {
  return {
    addUid: (data: string) => dispatch(addUid(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(splash);
