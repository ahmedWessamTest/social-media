import {
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "flowbite-react";
import { Loader2, SquarePen, X } from "lucide-react";
import { memo, useCallback, useContext, useState } from "react";
import { updatePost } from "../../utils/loaders";
import { PostsContext } from "../../contexts/postsContext";
import { env } from "../../environment/environment";

function UpdateModal({ isOpen, setIsOpen, post }) {
  const { setPosts } = useContext(PostsContext);
  const [content, setContent] = useState(post.body);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const [picture, setPicture] = useState({
    picturePreview: post.image || null,
    pictureAsFile: null,
  });

  const handleChange = useCallback(
    (e) => {
      setContent(e.target.value);
      if (alertMessage) setAlertMessage(false);
    },
    [alertMessage]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (content.trim().length < 2) {
        setAlertMessage("post content should more than 2 characters");
        setIsError(true);
        return;
      }
      setIsLoading(true);
      setAlertMessage(null);
      try {
        const formData = new FormData();
        formData.append("body", content);
        if ((picture, picture.pictureAsFile)) {
          formData.append("image", picture.pictureAsFile);
        }
        const updatedPost = await updatePost(post._id, formData);
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === updatedPost.post._id
              ? {
                  ...updatedPost.post,
                  user: {
                    photo: env.loggedUserData.photo,
                    name: env.loggedUserData.name,
                    _id: env.loggedUserData._id,
                  },
                }
              : post
          )
        );
        setAlertMessage("Post updated successfully");
        setIsError(false);
        setTimeout(() => setIsOpen(false), 1500);
      } catch (error) {
        console.error("error in update post:", error);
        setAlertMessage(
          error.response?.data?.message || "Failed to update post"
        );
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [content, picture, post._id, setPosts, setIsOpen]
  );
  const getImage = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 2 * 1024 * 1024) {
        setAlertMessage("file size should be less than 2MB");
        setIsError(true);
        return;
      }
      setPicture({
        picturePreview: URL.createObjectURL(file),
        pictureAsFile: file,
      });
      setAlertMessage(null);
    }
  }, []);
  return (
    <Modal
      show={isOpen}
      onClose={() => {
        if (!isLoading) {
          setIsOpen(false);
        }
      }}
    >
      <ModalHeader className="bg-white border-0 text-[#0C1024]">
        <p className="text-[#0C1024]">{post.user.name}</p>
      </ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody className="bg-white space-y-4">
          {post.image && (
            <div className="relative w-fit mx-auto group">
              <div
                className="absolute inset-0 flex opacity-0 group-hover:opacity-100 transition-opacity
              duration-300 items-center justify-center"
              >
                <Label
                  htmlFor="dropzone-file"
                  className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-black/90 h-full"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 2MB)
                    </p>
                  </div>
                  <FileInput
                    id="dropzone-file"
                    onChange={getImage}
                    className="hidden"
                  />
                </Label>
              </div>
              {(picture.picturePreview || post.image) && (
                <img
                  loading="lazy"
                  src={picture.picturePreview || post.image}
                  className="w-full max-h-[60vh] object-contain"
                  alt="post content"
                />
              )}
            </div>
          )}
        </ModalBody>
        <ModalFooter className="bg-white border-0  p-4 block space-y-4">
          {alertMessage && (
            <div
              className={`w-full p-3 rounded-lg flex items-center justify-between ${
                isError
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-gray-800"
              }`}
            >
              <span>{alertMessage}</span>
              <button
                onClick={() => {
                  setAlertMessage(null);
                }}
                className="hover:opacity-70 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          )}
          <div className="flex gap-2 items-center">
            <Textarea
              value={content}
              autoFocus
              onChange={handleChange}
              style={{
                background: "white",
                borderColor: "#E2E8F0",
                borderRadius: 8,
                width: "calc(100% - 20px)",
                color: "#27364B",
              }}
              type="text"
              placeholder="post content"
              disabled={isLoading}
              rows={1}
              resize="none"
              required
            />
            <button className="cursor-pointer flex items-center justify-center w-8 h-8 hover:text-[#4C68D5] transition-colors duration-300">
              {isLoading ? (
                <Loader2 className="w-5 h-5 text-[#4C68D5] animate-spin cursor-not-allowed" />
              ) : (
                <SquarePen size={20} />
              )}
            </button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default memo(UpdateModal);
