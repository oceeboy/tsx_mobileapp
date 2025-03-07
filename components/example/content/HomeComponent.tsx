import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { THEME } from '@/constants/theme';
import Animated from 'react-native-reanimated';

interface HomeComponentProps {
  // Props here

  id?: string;
  title?: string;
  description?: string;
  action?: () => void;
  photo?: string[];
}

const HomeComponent: React.FC<HomeComponentProps> = ({
  title = 'Hello World!',
  description = 'This is a description',
  action = () => console.log('working'),
  photo,
}) => {
  return (
    <Pressable onPress={action}>
      <View style={styles.card}>
        <View style={styles.image}>
          <Animated.Text sharedTransitionTag="Texxe" style={styles.imageText}>
            G
          </Animated.Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.textHeader}>{title}</Text>
          <Text style={styles.textDescription}>{description}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default HomeComponent;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: THEME.CARD.PRIMARY,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: THEME.BORDER.PRIMARY,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'column',

    shadowColor: '#000',
    shadowOffset: THEME.LIGHT.shadowOffset,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textDescription: {
    fontSize: 16,
  },
  imageText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
