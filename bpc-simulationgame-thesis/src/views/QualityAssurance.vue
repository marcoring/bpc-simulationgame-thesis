<template>
  <v-container id="quality-assurance">
    <v-container v-if="round >= 2">
      <!-- Statistic about current, previous round and cost accounting -->
      <v-row style="height: 400px;">
        <v-col>
          <!-- Previous Round Status -->
          <v-card style="height:100%">
            <v-card-title
              :style="'background-color:' + teamColor + '!important'"
              style="color: white"
            >
              Previous Round
            </v-card-title>
            <v-card-text>
              <p>Internal/External: {{ prevInternExtern }}</p>
              <p>Yearly costs (EUR): {{ prevYearCost }}</p>
              <p>Quality (%): {{ prevQual }}</p>
              <p>Number of employees: {{ prevNumOfEmpl }}</p>
              <p>QA capacity (PC): {{ prevQACap }}</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col>
          <!-- Current Round Status -->
          <v-card style="height:100%">
            <v-card-title
              :style="'background-color:' + teamColor + '!important'"
              style="color: white"
            >
              Current Round
            </v-card-title>
            <v-card-text>
              <p>Internal/External: {{ curInternExtern }}</p>
              <p>Yearly costs (EUR): {{ curYearCost }}</p>
              <p>Quality (%): {{ curQual }}</p>
              <p>Number of employees: {{ curNumOfEmpl }}</p>
              <p>QA capacity (PC): {{ curQACap }}</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col>
          <!-- Cost Accounting -->
          <cost-accounting-card
            style="height:100%"
            :budget="10.0"
            :runningCosts="222.222"
            :avgProdCostBike="'Incomplete'"
            :estimatedQual="21.29"
            :maxProdCapac="'Incomplete'"
            :overDemand="40000.0"
          />
        </v-col>
      </v-row>

      <v-divider />

      <!-- Managing Quality Assurance process -->
      <v-row style="margin-top: 10px;">
        <h2 style="text-align: left;">
          Manage Quality Assurance process
        </h2>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="selectedQAType"
            :items="QAType"
            label="Quality Assurance type"
            :color="teamColor"
            item-text="name"
          />
          <v-slider
            v-model="numOfEmpl"
            label="Number of Employees"
            step="1"
            :min="1"
            :max="10"
            ticks="always"
            tick-size="5"
            thumb-label="always"
            :color="teamColor"
            :thumb-color="teamColor"
            :thumb-size="24"
            :track-color="'teamColor' + 'lighten-3'"
            :track-fill-color="teamColor"
          >
            <template v-slot:append>
              <v-text-field
                v-model="numOfEmpl"
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
            :thumb-size="24"
            :min="1"
            :max="100"
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
        </v-col>

        <v-col>
          <v-text-field
            label="Base salary (EUR)"
            :value="calculateCosts(selectedQAType[0])"
            filled
            disabled
          />
          <v-text-field
            label="Cost per year (EUR)"
            :value="calculateCosts(selectedQAType[1])"
            filled
            disabled
          />
          <v-text-field
            label="QA Capacity (PC)"
            :value="calculateCosts(selectedQAType[2])"
            filled
            disabled
          />
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
import CostAccountingCard from "../components/CostAccountingCard.vue";
import ConfirmationDialog from "../dialogs/ConfirmationDialog.vue";
import ErrorChagesDialog from '../dialogs/ErrorChagesDialog.vue';

export default {
  components: { CostAccountingCard, ConfirmationDialog, ErrorChagesDialog},
  data() {
    return {
      showError: false,
      teamColor: this.$store.state.color,
      round: this.$store.state.round,
      confirmChangesDialog: false,
      selectedQAType: "",
      QAType: [
        {
          name: "QA-Type 1",
          value: ["4040", "543218", "80"],
        },
        {
          name: "QA-Type 2",
          value: ["7060", "345180", "124"],
        },
      ],
      numOfEmpl: 1,
      quality: { label: "Quality (%)", val: 50, color: "primary" },
    };
  },
  methods: {
    toggleShowError() {
      this.showError = !this.showError;
    },
    toggleDialog() {
      if(this.selectedQAType === "") {
        this.toggleShowError();
      } else {
        this.confirmChangesDialog = !this.confirmChangesDialog;
      }
    },
    updateProgress() {
      this.$emit("updateProgress", "qualityAssurance", 100);
      //this.$router.push({ path: "/dashboard" });
      this.toggleDialog();
    },
    calculateCosts(selectedQAType) {
      // check for NaN
      if (typeof selectedQAType === "undefined") {
        return "";
      } else {
        return (
          selectedQAType *
          this.numOfEmpl *
          (1 + this.quality.val / 100)
        ).toFixed(2);
      }
    },
    toNextStep() {
      this.$router.push({ path: "/sales" });
    },
    toPreviousStep() {
      if(this.$store.state.round >= 4) {
        this.$router.push({ path: "/appDevAndMaintenance" });
      } else {
        this.$router.push({ path: "/bikeConstruction" });
      }
       
    }
  },
  props: {
    prevInternExtern: {
      type: String,
      default: "",
    },
    prevYearCost: {
      type: Number,
      default: 0.0,
    },
    prevQual: {
      type: Number,
      default: 0.0,
    },
    prevNumOfEmpl: {
      type: Number,
      default: 0,
    },
    prevQACap: {
      type: Number,
      default: 0.0,
    },
    curInternExtern: {
      type: String,
      default: "",
    },
    curYearCost: {
      type: Number,
      default: 0.0,
    },
    curQual: {
      type: Number,
      default: 0.0,
    },
    curNumOfEmpl: {
      type: Number,
      default: 0,
    },
    curQACap: {
      type: Number,
      default: 0.0,
    },
    budget: {
      type: Number,
      default: 0.0,
    },
    runningCosts: {
      type: Number,
      default: 0.0,
    },
    avgProdCostBike: {
      type: String,
      default: "",
    },
    estimatedQual: {
      type: Number,
      default: 0.0,
    },
    maxProdCapac: {
      type: String,
      default: "",
    },
    overDemand: {
      type: Number,
      default: 0.0,
    },
  },
};
</script>
