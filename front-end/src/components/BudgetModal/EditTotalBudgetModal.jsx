import { useState } from "react";
import CommonButton from "../Button/CommonButton";
import { validateTotalBudget } from "@/utils/budgetValidation";
import { useAuth } from "@/hooks/useAuth";
import {
  selectTotalAllocation,
  selectTotalBudget,
} from "@/features/budget/budgetSelectors";
import { useDispatch, useSelector } from "react-redux";
import { updateTotalBudgetThunk } from "@/features/budget/budgetThunks";

export default function EditTotalBudgetModal({ onClose }) {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const totalBudget = useSelector(selectTotalBudget);
  const totalAllocation = useSelector(selectTotalAllocation);
  const [amount, setAmount] = useState(totalBudget);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitTotalBudget = async () => {
    const { isValid, message } = validateTotalBudget(amount, totalAllocation);
    setErrorMessage(message);

    if (!isValid) return;

    try {
      await dispatch(
        updateTotalBudgetThunk({
          userId: user.id,
          amount: parseFloat(amount),
        }),
      ).unwrap();

      onClose();
    } catch (err) {
      alert("Update failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0  bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-3xl w-96">
        <h2 className="text-xl font-bold mb-4">Your total budget</h2>
        <input
          min={0}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="Enter new budget"
          className="w-full p-2 border border-gray-300 rounded-xl mb-2 font-medium focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="h-full flex justify-end ">VND</p>
        {errorMessage && (
          <div className="text-danger mt-2 mb-2">{errorMessage}</div>
        )}
        <div className="flex justify-end gap-2">
          <CommonButton label={"Cancel"} color="secondary" onClick={onClose}>
            Cancel
          </CommonButton>
          <CommonButton
            label={"Save"}
            onClick={() => onSubmitTotalBudget(amount)}
          >
            Save
          </CommonButton>
        </div>
      </div>
    </div>
  );
}
