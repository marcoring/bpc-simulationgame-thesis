<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["data", "options"],
  mounted() {
    this.renderLineChart();
  },
  computed: {
    chartData: function() {
      return this.data;
    }
  },
  methods: {
    renderLineChart: function() {
        this.renderChart(
            {
                labels: ["Round 1", "Round 2", "Round 3","Round 4","Round 5","Round 6",],
                datasets: this.chartData
            },
            {
                responsive: true, 
                maintainAspectRatio: false,
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
    }
  },
  watch: {
    data: function() {
      this.$data._chart.destroy();
      //this.renderChart(this.data, this.options);
      this.renderLineChart();
    }
  }
};
</script>
