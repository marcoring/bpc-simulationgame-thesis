<template>
<v-container id="logistics">

  <!-- Header with icon -->
    <v-container align="left">
      <v-row align="start"
            justify="start"
            class="mb-6 ml-6">
        <v-btn :color="teamColor" fab x-large>
        <v-icon color="white" x-large>mdi-truck</v-icon>
        </v-btn>
        <v-col align="start"
            justify="start"
            class="mb-6 ml-4">
        <h1 class="font-weight-black">Logistics</h1>  
        </v-col>   
      </v-row>
    </v-container>
  
    <!-- Statistic about current and previous round -->
    <v-row ref="round-data">
      <v-col>
        <!-- Previous Round Status -->
        <v-card style="height:100%">
          <v-card-title :style="'background-color:' + teamColor +'!important'" style="color: white">
            Previous Round
          </v-card-title>
          <v-card-text>
             <v-text-field
            label="Transport company:"
            :value="lastVendor != null ? lastVendor.Vendorname : 'No Data'"
            disabled
            />
            <v-text-field
            label="Delivery costs (EUR):"
            :value="lastCalculatedDeliveryCosts != null ? lastCalculatedDeliveryCosts : 'No Data'"
            disabled
            />
            <v-text-field
            label="Quality of delivery (%):"
            :value="lastCalculatedDeliveryQuality != null ? lastCalculatedDeliveryQuality : 'No Data'"
            disabled
            />
            <v-text-field
            label="Sustainability factor:"
            :value="lastCalculatedSustainabilityfactor != null ? lastCalculatedSustainabilityfactor : 'No Data'"
            disabled
            />
            <v-text-field
            label="Regionality factor:"
            :value="lastCalculatedRegionalityfactor != null ? lastCalculatedRegionalityfactor : 'No Data'"
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
            label="Transport company:"
            :value="getName"
            disabled
            />
            <v-text-field
            label="Delivery costs (EUR):"
            :value="calculatedDeliveryCosts"
            disabled
            />
            <v-text-field
            label="Quality of delivery (%):"
            :value="calculatedDeliveryQuality"
            disabled
            />
            <v-text-field
            label="Sustainability factor:"
            :value="calculatedSustainabilityfactor"
            disabled
            />
            <v-text-field
            label="Regionality factor:"
            :value="calculatedRegionalityfactor"
            disabled
            />
          </v-card-text>
        </v-card>
      </v-col>
      </v-row>
    <v-divider class="mt-5 mb-5"/>

    <v-row v-if="this.$store.state.logisticStep <= 4" class="pa-2" style="margin-top: 20px; margin-bottom: 40px;">
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

    <!-- Managing logistic process -->
    <div ref="logic" style="margin: 1px;">
      <v-row style="margin-top: 15px; margin-left: 3px">
        <h2 style="text-align: left;">Manage logistic process</h2>
      </v-row>

      <v-row>
        <v-col>
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
        <v-icon>mdi-truck</v-icon>
          Smart Logistics
        </v-btn>
        </template>
        <span>Smart Logistics: Information System choosing the supplier with the best price-quality.</span><br><br>
        <span>Implementation Costs for Smart Logistics only occur once!</span><br>
        </v-tooltip>
      </v-container>
      </v-col>

      <v-col> 
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
        <span>Transportation Company: Transportation companies differ in quality and price.</span><br>
        <span>Sustainability Factor: Level of sustainability of the company.</span><br>
        <span>Regionality Factor: Level of regionality of the company.</span><br>
        <span>Quality: Depending on the quality the price for each material is changed.</span><br>
        </v-tooltip>
      </v-container>
       </v-col>
       </v-row>

        <v-row>
        <v-col>
          <v-select
            :value="vendor"
            @input="updateVendor"
            :items="vendorsSelect"
            :color="teamColor"
            label="Choose transportation company..."
            item-text="name"
            clearable
          />
        </v-col>

      <v-col>
        <v-container fluid>
            <p>{{ selected }}</p>
            <v-checkbox
              v-model="smartLogistic"
              label="Enable Smart Logistic"
            ></v-checkbox>
          </v-container>
        <v-text-field
          v-if="smartLogistic"
          label="Smart Logistic Cost:"
          :value="15000.00"
          type="number"
          filled
          disabled
        />
          <v-text-field
            label="Delivery costs (EUR)"
            :value="calculatedDeliveryCosts"
            filled
            disabled
          />
          <v-text-field
            label="Quality of delivery (%)"
            :value="calculatedDeliveryQuality"
            filled
            disabled
          />
          <!-- Sustainability -->
            <v-text-field
              label="Sustainability factor"
              :value="calculatedSustainabilityfactor"
              filled
              disabled
            />
            <!-- Regionality factor -->
            <v-text-field
              label="Regionality factor"
              :value="calculatedRegionalityfactor"
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
// import CostAccountingCard from "../components/CostAccountingCard.vue";
import ConfirmationDialog from "../dialogs/ConfirmationDialog.vue";
import ErrorChagesDialog from '../dialogs/ErrorChagesDialog.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "logistics",
  components: { /*CostAccountingCard,*/ ConfirmationDialog, ErrorChagesDialog },
  computed: {
      // erster Parameter entspricht Module, aus welchen wir Parameter holen
    ...mapGetters('logistics', ['vendors', 'vendor', 'lastVendor']),
    vendorsSelect: function() {
      return this.vendors ? this.vendors.map(vendor => {
        return {
          name: vendor.Vendorname,
          value: vendor
        }
      }) : []
    },
    lastCalculatedDeliveryCosts: function() {
      return this.lastVendor != null ? this.lastVendor.Deliverycost : "No Data";
    },
    lastCalculatedDeliveryQuality: function(){
      return this.lastVendor != null ? this.lastVendor.Deliveryquality : "No Data"
    },
    lastCalculatedSustainabilityfactor: function() {
      return this.lastVendor != null ? this.lastVendor.Sustainabilityfactor : "No Data";
    },
    lastCalculatedRegionalityfactor: function() {
      return this.lastVendor != null ? this.lastVendor.Regionalityfactor : "No Data";
    },
    calculatedDeliveryCosts: function() {
      return this.vendor != null ? this.vendor.Deliverycost : "";
    },
    calculatedDeliveryQuality: function(){
      return this.vendor != null ? this.vendor.Deliveryquality : ""
    },
    calculatedSustainabilityfactor: function() {
      return this.vendor != null ? this.vendor.Sustainabilityfactor : "";
    },
    calculatedRegionalityfactor: function() {
      return this.vendor != null ? this.vendor.Regionalityfactor : "";
    },
    getName() {
      return this.vendor != null ? this.vendor.Vendorname : "";
    },
  },
  data() {
    return {
      smartLogistic: false,
      smartLogCost: 7000,
      showError: false,
      stepText: '',
      teamColor: this.$store.state.color,
      confirmChangesDialog: false,
    };
  },
  methods: {
    ...mapActions('logistics', ['updateVendors']),
    ...mapActions('logistics', ['getLastVendor']),
    ...mapActions('logistics', ['saveVendor']),
    ...mapMutations('logistics', ['updateVendor']),
    async toggleDialog() {
      if(this.vendor === null) {
        return this.toggleShowError();
      } else if (this.$store.state.logisticStep >= 5) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.confirmChangesDialog = !this.confirmChangesDialog;
        await this.saveVendor({
          Smartlogistic:this.smartLogistic,
          Smartlogcost:this.smartLogCost
        });
      }
    },
    getCosts() {
      if (!this.vendor.Deliverycost) {
        return null;
      } else {
        return this.vendor.Deliverycost;
      }
    },
    toggleShowError() {
      this.showError = !this.showError;
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
  async mounted() {
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
    await this.updateVendors();
    await this.getLastVendor();
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
