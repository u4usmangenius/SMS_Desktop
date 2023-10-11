import React from "react";
import ReactApexChart from "react-apexcharts";
import CircularProgressChart from "./CircularProgressChart";
import ProgressBar from "./ProgressBar"; // Import the ProgressBar component
import "./StudentProgressChart.css"
const StudentProgressChart = () => {
  // Temporary data array
  const tempData = [
    { date: "2023-08-01", percentage: 75 },
    { date: "2023-08-02", percentage: 80 },
    { date: "2023-08-03", percentage: 85 },
    { date: "2023-08-04", percentage: 78 },
    { date: "2023-08-05", percentage: 88 },
    // Add more data points as needed
  ];

  // Prepare data for the chart
  const chartOptions = {
    chart: {
      id: "student-progress",
    },
    xaxis: {
      categories: tempData.map((item) => item.date),
    },
    colors:["#00FFFF"]
  };

  const chartSeries = [
    {
      name: "Student Progress",
      data: tempData.map((item) => item.percentage),
    },

  ];
  // Calculate the overall percentage, passed, and failed students
  const overallPercentage =
    tempData.reduce((acc, item) => acc + item.percentage, 0) / tempData.length;
  const totalStudents = tempData.length;
  const passedStudents = tempData.filter(
    (item) => item.percentage >= 50
  ).length;
  const failedStudents = totalStudents - passedStudents;

  return (
    <>
      <div className="student-progress-chart">
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={350}
        />
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <CircularProgressChart
            percentage={overallPercentage}
            passed={passedStudents}
            failed={failedStudents}
          />
        </div>
        <div className="progress-bar">
          <ProgressBar
            totalStudents={totalStudents}
            passedStudents={passedStudents}
            failedStudents={failedStudents}
          />
        </div>
      </div>
    </>
  );
};

export default StudentProgressChart;
