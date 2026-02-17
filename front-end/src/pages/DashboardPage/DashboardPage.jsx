import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import PieCenterLabel from "../../components/ChartsComponent/PieCenterLabel";
import { DotCircle, EmptyCircle } from '../../components/Icons/outline';
import { CheckCircle, ExclamationCircle } from '../../components/Icons/solid';

export default function DashboardPage() {
  const date = new Date();
  const dateArray = date.toDateString().split(" ");
  const time = date.toLocaleTimeString("en-US", {
    hour: '2-digit',
    minute: '2-digit'
  });

  const tasksDone = 50;
  const itemsDone = 60;
  const budgetSpent = 80;
  const status = (value) => value === 100 ? "Completed!" : "Completed...";
  const statusBudget = (value) => value >= 100 ? "Spent!" : "Spent...";


  const progressTaskColor = (tasksDone) => {
    if (tasksDone === 0) {
      return "#AEA9B1";
    }

    if (tasksDone >= 60) {
      return "var(--color-success)";
    }

    return "var(--color-accent)";
  };

  const progressBudgetColor = (budgetSpent) => {
    if (budgetSpent === 0) {
      return "#AEA9B1";
    }

    if (budgetSpent === 100) {
      return "var(--color-primary)";
    }

    if (budgetSpent >= 80) {
      return "var(--color-accent)";
    }


    return "var(--color-success)";
  };

  return (
    <div className="dashboard-container bg-bg px-4 py-12 md:p-20">
      <div className="dashboardTitle pb-[32px]">
        <p className="text-5xl font-semibold text-primary">Dashboard</p>
        <p className='text-black'>{time} - {dateArray.slice(1, dateArray.length - 1).join(" ")}, {dateArray[dateArray.length - 1]}</p>
      </div>
      <div className="dashboard-1 flex flex-wrap flex-row justify-between gap-6 shrink-0">
        <div className="p-10 w-full md:w-sm bg-white rounded-3xl flex flex-col">
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
                    data: [
                      { value: 30, color: 'var(--color-success)', label: 'Done' }, // yellow
                      { value: 10, color: 'color-mix(in srgb, var(--color-success), transparent 50%)', label: 'Not Done' }, // yellow
                      { value: 10, color: 'var(--color-primary)', label: 'Done' }, // teal
                      { value: 30, color: 'color-mix(in srgb, var(--color-primary), transparent 50%)', label: 'Not Done' }, // teal
                      { value: 20, color: 'var(--color-accent)', label: 'Done' }, // teal
                      { value: 20, color: 'color-mix(in srgb, var(--color-accent), transparent 50%)', label: 'Not Done' }, // red
                    ],
                  },
                  {
                    // startAngle: -135,
                    // endAngle: 135,
                    innerRadius: 50,
                    outerRadius: 100,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    highlighted: { additionalRadius: 1 },
                    data: [
                      { value: 40, color: 'var(--color-success)', label: 'Before Tet' }, // yellow
                      { value: 40, color: 'var(--color-primary)', label: 'Tet' }, // teal
                      { value: 40, color: 'var(--color-accent)', label: 'After Tet' }, // teal
                    ],
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
                    direction: 'row',
                    position: { vertical: 'bottom', horizontal: 'middle' },
                    padding: 0,
                  },
                }}
                width={250}
                height={250}

              >
                <PieCenterLabel color="var(--color-primary)">
                  <tspan style={{ fontSize: '24px', fontWeight: 'bold' }}>60</tspan>
                  <tspan style={{ fontSize: '15px', fontWeight: 'normal' }} dy="2" > /120</tspan>
                </PieCenterLabel>
              </PieChart>
            </Box>
          </div>
        </div>
        <div className="p-10 w-full md:w-sm bg-white rounded-3xl flex flex-col">
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
                    data: [
                      { value: 30, color: 'var(--color-success)', label: 'Done' }, // yellow
                      { value: 10, color: 'color-mix(in srgb, var(--color-success), transparent 50%)', label: 'Not Done' }, // yellow
                      { value: 10, color: 'var(--color-primary)', label: 'Done' }, // teal
                      { value: 30, color: 'color-mix(in srgb, var(--color-primary), transparent 50%)', label: 'Not Done' }, // teal
                      { value: 20, color: 'var(--color-accent)', label: 'Done' }, // teal
                      { value: 20, color: 'color-mix(in srgb, var(--color-accent), transparent 50%)', label: 'Not Done' }, // red
                    ],
                  },
                  {
                    // startAngle: -135,
                    // endAngle: 135,
                    innerRadius: 50,
                    outerRadius: 100,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    highlighted: { additionalRadius: 1 },
                    data: [
                      { value: 40, color: 'var(--color-success)', label: 'Before Tet' }, // yellow
                      { value: 40, color: 'var(--color-primary)', label: 'Tet' }, // teal
                      { value: 40, color: 'var(--color-accent)', label: 'After Tet' }, // teal
                    ],
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
                    direction: 'row',
                    position: { vertical: 'bottom', horizontal: 'middle' },
                    padding: 0,
                  },
                }}
                width={250}
                height={250}

              >
                <PieCenterLabel color="var(--color-primary)">
                  <tspan style={{ fontSize: '24px', fontWeight: 'bold' }}>60</tspan>
                  <tspan style={{ fontSize: '15px', fontWeight: 'normal' }} dy="2" > /120</tspan>
                </PieCenterLabel>
              </PieChart>
            </Box>
          </div>
        </div>
        <div className="p-10 w-full md:w-sm bg-white rounded-3xl flex flex-col gap-y-9">
          <p className="text-2xl text-black font-semibold pb-[16px]">Progress</p>
          <div className="flex flex-col gap-9">
            <div className="flex flex-row gap-2">
              <div>
                {
                  tasksDone === 0
                    ? <EmptyCircle fillColor="none" fillBackground={progressTaskColor(tasksDone)} />
                    : tasksDone === 100
                      ? <CheckCircle fillColor="white" fillBackground={progressTaskColor(tasksDone)} />
                      : <DotCircle fillColor={progressTaskColor(tasksDone)} fillBackground="none" />
                }
              </div>
              <div className='flex-1'>
                <div className="flex gap-2">
                  <div className="progress-context flex flex-row gap-2 items-end">
                    <span className="font-bold text-xl text-black text-left">
                      {tasksDone}%
                    </span>
                    <p className="font-normal text-xs text-gray-500 text-left pb-1">Tasks {status(tasksDone)}</p>
                  </div>
                </div>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={tasksDone}
                    sx={{
                      height: 8,
                      borderRadius: 5,

                      [`& .${linearProgressClasses.bar}`]: {
                        backgroundColor: progressTaskColor(tasksDone),
                        borderRadius: 5,
                      },

                      backgroundColor: `color-mix(in srgb, ${progressTaskColor(tasksDone)}, transparent 70%)`,
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
                  itemsDone === 0
                    ? <EmptyCircle fillColor="none" fillBackground={progressTaskColor(itemsDone)} />
                    : itemsDone === 100
                      ? <CheckCircle fillColor="white" fillBackground={progressTaskColor(itemsDone)} />
                      : <DotCircle fillColor={progressTaskColor(itemsDone)} fillBackground="none" />
                }
              </div>
              <div className='flex-1'>
                <div className="flex gap-2">
                  <div className="progress-context flex flex-row gap-2 items-end">
                    <span className="font-bold text-xl text-black text-left">
                      {itemsDone}%
                    </span>
                    <p className="font-normal text-xs text-gray-500 text-left pb-1">Shopping Items {status(itemsDone)}</p>
                  </div>
                </div>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={itemsDone}
                    sx={{
                      height: 8,
                      borderRadius: 5,

                      [`& .${linearProgressClasses.bar}`]: {
                        backgroundColor: progressTaskColor(itemsDone),
                        borderRadius: 5,
                      },

                      backgroundColor: `color-mix(in srgb, ${progressTaskColor(itemsDone)}, transparent 70%)`,
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
                  budgetSpent === 0
                    ? <EmptyCircle fillColor="none" fillBackground={progressBudgetColor(budgetSpent)} />
                    : budgetSpent >= 80
                      ? <ExclamationCircle fillColor="white" fillBackground={progressBudgetColor(budgetSpent)} />
                      : <DotCircle fillColor={progressBudgetColor(budgetSpent)} fillBackground="none" />
                }
              </div>
              <div className='flex-1'>
                <div className="flex gap-2">
                  <div className="progress-context flex flex-row gap-2 items-end">
                    <span className="font-bold text-xl text-black text-left">
                      {budgetSpent}%
                    </span>
                    <p className="font-normal text-xs text-gray-500 text-left pb-1">Budget {statusBudget(budgetSpent)}</p>
                  </div>
                </div>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={budgetSpent}
                    sx={{
                      height: 8,
                      borderRadius: 5,

                      [`& .${linearProgressClasses.bar}`]: {
                        backgroundColor: progressBudgetColor(budgetSpent),
                        borderRadius: 5,
                      },

                      backgroundColor: `color-mix(in srgb, ${progressBudgetColor(budgetSpent)}, transparent 70%)`,
                    }}
                  />

                </Box>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="dashboard-2">


      </div>
    </div>
  );
}
