import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import CommentCard from "../commentCard/commentCard";
import { memo } from "react";
import CommentForm from "../commentForm/CommentForm";

function PostModal({ isOpen, setOpenModal, post }) {
  return (
    <Modal
      show={isOpen}
      onClose={() => {
        setOpenModal(false);
      }}
    >
      <ModalHeader className="bg-white border-0 text-[#0C1024]">
        <p className="text-[#0C1024]">{post.user.name}</p>
      </ModalHeader>
      <ModalBody className="bg-white space-y-4">
        {post.image && (
          <img
            loading="lazy"
            src={post.image}
            className="w-full max-h-[60vh] object-contain"
            alt="post content"
          />
        )}
        <p className="text-[#27364B] text-[14px] py-3">{post.body}</p>
        <div className="space-y-4 max-h-[300px] overflow-y-auto">
          {post.comments.map((comment) => (
            <CommentCard comment={comment} key={comment._id} />
          ))}
        </div>
      </ModalBody>
      <ModalFooter className="bg-white border-0 !block p-0">
        <CommentForm className="w-full" postId={post.id} />
      </ModalFooter>
    </Modal>
  );
}

export default memo(PostModal);
