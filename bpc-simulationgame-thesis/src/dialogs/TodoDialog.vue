<template>
    <v-dialog v-model="dialog" width="30%" @click:outside="closeDialog">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            Todo
          </v-card-title>

          <v-card-text>
              <v-list>
                <v-list-item-group>
                    <v-list-item v-for="item in tasksList" :key="item.id" :disabled="item.value == 100">
                    <v-list-item-icon>
                        <v-icon v-text="item.icon" v-if="item.value < 100" :color="teamColor"></v-icon>
                        <v-icon v-else>mdi-check-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content 
                        class="text-item" 
                        @click="navigateToItem(item.id)"
                        :style="calculateStyle(item.value)"
                    >
                       <span >{{item.name}}</span>
                    </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
                </v-list>
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
  props: ['tasksList'],
   data () {
      return {
        dialog: true,
        teamColor: this.$store.state.color
      }
    },
    methods: {
        closeDialog() {
            this.dialog = false;
            this.$emit("closeTodo");
        },
        navigateToItem(itemId) {
            this.closeDialog();
            this.$router.push({ path: "/" + itemId });
        },
        calculateStyle(itemValue) {
            const normalItemStyle = 'color: ' + this.teamColor + '; font-weight: 600;';
           return itemValue == 100 ? '' : normalItemStyle;
        }
    }
}
</script>

<style scoped>
    .text-item {
        text-align: left;
        font-size: 15pt;
    }
</style>
