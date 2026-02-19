import { LucideLoader, LucideSend } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib";

export const SendMessageForm = ({ targetUserId }) => {
  const [formValues, setFormValues] = useState({ text: "", image: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post(
        `/api/messages/send/${targetUserId}`,
        formValues,
      );
      setFormValues({ text: "", image: "" });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-6 py-4 border-t items-center flex gap-4 border-slate-700"
    >
      <input
        type="text"
        value={formValues.text}
        onChange={(e) => setFormValues({ ...formValues, text: e.target.value })}
        placeholder="Type your message..."
        className="auth-input px-4"
      />
      <button
        disabled={loading}
        type="submit"
        className="btn btn-primary btn-sm"
      >
        {loading ? (
          <LucideLoader className="size-4.5 animate-spin" />
        ) : (
          <LucideSend className="size-4.5" />
        )}
      </button>
    </form>
  );
};
