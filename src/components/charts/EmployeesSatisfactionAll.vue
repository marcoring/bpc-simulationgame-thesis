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
            label: "Team 1",
            data: [12, 65, 67, 68, 73, 65],
            backgroundColor: "transparent",
            borderColor: "green",
            pointBackgroundColor: "green",
          },
          {
            label: "Team 2",
            data: [5, 45, 65, 45, 50, 28],
            backgroundColor: "transparent",
            borderColor: "red",
            pointBackgroundColor: "red",
          }
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "",
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Score',
                    
                }
            }]
        } 
      }
    );
  },
};
</script>
