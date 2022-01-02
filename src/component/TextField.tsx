import React, {memo, useState, FC} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

interface Props {
  label: any;
  data: any;
  placeholderColor: any;
  icon: any;
  onFocus: any;
  onBlur: any;
  keyboardType: any;
}

const TextField: FC<Props> = ({
  label,
  data,
  placeholderColor,
  icon,
  onFocus,
  onBlur,
  keyboardType,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  let color = isFocused ? '#AA9363' : '#B9C4CA';

  return (
    <View style={{...styles.container, borderBottomColor: color}}>
      <Icon name={icon} color={color} style={styles.icon} />
      <TextInput
        {...props}
        placeholder={label}
        style={styles.main}
        value={data}
        keyboardType={keyboardType}
        placeholderTextColor={placeholderColor}
        onBlur={event => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={event => {
          setIsFocused(true);
          onFocus?.(event);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    color: '#fff',
    marginLeft: 20,
    flex: 1,
  },
  container: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 10,
    borderBottomWidth: 1.5,
    flexDirection: 'row',
  },
  icon: {
    marginTop: 10,
    fontSize: 20,
    marginLeft: 10,
  },
});

export default memo(TextField);
