import React, { useEffect } from 'react'
import { Box, useTheme, themeTools } from 'native-base'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor
} from 'react-native-reanimated'
import { usePrevious } from '../../utils/usePrevious'

const AnimatedBox = Animated.createAnimatedComponent(Box)

export function AnimatedColorBox({ bg, ...props }: any) {
  const theme = useTheme()
  const hexBg = themeTools.getColor(theme, bg)
  const prevHexBg = usePrevious(hexBg)
  const progress = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    progress.value = withTiming(1, { duration: 200 })
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [prevHexBg || hexBg, hexBg]
      )
    }
  }, [hexBg])

  useEffect(() => {
    progress.value = 0
  }, [hexBg])

  return <AnimatedBox {...props} style={animatedStyle} />
}
