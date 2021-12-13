<template>
  <v-container id="purchasing">
    <!-- Statistic about current and previous round -->
    <v-row ref="round-data">
      <v-col>
        <!-- Previous Round Data -->
        <v-card>
          <v-card-title
            :style="'background-color:' + teamColor + '!important'"
            style="color: white"
          >
            Previous Round Data
            <v-spacer />
            <v-text-field
              v-model="searchPrevRound"
              append-icon="mdi-magnify"
              label="Search"
              color="white"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headersRound"
            :items="dataPrevRound"
            :search="searchPrevRound"
          />
        </v-card>
      </v-col>

      <v-col>
        <!-- Current Round Data -->
        <v-card>
          <v-card-title
            :style="'background-color:' + teamColor + '!important'"
            style="color: white"
          >
            Current Round Data
            <v-spacer />
            <v-text-field
              v-model="searchCurRound"
              append-icon="mdi-magnify"
              label="Search"
              color="white"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headersRound"
            :items="dataCurrentRound"
            :search="searchCurRound"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-divider />

    <v-row v-if="this.$store.state.purchasingStep <= 4" class="pa-2" style="margin-top: 20px; margin-bottom: 40px;">
      <v-col align="left" cols="9">
        <div>
          <h2>{{ this.stepText}}</h2>
        </div>
      </v-col>
      <v-col align="right">
        <v-btn @click="nextPurchasingStep" dark rounded link :color="teamColor">
          <b>I understand</b>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Managing purchaising process -->
    <div ref="logic" style="margin: 1px;">
      <v-row style="margin-top: 15px; margin-left: 3px">
        <h2 style="text-align: left;">Manage purchaising process</h2>
      </v-row>

      <v-row>
        <v-col>
          <v-select
            v-model="selectedVendor"
            :items="vendors"
            :color="teamColor"
            label="Choose vendor..."
            item-text="name"
          />
          <v-slider
            v-model="quality.val"
            :label="quality.label"
            :color="teamColor"
            :min="1"
            :max="100"
            :thumb-color="teamColor"
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
                :thumb-size="24"
                :max="100"
                type="number"
                style="width: 60px"
              />
            </template>
          </v-slider>
        </v-col>

        <v-col>
          <v-text-field
            label="Frame: Cost per material (EUR)"
            :value="calculateCostPerMaterial(selectedVendor[0])"
            filled
            disabled
          />
          <v-text-field
            label="Sensors: Cost per material (EUR)"
            :value="calculateCostPerMaterial(selectedVendor[1])"
            filled
            disabled
          />
        </v-col>

        <v-col>
          <v-slider
            v-model="amount.frames"
            label="Frames: Amount (PC)"
            :color="teamColor"
            :min="1"
            :max="100"
            :thumb-color="teamColor"
            :thumb-size="24"
            thumb-label="always"
            :track-color="'teamColor' + 'lighten-3'"
            :track-fill-color="teamColor"
          >
            <template v-slot:append>
              <v-text-field
                v-model.number="amount.frames"
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
            v-model="amount.sensors"
            label="Sensor: Amount (PC)"
            :color="teamColor"
            :min="1"
            :max="100"
            :thumb-color="teamColor"
            thumb-label="always"
            :thumb-size="24"
            :track-color="'teamColor' + 'lighten-3'"
            :track-fill-color="teamColor"
          >
            <template v-slot:append>
              <v-text-field
                v-model="amount.sensors"
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
            label="Frame: Total cost (EUR)"
            :value="calculateTotalCost(selectedVendor[0], amount.frames)"
            filled
            disabled
          />
          <v-text-field
            label="Sensors: Total cost (EUR)"
            :value="calculateTotalCost(selectedVendor[1], amount.sensors)"
            filled
            disabled
          />
        </v-col>
      </v-row>
    </div>

    <v-row ref="navigation">
        <v-col md='4' align="left">
          <v-btn :color="teamColor" rounded disabled>
            <v-icon left>mdi-arrow-left-bold-circle-outline</v-icon>
            Previous step
          </v-btn>
        </v-col>

        <v-col align="center" md="4">
          <v-btn 
            :color="teamColor" 
            rounded dark
            @click="toggleDialog" 
            center
          >
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
import ConfirmationDialog from "../dialogs/ConfirmationDialog.vue";
import ErrorChagesDialog from '../dialogs/ErrorChagesDialog.vue';

