import { PieChart } from "@mui/x-charts"

export const TaskChart = ({ chartData }) => {
    return (
        <div className="mb-4 rounded-xl border border-primary/10 bg-white p-4">
            <h2 className="mb-2 text-2xl font-semibold text-primary-strong">
                Tasks in Categories
            </h2>
            <div className="flex justify-center">
                <PieChart
                    width={260}
                    height={220}
                    series={[
                        {
                            innerRadius: 40,
                            outerRadius: 85,
                            data: chartData,
                        },
                    ]}
                    hideLegend
                />
            </div>

            <div className="mt-1 flex flex-wrap justify-center gap-4 text-xs text-primary-strong/80">
                {chartData.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-1">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
        </div>
    )

}
