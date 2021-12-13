<template>
    <v-dialog v-model="dialog" width="50%" @click:outside="closeDialog" class="v-dialog__content">
        <v-card>
           <v-card-title class="headline grey lighten-2">
            Congratulations! You have found our secret Dialog!
          </v-card-title>

          <v-card-text>
            <h2>
              <br />
              © Technical University Munich (TUM) 2021
            </h2>
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn color="red" text @click="closeDialog">
              <b>Close</b>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>

export default {
   data () {
      return {
        dialog: true,
        teamColor: this.$store.state.color
      }
    },
    methods: {
        closeDialog() {
            this.dialog = false;
            this.$emit("closeEasterEgg");
        }
    }
}
</script>

