import React, { useState } from "react";
import CommonButton from "../Button/CommonButton";
import { useMutation } from "@apollo/client/react";
import { UPDATE_TOTAL_BUDGET } from "@/graphql/mutations/budget.mutation";
import { validateBudget } from "@/utils/budgetValidation";
import { useAuth } from "@/hooks/useAuth";

export default function EditTotalBudgetModal({
  onClose,
  totalAllocation,
  currentBudget,
}) {
  const { user } = useAuth();

  const [amount, setAmount] = useState(currentBudget);
  const [errorMessage, setErrorMessage] = useState("");
  const [updateTotalBudget] = useMutation(UPDATE_TOTAL_BUDGET);
  const onSubmitTotalBudget = async () => {
    const { isValid, message } = validateBudget(amount, totalAllocation);

    setErrorMessage(message);

    if (!isValid) return;
    try {
      await updateTotalBudget({
        variables: {
          userId: user.id,
          input: {
            totalBudget: parseFloat(amount),
          },
        },
      });
      onClose();
    } catch (err) {
      const message = err.networkError
        ? "Server error. Please try again."
        : "Update failed. Please try again.";
      alert(message);
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
        <p className="h-full flex justify-end mb-2">VND</p>
        {errorMessage && <div className="text-danger">{errorMessage}</div>}
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
