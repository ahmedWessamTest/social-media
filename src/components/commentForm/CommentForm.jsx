import { Alert, Textarea } from "flowbite-react";
import { InfoIcon, Send, Loader2, SquarePen, PencilOff } from "lucide-react";
import { memo, useContext, useEffect, useState } from "react";
import { sendComment, updateComment } from "../../utils/loaders";
import { CommentContext } from "../../contexts/commentContext";
import { PostsContext } from "../../contexts/postsContext";

const CommentForm = ({ postId }) => {
  const { editingComment, cancelEditing } = useContext(CommentContext);
  const { setPosts } = useContext(PostsContext);
  const [userComment, setUserComment] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (editingComment.isEditing) setUserComment(editingComment.text);
    return function () {
      setUserComment("");
      if (editingComment.isEditing) cancelEditing();
    };
  }, [editingComment, cancelEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userComment.trim().length < 2) {
      showError("Should enter more than 1 character");
      return;
    }

    if (!userComment.trim() || isLoading) return;

    setIsLoading(true);
    setHasError(false);

    try {
      let res = null;
      if (editingComment.isEditing) {
        cancelEditing();
        res = await updateComment(userComment, editingComment.id);
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === res.comment.post
              ? {
                  ...post,
                  comments: post.comments.map((comment) =>
                    comment._id === res.comment.id
                      ? { ...res.comment, content: res.comment.content }
                      : comment
                  ),
                }
              : post
          )
        );
      } else {
        res = await sendComment(userComment, postId);
        if (res.error) {
          throw new Error(res.error);
        }
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, comments: res.comments } : post
          )
        );
      }
      setUserComment("");
    } catch (error) {
      showError(error.message || "Failed to post comment");
    } finally {
      setIsLoading(false);
    }
  };

  const showError = (message) => {
    setErrorData(message);
    setHasError(true);
    setTimeout(() => {
      setHasError(false);
      setErrorData(null);
    }, 3000);
  };

  const handleChange = (e) => {
    setUserComment(e.target.value);
  };

  return (
    <div className="w-full">
      {hasError && (
        <Alert
          color="failure"
          icon={InfoIcon}
          onDismiss={() => setHasError(false)}
          className="mb-4"
        >
          <span className="font-medium">Error!</span> {errorData}
        </Alert>
      )}
      <form
        className={`p-4 flex gap-2 transition-[width,margin] w-full duration-500 mx-auto items-center ${
          editingComment.isEditing &&
          "border border-[#4C68D5] rounded-2xl !w-3/4  mt-2 mb-2"
        } `}
        onSubmit={handleSubmit}
      >
        <Textarea
          value={userComment}
          onChange={handleChange}
          autoFocus
          style={{
            background: "white",
            borderColor: "#E2E8F0",
            borderRadius: 8,
            width: "calc(100% - 20px)",
            color: "#27364B",
          }}
          type="text"
          placeholder="Write a comment..."
          disabled={isLoading}
          rows={1}
          resize="none"
        />
        <div className="flex flex-col justify-center items-center">
          <button
            type="submit"
            className="cursor-pointer flex items-center justify-center w-8 h-8 hover:text-[#4C68D5] transition-colors duration-300"
            disabled={isLoading || !userComment.trim()}
            aria-label="Post comment"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-[#4C68D5] animate-spin cursor-not-allowed" />
            ) : editingComment.isEditing ? (
              <SquarePen size={20} />
            ) : (
              <Send size={20} />
            )}
          </button>
          {editingComment.isEditing && (
            <button
              onClick={cancelEditing}
              className="cursor-pointer hover:text-[#4C68D5]"
            >
              <PencilOff size={20} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default memo(CommentForm);
