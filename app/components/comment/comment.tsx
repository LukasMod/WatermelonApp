import React from "react"
import { StyleSheet, Text, View } from "react-native"

import withObservables from "@nozbe/with-observables"

const Comment = ({ comment }) => {
  return (
    <View>
      <Text>{comment.body}</Text>
    </View>
  )
}

// const styles = StyleSheet.create({})
const enhance = withObservables(["comment"], ({ comment }) => ({
  comment, // shortcut syntax for `comment: comment.observe()`
}))
const EnhancedComment = enhance(Comment)
export default EnhancedComment
