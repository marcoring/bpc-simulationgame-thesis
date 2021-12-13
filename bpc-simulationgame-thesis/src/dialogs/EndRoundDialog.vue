<template>
     <v-dialog v-model="dialog" width="50%" @click:outside="closeDialog">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                Round {{ this.$store.state.round }}
              </v-card-title>

              <v-card-text>
                <br />
                <p class="text-font"> Do you really want to end the current round?</p>
                <p class="text-font">
                  You won't be able to make any changes until the next round has
                  started!
                </p>
              </v-card-text>

              <v-divider />

              <v-card-actions>
                <v-spacer />
                <v-btn color="red lighten-2" text @click="closeDialog">
                  <b>Back</b>
                </v-btn>

                <v-btn :color="teamColor" text @click="endRound">
                  <b>End Round</b>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
</template>

<script>

export default {
    data() {
        return {
            dialog: true,
            teamColor: this.$store.state.color
        }
    },
    methods: {
        closeDialog() {
            this.$emit('closeEndRoundModal');
        },
        endRound() {
            this.$emit('endRound');
        }
    }
}
</script>


<style scoped>
.text-font {
  font-size: 14pt;
}
</style>