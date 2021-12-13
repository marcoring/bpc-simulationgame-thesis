<template>
    <v-container>
        <v-row class="pa-10 text-center">
            <v-col v-for="element in calculatedProgressElements" :key="element.id">
                 <div style="height: 120px" class="text-center">
                    <v-icon color="black" large>{{ element.icon }}</v-icon>
                    <h3 v-bind:style="addPadding(element.text)" class="line-height">{{ element.text }}</h3>
                 </div>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
           calculatedProgressElements: [
                { id: 1, text: 'Purchasing', icon: 'mdi-shopping-outline' },
                { id: 2, text: 'Logistics', icon: 'mdi-truck' },
                { id: 3, text: 'Frame Preparation', icon: 'mdi-bicycle' },
                { id: 4, text: 'Sensor Preparation', icon: 'mdi-chip' },
                { id: 5, text: 'Battery Preparation', icon: 'mdi-pac-man' },
                { id: 6, text: 'Engine Preparation', icon: 'mdi-battery-charging-high' },
                { id: 7, text: 'Bike Construction', icon: 'mdi-tools' },
                { id: 8, text: 'Application Development', icon: 'mdi-cellphone' },
                { id: 9, text: 'Quality Assurance', icon: 'mdi-quality-high' },
                { id: 10, text: 'Sales', icon: 'mdi-currency-eur' },
            ],
            boolVariable: false
        }
    },
    methods: {
        addPadding(value) {
            const paddingNeeded = value === 'Purchasing' || value === 'Logistics' || value === 'Sales';
            if(paddingNeeded) {
                return 'margin-top: 30px;';
            } else {
                return '';
            }
           
        }
    }
}
</script>


<style scoped>
.line-height {
    line-height: 30px;
}
</style>