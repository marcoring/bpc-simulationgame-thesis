<template>
  <v-container id="app-dev-and-maintenance">
    <v-container v-if="round >= 4">
      <!-- Statistic about current, previous round and cost accounting -->
      <v-row style="height: 400px;">
        <v-col>
          <!-- Previous Round Status -->
          <v-card style="height:100%">
            <v-card-title :style="'background-color:' + teamColor +'!important'" style="color: white">
              Previous Round
            </v-card-title>
            <v-card-text>
              <p>Outsourcing company: {{ prevOutsComp }}</p>
              <p>Development cost (EUR): {{ prevDevCost }}</p>
              <p>Application quality (%): {{ prevAppQual }}</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col>
          <!-- Current Round Status -->
          <v-card style="height:100%">
            <v-card-title :style="'background-color:' + teamColor +'!important'" style="color: white">
              Current Round
            </v-card-title>
            <v-card-text>
              <p>Outsourcing company: {{ curOutsComp }}</p>
              <p>Development cost (EUR): {{ curDevCost }}</p>
              <p>Application quality (%): {{ curAppQual }}</p>
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

      <!-- Managing Application development and maintenance process -->
      <v-row style="margin-top: 10px;">
        <h2 style="text-align: left;">
          Manage application development and maintenance process
        </h2>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="selectedCompany"
            :items="outsourcCompany"
            label="Choose assembly line..."
            :color="teamColor"
            item-text="name"
          />
        </v-col>

        <v-col>
          <v-text-field
            label="Application costs (EUR)"
            v-model="selectedCompany[0]"
            filled
            disabled
          />
          <v-text-field
            label="Application quality (%)"
            v-model="selectedCompany[1]"
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
  name: "AppDevAndMaintanance",
  components: { CostAccountingCard, ConfirmationDialog, ErrorChagesDialog },
  data() {
    return {
      showError: false,
      confirmChangesDialog: false,
      selectedCompany: "",
      outsourcCompany: [
        {
          name: "Company 1",
          value: ["450", "80"],
        },
        {
          name: "Company 2",
          value: ["580", "95"],
        },
      ],
      teamColor: this.$store.state.color,
      round: this.$store.state.round,
    };
  },
  methods: {
    toggleShowError() {
      this.showError = !this.showError;
    },
    toggleDialog() {
      if(this.selectedCompany === "") {
        this.toggleShowError();
      } else {
        this.confirmChangesDialog = !this.confirmChangesDialog;
      }
    },
    updateProgress() {
      this.$emit("updateProgress", "appDevAndMaintenance", 100);
      //this.$router.push({ path: "/dashboard" });
      this.toggleDialog();
    },
    toNextStep() {
      this.$router.push({ path: "/qualityAssurance" });
    },
    toPreviousStep() {
       this.$router.push({ path: "/bikeConstruction" });
    }
  },
  props: {
    prevOutsComp: {
      type: String,
      default: "",
    },
    prevDevCost: {
      type: Number,
      default: 0.0,
    },
    prevAppQual: {
      type: Number,
      default: 0.0,
    },
    curOutsComp: {
      type: String,
      default: "",
    },
    curDevCost: {
      type: Number,
      default: 0.0,
    },
    curAppQual: {
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
