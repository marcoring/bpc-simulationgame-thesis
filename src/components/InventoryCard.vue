<template>
  <div>
    <v-card rounded id="inventory-card">
      <v-card-title
        :style="'background-color:' + this.$store.state.color + '!important'"
        style="color: white"
        >Inventory
        <!-- Hover Me -->
        <v-col align="end">
          <v-tooltip bottom :color="teamColor">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :color="teamColor"
                v-bind="attrs"
                v-on="on"
                small
                elevation="15"
              >
                <v-icon>mdi-chat-question </v-icon>
              </v-btn>
            </template>
            <span
              >These data show the inventory carried over from the previous
              round and the corresponding warehousing cost included in this
              rounds runningcost.</span
            ><br />
          </v-tooltip>
        </v-col>
      </v-card-title>

      <v-simple-table>
        <template v-slot:default>
          <v-row class="ml-5 mt-3">
            <h2 class="ml-2">Purchased Material</h2>
          </v-row>
          <v-row>
            <v-col class="ml-16 mb-5 mt-5">
              <tbody>
                <h4 class="ml-8">Standard</h4>
                <tr>
                  <td class="ml-8 mt-2 mr-2">Battery (PC):</td>
                  <td class="ml-8 mt-2">
                    {{ getBattery }}
                  </td>
                </tr>
                <!-- Row Engine -->
                <tr>
                  <td class="ml-8 mt-2 mr-2">Engine (PC):</td>
                  <td class="ml-8 mt-2">
                    {{ getEngine }}
                  </td>
                </tr>
                <!-- Row Frame -->
                <tr>
                  <td class="ml-8 mt-2 mr-2">Frame (PC):</td>
                  <td class="ml-8 mt-2">
                    {{ getFrame }}
                  </td>
                </tr>
                <!-- Row Sensors -->
                <tr>
                  <td class="ml-8 mt-2 mr-2">Sensors (PC):</td>
                  <td class="ml-8 mt-2">
                    {{ getSensors }}
                  </td>
                </tr>
                <div></div>
              </tbody>
            </v-col>

            <v-col class="mb-5 mt-5 mr-10">
              <tbody>
                <h4 class="ml-8">Granulate</h4>
                <tr class="mt-2">
                  <td class="mt-2 mr-2 mr-2">Battery (PC):</td>
                  <td class="mt-2 ml-2 mr-2">
                    {{ getBatteryGranulate }}
                  </td>
                </tr>
                <!-- Row Engine -->
                <tr class="mt-2">
                  <td class="mt-2 mr-2">Engine (PC):</td>
                  <td class="mt-2 ml-2">
                    {{ getEngineGranulate }}
                  </td>
                </tr>
                <!-- Row Frame -->
                <tr class="mt-2">
                  <td class="mt-2 mr-2">Frame (PC):</td>
                  <td>
                    {{ getFrameGranulate }}
                  </td>
                </tr>
                <tr class="mt-2">
                  <td class="mt-2 mr-2">Sensors (PC):</td>
                  <td class="mt-2">
                    {{ getSensorsGranulate }}
                  </td>
                </tr>
              </tbody>
            </v-col>
          </v-row>

          <div></div>

          <v-row>
            <v-col class="ml-16 mb-5 mt-5">
              <tbody>
                <h4 class="ml-8 mt-2">Prepared</h4>
                <tr>
                  <td class="ml-8 mt-2 mr-2">Battery (PC):</td>
                  <td class="ml-8 mt-2">
                    {{ getBatteryPrepared }}
                  </td>
                </tr>
                <!-- Row Engine -->
                <tr>
                  <td class="ml-8 mt-2 mr-2">Engine (PC):</td>
                  <td class="ml-8 mt-2">
                    {{ getEnginePrepared }}
                  </td>
                </tr>
                <!-- Row Frame -->
                <tr>
                  <td class="ml-8 mt-2 mr-2">Frame (PC):</td>
                  <td class="ml-8 mt-2">
                    {{ getFramePrepared }}
                  </td>
                </tr>
                <tr>
                  <td class="ml-8 mt-2 mb-2 mr-2">Sensors (PC):</td>
                  <td class="ml-8 mt-2 mb-2">
                    {{ getSensorsPrepared }}
                  </td>
                </tr>
              </tbody>
            </v-col>

            <v-col class="mb-5 mt-5 mr-10">
              <tbody>
                <h4 class="ml-8">More Information</h4>
                <tr>
                  <td class="mt-2 mr-2 mr-2">
                    Bikes before Quality Assurance (PC):
                  </td>
                  <td class="mt-2 ml-2">
                    {{ getBikesBeforeQA }}
                  </td>
                </tr>
                <tr>
                  <td class="mt-2 mr-2 mr-2">
                    Bikes after Quality Assurance (PC):
                  </td>
                  <td class="mt-2 ml-2">
                    {{ getBikesAfterQA }}
                  </td>
                </tr>
                <tr>
                  <td class="mt-2 mb-2 mr-2">Warehousing Cost (PC):</td>
                  <td class="mt-2 ml-2">
                    {{ getWarehousingCost }}
                  </td>
                </tr>
              </tbody>
            </v-col>
          </v-row>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "inventory-card",
  computed: {
    ...mapGetters(["gameDataInventory", "gameData"]),
    getBattery: function () {
      console.log("this.gameDataInventory", this.gameDataInventory);
      return this.gameDataInventory != null
        ? this.gameDataInventory.Amountbat
        : 0;
    },
    getEngine: function () {
      return this.gameDataInventory != null
        ? this.gameDataInventory.Amounteng
        : 0;
    },
    getFrame: function () {
      return this.gameDataInventory != null
        ? this.gameDataInventory.Amountfr
        : 0;
    },
    getSensors: function () {
      return this.gameDataInventory != null
        ? this.gameDataInventory.Amountsen
        : 0;
    },
    getBatteryGranulate: function () {
      return this.gameDataInventory != null
        ? this.gameDataInventory.Amountbatgr
        : 0;
    },
    getEngineGranulate: function () {
      return this.gameDataInventory != null
        ? this.gameDataInventory.Amountenggr
        : 0;
    },
    getFrameGranulate: function () {
      return this.gameDataInventory != null
        ? this.gameDataInventory.Amountfrgr
        : 0;
    },
    getSensorsGranulate: function () {
      return this.gameDataInventory != null
        ? this.gameDataInventory.Amountsengr
        : 0;
    },
    getBatteryPrepared: function () {
      return this.gameDataInventory != null
        ? this.gameDataInventory.Amountprodbat
        : 0;
    },
    getEnginePrepared: function () {
      return this.gameDataInventory != null
        ? this.gameDataInventory.Amountprodsen
        : 0;
    },
    getFramePrepared: function () {
      return this.gameDataInventory != null
        ? this.gameDataInventory.Amountprodfr
        : 0;
    },
    getSensorsPrepared: function () {
      return this.gameDataInventory != null
        ? this.gameDataInventory.Amountprodsen
        : 0;
    },
    getBikesBeforeQA: function () {
      return this.gameDataInventory != null
        ? this.gameDataInventory.Amountcon
        : 0;
    },
    getBikesAfterQA: function () {
      return this.gameDataInventory != null
        ? this.gameDataInventory.Amountqa
        : 0;
    },
    getWarehousingCost: function () {
      return this.gameDataInventory != null ? this.gameData.Warehousingcost : 0;
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["updateGameDataInventory"]),
    ...mapMutations(["updateGameDataInventory"]),
    ...mapActions(["updateGameData"]),
    ...mapMutations(["updateGameData"]),
  },
  async mounted() {
    await this.updateGameDataInventory(), await this.updateGameDataInventory();
  },
};
</script>

<style>
.v-data-table td {
  font-size: 14pt !important;
}
.v-data-table th {
  font-size: 14pt !important;
}
</style>
