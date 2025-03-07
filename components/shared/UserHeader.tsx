import { THEME } from '@/constants/theme';
import useAuthStore from '@/store/auth/auth';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AlignLeft } from 'react-native-feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface UserHeaderProps {
  _id: string;
}

export default function UserHeader() {
  const insets = useSafeAreaInsets();

  const { data } = useAuthStore();
  console.log(data);
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.rowContainer}>
        <View style={styles.profileContainer}>
          <Pressable
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 50,
              minWidth: 50,
              minHeight: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>g</Text>
          </Pressable>
        </View>
        <View style={styles.headerMessage}>
          <Text>Welcome Back</Text>
          <Text>
            {data?.firstName} {data?.lastName}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 30,
    alignItems: 'center',
    backgroundColor: THEME.BACKGROUND.SECONDARY,
    justifyContent: 'space-between',
  },
  handBurgerMenu: {
    flexDirection: 'column',

    height: '100%',
    padding: 10,
  },
  handBurgerMenuLine: {
    width: 20,
    height: 2,
    backgroundColor: 'white',
    margin: 2,
  },
  headerTitle: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerMessage: {
    flexDirection: 'column',
    columnGap: 5,
  },
});
