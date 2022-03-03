<template>
  <v-container id="quality-assurance">
    
    <!-- Header with icon -->
    <v-container align="left">
      <v-row align="start"
            justify="start"
            class="mb-6 ml-6">
        <v-btn :color="teamColor" fab x-large>
        <v-icon color="white" x-large>mdi-quality-high</v-icon>
        </v-btn>
        <v-col align="start"
            justify="start"
            class="mb-6 ml-4">
        <h1 class="font-weight-black">Quality Assurance</h1>  
        </v-col>   
      </v-row>
    </v-container>

    <v-container>
      <!-- Statistic about current, previous round and cost accounting -->
      <v-row ref="round-data">
        <v-col>
         <!-- Previous Round Status -->
        <v-card style="height:100%">
          <v-card-title :style="'background-color:' + teamColor +'!important'" style="color: white">
            Previous Round
          </v-card-title>
          <v-card-text>
             <v-text-field
            label="Internal/External: Yearly Costs (EUR):"
            :value="lastVendor != null ? lastVendor.Vendorname : 'No Data'"
            disabled
            />
            <v-text-field
            label="Regionality Factor (%):"
            :value="lastCalculatedRegionalityfactor != null ? lastCalculatedRegionalityfactor : 'No Data'"
            disabled
            />
            <v-text-field
            label="Sustainability Factor (%):"
            :value="lastCalculatedRegionalityfactor != null ? lastCalculatedRegionalityfactor : 'No Data'"
            disabled
            />
            <v-text-field
            label="Quality (%):"
            :value="lastCalculatedRegionalityfactor != null ? lastCalculatedRegionalityfactor : 'No Data'"
            disabled
            />
            <v-text-field
            label="Number of Employees:"
            :value="lastCalculatedSustainabilityfactor != null ? lastCalculatedSustainabilityfactor : 'No Data'"
            disabled
            />
             <v-text-field
            label="QA Capacity (PC):"
            :value="lastCalculatedSustainabilityfactor != null ? lastCalculatedSustainabilityfactor : 'No Data'"
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
            label="Internal/External: Yearly Costs (EUR):"
            :value="lastVendor != null ? lastVendor.Vendorname : 'No Data'"
            disabled
            />
            <v-text-field
            label="Regionality Factor (%):"
            :value="lastCalculatedRegionalityfactor != null ? lastCalculatedRegionalityfactor : 'No Data'"
            disabled
            />
                        <v-text-field
            label="Sustainability Factor (%):"
            :value="lastCalculatedRegionalityfactor != null ? lastCalculatedRegionalityfactor : 'No Data'"
            disabled
            />
            <v-text-field
            label="Quality (%):"
            :value="lastCalculatedRegionalityfactor != null ? lastCalculatedRegionalityfactor : 'No Data'"
            disabled
            />
            <v-text-field
            label="Number of Employees:"
            :value="lastCalculatedSustainabilityfactor != null ? lastCalculatedSustainabilityfactor : 'No Data'"
            disabled
            />
             <v-text-field
            label="QA Capacity (PC):"
            :value="lastCalculatedSustainabilityfactor != null ? lastCalculatedSustainabilityfactor : 'No Data'"
            disabled
            />
            </v-card-text>
          </v-card>
        </v-col>
        </v-row>

      <v-divider class="mt-5 mb-5"/>

      <!-- Managing Quality Assurance process -->
      <v-row style="margin-top: 10px;">
        <h2 style="text-align: left;">
          Manage Quality Assurance Process
        </h2>
      </v-row>

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
        <span>QA Companys: External and internal quality assurance are possible.</span><br>
        <span>Sustainability factor: Level of sustainability of the company.</span><br>
        <span>Regionality factor: Level of regionality of the company.</span><br>
        <span>External Quality: The quality of QA work of the external QA department.</span><br>
        <span>Internal Quality: The quality of work of the QA department employees.</span>
        <span>QA Capacity: Number of bikes that can undergo the QA process. It is not possible to sell a bike without quality assurance.</span><br>
        <span>Cost Per Year: Total cost of all of employees from the QA department/the cost of outsourcing.</span>
        </v-tooltip>
        </v-col>
      </v-container>

      <!-- Checkbox Components -->
      <div class="additions">
      <p><b>Choose your required Quality Assurance Process:</b></p>
      <!-- <input type="checkbox" id="Internal QA" name="Internal QA" value="10" v-model="additional" v-on:click= "check_one()">
      <label for="Internal QA">Internal QA&nbsp;&nbsp;&nbsp;</label>
      <input type="checkbox" id="External QA" name="External QA" value="30" checked v-model="additional" v-on:click= "check_one()">
      <label for="External QA">External QA</label><br><br> -->
      <v-container fluid>
      <v-row align="center" justify="center">
      <v-radio-group row>
        <v-radio id="externalQA" label="Internal QA" value="radio-1" v-on:click="toggle"></v-radio>
        <v-radio id="internalQA" label="External QA" value="radio-2" v-on:click="toggle"></v-radio>
      </v-radio-group>
      </v-row>
      </v-container>
      </div>
      <!-- Select Vendor -->
      <!-- Container External QA -->
      <v-row v-if="externalQA == true" align="start" justify="start">
      <p><b>External QA</b></p>
      </v-row>
      <v-container>
      <v-row v-if="externalQA == true">
        <v-col>
          <v-select
            :value="vendor"
            @input="updateVendor"
            :items="vendorsSelect"
            :color="teamColor"
            label="Select External Quality Assurance ..."
            item-text="name"
          />
        </v-col>

        <v-col>
          <v-text-field
            label="External QA Companys:"
            :value="getName"
            filled
            disabled
          />
          <v-text-field
            label="Exteral Sustainability Factor (%):"
            :value="calculatedSustainabilityfactor"
            filled
            disabled
          />
          <v-text-field
            label="External Regionality Factor (%):"
            :value="calculatedRegionalityfactor"
            filled
            disabled
          />
          <v-text-field
            label="External Quality (%):"
            :value="calculatedQuality"
            filled
            disabled
          />
          <v-text-field
            label="QA Capacity (PC):"
            :value="calculatedCapacity"
            filled
            disabled
          />
          <v-text-field
            label="Cost Per Year (EUR):"
            :value="calculatedCosts"
            filled
            disabled
          />
        </v-col>
      </v-row>
      </v-container>
      
      <!-- Container Internal QA -->
      <v-row v-if="internalQA == true" align="start" justify="start">
      <p><b>Internal QA</b></p>
      </v-row>
      <v-container v-if="internalQA == true">
        <v-col>
          <v-text-field
            label="Internal QA Company:"
            value="Internal"
            filled
            disabled
          />
          <v-text-field
            label="Number of Employees:"
            type="number"
            filled
            min="0"
            max="1000000"
      
          />
          <v-text-field
            label="Base Salary (EUR):"
            value="40333"
            type="number"
            filled
            disabled
          />
          <v-text-field
            label="Internal Sustainability Factor (%):"
            :value="0"
            type="number"
            filled
            disabled
          />
          <v-text-field
            label="Internal Regionality Factor (%):"
            :value="0"
            type="number"
            filled
            disabled
          />
          <v-text-field
            label="Internal Quality (%):"
            filled
            type="number"
            min="0"
            max="100"

          />
          <v-text-field
            label="Cost Per Year (EUR):"
            :value="calculatedCosts"
            filled
            disabled
          />
          <v-text-field
            label="QA Capacity (PC):"
            :value="calculatedCosts"
            filled
            disabled
          />
          <v-container fluid>
            <p>{{ selected }}</p>
            <v-checkbox
              v-model="selectedDigitalTwin"
              label="Enable Digital Twin"
            ></v-checkbox>
          </v-container>
        <v-text-field
          v-if="selectedDigitalTwin"
          label="Digital Twin Cost:"
          :value="25000.00"
          type="number"
          filled
          disabled
        />
          <v-text-field
            v-if="selectedDigitalTwin" 
            label="Digital Twin Quality (%):"
            filled
            type="number"
            min="0"
            max="100"
          />
        </v-col>
      </v-container>

      <v-divider class="mt-5 mb-5"/>

      <!-- Digittal Twins & Learning Video  -->
      <v-row style="margin-top: 10px;">
        <h2 style="text-align: left;">
          Digittal Twins & Learning Video 
        </h2>
      </v-row>

      <v-row class="mt-6 mb-6">
        <youtube :video-id="videoId" ref="https://www.youtube.com/watch?v=Szjz_4QY628" @playing="playing"></youtube>
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
    <!-- <v-container>
      <h1>Hey, url-hacker, you have no access to this component yet!!</h1>
      <v-icon size="500">mdi-police-badge</v-icon>
    </v-container> -->
  </v-container>
