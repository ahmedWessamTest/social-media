import React, { useContext } from "react";
import { PostsContext } from "../../../contexts/postsContext";
import PostCard from "../../../components/postCard/postCard";

export default function SavedPosts() {
  const { savedPosts } = useContext(PostsContext);

  console.log("SavedPosts", savedPosts);

  return (
    <div>
      {savedPosts.length > 0 && savedPosts.map((post) => (
        <PostCard key={`${post.id}-${post.updatedAt || post.createdAt}`} post={post} />
      ))}
      {savedPosts.length == 0 && <h1 className="text-center text-2xl font-bold text-gray-400">not have saved posts</h1>}
    </div>
  );
}
