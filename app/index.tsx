import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, images } from '@/constants';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from '@/context/globalProvider';

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <View style={styles.secondaryContainer}>
          <Image
            source={images.logo}
            style={{
              width: 130,
              height: 84,
            }}
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            style={{
              maxWidth: 380,
              height: 300,
              width: '100%',
            }}
            resizeMode="contain"
          />

          <View
            style={{
              position: 'relative',
              marginTop: 5,
              paddingHorizontal: 40,
            }}
          >
            <Text style={styles.textStyle}>
              Discover Endless Possibilities with{' '}
              <Text
                style={{
                  color: Colors.secondary[200],
                }}
              >
                Aora
              </Text>
            </Text>
            <Image
              source={images.path}
              style={{
                width: 136,
                height: 15,
                position: 'absolute',
                bottom: -8,
                right: -8,
              }}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.subTextStyle}>
            Where creativity meets innovation: Embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles={styles.buttonContainer}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Colors.primary,
  },

  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },

  secondaryContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 50,
  },

  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 1,
  },

  subTextStyle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#cdcde0',
    marginTop: 22,
    textAlign: 'center',
  },
});
