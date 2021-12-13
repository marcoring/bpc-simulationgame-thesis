import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from '@/plugins/vuetify'; // path to vuetify export
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    round: 1,
    nextStep: 'purchasing',
    color: '#4E9455',
    generalRulesRead: false,
    roundRulesRead: false,
    dashboardStep: 1,
    purchasingStep: 1,
    logisticStep: 1,
    frameStep: 1,
    sensorStep: 1,
    bikeStep: 1,
    salesStep: 1,
    innerGuideDone: false,
    blockGame: false
  }
});

new Vue({
  store,
  router,
  vuetify,
  axios,
  VueAxios,
  render: h => h(App)
}).$mount('#app');