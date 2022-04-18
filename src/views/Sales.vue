<template>
  <v-container id="sales">
    <!-- Header with icon -->
    <v-container align="left">
      <v-row align="start" justify="start" class="mb-6 ml-6">
        <v-btn :color="teamColor" fab x-large>
          <v-icon color="white" x-large>mdi-currency-eur</v-icon>
        </v-btn>
        <v-col align="start" justify="start" class="mb-6 ml-4">
          <h1 class="font-weight-black">Sales</h1>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-model="salesTabs">
      <!-- Statistic about current, previous round and cost accounting -->
      <v-row style="height: 100%" ref="round-data">
        <v-col>
          <!-- Previous Round Status -->
          <v-card style="height: 100%">
            <v-card-title
              :style="'background-color:' + teamColor + '!important'"
              style="color: white"
            >
              Previous Round
            </v-card-title>
            <v-card-text>
              <v-text-field
                label="Sales Price Per Bike (PC):"
                :value="lastAmountPricePerBike"
                disabled
              />
              <v-text-field
                label="Sales Cost (EUR):"
                :value="lastCalculateSalesCost"
                disabled
              />
              <v-text-field
                label="Number of Sales Persons:"
                :value="lastNumOfSalesPersons"
                disabled
              />
              <v-text-field
                label="Sales Capacity (PC):"
                :value="lastCalculateSalesCapacity"
                disabled
              />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col>
          <!-- Current Round Status -->
          <v-card style="height: 100%">
            <v-card-title
              :style="'background-color:' + teamColor + '!important'"
              style="color: white"
            >
              Current Round
            </v-card-title>
            <v-card-text>
              <v-text-field
                label="Sales Price Per Bike (PC):"
                :value="getAmountPricePerBike"
                disabled
              />
              <v-text-field
                label="Sales Cost (EUR):"
                :value="calculateSalesCost"
                disabled
              />
              <v-text-field
                label="Number of Sales Persons:"
                :value="getNumOfSalesPersons"
                disabled
              />
              <v-text-field
                label="Sales Capacity (PC):"
                :value="calculateSalesCapacity"
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
            style="height: 100%"
            :budget="10.0"
            :runningCosts="222.222"
            :avgProdCostBike="'Incomplete'"
            :estimatedQual="21.29"
            :maxProdCapac="'Incomplete'"
            :overDemand="40000.0"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-divider class="mt-5 mb-5" />

    <v-row
      v-if="this.$store.state.salesStep <= 4"
      class="pa-2"
      style="margin-top: 20px; margin-bottom: 40px"
    >
      <v-col align="left" cols="9">
        <div>
          <h2>{{ this.stepText }}</h2>
        </div>
      </v-col>
      <v-col align="right">
        <v-btn @click="nextSalesStep" dark rounded link color="red">
          <b>I understand</b>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Managing sales process -->
    <div class="mt-6 mb-3" ref="logic" style="margin: 1px">
      <v-tabs v-model="salesTabs" :color="teamColor" centered>
        <v-tab> Manage Sales Activities </v-tab>
        <v-tab> Manage Sales Prices </v-tab>
      </v-tabs>

      <!-- Hover Me -->
      <v-container>
        <v-col align="start">
          <v-tooltip bottom color="black">
            <template v-slot:activator="{ on, attrs }">
              <v-btn :color="teamColor" dark v-bind="attrs" v-on="on" x-large>
                <v-icon>mdi-chat-question </v-icon>
                Hover me
              </v-btn>
            </template>
            <span
              >Additional sales tools that can boost the sales numbers by
              different coefficients. It is possible to choose more than
              one.</span
            ><br />
          </v-tooltip>
        </v-col>
      </v-container>

      <!-- Manage Sales Activities -->
      <v-tabs-items v-model="salesTabs">
        <v-tab-item>
          <v-row>
            <v-col>
              <v-row>
                <v-text-field
                  class="pl-2 ml-2 mt-4"
                  prefix="Persons "
                  type="number"
                  v-model="amount.numOfSalesPersons"
                  label="Number of Sales Persons"
                  :value="numOfSalesPers"
                  :min="0"
                  :max="1000000000"
                  outlined
                  hint="Only insert positiv integers here!"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  class="pl-2 ml-2"
                  prefix="EUR  "
                  type="number"
                  :min="0"
                  :max="1000000000"
                  v-model="amount.pricePerBike"
                  label="Price per Bike"
                  outlined
                  hint="Only insert a positive integers like '2500.72'!"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-checkbox
                  class="pl-6 ml-6 mt-8"
                  v-if="this.$store.state.round >= 1"
                  v-model="Onlineshop"
                  :color="teamColor"
                  label="Online Shop: 100.000€"
                ></v-checkbox>
              </v-row>
              <v-row>
                <v-checkbox
                  class="pl-6 ml-6 mt-2"
                  v-if="this.$store.state.round >= 2"
                  v-model="Onlinemarketing"
                  :color="teamColor"
                  label="Online Marketing: 200.000€"
                ></v-checkbox>
              </v-row>
              <v-row>
                <v-checkbox
                  class="pl-6 ml-6 mt-2"
                  v-if="this.$store.state.round >= 3"
                  v-model="Marketanalyzer"
                  :color="teamColor"
                  label="Market Analyzer based on Deep Learning: 800.000€"
                ></v-checkbox>
              </v-row>
              <v-row>
                <v-checkbox
                  class="pl-6 ml-6 mt-2"
                  v-if="this.$store.state.round >= 4"
                  v-model="Dronedelivery"
                  :color="teamColor"
                  label="Online Marketing: 3.000.000€"
                ></v-checkbox>
              </v-row>
            </v-col>

            <v-col>
              <v-text-field
                class="mt-1"
                label="Base Salary (EUR)"
                :value="getBaseSalary"
                filled
                disabled
              />
              <v-text-field
                label="Sales Cost (EUR)"
                :value="calculateSalesCost"
                filled
                disabled
              />
              <v-text-field
                label="Sales Capacity (PC)"
                v-model="calculateSalesCapacity"
                :value="calculateSalesCapacity"
                filled
                disabled
              />
              <v-text-field
                v-model="getCalculateSalesActivitiesCost"
                :value="getCalculateSalesActivitiesCost"
                label="Development Costs for Additional Sales Activities (EUR)"
                type="number"
                filled
                disabled
                :color="teamColor"
              />
              <v-col>
                <v-text-field
                  label="New Sales Capacity = Sales Capacity + Development Costs"
                  :value="getNewCapacity"
                  filled
                  disabled
                  :color="teamColor"
                />
              </v-col>
            </v-col>
          </v-row>
        </v-tab-item>

        <!-- Manage Sales Prices -->
        <v-tab-item>
          <v-row>
            <v-col>
              <!-- Hover Me -->
              <v-container>
                <v-col align="center">
                  <v-tooltip bottom color="black">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        :color="teamColor"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        x-large
                      >
                        <v-icon>mdi-egg-easter </v-icon>
                      </v-btn>
                    </template>
                    <span>CONGRATULATIONS</span><br /><br />
                    <span
                      >You have successfully found the easter egg of the bike
                      simulation game!</span
                    ><br />
                  </v-tooltip>
                </v-col>
              </v-container>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </div>

    <v-row ref="navigation">
      <v-col md="4" align="left">
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
        <v-btn :color="teamColor" rounded right disabled>
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
import ErrorChagesDialog from "../dialogs/ErrorChagesDialog.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "sales",
  components: { ConfirmationDialog, ErrorChagesDialog },
  computed: {
    ...mapGetters("sales", ["lastVendor"]),
    getCalculateSalesActivitiesCost() {
      var devCostTemp = 0;
      if (this.$store.state.round >= 1 && this.Onlineshop == true) {
        devCostTemp += 100000;
      }
      if (this.$store.state.round >= 2 && this.Onlinemarketing == true) {
        devCostTemp += 200000;
      }
      if (this.$store.state.round >= 3 && this.Marketanalyzer == true) {
        devCostTemp += 800000;
      }
      if (this.$store.state.round >= 4 && this.Dronedelivery == true) {
        devCostTemp += 3000000;
      }
      return devCostTemp;
    },
    calculateCapacityWithMultiplier: function () {
      var capacity = 1;
      if (this.Onlineshop == true) {
        capacity *= 1.2;
      }
      if (this.Onlinemarketing == true) {
        capacity *= 1.2;
      }
      if (this.Marketanalyzer == true) {
        capacity *= 1.5;
      }
      if (this.Dronedelivery == true) {
        capacity *= 1.3;
      }
      return capacity;
    },
    getAmountPricePerBike: function () {
      return this.amount.pricePerBike >= 0 ? this.amount.pricePerBike : "";
    },
    getNumOfSalesPersons: function () {
      return this.amount.numOfSalesPersons >= 0
        ? this.amount.numOfSalesPersons
        : "";
    },
    changeValue: function () {
      return this.numOfSalesPers != 0 ? this.numOfSalesPers * 0 : "";
    },
    getNewCapacity: function () {
      return this.amount.numOfSalesPersons >= 0
        ? (
            this.amount.numOfSalesPersons *
            (7000 * this.calculateCapacityWithMultiplier)
          ).toFixed(2)
        : "";
    },
    calculateSalesCost: function () {
      return this.amount.numOfSalesPersons >= 0
        ? this.amount.numOfSalesPersons * 42366.0
        : "";
    },
    getBaseSalary: function () {
      return (42366.0).toFixed(2);
    },
    calculateSalesCapacity: function () {
      return this.amount.numOfSalesPersons >= 0
        ? this.amount.numOfSalesPersons * 7000
        : "";
    },
    lastCalculateSalesCost: function () {
      return this.lastVendor != null ? this.lastVendor.Salescost : "";
    },
    lastCalculateSalesCapacity: function () {
      return this.lastVendor != null ? this.lastVendor.Salescapacity : "";
    },
    lastAmountPricePerBike: function () {
      return this.lastVendor != null ? this.lastVendor.Priceperbike : "";
    },
    lastNumOfSalesPersons: function () {
      return this.lastVendor != null ? this.lastVendor.Salespersons : "";
    },
  },
  data() {
    return {
      showError: false,
      temp: false,
      Onlineshop: false,
      Onlinemarketing: false,
      Marketanalyzer: false,
      Dronedelivery: false,
      devCost: this.getDevCost,
      stepText: "",
      teamColor: this.$store.state.color,
      confirmChangesDialog: false,
      salesTabs: null,
      amount: {
        numOfSalesPersons: { label: "Number of Sales Persons", val: 0 },
        pricePerBike: { label: "Price per Bike", val: 0 },
        getSelectedActivity: { label: "Development Cost (EUR)", val: 0 },
      },
    };
  },
  methods: {
    ...mapActions("sales", ["getLastVendor"]),
    ...mapActions("sales", ["saveVendor"]),
    toggleShowError() {
      this.showError = !this.showError;
    },
    getDevCost() {
      return this.getCalculateSalesActivitiesCost;
    },
    async toggleDialog() {
      if (this.selectedSalesActivities === "") {
        this.toggleShowError();
      } else if (this.$store.state.salesStep >= 5) {
        this.confirmChangesDialog = !this.confirmChangesDialog;
        // Parameter kann in Methode hier mitgegeben werden
        await this.saveVendor({
          amount: this.amount,
          Onlineshop: this.Onlineshop,
          Onlinemarketing: this.Onlinemarketing,
          Marketanalyzer: this.Onlinemarketing,
          Dronedelivery: this.Dronedelivery,
          Salespersons: this.getNumOfSalesPersons,
          Salescost: this.calculateSalesCost,
          Salescapacity: this.calculateSalesCapacity,
        });
      }
    },
    updateProgress() {
      // Todo: send data (as oData) to Backend
      this.$emit("updateProgress", "sales", 100);
      //this.$router.push({ path: "/dashboard" });
      this.toggleDialog();
    },
    calculateCosts(selectedSalesActivities) {
      // check for NaN
      if (typeof selectedSalesActivities === "undefined") {
        return "";
      } else {
        return (this.getSelectedActivity * this.numOfSalesPers).toFixed(2);
      }
    },
    toPreviousStep() {
      if (this.$store.state.salesStep >= 5) {
        if (this.$store.state.round === 1) {
          this.$router.push({ path: "/bikeConstruction" });
        } else {
          this.$router.push({ path: "/qualityAssurance" });
        }
      }
    },
    nextSalesStep() {
      if (this.$store.state.salesStep === 1) {
        this.dataStep();
      } else if (this.$store.state.salesStep === 2) {
        this.logicStep();
      } else if (this.$store.state.salesStep === 3) {
        this.navigationStep();
      } else {
        this.unlockStep();
      }

      this.$store.state.salesStep++;
    },
    dataStep() {
      this.stepText =
        "In these tables you can find useful information to previous and current round. Left is previous round and right is current";

      this.$emit("toggleMenuVisability");

      this.setOpacity("round-data", 1);
      this.setOpacity("logic", 0.3);
      this.setOpacity("navigation", 0.3);

      this.setBorder("round-data");
    },
    logicStep() {
      this.stepText = "Here you can configure your sales processes!";

      this.setOpacity("logic", 1);
      this.setOpacity("round-data", 0.3);

      this.setBorder("logic");
      this.resetBorder("round-data");
    },
    navigationStep() {
      this.stepText =
        "You can also navigate through different steps. Do not forget that the steps may differ depending on the round";

      this.setOpacity("navigation", 1);
      this.setOpacity("logic", 0.3);

      this.setBorder("navigation");
      this.resetBorder("logic");
    },
    unlockStep() {
      this.resetBorder("navigation");
      this.setOpacity("round-data", 1);
      this.setOpacity("logic", 1);

      this.$emit("toggleMenuVisability");
    },
    setBorder(name) {
      this.$refs[name].style.border = "5px solid red";
      this.$refs[name].style.borderRadius = "20px";
    },
    resetBorder(name) {
      this.$refs[name].style.border = "0px";
    },
    setOpacity(name, value) {
      this.$refs[name].style.opacity = value;
    },
    createComboBoxItem: function (key, text) {
      var salesTypeComboBox = this.getView().byId("salesType");
      var item = new item();
      item.setKey(key);
      item.setText(text);
      salesTypeComboBox.insertItem(item, 10);
      return item;
    },
  },
  async mounted() {
    this.$store.state.innerGuideDone =
      this.$store.state.purchasingStep >= 5 ||
      this.$store.state.logisticStep >= 5 ||
      this.$store.state.frameStep >= 5 ||
      this.$store.state.sensorStep >= 5 ||
      this.$store.state.bikeStep >= 5 ||
      this.$store.state.salesStep >= 5;

    if (this.$store.state.innerGuideDone) {
      this.$store.state.salesStep = 5;
    }

    if (this.$store.state.salesStep <= 4) {
      this.nextSalesStep();
    }

    await this.getLastVendor();
  },
  watch: {
    "$store.state.salesStep": function () {
      if (this.$store.state.salesStep === 0) {
        this.$store.state.salesStep++;
        this.nextSalesStep();
      }
    },
  },
};
</script>
