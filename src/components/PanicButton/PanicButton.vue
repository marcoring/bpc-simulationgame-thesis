<template>
     <v-dialog v-model="dialog" width="50%" @click:outside="closeDialog">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                Panic!
              </v-card-title>

              <v-card-text>
                <br />
                <p v-if="sended" class="text-font-bold">
                  Message is sent, just close the popup and wait for contact!
                </p>
                <p v-else class="text-font"> Do you really want to send a notification to admin?</p>
              </v-card-text>

              <v-divider />

              <v-card-actions>
                <v-spacer />
                <v-btn color="red lighten-2" text @click="closeDialog">
                  <b>Close</b>
                </v-btn>

                <v-btn v-if="!sended" :color="teamColor" text @click="sendNotificationToServer">
                  <b>Send</b>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
</template>

<script>
import axios from "axios";

export default {
    data() {
      return {
          sended: false,
          dialog: true,
          teamColor: this.$store.state.color
      }
    },
    methods: {
      closeDialog() {
          this.dialog = false;
          this.$emit("togglePanicButton");
      },
      sendNotificationToServer() {
        // no backend so far
        const url = "http://z40lp1.ucc.in.tum.de:8000/sap/opu/odata/sap/Z_BIKE_VUE_IHOR_SRV/";
        const data = "panic button pressed";

        axios.post(url, {
          teamName: 'Team name here',
          data: data
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        this.sended = true;
      }
    }
}
</script>


<style scoped>
.text-font {
  font-size: 14pt;
}
.text-font-bold {
  font-size: 14pt;
  font-weight: bold;
}
</style>