import { useState } from "react";
import Trash from "../icons/Trash";

const DeleteButton = ({ label, onDelete, className }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed flex bg-black/60 items-center justify-center inset-0 ">
        <div className="rounded-lg bg-white p-4 ">
          <div className="text-center">
            Are you sure you want to{" "}
            <span className="text-primary font-semibold">DELETE</span>?
          </div>
          <div className="flex gap-2 mt-2">
            <button type="button" onClick={() => setShowConfirm(false)}>
              cancel
            </button>
            <button
              type="button"
              className="primary"
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
            >
              {" "}
              Yes,&nbsp;Delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      className={className}
      type="button"
      onClick={() => setShowConfirm(true)}
    >
      <Trash className={"w-6 h-6 focus:text-primary"} />
      <span>{label}</span>
    </button>
  );
};

export default DeleteButton;
