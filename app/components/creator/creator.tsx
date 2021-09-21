/* eslint-disable react-native/no-color-literals */
import React, { FC, useState } from "react"
import {
  Button,
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Dimensions,
  StyleSheet,
} from "react-native"
import { saveWeight } from "../../db/model/helpers"
import { primaryColor } from "../header-logrocket/header-logrocket"

const windowDim = Dimensions.get("window")
export const windowHeight = windowDim.height
export const creatorStyles = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    flex: 1,
    justifyContent: "flex-end",
  },
  input: {
    borderColor: "#c9c9c9",
    borderRadius: 3,
    borderWidth: 1,
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  modalView: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 1,
    height: windowHeight / 2,
    padding: 10,
    shadowColor: "#cacaca",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  topActions: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topCloseButton: {
    color: "#494949",
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
  },
})

const Creator: FC<{
  isCreatorVisible: boolean
  onHideCreator: () => void
}> = ({ onHideCreator, isCreatorVisible }) => {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [weight, setWeight] = useState<string>("")
  const [note, setNote] = useState<string>("")

  const handleSavePress = async () => {
    setIsSaving(true)
    await saveWeight({ weight, note })
    // hide modal
    onHideCreator()
    // Clear out the inputs
    setWeight("")
    setNote("")
    // Make button active again
    setIsSaving(false)
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isCreatorVisible}>
      <View style={creatorStyles.centeredView}>
        <View style={creatorStyles.modalView}>
          <View style={creatorStyles.topActions}>
            <Text>Add your weight</Text>
            <TouchableHighlight
              onPress={() => {
                onHideCreator()
              }}
            >
              <Text style={creatorStyles.topCloseButton}>×</Text>
            </TouchableHighlight>
          </View>
          <TextInput
            style={creatorStyles.input}
            placeholder="Your weight"
            keyboardType="decimal-pad"
            onChangeText={(text) => setWeight(text)}
            value={weight}
          />
          <TextInput
            placeholder="Additional note (optional)"
            style={creatorStyles.input}
            onChangeText={(text) => setNote(text)}
            value={note}
          />
          <Button title="Save" disabled={isSaving} color={primaryColor} onPress={handleSavePress} />
        </View>
      </View>
    </Modal>
  )
}

export default Creator
