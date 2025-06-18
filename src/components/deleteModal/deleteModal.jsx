import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { memo, useCallback, useContext, useState } from "react";
import { deleteComment, deletePost } from "../../utils/loaders";
import { Info, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { PostsContext } from "../../contexts/postsContext";

function DeleteModal({ modalMode, id, isOpen, setIsOpen }) {
  const { setPosts } = useContext(PostsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ success: null, message: "" });

  const handleDelete = useCallback(async () => {
    setIsLoading(true);
    setStatus({ success: null, message: "" });

    try {
      if (modalMode === "post") {
        const res = await deletePost(id);
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== res.post._id)
        );
        setStatus({ success: true, message: "Post deleted successfully!" });
        setTimeout(() => setIsOpen(false), 1500);
      } else if (modalMode === "comment") {
        await deleteComment(id);
        setStatus({ success: true, message: "Comment deleted successfully!" });
      }

      // Auto-close after 1.5 seconds on success
      if (status.success) setTimeout(() => setIsOpen(false), 1500);
    } catch (error) {
      console.error("Delete error:", error);
      setStatus({
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to delete. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [setPosts, id, modalMode, setIsOpen, status.success]);

  const resetModal = () => {
    setIsOpen(false);
    setTimeout(() => setStatus({ success: null, message: "" }), 300);
  };

  return (
    <Modal
      show={isOpen}
      size="md"
      onClose={resetModal}
      popup
      dismissible={!isLoading}
    >
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          {/* Status Icon */}
          {status.success === null ? (
            <Info className="mx-auto mb-4 h-14 w-14 text-gray-400 animate-pulse" />
          ) : status.success ? (
            <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-green-500 animate-bounce" />
          ) : (
            <XCircle className="mx-auto mb-4 h-14 w-14 text-red-500 animate-shake" />
          )}

          {/* Main Text */}
          <h3 className="mb-5 text-lg font-normal text-gray-500 ">
            {status.success === null
              ? `Are you sure you want to delete this ${modalMode}?`
              : status.message}
          </h3>

          {/* Action Buttons (only show when not in success state) */}
          {status.success === null && (
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                disabled={isLoading}
                className={`relative cursor-pointer overflow-hidden group transition-all duration-300 ${
                  isLoading
                    ? "opacity-85"
                    : "hover:bg-red-800 hover:scale-[1.02]"
                }`}
                onClick={handleDelete}
              >
                {isLoading && (
                  <span className="absolute inset-0 bg-red-700 opacity-20 group-hover:opacity-30"></span>
                )}
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {"Yes, I'm sure"}
              </Button>

              <Button
                color="gray"
                disabled={isLoading}
                className="hover:bg-gray-200 cursor-pointer  transition-all duration-300 hover:scale-[1.02]"
                onClick={resetModal}
              >
                No, cancel
              </Button>
            </div>
          )}

          {/* Close button for success/error state */}
          {status.success !== null && (
            <Button
              color={status.success ? "success" : "failure"}
              className="mt-4 hover:scale-[1.02] transition-transform duration-200"
              onClick={resetModal}
            >
              Close
            </Button>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
}
export default memo(DeleteModal);
