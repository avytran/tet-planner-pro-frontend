import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import PieCenterLabel from "../../components/ChartsComponent/PieCenterLabel";
import { DotCircle, EmptyCircle } from '../../components/Icons/outline';
import { CheckCircle, ExclamationCircle } from '../../components/Icons/solid';
import { LineChart } from '@mui/x-charts/LineChart';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useTasks, useItems, useTaskCategory, useTotalBudget } from '../../hooks/dashboardHooks'

const timelineArr = ['Pre_Tet', 'During_Tet', 'After_Tet']
const timelineColors = {
  'Pre_Tet': 'var(--color-success)',
  'During_Tet': 'var(--color-primary)',
  'After_Tet': 'var(--color-accent)'
};

function mapData(data) {
  let total = data.length
  let done = 0
  let notDone = 0
  const result = data.reduce((map, item) => {
    const timeline = item.timeline;

    if (!map.has(timeline)) {
      map.set(timeline, [0, 0, 0]); // [total, done, notDone]
    }

    const stats = map.get(timeline);

    stats[0] += 1; // total

    if (item.status === "Done" || item.status === "Completed") {
      stats[1] += 1; // done
    } else {
      stats[2] += 1; // notDone
    }

    return map;
  }, new Map());
  for (const [key, value] of result) {
    done += value[1]
    notDone += value[2]
  }
  return { result, total, done, notDone }
}

function transformData(mapData) {

  const innerData = timelineArr.map((timeline) => {

    const stats = mapData.get(timeline) ?? [0, 0, 0];

    return {
      id: timeline,
      label: timeline.split("_").join(" "),
      value: stats[0],
      color: timelineColors[timeline],
    };
  });

  const outerData = timelineArr.map((timeline) => {

    const stats = mapData.get(timeline) ?? [0, 0, 0];

    return [
      {
        label: "Done",
        value: stats[1],
        color: timelineColors[timeline],
      },
      {
        label: "Not Done",
        value: stats[2],
        color: `color-mix(in srgb, ${timelineColors[timeline]}, transparent 40%)`,
      }
    ];
  })
    .flat();

  return { innerData, outerData };
}

function calPercentage(done, total) {
  if (done === 0 && total === 0) {
    return 0
  } else {
    return (done / total) * 100
  }
}

/**
 * getTasks
 * getTaskCategory
 * getItems
 * getTotalBudget
 */
