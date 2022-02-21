<template>
  <v-container id="batteryPreparation">

    <!-- Header with icon -->
    <v-container align="left">
      <v-row align="start"
            justify="start"
            class="mb-6 ml-6">
        <v-btn :color="teamColor" fab x-large>
        <v-icon color="white" x-large>mdi-battery</v-icon>
        </v-btn>
        <v-col align="start"
            justify="start"
            class="mb-6 ml-4">
        <h1 class="font-weight-black">Battery Preparation</h1>
        </v-col>
      </v-row>
    </v-container>
    <!-- insert in v-container e.g. "v-if="round >= 2" to filter for rounds -->
          <!-- Statistic about current, previous round and cost accounting -->
      <v-row>
        <v-col>
         <!-- Previous Round Status -->
        <v-card style="height:100%">
          <v-card-title :style="'background-color:' + teamColor +'!important'" style="color: white">
            Previous Round
          </v-card-title>
        </v-card>
        </v-col>

        <v-col>
        <!-- Current Round Status -->
        <v-card style="height:100%">
          <v-card-title :style="'background-color:' + teamColor +'!important'" style="color: white">
            Current Round
          </v-card-title>
          <v-card-text>
             <v-text-field
            label="Assembly Line Name:"
            :value="this.assemblyLineName != null ? this.assemblyLineName : 'No Data'"
            disabled
            />
            <v-text-field
            label="Assembly Line Costs (EUR):"
            :value="this.assemblyLineCosts != null ? this.assemblyLineCosts : 'No Data'"
            disabled
            />
          </v-card-text>
        </v-card>
        </v-col>
        </v-row>

        <!-- <v-row>
        <v-col>
          <cost-accounting-card
            align="center"
            max-height="100%"
            :budget="10.0"
            :runningCosts="222.222"
            :avgProdCostBike="'Incomplete'"
            :estimatedQual="21.29"
            :maxProdCapac="'Incomplete'"
            :overDemand="40000.0"
          />
        </v-col>
      </v-row> -->

      <v-divider class="mt-5 mb-5"/>

      <!-- Managing battery preparation process -->
      <v-row style="margin-top: 10px;">
        <h2 style="text-align: left;">Manage Battery Preparation Process</h2>
      </v-row>

      <v-container>
        <v-col align="start" >
        <v-tooltip bottom color="black">
        <template v-slot:activator="{ on, attrs }">
        <v-btn
          :color="teamColor"
          dark
          v-bind="attrs"
          v-on="on"
          x-large
        >
        <v-icon>mdi-chat-question </v-icon>
         Hover me
        </v-btn>
        </template>
          <span>Assembly Line Cost: Different production lines with additional features are available depending on the round.</span><br>
          <span>Production Cost: Additional production lines could be bought to improve the production capacity.</span><br>
          <span>Environmental Factor: Environmental friendliness of the process.</span><br>
          <span>Quality: The quality at each step influences the total quality of the product. The weights for the quality could be different depending on the step and round.</span><br>
          <span>Workload: Chosen workload will affect production costs and the number of produced bikes.</span><br>
          <span>Safety: Safety will influence the number of defective bikes.</span>
        </v-tooltip>
        </v-col>
      </v-container>

      <v-row>
        <v-col>
          <!-- Choose production line -->
          <v-select
            :value="vendor"
            @input="updateVendor"
            :items="vendorsSelect"
            :color="teamColor"
            label="Select Production Line ..."
            item-text="name"
          />
        <v-text-field
          label="Assembly costs (EUR)"
          :value="assemblyLineCosts"
          filled
          disabled
        />
        <v-text-field
          label="Production Costs (EUR)"
          :value="assemblyProductionCosts"
          filled
          disabled
        />
        <v-text-field
          label="Production capacity (PC)"
          :value="assemblyProductionCapacity"
          filled
          disabled
        />
        <v-text-field
          label="Environmental Factor"
          :value="assemblyEnvironmentalFactor"
          filled
          disabled
        />
        <v-text-field
          class="pl-0 ml-0"
          prefix="Lines  "
          type='number'
          :min="0"
          :max="1000000000"
          v-model="amount.assemblyLines.val"
          label="Number of Assembly Lines"
          outlined
          hint="Only insert a positive integers like '2500'!"
          @input="updateAlnumber"
        ></v-text-field>
        </v-col>

        <v-col class="mt-13 pt-13">
        <v-slider
          @input="updateQuality"
          v-model="amount.quality.val"
          :label="amount.quality.label"
          :color="teamColor"
          :thumb-color="teamColor"
          :min="0"
          :max="100"
          :thumb-size="24"
          thumb-label="always"
          :track-color="'teamColor' + 'lighten-3'"
          :track-fill-color="teamColor"
        >
          <template v-slot:append>
            <v-text-field
              v-model="amount.quality.val"
              class="mt-0 pt-0"
              hide-details
              single-line
              :min="0"
              :max="100"
              type="number"
              style="width: 60px"
            />
          </template>
        </v-slider>

        <v-slider
          @input="updateWorkload"
          v-model="amount.workload.val"
          :label="amount.workload.label"
          :color="teamColor"
          :thumb-color="teamColor"
          :min="0"
          :max="100"
          :thumb-size="24"
          thumb-label="always"
          :track-color="'teamColor' + 'lighten-3'"
          :track-fill-color="teamColor"
        >
          <template v-slot:append>
            <v-text-field
              v-model="amount.workload.val"
              class="mt-0 pt-0"
              hide-details
              single-line
              :min="0"
              :max="100"
              type="number"
              style="width: 60px"
            />
          </template>
        </v-slider>

        <v-slider
          v-model="amount.safety.val"
          :label="amount.safety.label"
          :color="teamColor"
          :thumb-color="teamColor"
          :min="0"
          :max="100"
          :thumb-size="24"
          thumb-label="always"
          :track-color="'teamColor' + 'lighten-3'"
          :track-fill-color="teamColor"
        >
          <template v-slot:append>
            <v-text-field
              @input="updateSafety"
              v-model="amount.safety.val"
              class="mt-0 pt-0"
              hide-details
              single-line
              :min="0"
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
    <!-- <v-container v-else>
      <h1>Hey, url-hacker, you have no access to this component yet!!</h1>
      <v-icon size="500">mdi-police-badge</v-icon>
    </v-container> -->
