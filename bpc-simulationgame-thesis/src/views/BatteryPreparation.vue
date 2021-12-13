<template>
  <v-container id="battery-preparation">
    <v-container v-if="round >= 2">
      <!-- custom component with statistic about current, previous round and cost accounting -->
      <prev-cur-round-stats
        :prevAsmLine="'SmartLine'"
        :prevAsmLineCost="0.0"
        :prevNumOfAsmLines="0"
        :prevProdCosts="0.0"
        :prevProdCapac="0.0"
        :prevQuality="0.0"
        :prevWorkload="0.0"
        :prevSafety="0.0"
        :curAsmLine="'SmartLine'"
        :curAsmLineCost="0.0"
        :curNumOfAsmLines="0"
        :curProdCosts="0.0"
        :curProdCapac="0.0"
        :curQuality="0.0"
        :curWorkload="0.0"
        :curSafety="0.0"
        :budget="150000.0"
        :runningCosts="0.0"
        :avgProdCostBike="'Incomplete'"
        :estimatedQual="0.0"
        :maxProdCapac="'Incomplete'"
        :overDemand="40000.0"
        style="height: 500px;"
      />

      <v-divider />

      <!-- Managing battery preparation process -->
      <v-row style="margin-top: 10px;">
        <h2 style="text-align: left;">Manage battery preparation process</h2>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="selectedLine"
            :items="assemblyLines"
            label="Choose assembly line..."
            :color="teamColor"
            item-text="name"
          />

          <v-text-field
            label="Assembly costs (EUR)"
            :value="calculateCosts(selectedLine[0])"
            filled
            disabled
          />
          <v-text-field
            label="Production costs (EUR)"
            :value="calculateCosts(selectedLine[1])"
            filled
            disabled
          />
          <v-text-field
            label="Production capacity (PC)"
            :value="calculateCosts(selectedLine[2])"
            filled
            disabled
          />
        </v-col>

        <v-col>
          <v-slider
            v-model="numOfLines"
            label="Number of Assembly Lines"
            step="1"
            :min="1"
            :max="10"
            ticks="always"
            tick-size="5"
            thumb-label="always"
            :color="teamColor"
            :thumb-color="teamColor"
            :track-color="'teamColor' + 'lighten-3'"
            :track-fill-color="teamColor"
            :thumb-size="24"
          >
            <template v-slot:append>
              <v-text-field
                v-model="numOfLines"
                class="mt-0 pt-0"
                hide-details
                single-line
                :min="1"
                :max="10"
                type="number"
                style="width: 60px"
              />
            </template>
          </v-slider>

          <v-slider
            v-model="quality.val"
            :label="quality.label"
            :color="teamColor"
            :thumb-color="teamColor"
            :min="1"
            :max="100"
            :thumb-size="24"
            thumb-label="always"
            :track-color="'teamColor' + 'lighten-3'"
            :track-fill-color="teamColor"
          >
            <template v-slot:append>
              <v-text-field
                v-model="quality.val"
                class="mt-0 pt-0"
                hide-details
                single-line
                :min="1"
                :max="100"
                type="number"
                style="width: 60px"
              />
            </template>
          </v-slider>

          <v-slider
            v-model="workload.val"
            :label="workload.label"
            :color="teamColor"
            :thumb-color="teamColor"
            :min="1"
            :max="100"
            :thumb-size="24"
            thumb-label="always"
            :track-color="'teamColor' + 'lighten-3'"
            :track-fill-color="teamColor"
          >
            <template v-slot:append>
              <v-text-field
                v-model="workload.val"
                class="mt-0 pt-0"
                hide-details
                single-line
                :min="1"
                :max="100"
                type="number"
                style="width: 60px"
              />
            </template>
          </v-slider>

          <v-slider
            v-model="safety.val"
            :label="safety.label"
            :color="teamColor"
            :thumb-color="teamColor"
            :min="1"
            :max="100"
            :thumb-size="24"
            thumb-label="always"
            :track-color="'teamColor' + 'lighten-3'"
            :track-fill-color="teamColor"
          >
            <template v-slot:append>
              <v-text-field
                v-model="safety.val"
                class="mt-0 pt-0"
                hide-details
                single-line
                :min="1"
                :max="100"
                type="number"
                style="width: 60px"
              />
            </template>
          </v-slider>
        </v-col>
      </v-row>

     <v-row>
        <v-col md='4' align="left">
          <v-btn :color="teamColor" rounded dark @click="toPreviousStep">
            <v-icon left>mdi-arrow-left-bold-circle-outline</v-icon>
            Previous step
          </v-btn>
        </v-col>

        <v-col align="center" md="4">
          <v-btn :color="teamColor" rounded dark @click="toggleDialog" center>
            <v-icon left>mdi-check-outline</v-icon>
            Save changes
          </v-btn>
        </v-col>
      
        <v-col md="4" align="right">
          <v-btn :color="teamColor" rounded dark right @click="toNextStep" >
            <v-icon left>mdi-arrow-right-bold-circle-outline</v-icon>
            Next step
          </v-btn>
        </v-col>
    </v-row>
      <confirmation-dialog 
        v-if="confirmChangesDialog"
        @closeDialog="toggleDialog"
        @updateProgress="updateProgress"
      ></confirmation-dialog>
      <error-chages-dialog
        v-if="showError"
        @closeError="toggleShowError"
      ></error-chages-dialog>
    </v-container>
    <v-container v-else>
      <h1>Hey, url-hacker, you have no access to this component yet!!</h1>
      <v-icon size="500">mdi-police-badge</v-icon>
    </v-container>
  </v-container>
