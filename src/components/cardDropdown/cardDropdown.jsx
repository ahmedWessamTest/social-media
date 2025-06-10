import { Dropdown, DropdownItem } from "flowbite-react";
import DeleteModal from "../deleteModal/deleteModal";
import { memo, useCallback, useContext, useRef, useState } from "react";
import { env } from "../../environment/environment";
import UpdateModal from "../updateModal/updateModal";
import { PostsContext } from "../../contexts/postsContext";

function PostCardDropdown({ post }) {
  const { savedPostsList, setSavedPostsList, savedPosts, setSavedPosts } = useContext(PostsContext);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const isSavedRef = useRef(savedPostsList.includes(post._id));
  const handleSavePost = useCallback(() => {
    if (!isSavedRef.current) {
      // const savedPosts = JSON.parse(localStorage.getItem("savedPosts")) || [];
      const newSavedPosts = [...savedPosts, post];
      setSavedPosts(newSavedPosts);
      localStorage.setItem("savedPosts", JSON.stringify(newSavedPosts));
      setSavedPostsList((prev) => [...prev, post._id]);
      isSavedRef.current = true;
      // localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
    } else {
      // const savedPosts = JSON.parse(localStorage.getItem("savedPosts"));
      const filtered = savedPosts.filter((p) => p._id !== post._id);
      setSavedPosts(filtered);

      setSavedPostsList((prev) => prev.map((id) => id !== post._id));
      isSavedRef.current = false;

      localStorage.setItem("savedPosts", JSON.stringify(filtered));
    }
  }, [post, setSavedPostsList]);
  return (
    <>
      <Dropdown
        inline
        label={<span className="text-[#5D6778]font-bold text-[18px] cursor-pointer">...</span>}
        arrowIcon={false}
        style={{
          backgroundColor: "white",
        }}
        className="*:bg-white "
      >
        {post.user._id == env.loggedUserData._id && (
          <>
            <DropdownItem
              className="hover:!bg-[#F1F4F9] !bg-white"
              onClick={() => {
                setUpdateModalIsOpen(true);
              }}
            >
              <span className="block px-2 py-1 text-sm text-[#27364B] cursor-pointer">Edit</span>
            </DropdownItem>
            <DropdownItem
              className="hover:!bg-[#F1F4F9] !bg-white"
              onClick={() => {
                setDeleteModalIsOpen(true);
              }}
            >
              <span className="block px-2 py-1 text-sm text-[#27364B] cursor-pointer">Delete</span>
            </DropdownItem>
          </>
        )}
        <DropdownItem className="hover:!bg-[#F1F4F9] !bg-white" onClick={handleSavePost}>
          <span className="block px-2 py-1 text-sm text-[#27364B] cursor-pointer">{savedPostsList.includes(post._id) ? "unsave" : "save"}</span>
        </DropdownItem>
      </Dropdown>
      {deleteModalIsOpen && <DeleteModal isOpen={deleteModalIsOpen} setIsOpen={setDeleteModalIsOpen} id={post._id} modalMode={"post"} />}
      {updateModalIsOpen && <UpdateModal isOpen={updateModalIsOpen} setIsOpen={setUpdateModalIsOpen} post={post} />}
    </>
  );
}
export default memo(PostCardDropdown);
