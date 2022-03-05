import React, { ReactNode } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import theme from '../../theme'

interface AppContainerProps {
  children: ReactNode
}

export function AppContainer({ children }: AppContainerProps) {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
    </NavigationContainer>
  )
}
