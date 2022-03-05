import React, { ReactNode } from 'react'

import { Text, HStack, Switch, useColorMode } from 'native-base'

interface ThemeToggleProps {
  children: ReactNode
}

export function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === 'light'}
        onToggle={toggleColorMode}
      ></Switch>
      <Text>Light</Text>
    </HStack>
  )
}
