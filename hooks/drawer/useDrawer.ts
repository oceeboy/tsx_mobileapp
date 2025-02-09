import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export const use3DTransform = (active: { value: boolean }) => {
  const progress = useDerivedValue(() => withTiming(active.value ? 1 : 0));

  const animatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      progress.value,
      [0, 1],
      [0, -15],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { perspective: 1000 },
        { scale: active.value ? withTiming(0.8) : withTiming(1) },
        { translateX: active.value ? withSpring(240) : withTiming(0) },
        { rotateY: `${rotateY}deg` },
      ],
      borderRadius: active.value ? withTiming(20) : withTiming(0),
    };
  });

  return animatedStyle;
};
