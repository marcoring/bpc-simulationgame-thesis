<template>
  <v-container id="charts" ref="myid">
    <v-row class="pa-6 text-left">
      <v-col>
        <v-card>
          <v-card-title :style="'background-color:' + teamColor +'!important'" style="color: white">
            Overall Employee Satisfaction - Team Comparison
          </v-card-title>
          <employees-satisfaction-all />
        </v-card>
      </v-col>
    </v-row>   

    <v-row class="pa-6 text-left">
      <v-col>
        <v-card>
          <v-card-title :style="'background-color:' + teamColor +'!important'" style="color: white">
            Your Employees Satisfaction - Each Step
          </v-card-title>
          <employees-satisfaction-steps />
        </v-card>
      </v-col>
    </v-row>   

    <v-row class="pa-6 text-left">
      <v-col>
        <v-card>
          <v-card-title :style="'background-color:' + teamColor +'!important'" style="color: white">
            Employees Satisfaction {{'- ' + selectedProcess}} 
          </v-card-title>
           <v-select
            v-model="selectedProcess"
            :items="processes"
            :color="teamColor"
            label="Select process to learn more about employee satisfaction"
            item-text="name"
            style="margin: 10px"
          />

          <br />

          <employees-satisfaction-details :data="chartData" />
        </v-card>
      </v-col>
    </v-row>   

    <v-row class="pa-6 text-left">
      <v-col>
        <v-card>
          <v-card-title :style="'background-color:' + teamColor +'!important'" style="color: white">
            Budget distribution
          </v-card-title>
          <pie-chart />
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title :style="'background-color:' + teamColor +'!important'" style="color: white">
            Budget changes
          </v-card-title>
          <line-chart />
        </v-card>
      </v-col>
    </v-row>
    <div id="overlay">
    </div>

    <v-row class="pa-6 text-left">
      <v-col>
        <v-card>
          <v-card-title :style="'background-color:' + teamColor +'!important'" style="color: white">
            Current round statistic
          </v-card-title>
          <bar-chart />
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title :style="'background-color:' + teamColor +'!important'" style="color: white" ref="allRoundsCard">
            All rounds comparison
          </v-card-title>
          <radar-chart />
        </v-card>
      </v-col>
    </v-row>     
  </v-container>
</template>

<script>
import lineChart from "./lineChart.vue";
import pieChart from "./pieChart.vue";
import barChart from "./barChart.vue";
import radarChart from "./radarChart.vue";
import EmployeesSatisfactionSteps from './EmployeesSatisfactionSteps.vue';
import EmployeesSatisfactionAll from './EmployeesSatisfactionAll.vue';
import EmployeesSatisfactionDetails from './EmployeesSatisfactionDetails.vue';

