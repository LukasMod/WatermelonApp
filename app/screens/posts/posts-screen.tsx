import React, { FC, useState } from "react"
import { ViewStyle, TextStyle, Dimensions } from "react-native"
import withObservables from "@nozbe/with-observables"
import { Button, Header, Screen,  TextField } from "../../components"
import { color, spacing } from "../../theme"
import { palette } from "../../theme/palette"
import { addPost, observePosts } from "../../db/model/helpers"
import Post from "../../db/model/post"
import PostList from "../../components/post-list/post-list"

const CONTAINER: ViewStyle = { flex: 1, padding: spacing[3] }

const INPUT_TEXT: TextStyle = {
  borderColor: palette.deepPurple,
  borderRadius: 3,
  borderWidth: 1,
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

const windowDim = Dimensions.get("window")
export const windowHeight = windowDim.height

export const PostsScreen: FC<{ posts: Post[]; navigation: any }> = ({ posts, navigation }) => {
  const goBack = () => navigation.goBack()

  const [title, setTitle] = useState<string>("")
  const [body, setBody] = useState<string>("")
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const handleSavePress = async () => {
    setIsSaving(true)
    await addPost({ title, body })
    setTitle("")
    setBody("")
    setIsSaving(false)
  }

  return (
    <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
      <Header
        headerTx="demoScreen.howTo"
        leftIcon="back"
        onLeftPress={goBack}
        style={HEADER}
        titleStyle={HEADER_TITLE}
      />
      <TextField
        inputStyle={INPUT_TEXT}
        placeholder="title"
        onChangeText={(text) => setTitle(text)}
        value={title}
        autoCorrect={false}
      />
      <TextField
        inputStyle={INPUT_TEXT}
        placeholder="body"
        onChangeText={(text) => setBody(text)}
        value={body}
        autoCorrect={false}
      />
      <Button text="Save" disabled={isSaving} onPress={handleSavePress} />

      <PostList />
    </Screen>
  )
}

const enhanceWithPosts = withObservables(["posts"], () => ({
  posts: observePosts(),
}))

export default enhanceWithPosts(PostsScreen)
