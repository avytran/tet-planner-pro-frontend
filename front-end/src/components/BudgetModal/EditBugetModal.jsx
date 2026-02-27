import { useState } from "react";
import CommonButton from "../Button/CommonButton";
import { useAuth } from "@/hooks/useAuth";
import {
  createBudgetThunk,
  updateBudgetThunk,
} from "@/features/budget/budgetThunks";
import { useDispatch, useSelector } from "react-redux";
import { validateBudget } from "@/utils/budgetValidation";
import {
  selectTotalAllocation,
  selectTotalBudget,
} from "@/features/budget/budgetSelectors";

export default function EditBudgetModal({
  onClose,
  currentBudget = 0,
  spending = 0,
  budgetName = "",
  type,
  id,
}) {
  const { user } = useAuth();
  const totalBudget = useSelector(selectTotalBudget);
  const totalAllocation = useSelector(selectTotalAllocation);
  const [amount, setAmount] = useState(currentBudget || 0);
  const [name, setName] = useState(budgetName || "");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitUpdateBudget = async () => {
    const { isValid, message } = validateBudget(
      amount,
      totalBudget - totalAllocation,
      spending,
    );

    setErrorMessage(message);

    if (!isValid) return;
    try {
      if (type === "Add") {
        await dispatch(
          createBudgetThunk({
            userId: user.id,
            input: {
              allocatedAmount: parseFloat(amount),
              name: name,
            },
          }),
        ).unwrap();
      } else {
        console.log("this update");
        await dispatch(
          updateBudgetThunk({
            id,
            input: {
              allocatedAmount: parseFloat(amount),
              name: name,
              userId: user.id,
            },
          }),
        ).unwrap();
      }
      onClose();
    } catch (err) {
      console.log(err);
      alert("Something went wrong while saving your budget.");
    }
  };
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0  bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-3xl w-96">
        <h2 className="text-3xl font-bold mb-4">Budget Category</h2>
        <h3 className="text-2xl">Budget name</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter budget name"
          className="w-full p-2 border border-gray-300 rounded-xl mb-4 font-medium focus:outline-none focus:ring-2 focus:ring-primary mt-2"
        />

        <h3 className="text-2xl">Allocated amount</h3>
        <input
          min={0}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="Enter allocated ammount"
          className="w-full p-2 border border-gray-300 rounded-xl mb-2 font-medium focus:outline-none focus:ring-2 focus:ring-primary mt-2"
        />
        <p className="h-full flex justify-end mb-2">VND</p>
        {errorMessage && <div className="text-danger mb-2">{errorMessage}</div>}
        <div className="flex justify-end gap-2">
          <CommonButton label={"Cancel"} color="secondary" onClick={onClose}>
            Cancel
          </CommonButton>
          <CommonButton label={"Save"} onClick={() => onSubmitUpdateBudget()}>
            Save
          </CommonButton>
        </div>
      </div>
    </div>
  );
}
