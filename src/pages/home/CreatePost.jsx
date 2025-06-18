import React, { useContext, useState } from "react";
import StatusOverlay from "../../components/StatusOverlay";
import ImageUpload from "../../components/ImageUpload";
import useTextValidation from "../../hooks/useTextValidation";
import api from "../../utils/apiEnvironment";
import { env } from "../../environment/environment";
import { PostsContext } from "../../contexts/postsContext";

export default function CreatePost() {
  const { userPhoto } = useContext(PostsContext);
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    data: null,
  });
  const [image, setImage] = useState(null);
  const [postContent, setPostContent] = useState("");
  const {
    error: textValidError,
    setError: setTextValidError,
    validateAndSanitize,
  } = useTextValidation("Post content cannot be empty.");

  function postClickHandler(e) {
    e.preventDefault();
    const sanitizedContent = validateAndSanitize(postContent);
    if (!sanitizedContent) return;

    const formData = new FormData();
    formData.append("body", sanitizedContent);
    if (image) {
      formData.append("image", image);
    }

    newPost("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    async function newPost(url, body, config) {
      try {
        setStatus({ ...status, loading: true });
        const response = await api.post(url, body, config);
        console.log("response:", response);
        console.log("Post created successfully:", response.data);
        setPostContent("");
        setImage(null);
        setStatus({ loading: false, error: null, data: response.data.message });
      } catch (error) {
        setStatus({ loading: false, error: error.message, data: null });
        console.error("Error creating post:", error);
      }
    }
  }

  function dismissOverlay() {
    setStatus({ loading: false, error: null, data: null });
  }

  return (
    <div
      className="w-full  px-4 py-5 sm:px-7 sm:py-5 bg-white flex flex-col gap-5 rounded-lg border-1 border-[#ECF0F5] relative"
      style={{
        fontFamily:
          " Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif",
      }}
    >
      <StatusOverlay status={status} onDismiss={dismissOverlay} />

      <div className="flex gap-4 items-center">
        <div className="w-12 h-12 overflow-hidden rounded-full">
          <img
            src={userPhoto || env.loggedUserData.photo}
            alt=""
            className=" bg-gray-200 block w-full h-full"
          />
        </div>

        <div className="w-full relative">
          <textarea
            name="newPost"
            id="newPost"
            placeholder={`${"\n"}What's on your mind?`}
            rows={3}
            className={`${
              textValidError
                ? "border-red-500 placeholder:text-red-500"
                : "border-[#E2E8F0] placeholder:text-[#838B98]"
            } placeholder:pt-2 border-b-1 placeholder:text-sm resize-none w-full outline-none text-[#0C1024] text-base font-normal active:border-[#0C1024] focus:border-[#0C1024] focus:ring-0 focus:placeholder:text-white`}
            value={postContent}
            onChange={(e) => {
              setPostContent(e.target.value);
              setTextValidError("");
            }}
          ></textarea>

          {textValidError && (
            <div className="absolute text-red-500 text-xs">
              {textValidError}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start justify-between gap-0 sm:gap-2 md:gap-4 ps-16">
        <ImageUpload selectedImage={image} setSelectedImage={setImage} />

        <button
          className=" bg-[#4C68D5] text-white text-sm py-2 px-5.5 ms-2 sm:ms-0 rounded-full transition-colors duration-200 hover:cursor-pointer hover:bg-[#3b51a8] active:bg-[#2a3a7a]"
          onClick={postClickHandler}
        >
          Post
        </button>
      </div>
    </div>
  );
}
