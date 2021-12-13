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
      timerCount: 5,
      rules: {
       round1Rules:
          "The first round is an introductory round. IoT bikes are an innovation and they are not very popular yet. The current demand on the whole market is 1.000 bikes. For now, only standard bikes are available, which consist of a frame and ten sensors. In this round, the following important decisions can be made:",
        round1Keywords: [
          "Purchasing process: An initial vendor selection has to be made for the required components to produce the bikes.",
          "Production processes: It can be decided how many assembly lines should be used in the different production steps.",
          "Sales process: There is an option for an Online Shop which boosts the sales numbers.",
        ],
        round2Rules:
          "Every team gets 100.000 EUR on the top of the profit they earned during the first round. It will help everyone who suffered from big losses. At this stage, IoT bikes are starting to gain popularity. The demand grows up to 6.000 bikes. Furthermore, it is now possible to produce Standard Pro bikes, that contain a battery as further component. New features for the current round are as follows:",
        round2Keywords: [
          "Production processes: An additional production step is required to prepare the batteries for production. Furthermore, it is possible to buy automated assembly lines in which the production process is cheaper and the capacity is better.",
          "Quality assurance: There is a possibility to choose between internal and external vendors.",
          "Sales process: Online marketing is available to make sales more efficient. Furthermore, sales can be split to two different products (Standard and Standard Pro).",
        ],
        round3Rules:
          "Finally, IoT Bikes have a great success and the demand increases up to 35.000 bikes. Furthermore, Premium bikes can be produced by now, which additionally contain an engine. New features for the current round are as follows:",
        round3Keywords: [
          "Production processes: An additional production step is required to prepare the engines for production. Furthermore, automated assembly lines with predictive maintenance are available (improved capacity and less expenses).",
          "Sales process: Automatic market analyser base on deep learning can be chosen. Moreover, sales can be split to three different products (Standard, Standard Pro, Premium)",
          "Quality assurance: some external vendors now offer a robot-based solution for the Quality assurance process.",
        ],
        round4Rules:
          "The popularity of IoT Bikes reaches towards its peak. Demand has risen up to 40.000 bikes. New features for round four are as follows:",
        round4Keywords: [
          "Production processes: Smart assembly lines (robots move parts between them) are available.",
          "Sales process: Drone-based delivery to the customers can be chosen additionally.",
          "Application development and maintenance: One can choose an appropriate outsourcing company for application development.",
        ],
        round5Rules:
          "The growth of popularity only increases slightly, up to 45.000 bikes. The teams have the possibility to establish their offerings and further increase their profit.",
        round6Rules:
          "The growth of popularity only increases slightly, up to 50.000 bikes. The teams have the possibility to establish their offerings and further increase their profit.",
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
