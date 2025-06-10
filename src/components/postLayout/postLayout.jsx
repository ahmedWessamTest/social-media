import React, { useCallback, useContext, useEffect, useRef } from "react";
import PostCard from "../postCard/postCard";
import { Alert } from "flowbite-react";
import { Info } from "lucide-react";
import LoadingSkeleton from "../loadingSkeleton/loadingSkeleton";
import { PostsContext } from "../../contexts/postsContext";
import { useLocation } from "react-router-dom";

const PostLayout = () => {
  const { pathname } = useLocation();
  const { posts, isLoading, hasError, hasMore, isFetching, getAllData, getUserData } = useContext(PostsContext);

  const listInnerRef = useRef();
  const pageRef = useRef(1);
  const scrollTimeoutRef = useRef(null);

  // Initial load
  useEffect(() => {
    if (pathname == "/home") {
      getAllData(1);
    } else if (pathname == "/profile") {
      getUserData(1);
    }
    pageRef.current = 1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      scrollTimeoutRef.current && clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleScroll = useCallback(() => {
    if (!listInnerRef.current || isFetching || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 300;

    if (isNearBottom) {
      scrollTimeoutRef.current && clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        pageRef.current += 1;
        if (pathname == "/home") {
          getAllData(pageRef.current);
        } else if (pathname == "/profile") {
          getUserData(pageRef.current);
        }
      }, 200);
    }
  }, [isFetching, hasMore, getAllData, getUserData, pathname]);

  if (hasError) {
    return (
      <Alert color="failure" icon={Info}>
        <span className="font-medium">Error!</span> Failed to load posts. Please try again later.
      </Alert>
    );
  }

  return (
    <div className="space-y-4 overflow-y-auto" onScroll={handleScroll} ref={listInnerRef} style={{ maxHeight: "100vh" }}>
      {posts.map((post) => (
        <PostCard key={`${post.id}-${post.updatedAt || post.createdAt}`} post={post} />
      ))}

      {isLoading && <LoadingSkeleton />}

      {!hasMore && posts.length > 0 && <div className="text-center py-4 text-gray-500">You've reached the end of the list</div>}

      {!isLoading && posts.length === 0 && <div className="text-center py-4 text-gray-500">No posts available</div>}
    </div>
  );
};

export default PostLayout;
