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
            value="External QA:"
            disabled
            />
            <v-text-field
            label="Vendor ID:"
            :value="getLastVendorid"
            disabled
            />
            <v-text-field
            label="Employeesatisfaction (%):"
            :value="getLastEmployeesatisfaction"
            disabled
            />
            <v-text-field
            value="Internal QA:"
            disabled
            />
             <v-text-field
            label="Yearly Costs (EUR):"
            :value="getLastVendorCosts"
            disabled
            />
            <v-text-field
            label="Quality (%):"
            :value="getLastQuality"
            disabled
            />
            <v-text-field
            label="Number of Employees:"
            :value="getLastNumberofemployees"
            disabled
            />
             <v-text-field
            label="QA Capacity (PC):"
            :value="getLastCapacity"
            disabled
            />             
            <v-text-field
            label="Digital Twin Quality (%):"
            :value="getLastDigitaltwinquality"
            disabled
            >
          </v-card-text>
          </v-card>
        </v-col>

        <v-col v-if="internalQA === true && externalQA === false">
          <!-- Current Round Status -->
          <v-card style="height:100%">
            <v-card-title :style="'background-color:' + teamColor +'!important'" style="color: white">
              Current Round
            </v-card-title>
            <v-card-text>
            <v-text-field
            label="Quality Assurance:"
            value="INTERNAL QA"
            disabled
            />
            <v-text-field
            label="Internal Quality (%):"
            v-model="amountInternalQuality"
            disabled
            />
            <v-text-field
            label="Number of Employees:"
            v-model="amountNumberofemployees"
            disabled
            />
             <v-text-field
            label="Digital Twin:"
            v-model="selectedDigitalTwin"
            disabled
            />
            <v-text-field
            v-if="selectedDigitalTwin"
            label="Digital Twin Cost:"
            :value="25000.00"
            type="number"
            disabled
            />
            <v-text-field
            label="Digital Twin Quality (%):"
            v-model="amountDigitalTwinQuality"
            disabled
            />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col v-if="externalQA === true && internalQA === false">
          <!-- Current Round Status -->
          <v-card style="height:100%">
            <v-card-title :style="'background-color:' + teamColor +'!important'" style="color: white">
              Current Round
            </v-card-title>
            <v-card-text>
            <v-text-field
            label="Quality Assurance:"
            value="EXTERNAL QA"
            disabled
            />
             <v-text-field
            label="External: Yearly Costs (EUR):"
            :value="getVendor"
            disabled
            />
            <v-text-field
            label="Regionality Factor (%):"
            :value="getRegionalityfactor"
            disabled
            />
            <v-text-field
            label="Sustainability Factor (%):"
            :value="getSustainabilityfactor"
            disabled
            />
            <v-text-field
            label="Quality (%):"
            :value="getQuality"
            disabled
            />
             <v-text-field
            label="QA Capacity (PC):"
            :value="getCapacity"
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
        <v-radio id="externalQA" label="Internal QA" value="radio-1" v-on:click="toggleInternal"></v-radio>
        <v-radio id="internalQA" label="External QA" value="radio-2" v-on:click="toggleExternal"></v-radio>
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
      <v-row v-if="externalQA == true && internalQA == false">
        <v-col>
          <v-select
            :value="vendor"
            @input="updateVendor"
            :items="vendorsSelect"
            :color="teamColor"
            label="Select External Quality Assurance ..."
            item-text="name"
            clearable
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
            :value="calculatedCapacityExtern"
            filled
            disabled
          />
          <v-text-field
            label="Cost Per Year (EUR):"
            :value="calculatedCostsExtern"
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
      <v-container v-if="internalQA == true && externalQA == false">
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
            v-model="amountNumberofemployees"
            value="returnNumEployees"
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
            v-model="amountInternalQuality"
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
            :value="calculatedCapacity"
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
            v-model="amountDigitalTwinQuality"
            :value="returnDigitalTwinQuality"
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
      selectedDigitalTwin: false,
      amountInternalQuality: 0,
      amountDigitalTwinQuality: 0,
      amountNumberofemployees: 0,
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
    ...mapGetters('qualityAssurance', ['vendors', 'vendor', 'lastVendor']),
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
    returnDigitalTwinQuality: function() {
      return this.amountDigitalTwinQuality >= 0 ? this.amountDigitalTwinQuality : 0
    },
    returnInternalQuality: function() {
      return this.amountInternalQuality >= 0 ? this.amountInternalQuality : 0
    },
    returnNumEployees: function() {
      return this.amountNumberofemployees >= 0 ? this.amountNumberofemployees : 0
    },
    getLastVendorCosts: function() {
      console.log('this.lastVendor', this.lastVendor);
      return this.lastVendor != null ? (this.lastVendor.Numberofemployees * 40433) : 'No Data'
    },
    getLastEmployeesatisfaction: function() {
      return this.lastVendor != null ? this.lastVendor.Employeesatisfaction : 'No Data'
    },
    getLastRegionalityfactor: function() {
      return this.lastVendor != null ? this.lastVendor.Regionalityfactor : 'No Data'
    },
    getLastSustainabilityfactor: function() {
      return this.lastVendor != null ? this.lastVendor.Sustainabilityfactor : 'No Data'
    },
    getLastQuality: function() {
      return this.lastVendor != null ? this.lastVendor.Quality : 'No Data'
    },
    getLastNumberofemployees() {
      return this.lastVendor != null ? this.lastVendor.Numberofemployees : 'No Data'
    },
    getLastCapacity: function() {
      return this.lastVendor != null ? (this.lastVendor.Numberofemployees * 50000) : 'No Data'
    },
    getLastDigitaltwinquality: function() {
      return this.lastVendor != null ? this.lastVendor.Digitaltwinquality : 'No Data'
    },
    getVendor: function() {
      return this.vendor != null ? this.vendor.Vendorname : 'No Data'
    },
    getRegionalityfactor: function() {
      return this.vendor != null ? this.vendor.Regionalityfactor : 'No Data'
    },
    getSustainabilityfactor: function() {
      return this.vendor != null ? this.vendor.Sustainabilityfactor : 'No Data'
    },
    getQuality: function() {
      return this.vendor != null ? this.vendor.Quality : 'No Data'
    },
    getNumberofemployees() {
      return this.vendor != null ? this.vendor.Numberofemployees : 'No Data'
    },
    getCapacity: function() {
      return this.vendor != null ? this.vendor.Capacity : 'No Data'
    },
    getDigitaltwinquality: function() {
      return this.vendor != null ? this.vendor.Digitaltwinquality : 'No Data'
    },
    getName() {
      return this.vendor != null ? this.vendor.Vendorname : "";
    },
    getLastVendorid() {
      return this.lastVendor != null ? this.lastVendor.Vendorid : "No Data";
    },
    calculatedCosts: function() {
      return this.amountNumberofemployees >= 0 ? (this.amountNumberofemployees * 40433) : 0;
    },
    calculatedCapacity: function() {
      return this.amountNumberofemployees >= 0 ? (this.amountNumberofemployees * 50000) : 0;
    },
    calculatedCostsExtern: function() {
      return this.vendor != null ? this.vendor.Costs : "";
    },
    calculatedCapacityExtern: function() {
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
    ...mapActions('qualityAssurance', ['saveVendorIntern']),
    ...mapActions('qualityAssurance', ['saveVendorExtern']),
    ...mapMutations('qualityAssurance', ['updateVendor']),
    toggleInternal() {
      this.internalQA = true;
      this.externalQA = false;
    },
    toggleExternal() {
      this.internalQA = false;
      this.externalQA = true;
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
    async toggleDialog() {
      if(this.internalQA == true && this.externalQA == false) {
        if(this.amountInternalQuality == 0 && this.amountNumberofemployees == 0) {
        this.toggleShowError();
      } else {
        this.confirmChangesDialog = !this.confirmChangesDialog;
        await this.saveVendorIntern({
            Quality:this.returnInternalQuality,
            Digitaltwinquality:this.returnDigitalTwinQuality,
            Numberofemployees:this.returnNumEployees
        });
      }
      } else if (this.externalQA == true && this.internalQA == false) {
        if(this.vendor === null) {
        this.toggleShowError();
      } else {
        this.confirmChangesDialog = !this.confirmChangesDialog;
        await this.saveVendorExtern();
      }
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
  async mounted() {
    await this.updateVendors();
    await this.getLastVendor();
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
