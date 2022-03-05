import React, { ReactNode } from 'react'
import {
  Box,
  VStack,
  Text,
  Image,
  useColorModeValue,
  ScrollView,
  Icon
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import { AnimatedColorBox } from '../../components/AnimatedColorBox'
import { NavBar } from '../../components/NavBar'
import { MastHead } from '../../components/MastHead'
import { LinkButton } from '../../components/LinkButton'

export function AboutScreen() {
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
      w="full"
    >
      <MastHead
        title="About this app"
        image={require('../../assets/about-masthead.png')}
      >
        <NavBar />
      </MastHead>

      <ScrollView
        _contentContainerStyle={{
          px: '10px',
          mb: '10px',
        }}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        mt="-20px"
        pt="20px"
        p={4}
      >
        <VStack flex={1} space={4}>
          <Box alignItems="center">
            <Image
              source={require('../../assets/banner.jpg')}
              borderRadius="full"
              resizeMode="cover"
              w={120}
              h={120}
              alt="Author photo"
              borderColor={useColorModeValue('blue.800', 'secondary.500')}
              borderWidth={3}
            />
          </Box>

          <Text fontSize="md" w="full">
            This is an React Native app built following the tutor ial from
            Takuya's channel at YouTube, called DevAsLife.
          </Text>
          <LinkButton
            borderRadius="full"
            size="lg"
            colorScheme="red"
            href="https://www.youtube.com/channel/UC7yZ6keOGsvERMp2HaEbbXQ"
            leftIcon={
              <Icon as={Feather} name="youtube" size="sm" opacity={0.5} />
            }
          >
            Go to YouTube channel
          </LinkButton>
          <LinkButton
            borderRadius="full"
            size="lg"
            colorScheme={useColorModeValue('blue', 'darkBlue')}
            href="https://www.linkedin.com/in/andre-sds/"
            leftIcon={
              <Icon as={Feather} name="linkedin" size="sm" opacity={0.5} />
            }
          >
            Check out my LinkedIn
          </LinkButton>
          <LinkButton
            borderRadius="full"
            size="lg"
            colorScheme="warmGray"
            href="https://github.com/AndreSDS"
            leftIcon={
              <Icon as={Feather} name="github" size="sm" opacity={0.5} />
            }
          >
            Take a look at my Github
          </LinkButton>
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
  )
}
