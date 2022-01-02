import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {useNavigation, StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import BaseScreen from '../../component/BaseScreen';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {addUid} from '../../Redux';
const {width} = Dimensions.get('window');
import Loader from '../../component/loader';

const Login = (props: {addUid: (arg0: string) => void}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(true);
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);

  const LoginFun = () => {
    if (email === '') {
      Alert.alert('Enter Email');
    } else if (password === '') {
      Alert.alert('Enter Password');
    } else {
      setloading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user.uid) {
            AsyncStorage.setItem('uid', res.user.uid)
              .then(() => {
                props.addUid(res.user.uid);
                navigation.dispatch(StackActions.replace('Home'));
              })
              .catch(error => {
                setloading(false);
                Alert.alert(error.code);
              });
          }
        })
        .catch(error => {
          setloading(false);
          switch (error.code) {
            case 'auth/wrong-password':
              Alert.alert('Invalid Email or Password');
              break;
            case 'auth/user-not-found':
              Alert.alert('User Not Found');
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
          <View style={styles.container}>
            <Loader value={loading} />
            <Text style={styles.loginText}>Login</Text>
            <TextInput
              style={styles.textInput}
              label="Enter Email"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={email}
              onChangeText={(text: React.SetStateAction<string>) =>
                setEmail(text)
              }
            />
            <TextInput
              style={styles.textInput}
              label="Password"
              value={password}
              textContentType="password"
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
              onPress={() => LoginFun()}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.dispatch(StackActions.replace('Signup'))
              }
              style={styles.SignUpLocation}>
              <Text style={styles.Text}>Don't have account? SIGN UP</Text>
            </TouchableOpacity>
          </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
    shadowColor: '#fff', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 0.8, // IOS
    shadowRadius: 1, //IOS
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
