<template>
    <v-dialog width="80%" height="80%" v-model="dialog" @click:outside="closeDialog" :persistent="!roundRulesCanbeClosed">
            <v-card id="roundRulesCard">
    
            <v-card-title
                :style="'background-color:' + teamColor + '!important'"
                style="color: white"
            >
                Rules for round {{ round }}
            <v-spacer />
            </v-card-title>

            <!-- Round Rules -->
            <v-card-text>
                <div class="text-left round-rules">
                    <p>{{ findRoundRules }}</p>
                    <ul>
                        <li v-for="item in findRoundKeywords" :key="item">
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </v-card-text>

            <v-divider />

            <v-card-actions>
                <v-spacer />
                <v-btn v-if="this.roundRulesCanbeClosed" color="red" @click="closeDialog" dark text>
                  Close
                </v-btn>
                <v-btn v-else @click="closeDialog" disabled>
                  You can close rules in {{this.timerCount}} seconds
                </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      // TODO set timerCount to 5
      timerCount: 0,
      rules: {
       round1Rules:
          "Welcome to the Bike Simulation Game! Here you are the CEO of your own bike manufacturing company. Therefore, you have to manage multiple processes for each round. All process tiles have their own info button. Good luck!",
          // "The first round is an introductory round. IoT bikes are an innovation and they are not very popular yet. The current demand on the whole market is 1.000 bikes. For now, only standard bikes are available, which consist of a frame and ten sensors. In this round, the following important decisions can be made:",
        round1Keywords: [
          "Purchase materials you can prepare and then assemlbe into bikes.",
          "Decide for a good external partner that will handle your logistics.",
          "Choose a right process to prepare you frame material for the bike assembly.",
          "Choose a right process to prepare you sensors material for the bike assembly.",
          "Choose a right process to prepare you engine material for the bike assembly.",
          "Choose a right process to prepare you battery material for the bike assembly.",
          "Manage your bike assembly process.",
          "Develop and mantain your own application.",
          "Decide between different options for a quality assurance process.",
          "Sell bikes produced to ensure profitability.",
          "Good Luck!"
          // "Production processes: It can be decided how many assembly lines should be used in the different production steps.",
          // "Sales process: There is an option for an Online Shop which boosts the sales numbers.",
        ],
        round2Rules:
          "Every team gets 100.000 EUR on the top of the profit they earned during the first round. It will help everyone who suffered from big losses. At this stage, IoT bikes are starting to gain popularity. The demand grows up to 6.000 bikes. Furthermore, it is now possible to produce Standard Pro bikes, that contain a battery as further component. New features for the current round are as follows:",
        round2Keywords: [
          "Production processes: An additional production step is required to prepare the batteries for production. Furthermore, it is possible to buy automated assembly lines in which the production process is cheaper and the capacity is better.",
          "Quality assurance: There is a possibility to choose between internal and external vendors.",
          "Sales process: Online marketing is available to make sales more efficient. Furthermore, sales can be split to two different products (Standard and Standard Pro).",
          "Good Luck!"
        ],
        round3Rules:
          "Welcome to round 3! Check out these new features:",
        round3Keywords: [
          "Costumize your bike parts.",
          "Automatic production with predictive maintenance is now possible.",
          "You can now choose robotic quality assurance options.",
          "Analyze markets based on deep learning.",
          "Good Luck & May the Force be with you!"
        ],
        round4Rules:
          "Welcome to round 4!",
        round4Keywords: [
          "You can now deliver your items with the help of drones.",
          "This is your last round",
          "Good luck again!"
        ],
        round5Rules:
          "Game Over! The Game ends at this point. Thank you for participating.",
      },
      dialog: true,
      teamColor: this.$store.state.color,
      round: this.$store.state.round
    };
  },
  computed: {
    roundRulesCanbeClosed() {
      return this.$store.state.roundRulesRead || this.timerCount === 0;
    },
    findRoundRules() {
      switch (this.round) {
        case 1:
          return this.rules.round1Rules;
        case 2:
          return this.rules.round2Rules;
        case 3:
          return this.rules.round3Rules;
        case 4:
          return this.rules.round4Rules;
        case 5:
          return this.rules.round5Rules;
        case 6:
          return this.rules.round6Rules;
        default:
          return this.rules.round1Rules;
      }
    },
    findRoundKeywords() {
      switch (this.round) {
        case 1:
          return this.rules.round1Keywords;
        case 2:
          return this.rules.round2Keywords;
        case 3:
          return this.rules.round3Keywords;
        case 4:
          return this.rules.round4Keywords;
        case 5:
          return null;
        case 6:
          return null;
        default:
          return null;
      }
    },
  },
  props: {
    generalRules: Boolean,
    headerImage: Boolean,
  },
  methods: {
      closeDialog() {
        if(this.timerCount === 0 || this.$store.state.roundRulesRead) {
          this.$emit('closeRules');
          this.$store.state.roundRulesRead = true;
        }
      }
  },
  watch: {
    timerCount: {
        handler(value) {
            if (value > 0) {
                setTimeout( 
                    () => {this.timerCount--;}, 
                    1000 
                );
            }
        },
        immediate: true // This ensures the watcher is triggered upon creation
      }
  }
};
</script>


<style scoped>
.round-rules {
    margin-top: 15px;
    font-size: 20pt;
    line-height: 35px;
}
</style>
