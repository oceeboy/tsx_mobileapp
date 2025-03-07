import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function HomeDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Details for ID: {id}</Text>
    </View>
  );
}
