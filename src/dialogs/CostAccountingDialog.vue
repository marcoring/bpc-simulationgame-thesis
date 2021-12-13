<template>
  <v-container id="cost-accounting-dialog">
    <v-dialog v-model="dialog" persistant width="30%" @click:outside="closeDialog">
      <v-card>
        <v-card-text class="text-size">
          <br />
          <span class="text-size">{{itemDescription}}</span>
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
  </v-container>
</template>

<script>
export default {
  name: "cost-accounting-dialog",
  props: ['itemDescription'],
  data() {
    return {
      dialog: true,
      teamColor: this.$store.state.color
    };
  },
  methods: {
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
