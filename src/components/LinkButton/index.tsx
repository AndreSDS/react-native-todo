import React, { useCallback } from 'react'
import * as Linking from 'expo-linking'
import { Button, IButtonProps } from 'native-base'

interface ButtonProps extends IButtonProps {
  href: string
}

export function LinkButton({ href, ...props }: ButtonProps) {
  const handlePress = useCallback(() => {
    Linking.openURL(href)
  }, [href])

  return <Button {...props} onPress={handlePress}></Button>
}
