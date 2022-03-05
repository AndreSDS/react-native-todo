import React, { ReactNode, useEffect, memo } from 'react'
import { Pressable } from 'react-native'
import { Text, HStack, Box } from 'native-base'
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  interpolateColor
} from 'react-native-reanimated'

interface AnimatedTaskLabelProps {
  strikethrough: boolean
  textColor: string
  inactiveTextColor: string
  onPress?: () => void
  children?: ReactNode
}

const AnimatedBox = Animated.createAnimatedComponent(Box)
const AnimatedHStack = Animated.createAnimatedComponent(HStack)
const AnimatedText = Animated.createAnimatedComponent(Text)

export const AnimatedTaskLabel = memo(
  ({
    strikethrough,
    textColor,
    inactiveTextColor,
    onPress,
    children
  }: AnimatedTaskLabelProps) => {
    const hstackOffset = useSharedValue(0)
    const hstackAnimatedStyle = useAnimatedStyle(
      () => ({
        transform: [{ translateX: hstackOffset.value }]
      }),
      [strikethrough]
    )

    const textColorProgress = useSharedValue(0)
    const textColorAnimatedStyle = useAnimatedStyle(
      () => ({
        color: interpolateColor(
          textColorProgress.value,
          [0, 1],
          [textColor, inactiveTextColor]
        )
      }),
      [strikethrough, textColor, inactiveTextColor]
    )

    const strikeThroughWidth = useSharedValue(0)
    const strikeThroughAnimatedStyle = useAnimatedStyle(
      () => ({
        width: `${strikeThroughWidth.value * 100}%`,
        borderBottomColor: interpolateColor(
          textColorProgress.value,
          [0, 1],
          [textColor, inactiveTextColor]
        )
      }),
      [strikethrough, textColor, inactiveTextColor]
    )

    useEffect(() => {
      const easing = Easing.out(Easing.quad)
      if (strikethrough) {
        hstackOffset.value = withSequence(
          withTiming(4, { duration: 200, easing }),
          withTiming(0, { duration: 200, easing })
        )
        textColorProgress.value = withDelay(
          1000,
          withTiming(1, { duration: 400, easing })
        )
        strikeThroughWidth.value = withTiming(1, { duration: 400, easing })
      } else {
        strikeThroughWidth.value = withTiming(0, { duration: 400, easing })
        textColorProgress.value = withTiming(0, { duration: 400, easing })
      }
    })

    return (
      <Pressable onPress={onPress}>
        <AnimatedHStack alignItems="center" style={[hstackAnimatedStyle]}>
          <AnimatedText
            fontSize={19}
            noOfLines={1}
            isTruncated
            px={1}
            style={[textColorAnimatedStyle]}
          >
            {children}
          </AnimatedText>
          <AnimatedBox
            position="absolute"
            h={1}
            borderBottomWidth={1}
            style={[strikeThroughAnimatedStyle]}
          />
        </AnimatedHStack>
      </Pressable>
    )
  }
)
