<template>
  <div>
    <v-card rounded id="cost-accounting-card">
    <v-card-title 
      :style="'background-color:' + this.$store.state.color +'!important'" 
      style="color: white"
    >Cost accounting</v-card-title>
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
        {name: 'Budget', value: 10.0, desc: 'This is your whole budget.'},
        {name: 'Running costs', value: 222.3, desc: 'Running costs are needed for every day decisions.'},
        {name: 'Average production cost per bike', value: 'Incomplete', desc: 'This can help you to understand what price do you need to be profitable'},
        {name: 'Estimated quality', value: 21.29, desc: 'This value influences how many bicycles are broken.'},
        {name: 'Maximum production capability', value: 'Incomplete', desc: 'You cannot produce not more bikes than this value'},
        {name: 'Over demand', value: 40000, desc: 'Oversupply is an excessive amount of a product. Oversupply results when demand is lower than supply, resulting in a surplus. Simply put, an oversupply is when there is more product for sale than people are prepared to buy.'},
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
