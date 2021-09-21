import React, { FC, useState } from "react"
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  GradientBackground,
  AutoImage as Image,
  TextField,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import Chart from "../../components/chart/chart"
import Creator from "../../components/creator/creator"
import HeaderLogRocket from "../../components/header-logrocket/header-logrocket"

const FULL: ViewStyle = { flex: 1, backgroundColor: color.palette.white }
const CONTAINER: ViewStyle = {}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const nextScreen = () => navigation.navigate("demo")

    const [showCreator, setShowCreator] = useState<boolean>(false)

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <HeaderLogRocket onOpenCreator={() => setShowCreator(true)} />
          <Creator isCreatorVisible={showCreator} onHideCreator={() => setShowCreator(false)} />
          <Chart />
        </Screen>
      </View>
    )
  },
)
