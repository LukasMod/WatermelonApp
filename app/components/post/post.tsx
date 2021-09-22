import React from "react"
import withObservables from "@nozbe/with-observables"
import { Text, View, ViewStyle } from "react-native"
import EnhancedComment from "../comment/comment"
import { spacing } from "../../theme"
import { palette } from "../../theme/palette"

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  padding: spacing[2],
  borderRadius: spacing[1],
  borderColor: palette.deepPurple,
  borderWidth: 1,
  marginVertical: spacing[1],
}

const PostItem = ({
  post,
  // comments
}) => (
  <View style={CONTAINER}>
    <Text>{post.title}</Text>
    <Text>{post.body}</Text>
    {/* <Text>Comments</Text>
    {comments.map((comment) => (
      <EnhancedComment key={comment.id} comment={comment} />
    ))} */}
  </View>
)


export default PostItem
