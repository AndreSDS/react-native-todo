import React, { useCallback, useState } from 'react'
import { Center, VStack, Fab, Icon, useColorModeValue } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import shortid from 'shortid'

import { ThemeToggle } from '../../components/ThemeToggle'
import { TaskList } from '../../components/TaskList'
import { AnimatedColorBox } from '../../components/AnimatedColorBox'
import { MastHead } from '../../components/MastHead'
import { NavBar } from '../../components/NavBar'

const intialData = [
  {
    id: shortid.generate(),
    subject: 'Learn React Native',
    done: false
  },
  {
    id: shortid.generate(),
    subject: 'Learn TypeScript',
    done: false
  },
  {
    id: shortid.generate(),
    subject: 'Learn React Hooks',
    done: false
  },
  {
    id: shortid.generate(),
    subject: 'Learn Redux',
    done: false
  }
]

export function MainScreen() {
  const [data, setData] = useState(intialData)
  const [editItemId, setEditItemId] = useState<string | null>(null)

  const handleToggleTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = { ...item, done: !item.done }
      return newData
    })
  }, [])

  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = { ...item, subject: newSubject }
      return newData
    })
  }, [])

  const handleFinishEditingTaskItem = useCallback(item => {
    if (item.subject.trim() === '') {
      handleRemoveTaskItem(item)
    } else {
      setEditItemId(null)
    }
  }, [])

  const handlePressTaskItemLabel = useCallback(item => {
    setEditItemId(item.id)
  }, [])

  const handleRemoveTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item)
      return newData
    })
  }, [])

  const handleAddTaskItem = useCallback(() => {
    const id = shortid.generate()
    setData(prevData => [{ id, subject: '', done: false }, ...prevData])
    setEditItemId(id)
  }, [])

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full"
    >
      <MastHead
        title="What's up, André!"
        image={require('../../assets/masthead.png')}
      >
        <NavBar />
      </MastHead>

      <VStack
        flex={1}
        space={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        mt="-20px"
        pt="20px"
      >
        <TaskList
          data={data}
          editItemId={editItemId}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveTaskItem}
        />
      </VStack>

      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'dark.400')}
        onPress={handleAddTaskItem}
      />
    </AnimatedColorBox>
  )
}
