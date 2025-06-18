import { Children, createContext, useState } from "react";

export const CommentContext = createContext();
export const CommentProvider = ({ children }) => {
  const [editingComment, setEditingComment] = useState({
    text: "",
    isEditing: false,
    id: null,
  });
  const startEditing = (text, id) => {
    setEditingComment({
      text,
      isEditing: true,
      id,
    });
  };
  const cancelEditing = () => {
    setEditingComment({
      text: "",
      isEditing: false,
      id: null,
    });
  };

  return (
    <CommentContext.Provider
      value={{ editingComment, startEditing, cancelEditing }}
    >
      {children}
    </CommentContext.Provider>
  );
};
