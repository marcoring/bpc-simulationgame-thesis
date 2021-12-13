<template>
  <v-container id="logistics">
    <!-- Statistic about current and previous round -->
    <v-row ref="round-data">
      <v-col>
        <!-- Previous Round Status -->
        <v-card style="height:100%">
          <v-card-title :style="'background-color:' + teamColor +'!important'" style="color: white">
            Previous Round
          </v-card-title>
          <v-card-text>
            <p>Transport company: {{ prevTranspComp }}</p>
            <p>Delivery costs (EUR): {{ prevDelCosts }}</p>
            <p>Quality of delivery (%): {{ prevQualDel }}</p>
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
            <p>Transport company: {{ curTranspComp }}</p>
            <p>Delivery costs (EUR): {{ curDelCosts }}</p>
            <p>Quality of delivery (%): {{ curQualDel }}</p>
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
    <v-row v-if="this.$store.state.logisticStep <= 4" class="pa-2" style="margin-top: 20px; margin-bottom: 40px;">
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

    <!-- Managing logistic process -->
    <div ref="logic" style="margin: 1px;">
      <v-row style="margin-top: 15px; margin-left: 3px">
        <h2 style="text-align: left;">Manage logistic process</h2>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="selectedCompany"
            :items="transportCompanies"
            :color="teamColor"
            label="Choose transportation company..."
            item-text="name"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="selectedCompany[0]"
            label="Delivery costs (EUR)"
            filled
            disabled
          />
          <v-text-field
            v-model="selectedCompany[1]"
            label="Quality of delivery (%)"
            filled
            disabled
          />
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
import CostAccountingCard from "../components/CostAccountingCard.vue";
import ConfirmationDialog from "../dialogs/ConfirmationDialog.vue";
import ErrorChagesDialog from '../dialogs/ErrorChagesDialog.vue';

export default {
  name: "logistics",
  components: { CostAccountingCard, ConfirmationDialog, ErrorChagesDialog },
  data() {
    return {
      showError: false,
      stepText: '',
      teamColor: this.$store.state.color,
      confirmChangesDialog: false,
      transportCompanies: [
        {
          name: "Company 1",
          value: ["200", "81"],
        },
        {
          name: "Company 2",
          value: ["400", "97"],
        },
        {
          name: "Company 3",
          value: ["150", "77"],
        },
      ],
      selectedCompany: "",
      prevTranspComp: "Ebike GmBh",
      prevDelCosts: 0.0,
      prevQualDel: 0.0,
      curTranspComp: "Ebike GmBh",
      curDelCosts: 0.0,
      curQualDel: 0.0,
      budget: 150000.0,
      runningCosts: 0.0,
      avgProdCostBike: "Incomplete",
      estimatedQual: 0.0,
      maxProdCapac: "Incomplete",
      overDemand: 40000.0,
    };
  },
  methods: {
    getCosts() {
      if (!this.selectedCompany) {
        return null;
      } else {
        return this.selectedCompany.costs;
      }
    },
    getQuality() {
      return this.selectedCompany.quality;
    },
    toggleShowError() {
      this.showError = !this.showError;
    },
    toggleDialog() {
      if(this.selectedCompany === "") {
        this.toggleShowError();
      } else if(this.$store.state.logisticStep >= 5){
        this.confirmChangesDialog = !this.confirmChangesDialog;
      }
    },
    updateProgress() {
      this.$emit("updateProgress", "logistics", 100);
      this.toggleDialog();
    },
    toNextStep() {
      if(this.$store.state.logisticStep >= 5) {
        this.$router.push({ path: "/framePreparation" });
      }
    },
    toPreviousStep() {
       if(this.$store.state.logisticStep >= 5) {
        this.$router.push({ path: "/purchasing" });
       }
    },
    nextPurchasingStep() {
       if(this.$store.state.logisticStep === 1) {
        this.dataStep();
      } else if(this.$store.state.logisticStep === 2) {
        this.logicStep();
      } else if(this.$store.state.logisticStep === 3) {
        this.navigationStep();
      } else {
        this.unlockStep();
      }

      this.$store.state.logisticStep++;
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
      this.stepText = 'Choose here your logistic partner here. Compare different metrics and decide what partner do you want to have!'

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
      this.$store.state.logisticStep = 5;
    }

    if(this.$store.state.logisticStep <= 4) {
      this.nextPurchasingStep();
    }  
  },
  watch: {
    '$store.state.logisticStep': function() {
      if(this.$store.state.logisticStep === 0) {
        this.$store.state.logisticStep++;
        this.nextPurchasingStep();
      }
    }
  },
};
</script>
