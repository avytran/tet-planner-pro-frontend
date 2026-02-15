import React from "react";
import ShoppingListCard from "../../components/ShoppingListCard/ShoppingListCard.jsx";
import BudgetMessage from "../../components/BudgetMessage/BudgetMessage.jsx";
import ShoppingListItem from "../../components/ShoppingListItem/ShoppingListItem.jsx";
import BudgetCategoryCard from "../../components/BudgetCategoryCard/BudgetCategoryCard.jsx";
import { PieChart } from "@mui/x-charts/PieChart";
import PieCenterLabel from "../../components/ChartsComponent/PieCenterLabel.jsx";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { Box, Typography } from "@mui/material";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function BudgetManagementPage() {
  const value = 6500000;
  const max = 10000000;
  const percent = Math.round((value / max) * 100);

  const STATUS_CONFIG = {
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
  };

  const statusKey =
    percent > 50 ? "safe" : percent < 20 ? "warning" : "caution";

  const { basedColor, fadedColor, messageTitle, messageDescription } =
    STATUS_CONFIG[statusKey];

  const colors = ["bg-accent", "bg-accent-soft", "bg-festive"];

  const items = [
    {
      name: "Bánh chưng",
      price: 200000,
      quantity: 10,
      category: "Food",
    },
    {
      name: "Hoa đào",
      price: 500000,
      quantity: 2,
      category: "Decoration",
    },
    {
      name: "Mứt Tết",
      price: 300000,
      quantity: 5,
      category: "Food",
    },
  ];

  return (
    <div>
      <div className="bg-bg px-4 py-12 md:p-20">
        <div className="  flex w-full gap-6 flex-wrap justify-center">
          <div className="flex-1 flex flex-col gap-3 ">
            <h1 className="font-bold text-5xl text-primary">Overview</h1>
            <div className="bg-white rounded-3xl p-9 flex flex-col gap-7 h-full">
              <div className="flex  gap-2 items-center h-full">
                <div className="h-3 w-3 rounded-full bg-danger"></div>
                <p className="text-2xl font-semibold">Budget distribution</p>
              </div>
              <PieChart
                series={[
                  {
                    innerRadius: 50,
                    outerRadius: 100,
                    data: [
                      {
                        value: 30,
                        color: "var(--color-accent)",
                        label: "Food",
                      },
                      {
                        value: 30,
                        color: "var(--color-danger)",
                        label: "Decoration",
                      },
                      {
                        value: 40,
                        color: "var(--color-primary)",
                        label: "Others",
                      },
                    ],
                    valueFormatter: (item) => `${item.value}%`,
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: { innerRadius: 30, additionalRadius: -10 },
                  },
                ]}
                height={280}
                width={280}
                hideLegend
              >
                {/* <PieCenterLabel color="var(--color-primary)" fontSize={20}>
                  Class
                </PieCenterLabel> */}
              </PieChart>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-9 flex flex-col gap-5 items-center w-full md:w-auto">
            <div className="flex justify-between items-center w-full">
              <p className="text-2xl font-semibold">Total Budget</p>
              <button
                className="h-5 w-5  cursor-pointer"
                onClick={() => alert("Clik edit button")}
              >
                <PencilIcon />
              </button>
            </div>
            <div className="flex flex-col items-center">
              <Box
                sx={{
                  width: 300,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Gauge
                  width={256}
                  height={256}
                  value={value}
                  valueMax={max}
                  startAngle={-135}
                  endAngle={135}
                  cornerRadius="50%"
                  text={({ value, valueMax }) => {
                    const formatted = (max - value).toLocaleString("en-US");
                    const str = `You've spent \n ${formatted} VND`;
                    return str;
                  }}
                  sx={{
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 15,
                      fontWeight: "semibold",
                    },
                    [`& .${gaugeClasses.valueText} text`]: {
                      fill: "var(--color-primary)",
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                      fill: `var(--color-${basedColor})`,
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                      fill: fadedColor,
                    },
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 32,
                    fontWeight: "bold",
                    color: `var(--color-${basedColor})`,
                    marginTop: "-3.5rem",
                  }}
                >
                  {percent}%
                </Typography>
              </Box>
              <p>Remaining</p>
              <p className={`font-bold text-5xl text-${basedColor}`}>
                {value.toLocaleString("en-US")}
              </p>
              <p className={`font-normal text-base text-${basedColor}`}>
                /{max.toLocaleString("en-US")} VND
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <BudgetMessage
              title={messageTitle}
              message={messageDescription}
              bgColor={`bg-${basedColor}`}
              textColor={"text-white"}
            />
            <div>
              <p className="text-2xl font-semibold mb-4">Hight-Impact Items</p>
              <div className="flex flex-col gap-4">
                {items.map((item, index) => (
                  <ShoppingListItem
                    key={index}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    bgColor={colors[index]}
                    textColor={"text-white"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">Spending timeline</div>
      <div className="bg-primary">Budget Category</div>
      <div className="bg-festive">Next to buy</div>
      <div className="bg-white">Text section</div>
    </div>
  );
}
