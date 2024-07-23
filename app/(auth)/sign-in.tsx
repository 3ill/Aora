import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.internalContainer}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={styles.imageStyle}
          />

          <Text style={styles.welcomeText}>Log In to Aora</Text>

          <FormField
            title="Email"
            value={form.email}
            placeholder=""
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles={styles.otherFormStyles}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            placeholder=""
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles={styles.otherFormStyles}
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={styles.buttonContainerStyles}
            isLoading={isSubmitting}
          />

          <View style={styles.exitContainer}>
            <Text style={styles.exitText}>Don't have an account? </Text>
            <Link href="/sign-up" style={styles.exitLink}>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: '100%',
  },

  internalContainer: {
    width: '100%',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 8,
    marginVertical: 24,
  },

  imageStyle: {
    width: 115,
    height: 35,
  },

  welcomeText: {
    fontSize: 24,
    lineHeight: 32,
    color: 'white',
    shadowColor: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '700',
    paddingTop: 16,
  },

  otherFormStyles: {
    marginTop: 12,
  },

  buttonContainerStyles: {
    marginTop: 24,
  },

  exitContainer: {
    justifyContent: 'center',
    paddingTop: 8,
    flexDirection: 'row',
    gap: 2,
  },

  exitText: {
    fontSize: 18,
    lineHeight: 24,
    color: Colors.gray[100],
    fontFamily: 'Poppins-Regular',
  },

  exitLink: {
    fontSize: 18,
    color: Colors.secondary.DEFAULT,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 24,
  },
});
