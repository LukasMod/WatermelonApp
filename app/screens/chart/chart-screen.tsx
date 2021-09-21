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

const BOLD: TextStyle = { fontWeight: "bold" }
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
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

export const ChartScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
    const [showCreator, setShowCreator] = useState<boolean>(false)

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerTx="demoScreen.howTo"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />

          <HeaderLogRocket onOpenCreator={() => setShowCreator(true)} />
          <Creator isCreatorVisible={showCreator} onHideCreator={() => setShowCreator(false)} />
          <Chart />
        </Screen>
      </View>
    )
  },
)
