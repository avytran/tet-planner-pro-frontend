import "./ChartsComponent.css";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import PieCenterLabel from "./PieCenterLabel";

/**
 * Renders charts matching Figma design specification.
 * Uses MUI X Charts v7.
 * @see {@link https://v7.mui.com/x/react-charts/} MUI X Charts documentation
 */

export const ChartsComponent = () => {
    const value = 3300000;
    const max = 5000000;
    const percent = Math.round((value / max) * 100);

    return (
        <div className="container">
            <div className="text-primary text-xl pt-10 hover:bg-accent-soft font-medium text-left">
                Chart Examples:
            </div>
            <div className="chart-examples">
                <div className="total-budget-chart">
                    <Box
                        sx={{
                            width: 300,
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
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
                                // const str = `You've spent \n ${value} / ${valueMax}`
                                const formatted = value.toLocaleString('vi-VN');
                                const str = `You've spent \n ${formatted} VND`
                                return str
                            }}
                            sx={{
                                [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                },
                                [`& .${gaugeClasses.valueText} text`]: {
                                    fill: 'orange',
                                },
                                [`& .${gaugeClasses.valueArc}`]: {
                                    fill: 'var(--color-success-strong)',
                                },
                                [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: 'color-mix(in srgb, var(--color-success), transparent 70%)',
                                },
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize: 32,
                                fontWeight: 'bold',
                                color: 'var(--color-success)',
                                marginTop: '-3.5rem', // move closer to gauge
                            }}
                        >
                            {percent}%
                        </Typography>
                    </Box>
                </div>

                <div className="budget-distribution-chart">
                    <PieChart
                        series={[
                            {
                                innerRadius: 50,
                                outerRadius: 100,
                                data: [
                                    { value: 30, color: 'var(--color-accent)', label: 'Food' },
                                    { value: 30, color: 'var(--color-danger)', label: 'Decoration' },
                                    { value: 40, color: 'var(--color-primary)', label: 'Others' },
                                ],
                                valueFormatter: (item) => `${item.value}%`,
                                highlightScope: { fade: 'global', highlight: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -10 },
                            },
                        ]}
                        height={200}
                        width={200}
                        hideLegend // hide label note
                    >
                        <PieCenterLabel color="var(--color-primary)" fontSize={20}>
                            Class
                        </PieCenterLabel>
                    </PieChart>
                </div>

                <div className="spending-timeline-chart">
                    <LineChart
                        series={[
                            { curve: "linear", color: 'var(--color-success)', data: [0, 5, 2, 6, 3, 9.3, 9.5, 4, 3, 7, 5], label: 'Food' },
                            { curve: "linear", color: 'var(--color-danger)', data: [6, 3, 7, 9.5, 4, 2, 5, 2, 6, 3, 9.3], label: 'Decoration' },
                            { curve: "linear", color: 'var(--color-accent)', data: [9.3, 0, 5, 2, 6, 3, 3, 7, 9.5, 4], label: 'Cloths' },
                            { curve: "linear", color: 'var(--color-highlight)', data: [5, 2, 6, 3, 2, 6, 3, 9.3, 7, 9.5, 4], label: 'Others' },
                        ]}
                        height={300}
                        width={600}
                        slotProps={{
                            legend: {
                                direction: 'row',
                                position: { vertical: 'bottom', horizontal: 'middle' },
                                padding: 0,
                            },
                        }}
                    />
                </div>

                <div className="dashboard-chart">
                    <Box sx={{ height: 300, width: 300 }}>
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
                        >
                            <PieCenterLabel color="var(--color-primary)">
                                <tspan style={{ fontSize: '24px', fontWeight: 'bold' }}>60</tspan>
                                <tspan style={{ fontSize: '15px', fontWeight: 'normal' }} dy="2" > /120</tspan>
                            </PieCenterLabel>
                        </PieChart>
                    </Box>
                </div>
            </div>
        </div>
    )
}

