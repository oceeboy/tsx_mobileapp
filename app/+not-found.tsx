import { Link, router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import React from 'react';

const NotFoundPage = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <Text>Not found Page</Text>
      <Pressable
        style={{
          height: 50,
          marginHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          backgroundColor: 'lightgray',
          borderRadius: 5,
        }}
        onPress={() => router.back()}
      >
        <Text style={{ color: 'blue' }}>go to home</Text>
      </Pressable>
    </View>
  );
};

export default NotFoundPage;
