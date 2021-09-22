import React, { FC } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, Screen } from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"

const FULL: ViewStyle = { flex: 1, backgroundColor: color.palette.white }
const CONTAINER: ViewStyle = { paddingHorizontal: spacing[4] }

const BUTTON: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
  marginVertical: spacing[2],
}
const BOLD: TextStyle = { fontWeight: "bold" }
const BUTTON_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const chartScreen = () => navigation.navigate("chart")
    const postsScreen = () => navigation.navigate("postsScreen")
    const todoScreen = () => navigation.navigate("todoScreen")

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Button
            onPress={chartScreen}
            text="chart example"
            style={BUTTON}
            textStyle={BUTTON_TEXT}
          />
          <Button
            onPress={postsScreen}
            text="posts example"
            style={BUTTON}
            textStyle={BUTTON_TEXT}
          />
          <Button onPress={todoScreen} text="todo example" style={BUTTON} textStyle={BUTTON_TEXT} />
        </Screen>
      </View>
    )
  },
)
