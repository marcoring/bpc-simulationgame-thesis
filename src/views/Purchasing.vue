<template>
  <v-container id="purchasing">

    <!-- Header with icon -->
    <v-container align="left">
      <v-row align="start"
            justify="start"
            class="mb-6 ml-6">
        <v-btn :color="teamColor" fab x-large>
        <v-icon color="white" x-large>mdi-shopping</v-icon>
        </v-btn>
        <v-col align="start"
            justify="start"
            class="mb-6 ml-4">
        <h1 class="font-weight-black">Purchasing</h1>  
        </v-col>   
      </v-row>
    </v-container>

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
            :items="prevRoundTableData"
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
            :items="currentRoundTableData"
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
        <v-btn @click="nextPurchasingStep" dark rounded link color="red">
          <b>I understand</b>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Managing purchasing process -->
    <div ref="logic" style="margin: 1px;">
      <v-row style="margin-top: 15px; margin-left: 3px; margin-bottom: 15px">
        <h2 style="text-align: left;">Manage purchasing process</h2>
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
        <span>Sustainability factor: Level of sustainability of the company.</span><br>
        <span>Regionality factor: Level of regionality of the company.</span><br>
        <span>Quality: Depending on the quality the price for each material is changed</span><br>
        <span>Amount: Each bike has 1 battery, 1 engine, 1 frame and 10 sensors</span>
        </v-tooltip>
        </v-col>
      </v-container>

      <!-- Manage Battery purchasing process-->
      <v-container>
        <v-card elevation="5" class="mx-auto" outlined>
          <v-card-title
            :style="'background-color:' + teamColor + '!important'"
            style="color: white"
          ><v-icon color="white" x-large right class="mr-1">mdi-shopping-outline</v-icon>
          <span class="text-h6">Battery purchasing process</span>
          </v-card-title>

          <v-row align="center" no-gutters>
            <v-col
              cols="auto"
              sm="6"
              align="center"
              justify="center"
            >
            <!-- v-model statt input event listener nachteil: ich bräuchten hier ein Objekt, da wir einen getter und wir eine Methode bräuchten um das zu updaten -->
            <!-- Choose vendor Battery-->
            <v-select
              :value="batteryVendor"
              @input="updateBatteryVendor"
              :items="batteryVendorsSelect"
              :color="teamColor"
              label=" Choose Battery vendor..."
              item-text="name"
              filled
            />
            </v-col>

            <v-col
              cols="auto"
              sm="6"
            >
            <!-- Quality Slider Battery -->
            <v-subheader style="padding: 32px">Quality Battery</v-subheader>
              <v-card-text>
                <v-slider
                  v-model="quality.battery"
                  :label="quality.battery"
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
                      v-model="quality.battery"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      :min="1"
                      :max="100"
                      :thumb-size="24"
                      type="number"
                      style="width: 60px"
                  />
                </template>
                </v-slider>
              </v-card-text>
            </v-col>
          </v-row>
      
          <v-row class="ma-0 pa-0" no-gutters>
            <v-col
              class="pr-4"
            >  
            <!-- Battery: Cost per material (EUR) -->
            <v-text-field
              label="Battery: Cost per Material (EUR)"
              :value="calculatedCostPerMaterialBattery"
              filled
              disabled
            />
            </v-col>

            <v-col
              class="pr-4"
            >

          <!-- Slider Battery: Amount(PC) -->
            <v-slider
              class="aign-center"
              v-model="amount.battery"
              label="Battery: Amount (PC)"
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
                  v-model.number="amount.battery"
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
          </v-row>

          <v-row no-gutters>
            <v-col
              class="pr-4"
            >
            <v-text-field
                label="Battery: Total Cost (EUR)"
                :value="calculatedTotalCostBattery"
                filled
                disabled
              />
            </v-col>
          
            <v-col
              class="pr-4"
            >         
            <!-- Sustainability factor Battery -->
            <v-text-field
              label="Sustainability factor Battery"
              :value="calculatedBatterySustainabilityfactor"
              filled
              disabled
            />
            </v-col>

            <v-col
            >
            <!-- Regionality factor Battery -->
            <v-text-field
              label="Regionality factor Battery"
              :value="calculatedBatteryRegionalityfactor"
              filled
              disabled
            />
          </v-col>
          </v-row>

          <v-row v-if="this.$store.state.round > 1">
          <v-col align="center" justify="center">
          <v-container>
            <p>{{ selected }}</p>
            <v-checkbox
              v-model="granulateBattery"
              label="Enable Granulate"
              hint="If Granulate is NOT enabled, the Type contains 'STANDARD'"
              persistent-hint
            ></v-checkbox>
          </v-container>
          </v-col>
        </v-row>
        </v-card>
      </v-container>

      <!-- Manage Engine purchasing process-->
      <v-container>
        <v-card elevation="5" class="mx-auto" outlined>
          <v-card-title
            :style="'background-color:' + teamColor + '!important'"
            style="color: white"
          ><v-icon color="white" x-large right class="mr-1">mdi-engine</v-icon>
          <span class="text-h6">Engine purchasing process</span>
          </v-card-title>

          <v-row align="center" no-gutters>
            <v-col
              cols="auto"
              sm="6"
              align="center"
              justify="center"
            >

            <!-- Choose vendor Engine-->
            <v-select
              :value="engineVendor"
              @input="updateEngineVendor"
              :items="engineVendorsSelect"
              :color="teamColor"
              label=" Choose Engine vendor..."
              item-text="name"
              filled
            />
            </v-col>

            <v-col
              cols="auto"
              sm="6"
            >
            <!-- Quality Slider Engine -->
            <v-subheader style="padding: 32px">Quality Engine</v-subheader>
              <v-card-text>
                <v-slider
                  v-model="quality.engine"
                  :label="quality.engine"
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
                      v-model="quality.engine"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      :min="1"
                      :max="100"
                      :thumb-size="24"
                      type="number"
                      style="width: 60px"
                  />
                </template>
                </v-slider>
              </v-card-text>
            </v-col>
          </v-row>
      
          <v-row class="ma-0 pa-0" no-gutters>
            <v-col
              class="pr-4"
            >  
            <!-- Engine: Cost per material (EUR) -->
            <v-text-field
              label="Engine: Cost per Material (EUR)"
              :value="calculatedCostPerMaterialEngine"
              filled
              disabled
            />
            </v-col>

            <v-col
              class="pr-4"
            >

          <!-- Slider Engine: Amount(PC) -->
            <v-slider
              class="aign-center"
              v-model="amount.engine"
              label="Engine: Amount (PC)"
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
                  v-model.number="amount.engine"
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
          </v-row>

          <v-row no-gutters>
            <v-col
              class="pr-4"
            >
            <v-text-field
                label="Engine: Total Cost (EUR)"
                :value="calculatedTotalCostEngine"
                filled
                disabled
              />
            </v-col>
          
            <v-col
              class="pr-4"
            >         
            <!-- Sustainability factor Engine -->
            <v-text-field
              label="Sustainability factor Engine"
              :value="calculatedEngineSustainabilityfactor"
              filled
              disabled
            />
            </v-col>

            <v-col
            >
            <!-- Regionality factor Engine -->
            <v-text-field
              label="Regionality factor Engine"
              :value="calculatedEngineRegionalityfactor"
              filled
              disabled
            />
          </v-col>
        </v-row>

        <v-row v-if="this.$store.state.round > 1">
          <v-col align="center" justify="center">
          <v-container>
            <p>{{ selected }}</p>
            <v-checkbox
              v-model="granulateEngine"
              label="Enable Granulate"
              hint="If Granulate is NOT enabled, the Type contains 'STANDARD'"
              persistent-hint
            ></v-checkbox>
          </v-container>
          </v-col>
        </v-row>
        </v-card>
      </v-container>

    <!-- Manage Frame purchasing process-->
      <v-container>
        <v-card elevation="5" class="mx-auto" outlined>
          <v-card-title
            :style="'background-color:' + teamColor + '!important'"
            style="color: white"
          ><v-icon color="white" x-large right class="mr-1">mdi-bicycle</v-icon>
          <span class="text-h6">Frame purchasing process</span>
          </v-card-title>

          <v-row align="center" no-gutters>
            <v-col
              cols="auto"
              sm="6"
              align="center"
              justify="center"
            >

            <!-- Choose vendor Frame-->
            <v-select
              :value="frameVendor"
              @input="updateFrameVendor"
              :items="frameVendorsSelect"
              :color="teamColor"
              label=" Choose Frame vendor..."
              item-text="name"
              filled
            />
            </v-col>

            <v-col
              cols="auto"
              sm="6"
            >
            <!-- Quality Slider Frame -->
            <v-subheader style="padding: 32px">Quality Frame</v-subheader>
              <v-card-text>
                <v-slider
                  v-model="quality.frame"
                  :label="quality.frame"
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
                      v-model="quality.frame"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      :min="1"
                      :max="100"
                      :thumb-size="24"
                      type="number"
                      style="width: 60px"
                  />
                </template>
                </v-slider>
              </v-card-text>
            </v-col>
          </v-row>
      
          <v-row class="ma-0 pa-0" no-gutters>
            <v-col
              class="pr-4"
            >  
            <!-- Frame: Cost per material (EUR) -->
            <v-text-field
              label="Frame: Cost per Material (EUR)"
              :value="calculatedCostPerMaterialFrame"
              filled
              disabled
            />
            </v-col>

            <v-col
              class="pr-4"
            >

          <!-- Slider Frame: Amount(PC) -->
            <v-slider
              class="aign-center"
              v-model="amount.frame"
              label="Frame: Amount (PC)"
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
                  v-model.number="amount.frame"
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
          </v-row>

          <v-row no-gutters>
            <v-col
              class="pr-4"
            >
            <v-text-field
                label="Frame: Total Cost (EUR)"
                :value="calculatedTotalCostFrame"
                filled
                disabled
              />
            </v-col>
          
            <v-col
              class="pr-4"
            >         
            <!-- Sustainability factor Frame -->
            <v-text-field
              label="Sustainability factor Frame"
              :value="calculatedFrameSustainabilityfactor"
              filled
              disabled
            />
            </v-col>

            <v-col
            >
            <!-- Regionality factor Frame -->
            <v-text-field
              label="Regionality factor Frame"
              :value="calculatedFrameRegionalityfactor"
              filled
              disabled
            />
          </v-col>
        </v-row>

                  <v-row v-if="this.$store.state.round > 1">
          <v-col align="center" justify="center">
          <v-container>
            <p>{{ selected }}</p>
            <v-checkbox
              v-model="granulateFrame"
              label="Enable Granulate"
              hint="If Granulate is NOT enabled, the Type contains 'STANDARD'"
              persistent-hint
            ></v-checkbox>
          </v-container>
          </v-col>
        </v-row>
        </v-card>
      </v-container>

      <!-- Manage Sensors purchasing process-->
      <v-container>
        <v-card elevation="5" class="mx-auto" outlined>
          <v-card-title
            :style="'background-color:' + teamColor + '!important'"
            style="color: white"
          ><v-icon color="white" x-large right class="mr-1">mdi-chip</v-icon>
          <span class="text-h6">Sensors purchasing process</span>
          </v-card-title>

          <v-row align="center" no-gutters>
            <v-col
              cols="auto"
              sm="6"
              align="center"
              justify="center"
            >

            <!-- Choose vendor Sensors-->
            <v-select
              :value="sensorsVendor"
              @input="updateSensorsVendor"
              :items="sensorsVendorsSelect"
              :color="teamColor"
              label=" Choose Sensors vendor..."
              item-text="name"
              filled
            />
            </v-col>

            <v-col
              cols="auto"
              sm="6"
            >
            <!-- Quality Slider Sensors -->
            <v-subheader style="padding: 32px">Quality Sensors</v-subheader>
              <v-card-text>
                <v-slider
                  v-model="quality.sensors"
                  :label="quality.sensors"
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
                      v-model="quality.sensors"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      :min="1"
                      :max="100"
                      :thumb-size="24"
                      type="number"
                      style="width: 60px"
                  />
                </template>
                </v-slider>
              </v-card-text>
            </v-col>
          </v-row>
      
          <v-row class="ma-0 pa-0" no-gutters>
            <v-col
              class="pr-4"
            >  
            <!-- Sensors: Cost per material (EUR) -->
            <v-text-field
              label="Sensors: Cost per Material (EUR)"
              :value="calculatedCostPerMaterialSensors"
              filled
              disabled
            />
            </v-col>

            <v-col
              class="pr-4"
            >

          <!-- Slider Sensors: Amount(PC) -->
            <v-slider
              class="aign-center"
              v-model="amount.sensors"
              label="Sensors: Amount (PC)"
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
                  v-model.number="amount.sensors"
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
          </v-row>

          <v-row no-gutters>
            <v-col
              class="pr-4"
            >
            <v-text-field
                label="Sensors: Total Cost (EUR)"
                :value="calculatedTotalCostSensors"
                filled
                disabled
              />
            </v-col>
          
            <v-col
              class="pr-4"
            >         
            <!-- Sustainability factor Sensors -->
            <v-text-field
              label="Sustainability factor Sensors"
              :value="calculatedSensorsSustainabilityfactor"
              filled
              disabled
            />
            </v-col>

            <v-col
            >
            <!-- Regionality factor Sensors -->
            <v-text-field
              label="Regionality factor Sensors"
              :value="calculatedSensorsRegionalityfactor"
              filled
              disabled
            />
          </v-col>
        </v-row>

        <v-row v-if="this.$store.state.round > 1">
          <v-col align="center" justify="center">
          <v-container>
            <p>{{ selected }}</p>
            <v-checkbox
              v-model="granulateSensors"
              label="Enable Granulate"
              hint="If Granulate is NOT enabled, the Type contains 'STANDARD'"
              persistent-hint
            ></v-checkbox>
          </v-container>
          </v-col>
        </v-row>
        </v-card>
      </v-container>
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
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: { ConfirmationDialog, ErrorChagesDialog },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Purchasing",
  computed: {
    ...mapGetters('purchasing', ['vendors', 'vendor', 'batteryVendors', 'batteryVendor', 'engineVendors', 'engineVendor', 'frameVendors', 'frameVendor', 'sensorsVendors', 'sensorsVendor', 'lastVendorBattery', 'lastVendorBatteryM', 'lastVendorEngine', 'lastVendorEngineM', 'lastVendorFrame', 'lastVendorFrameM', 'lastVendorSensors', 'lastVendorSensorsM']),
    vendorsSelect: function() {
      return this.vendors.map(vendor => {
        return {
          name: vendor.Vendorname,
          value: vendor
        }
      })
    },
    batteryVendorsSelect: function() {
      return this.batteryVendors.map(batteryVendor => {
        return {
          name: batteryVendor.Vendorname,
          value: batteryVendor
        }
      })
    },
    engineVendorsSelect: function() {
      return this.engineVendors.map(engineVendor => {
        return {
          name: engineVendor.Vendorname,
          value: engineVendor
        }
      })
    },
    frameVendorsSelect: function() {
      return this.frameVendors.map(frameVendor => {
        return {
          name: frameVendor.Vendorname,
          value: frameVendor
        }
      })
    },
    sensorsVendorsSelect: function() {
      return this.sensorsVendors.map(sensorsVendor => {
        return {
          name: sensorsVendor.Vendorname,
          value: sensorsVendor
        }
      })
    },
    currentRoundTableData: function() {
      const lines = [];
      if(this.batteryVendor != null) {
        lines.push({
          material: "Battery",
          vendor: this.batteryVendor.Vendorname,
          sustainabilityFactor: this.batteryVendor.Sustainabilityfactor,
          regionalityFactor: this.batteryVendor.Regionalityfactor,
          quality: this.quality.battery,
          amount: this.amount.battery,
          totalCost: this.calculatedTotalCostBattery,
        });
      }
      if(this.engineVendor != null) {
        lines.push({
          material: "Engine",
          vendor: this.engineVendor.Vendorname,
          sustainabilityFactor: this.engineVendor.Sustainabilityfactor,
          regionalityFactor: this.engineVendor.Regionalityfactor,
          quality: this.quality.engine,
          amount: this.amount.engine,
          totalCost: this.calculatedTotalCostEngine,
        });
      }
      if(this.frameVendor != null) {
        lines.push({
          material: "Frame",
          vendor: this.frameVendor.Vendorname,
          sustainabilityFactor: this.frameVendor.Sustainabilityfactor,
          regionalityFactor: this.frameVendor.Regionalityfactor,
          quality: this.quality.frame,
          amount: this.amount.frame,
          totalCost: this.calculatedTotalCostFrame,
        });
      }
      if(this.sensorsVendor != null) {
        lines.push({
          material: "Sensors",
          vendor: this.sensorsVendor.Vendorname,
          sustainabilityFactor: this.sensorsVendor.Sustainabilityfactor,
          regionalityFactor: this.sensorsVendor.Regionalityfactor,
          quality: this.quality.sensors,
          amount: this.amount.sensors,
          totalCost: this.calculatedTotalCostSensors,
        });
      }
      return lines;
    },
      prevRoundTableData: function() {
      const lines = [];
      if(this.lastVendorBattery != null && this.lastVendorBatteryM != null) {
        /*console.log('LASTVENDOR-Battery', this.lastVendorBattery),
        console.log('LASTVENDOR-BatteryM', this.lastVendorBatteryM),*/
        lines.push({
          material: "Battery",
          vendor: this.lastVendorBatteryM.Vendorname,
          sustainabilityFactor: this.lastVendorBatteryM.Sustainabilityfactor,
          regionalityFactor: this.lastVendorBatteryM.Regionalityfactor,
          quality: this.lastVendorBattery.Quality,
          amount: this.lastVendorBattery.Amount,
          totalCost: this.lastVendorBattery.Totalcost,
        });
      }
      if(this.lastVendorEngine != null && this.lastVendorEngineM != null) {
        lines.push({
          material: "Engine",
          vendor: this.lastVendorEngineM.Vendorname,
          sustainabilityFactor: this.lastVendorEngineM.Sustainabilityfactor,
          regionalityFactor: this.lastVendorEngineM.Regionalityfactor,
          quality: this.lastVendorEngine.Quality,
          amount: this.lastVendorEngine.Amount,
          totalCost: this.lastVendorEngine.Totalcost,
        });
      }
      if(this.lastVendorFrame != null && this.lastVendorFrameM != null) {
        lines.push({
          material: "Frame",
          vendor: this.lastVendorFrameM.Vendorname,
          sustainabilityFactor: this.lastVendorFrameM.Sustainabilityfactor,
          regionalityFactor: this.lastVendorFrameM.Regionalityfactor,
          quality: this.lastVendorFrame.Quality,
          amount: this.lastVendorFrame.Amount,
          totalCost: this.lastVendorFrame.Totalcost,
        });
      }
      if(this.lastVendorSensors != null && this.lastVendorSensorsM != null) {
        lines.push({
          material: "Sensors",
          vendor: this.lastVendorSensorsM.Vendorname,
          sustainabilityFactor: this.lastVendorSensorsM.Sustainabilityfactor,
          regionalityFactor: this.lastVendorSensorsM.Regionalityfactor,
          quality: this.lastVendorSensors.Quality,
          amount: this.lastVendorSensors.Amount,
          totalCost: this.lastVendorSensors.Totalcost,
        });
      }
      return lines;
    },
    getBasebatteryPrice: function() {
      return this.batteryVendor != null ? this.batteryVendor.Basebatteryprice : "";
    },
    getBasebatteryPriceGranulate: function() {
      return this.batteryVendor != null ? this.batteryVendor.Basebatterygranulateprice : "";
    },
    getBaseframePrice: function() {
      return this.frameVendor != null ? this.frameVendor.Baseframeprice : "";
    },
    getBaseframePriceGranulate: function() {
      return this.frameVendor != null ? this.frameVendor.Baseframegranulateprice : "";
    },
    getBaseenginePrice: function() {
      return this.engineVendor != null ? this.engineVendor.Baseengineprice : "";
    },
    getBaseenginePriceGranulate: function() {
      return this.engineVendor != null ? this.engineVendor.Baseenginegranulateprice : "";
    },
    getBasesensorsPrice: function() {
      return this.sensorsVendor != null ? this.sensorsVendor.Basesensorprice : "";
    },
    getBasesensorsPriceGranulate: function() {
      return this.sensorsVendor != null ? this.sensorsVendor.Basesensorgranulateprice : "";
    },
    getBatteryVendorname: function() {
      return this.batteryVendor != null ? this.batteryVendor.Vendorname : "";
    },
    calculatedCostPerMaterialFrame: function() {
       if (this.$store.state.round > 1 && this.granulateFrame === true) {
      return this.frameVendor != null ? (Number(this.getBaseframePriceGranulate)).toFixed(2) : "";
      } else return this.frameVendor != null ? (Number(this.getBaseframePrice)).toFixed(2) : "";
    },
    calculatedCostPerMaterialSensors: function() {
       if (this.$store.state.round > 1 && this.granulateSensors === true) {
      return this.sensorsVendor != null ? (Number(this.getBasesensorsPriceGranulate)).toFixed(2) : "";
      } else return this.sensorsVendor != null ? (Number(this.getBasesensorsPrice)).toFixed(2) : "";
    },
    calculatedCostPerMaterialBattery: function() {
       if (this.$store.state.round > 1 && this.granulateBattery === true) {
      return this.batteryVendor != null ? (Number(this.getBasebatteryPriceGranulate)).toFixed(2) : "";
      } else return this.batteryVendor != null ? (Number(this.getBasebatteryPrice)).toFixed(2) : "";
    },
    calculatedCostPerMaterialEngine: function() {
       if (this.$store.state.round > 1 && this.granulateEngine === true) {
      return this.engineVendor != null ? (Number(this.getBaseenginePriceGranulate)).toFixed(2) : "";
      } else return this.engineVendor != null ? (Number(this.getBaseenginePrice)).toFixed(2) : "";
    },
    calculatedTotalCostBattery: function() {
      return this.batteryVendor != null ? (this.calculatedCostPerMaterialBattery * this.amount.battery).toFixed(2) : "";
    },
    calculatedTotalCostEngine: function() {
      return this.engineVendor != null ? (this.calculatedCostPerMaterialEngine * this.amount.engine).toFixed(2) : "";
    },
    calculatedTotalCostFrame: function() {
      return this.frameVendor != null ? (this.calculatedCostPerMaterialFrame * this.amount.frame).toFixed(2) : "";
    },
    calculatedTotalCostSensors: function() {
      return this.sensorsVendor != null ? (this.calculatedCostPerMaterialSensors * this.amount.sensors).toFixed(2) : "";
    },
    calculatedBatterySustainabilityfactor: function() {
      return this.batteryVendor != null ? this.batteryVendor.Sustainabilityfactor : "";
    },
    calculatedBatteryRegionalityfactor: function() {
      return this.batteryVendor != null ? this.batteryVendor.Regionalityfactor : "";
    },
    calculatedEngineSustainabilityfactor: function() {
      return this.engineVendor != null ? this.engineVendor.Sustainabilityfactor : "";
    },
    calculatedEngineRegionalityfactor: function() {
      return this.engineVendor != null ? this.engineVendor.Regionalityfactor : "";
    },
    calculatedFrameSustainabilityfactor: function() {
      return this.frameVendor != null ? this.frameVendor.Sustainabilityfactor : "";
    },
    calculatedFrameRegionalityfactor: function() {
      return this.frameVendor != null ? this.frameVendor.Regionalityfactor : "";
    },
    calculatedSensorsSustainabilityfactor: function() {
      return this.sensorsVendor != null ? this.sensorsVendor.Sustainabilityfactor : "";
    },
    calculatedSensorsRegionalityfactor: function() {
      return this.sensorsVendor != null ? this.sensorsVendor.Regionalityfactor : "";
    },
  },
  data() {
    return {
      info: null,
      isEditing: true,
      teamColor: this.$store.state.color,
      confirmChangesDialog: false,
      showError: false,
      stepText: '',
      granulateBattery: false,
      granulateEngine: false,
      granulateFrame: false,
      granulateSensors: false,
      quality: { 
        battery: { label: "Battery: Quality (%)", val: 50 },
        engine: { label: "Engine: Quality (%)", val: 50 },
        frames: { label: "Frame: Quality (%)", val: 50 },
        sensors: { label: "Sensor: Quality (%)", val: 50 },
        },
      amount: {
        battery: { label: "Frame: Amount (PC)", val: 1 },
        engine: { label: "Sensor: Amount (PC)", val: 1 },
        frames: { label: "Frame: Amount (PC)", val: 1 },
        sensors: { label: "Sensor: Amount (PC)", val: 1 },
      },
      searchPrevRound: "",
      searchCurRound: "",
      headersRound: [
        { text: "Material", value: "material" },
        { text: "Vendor", value: "vendor" },
        { text: "Sustainability Factor (%)", value: "sustainabilityFactor" },
        { text: "Regionality Factor (%)", value: "regionalityFactor" },
        { text: "Quality (%)", value: "quality" },
        { text: "Amount (PC)", value: "amount" },
        { text: "Total Cost (EUR)", value: "totalCost" }
      ],
    };
  },
  methods: {
    // ... => spread Operator und verteilt die Properties im aktuellen Objekt
    ...mapActions('purchasing', ['updateBatteryVendors']),
    ...mapActions('purchasing', ['updateEngineVendors']),
    ...mapActions('purchasing', ['updateFrameVendors']),
    ...mapActions('purchasing', ['updateSensorsVendors']),
    ...mapActions('purchasing', ['saveVendorBattery']),
    ...mapActions('purchasing', ['saveVendorEngine']),
    ...mapActions('purchasing', ['saveVendorFrame']),
    ...mapActions('purchasing', ['saveVendorSensors']),
    ...mapActions('purchasing', ['getLastVendorBattery']),
    ...mapActions('purchasing', ['getLastVendorBatteryM']),
    ...mapActions('purchasing', ['getLastVendorEngine']),
    ...mapActions('purchasing', ['getLastVendorEngineM']),
    ...mapActions('purchasing', ['getLastVendorFrame']),
    ...mapActions('purchasing', ['getLastVendorFrameM']),
    ...mapActions('purchasing', ['getLastVendorSensors']),
    ...mapActions('purchasing', ['getLastVendorSensorsM']),
    ...mapMutations('purchasing', ['updateBatteryVendor']),
    ...mapMutations('purchasing', ['updateEngineVendor']),
    ...mapMutations('purchasing', ['updateFrameVendor']),
    ...mapMutations('purchasing', ['updateSensorsVendor']),
    toggleShowError() {
      this.showError = !this.showError;
    },
    async toggleDialog() {
      if(this.vendor === null) {
        this.toggleShowError();
      } else if(this.$store.state.purchasingStep >= 5){
        await this.updateBatteryVendors();
        await this.updateEngineVendors();
        await this.updateFrameVendors();
        await this.updateSensorsVendors();
        this.confirmChangesDialog = !this.confirmChangesDialog;
        await this.saveVendorBattery({
          amount: this.amount,
          quality: this.quality,
          totalCost: this.calculatedTotalCostBattery,
          costPerUnit: this.calculatedCostPerMaterialBattery
        });
        await this.saveVendorEngine({
          amount: this.amount,
          quality: this.quality,
          totalCost: this.calculatedTotalCostEngine,
          costPerUnit: this.calculatedCostPerMaterialEngine
        });
        await this.saveVendorFrame({
          amount: this.amount,
          quality: this.quality,
          totalCost: this.calculatedTotalCostFrame,
          costPerUnit: this.calculatedCostPerMaterialFrame
        });
        await this.saveVendorSensors({
          amount: this.amount,
          quality: this.quality,
          totalCost: this.calculatedTotalCostSensors,
          costPerUnit: this.calculatedCostPerMaterialSensors
        });
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
  async mounted() {
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

    await this.updateBatteryVendors();
    await this.updateEngineVendors();
    await this.updateFrameVendors();
    await this.updateSensorsVendors();
    await this.getLastVendorBattery();
    await this.getLastVendorBatteryM();
    await this.getLastVendorEngine();
    await this.getLastVendorEngineM();
    await this.getLastVendorFrame();
    await this.getLastVendorFrameM();
    await this.getLastVendorSensors();
    await this.getLastVendorSensorsM();
  },
  watch: {
    '$store.state.purchasingStep': function() {
      if(this.$store.state.purchasingStep === 0) {
        this.$store.state.purchasingStep++;
        this.nextPurchasingStep();
      }
    },
  },
};
</script>
