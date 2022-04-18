import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import axios from "axios";
import VueAxios from "vue-axios";
import Vuex from "vuex";
import store from "./stores";

Vue.config.productionTip = false;
Vue.use(Vuex);

new Vue({
  store,
  router,
  vuetify,
  axios,
  VueAxios,
  render: (h) => h(App),
}).$mount("#app");
