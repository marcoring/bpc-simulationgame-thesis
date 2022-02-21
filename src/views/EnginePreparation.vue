<template>
  <v-container id="engine-preparation">

    <!-- Header with icon -->
    <v-container align="left">
      <v-row align="start"
            justify="start"
            class="mb-6 ml-6">
        <v-btn :color="teamColor" fab x-large>
        <v-icon color="white" x-large>mdi-pac-man</v-icon>
        </v-btn>
        <v-col align="start"
            justify="start"
            class="mb-6 ml-4">
        <h1 class="font-weight-black">Engine Preparation</h1>
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

      <v-divider class="mt-5 mb-5"/>

    <!-- Managing Engine Preparation Process -->
    <div ref="logic" style="margin: 1px;">
    <v-row style="margin-top: 15px; margin-left: 3px">
      <h2 style="text-align: left;">
        Manage Engine Preparation Process
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
            label="Select Production Line ..."
            item-text="name"
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
          <v-container fluid>
            <p>{{ selected }}</p>
            <v-checkbox
              v-model="selectedCustomization"
              label="Enable Product Customization"
            ></v-checkbox>
          </v-container>
        <v-text-field
          v-if="selectedCustomization"
          label="Customization Tool Cost:"
          :value="2454.00"
          type="number"
          filled
          disabled
        />
      </v-col>
    </v-row>
    </div>
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
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import ConfirmationDialog from "../dialogs/ConfirmationDialog.vue";
import ErrorChagesDialog from '../dialogs/ErrorChagesDialog.vue';

export default {
  components: { ConfirmationDialog, ErrorChagesDialog },
  name: "engine-preparation",
  data() {
    return {
      showError: false,
      teamColor: this.$store.state.color,
      round: this.$store.state.round,
      confirmChangesDialog: false,
      selectedLine: "",
      numOfLines: 1,
      selectedCustomization: false,
      amount: {
        assemblyLines: { label: "Number of Assembly Lines", val: 0 },
        quality: { label: "Quality (%)", val: 0, color: "primary" },
        workload: { label: "Workload (%)", val: 0, color: "primary" },
        safety: { label: "Safety (%)", val: 0, color: "primary" },
      },
    };
  },
  computed: {
  ...mapGetters('enginePreparation', ['vendors', 'vendor']),
  vendorsSelect: function() {
    return this.vendors ? this.vendors.map(vendor => {
      if (vendor.Materialid == 'ENG') {
        return {
          name: vendor.Alname,
          value: vendor
        }}
      }) : []
    },
    // productCustomization() {
    //   return this.vendor != null ? this.vendor.Productcustomization : '';
    // },
    assemblyLineName() {
      return this.vendor != null ? this.vendor.Alname : '';
    },
    assemblyLineCosts() {
      if (this.selectedCustomization) {
        return this. vendor != null ? (this.vendor.Acqusitioncost * 1.2) : '';
      } else {
      return this.vendor != null ? this.vendor.Acqusitioncost : '';
    }},
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
    ...mapActions('enginePreparation', ['updateVendors']),
    ...mapActions('enginePreparation', ['getLastVendor']),
    ...mapActions('enginePreparation', ['saveVendor']),
    ...mapMutations('enginePreparation', ['updateVendor']),
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
      this.$emit("updateProgress", "enginePreparation", 100);
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
      if(this.$store.state.round >= 3) {
        this.$router.push({ path: "/batteryPreparation" });
      }       
    },
    toPreviousStep() {
       this.$router.push({ path: "/sensorsPreparation" });
    }
  },
  mounted() {
    this.updateVendors();
  },
  props: {},
};
</script>
