<template>
  <v-container id="engine-preparation">
    <!-- Header with icon -->
    <v-container align="left">
      <v-row align="start" justify="start" class="mb-6 ml-6">
        <v-btn :color="teamColor" fab x-large>
          <v-icon color="white" x-large>mdi-pac-man</v-icon>
        </v-btn>
        <v-col align="start" justify="start" class="mb-6 ml-4">
          <h1 class="font-weight-black">Engine Preparation</h1>
        </v-col>
      </v-row>
    </v-container>

    <v-row ref="round-data">
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
              label="Production Line:"
              :value="
                lastAssemblylineid != null ? lastAssemblylineid : 'No Data'
              "
              disabled
            />
            <v-text-field
              label="Productcustomization (True/False):"
              :value="
                lastProductcustomization != null
                  ? lastProductcustomization
                  : 'No Data'
              "
              disabled
            />
            <v-text-field
              label="Total Acquisition Costs (EUR):"
              :value="
                lastTotalacquisitioncost != null
                  ? lastTotalacquisitioncost
                  : 'No Data'
              "
              disabled
            />
            <v-text-field
              label="Number of Proudction Lines:"
              :value="lastAlnumber != null ? lastAlnumber : 'No Data'"
              disabled
            />
            <v-text-field
              label="Production Costs (EUR):"
              :value="lastProdcost != null ? lastProdcost : 'No Data'"
              disabled
            />
            <v-text-field
              label="Quality (%):"
              :value="lastQuality != null ? lastQuality : 'No Data'"
              disabled
            />
            <v-text-field
              label="Workload (%):"
              :value="lastWorkload != null ? lastWorkload : 'No Data'"
              disabled
            />
            <v-text-field
              label="Safety (%):"
              :value="lastSafety != null ? lastSafety : 'No Data'"
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
              label="Production Line:"
              :value="getProductionline"
              disabled
            />
            <v-text-field
              label="Productcustomization (True/False):"
              :value="getProductcustomization"
              disabled
            />
            <v-text-field
              label="Total Acquisition Costs (EUR):"
              :value="getTotalacquisitioncost"
              disabled
            />
            <v-text-field
              label="Number of Proudction Lines:"
              :value="getAlnumber"
              disabled
            />
            <v-text-field
              label="Production Costs (EUR):"
              :value="getProdcost"
              disabled
            />
            <v-text-field label="Quality (%):" :value="getQuality" disabled />
            <v-text-field label="Workload (%):" :value="getWorkload" disabled />
            <v-text-field label="Safety (%):" :value="getSafety" disabled />
            <v-text-field
              label="Production Costs (%):"
              :value="getProductionCosts"
              disabled
            />
            <v-text-field
              label="Production Capacity (%):"
              :value="getProductionCapacity"
              disabled
            />
            <v-text-field
              label="Environmental Factor (%):"
              :value="getEnvironmentalFactor"
              disabled
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="mt-5 mb-5" />

    <!-- Managing Engine Preparation Process -->
    <div ref="logic" style="margin: 1px">
      <v-row style="margin-top: 15px; margin-left: 3px">
        <h2 style="text-align: left">Manage Engine Preparation Process</h2>
      </v-row>

      <v-row>
        <v-col>
          <v-container>
            <v-col align="start">
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
                <span
                  >Assembly Line Cost: Different production lines with
                  additional features are available depending on the
                  round.</span
                ><br />
                <span
                  >Production Cost: Additional production lines could be bought
                  to improve the production capacity.</span
                ><br />
                <span
                  >Environmental Factor: Environmental friendliness of the
                  process.</span
                ><br />
                <span
                  >Quality: The quality at each step influences the total
                  quality of the product. The weights for the quality could be
                  different depending on the step and round.</span
                ><br />
                <span
                  >Workload: Chosen workload will affect production costs and
                  the number of produced bikes.</span
                ><br />
                <span
                  >Safety: Safety will influence the number of defective
                  bikes.</span
                >
              </v-tooltip>
            </v-col>
          </v-container>
        </v-col>

        <v-col>
          <v-container v-if="this.$store.state.round > 1">
            <v-col align="start">
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
                    Digital Twin
                  </v-btn>
                </template>
                <span
                  >Information System Digital Twin for Quality Assurance:.</span
                ><br /><br />
                <span>No Safety needed anymore!</span><br />
                <span>Only Internal Quality Assurance possible.</span
                ><br /><br />
                <span
                  >You will find further Information on the Quality Assurance
                  Page.</span
                >
              </v-tooltip>
            </v-col>
          </v-container>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <!-- Select Assemblyline -->
          <v-col>
            <v-select
              :value="vendor"
              @input="updateVendor"
              :items="vendorsSelect"
              :color="teamColor"
              label="Select Production Line ..."
              item-text="name"
              clearable
            />
          </v-col>

          <v-text-field
            label="Production Line (EUR):"
            :value="assemblyLineCosts"
            filled
            disabled
          />
          <v-text-field
            label="Production Costs (EUR):"
            :value="assemblyProductionCosts"
            filled
            disabled
          />
          <v-text-field
            label="Production capacity (PC):"
            :value="assemblyProductionCapacity"
            filled
            disabled
          />
          <v-text-field
            label="Environmental Factor (%):"
            :value="assemblyEnvironmentalFactor"
            filled
            disabled
          />
          <v-text-field
            class="pl-0 ml-0"
            prefix="Lines  "
            type="number"
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
          <v-container fluid v-if="this.$store.state.round > 2">
            <p>{{ selected }}</p>
            <v-checkbox
              v-model="selectedCustomization"
              label="Enable Product Customization"
            ></v-checkbox>
          </v-container>
          <v-text-field
            v-if="selectedCustomization"
            label="Customization Tool Cost:"
            :value="2454.0"
            type="number"
            filled
            disabled
          />
          <v-container fluid v-if="this.$store.state.round > 2">
            <p>{{ selected }}</p>
            <v-checkbox
              v-model="digitalTwin"
              label="Enable Digital Twin"
            ></v-checkbox>
          </v-container>
          <v-text-field
            v-if="digitalTwin == true"
            label="Digital Twin Cost (EUR):"
            hint="Implementation Costs of Digital Twin only occur once during the simulation game for each material."
            persistent-hint
            value="25000"
            type="number"
            filled
            disabled
          />

          <v-container fluid v-if="this.$store.state.round > 1">
            <p>{{ selected }}</p>
            <v-checkbox
              v-model="smartMonitoring"
              label="Enable Smart Monitoring"
            ></v-checkbox>
          </v-container>
          <v-text-field
            v-if="smartMonitoring == true"
            label="Maintain Cost per Product(EUR):"
            hint="Information System Smart Monitoring reducing the Maintain Cost per Product."
            persistent-hint
            value="0.25"
            type="number"
            filled
            disabled
          />
          <v-text-field
            v-if="smartMonitoring == false"
            label="Maintain Cost per Product(EUR):"
            value="0.50"
            type="number"
            filled
            disabled
          />
          <v-text-field
            v-if="smartMonitoring == true"
            label="Sensor Cost (EUR):"
            :value="returnSensorCost"
            type="number"
            filled
            disabled
          />
        </v-col>
      </v-row>
    </div>
    <v-row>
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
        <v-btn :color="teamColor" rounded dark right @click="toNextStep">
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
  <!-- <v-container>
      <h1>Hey, url-hacker, you have no access to this component yet!!</h1>
      <v-icon size="500">mdi-police-badge</v-icon>
    </v-container> -->
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ConfirmationDialog from "../dialogs/ConfirmationDialog.vue";
import ErrorChagesDialog from "../dialogs/ErrorChagesDialog.vue";

