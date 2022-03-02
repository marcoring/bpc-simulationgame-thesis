<template>
  <v-container id="app-dev-and-maintenance">
    <!-- Header with icon -->
    <v-container align="left">
      <v-row align="start"
            justify="start"
            class="mb-6 ml-6">
        <v-btn :color="teamColor" fab x-large>
        <v-icon color="white" x-large>mdi-cellphone</v-icon>
        </v-btn>
        <v-col align="start"
            justify="start"
            class="mb-6 ml-4">
        <h1 class="font-weight-black">Application Development and Maintenance</h1>  
        </v-col>   
      </v-row>
    </v-container>
    
    <v-container>
      <!-- Statistic about current, previous round and cost accounting -->
      <v-row>
        <v-col>
         <!-- Previous Round Status -->
        <v-card style="height:100%">
          <v-card-title :style="'background-color:' + teamColor +'!important'" style="color: white">
            Previous Round
          </v-card-title>
          <v-card-text>
             <v-text-field
            label="Outsourcing Company:"
            :value="lastOutsourcingCompany"
            disabled
            />
          <v-text-field
            label="Sustainability factor(%):"
            :value="lastSustainabilityfactor"
            disabled
          />
          <v-text-field
            label="Regionality Factor (%):"
            :value="lastRegionalityfactor"
            disabled
          />
          <v-text-field
            label="Application Quality (%):"
            :value="lastDevelopmentQuality"
            disabled
          />
          <v-text-field
            label="Development Cost (EUR):"
            :value="lastDevelopmentcost"
            disabled
          />
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
          <v-text-field
            label="Outsourcing Company:"
            :value="getOutsourcingCompany"
            disabled
          />
          <v-text-field
            label="Sustainability factor(%):"
            :value="getSustainabilityfactor"
            disabled
          />
          <v-text-field
            label="Regionality Factor (%):"
            :value="getRegionalityfactor"
            disabled
          />
          <v-text-field
            label="Application Quality (%):"
            :value="getDevelopmentQuality"
            disabled
          />
          <v-text-field
            label="Development Cost (EUR):"
            :value="getDevelopmentcost"
            disabled
          />
          </v-card-text>
        </v-card>
        </v-col>
        </v-row>

      <v-divider class="mt-5 mb-5"/>

      <!-- Managing Application development and maintenance process -->
      <v-row style="margin-top: 10px;">
        <h2 style="text-align: left;">
          Manage Application Development Process
        </h2>
      
      <!-- Hover me -->
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
        <span>Outsorcing Companies: They differ in price and quality.</span><br>
        <span>Sustainability factor: Level of sustainability of the company.</span><br>
        <span>Regionality factor: Level of regionality of the company.</span><br>
        <span>Quality: Quality of the developed application.</span><br>
        </v-tooltip>
        </v-col>
      </v-container>


      </v-row>
      <v-row>
        <v-col>
          <v-select
            :value="vendor"
            @input="updateVendor"
            :items="vendorsSelect"
            :color="teamColor"
            label="Choose Outsourcing Company..."
            item-text="name"
          />
        </v-col>

        <v-col>
          <v-text-field
            label="Outsourcing Company"
            :value="getOutsourcingCompany"
            filled
            disabled
          />
          <v-text-field
            label="Sustainability factor"
            :value="getSustainabilityfactor"
            filled
            disabled
          />
          <v-text-field
            label="Regionality factor"
            :value="getRegionalityfactor"
            filled
            disabled
          />
          <v-text-field
            label="Application Quality (%)"
            :value="getDevelopmentQuality"
            filled
            disabled
          />
          <v-text-field
            label="Development Cost"
            :value="getDevelopmentcost"
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
    <!-- <v-container >
      <h1>Hey, url-hacker, you have no access to this component yet!!</h1>
      <v-icon size="500">mdi-police-badge</v-icon>
    </v-container> -->
  </v-container>
</template>

<script>
import ConfirmationDialog from "../dialogs/ConfirmationDialog.vue";
import ErrorChagesDialog from '../dialogs/ErrorChagesDialog.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: "AppDevAndMaintanance",
  components: { ConfirmationDialog, ErrorChagesDialog },
    computed: {
    ...mapGetters('appDevAndMaintenance', ['vendors', 'vendor', 'lastVendor']),
    vendorsSelect: function() {
      return this.vendors ? this.vendors.map(vendor => {
        return {
          name: vendor.Vendorname,
          value: vendor
        }
      }) : []
    },
    lastOutsourcingCompany: function() {
      return this.lastVendor != null ? this.lastVendor.Vendorname : "No Data";
    },
    lastDevelopmentQuality: function(){
      return this.lastVendor != null ? this.lastVendor.Developmentquality : "No Data"
    },
    lastSustainabilityfactor: function() {
      return this.lastVendor != null ? this.lastVendor.Sustainabilityfactor : "No Data";
    },
    lastRegionalityfactor: function() {
      return this.lastVendor != null ? this.lastVendor.Regionalityfactor : "No Data";
    },
    lastDevelopmentcost() {
      return this.lastVendor != null ? this.lastVendor.Developmentcost : "No Data";
    },
    getOutsourcingCompany: function() {
      console.log('Vendor', this.vendor);
      console.log('lastVendor', this.lastVendor)
      return this.vendor != null ? this.vendor.Vendorname : "";
    },
    getDevelopmentQuality: function(){
      return this.vendor != null ? this.vendor.Developmentquality : ""
    },
    getSustainabilityfactor: function() {
      return this.vendor != null ? this.vendor.Sustainabilityfactor : "";
    },
    getRegionalityfactor: function() {
      return this.vendor != null ? this.vendor.Regionalityfactor : "";
    },
    getDevelopmentcost() {
      return this.vendor != null ? this.vendor.Developmentcost : "";
    },
  },
  data() {
    return {
      showError: false,
      confirmChangesDialog: false,
      selectedCompany: "",
      teamColor: this.$store.state.color,
      round: this.$store.state.round,
    };
  },
  methods: {
    ...mapActions('appDevAndMaintenance', ['updateVendors']),
    ...mapActions('appDevAndMaintenance', ['getLastVendor']),
    ...mapActions('appDevAndMaintenance', ['saveVendor']),
    ...mapMutations('appDevAndMaintenance', ['updateVendor']),
    async toggleDialog() {
      if(this.vendor === null) {
        return this.toggleShowError();
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.confirmChangesDialog = !this.confirmChangesDialog;
        await this.saveVendor();
      } 
    },
    toggleShowError() {
      this.showError = !this.showError;
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
  async mounted() {
    await this.updateVendors();
    await this.getLastVendor();
  },
};
</script>
