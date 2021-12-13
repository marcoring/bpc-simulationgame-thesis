<template>
  <v-container id="dashboard">
    <v-row v-if="this.$store.state.blockGame">
      <v-col align="center">
        <div>
          <h1>
            <span style="color: green">Game is blocked. Wait until administrator finishes round.</span> 
          </h1>
        </div>
      </v-col>
    </v-row>

    <!-- Linear Progress-Bar -->
    <div ref="round-items">
      <v-row class="pa-6 text-left" ref="progress-bar">
        <h2>Round {{ this.$store.state.round }}</h2>
        <v-progress-linear
          style="border-radius: 10px"
          :color="teamColor"
          height="30"
          :value="calculateProgress"
          rounded
          striped
        >
          <strong>{{ calculateProgress }}%</strong>
        </v-progress-linear>
      </v-row>

      <!-- Circular Progress-Bars with Pop-Overs -->
      <v-row class="pa-10 text-center" >
        <v-col v-for="element in calculatedProgressElements" :key="element.id">
          <v-tooltip bottom content-class='custom-tooltip' >
            <template v-slot:activator="{ on, attrs }">
              <v-progress-circular
                :id="element.id"
                :width="15"
                :rotate="-90"
                :size="100"
                :value="element.value"
                @click="navigateToElement(element.id)"
                style="cursor: pointer;"
                :class="calculateClass(element)"
                class="item"
                :color="teamColor"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon color="black" large>{{ element.icon }}</v-icon>
              </v-progress-circular>
            </template>
          </v-tooltip>
          <h3 v-show="showName(element)">{{ element.name }}</h3>
        </v-col>
      </v-row>
    </div>

    <v-row v-if="this.$store.state.dashboardStep <= 4" ref="guide-btn" class="pa-2">
      <v-col align="left" cols="9">
        <div>
          <h2>
            {{ this.stepText }}<span v-if="this.$store.state.dashboardStep <= 2" style="color: green"> Next step is always highlighted green.</span> 
          </h2>
        </div>
      </v-col>
      <v-col align="right">
        <v-btn @click="nextDashboardStep" link dark rounded :color="teamColor">
          <b>I understand</b>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Cards -->
    <v-row class="pa-6 text-left" ref="cards">
      <v-col>
        <cost-accounting-card style="height:100%"/>
      </v-col>
    </v-row>

    <!-- Leaderboard -->
    <v-row class="pa-6 text-left" ref="leaderboard">
      <v-col>
        <teams-leaderboard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TeamsLeaderboard from "../components/TeamsLeaderboard.vue";
import CostAccountingCard from "../components/CostAccountingCard.vue";

export default {
  components: {CostAccountingCard, TeamsLeaderboard},
  data() {
    return {
      teamColor: this.$store.state.color,
      stepText: ''
    };
  },
  watch: {
    '$store.state.dashboardStep': function() {
      if(this.$store.state.dashboardStep === 0) {
        this.$store.state.dashboardStep++;
        this.nextDashboardStep();
      }
    }
  },
  methods: {
    showName(element) {
      return element.requiredRound <= this.$store.state.round;
    },
    calculateClass(element) {
      if(this.$store.state.nextStep === element.id && this.$store.state.nextStep !== 'none') {
        return 'grounded-radiants';
      } else {
        return '';
      }
    },
    nextDashboardStep() {
      if(this.$store.state.dashboardStep === 1) {
        this.stepText = 'Here you can see all your steps. On the left side is the first step and on the right side is the last one. But you can jump between them as you want! The next step is always highlighted green.';
        this.firstStep();
      } else if(this.$store.state.dashboardStep === 2) {
        this.stepText = 'Here you can find useful data about your current financial situation';
        this.secondStep();
      } else if(this.$store.state.dashboardStep === 3){
        this.stepText = 'And here you can compare your team with others! Every single decision can get you to #1';
        this.thirdStep();
      } else {
        this.finalStep();
      }

      this.$store.state.dashboardStep++;
    },
    firstStep() {
      this.$emit('toggleMenuVisability');

      this.setOpacity("cards", 0.3);
      this.setOpacity("leaderboard", 0.3);

      this.setBorder("round-items");
    },
    secondStep() {
      this.setOpacity("round-items", 0.3);
      this.setOpacity("cards", 1);

      this.resetBorder("round-items");
      this.setBorder("cards");
    },
    thirdStep() {
      this.setOpacity("cards", 0.3);
      this.setOpacity("leaderboard", 1);

      this.resetBorder("cards");
      this.setBorder("leaderboard");
    },
    finalStep() {
      this.$emit('toggleHeaderVisability');
      this.$emit('toggleMenuVisability');

      this.resetBorder("leaderboard");
      this.setOpacity("leaderboard", 1);
      this.setOpacity("round-items", 1);
      this.setOpacity("cards", 1);
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
    navigateToElement(elementId) {
      if(this.$store.state.dashboardStep >= 5 && !this.$store.state.blockGame) {
        this.$router.push(elementId);
      }
    }
  },
  computed: {
    calculatedProgressElements() {
      return this.progressElements.filter(
        (element) => element.requiredRound <= this.$store.state.round
      );
    },
    calculateProgress() {
      const prEl = this.progressElements;
      var sum = 0;
      var stepsNumber = 0;
      var isPrElAllowed = false;
      for (var i = 0; i < prEl.length; i++) {
        isPrElAllowed = this.$store.state.round >= prEl[i].requiredRound;
        sum += isPrElAllowed ? prEl[i].value : 0;
        stepsNumber += isPrElAllowed ? 1 : 0;
      }
      return Math.ceil(sum / stepsNumber);
    },
    determineStepsNumber() {
      /*
        In each new round (totally 6) user
        gets some new production-steps
      */
      switch (this.$store.state.round) {
        case 1:
          // (Purchasing, Logistics, Frame Preparation, Sensors Preparation, Bike Construction, Sales)
          return 6;
        case 2:
          // + (Battery Preparation, Quality Assurance)
          return 8;
        case 3:
          // + (Engine Preparation)
          return 9;
        case (4, 5, 6):
          // + (Application Development and Maintenance)
          return 10;
        default:
          // invalid case
          return 0;
      }
    },
  },
  props: {progressElements: Array,teamName: String,},
  mounted() {
    if(this.$store.state.dashboardStep <= 3) {
      this.nextDashboardStep();
    }    
  }
};
</script>

<style scoped>
.grounded-radiants {
    position: relative;
    border: 1px solid transparent;
    border-radius: 50px;
    background: rgb(220, 255, 220);
    background-clip: padding-box;
    padding: 10px;
    box-shadow: 0 0 25px rgba(1, 248, 1, 0.733);
}

.grounded-radiants::after {
    z-index: -1;
}
.custom-tooltip {
  opacity: 0 !important;
}
.item:hover {
  border-radius: 50px;
  box-shadow: 0 0 23px rgba(0, 13, 126, 0.603);
}
</style>
