import React from "react";
import { connect } from "react-redux";
import { Line, Bar } from "react-chartjs-2";
import { socket } from "../../socket/socketConn";

let options = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 60,
          suggestedMax: 125,
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
  },
};

let canvas = document.createElement("CANVAS");
let ctx = canvas.getContext("2d");

let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
gradientStroke.addColorStop(0, "rgba(29,140,248,0)");

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

class ChartLine extends React.Component {
  state = {
    labels: labels,
    datasets: [
      {
        label: labels,
        fill: true,
        data: [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
        backgroundColor: gradientStroke,
        borderColor: "#1f8ef1",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#1f8ef1",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#1f8ef1",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
      },
    ],
  };
  componentDidMount() {
    socket.emit("chartData", "giveData");
    socket.on("chartDataReturn", (data) => {
      console.log(data);
      const chartValues = data.map((singleData) => {
        return singleData.value;
      });
      //   console.log(datasetss);
      this.setState({
        labels: labels,
        datasets: [
          {
            label: "Faults",
            fill: true,
            data: chartValues,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
          },
        ],
      });
    });
  }

  componentWillUnmount() {
    socket.off("chartDataReturn", () =>
      console.log("chartDataReturn listener removed")
    );
  }

  render() {
    return <Line data={this.state} options={options} />;
  }
}

export default ChartLine;