</template>

<script>
import ConfirmationDialog from "../dialogs/ConfirmationDialog.vue";
import ErrorChagesDialog from '../dialogs/ErrorChagesDialog.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: { ConfirmationDialog, ErrorChagesDialog },
  name: "BatteryPreparation",
    computed: {
    ...mapGetters('batteryPreparation', ['vendors', 'vendor']),
    vendorsSelect: function() {
      return this.vendors ? this.vendors.map(vendor => {
        if (vendor.Materialid == 'BAT') {
        return {
          name: vendor.Alname,
          value: vendor
        }}
      }) : []
    },
    // TODO: Filter Production lines for specific rounds
    // getRoundid: function(){
    //   return this.$store.state.round != null ? this.$store.state.round: "";
    // },
    // getRoundidVendor: function(){
    //   return this.assemblyVendor != null ? this.assemblyVendor.Roundid: "";
    // },
    // filterAssemblyVendor: function(){
    //   return this.getRoundid != null ? this.getRoundidVendor: "";
    // },
    // calculatedCapacityCosts: function() {
    //   return this.assemblyVendor != null ? this.assemblyVendor.Environmentalfactor: "";
    // },
    // calculatedEnvironmentalFactor: function() {
    //   return this.assemblyVendor != null ? this.assemblyVendor.Maxcapacity: "";
    // },
    // calculatedProductionCosts: function() {
    //   return this.assemblyVendor != null ? this.assemblyVendor.Baseprodcost : "";
    // },
    // calculatedProductionlineCosts: function() {
    //   return this.assemblyVendor != null ? (this.calculatedProductionCosts * this.amount.batterylines).toFixed(2) : "";
    // },
    assemblyLineName() {
      return this.vendor != null ? this.vendor.Alname : '';
    },
    assemblyLineCosts() {
      return this.vendor != null ? this.vendor.Acqusitioncost : '';
    },
    assemblyProductionCosts() {
      return this.vendor != null ? this.vendor.Baseprodcost : '';
    },
    assemblyProductionCapacity() {
      return this.vendor != null ? this.vendor.Maxcapacity : '';
    },
    assemblyEnvironmentalFactor() {
      return this.vendor != null ? this.vendor.Environmentalfactor : '';
    },
    assemblyQuality() {
      return this.amount.quality != null ? this.amount.quality.val : 'No Data';
    },
    assemblyWorkload() {
      return this.amount.workload != null ? this.amount.workload.val : 'No Data';
    },
    assemblySafety() {
      return this.amount.safety != null ? this.amount.safety.val : 'No Data';
    },
    assemblyNumberLines() {
      return this.amount.assemblyLines != null ? this.amount.assemblyLines.val : 'No Data' ;
    }
  },
  data() {
    return {
      amount: {
        assemblyLines: { label: "Number of Assembly Lines", val: 0 },
        quality: { label: "Quality (%)", val: 0, color: "primary" },
        workload: { label: "Workload (%)", val: 0, color: "primary" },
        safety: { label: "Safety (%)", val: 0, color: "primary" },
      },
      showError: false,
      confirmChangesDialog: false,
      selectedLine: "",
      numOfLines: 1,
      // assemblyLines: [
      //   {
      //     name: "Assembly Line 1",
      //     value: ["100", "50", "200"],
      //   },
      //   {
      //     name: "Assembly Line 2",
      //     value: ["300", "100", "600"],
      //   },
      //   {
      //     name: "Assembly Line 3",
      //     value: ["500", "250", "2000"],
      //   },
      // ],
      teamColor: this.$store.state.color,
      round: this.$store.state.round
    };
  },
  methods: {
    ...mapActions('batteryPreparation', ['updateVendors']),
    ...mapActions('batteryPreparation', ['getLastVendor']),
    ...mapActions('batteryPreparation', ['saveVendor']),
    ...mapMutations('batteryPreparation', ['updateVendor']),
   toggleShowError() {
      this.showError = !this.showError;
    },
async toggleDialog() {
      if(this.vendors === null) {
        return this.toggleShowError();
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.confirmChangesDialog = !this.confirmChangesDialog;
        await this.saveVendor();
        //return this.$store.modules.logistics ;
      } 
    },
    updateProgress() {
      this.$emit("updateProgress", "batteryPreparation", 100);
      //this.$router.push({ path: "/dashboard" });
      this.toggleDialog();
    },
    // calculateCosts(selectedLine) {
    //   // check for NaN
    //   if (typeof selectedLine === "undefined") {
    //     return "";
    //   } else {
    //     return (
    //       selectedLine *
    //       this.numOfLines *
    //       (1 + this.quality.val / 100) *
    //       (1 + this.workload.val / 100) *
    //       (1 + this.safety.val / 100)
    //     ).toFixed(2);
    //   }
    // },
    toNextStep() {
      this.$router.push({ path: "/bikeConstruction" });
    },
    toPreviousStep() {
      if(this.$store.state.round === 2) {
      //   this.$router.push({ path: "/sensorsPreparation" });      
      // } else {
      this.$router.push({ path: "/enginePreparation" });
      }
    }
  },
  mounted() {
    this.updateVendors();
  },
};
</script>
