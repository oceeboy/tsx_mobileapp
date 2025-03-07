import HeaderBack from '@/components/shared/HeaderBack';
import { THEME } from '@/constants/theme';
import { AdminProductDetail } from '@/modules/admindashboard';

import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { View } from 'react-native';

export default function AdminProductDetailScreen() {
  const { id } = useLocalSearchParams() as { id: string };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: THEME.colors.white,
      }}
    >
      <HeaderBack title="Admin Product Details" />
      <View style={{ flex: 1 }}>
        <AdminProductDetail id={id} />
      </View>
    </View>
  );
}