export default {
  components: {
    lineChart, 
    pieChart, 
    barChart, 
    radarChart, 
    EmployeesSatisfactionSteps, 
    EmployeesSatisfactionAll, 
    EmployeesSatisfactionDetails
  },
  data() {
    return {
      chartData: null,
      teamColor: this.$store.state.color,
      selectedProcess: 'Battery Preparation',
      processes: [
        'Battery Preparation', 
        'Frame Preparation', 
        'Engine Preparation', 
        'Sensor Preparation', 
        'Bike Assembly', 
        'Application & Development', 
        'Logistic'
      ],
      set1: [
        {
          label: "Employee Satisfaction",
          data: [100, 95, 100, 90, 80, 80],
          backgroundColor: "transparent",
          borderColor: "green",
          pointBackgroundColor: "green",
        },
        {
          label: "Quality",
          data: [100, 88, 95, 100, 89, 79],
          backgroundColor: "transparent",
          borderColor: "red",
          pointBackgroundColor: "red",
        },
        {
          label: "Workload",
          data: [44, 55, 66, 77, 90, 50],
          backgroundColor: "transparent",
          borderColor: "blue",
          pointBackgroundColor: "blue",
        },
        {
          label: "Safety",
          data: [90, 77, 35, 100, 50, 10],
          backgroundColor: "transparent",
          borderColor: "#e3a600",
          pointBackgroundColor: "#e3a600",
        }
      ],
      set2: [
        {
          label: "Employee Satisfaction",
          data: [44, 55, 66, 77, 90, 50],
          backgroundColor: "transparent",
          borderColor: "green",
          pointBackgroundColor: "green",
        },
        {
          label: "Quality",
          data: [10, 20, 30, 10, 10, 20],
          backgroundColor: "transparent",
          borderColor: "red",
          pointBackgroundColor: "red",
        },
        {
          label: "Workload",
          data: [100, 100, 100, 90, 80, 85],
          backgroundColor: "transparent",
          borderColor: "blue",
          pointBackgroundColor: "blue",
        },
        {
          label: "Safety",
          data: [13, 44, 11, 78, 23, 51],
          backgroundColor: "transparent",
          borderColor: "#e3a600",
          pointBackgroundColor: "#e3a600",
        }
      ],
      set3: [
        {
          label: "Employee Satisfaction",
          data: [41, 51, 66, 77, 90, 58],
          backgroundColor: "transparent",
          borderColor: "green",
          pointBackgroundColor: "green",
        },
        {
          label: "Quality",
          data: [11, 21, 31, 13, 13, 23],
          backgroundColor: "transparent",
          borderColor: "red",
          pointBackgroundColor: "red",
        },
        {
          label: "Workload",
          data: [10, 55, 10, 90, 8, 80],
          backgroundColor: "transparent",
          borderColor: "blue",
          pointBackgroundColor: "blue",
        },
        {
          label: "Safety",
          data: [14, 44, 13, 79, 25, 51],
          backgroundColor: "transparent",
          borderColor: "#e3a600",
          pointBackgroundColor: "#e3a600",
        }
      ],
      set4: [
        {
          label: "Employee Satisfaction",
          data: [11, 22, 33, 44, 55, 66],
          backgroundColor: "transparent",
          borderColor: "green",
          pointBackgroundColor: "green",
        },
        {
          label: "Quality",
          data: [22, 33, 44, 55, 66, 77],
          backgroundColor: "transparent",
          borderColor: "red",
          pointBackgroundColor: "red",
        },
        {
          label: "Workload",
          data: [88,99, 11, 12, 13, 14],
          backgroundColor: "transparent",
          borderColor: "blue",
          pointBackgroundColor: "blue",
        },
        {
          label: "Safety",
          data: [22, 33, 33, 35, 36, 37],
          backgroundColor: "transparent",
          borderColor: "#e3a600",
          pointBackgroundColor: "#e3a600",
        }
      ],
      set5: [
        {
          label: "Employee Satisfaction",
          data: [11, 22, 33, 44, 55, 66],
          backgroundColor: "transparent",
          borderColor: "green",
          pointBackgroundColor: "green",
        },
        {
          label: "Quality",
          data: [22, 33, 44, 55, 66, 77],
          backgroundColor: "transparent",
          borderColor: "red",
          pointBackgroundColor: "red",
        },
        {
          label: "Workload",
          data: [88, 99, 10, 12, 13, 14],
          backgroundColor: "transparent",
          borderColor: "blue",
          pointBackgroundColor: "blue",
        },
        {
          label: "Safety",
          data: [100, 88, 77, 73, 69, 65],
          backgroundColor: "transparent",
          borderColor: "#e3a600",
          pointBackgroundColor: "#e3a600",
        }
      ],
      set6: [
        {
          label: "Employee Satisfaction",
          data: [100, 88, 77, 73, 69, 65],
          backgroundColor: "transparent",
          borderColor: "green",
          pointBackgroundColor: "green",
        },
        {
          label: "Quality",
          data: [100, 78, 97, 63, 71, 65],
          backgroundColor: "transparent",
          borderColor: "red",
          pointBackgroundColor: "red",
        },
        {
          label: "Workload",
          data: [88, 99, 91, 12, 19, 30],
          backgroundColor: "transparent",
          borderColor: "blue",
          pointBackgroundColor: "blue",
        },
        {
          label: "Safety",
          data: [41, 51, 66, 77, 90, 50],
          backgroundColor: "transparent",
          borderColor: "#e3a600",
          pointBackgroundColor: "#e3a600",
        }
      ],
      set7: [
        {
          label: "Employee Satisfaction",
          data: [44, 55, 66, 77, 90, 50],
          backgroundColor: "transparent",
          borderColor: "green",
          pointBackgroundColor: "green",
        },
        {
          label: "Quality",
          data: [12, 14, 15, 90, 80, 80],
          backgroundColor: "transparent",
          borderColor: "red",
          pointBackgroundColor: "red",
        },
        {
          label: "Workload",
          data: [10, 20, 30, 10, 10, 20],
          backgroundColor: "transparent",
          borderColor: "blue",
          pointBackgroundColor: "blue",
        },
        {
          label: "Safety",
          data: [90, 77, 35, 1, 5, 12],
          backgroundColor: "transparent",
          borderColor: "#e3a600",
          pointBackgroundColor: "#e3a600",
        }
      ]
    }
  },
  watch: {
    selectedProcess: function() {
      switch(this.selectedProcess) {
        case 'Battery Preparation':
          this.chartData = this.set1;
          break;
        case 'Frame Preparation':
          this.chartData = this.set2;
          break;
        case 'Engine Preparation':
          this.chartData = this.set3;
          break;
        case 'Sensor Preparation':
          this.chartData = this.set4;
          break;
        case 'Bike Assembly':
          this.chartData = this.set5;
          break;
        case 'Application & Development':
          this.chartData = this.set6;
          break;
        case 'Logistic':
          this.chartData = this.set7;
          break;
        default:
          this.chartData = this.set1;
      }
    }
  },
  mounted() {
    this.chartData = this.set1;
  }
}
</script>

<style scoped>
.overlay {
  z-index: 9;
  margin: 30px;
  background: #009938;
}
</style>
