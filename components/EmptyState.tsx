import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Colors, images } from '@/constants';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={images.empty}
        style={styles.emptyImageStyle}
        resizeMode="contain"
      />

      <Text style={styles.welcomeTextStyle}>{title}</Text>
      <Text style={styles.welcomeTextStyle2}>{subtitle}</Text>

      <CustomButton
        title="Create video"
        handlePress={() => router.push('/create')}
        containerStyles={styles.buttonContainerStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },

  emptyImageStyle: {
    width: 270,
    height: 215,
  },

  welcomeTextStyle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.gray[100],
  },

  welcomeTextStyle2: {
    fontFamily: 'GeistMono-Black',
    fontSize: 18,
    color: 'white',
  },

  buttonContainerStyles: {
    width: '100%',
    marginVertical: 10,
  },
});

export default EmptyState;
