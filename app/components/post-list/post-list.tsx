import React from "react"
import withObservables from "@nozbe/with-observables"
import { TextStyle, View } from "react-native"
import PostItem from "../post/post"
import { Text } from ".."
import { observePosts } from "../../db/model/helpers"

const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

const PostList = ({ posts }) => {
  return (
    <View>
      <Text text={posts ? posts.length : "nothing"} style={HEADER_TITLE} />
      {posts &&
        posts.length > 0 &&
        posts.map((item, index) => <PostItem key={index} post={item} />)}
    </View>
  )
}

const enhanceWithPosts = withObservables(["posts"], () => ({
  posts: observePosts(),
}))
export default enhanceWithPosts(PostList)
