import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartJS = ({ title, data }) => {
  let dataEvenDate = data.filter((e, index) => {
    return index % 2 === 0;
  });

  if (dataEvenDate.length < 8) {
    for (let i = 0; i < 8 - dataEvenDate.length; i++) {
      dataEvenDate.push("");
    }
  }

  let dataStrangeDate = data.filter((e, index) => {
    return index % 2 !== 0;
  });

  let min = Math.min(...dataStrangeDate);
  let max = Math.max(...dataStrangeDate);

  console.log(dataEvenDate, dataStrangeDate);

  const options = {
    maintainAspectRatio: false,
    responsive: true,

    y: {
      responsive: true,
      baginAtZero: true,
      display: true,
      title: {
        display: true,
        text: "Value",
      },
      suggestedMin: min - 10,
      suggestedMax: max + 10,
    },
  };

  const lineChartData = {
    labels: dataEvenDate,
    datasets: [
      {
        label: title,
        data: dataStrangeDate,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div
      style={
        data.length >= 10
          ? {
              display: "flex", //width: "650px",
              maxWidth: "750px",
              overflowX: "scroll",
              responsive: true,
            }
          : {
              display: "flex",
              width: "650px",
              maxWidth: "750px",
              //overflowX: "scroll",
              responsive: true,
            }
      }
    >
      <div
        style={
          data.length >= 10
            ? {
                display: "flex",
                //width: "750px",
                height: "500px",
              }
            : {
                display: "flex",
                width: "750px",
                height: "500px",
              }
        }
      >
        <Line
          style={{
            padding: "10px",
            backgroundColor: "white",
          }}
          options={options}
          data={lineChartData}
        />
      </div>
    </div>
  );
};

export default LineChartJS;
