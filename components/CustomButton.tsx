import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/constants';

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: object;
  textStyles?: object;
  isLoading?: boolean;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.buttonStyle,
        containerStyles,
        isLoading ? { opacity: 0.5 } : {},
      ]}
      disabled={isLoading}
    >
      <Text style={[styles.textStyle, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.secondary.DEFAULT,
    borderRadius: 15,
    minHeight: 62,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textStyle: {
    color: Colors.primary,
    fontFamily: 'GeistMono-Black',
    fontSize: 18,
    lineHeight: 28,
  },
});

export default CustomButton;
