import React, { FC, useState } from "react"
import { ViewStyle, TextStyle, FlatList, View } from "react-native"
import { Button, Checkbox, Header, Screen, Text, TextField } from "../../components"
import { color, spacing } from "../../theme"
import { palette } from "../../theme/palette"

import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"

import {
  addTask,
  changeTaskCompleted,
  changeTaskName,
  removeTaskFromDatabase,
} from "../../db/model/helpers"

const CONTAINER: ViewStyle = { flex: 1, padding: spacing[3] }
const TASK_CONTAINER: ViewStyle = {
  borderColor: palette.deepPurple,
  borderWidth: 1,
  alignItems: "center",
  padding: spacing[2],
}
const TASK_CONTAINER_INSIDE: ViewStyle = {
  flexDirection: "row",
  flex: 1,
}
const TASK_CHECKBOX: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  flex: 0.2,
}
const TASK_INPUT: ViewStyle = {
  flex: 0.8,
}

const INPUT_TEXT: TextStyle = {
  borderColor: palette.deepPurple,
  borderRadius: 3,
  borderWidth: 1,
  color: palette.black,
}
const TASK_TEXT: TextStyle = {
  color: palette.black,
}

const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

const TodoScreen: FC<{ navigation; tasks }> = ({ tasks, navigation }) => {
  const goBack = () => navigation.goBack()

  const [taskName, setTaskName] = useState<string>("")
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const handleSavePress = async () => {
    setIsSaving(true)
    await addTask({ newTaskName: taskName })
    setTaskName("")
    setIsSaving(false)
  }

  const onChangeItemCompleted = async (item) => {
    await changeTaskCompleted(item)
    setIsRefreshing(!isRefreshing)
  }
  const onChangeItemName = async (item, value) => {
    await changeTaskName(item, value)
    setIsRefreshing(!isRefreshing)
  }
  const removeTask = async (item) => {
    await removeTaskFromDatabase(item)
  }

  const renderTask = ({ item }) => {
    return (
      <View style={TASK_CONTAINER}>
        <Text text={item.name} style={TASK_TEXT} />
        <Text text={`completed: ${item.completed.toString()}`} style={TASK_TEXT} />
        <View style={TASK_CONTAINER_INSIDE}>
          <Checkbox
            onToggle={() => onChangeItemCompleted(item)}
            value={item.completed}
            style={TASK_CHECKBOX}
          />
          <TextField
            style={TASK_INPUT}
            inputStyle={INPUT_TEXT}
            value={item.name}
            onChangeText={(value) => onChangeItemName(item, value)}
          />
        </View>
        <Button text="REMOVE TASK" onPress={() => removeTask(item)} />
      </View>
    )
  }

  return (
    <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
      <Header
        headerTx="demoScreen.howTo"
        leftIcon="back"
        onLeftPress={goBack}
        style={HEADER}
        titleStyle={HEADER_TITLE}
      />
      <TextField
        inputStyle={INPUT_TEXT}
        placeholder="todo"
        onChangeText={(text) => setTaskName(text)}
        value={taskName}
        autoCorrect={false}
      />
      <Button text="ADD TODO" disabled={isSaving} onPress={handleSavePress} />
      <FlatList data={tasks} renderItem={renderTask} keyExtractor={(item) => "item" + item.id} />
    </Screen>
  )
}

export default withDatabase(
  withObservables([], ({ database }) => ({
    tasks: database.collections.get("tasks").query(),
  }))(TodoScreen),
)
