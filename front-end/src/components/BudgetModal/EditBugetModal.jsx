import { useState } from "react";
import CommonButton from "../Button/CommonButton";
import { useMutation } from "@apollo/client/react";
import {
  CREATE_BUDGET,
  UPDATE_BUDGET,
} from "@/graphql/mutations/budget.mutation";
import { useAuth } from "@/hooks/useAuth";
import { GET_BUDGETS } from "@/graphql/queries/budget.query";

export default function EditBudgetModal({
  onClose,
  totalAllocation,
  currentBudget,
  budgetName,
  totalBudget,
  type,
  id,
}) {
  const { user } = useAuth();

  const [amount, setAmount] = useState(currentBudget || 0);
  const [name, setName] = useState(budgetName || "");
  const [errorMessage, setErrorMessage] = useState("");

  const [createBudget] = useMutation(CREATE_BUDGET, {});
  const [updateBudget] = useMutation(UPDATE_BUDGET);

  const onSubmitUpdateBudget = async () => {
    // const { isValid, message } = validateBudget(amount, totalAllocation);

    // setErrorMessage(message);

    // if (!isValid) return;
    try {
      if (type === "Add") {
        await createBudget({
          variables: {
            input: {
              allocatedAmount: parseFloat(amount),
              name: name,
              userId: user.id,
            },
          },
          refetchQueries: [
            {
              query: GET_BUDGETS,
              variables: {
                userId: user.id,
              },
            },
          ],
        });
      } else {
        await updateBudget({
          variables: {
            updateBudgetOfUserId: id,
            input: {
              allocatedAmount: parseFloat(amount),
              name: name,
              userId: user.id,
            },
          },
        });
      }
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
        {errorMessage && <div className="text-danger">{errorMessage}</div>}
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
