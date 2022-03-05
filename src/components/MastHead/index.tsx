import React, { ReactNode } from 'react'
import { ImageSourcePropType } from 'react-native'
import { Box, VStack, Heading, Image } from 'native-base'

interface MastHeadTsxProps {
  children?: ReactNode
  title: string
  image: ImageSourcePropType
}

export function MastHead({ children, title, image }: MastHeadTsxProps) {
  return (
    <VStack h="300px" pb={3}>
      <Image
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        w="full"
        h="300px"
        resizeMode="cover"
        source={image}
        alt="masthead image"
      />
      {children}
      <Box flex={1}>
        <Heading bg="red" color="white" mt="20px" p={6} size="xl">
          {title}
        </Heading>
      </Box>
    </VStack>
  )
}
