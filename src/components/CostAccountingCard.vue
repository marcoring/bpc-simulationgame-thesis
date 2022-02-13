<template>
  <div>
    <v-card rounded id="cost-accounting-card">
    <v-card-title 
      :style="'background-color:' + this.$store.state.color +'!important'" 
      style="color: white"
    >Cost accounting
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
        <span>These fields reflect the last submitted changes.</span><br>
        </v-tooltip>
        </v-col>
    


    </v-card-title>
    <v-simple-table>
    <template v-slot:default>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
          <td class="text-right"><v-icon @click="toggleShowDialog(); setItemValue(item.desc);">mdi-help</v-icon></td>
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
import CostAccountingDialog from '../dialogs/CostAccountingDialog.vue';

export default {
  name: "cost-accounting-card",
  components: {CostAccountingDialog},
  data() {
   return {
      showDialog: false,
      currentItemValue: '',
      expanded: [],
      items: [
        {name: 'Cash', value: 10000000.00, desc: 'This is your whole budget.'},
        {name: 'Estimated variable costs', value: 0.00, desc: 'Running costs are needed for every day decisions.'},
        {name: 'Estimated average production cost per bike', value: 0.00, desc: 'This can help you to understand what price do you need to be profitable'},
        {name: 'Estimated total quality', value: 0.00, desc: 'This value influences how many bicycles are broken.'},
        {name: 'Maximum production capability', value: 0.00, desc: 'You cannot produce not more bikes than this value'},
        {name: 'Overall market demand', value: 60000, desc: 'Oversupply is an excessive amount of a product. Oversupply results when demand is lower than supply, resulting in a surplus. Simply put, an oversupply is when there is more product for sale than people are prepared to buy.'},
        {name: 'Estimated customer satisfaction', value: 'Incomplete', desc: 'Due to the choosen decisions this value reflects the estimated customer satisfaction.'},
      ]
   }
  },
  methods: {
    toggleShowDialog() {
      this.showDialog = !this.showDialog;
    },
    setItemValue(value) {
      this.currentItemValue = value;
    }
  }
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