</template>

<script>
import prevCurRoundStats from "../components/prevCurRoundStats.vue";
import ConfirmationDialog from "../dialogs/ConfirmationDialog.vue";
import ErrorChagesDialog from '../dialogs/ErrorChagesDialog.vue';

export default {
  components: { prevCurRoundStats, ConfirmationDialog, ErrorChagesDialog },
  name: "battery-preparation",
  data() {
    return {
       showError: false,
      confirmChangesDialog: false,
      selectedLine: "",
      numOfLines: 1,
      quality: { label: "Quality (%)", val: 50, color: "primary" },
      workload: { label: "Workload (%)", val: 50, color: "primary" },
      safety: { label: "Safety (%)", val: 50, color: "primary" },
      assemblyLines: [
        {
          name: "Assembly Line 1",
          value: ["100", "50", "200"],
        },
        {
          name: "Assembly Line 2",
          value: ["300", "100", "600"],
        },
        {
          name: "Assembly Line 3",
          value: ["500", "250", "2000"],
        },
      ],
      teamColor: this.$store.state.color,
      round: this.$store.state.round
    };
  },
  methods: {
   toggleShowError() {
      this.showError = !this.showError;
    },
    toggleDialog() {
      if(this.selectedLine === "") {
        this.toggleShowError();
      } else {
        this.confirmChangesDialog = !this.confirmChangesDialog;
      }
    },
    updateProgress() {
      this.$emit("updateProgress", "batteryPreparation", 100);
      //this.$router.push({ path: "/dashboard" });
      this.toggleDialog();
    },
    calculateCosts(selectedLine) {
      // check for NaN
      if (typeof selectedLine === "undefined") {
        return "";
      } else {
        return (
          selectedLine *
          this.numOfLines *
          (1 + this.quality.val / 100) *
          (1 + this.workload.val / 100) *
          (1 + this.safety.val / 100)
        ).toFixed(2);
      }
    },
    toNextStep() {
      this.$router.push({ path: "/bikeConstruction" });
    },
    toPreviousStep() {
      if(this.$store.state.round === 2) {
        this.$router.push({ path: "/sensorsPreparation" });      
      } else {
        this.$router.push({ path: "/enginePreparation" });
      }
    }
  },
};
</script>
