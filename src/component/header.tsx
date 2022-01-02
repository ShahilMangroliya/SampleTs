import React, {useEffect, useState, memo} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation, StackActions} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
const Header = (props: any) => {
  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.uid]);
  const getUserData = () => {
    firestore()
      .collection('Users')
      .doc(props.uid || '')
      .get()
      .then(snapshot => {
        const uname = snapshot.data();
        setname(uname?.name);
      });
  };
  const navigation = useNavigation();
  const [name, setname] = useState('');
  const logout = async () => {
    await auth().signOut();
    await AsyncStorage.removeItem('uid');
    navigation.dispatch(StackActions.replace('Login'));
  };

  return (
    <View style={styles.topContainer}>
      <Text style={styles.loginText}>{name}</Text>
      <TouchableOpacity onPress={() => logout()} style={styles.logoutPosition}>
        <AntDesign name="logout" size={23} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state: {uid: String}) => {
  return {
    uid: state.uid,
  };
};

const mapDispatchToProps = () => {
  return {
    //   addUid: (data: string) => dispatch(addUid(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(memo(Header));

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutPosition: {
    position: 'absolute',
    right: 25,
  },
  loginText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});