export default {
  components: { ConfirmationDialog, ErrorChagesDialog },
  name: "Purchaising",
  data() {
    return {
      isEditing: true,
      teamColor: this.$store.state.color,
      confirmChangesDialog: false,
      showError: false,
      selectedVendor: "",
      stepText: '',
      vendors: [
        {
          name: "Bavaria eBike",
          value: ["242", "22"],
        },
        {
          name: "eBikesDE",
          value: ["180", "14"],
        },
      ],
      quality: { label: "Quality (%)", val: 50 },
      amount: {
        frames: { label: "Frame: Amount (PC)", val: 1 },
        sensors: { label: "Sensor: Amount (PC)", val: 1 },
      },
      searchPrevRound: "",
      searchCurRound: "",
      headersRound: [
        { text: "Material", value: "material" },
        { text: "Vendor", value: "vendor" },
        { text: "Quality (%)", value: "quality" },
        { text: "Amount (PC)", value: "amount" },
        { text: "Total Cost (EUR)", value: "totalCost" },
        { text: "Cumulative Stock", value: "cumulativeStock" },
      ],
      dataPrevRound: [
        {
          material: "Battery",
          vendor: "ElectricRider",
          quality: "12.00",
          amount: "3",
          totalCost: "1192.80",
          cumulativeStock: "53",
        },
        {
          material: "Engine",
          vendor: "ElectricRider",
          quality: "12.00",
          amount: "4",
          totalCost: "470.40",
          cumulativeStock: "44",
        },
      ],
      dataCurrentRound: [
        {
          material: "Frame",
          vendor: "ElectricRider",
          quality: "21.00",
          amount: "3",
          totalCost: "231.90",
          cumulativeStock: "23",
        },
        {
          material: "Engine",
          vendor: "ElectricRider",
          quality: "8.00",
          amount: "10",
          totalCost: "2333.00",
          cumulativeStock: "77",
        },
      ],
    };
  },
  methods: {
    toggleShowError() {
      this.showError = !this.showError;
    },
    toggleDialog() {
      if(this.selectedVendor === "") {
        this.toggleShowError();
      } else if(this.$store.state.purchasingStep >= 5){
        this.confirmChangesDialog = !this.confirmChangesDialog;
      }
    },
    toNextStep() {
      if(this.$store.state.purchasingStep >= 5) {
        this.$router.push({ path: "/logistics" });
      }
    },
    updateProgress() {
      this.$emit("updateProgress", "purchasing", 100);
      //this.$router.push({ path: "/dashboard" });
      this.toggleDialog();
    },
    calculateCostPerMaterial(selectedVendor) {
      // material * quality
      if (typeof selectedVendor === "undefined") {
        return "";
      } else {
        return (selectedVendor * (1 + this.quality.val / 100)).toFixed(2);
      }
    },
    calculateTotalCost(selectedVendor, amount) {
      // costPerMaterial * amount
      if (typeof selectedVendor === "undefined") {
        return "";
      } else {
        return (this.calculateCostPerMaterial(selectedVendor) * amount).toFixed(2);
      }
    },
    nextPurchasingStep() {
       if(this.$store.state.purchasingStep === 1) {
        this.dataStep();
      } else if(this.$store.state.purchasingStep === 2) {
        this.logicStep();
      } else if(this.$store.state.purchasingStep === 3) {
        this.navigationStep();
      } else {
        this.unlockStep();
      }

      this.$store.state.purchasingStep++;
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
      this.stepText = 'Choose here vendor wisely and think about which parts from which vendor you should buy. The price does not affect the quality!'

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
    }
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
      this.$store.state.purchasingStep = 5;
    }

    if(this.$store.state.purchasingStep <= 4) {
      this.nextPurchasingStep();
    }  
  },
  watch: {
    '$store.state.purchasingStep': function() {
      if(this.$store.state.purchasingStep === 0) {
        this.$store.state.purchasingStep++;
        this.nextPurchasingStep();
      }
    }
  },
};
</script>
