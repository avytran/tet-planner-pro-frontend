import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import PieCenterLabel from "../../components/ChartsComponent/PieCenterLabel";
import { DotCircle, EmptyCircle } from '../../components/Icons/outline';
import { CheckCircle, ExclamationCircle } from '../../components/Icons/solid';
import { LineChart } from '@mui/x-charts/LineChart';
// import { rainbowSurgePalette } from '@mui/x-charts/colorPalettes';
import { useDashboardData } from '@/hooks/useDashboardData';
import { progressTaskColor, progressBudgetColor } from "@/utils/dashboardUtils";
import { transformSpendingTimelineData } from "@/utils/transformSpendingTimelineData"
import {
  BUDGET_CHART_COLORS,
} from "@/constants/budgetConstant.js";
import { useAuth } from '@/hooks/useAuth';
import { useMemo } from 'react';

export default function DashboardPage() {
  const { user } = useAuth();

  const {
    loading,
    error,
    tasksTotal,
    tasksDone,
    tasksInnerData,
    tasksOuterData,
    itemsTotal,
    itemsDone,
    itemsInnerData,
    itemsOuterData,
    tasksPercentage,
    itemsPercentage,
    budgetSpentPercentage,
    categorySeries,
    spendingTimeline,
    reminderNotification
  } = useDashboardData(user.id);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20">
        Loading data...
      </div>);
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-20">
        Fail to load data
      </div>);
  }

  const date = new Date();
  const dateArray = date.toDateString().split(" ");
  const time = date.toLocaleTimeString("en-US", {
    hour: '2-digit',
    minute: '2-digit'
  });

  const status = (value) => value === 100 ? "Completed!" : "Completed...";
  const statusBudget = (value) => value >= 100 ? "Spent!" : "Spent...";

  const {  dates: datePoints, series: timelineSeries } = useMemo(
    () => transformSpendingTimelineData(spendingTimeline), 
    [spendingTimeline, BUDGET_CHART_COLORS]);

  return (
    <div className="dashboard-container bg-bg px-4 py-12 md:p-20">
      <div className="dashboardTitle pb-[32px]">
        <p className="text-5xl font-semibold text-primary">Dashboard</p>
        <p className='text-black'>{time} - {dateArray.slice(1, dateArray.length - 1).join(" ")}, {dateArray[dateArray.length - 1]}</p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 content-center">
        <div className="p-10 w-full bg-white rounded-3xl flex flex-col">
          <p className="text-2xl text-black font-semibold pb-[16px]">Todo Tasks</p>
          <div className="dashboard-chart">
            <Box
              sx={{
                width: '100%',
                // position: 'relative',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <PieChart
                series={[
                  {
                    // startAngle: -135,
                    // endAngle: 135,
                    id: 'series-0',
                    innerRadius: 100,
                    outerRadius: 120,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    highlighted: { additionalRadius: 1 },
                    // cornerRadius: 3,
                    data: tasksOuterData,
                  },
                  {
                    // startAngle: -135,
                    // endAngle: 135,
                    innerRadius: 50,
                    outerRadius: 100,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    highlighted: { additionalRadius: 1 },
                    data: tasksInnerData,
                    // arcLabel: (item) => `${item.label}`,
                  }
                ]}
                sx={{
                  '.MuiChartsLegend-root [data-series="series-0"]': {
                    // hide the legend of the series with id: "series-0"
                    display: 'none',
                  },
                }}
                slotProps={{
                  legend: {
                    direction: 'horizontal',
                    position: { vertical: 'bottom', horizontal: 'center' },
                    padding: 0,
                  },
                }}
                width={250}
                height={250}

              >
                {
                  tasksTotal === 0 ? (
                    <PieCenterLabel color="black">
                      <tspan style={{ fontSize: '15px', fontWeight: 'normal' }}>
                        No data
                      </tspan>
                    </PieCenterLabel>
                  ) : (
                    <PieCenterLabel color="var(--color-primary)">
                      <tspan style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        {tasksDone}
                      </tspan>
                      <tspan style={{ fontSize: '15px', fontWeight: 'normal' }} dy="2">
                        /{tasksTotal}
                      </tspan>
                    </PieCenterLabel>
                  )
                }
              </PieChart>
            </Box>
          </div>
        </div>
        <div className="p-10 w-full bg-white rounded-3xl flex flex-col">
          <p className="text-2xl text-black font-semibold pb-[16px]">Shopping Items</p>
          <div className="dashboard-chart">
            <Box
              sx={{
                width: '100%',
                // position: 'relative',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <PieChart
                series={[
                  {
                    // startAngle: -135,
                    // endAngle: 135,
                    id: 'series-0',
                    innerRadius: 100,
                    outerRadius: 120,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    highlighted: { additionalRadius: 1 },
                    // cornerRadius: 3,
                    data: itemsOuterData,
                  },
                  {
                    // startAngle: -135,
                    // endAngle: 135,
                    innerRadius: 50,
                    outerRadius: 100,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    highlighted: { additionalRadius: 1 },
                    data: itemsInnerData,
                    // arcLabel: (item) => `${item.label}`,
                  }
                ]}
                sx={{
                  '.MuiChartsLegend-root [data-series="series-0"]': {
                    // hide the legend of the series with id: "series-0"
                    display: 'none',
                  },
                }}
                slotProps={{
                  legend: {
                    direction: 'horizontal',
                    position: { vertical: 'bottom', horizontal: 'center' },
                    padding: 0,
                  },
                }}
                width={250}
                height={250}

              >
                {
                  itemsTotal === 0 ? (
                    <PieCenterLabel color="black">
                      <tspan style={{ fontSize: '15px', fontWeight: 'normal' }}>
                        No data
                      </tspan>
                    </PieCenterLabel>
                  ) : (
                    <PieCenterLabel color="var(--color-primary)">
                      <tspan style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        {itemsDone}
                      </tspan>
                      <tspan style={{ fontSize: '15px', fontWeight: 'normal' }} dy="2">
                        /{itemsTotal}
                      </tspan>
                    </PieCenterLabel>
                  )
                }
              </PieChart>
            </Box>
          </div>
        </div>
        <div className="p-10 w-full bg-white rounded-3xl flex flex-col gap-y-9">
          <p className="text-2xl text-black font-semibold pb-[16px]">Progress</p>
          <div className="flex flex-col gap-9">
            <div className="flex flex-row gap-2">
              <div>
                {
                  tasksPercentage === 0
                    ? <EmptyCircle fillColor="none" fillBackground={progressTaskColor(tasksPercentage)} />
                    : tasksPercentage === 100
                      ? <CheckCircle fillColor="white" fillBackground={progressTaskColor(tasksPercentage)} />
                      : <DotCircle fillColor={progressTaskColor(tasksPercentage)} fillBackground="none" />
                }
              </div>
              <div className='flex-1'>
                <div className="flex gap-2">
                  <div className="progress-context flex flex-row gap-2 items-end">
                    <span className="font-bold text-xl text-black text-left">
                      {tasksPercentage}%
                    </span>
                    <p className="font-normal text-xs text-gray-500 text-left pb-1">Tasks {status(tasksPercentage)}</p>
                  </div>
                </div>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={tasksPercentage}
                    sx={{
                      height: 8,
                      borderRadius: 5,

                      [`& .${linearProgressClasses.bar}`]: {
                        backgroundColor: progressTaskColor(tasksPercentage),
                        borderRadius: 5,
                      },

                      backgroundColor: `color-mix(in srgb, ${progressTaskColor(tasksPercentage)}, transparent 70%)`,
                    }}
                  />

                </Box>
              </div>
            </div>

          </div>
          <div className="flex flex-col gap-9">
            <div className="flex flex-row gap-2">
              <div>
                {
                  itemsPercentage === 0
                    ? <EmptyCircle fillColor="none" fillBackground={progressTaskColor(itemsPercentage)} />
                    : itemsPercentage === 100
                      ? <CheckCircle fillColor="white" fillBackground={progressTaskColor(itemsPercentage)} />
                      : <DotCircle fillColor={progressTaskColor(itemsPercentage)} fillBackground="none" />
                }
              </div>
              <div className='flex-1'>
                <div className="flex gap-2">
                  <div className="progress-context flex flex-row gap-2 items-end">
                    <span className="font-bold text-xl text-black text-left">
                      {itemsPercentage}%
                    </span>
                    <p className="font-normal text-xs text-gray-500 text-left pb-1">Shopping Items {status(itemsPercentage)}</p>
                  </div>
                </div>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={itemsPercentage}
                    sx={{
                      height: 8,
                      borderRadius: 5,

                      [`& .${linearProgressClasses.bar}`]: {
                        backgroundColor: progressTaskColor(itemsPercentage),
                        borderRadius: 5,
                      },

                      backgroundColor: `color-mix(in srgb, ${progressTaskColor(itemsPercentage)}, transparent 70%)`,
                    }}
                  />

                </Box>
              </div>
            </div>

          </div>
          <div className="flex flex-col gap-9">
            <div className="flex flex-row gap-2">
              <div>
                {
                  budgetSpentPercentage === 0
                    ? <EmptyCircle fillColor="none" fillBackground={progressBudgetColor(budgetSpentPercentage)} />
                    : budgetSpentPercentage >= 80
                      ? <ExclamationCircle fillColor="white" fillBackground={progressBudgetColor(budgetSpentPercentage)} />
                      : <DotCircle fillColor={progressBudgetColor(budgetSpentPercentage)} fillBackground="none" />
                }
              </div>
              <div className='flex-1'>
                <div className="flex gap-2">
                  <div className="progress-context flex flex-row gap-2 items-end">
                    <span className="font-bold text-xl text-black text-left">
                      {budgetSpentPercentage}%
                    </span>
                    <p className="font-normal text-xs text-gray-500 text-left pb-1">Budget {statusBudget(budgetSpentPercentage)}</p>
                  </div>
                </div>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={budgetSpentPercentage}
                    sx={{
                      height: 8,
                      borderRadius: 5,

                      [`& .${linearProgressClasses.bar}`]: {
                        backgroundColor: progressBudgetColor(budgetSpentPercentage),
                        borderRadius: 5,
                      },

                      backgroundColor: `color-mix(in srgb, ${progressBudgetColor(budgetSpentPercentage)}, transparent 70%)`,
                    }}
                  />

                </Box>
              </div>
            </div>

          </div>
        </div>
        <div class="lg:col-span-2 p-10 w-full bg-white rounded-3xl flex flex-col">
          <p className="text-2xl text-black font-semibold pb-[16px]">Spending Timeline</p>
          <LineChart
            series={timelineSeries}
            height={300}
            // colors={rainbowSurgePalette}
            xAxis={[{
              scaleType: 'point', data: datePoints
            }]}
            slotProps={{
              legend: {
                direction: 'horizontal',
                position: { vertical: 'bottom', horizontal: 'center' },
                padding: 0,
              },
            }}
          />
        </div>
        <div class="p-10 w-full bg-white rounded-3xl flex flex-col gap-y-4">
          <p className="text-2xl text-black font-semibold pb-[16px]">Category Distribution</p>
          <PieChart
            series={[
              {
                innerRadius: 40,
                outerRadius: 100,
                data: categorySeries,
                valueFormatter: (item) => `${item.value}%`,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -10 },
              },
            ]}
            height={200}
            width={200}
            slotProps={{
              legend: {
                direction: 'horizontal',
                position: { vertical: 'bottom', horizontal: 'center' },
                padding: 0,
              },
            }}
          />
          <div
            className={"px-6 py-7 rounded-2xl justify-items-start bg-accent gap-1.5 flex flex-col"}
          >
            <p className={"text-base font-semibold text-white"}>Reminder</p>
            <p className={"text-base font-light text-left text-white"}>{reminderNotification}</p>
          </div>
        </div>
      </div>
    </div >
  );
}
