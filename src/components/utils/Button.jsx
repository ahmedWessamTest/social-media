import { useState } from "react";
import { LoaderCircle, Check } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";


export default function Button({
  label = "Continue",
  loadingLabel = "Proceeding...",
  doneLabel = "Done",
  onClick,
  disabled = false,
  className = "",
  doneDuration = 2000,
  type = "submit",
  loading: loadingProp, // new controlled loading prop
}) {
  const [internalLoading, setInternalLoading] = useState(false);
  const [done, setDone] = useState(false);

  const isControlled = loadingProp !== undefined;
  const loading = isControlled ? loadingProp : internalLoading;

  const handleClick = async (e) => {
    if (disabled || loading) return;

    if (!isControlled) setInternalLoading(true);
    setDone(false);

    try {
      await onClick?.(e);
      if (!isControlled) {
        setInternalLoading(false);
        setDone(true);
        setTimeout(() => setDone(false), doneDuration);
      }
    } catch (err) {
      console.error("LoadingButton error:", err);
      if (!isControlled) setInternalLoading(false);
    }
  };

  return (
    <motion.button
    whileHover={
      { scale: !disabled && !loading && !done ? 1.1 : 1 }
    }
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={clsx(
        "w-full py-2 px-4 rounded-md text-white flex items-center justify-center space-x-2 transition-all",
        {
          "bg-black hover:bg-gray-800": !disabled && !loading && !done,
          "bg-gray-400 cursor-not-allowed": disabled && !loading,
          "bg-gray-700": loading,
          "bg-green-600": done,
        },
        className
      )}
    >
      {loading && <LoaderCircle className="animate-spin w-5 h-5 text-white" />}
      {done && !loading && <Check className="w-5 h-5 text-white" />}
      <span className="transition-opacity duration-200">
        {loading ? loadingLabel : done ? doneLabel : label}
      </span>
    </motion.button>
  );
}
