<template>
  <v-container id="bike-construction">

    <!-- Header with icon -->
    <v-container align="left">
      <v-row align="start"
            justify="start"
            class="mb-6 ml-6">
        <v-btn :color="teamColor" fab x-large>
        <v-icon color="white" x-large>mdi-tools</v-icon>
        </v-btn>
        <v-col align="start"
            justify="start"
            class="mb-6 ml-4">
        <h1 class="font-weight-black">Bike Construction</h1>
        </v-col>
      </v-row>
    </v-container>

      <!-- Statistic about current, previous round and cost accounting -->
      <v-row ref="round-data">
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
            <v-text-field
            label="Number of Assembly Lines:"
            :value="this.assemblyNumberLines != null ? this.assemblyNumberLines : 'No Data'"
            disabled
            />
            <v-text-field
            label="Base Production Costs (EUR):"
            :value="this.assemblyProductionCosts != null ? this.assemblyProductionCosts : 'No Data'"
            disabled
            />
            <v-text-field
            label="Production Capacity (%):"
            :value="this.assemblyProductionCapacity != null ? this.assemblyProductionCapacity : 'No Data'"
            disabled
            />
            <v-text-field
            label="Environmental Factor (%):"
            :value="this.assemblyEnvironmentalFactor != null ? this.assemblyEnvironmentalFactor : 'No Data'"
            disabled
            />
            <v-text-field
            label="Quality (%):"
            :value=" this.assemblyQuality != null ? this.assemblyQuality : 'No Data'"
            disabled
            />
            <v-text-field
            label="Workload (%):"
            :value="this.assemblyWorkload != null ? this.assemblyWorkload : 'No Data'"
            disabled
            />
            <v-text-field
            label="Safety (%):"
            :value=" this.assemblySafety != null ? this.assemblySafety : 'No Data'"
            disabled
            />
          </v-card-text>
        </v-card>
        </v-col>
        </v-row>

        <v-row>
        <v-col>
          <!-- Cost Accounting -->
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
      </v-row>

      <v-divider class="mt-5 mb-5"/>

    <v-row v-if="this.$store.state.bikeStep <= 4" class="pa-2" style="margin-top: 20px; margin-bottom: 40px;">
      <v-col align="left" cols="9">
        <div>
          <h2>{{ this.stepText }}</h2>
        </div>
      </v-col>
      <v-col align="right">
        <v-btn @click="nextPurchasingStep" dark rounded link color="red">
          <b>I understand</b>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Managing bike construction process -->
    <div ref="logic" style="margin: 1px;">
    <v-row style="margin-top: 15px; margin-left: 3px">
      <h2 style="text-align: left;">
        Manage Bike Construction Preparation Process
      </h2>
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
      <!-- Select Assemblyline -->
        <v-col>
          <v-select
            :value="vendor"
            @input="updateVendor"
            :items="vendorsSelect"
            :color="teamColor"
            label="Select Assembly Line ..."
            item-text="name"
          />
        </v-col>

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
        ></v-text-field>
      </v-col>

      <v-col class="mt-13 pt-13">
        <v-slider
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
import CostAccountingCard from '../components/CostAccountingCard.vue';
import ConfirmationDialog from '../dialogs/ConfirmationDialog.vue';
import ErrorChagesDialog from '../dialogs/ErrorChagesDialog.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';


export default {
  components: { CostAccountingCard, ConfirmationDialog, ErrorChagesDialog },
  name: "bike-construction",
  data() {
    return {
      showError: false,
      stepText: '',
      teamColor: this.$store.state.color,
      confirmChangesDialog: false,
      selectedLine: "",
      numOfLines: 1,
      amount: {
        assemblyLines: { label: "Number of Assembly Lines", val: 0 },
        quality: { label: "Quality (%)", val: 0, color: "primary" },
        workload: { label: "Workload (%)", val: 0, color: "primary" },
        safety: { label: "Safety (%)", val: 0, color: "primary" },
      },
    };
  },
  computed: {
    ...mapGetters('bikeConstruction', ['vendors', 'vendor']),
      vendorsSelect: function() {
      return this.vendors ? this.vendors.map(vendor => {
        if (vendor.Materialid == 'CON') {
        return {
          name: vendor.Alname,
          value: vendor
        }}
      }) : []
    },
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
  methods: {
    ...mapActions('bikeConstruction', ['updateVendors']),
    ...mapActions('bikeConstruction', ['getLastVendor']),
    ...mapActions('bikeConstruction', ['saveVendor']),
    ...mapMutations('bikeConstruction', ['updateVendor']),
    toggleShowError() {
      this.showError = !this.showError;
    },
    async toggleDialog() {
      if(this.vendors === null) {
        return this.toggleShowError();
      } else if (this.$store.state.bikeStep >= 5) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.confirmChangesDialog = !this.confirmChangesDialog;
        await this.saveVendor();
        //return this.$store.modules.logistics ;
      } else {
        return null;
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
          (1 + this.amount.quality.val / 100) *
          (1 + this.amount.workload.val / 100) *
          (1 + this.amount.safety.val / 100)
        ).toFixed(2);
      }
    },
    toNextStep() {
      if(this.$store.state.bikeStep >= 5) {
        // if(this.$store.state.round === 1) {
        //   this.$router.push({ path: "/sales" });
        // } else if(this.$store.state.round === 2 || this.$store.state.round === 3) {
        //   this.$router.push({ path: "/qualityAssurance" });
        // } else {
          this.$router.push({ path: "/appDevAndMaintenance" });
        }
    },
    toPreviousStep() {
      if(this.$store.state.bikeStep >= 5) {
        // if(this.$store.state.round === 1) {
        //   this.$router.push({ path: "/sensorsPreparation" });
        // } else {
          this.$router.push({ path: "/batteryPreparation" });
        // }
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
    this.updateVendors();
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
