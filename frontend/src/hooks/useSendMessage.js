import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib";
import { useAuthStore } from "../stores";
import { useMessages } from "./useMessages";

export const useSendMessage = ({ targetUserId, onSuccess }) => {
  const { setData } = useMessages();
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((s) => s.user);

  const mutate = async (formValues) => {
    const optimisticId = `${Date.now()}`;
    const optimisticMessage = {
      _id: optimisticId,
      senderId: user._id,
      receiverId: targetUserId,
      text: formValues.text,
      image: formValues.image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isOptimistic: true,
    };
    setData((prev) => [...prev, optimisticMessage]);
    setLoading(true);

    try {
      const res = await axiosInstance.post(
        `/api/messages/send/${targetUserId}`,
        formValues,
      );

      setData((prev) => [
        ...prev.filter((m) => m._id !== optimisticId),
        res.data.response,
      ]);
      onSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setData((prev) => prev.filter((m) => m._id !== optimisticId));
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading };
};
