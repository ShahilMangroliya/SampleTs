import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {addUid} from '../../Redux';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import BaseScreen from '../../component/BaseScreen';
import {TextInput} from 'react-native-paper';
const {width} = Dimensions.get('window');
import Loader from '../../component/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = (props: {addUid: (arg0: string) => void}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();

  const SignupFun = async () => {
    if (name === '') {
      Alert.alert('Please Enter Name');
    } else if (email === '') {
      Alert.alert('Please Enter Email');
    } else if (password === '') {
      Alert.alert('Please Enter Password');
    } else {
      setloading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user.uid) {
            try {
              firestore()
                .collection('Users')
                .doc(res.user.uid)
                .set({
                  email,
                  name,
                })
                .then(() =>
                  AsyncStorage.setItem('uid', res.user.uid).then(() => {
                    props.addUid(res.user.uid);
                    navigation.dispatch(StackActions.replace('Home'));
                  }),
                );
            } catch (error) {
              console.log(error);
            }
          }
        })
        .catch(error => {
          setloading(false);
          switch (error.code) {
            case 'auth/weak-password':
              Alert.alert('Weak Password');
              break;
            case 'auth/invalid-email':
              Alert.alert('Invalid Email');
              break;
            default:
              Alert.alert('Try again later');
              break;
          }
        });
    }
  };

  const mainView = () => {
    return (
      <KeyboardAvoidingView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={styles.container}>
            <Loader value={loading} />
            <Text style={styles.loginText}>Sign Up</Text>
            <TextInput
              style={styles.textInput}
              label="Enter Name"
              keyboardType="default"
              value={name}
              onChangeText={(text: React.SetStateAction<string>) =>
                setName(text)
              }
            />
            <TextInput
              style={styles.textInput}
              label="Enter Email"
              keyboardType="email-address"
              value={email}
              onChangeText={(text: React.SetStateAction<string>) =>
                setEmail(text)
              }
            />
            <TextInput
              style={styles.textInput}
              label="Password"
              value={password}
              secureTextEntry={showPass}
              right={
                <TextInput.Icon
                  onPress={() => setShowPass(!showPass)}
                  name={showPass ? 'eye' : 'eye-off'}
                />
              }
              onChangeText={(text: React.SetStateAction<string>) =>
                setPassword(text)
              }
            />
            <TouchableOpacity
              onPress={() => SignupFun()}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.dispatch(StackActions.replace('Login'))}
              style={styles.SignUpLocation}>
              <Text style={styles.Text}>Already have account? LOG IN</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };

  return (
    <BaseScreen
      backgroundColor="#21232F"
      translucent={Platform.OS === 'ios' ? true : false}
      barStyle={'light-content'}>
      {mainView()}
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginText: {
    color: '#fff',
    fontSize: 50,
    marginLeft: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 100,
  },
  textInput: {
    marginTop: 10,
    width: width - 20,
    alignSelf: 'center',
  },
  Text: {
    color: '#fff',
  },
  SignUpLocation: {
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#424A57',
    marginHorizontal: 30,
    height: 50,
    borderRadius: 30,
    shadowColor: '#fff', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 0.8, // IOS
    shadowRadius: 1, //IOS
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
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
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
