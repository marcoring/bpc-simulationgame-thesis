<template>
  <v-container id="confirmation-dialog">
    <v-dialog v-model="dialog" persistant width="30%" @click:outside="closeDialog">
      <v-card>
        <v-card-text class="text-size">
          <br />
          Are you sure you want to confirm changes?
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="red" text @click="closeDialog">
            <b>Decline</b>
          </v-btn>
          <v-btn :color="teamColor" text @click="accept">
            <b>Accept</b>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "confirmation-dialog",
  data() {
    return {
      dialog: true,
      teamColor: this.$store.state.color
    };
  },
  methods: {
    accept() {
      this.$emit("updateProgress", this.$route.name, 100);
    },
    closeDialog() {
      this.$emit("closeDialog");
    }
  },
};
</script>


<style scoped>
.text-size {
   font-size: 14pt !important;
 }
</style>
