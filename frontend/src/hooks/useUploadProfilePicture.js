import { useState } from "react";
import { axiosInstance } from "../lib";
import toast from "react-hot-toast";

export const useUploadProfilePicture = () => {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(false);

  const mutate = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setData(base64Image);
      setIsPending(true);

      try {
        const res = await axiosInstance.patch(
          "/api/auth/update-profile-picture",
          { profilePic: base64Image },
        );
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setIsPending(false);
      }
    };
  };

  return { mutate, data, isPending };
};