export default function DashboardPage() {

  const { user } = useContext(AuthContext);
  const { loading: tasksLoading, error: tasksError, data: tasksData } = useTasks(user.id);
  const { loading: itemsLoading, error: itemsError, data: itemsData } = useItems(user.id);
  // const { loading: categoryLoading, error: categoryError, data: categoryData } = useTaskCategory(user.id, categoryId);
  const { loading: budgetLoading, error: budgetError, data: budgetData } = useTotalBudget(user.id);

  if (tasksLoading || itemsLoading || budgetLoading) {
    return <div>Loading</div>;
  } else if (tasksError || itemsError || budgetError) {
    return <div>Error data</div>
  }

  const tasksMap = mapData(tasksData.getTasks)
  const tasksMapTransformed = transformData(tasksMap.result)
  const tasksTotal = tasksMap.total
  const tasksDone = tasksMap.done
  const tasksInnerData = tasksMapTransformed.innerData
  const tasksOuterData = tasksMapTransformed.outerData

  const itemsMap = mapData(itemsData.getItems.items)
  const itemsMapTransformed = transformData(itemsMap.result)
  const itemsTotal = itemsMap.total
  const itemsDone = itemsMap.done
  const itemsInnerData = itemsMapTransformed.innerData
  const itemsOuterData = itemsMapTransformed.outerData

  const tasksPercentage = calPercentage(tasksDone, tasksTotal);
  const itemsPercentage = calPercentage(itemsDone, itemsTotal);

  // ===================================================================================================
  // ===================================================================================================
  // ===================================================================================================

  const budgetSpent = 80;

  // const tasksOuterData = [
  //   { value: 30, color: 'var(--color-success)', label: 'Done' }, // yellow
  //   { value: 10, color: 'color-mix(in srgb, var(--color-success), transparent 50%)', label: 'Not Done' }, // yellow
  //   { value: 10, color: 'var(--color-primary)', label: 'Done' }, // teal
  //   { value: 30, color: 'color-mix(in srgb, var(--color-primary), transparent 50%)', label: 'Not Done' }, // teal
  //   { value: 20, color: 'var(--color-accent)', label: 'Done' }, // teal
  //   { value: 20, color: 'color-mix(in srgb, var(--color-accent), transparent 50%)', label: 'Not Done' }, // red
  // ];

  // const tasksInnerData = [
  //   { value: 40, color: 'var(--color-success)', label: 'Before Tet' }, // yellow
  //   { value: 40, color: 'var(--color-primary)', label: 'Tet' }, // teal
  //   { value: 40, color: 'var(--color-accent)', label: 'After Tet' }, // teal
  // ]

  // const itemsOuterData = [
  //   { value: 30, color: 'var(--color-success)', label: 'Done' }, // yellow
  //   { value: 10, color: 'color-mix(in srgb, var(--color-success), transparent 50%)', label: 'Not Done' }, // yellow
  //   { value: 10, color: 'var(--color-primary)', label: 'Done' }, // teal
  //   { value: 30, color: 'color-mix(in srgb, var(--color-primary), transparent 50%)', label: 'Not Done' }, // teal
  //   { value: 20, color: 'var(--color-accent)', label: 'Done' }, // teal
  //   { value: 20, color: 'color-mix(in srgb, var(--color-accent), transparent 50%)', label: 'Not Done' }, // red
  // ];

  // const itemsInnerData = [
  //   { value: 40, color: 'var(--color-success)', label: 'Before Tet' }, // yellow
  //   { value: 40, color: 'var(--color-primary)', label: 'Tet' }, // teal
  //   { value: 40, color: 'var(--color-accent)', label: 'After Tet' }, // teal
  // ]

  const timelineSeries = [
    { curve: "linear", color: 'var(--color-success)', data: [0, 5, 2, 6, 3, 9.3, 9.5, 4, 3, 7, 5], label: 'Food' },
    { curve: "linear", color: 'var(--color-danger)', data: [6, 3, 7, 9.5, 4, 2, 5, 2, 6, 3, 9.3], label: 'Decoration' },
    { curve: "linear", color: 'var(--color-accent)', data: [9.3, 0, 5, 2, 6, 3, 3, 7, 9.5, 4], label: 'Cloths' },
    { curve: "linear", color: 'var(--color-highlight)', data: [5, 2, 6, 3, 2, 6, 3, 9.3, 7, 9.5, 4], label: 'Others' },
  ]
  const datePoints = [
    '2023-01',
    '2023-02',
    '2023-03',
    '2023-04',
    '2023-05',
    '2023-06',
    '2023-07',
    '2023-08',
    '2023-09',
    '2023-10',
    '2023-11',
  ]

  const categorySeries = [
    { value: 30, color: 'var(--color-accent)', label: 'Food' },
    { value: 30, color: 'var(--color-danger)', label: 'Decoration' },
    { value: 40, color: 'var(--color-primary)', label: 'Others' },
  ]
  // ===================================================================================================
  // ===================================================================================================
  // ===================================================================================================
  const date = new Date();
  const dateArray = date.toDateString().split(" ");
  const time = date.toLocaleTimeString("en-US", {
    hour: '2-digit',
    minute: '2-digit'
  });

  const status = (value) => value === 100 ? "Completed!" : "Completed...";
  const statusBudget = (value) => value >= 100 ? "Spent!" : "Spent...";

  const progressTaskColor = (tasksDone) => {
    if (tasksDone === 0) {
      return "#AEA9B1";
    }

    if (tasksDone >= 70) {
      return "var(--color-success)";
    }

    return "#0043CE";
  };

  const progressBudgetColor = (budgetSpent) => {
    if (budgetSpent === 0) {
      return "#AEA9B1";
    }

    if (budgetSpent >= 95) {
      return "var(--color-danger)";
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
        <div class="lg:col-span-2 p-10 w-full bg-white rounded-3xl flex flex-col">
          <p className="text-2xl text-black font-semibold pb-[16px]">Spending Timeline</p>
          <LineChart
            series={timelineSeries}
            height={300}
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
          >
            {/* <PieCenterLabel color="var(--color-primary)" fontSize={13}>
              Categories
            </PieCenterLabel> */}
          </PieChart>

          <div
            className={"px-6 py-7 rounded-2xl justify-items-start bg-accent gap-1.5 flex flex-col"}
          >
            <p className={"text-base font-semibold text-white"}>Notification</p>
            <p className={"text-base font-light text-left text-white"}>You have 2 tasks, 3 items to do today.</p>
          </div>
        </div>
      </div>
    </div >
  );
}
