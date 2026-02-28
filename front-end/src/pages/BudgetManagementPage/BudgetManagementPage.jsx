import { useMemo, useState, useEffect } from "react";
import ShoppingListCard from "../../components/ShoppingListCard/ShoppingListCard.jsx";
import BudgetMessage from "../../components/BudgetMessage/BudgetMessage.jsx";
import ShoppingListItem from "../../components/ShoppingListItem/ShoppingListItem.jsx";
import BudgetCategoryCard from "../../components/BudgetCategoryCard/BudgetCategoryCard.jsx";
import { PieChart } from "@mui/x-charts/PieChart";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import {
  ArrowRightIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { LineChart } from "@mui/x-charts/LineChart";
import CommonButton from "../../components/Button/CommonButton.jsx";
import EditTotalBudgetModal from "@/components/BudgetModal/EditTotalBudgetModal.jsx";

import { useAuth } from "@/hooks/useAuth.js";
import EditBudgetModal from "@/components/BudgetModal/EditBugetModal.jsx";
import { useBudget } from "@/hooks/useBudget.js";
import {
  useShoppingItemsByTimeline,
  useTopCostShoppingItems,
} from "@/hooks/useShoppingItems.js";
import {
  BUDGET_CHART_COLORS,
  BUDGET_COLORS,
  LINE_CHART_DATA,
  STATUS_CONFIG,
} from "@/constants/budgetConstant.js";
import { useNavigate, useLocation } from "react-router-dom";

export default function BudgetManagementPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const {
    totalBudget,
    totalSpending,
    totalAllocation,
    remaining,
    budgets,
    loading: budgetLoading,
    error: budgetError,
  } = useBudget(user.id);

  const {
    preTet: preTetShoppingItems,
    duringTet: duringTetShoppingItems,
    afterTet: afterTetShoppingItems,
    today: todayShoppingItems,
    loading: shoppingItemsLoading,
    error: shoppingItemsError,
  } = useShoppingItemsByTimeline(user.id);

  const {
    data: topCostShoppingItems,
    loading: topShoppingItemsLoading,
    error: topShoppingItemsError,
  } = useTopCostShoppingItems(user.id);

  const [showTotalDialog, setShowTotalDialog] = useState(false);
  const [showBudgetDialog, setShowBudgetDialog] = useState(false);
  // const value = 0;
  const percent =
    totalBudget > 0 ? ((remaining / totalBudget) * 100).toFixed(2) : 0;

  const statusKey =
    totalBudget > 0
      ? percent > 50
        ? "safe"
        : percent < 20
          ? "warning"
          : "caution"
      : "default";

  const { basedColor, fadedColor, messageTitle, messageDescription } =
    STATUS_CONFIG[statusKey];

  const budgetDistribution = useMemo(() => {
    if (!totalBudget || totalBudget === 0) return [];

    const renderedData = budgets.map((item, index) => ({
      value: parseFloat(
        ((item.allocatedAmount / totalBudget) * 100).toFixed(2),
      ),
      color: BUDGET_CHART_COLORS[index % BUDGET_CHART_COLORS.length],
      label: item.name,
    }));

    const totalRendered = renderedData.reduce(
      (sum, item) => sum + item.value,
      0,
    );

    const otherItem = {
      value: parseFloat((100 - totalRendered).toFixed(2)),
      color: "color-mix(in srgb, var(--color-danger), transparent 70%)",
      label: "Other",
    };

    return otherItem.value > 0 ? [...renderedData, otherItem] : renderedData;
  }, [budgets, totalBudget, BUDGET_CHART_COLORS]);

  if (
    (budgetError && budgetError !== "Budget not found") ||
    shoppingItemsError ||
    topShoppingItemsError
  )
    return (
      <div className="flex justify-center items-center p-20">
        Fail to load data
      </div>
    );

  return (
    <div>
      {budgetLoading || shoppingItemsLoading || topShoppingItemsLoading ? (
        <div className=" flex justify-center items-center p-20 absolute h-full w-full">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : null}

      <>
        <div className="bg-bg px-4 py-12 md:p-20">
          <div className="  flex w-full gap-6 flex-wrap justify-center">
            <div className="flex-1 flex flex-col gap-3 ">
              <h1 className="font-bold text-5xl text-primary">Overview</h1>
              <div className="bg-white rounded-3xl p-9 flex flex-col gap-7 h-full">
                <div className="flex  gap-2 items-center ">
                  <div className="h-3 w-3 rounded-full bg-danger"></div>
                  <p className="text-2xl font-semibold">Budget distribution</p>
                </div>
                {budgets.length > 0 ? (
                  <PieChart
                    series={[
                      {
                        innerRadius: 50,
                        outerRadius: 100,
                        data: budgetDistribution,
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
                ) : (
                  <div className="flex">
                    No spending data yet. <br />
                    Once you add shopping items, your spending breakdown will
                    appear here.
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-9 flex flex-col gap-5 items-center w-full md:w-auto">
              <div className="flex justify-between items-center w-full">
                <p className="text-2xl font-semibold">Total Budget</p>
                <button
                  className="h-5 w-5  cursor-pointer"
                  onClick={() => {
                    setShowTotalDialog(true);
                  }}
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
                    value={remaining}
                    valueMax={totalBudget || 1}
                    startAngle={-135}
                    endAngle={135}
                    cornerRadius="50%"
                    text={`You've spent \n ${totalSpending.toLocaleString("en-US")} VND`}
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
                  {remaining.toLocaleString("en-US")}
                </p>
                <p className={`font-normal text-base text-${basedColor}`}>
                  /{totalBudget.toLocaleString("en-US")} VND
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
                <p className="text-2xl font-semibold mb-4">High-Impact Items</p>
                {topCostShoppingItems.length > 0 ? (
                  <ul className="flex flex-col gap-4">
                    {topCostShoppingItems.slice(0, 3).map((item, index) => (
                      <ShoppingListItem
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        bgColor={BUDGET_COLORS[index]}
                        textColor={"text-white"}
                      />
                    ))}
                  </ul>
                ) : (
                  <p>No shoppping items yet</p>
                )}
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
              series={LINE_CHART_DATA}
              slotProps={{
                legend: {
                  direction: "horizontal",
                  position: { vertical: "bottom", horizontal: "center" },
                  padding: 0,
                },
              }}
            />
          </div>
        </div>
      </>
      <>
        <div id="budget-categories" className="bg-primary w-full flex flex-col justify-center  gap-5 py-12 px-4  md:p-20 relative">
          <h1 className="font-bold text-5xl text-white">Budget Categories</h1>
          <p className="font-normal text-xl md:text-3xl text-left text-white">
            Budget at a Glance
          </p>
          <CommonButton
            leadingIcon={<PlusIcon className="h-5 w-5" />}
            label={"Add budget"}
            onClick={() => setShowBudgetDialog(true)}
            color={"accent"}
          />
          <ul
            className="flex gap-7  overflow-x-auto py-5 
  "
          >
            {budgets.length > 0 ? (
              budgets.map((item) => (
                <BudgetCategoryCard
                  key={item.id}
                  id={item.id}
                  category={item.name}
                  amountSpent={item.summary || 0}
                  totalAmount={item.allocatedAmount}
                  // itemsCount={category.itemsCount}
                />
              ))
            ) : (
              <div className="text-primary bg-white/70  border-white border p-10 rounded-4xl">
                <p className="font-bold">You haven't add budget categories.</p>
                Create category budgets to manage how much you spend on gifts,
                food, and more.
              </div>
            )}
          </ul>
        </div>
      </>
      <>
        <div className="bg-festive w-full flex flex-col justify-center items-center gap-5 py-12 px-4  md:p-20 relative">
          <h1 className="font-bold text-5xl">Next to Buy</h1>
          <p className="font-normal text-xl md:text-3xl text-center">
            Don’t miss a thing to make your Tết truly complete
          </p>
          {preTetShoppingItems.length > 0 ||
          duringTetShoppingItems.length > 0 ||
          afterTetShoppingItems.length > 0 ? (
            <div className="flex  w-full flex-wrap gap-5 justify-center">
              <div className="flex-1 p-5 rounded-3xl gap-5 flex flex-col ">
                <p className="font-bold text-xl text-center">Pre Tet</p>
                <ul className="flex flex-col gap-5 items-center overflow-y-auto  max-h-175">
                  {preTetShoppingItems.map((item) => (
                    <ShoppingListCard
                      key={item.id}
                      category={"Decoration"}
                      name={item.name}
                      date={item.duedTime.slice(0, 10)}
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
                  {duringTetShoppingItems.map((item) => (
                    <ShoppingListCard
                      key={item.id}
                      category={"Decoration"}
                      name={item.name}
                      date={item.duedTime.slice(0, 10)}
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
                  {afterTetShoppingItems.map((item) => (
                    <ShoppingListCard
                      key={item.id}
                      category={"Decoration"}
                      name={item.name}
                      date={item.duedTime.slice(0, 10)}
                      price={item.price}
                      qty={item.quantity}
                      status={item.status}
                    />
                  ))}
                </ul>
              </div>
              <div className="flex-1 bg-accent p-5 rounded-3xl gap-5 flex flex-col ">
                <p className="font-bold text-xl text-center text-white">
                  Today
                </p>
                <ul className="flex flex-col gap-5 items-center  overflow-y-auto  max-h-175">
                  {todayShoppingItems.map((item) => (
                    <ShoppingListCard
                      key={item.id}
                      category={"Decoration"}
                      name={item.name}
                      date={item.duedTime.slice(0, 10)}
                      price={item.price}
                      qty={item.quantity}
                      status={item.status}
                    />
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-primary bg-white/70  border-white border p-10 rounded-4xl">
              <p className="font-bold">Your shopping list is empty.</p>
              Add items you plan to buy so you can track costs and stay within
              budget.
            </div>
          )}
          <CommonButton
            label={"Shopping List"}
            trailingIcon={<ArrowRightIcon className="h-5 w-5" />}
            onClick={() => navigate("/shopping-list")}
          />
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
      {showTotalDialog && (
        <EditTotalBudgetModal onClose={() => setShowTotalDialog(false)} />
      )}
      {showBudgetDialog && (
        <EditBudgetModal
          type={"Add"}
          onClose={() => setShowBudgetDialog(false)}
        />
      )}
    </div>
  );
}
