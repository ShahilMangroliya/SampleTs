/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {memo, FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface Props {
  label: any;
}

const Botton: FC<Props> = ({label, ...props}) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
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
      }}>
      <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(Botton);
