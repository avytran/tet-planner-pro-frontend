import CommonButton from "../Button/CommonButton";

export const ConfirmationModal = ({ onClose, onConfirm, title, message }) => {
  return (
    <div className="fixed inset-0  bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-3xl w-11/12 md:w-1/2 ">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-xl">{message}</p>
        <div className="flex justify-end gap-3 mt-6">
          <CommonButton label={"Cancel"} color="secondary" onClick={onClose} />

          <CommonButton label={"Confirm"} onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};
