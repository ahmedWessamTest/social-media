import { memo, useState } from "react";
import PostCardDropdown from "../cardDropdown/cardDropdown";
import { ChevronUp, MessageCircle, ThumbsUp } from "lucide-react";
import CommentCard from "../commentCard/commentCard";
import PostModal from "../postModal/postModal";
import { getTime } from "../../utils/services";
import CommentForm from "../commentForm/CommentForm";
import { motion } from "framer-motion";

const PostCard = ({ post }) => {
  const [isComment, setIsComment] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="border border-[#ECF0F5] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="card-heder p-4 flex justify-between items-center border-b border-[#ECF0F5]">
          <div className="flex gap-3 items-center">
            <div className="w-14 h-14 overflow-hidden rounded-full">
              <img
                src={post.user.photo}
                alt={post.user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-medium text-[14px] text-[#0C1024]">
              {post.user.name}
            </h4>
          </div>
          <div className="flex flex-col items-end">
            <PostCardDropdown post={post} postId={post._id} />
            <span className="text-[#707988] text-[12px] mt-2">
              {getTime(post.createdAt)}
            </span>
          </div>
        </div>

        {/* Body */}
        <div
          className="card-body p-4 cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          <p className="text-[#27364B] text-[14px] py-3">{post.body}</p>

          {/* 3D Magnetic Image */}
          {post.image && (
            <div
              className="rounded-tr-sm overflow-hidden"
              style={{ perspective: 1000 }}
            >
              <motion.img
                src={post.image}
                alt="post content"
                className="w-full aspect-square object-cover block"
                whileHover={{
                  scale: 1.03,
                }}
                onMouseMove={(e) => {
                  const bounds = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - bounds.left) / bounds.width - 0.5;
                  const y = (e.clientY - bounds.top) / bounds.height - 0.5;
                  e.currentTarget.style.transform = `rotateX(${y * -15}deg) rotateY(${x * 15}deg) scale(1.03)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "rotateX(0deg) rotateY(0deg) scale(1)";
                }}
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.2s ease",
                }}
              />
            </div>
          )}
        </div>

        {/* Comments */}
        <div>
          {isComment ? (
            <>
              <div className="px-4">
                <button
                  className="text-[#5D6778] cursor-pointer"
                  onClick={() => setIsComment(false)}
                >
                  <ChevronUp size={20} />
                </button>
                <div className="card-comments mt-3">
                  {post.comments?.length > 0 && (
                    <CommentCard comment={post.comments[0]} />
                  )}
                </div>
              </div>
              <div>
                <CommentForm postId={post.id} />
              </div>
            </>
          ) : (
            <div className="card-footer p-4 text-[#5D6778] flex justify-between">
              <button
                onClick={() => setIsComment(true)}
                className="flex gap-1 items-center cursor-pointer comment-button hover:text-[#4C68D5] transition-colors"
              >
                <MessageCircle className="w-5" />
                <span className="text-sm">Comment</span>
              </button>
              <button className="py-2 hover:text-[#4C68D5] transition-colors">
                <ThumbsUp className="w-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Modal */}
      {openModal && (
        <PostModal
          isOpen={openModal}
          post={post}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

export default memo(PostCard);
