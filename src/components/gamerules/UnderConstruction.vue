<template>
    <v-dialog width="80%" height="80%" v-model="dialog" persistent>
        <v-card>
            <v-card-title :style="'background-color:' + teamColor + '!important'" style="color: white">
                This Page is under Construction!
                <v-spacer />
            </v-card-title>

            <v-card-text>
               <div class="rules-text" v-if="this.currentRuleNumber == 0">
                    <div class="text-passage">
                        <h2 :style="'color:' + teamColor">Ups, this Page is still under construction! The full functionality may not reach yet. May the force be with you!</h2>
                    </div>
                    
            
            <v-divider />
                <v-spacer />
                <v-btn color="red" @click="closeDialog" dark text>
                    Close
                </v-btn>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    data() {
        return {
          dialog: true,
          showNextButton: true,
          currentRuleNumber: 0,
          teamColor: this.$store.state.color,
          // TODO set timerCount to 5 Seconds
          timerCount: 0
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
          // TODO set timerCount to 5 Seconds
            this.timerCount = 0;
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
