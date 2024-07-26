import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Models } from 'react-native-appwrite';
import { getAllPosts } from './appwrite';

interface FunctionProps {
  fn: () => void;
}

const useAppWrite = () => {
  const [data, setData] = useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getAllPosts();
      setData(response);
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => fetchData();
  return { data, isLoading, refetch };
};

export default useAppWrite;
