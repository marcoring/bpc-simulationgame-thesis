<template>
    <v-dialog width="80%" height="80%" v-model="dialog" persistent>
        <v-card>
            <v-card-title :style="'background-color:' + teamColor + '!important'" style="color: white">
                General Rules Guide
                <v-spacer />
            </v-card-title>

            <v-card-text>
               <div class="rules-text" v-if="this.currentRuleNumber == 0">
                    <div class="text-passage">
                        <h2>Welcome to the business game!</h2>
                        <h4 :style="'color:' + teamColor">You are now the owner of the bike manufacturing company (Bike Inc.)</h4>
                    </div>
                    <div class="text-passage text-counter">
                        Please read these rules <b>carefully</b> and <b>thoroughly</b>!
                    </div>
                    <div class="text-passage text-counter">
                        The game consists of <b>6 rounds</b>, during which the players make various decisions in up to <b>10 process steps</b>: 
                        <game-steps :temaColor="teamColor"></game-steps>
                    </div>
                </div>
                <div class="rules-text" v-if="this.currentRuleNumber == 1">
                    <div class="text-passage">
                        <h4 :style="'color:' + teamColor">How to play?</h4>
                    </div>
                    <span class="text-passage text-counter second-plate">
                        <b>The goal of the game is to design the production and sales of the IoT bikes in a way that it is possible to earn more than the other teams.</b>
                    </span>
                    <span class="text-passage text-counter second-plate">
                        The decisions are different in every round. More details on each round can be read in the corresponding section. 
                    </span>
                    <span class="text-passage text-counter second-plate">
                        If you have any questions regarding the particular input field, just hover the mouse over the questionmark next to it. This will give you an explanation of the field's purpose. 
                    </span>
                    <span class="text-passage text-counter second-plate">
                        After each round, the profit for each team will be calculated. The team with the highest profit at the end of the sixth round is the winner.
                    </span>
                </div>
                <div class="rules-text" v-if="this.currentRuleNumber == 2">
                    <div class="text-passage">
                        <h4 :style="'color:' + teamColor">Navigation in the game</h4>
                    </div>
                    <span class="text-passage text-counter second-plate">
                        In order to save the data for each process step, the player has to click the <b>'Confirm'</b> button at the bottom of the screen. Otherwise, the data <b>WILL NOT</b> be saved. 
                    </span>
                    <span class="text-passage text-counter second-plate">
                        However, the impact of the entered data on the budget, running cost, and production capacity will be visible in the lower cost accounting section. This should help the players with their decision making.
                    </span>
                    <span class="text-passage text-counter second-plate">
                        The upper part of the screen displays the latest data. Clicking on the button in the top right corner will return the player to the main screen.
                    </span>
                </div>
                <div class="rules-text" v-if="this.currentRuleNumber == 3">
                    <div class="text-passage">
                        <h4 :style="'color:' + teamColor">Different parameters in the game</h4>
                    </div>
                    <span class="text-passage text-counter second-plate">
                        Be careful when choosing the '<b>Safety</b>' parameter in the different production steps. 
                    </span>
                    <span class="text-passage text-counter second-plate">
                        If this parameter is <b>too low</b>, the number of defective bikes could be tremendous, which makes it <b>impossible to sell</b> many bikes despite of all the efforts.
                    </span>
                    <span class="text-passage text-counter second-plate">
                        A parameter that can influence the sales numbers is the <b>quality of a bicycle</b>. However, all process steps have a different influence on the final product quality, depending on the round that is being played. 
                    </span>
                    <span class="text-passage text-counter second-plate">
                        Listen carefully to the information in the introduction to the round, this might give you some hints which steps are more important than others.
                    </span>
                </div>

                <div class="rules-text" v-if="this.currentRuleNumber == 4">
                    <div class="text-passage">
                        <h4 :style="'color:' + teamColor">Last recommendations</h4>
                    </div>
                    <span class="text-passage text-counter second-plate">
                        After all necessary data has been submitted, do not forget to click the '<b>End round</b>' button in the top right corner of the main screen. 
                    </span>
                    <span class="text-passage text-counter second-plate">
                        <b>Be careful - changes will be IMPOSSIBLE after clicking this button.</b>
                    </span>
                    <span class="text-passage text-counter second-plate">
                        This will notify the teacher that a team is ready and allow him to start the simulation. The player will be notified about the simulation results. 
                    </span>
                    <span class="text-passage text-counter second-plate">
                        After that, he or she will be able to view the statistics of the simulated round, the revenue and the sales numbers of all competing teams, and the game will be unlocked for the input of data for the next round.
                    </span>
                </div>
            </v-card-text>
            
            <v-divider />

            <v-card-actions v-if="this.$store.state.generalRulesRead" class="card-actions">
                <v-btn :color="teamColor" @click="back" dark left>
                    Back
                </v-btn>
                <v-spacer />
                <v-btn color="red" @click="closeDialog" dark text>
                    Close
                </v-btn>

                <v-btn :color="teamColor" @click="next" dark right>
                    Next
                </v-btn>
            </v-card-actions>
            <v-card-actions v-else class="card-actions">
                <v-spacer />

                <v-btn v-if="this.timerCount === 0" :color="teamColor" @click="next" dark right>
                    Next
                </v-btn>

                <v-btn v-else :color="teamColor" @click="next" right disabled>
                    Next button will be availible in {{this.timerCount}} seconds
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import GameSteps from './GameSteps.vue';

export default {
    components: {GameSteps},
    data() {
        return {
          dialog: true,
          showNextButton: true,
          currentRuleNumber: 0,
          teamColor: this.$store.state.color,
          timerCount: 5
        }
    },
    methods: {
      closeDialog() {
        this.$emit('closeRules');

        if(!this.$store.state.roundRulesRead) {
            this.$emit('showRoundRules');
        }
      },
      next() {
            this.timerCount = 5;
            if(this.currentRuleNumber === 3) {
                this.$store.state.generalRulesRead = true;
            } 
            
            if(this.currentRuleNumber < 4) {
                this.currentRuleNumber++;
            }
      },
      back() {
            if(this.currentRuleNumber > 0) {
                this.currentRuleNumber--;
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
}
</script>

<style scoped>
    .rules-text {
        text-align: left;
        font-size: 15pt;
        margin: 15px 0 15px 0;
        min-height: 70vh;
    }
    .youtube-video {
        text-align: center;
        vertical-align: baseline;
        height: 50vh;
        margin: 15px 0 15px 0;
    }
    #video-header {
        font-size: 20pt;
        margin-bottom: 15px;
    }
    .text-passage {
        padding: 15px 0;
        font-size: 20pt;
        text-align: justify;
        font-family: Helvetica, sans-serif;
    }

    .text-passage h2 {
        margin-bottom: 15px;
        text-align: center;
        color: green;
    }
    .text-passage h4 {
        text-align: center;
    }

    .text-counter {
        list-style-type: counter;
        display: list-item;
        list-style-position: inside;
    }
    .second-plate {
        padding-bottom: 30px;
        line-height: 40px;
    }
    .second-plate:last-child {
        padding-bottom: 0px;
    }
</style>
