import React from "react";
import ShoppingListCard from "../../components/ShoppingListCard/ShoppingListCard.jsx";
import BudgetMessage from "../../components/BudgetMessage/BudgetMessage.jsx";
import ShoppingListItem from "../../components/ShoppingListItem/ShoppingListItem.jsx";
import BudgetCategoryCard from "../../components/BudgetCategoryCard/BudgetCategoryCard.jsx";
import { PieChart } from "@mui/x-charts/PieChart";
import PieCenterLabel from "../../components/ChartsComponent/PieCenterLabel.jsx";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { Box, Typography } from "@mui/material";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { LineChart } from "@mui/x-charts/LineChart";
import CommonButton from "../../components/Button/CommonButton.jsx";

export default function BudgetManagementPage() {
  const value = 6500000;
  const max = 10000000;
  const percent = ((value / max) * 100).toFixed(2);

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
    // ===== PRE TET =====
    {
      _id: "s1000001-0000-4000-8000-000000000001",
      budget_id: "b1111111-1111-4111-8111-111111111111",
      task_id: "t1000001-0000-4000-8000-000000000001",
      name: "Banh Chung",
      price: 120000,
      quantity: 3,
      status: "completed",
      dued_time: "2026-02-14T08:00:00Z",
      timeline: "Pre Tet",
      created_at: { $date: "2026-02-14T09:00:00Z" },
    },
    {
      _id: "s1000002-0000-4000-8000-000000000002",
      budget_id: "b1111111-1111-4111-8111-111111111111",
      task_id: "t1000002-0000-4000-8000-000000000002",
      name: "Mut Tet",
      price: 90000,
      quantity: 4,
      status: "completed",
      dued_time: "2026-02-13T07:00:00Z",
      timeline: "Pre Tet",
      created_at: { $date: "2026-02-13T08:00:00Z" },
    },
    {
      _id: "s1000003-0000-4000-8000-000000000003",
      budget_id: "b2222222-2222-4222-8222-222222222222",
      task_id: "t1000003-0000-4000-8000-000000000003",
      name: "Trang Tri Nha",
      price: 300000,
      quantity: 1,
      status: "planning",
      dued_time: "2026-02-12T05:00:00Z",
      timeline: "Pre Tet",
      created_at: { $date: "2026-02-12T06:00:00Z" },
    },
    {
      _id: "s1000004-0000-4000-8000-000000000004",
      budget_id: "b2222222-2222-4222-8222-222222222222",
      task_id: "t1000004-0000-4000-8000-000000000004",
      name: "Hoa Dao",
      price: 450000,
      quantity: 1,
      status: "planning",
      dued_time: "2026-02-15T03:00:00Z",
      timeline: "Pre Tet",
      created_at: { $date: "2026-02-15T04:00:00Z" },
    },
    {
      _id: "s1000005-0000-4000-8000-000000000005",
      budget_id: "b1111111-1111-4111-8111-111111111111",
      task_id: "t1000005-0000-4000-8000-000000000005",
      name: "Qua Bieu",
      price: 600000,
      quantity: 2,
      status: "planning",
      dued_time: "2026-02-16T09:00:00Z",
      timeline: "Pre Tet",
      created_at: { $date: "2026-02-16T10:00:00Z" },
    },

    // ===== DURING TET =====
    {
      _id: "s2000001-0000-4000-8000-000000000001",
      budget_id: "b1111111-1111-4111-8111-111111111111",
      task_id: "t2000001-0000-4000-8000-000000000001",
      name: "Li Xi",
      price: 1200000,
      quantity: 1,
      status: "planning",
      dued_time: "2026-02-17T02:00:00Z",
      timeline: "During Tet",
      created_at: { $date: "2026-02-10T10:00:00Z" },
    },
    {
      _id: "s2000002-0000-4000-8000-000000000002",
      budget_id: "b2222222-2222-4222-8222-222222222222",
      task_id: "t2000002-0000-4000-8000-000000000002",
      name: "Chuc Tet Gia Dinh",
      price: 200000,
      quantity: 1,
      status: "planning",
      dued_time: "2026-02-17T06:00:00Z",
      timeline: "During Tet",
      created_at: { $date: "2026-02-11T08:00:00Z" },
    },
    {
      _id: "s2000003-0000-4000-8000-000000000003",
      budget_id: "b2222222-2222-4222-8222-222222222222",
      task_id: "t2000003-0000-4000-8000-000000000003",
      name: "Di Chua",
      price: 150000,
      quantity: 1,
      status: "planning",
      dued_time: "2026-02-18T04:00:00Z",
      timeline: "During Tet",
      created_at: { $date: "2026-02-12T09:00:00Z" },
    },
    {
      _id: "s2000004-0000-4000-8000-000000000004",
      budget_id: "b1111111-1111-4111-8111-111111111111",
      task_id: "t2000004-0000-4000-8000-000000000004",
      name: "An Tat Nien",
      price: 500000,
      quantity: 1,
      status: "completed",
      dued_time: "2026-02-18T11:00:00Z",
      timeline: "During Tet",
      created_at: { $date: "2026-02-18T12:00:00Z" },
    },
    {
      _id: "s2000005-0000-4000-8000-000000000005",
      budget_id: "b1111111-1111-4111-8111-111111111111",
      task_id: "t2000005-0000-4000-8000-000000000005",
      name: "Gap Ban Be",
      price: 300000,
      quantity: 1,
      status: "planning",
      dued_time: "2026-02-19T07:00:00Z",
      timeline: "During Tet",
      created_at: { $date: "2026-02-13T07:30:00Z" },
    },

    // ===== AFTER TET =====
    {
      _id: "s3000001-0000-4000-8000-000000000001",
      budget_id: "b2222222-2222-4222-8222-222222222222",
      task_id: "t3000001-0000-4000-8000-000000000001",
      name: "Khai Xuan",
      price: 200000,
      quantity: 1,
      status: "planning",
      dued_time: "2026-02-20T03:00:00Z",
      timeline: "After Tet",
      created_at: { $date: "2026-02-15T08:00:00Z" },
    },
    {
      _id: "s3000002-0000-4000-8000-000000000002",
      budget_id: "b1111111-1111-4111-8111-111111111111",
      task_id: "t3000002-0000-4000-8000-000000000002",
      name: "Cafe Dau Nam",
      price: 120000,
      quantity: 2,
      status: "planning",
      dued_time: "2026-02-21T03:00:00Z",
      timeline: "After Tet",
      created_at: { $date: "2026-02-15T09:00:00Z" },
    },
    {
      _id: "s3000003-0000-4000-8000-000000000003",
      budget_id: "b2222222-2222-4222-8222-222222222222",
      task_id: "t3000003-0000-4000-8000-000000000003",
      name: "Du Lich Ngan Ngay",
      price: 1500000,
      quantity: 1,
      status: "planning",
      dued_time: "2026-02-22T05:00:00Z",
      timeline: "After Tet",
      created_at: { $date: "2026-02-16T07:00:00Z" },
    },
    {
      _id: "s3000004-0000-4000-8000-000000000004",
      budget_id: "b1111111-1111-4111-8111-111111111111",
      task_id: "t3000004-0000-4000-8000-000000000004",
      name: "Mua Do Moi",
      price: 400000,
      quantity: 1,
      status: "planning",
      dued_time: "2026-02-23T06:00:00Z",
      timeline: "After Tet",
      created_at: { $date: "2026-02-16T10:00:00Z" },
    },
    {
      _id: "s3000005-0000-4000-8000-000000000005",
      budget_id: "b2222222-2222-4222-8222-222222222222",
      task_id: "t3000005-0000-4000-8000-000000000005",
      name: "An Tan Nien",
      price: 600000,
      quantity: 1,
      status: "planning",
      dued_time: "2026-02-24T11:00:00Z",
      timeline: "After Tet",
      created_at: { $date: "2026-02-17T08:00:00Z" },
    },
  ];

  const categoriesData = [
    {
      name: "Food & Dining",
      amountSpent: 6500000,
      totalAmount: 7000000,
      itemsCount: 12,
    },
    {
      name: "Transportation",
      amountSpent: 2000000,
      totalAmount: 5000000,
      itemsCount: 8,
    },
    {
      name: "Housing",
      amountSpent: 8000000,
      totalAmount: 12000000,
      itemsCount: 6,
    },
    {
      name: "Utilities",
      amountSpent: 1500000,
      totalAmount: 3000000,
      itemsCount: 4,
    },
    {
      name: "Shopping",
      amountSpent: 4500000,
      totalAmount: 8000000,
      itemsCount: 10,
    },
    {
      name: "Entertainment",
      amountSpent: 3500000,
      totalAmount: 6000000,
      itemsCount: 5,
    },
    {
      name: "Travel",
      amountSpent: 7000000,
      totalAmount: 10000000,
      itemsCount: 3,
    },
    {
      name: "Health & Fitness",
      amountSpent: 2500000,
      totalAmount: 4000000,
      itemsCount: 7,
    },
  ];

  const lineChartData = [
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

  return (
    <div>
      <>
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
                <p className="text-2xl font-semibold mb-4">
                  Hight-Impact Items
                </p>
                <ul className="flex flex-col gap-4">
                  {items
                    .sort((a, b) => b.price - a.price)
                    .slice(0, 3)
                    .map((item, index) => (
                      <ShoppingListItem
                        key={item._id}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        bgColor={colors[index]}
                        textColor={"text-white"}
                      />
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
      <>
        <div className="bg-white w-full flex flex-col justify-center items-center gap-5 py-12 px-4  md:p-20 relative">
          <h1 className="font-bold text-5xl">Spending timeline</h1>
          <p className="font-normal text-xl md:text-3xl text-center">
            Track how your spending evolves as Tết approaches
          </p>
          <div className="w-full h-125  ">
            <LineChart
              series={lineChartData}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                  padding: 0,
                },
              }}
            />
          </div>
        </div>
      </>
      <>
        <div className="bg-primary w-full flex flex-col justify-center  gap-5 py-12 px-4  md:p-20 relative">
          <h1 className="font-bold text-5xl text-white">Budget Categories</h1>
          <p className="font-normal text-xl md:text-3xl text-left text-white">
            Budget at a Glance
          </p>
          <CommonButton
            leadingIcon={<PlusIcon className="h-5 w-5" />}
            label={"Add item"}
            onClick={() => alert("Button clicked!")}
            color={"accent"}
          />
          <ul
            className="flex gap-7  overflow-x-auto py-5 
  "
          >
            {categoriesData.map((category, index) => (
              <BudgetCategoryCard
                key={index}
                category={category.name}
                amountSpent={category.amountSpent}
                totalAmount={category.totalAmount}
                itemsCount={category.itemsCount}
              />
            ))}
          </ul>
        </div>
      </>
      <>
        <div className="bg-festive w-full flex flex-col justify-center items-center gap-5 py-12 px-4  md:p-20 relative">
          <h1 className="font-bold text-5xl">Next to Buy</h1>
          <p className="font-normal text-xl md:text-3xl text-center">
            Don’t miss a thing to make your Tết truly complete
          </p>
          <div className="flex  w-full flex-wrap gap-5 justify-center">
            <div className="flex-1 p-5 rounded-3xl gap-5 flex flex-col ">
              <p className="font-bold text-xl text-center">Pre Tet</p>
              <ul className="flex flex-col gap-5 items-center overflow-y-auto  max-h-175">
                {items
                  .filter((item) => item.timeline === "Pre Tet")
                  .map((item) => (
                    <ShoppingListCard
                      key={item._id}
                      category={"Decoration"}
                      name={item.name}
                      date={item.dued_time.slice(0, 10)}
                      price={item.price}
                      qty={item.quantity}
                      status={item.status}
                    />
                  ))}
              </ul>
            </div>
            <div className="flex-1 p-5 rounded-3xl gap-5 flex flex-col">
              <p className="font-bold text-xl text-center">During Tet</p>
              <ul className="flex flex-col gap-5 items-center  overflow-y-auto  max-h-175">
                {items
                  .filter((item) => item.timeline === "During Tet")
                  .map((item) => (
                    <ShoppingListCard
                      key={item._id}
                      category={"Decoration"}
                      name={item.name}
                      date={item.dued_time.slice(0, 10)}
                      price={item.price}
                      qty={item.quantity}
                      status={item.status}
                    />
                  ))}
              </ul>
            </div>
            <div className="flex-1 p-5 rounded-3xl gap-5 flex flex-col">
              <p className="font-bold text-xl text-center">After Tet</p>
              <ul className="flex flex-col gap-5 items-center  overflow-y-auto  max-h-175">
                {items
                  .filter((item) => item.timeline === "After Tet")
                  .map((item) => (
                    <ShoppingListCard
                      key={item._id}
                      category={"Decoration"}
                      name={item.name}
                      date={item.dued_time.slice(0, 10)}
                      price={item.price}
                      qty={item.quantity}
                      status={item.status}
                    />
                  ))}
              </ul>
            </div>
            <div className="flex-1 bg-accent p-5 rounded-3xl gap-5 flex flex-col ">
              <p className="font-bold text-xl text-center text-white">Today</p>
              <ul className="flex flex-col gap-5 items-center  overflow-y-auto  max-h-175">
                {items
                  .filter(
                    (item) =>
                      item.dued_time.slice(0, 10) ===
                      new Date().toISOString().slice(0, 10),
                  )
                  .map((item) => (
                    <ShoppingListCard
                      key={item._id}
                      category={"Decoration"}
                      name={item.name}
                      date={item.dued_time.slice(0, 10)}
                      price={item.price}
                      qty={item.quantity}
                      status={item.status}
                    />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </>
      <>
        <div className="bg-white flex flex-col justify-center items-center gap-4 py-12 px-4  md:p-20 relative">
          <div className="flex flex-col justify-center items-center gap-1">
            <h2 className="font-bold text-accent">WITH LUCKY MONEY 🧧</h2>
            <h1 className="font-bold text-5xl text-primary text-center">
              Plan smart. Enjoy Tết fully.
            </h1>
          </div>

          <p className="font-normal text-xl md:text-3xl text-center">
            Managing your budget doesn’t mean cutting the fun — it means
            spending with intention. Track your shopping, stay aware of your
            limits, and make room for what truly matters this Tết.
          </p>
        </div>
      </>
    </div>
  );
}
