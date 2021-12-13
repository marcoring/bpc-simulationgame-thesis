<template>
  <v-navigation-drawer app permanent expand-on-hover fixed :color="teamColor">
        <v-list-item to="dashboard">
          <v-list-item-icon>
            <v-icon style="color:white">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="list-item">Dashboard</v-list-item-title>
        </v-list-item>

        <v-divider />

        <v-list-item :to="charts">
          <v-list-item-icon >
            <v-icon style="color:white">mdi-chart-line</v-icon>
          </v-list-item-icon>
           <v-list-item-title  class="list-item">Statistics</v-list-item-title>
        </v-list-item>

        <v-list-item @click="showTodo">
          <v-list-item-icon >
            <v-icon style="color:white">mdi-list-status</v-icon>
          </v-list-item-icon>
           <v-list-item-title  class="list-item">Show todo</v-list-item-title>
        </v-list-item>
        
        <v-list-item :to="chat">
          <v-list-item-icon >
            <v-icon style="color:white">mdi-pencil-circle-outline</v-icon>
          </v-list-item-icon>
           <v-list-item-title  class="list-item">Write to admin</v-list-item-title>
        </v-list-item>

        <v-list-item @click="panicButton">
          <v-list-item-icon>
            <v-icon style="color:white">mdi-fire</v-icon>
          </v-list-item-icon>
            <v-list-item-title class="list-item">Panic button</v-list-item-title>
        </v-list-item>

        <v-list-item @click="toggleRoundRules">
          <v-list-item-icon>
            <v-icon style="color:white">mdi-clipboard-list</v-icon>
          </v-list-item-icon>
            <v-list-item-title class="list-item">Round Rules</v-list-item-title>
        </v-list-item>

        <v-list-item @click="toggleGeneralRules">
          <v-list-item-icon>
            <v-icon style="color:white">mdi-format-list-numbered</v-icon>
          </v-list-item-icon>
            <v-list-item-title class="list-item">General Rules</v-list-item-title>
        </v-list-item>

        <v-list-item @click="showVisualGuide">
          <v-list-item-icon>
            <v-icon style="color:white">mdi-transit-connection-variant</v-icon>
          </v-list-item-icon>
            <v-list-item-title class="list-item">Show visual guide</v-list-item-title>
        </v-list-item>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ['calculatedProgressElements', 'round'],
  methods: {
    showTodo() {
      this.$emit('showTodo');
    },
    toggleRoundRules() {
      this.$emit('toggleRoundRules');
    },
    toggleGeneralRules() {
      this.$emit('toggleGeneralRules');
    },
    toggleChat() {
      this.$emit('toggleChat');
    },
    endRound() {
      this.$emit('endRound');
    },
    panicButton() {
      this.$emit('togglePanicButton');
      this.sendNotificationToServer();
    },
    showVisualGuide() {
      const routName = this.$route.name;

      if(routName === 'Dashboard') {
        this.$store.state.dashboardStep = 0;
      } else if(routName === 'Purchasing') {
        this.$store.state.purchasingStep = 0;
      } else if(routName === 'Logistics') {
        this.$store.state.logisticStep = 0;
      } else if(routName === 'FramePreparation') {
        this.$store.state.frameStep = 0;
      } else if(routName === 'SensorsPreparation') {
        this.$store.state.sensorStep = 0;
      } else if(routName === 'BikeConstruction') {
        this.$store.state.bikeStep = 0;
      } else if(routName === 'Sales') {
        this.$store.state.salesStep = 0;
      }
    }
  },
  data() {
    return {
      charts: "/charts",
      chat: "/chat",
      teamColor: this.$store.state.color
    }
  }
}
</script>


<style scoped>
.list-item {
  text-align: left;
  color:white;
}
</style>