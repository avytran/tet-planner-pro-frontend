const createValidation = (amount, rules) => {
  for (const rule of rules) {
    if (!rule.condition(amount)) {
      return { isValid: false, message: rule.message };
    }
  }
  return { isValid: true, message: "" };
};

export const validateTotalBudget = (amount, totalAllocation) =>
  createValidation(amount, [
    {
      condition: (amt) => amt !== null && amt !== "" && amt >= 0 && !isNaN(amt),
      message: "Enter a valid amount",
    },
    {
      condition: (amt) => amt >= totalAllocation,
      message:
        "Your new budget is lower than your current category allocations. You may need to adjust category budgets to stay balanced.",
    },
  ]);

export const validateBudget = (amount, remaining, spending) =>
  createValidation(amount, [
    {
      condition: (amt) => amt !== null && amt !== "" && amt >= 0 && !isNaN(amt),
      message: "Enter a valid amount",
    },
    {
      condition: (amt) => amt >= spending,
      message:
        "Your new budget is lower than your current shopping items spending. You may need to adjust your shopping items first to stay balanced.",
    },
    {
      condition: (amt) => amt <= remaining,
      message:
        "Your new budget is higher than your total remaining. You may need to adjust your total budget or other categories first to stay balanced.",
    },
  ]);
