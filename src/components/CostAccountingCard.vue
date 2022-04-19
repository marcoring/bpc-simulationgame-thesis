<template>
  <div>
    <v-card rounded id="cost-accounting-card">
      <v-card-title
        :style="'background-color:' + this.$store.state.color + '!important'"
        style="color: white"
        >Cost Accounting
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
            <span>These fields reflect the last submitted changes.</span><br />
          </v-tooltip>
        </v-col>
      </v-card-title>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <!-- <tr
          v-for="item in items"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
          <td class="text-right"><v-icon @click="toggleShowDialog(); setItemValue(item.desc);">mdi-help</v-icon></td>
        </tr> -->
            <!-- Row Budget -->
            <tr>
              <td>Budget (EUR)</td>
              <td>
                {{ getBudget }}
              </td>
              <td class="text-right">
                <v-icon
                  @click="
                    toggleShowDialog();
                    setItemValue('This is your whole budget.');
                  "
                  >mdi-help</v-icon
                >
              </td>
            </tr>
            <!-- Row Est. Variable Costs -->
            <tr>
              <td>Estimated Variable Costs (EUR)</td>
              <td>
                {{ getVariableCosts }}
              </td>
              <td class="text-right">
                <v-icon
                  @click="
                    toggleShowDialog();
                    setItemValue(
                      'Running costs are needed for every day decisions.'
                    );
                  "
                  >mdi-help</v-icon
                >
              </td>
            </tr>
            <!-- Row Est. Cost Per Bike -->
            <tr>
              <td>Estimated Cost Per Bike (EUR)</td>
              <td>
                {{ getCostPerBike }}
              </td>
              <td class="text-right">
                <v-icon
                  @click="
                    toggleShowDialog();
                    setItemValue(
                      'Estimated average production costs per bike. This can help you to understand what price do you need to be profitable'
                    );
                  "
                  >mdi-help</v-icon
                >
              </td>
            </tr>
            <!-- Row Est. Total Quality -->
            <tr>
              <td>Estimated Total Quality (%)</td>
              <td>
                {{ getQuality }}
              </td>
              <td class="text-right">
                <v-icon
                  @click="
                    toggleShowDialog();
                    setItemValue(
                      'This value influences how many bicycles are broken.'
                    );
                  "
                  >mdi-help</v-icon
                >
              </td>
            </tr>
            <!-- Row Production Capacity -->
            <tr>
              <td>Overall Maximum Production Capacity (PC)</td>
              <td>
                {{ getCapacity }}
              </td>
              <td class="text-right">
                <v-icon
                  @click="
                    toggleShowDialog();
                    setItemValue(
                      'You cannot produce not more bikes than this value'
                    );
                  "
                  >mdi-help</v-icon
                >
              </td>
            </tr>
            <!-- Row Market Demand -->
            <tr>
              <td>Overall Market Demand (PC)</td>
              <td>
                {{ getDemand }}
              </td>
              <td class="text-right">
                <v-icon
                  @click="
                    toggleShowDialog();
                    setItemValue(
                      'Oversupply is an excessive amount of a product. Oversupply results when demand is lower than supply, resulting in a surplus. Simply put, an oversupply is when there is more product for sale than people are prepared to buy.'
                    );
                  "
                  >mdi-help</v-icon
                >
              </td>
            </tr>
            <!-- Row Market Demand -->
            <tr>
              <td>Estimated Customer Satisfaction (%)</td>
              <td>
                {{ getSatisfaction }}
              </td>
              <td class="text-right">
                <v-icon
                  @click="
                    toggleShowDialog();
                    setItemValue(
                      'Due to the choosen decisions this value reflects the estimated customer satisfaction.'
                    );
                  "
                  >mdi-help</v-icon
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <cost-accounting-dialog
      v-if="showDialog"
      @closeDialog="toggleShowDialog"
      :itemDescription="this.currentItemValue"
    ></cost-accounting-dialog>
  </div>
</template>

<script>
import CostAccountingDialog from "../dialogs/CostAccountingDialog.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import index from "../stores/index";

export default {
  name: "cost-accounting-card",
  components: { CostAccountingDialog },
  computed: {
    ...mapGetters("lastGame", ["gameData"]),
    getBudget: function () {
      return index != null ? index.getters.gameData.Budget : "";
    },
    getVariableCosts: function () {
      return index != null ? index.getters.gameData.Runningcost : "";
    },
    getCostPerBike: function () {
      return index != null ? index.getters.gameData.Costperbike : "";
    },
    getQuality: function () {
      return index != null ? index.getters.gameData.Quality : "";
    },
    getCapacity: function () {
      return index != null ? index.getters.gameData.Productioncapacity : "";
    },
    getDemand: function () {
      return index != null ? index.getters.gameData.Demand : "";
    },
    getSatisfaction: function () {
      return index != null ? index.getters.gameData.Customersatisfaction : "";
    },
  },
  data() {
    return {
      showDialog: false,
      currentItemValue: "",
      expanded: [],
    };
  },
  methods: {
    ...mapActions("lastGame", ["updateGameData"]),
    ...mapMutations("lastGame", ["updateGameData"]),
    toggleShowDialog() {
      this.showDialog = !this.showDialog;
    },
    setItemValue(value) {
      this.currentItemValue = value;
    },
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
