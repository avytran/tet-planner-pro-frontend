import React from "react";
import CommonButton from "../Button/CommonButton";

export default function EditTotalBudgetModal({ onSave, onClose }) {
  return (
    <div className="fixed inset-0  bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-3xl w-96">
        <h2 className="text-xl font-bold mb-4">Your total budget</h2>
        <input
          type="number"
          placeholder="Enter new budget"
          className="w-full p-2 border border-gray-300 rounded mb-4 font-medium focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex justify-end gap-2">
          <CommonButton label={"Cancel"} color="secondary" onClick={onClose}>
            Cancel
          </CommonButton>
          <CommonButton label={"Save"} onClick={onSave}>
            Save
          </CommonButton>
        </div>
      </div>
    </div>
  );
}
