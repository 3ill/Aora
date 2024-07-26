import { View, Text, FlatList, StyleSheet } from 'react-native';

interface Post {
  $id: number;
}
interface TrendingProps {
  posts: Post[];
}
import React from 'react';

const Trending = ({ posts }: TrendingProps) => {
  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 24 }}>{item.$id}</Text>
        )}
        horizontal
      />
    </View>
  );
};

export default Trending;
