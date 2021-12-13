<template>
  <v-container id="bike-construction">
    <!-- custom component with statistic about current, previous round and cost accounting -->
    <div ref="round-data">
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
    </div>

    <v-divider />

    <v-row v-if="this.$store.state.bikeStep <= 4" class="pa-2" style="margin-top: 20px; margin-bottom: 40px;">
      <v-col align="left" cols="9">
        <div>
          <h2>{{ this.stepText }}</h2>
        </div>
      </v-col>
      <v-col align="right">
        <v-btn @click="nextPurchasingStep" dark rounded link :color="teamColor">
          <b>I understand</b>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Managing bike construction process -->
    <div ref="logic" style="margin: 1px;">
    <v-row style="margin-top: 15px; margin-left: 3px">
      <h2 style="text-align: left;">
        Manage bike construction preparation process
      </h2>
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
          :thumb-size="24"
          :track-color="'teamColor' + 'lighten-3'"
          :track-fill-color="teamColor"
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
    </div>

    <v-row ref="navigation">
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
</template>

<script>
import prevCurRoundStats from "../components/prevCurRoundStats.vue";
import ConfirmationDialog from "../dialogs/ConfirmationDialog.vue";
import ErrorChagesDialog from '../dialogs/ErrorChagesDialog.vue';

export default {
  components: { prevCurRoundStats, ConfirmationDialog, ErrorChagesDialog },
  name: "bike-construction",
  data() {
    return {
      showError: false,
      stepText: '',
      teamColor: this.$store.state.color,
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
    };
  },
  methods: {
    toggleShowError() {
      this.showError = !this.showError;
    },
    toggleDialog() {
      if(this.selectedLine === "") {
        this.toggleShowError();
      } else if(this.$store.state.bikeStep >= 5){
        this.confirmChangesDialog = !this.confirmChangesDialog;
      }
    },
    updateProgress() {
      this.$emit("updateProgress", "bikeConstruction", 100);
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
      if(this.$store.state.bikeStep >= 5) {
        if(this.$store.state.round === 1) {
          this.$router.push({ path: "/sales" });
        } else if(this.$store.state.round === 2 || this.$store.state.round === 3) {
          this.$router.push({ path: "/qualityAssurance" });
        } else {
          this.$router.push({ path: "/appDevAndMaintenance" });
        }
      }
    },
    toPreviousStep() {
      if(this.$store.state.bikeStep >= 5) {
        if(this.$store.state.round === 1) {
          this.$router.push({ path: "/sensorsPreparation" });
        } else {
          this.$router.push({ path: "/batteryPreparation" });
        }
      }
    },
    nextPurchasingStep() {
       if(this.$store.state.bikeStep === 1) {
        this.dataStep();
      } else if(this.$store.state.bikeStep === 2) {
        this.logicStep();
      } else if(this.$store.state.bikeStep === 3) {
        this.navigationStep();
      } else {
        this.unlockStep();
      }

      this.$store.state.bikeStep++;
    },
    dataStep() {
      this.stepText = 'In these tables, you can find useful information to previous and current round. On the left side is the previous round and on the right side is the current round.';

      this.$emit('toggleMenuVisability');

      this.setOpacity("round-data", 1);
      this.setOpacity("logic", 0.3);
      this.setOpacity("navigation", 0.3);

      this.setBorder("round-data");
    },
    logicStep() {
      this.stepText = 'Choose here how you will construct your bikes!'

      this.setOpacity("logic", 1);
      this.setOpacity("round-data", 0.3);

      this.setBorder("logic");
      this.resetBorder("round-data");
    },
    navigationStep() {
      this.stepText = 'You can also navigate through different steps. Do not forget that the steps may differ depending on the round'

      this.setOpacity("navigation", 1);
      this.setOpacity("logic", 0.3);

      this.setBorder("navigation");
      this.resetBorder("logic");
    },
    unlockStep() {
      this.resetBorder("navigation");
      this.setOpacity("round-data", 1);
      this.setOpacity("logic", 1);

      this.$emit('toggleMenuVisability');
    },
    setBorder(name) {
      this.$refs[name].style.border = '5px solid red';
      this.$refs[name].style.borderRadius = '20px';
    },
    resetBorder(name) {
      this.$refs[name].style.border = '0px';
    },
    setOpacity(name, value) {
      this.$refs[name].style.opacity = value;
    },
  },
  mounted() {
    this.$store.state.innerGuideDone = 
               this.$store.state.purchasingStep >= 5 || 
               this.$store.state.logisticStep >= 5 || 
               this.$store.state.frameStep >= 5 || 
               this.$store.state.sensorStep >= 5 || 
               this.$store.state.bikeStep >= 5 || 
               this.$store.state.salesStep >= 5;

    if(this.$store.state.innerGuideDone) {
      this.$store.state.bikeStep = 5;
    }

    if(this.$store.state.bikeStep <= 4) {
      this.nextPurchasingStep();
    }  
  },
  watch: {
    '$store.state.bikeStep': function() {
      if(this.$store.state.bikeStep === 0) {
        this.$store.state.bikeStep++;
        this.nextPurchasingStep();
      }
    }
  },
};
</script>
