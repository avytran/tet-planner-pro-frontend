import './DashboardPage.css';
export default function DashboardPage() {
  const date = new Date();
  const dateArray = date.toDateString().split(" ");
  const time = date.toLocaleTimeString("en-US", {
    hour: '2-digit',
    minute: '2-digit'
  });
  return (
    <div className="dashboard-container">
      <div className="dashboardTitle">
        <p className="text-5xl font-semibold text-primary">Dashboard</p>
        <p className='text-black'>{time} - {dateArray.slice(1, dateArray.length - 1).join(" ")}, {dateArray[dateArray.length - 1]}</p>
      </div>
      
    </div>
  );
}
