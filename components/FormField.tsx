import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, icons } from '@/constants';

interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (e: string) => void;
  otherStyles?: {};
  keyboardType?: string;
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.titleText}>{title}</Text>

      <View
        style={[
          styles.inputContainer,
          isFocused && { borderColor: Colors.secondary[100] },
        ]}
      >
        <TextInput
          style={styles.inputStyle}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          onFocus={() => setIsFocused(true)}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    marginBottom: 6,
  },

  titleText: {
    fontSize: 18,
    lineHeight: 24,
    color: Colors.gray[100],
    paddingTop: 14,
    paddingBottom: 8,
    fontFamily: 'GeistMono-Bold',
  },

  inputContainer: {
    width: '100%',
    height: 60,
    backgroundColor: Colors.black[100],
    borderRadius: 12,
    alignItems: 'center',
    borderColor: Colors.black[200],
    flexDirection: 'row',
  },

  inputStyle: {
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    width: '80%',
    paddingLeft: 16,
  },

  inputIcon: {
    width: 16,
    height: 16,
    marginLeft: 50,
  },
});
