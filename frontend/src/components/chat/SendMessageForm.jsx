import { LucideImage, LucideSend, LucideX } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSendMessage } from "../../hooks";
import { playRandomKeyStrokeSound } from "../../lib";
import { useChatStore } from "../../stores";

export const SendMessageForm = ({ targetUserId }) => {
  const isMute = useChatStore((s) => s.isMute);
  const [formValues, setFormValues] = useState({ text: "", image: "" });
  const imageInputRef = useRef(null);

  const { mutate, loading } = useSendMessage({
    targetUserId,
    onSuccess: () => {
      setFormValues({ text: "", image: "" });
    },
  });

  const handleKeyDown = () => {
    if (!isMute) playRandomKeyStrokeSound();
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please select an image file");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const base64Image = reader.result;
      setFormValues({ ...formValues, image: base64Image });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(formValues);
  };

  return (
    <div className="p-4 border-t border-slate-700/50">
      {formValues.image && (
        <div className="flex items-center mb-3">
          <div className="relative">
            <img
              src={formValues.image}
              alt="Selected Image"
              className="size-20 object-cover rounded-lg border border-slate-700"
            />

            <button
              onClick={() => {
                setFormValues({ ...formValues, image: "" });
                imageInputRef.current.value = "";
              }}
              className="absolute size-6 rounded-full -top-2 -right-2 p-0.5 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer flex items-center justify-center text-slate-200"
            >
              <LucideX className="size-4" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="items-center flex gap-4">
        <input
          type="text"
          value={formValues.text}
          onKeyDown={handleKeyDown}
          onChange={(e) =>
            setFormValues({ ...formValues, text: e.target.value })
          }
          placeholder="Type your message..."
          className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4"
        />
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleSelectImage}
          className="hidden"
        />
        <button
          onClick={() => imageInputRef.current?.click()}
          type="button"
          className="bg-slate-800/50 py-2 px-3 rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <LucideImage
            className={`size-4.5 ${formValues.image && "text-cyan-400"}`}
          />
        </button>
        <button
          disabled={loading || (!formValues.text.trim() && !formValues.image)}
          type="submit"
          className="bg-linear-to-r from-cyan-500 to-cyan-600 text-white font-medium py-2 px-3 rounded-lg hover:from-cyan-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <LucideSend className="size-4.5" />
        </button>
      </form>
    </div>
  );
};
