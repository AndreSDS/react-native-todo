import React, { ReactNode } from 'react'
import { Dimensions } from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from 'react-native-reanimated'

import { Box } from 'native-base'

import { makeStyledComponent } from '../../utils/makeStyledComponent'

const StyledView = makeStyledComponent(Animated.View)

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  children: ReactNode
  backView?: ReactNode
  onSwipeLeft?: () => void
}

const { width: SCREEEN_WIDTH } = Dimensions.get('window')
const SWIPE_THRESHOLD = -SCREEEN_WIDTH * 0.2

export function SwipableView({
  children,
  backView,
  onSwipeLeft,
  simultaneousHandlers
}: Props) {
  const translateX = useSharedValue(0)

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = Math.max(-128, Math.min(0, event.translationX))
    },
    onEnd: event => {
      const shouldBeDismissed = translateX.value < SWIPE_THRESHOLD
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEEN_WIDTH)
        onSwipeLeft && runOnJS(onSwipeLeft)()
      } else {
        translateX.value = withTiming(0)
      }
    }
  })

  const facadeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }))

  return (
    <StyledView w="full">
      {backView && (
        <Box position="absolute" left={0} right={0} top={0} bottom={0}>
          {backView}
        </Box>
      )}

      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}
      >
        <StyledView style={facadeStyle}>{children}</StyledView>
      </PanGestureHandler>
    </StyledView>
  )
}
