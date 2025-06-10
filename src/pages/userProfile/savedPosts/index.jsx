import React, { useContext } from "react";
import { PostsContext } from "../../../contexts/postsContext";
import PostCard from "../../../components/postCard/postCard";

export default function SavedPosts() {
  const { savedPosts } = useContext(PostsContext);

  console.log("SavedPosts", savedPosts);

  return (
    <div>
      {savedPosts.map((post) => (
        <PostCard key={`${post.id}-${post.updatedAt || post.createdAt}`} post={post} />
      ))}
      ;
    </div>
  );
}
