import { memo, useContext, useState } from "react";
import { getTime } from "../../utils/services";
import { CommentContext } from "../../contexts/commentContext";
import { env } from "../../environment/environment";
import { BadgeX, Pencil } from "lucide-react";
import DeleteModal from "../deleteModal/deleteModal";

const CommentCard = ({ comment }) => {
  const { startEditing } = useContext(CommentContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <div className="bg-[#F1F4F9] p-4 rounded-lg">
        <div className="card-header mb-2 flex justify-between items-center border-[#ECF0F5]">
          <div className="flex gap-3 items-center">
            {!comment.commentCreator.photo.includes("undefined") && (
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <img
                  src={comment.commentCreator.photo}
                  alt={comment.commentCreator.name}
                  className="w-100 block"
                />
              </div>
            )}
            <div>
              <h4 className="font-medium text-[14px] text-[#0C1024]">
                {comment.commentCreator.name}
              </h4>
              <h5 className="font-normal text-[12px] text-[#27364B]">
                Sales Manager
              </h5>
            </div>
          </div>
          <div className="flex flex-col items-end">
            {comment.commentCreator._id == env.loggedUserData._id && (
              <div className="flex items-center gap-2">
                <button
                  className="text-[#707988] hover:text-[#4C68D5] text-[12px] cursor-pointer"
                  onClick={() => {
                    startEditing(comment.content, comment._id);
                  }}
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="text-[#707988] hover:text-red-500  text-[12px] cursor-pointer"
                  onClick={() => {
                    setIsOpenModal(true);
                  }}
                >
                  <BadgeX size={16} />
                </button>
              </div>
            )}
            <span className="text-[#707988] text-[12px] mt-2">
              {getTime(comment.createdAt)}
            </span>
          </div>
        </div>
        <div className="card-body">
          <p className="text-[#27364B] text-sm py-2">{comment.content}</p>
        </div>
      </div>
      {isOpenModal && (
        <DeleteModal
          modalMode={"comment"}
          id={comment._id}
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
        />
      )}
    </>
  );
};

export default memo(CommentCard);
