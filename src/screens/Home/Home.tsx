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
  Modal,
  Alert,
} from 'react-native';
import Header from '../../component/header';
import {connect} from 'react-redux';
import BaseScreen from '../../component/BaseScreen';
const {width} = Dimensions.get('window');
import Loader from '../../component/loader';
import AntDesign from 'react-native-vector-icons/AntDesign';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home = () => {
  const [loading, setloading] = useState(false);
  const [hours, sethours] = useState(0);
  const [salary, setsalary] = useState(0);
  const [plus, setplus] = useState(false);

  const mainView = () => {
    return (
      <KeyboardAvoidingView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Loader value={loading} />
            <Header />
            <Text style={styles.hoursText}>Total Hours: {hours}</Text>
            <Text style={styles.hoursText}>Total Salary: {salary}</Text>

            <TouchableOpacity
              onPress={() => {
                setplus(true);
              }}
              style={styles.plusContainer}>
              <AntDesign name="plus" color="#fff" size={25} />
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={plus}
              onRequestClose={() => {
                setplus(false);
              }}>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setplus(false)}>
                  <AntDesign name="left" color="#fff" size={25} />
                </TouchableOpacity>
                <Text style={styles.headingText}>Add Hours</Text>
              </View>
            </Modal>
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

// export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
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
  hoursText: {
    color: '#fff',
    marginLeft: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  plusContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    right: 25,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#424A57',
    padding: 20,
  },
  headingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: Platform.OS === 'ios' ? 25 : 0,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 45 : 0,
    marginLeft: 20,
  },
});

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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