export default {
  components: { ConfirmationDialog, ErrorChagesDialog },
  name: "engine-preparation",
  data() {
    return {
      showError: false,
      teamColor: this.$store.state.color,
      round: this.$store.state.round,
      confirmChangesDialog: false,
      smartMonitoring: false,
      digitalTwin: false,
      selectedLine: "",
      numOfLines: 1,
      selectedCustomization: false,
      amount: {
        assemblyLines: { label: "Number of Assembly Lines", val: 1 },
        quality: { label: "Quality (%)", val: 1, color: "primary" },
        workload: { label: "Workload (%)", val: 1, color: "primary" },
        safety: { label: "Safety (%)", val: 1, color: "primary" },
      },
    };
  },
  computed: {
    ...mapGetters("enginePreparation", ["vendors", "vendor", "lastVendor"]),
    vendorsSelect: function () {
      return this.vendors
        ? this.vendors.map((vendor) => {
            if (vendor.Materialid == "ENG") {
              return {
                name: vendor.Alname,
                value: vendor,
              };
            }
          })
        : [];
    },
    // productCustomization() {
    //   return this.vendor != null ? this.vendor.Productcustomization : '';
    // },
    assemblyLineName() {
      return this.vendor != null ? this.vendor.Alname : "";
    },
    returnSensorCost: function () {
      return this.vendor != null ? this.amount.assemblyLines.val * 0.1 : 0;
    },
    assemblyLineCosts() {
      if (this.selectedCustomization) {
        return this.vendor != null ? this.vendor.Acqusitioncost * 1.2 : "";
      } else {
        return this.vendor != null ? this.vendor.Acqusitioncost : "";
      }
    },
    assemblyProductionCosts() {
      return this.vendor != null ? this.vendor.Baseprodcost : "";
    },
    assemblyProductionCapacity() {
      return this.vendor != null ? this.vendor.Maxcapacity : "";
    },
    assemblyEnvironmentalFactor() {
      return this.vendor != null ? this.vendor.Environmentalfactor : "";
    },
    assemblyQuality() {
      return this.amount.quality != null ? this.amount.quality.val : "No Data";
    },
    assemblyWorkload() {
      return this.amount.workload != null
        ? this.amount.workload.val
        : "No Data";
    },
    assemblySafety() {
      return this.amount.safety != null ? this.amount.safety.val : "No Data";
    },
    assemblyNumberLines() {
      return this.amount.assemblyLines != null
        ? this.amount.assemblyLines.val
        : "No Data";
    },
    lastProductionline: function () {
      return this.lastvendor != null ? this.lastVendor.Alname : "No Data";
    },
    lastProductcustomization: function () {
      return this.lastVendor != null
        ? this.lastVendor.Productcustomization
        : "No Data";
    },
    lastTotalacquisitioncost: function () {
      return this.lastVendor != null
        ? this.lastVendor.Totalacquisitioncost
        : "No Data";
    },
    lastAlnumber: function () {
      return this.lastVendor != null ? this.lastVendor.Alnumber : "No Data";
    },
    lastProdcost: function () {
      return this.lastVendor != null ? this.lastVendor.Prodcost : "No Data";
    },
    lastProdcapacity: function () {
      return this.lastVendor != null ? this.lastVendor.Prodcapacity : "No Data";
    },
    lastQuality: function () {
      return this.lastVendor != null ? this.lastVendor.Quality : "No Data";
    },
    lastWorkload: function () {
      return this.lastVendor != null ? this.lastVendor.Workload : "No Data";
    },
    lastSafety: function () {
      return this.lastVendor != null ? this.lastVendor.Safety : "No Data";
    },
    getProductionline: function () {
      return this.vendor != null ? this.vendor.Alname : "";
    },
    getProductcustomization: function () {
      return this.selectedCustomization != null
        ? this.selectedCustomization
        : "No Data";
    },
    getTotalacquisitioncost: function () {
      if (this.selectedCustomization) {
        return this.vendor != null ? this.vendor.Acqusitioncost * 1.2 : "";
      } else {
        return this.vendor != null ? this.vendor.Acqusitioncost : "";
      }
    },
    lastAssemblylineid() {
      return this.lastVendor != null
        ? this.lastVendor.Assemblylineid
        : "No Data";
    },
    getAlnumber: function () {
      return this.amount.assemblyLines != null
        ? this.amount.assemblyLines.val
        : "No Data";
    },
    getProdcost: function () {
      return this.vendor != null ? this.vendor.Baseprodcost : "No Data";
    },
    getProdcapacity: function () {
      return this.vendor != null ? this.vendor.Maxcapacity : "No Data";
    },
    getQuality: function () {
      return this.amount.quality != null ? this.amount.quality.val : "No Data";
    },
    getWorkload: function () {
      return this.amount.workload != null
        ? this.amount.workload.val
        : "No Data";
    },
    getSafety: function () {
      return this.amount.safety != null ? this.amount.safety.val : "No Data";
    },
    getProductionCosts() {
      return this.vendor != null ? this.vendor.Baseprodcost : "No Data";
    },
    getProductionCapacity() {
      return this.vendor != null ? this.vendor.Maxcapacity : "No Data";
    },
    getEnvironmentalFactor() {
      return this.vendor != null ? this.vendor.Environmentalfactor : "No Data";
    },
  },
  methods: {
    ...mapActions("enginePreparation", ["updateVendors"]),
    ...mapActions("enginePreparation", ["getLastVendor"]),
    ...mapActions("enginePreparation", ["saveVendor"]),
    ...mapMutations("enginePreparation", ["updateVendor"]),
    toggleShowError() {
      this.showError = !this.showError;
    },
    async toggleDialog() {
      if (this.vendors === null) {
        return this.toggleShowError();
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.confirmChangesDialog = !this.confirmChangesDialog;
        await this.saveVendor({
          amount: this.amount,
          selectedCustomization: this.selectedCustomization,
          Digitaltwin: this.digitalTwin,
          Smartmonitoring: this.smartMonitoring,
        });
      }
    },
    updateProgress() {
      this.$emit("updateProgress", "enginePreparation", 100);
      //this.$router.push({ path: "/dashboard" });
      this.toggleDialog();
    },
    toNextStep() {
      if (this.$store.state.round >= 1) {
        this.$router.push({ path: "/batteryPreparation" });
      }
    },
    toPreviousStep() {
      this.$router.push({ path: "/sensorsPreparation" });
    },
  },
  async mounted() {
    await this.updateVendors();
    await this.getLastVendor();
  },
  props: {},
};
</script>
