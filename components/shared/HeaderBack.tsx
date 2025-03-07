import { THEME } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { ArrowBigLeft, MoveLeft, MoveLeftIcon } from 'lucide-react-native';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { AlignLeft, ArrowLeft } from 'react-native-feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderBackProps {
  title?: string;
}

export default function HeaderBack({ title = 'goodf' }: HeaderBackProps) {
  const insets = useSafeAreaInsets();

  const router = useRouter();

  function goBack() {
    router.back();
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === 'ios' && insets.top } as any,
      ]}
    >
      <Pressable onPress={goBack} style={styles.handBurgerMenu}>
        <ArrowLeft width={24} height={24} color={THEME.colors.black} />
      </Pressable>
      <View
        style={{
          marginLeft: 16,
        }}
      >
        <Text
          style={{
            color: THEME.colors.black,
            fontSize: 20,
            fontWeight: 'semibold',
            textTransform: 'capitalize',
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 24,
    alignItems: 'center',
  },
  handBurgerMenu: {},
});
