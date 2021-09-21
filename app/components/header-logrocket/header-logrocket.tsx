import React, { FC } from "react"
import { View, Text, TouchableHighlight, StyleSheet } from "react-native"

export const primaryColor = "#FB8C00"

export const headerStyles = StyleSheet.create({
  addButton: {
    borderColor: primaryColor,
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  headerTitle: {
    borderLeftColor: primaryColor,
    borderLeftWidth: 3,
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 10,
  },
})

const HeaderLogRocket: FC<{ onOpenCreator: () => void }> = ({ onOpenCreator }) => {
  return (
    <>
      <View style={headerStyles.container}>
        <Text style={headerStyles.headerTitle}>Weightress</Text>
        <TouchableHighlight style={headerStyles.addButton} onPress={() => onOpenCreator()}>
          <Text>+ Add</Text>
        </TouchableHighlight>
      </View>
    </>
  )
}

export default HeaderLogRocket
