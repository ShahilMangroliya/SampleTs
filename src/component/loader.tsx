import React from 'react';
import {memo} from 'react';
import {
  Modal,
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from 'react-native';
const {height, width} = Dimensions.get('screen');

const Loader = (props: {value: boolean}) => {
  return (
    <Modal visible={props.value} transparent={true}>
      <View style={styles.container} />
      <ActivityIndicator
        style={styles.ActivityIndicator}
        size="large"
        color="#fff"
      />
    </Modal>
  );
};

export default memo(Loader);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: height,
    width: width,
    backgroundColor: '#000',
    opacity: 0.6,
  },
  ActivityIndicator: {
    marginTop: height / 2,
  },
});