</template>

<script>
import ConfirmationDialog from "../dialogs/ConfirmationDialog.vue";
import ErrorChagesDialog from '../dialogs/ErrorChagesDialog.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Vue from 'vue';
import VueYoutube from 'vue-youtube';
Vue.use(VueYoutube);

export default {
  components: { ConfirmationDialog, ErrorChagesDialog},
  data() {
    return {
      selectedDigitalTwin:false,
      internalQA: false,
      externalQA: true,
      selected: null,
      videoId: 'Szjz_4QY628',
      showError: false,
      teamColor: this.$store.state.color,
      round: this.$store.state.round,
      confirmChangesDialog: false,
      selectedQAType: "",
      numOfEmpl: 1,
      quality: { label: "Quality (%)", val: 50, color: "primary" },
    };
  },
  computed: {
    ...mapGetters('qualityAssurance', ['vendors', 'vendor']),
    player() {
      return this.$refs.youtube.player
    },       
    vendorsSelect: function() {
      return this.vendors ? this.vendors.map(vendor => {
        return {
          name: vendor.Vendorname,
          value: vendor
        }
      }) : []
    },
    getName() {
      return this.vendor != null ? this.vendor.Vendorname : "";
    },
    calculatedCosts: function() {
      return this.vendor != null ? this.vendor.Costs : "";
    },
    calculatedCapacity: function() {
      return this.vendor != null ? this.vendor.Capacity : "";
    },
    calculatedQuality: function(){
      return this.vendor != null ? this.vendor.Quality : ""
    },
    calculatedSustainabilityfactor: function() {
      return this.vendor != null ? this.vendor.Sustainabilityfactor : "";
    },
    calculatedRegionalityfactor: function() {
      return this.vendor != null ? this.vendor.Regionalityfactor : "";
    },
  },
  methods: {
    ...mapActions('qualityAssurance', ['updateVendors']),
    ...mapActions('qualityAssurance', ['getLastVendor']),
    ...mapActions('qualityAssurance', ['saveVendor']),
    ...mapMutations('qualityAssurance', ['updateVendor']),
    toggle() {
      this.internalQA = !this.internalQA;
      this.externalQA = !this.externalQA;
    },
    playVideo() {
      this.player.playVideo()
    },
    check_one: function(){
    this.additional = [];
    },
    playing() {
      console.log('We are watching!!!')
    },
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
      // } else {
      //   this.$router.push({ path: "/bikeConstruction" });
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
  async mounted() {
    await this.updateVendors();
  },
};
</script>

<style>
p,
label {
    font: 1.3rem 'Avenir', sans-serif;
}

input {
    margin: .4rem;
}

</style>
