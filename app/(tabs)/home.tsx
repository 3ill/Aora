import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, images } from '@/constants';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import useAppWrite from '@/lib/useAppwrite';
import { Models } from 'react-native-appwrite';

interface MockDataProps {
  $id: number | null;
}

const Home = () => {
  const { data: posts, refetch } = useAppWrite();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={(item: Models.Document) => item.$id?.toString()}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 24, color: 'white' }}>{item.title}</Text>
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerComponentContainer}>
            <View style={styles.innerHeaderComponentContainer}>
              {/**Welcome Text */}
              <View>
                <Text style={styles.welcomeTextStyle}>Welcome Back</Text>
                <Text style={styles.welcomeTextStyle2}>Thrill</Text>
              </View>

              {/**Logo */}
              <View style={{ marginTop: 1.5 }}>
                <Image
                  source={images.logoSmall}
                  style={{ width: 40, height: 40 }}
                  resizeMode="contain"
                />
              </View>
            </View>
            {/**Search Input */}
            <SearchInput placeholder="Search for a video topic" />

            {/**Video Section */}
            <View style={styles.videoSectionContainer}>
              <Text style={styles.videoHeaderTextStyle}>Latest Videos</Text>

              <Trending posts={[{ $id: 1 }, { $id: 2 }, { $id: 3 }] ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the fist one to create a video 🎊"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  headerComponentContainer: {
    marginVertical: 12,
    paddingHorizontal: 8,
    marginTop: 24,
    marginBottom: 24,
  },

  innerHeaderComponentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },

  welcomeTextStyle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.gray[100],
  },

  welcomeTextStyle2: {
    fontFamily: 'GeistMono-Black',
    fontSize: 24,
    color: 'white',
  },

  videoSectionContainer: {
    width: '100%',
    flex: 1,
    paddingTop: 34,
    paddingBottom: 34,
  },

  videoHeaderTextStyle: {
    color: Colors.gray[100],
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginBottom: 6,
  },
});

export default Home;
