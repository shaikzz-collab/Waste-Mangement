import React from "react";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardCharts = ({ data }) => {
  if (!data) return null;

  const { category_breakdown = {}, timeline = [] } = data;

  // Chart styling constants
  const chartGridColor = "#204732";
  const chartTextColor = "#8AA89A";
  const neonGreen = "#37D67A";
  const darkForest = "#10251C";
  const textWhite = "#E8FFF3";

  // Chart 1: Doughnut Chart (Waste breakdown by category)
  const categories = Object.keys(category_breakdown);
  const categoryCounts = Object.values(category_breakdown);

  // Dynamic green-shaded palette for doughnut slices
  const doughnutColors = [
    "#37D67A", // Accent green
    "#26A95B", // Medium green
    "#1D8145", // Darker green
    "#13552D", // Forest green
    "#0B331B", // Deep forest
    "#52E08E", // Light accent
    "#18C18E", // Teal green
    "#5D7E6B"  // Sage grey
  ];

  const doughnutData = {
    labels: categories,
    datasets: [
      {
        data: categoryCounts,
        backgroundColor: doughnutColors.slice(0, categories.length),
        borderColor: "#10251C",
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: chartTextColor,
          font: { family: "Space Mono", size: 10 },
          padding: 12
        }
      },
      tooltip: {
        backgroundColor: darkForest,
        borderColor: chartGridColor,
        borderWidth: 1,
        titleColor: neonGreen,
        bodyColor: textWhite,
        titleFont: { family: "Space Mono" },
        bodyFont: { family: "Space Mono" }
      }
    }
  };

  // Chart 2: Line Chart (Recycling Rate %)
  // Calculate percentage for each timeline record
  const lineLabels = timeline.map((t) => t.month);
  const recyclingRates = timeline.map((t) => {
    if (t.scanned === 0) return 0;
    return Math.round((t.recycled / t.scanned) * 100);
  });

  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        label: "Recycling Efficiency %",
        data: recyclingRates,
        borderColor: neonGreen,
        backgroundColor: "rgba(55, 214, 122, 0.08)",
        borderWidth: 2.5,
        fill: true,
        tension: 0.3,
        pointBackgroundColor: neonGreen,
        pointBorderColor: "#07140F",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: darkForest,
        borderColor: chartGridColor,
        borderWidth: 1,
        titleColor: neonGreen,
        bodyColor: textWhite,
        titleFont: { family: "Space Mono" },
        bodyFont: { family: "Space Mono" },
        callbacks: {
          label: (context) => `Rate: ${context.parsed.y}%`
        }
      }
    },
    scales: {
      x: {
        grid: { color: "rgba(32, 71, 50, 0.4)", drawBorder: false },
        ticks: { color: chartTextColor, font: { family: "Space Mono", size: 9 } }
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: chartGridColor, drawBorder: false },
        ticks: { 
          color: chartTextColor, 
          font: { family: "Space Mono", size: 9 },
          callback: (value) => `${value}%`
        }
      }
    }
  };

  // Chart 3: Bar Chart (Total Disposed vs Recycled)
  const barLabels = timeline.map((t) => t.month);
  const scansData = timeline.map((t) => t.scanned);
  const recycledData = timeline.map((t) => t.recycled);

  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: "Total Logs",
        data: scansData,
        backgroundColor: "#204732",
        borderColor: "rgba(55, 214, 122, 0.2)",
        borderWidth: 1,
        borderRadius: 3
      },
      {
        label: "Recycled",
        data: recycledData,
        backgroundColor: neonGreen,
        borderColor: neonGreen,
        borderWidth: 1,
        borderRadius: 3
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: chartTextColor,
          font: { family: "Space Mono", size: 10 }
        }
      },
      tooltip: {
        backgroundColor: darkForest,
        borderColor: chartGridColor,
        borderWidth: 1,
        titleColor: neonGreen,
        bodyColor: textWhite,
        titleFont: { family: "Space Mono" },
        bodyFont: { family: "Space Mono" }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: chartTextColor, font: { family: "Space Mono", size: 9 } }
      },
      y: {
        grid: { color: chartGridColor, drawBorder: false },
        ticks: { color: chartTextColor, font: { family: "Space Mono", size: 9 }, stepSize: 5 }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Category Breakdown (Doughnut) */}
      <div className="bg-[#10251C] border border-[#204732] rounded-lg p-5 flex flex-col">
        <h3 className="text-xs uppercase font-mono tracking-wider text-[#8AA89A] border-b border-[#204732] pb-2 mb-4">
          ▋ Waste Type Distribution
        </h3>
        <div className="relative h-64 w-full flex-grow flex items-center justify-center">
          {categoryCounts.reduce((a, b) => a + b, 0) === 0 ? (
            <p className="text-xs text-[#8AA89A] italic">No distribution data available</p>
          ) : (
            <Doughnut data={doughnutData} options={doughnutOptions} />
          )}
        </div>
      </div>

      {/* Recycling Efficiency Rate (Line) */}
      <div className="bg-[#10251C] border border-[#204732] rounded-lg p-5 flex flex-col">
        <h3 className="text-xs uppercase font-mono tracking-wider text-[#8AA89A] border-b border-[#204732] pb-2 mb-4">
          ▋ Monthly Recovery Efficiency
        </h3>
        <div className="relative h-64 w-full flex-grow">
          {timeline.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-xs text-[#8AA89A] italic">No historical rate data</p>
            </div>
          ) : (
            <Line data={lineData} options={lineOptions} />
          )}
        </div>
      </div>

      {/* Total Scanned vs Recycled (Bar) */}
      <div className="bg-[#10251C] border border-[#204732] rounded-lg p-5 flex flex-col">
        <h3 className="text-xs uppercase font-mono tracking-wider text-[#8AA89A] border-b border-[#204732] pb-2 mb-4">
          ▋ Volume Comparison (Log vs Recycled)
        </h3>
        <div className="relative h-64 w-full flex-grow">
          {timeline.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-xs text-[#8AA89A] italic">No quantity metrics logged</p>
            </div>
          ) : (
            <Bar data={barData} options={barOptions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
