import React, { useState } from "react";
import CustomDropzone from "../../../components/CustomDropzone";
import ImageUpload from "../../../components/ImageUpload";
import api from "../../../utils/apiEnvironment";
import StatusOverlay from "../../../components/StatusOverlay";

export default function ChangeAvatar() {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: null, data: null });

  function saveChangesHandler() {
    const formData = new FormData();
    formData.append("photo", image);

    updateAvatar("/users/upload-photo", formData, { headers: { "Content-Type": "multipart/form-data" } });

    async function updateAvatar(url, body, config) {
      try {
        setStatus({ ...status, loading: true });
        const response = await api.put(url, body, config);
        // console.log("response:", response);
        console.log("avatar updated successfully:", response.data);
        setImage(null);
        setStatus({ loading: false, error: null, data: response.data.message });
      } catch (error) {
        setStatus({ loading: false, error: error.message, data: null });
        console.error("Error updating avatar:", error);
      }
    }
  }

  function dismissOverlay() {
    setStatus({ loading: false, error: null, data: null });
  }

  return (
    <div className="flex flex-col w-full gap-4 lg:p-4 justify-center bg-white md:min-w-70 lg:min-w-80 transition-all relative">
      <StatusOverlay status={status} onDismiss={dismissOverlay} />

      <ImageUpload isDropzone selectedImage={image} setSelectedImage={setImage} />

      <div>
        <button className="py-2.5 px-6 bg-[#0C1024] text-white font-medium text-sm rounded-md hover:cursor-pointer" onClick={saveChangesHandler}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
