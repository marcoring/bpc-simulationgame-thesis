<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: [
          "Round 1",
          "Round 2",
          "Round 3",
          "Round 4",
          "Round 5",
          "Round 6",
        ],
        datasets: [
          {
            label: "Battery Preparation",
            data: [100, 90, 60, 90, 100, 94],
            backgroundColor: "transparent",
            borderColor: "blue",
            pointBackgroundColor: "blue",
          },
          {
            label: "Engine Preparation",
            data: [35, 91, 52, 93, 12, 60],
            backgroundColor: "transparent",
            borderColor: "green",
            pointBackgroundColor: "green",
          },
          {
            label: "Frame Preparation",
            data: [31, 19, 31, 76, 10, 48],
            backgroundColor: "transparent",
            borderColor: "#d47800",
            pointBackgroundColor: "#d47800",
          },
          {
            label: "Sensor Preparation",
            data: [23, 100, 53, 99, 44, 38],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(1, 116, 188, 0.50)",
          },
          {
            label: "Bike Assemby",
            data: [20, 17, 59, 66, 16, 12],
            backgroundColor: "transparent",
            borderColor: "pink",
            pointBackgroundColor: "pink",
          },
          {
            label: "Logistics",
            data: [26, 20, 57, 43, 13, 63],
            backgroundColor: "transparent",
            borderColor: "#e3a600",
            pointBackgroundColor: "#e3a600",
          },
          {
            label: "Sensor Preparation",
            data: [80, 100, 59, 90, 100, 100],
            backgroundColor: "transparent",
            borderColor: "#006e4b",
            pointBackgroundColor: "#006e4b",
          },
          {
            label: "App development & maintence",
            data: [100, 100, 100, 60, 70, 53],
            backgroundColor: "transparent",
            borderColor: "#46889c",
            pointBackgroundColor: "#46889c",
          },
          {
            label: "Quality Assurance",
            data: [13, 26, 66, 77, 26, 53],
            backgroundColor: "transparent",
            borderColor: "#540606",
            pointBackgroundColor: "#540606",
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "",
        },
      }
    );
  },
};
</script>
