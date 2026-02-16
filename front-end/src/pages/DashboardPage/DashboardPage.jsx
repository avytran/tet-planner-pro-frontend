import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import PieCenterLabel from "../../components/ChartsComponent/PieCenterLabel";

export default function DashboardPage() {
  const date = new Date();
  const dateArray = date.toDateString().split(" ");
  const time = date.toLocaleTimeString("en-US", {
    hour: '2-digit',
    minute: '2-digit'
  });

  const tasksRemain = 10;
  const itemsRemain = 10;
  const status = (tasksRemain, itemsRemain) => {
    let result = [];
    if (tasksRemain < 100) {
      result.push("Completed...")
    } else {
      result.push("Completed!")
    }

    if (itemsRemain < 80) {
      result.push("Spent...")
    } else if (itemsRemain >= 80) {
      result.push("Spent!")
    }
    return result
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
        <div className="p-10 w-full md:w-sm bg-white rounded-3xl flex flex-col">
          <p className="text-2xl text-black font-semibold pb-[16px]">Progress</p>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col">
              <div className="flex gap-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>

                <span className="font-normal text-xl text-black text-left">
                  {tasksRemain}%
                </span>
                <p className="font-normal text-xl text-black text-left">Tasks {status(tasksRemain, itemsRemain)[0]}</p>
              </div>
              <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={tasksRemain}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                  }}
                  color={
                    tasksRemain > 50
                      ? "error"
                      : tasksRemain > 20 && tasksRemain < 50
                        ? "warning"
                        : "success"
                  }
                />
              </Box>
            </div>

          </div>
        </div>
      </div>
      <div className="dashboard-2">


      </div>
    </div>
  );
}
