export const STATUS_CONFIG = {
  safe: {
    basedColor: "success",
    fadedColor: "color-mix(in srgb, var(--color-success), transparent 70%)",
    messageTitle: "Great! Everything is safe",
    messageDescription:
      "Your Tết budget is looking great! 🎉 You’re spending smart and staying on track.",
  },

  caution: {
    basedColor: "accent",
    fadedColor: "color-mix(in srgb, var(--color-festive), transparent 70%)",
    messageTitle: "Be careful! Your budget is below safe level",
    messageDescription:
      "It’s important to keep an eye on your spending and make adjustments to stay within your limits.",
  },

  warning: {
    basedColor: "danger",
    fadedColor: "color-mix(in srgb, var(--color-danger), transparent 70%)",
    messageTitle: "Warning! You’re close to your budget limit",
    messageDescription:
      "You’re getting close to your budget limit 👀 A little planning now will keep your Tết stress-free.",
  },

  default: {
    basedColor: "accent-soft",
    fadedColor: "color-mix(in srgb, var(--color-accent-soft), transparent 70%)",
    messageTitle: "Plan your budget for a joyful Tết",
    messageDescription:
      "Set a budget that lets you enjoy the festivities without worrying about overspending. A little planning goes a long way!",
  },
};

export const BUDGET_COLORS = ["bg-accent", "bg-accent-soft", "bg-festive"];

export const BUDGET_CHART_COLORS = [
  "var(--color-primary-strong)",
  "var(--color-primary)",
  "var(--color-danger)",
  "var(--color-accent)",
  "var(--color-accent-soft)",
  "var(--color-highlight)",
  "var(--color-festive)",
];

export const LINE_CHART_DATA = [
  {
    curve: "linear",
    color: "var(--color-success)",
    data: [0, 5, 2, 6, 3, 9.3, 9.5, 4, 3, 7, 5],
    label: "Food",
  },
  {
    curve: "linear",
    color: "var(--color-danger)",
    data: [6, 3, 7, 9.5, 4, 2, 5, 2, 6, 3, 9.3],
    label: "Decoration",
  },
  {
    curve: "linear",
    color: "var(--color-accent)",
    data: [9.3, 0, 5, 2, 6, 3, 3, 7, 9.5, 4],
    label: "Cloths",
  },
  {
    curve: "linear",
    color: "var(--color-highlight)",
    data: [5, 2, 6, 3, 2, 6, 3, 9.3, 7, 9.5, 4],
    label: "Others",
  },
];
