import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { signIn } from '@/lib/appwrite';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    const formConditionsNotMet = !form.password || !form.email;
    if (formConditionsNotMet) {
      Alert.alert('Error', 'Please fill in all fields');
      throw new Error('Form conditions not met');
    }

    setIsSubmitting(true);

    try {
      const result = await signIn({
        email: form.email,
        password: form.password,
      });

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', 'Error Creating user');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  internalContainer: {
    width: '100%',
    minHeight: '80%',
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginVertical: 24,
    flex: 1,
  },

  imageStyle: {
    width: 115,
    height: 35,
  },

  welcomeText: {
    fontSize: 28,
    lineHeight: 32,
    color: 'white',
    shadowColor: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '700',
    paddingTop: 34,
  },

  otherFormStyles: {
    marginTop: 12,
  },

  buttonContainerStyles: {
    marginTop: 24,
  },

  exitContainer: {
    justifyContent: 'center',
    paddingTop: 16,
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
