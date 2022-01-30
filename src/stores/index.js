import Vuex from 'vuex'
import Vue from 'vue'
import PurchasingStore from './modules/PurchasingStore'
import LogisticsStore from './modules/LogisticsStore'
import BatteryPreparationStore from './modules/BatteryPreparationStore'
import axios from 'axios'

Vue.use(Vuex)

/**
{
  "d" : {
    "__metadata" : {
      "id" : "http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/GameProgressSet(Guid=guid'aad5ba91-6202-1eec-9efd-d05013c22b6a',Roundid=2,Userid='Team1')",
      "uri" : "http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/GameProgressSet(Guid=guid'aad5ba91-6202-1eec-9efd-d05013c22b6a',Roundid=2,Userid='Team1')",
      "type" : "Z_40_T2_BIKEGAME_ACF_SRV.GameProgress"
    },
    "Customersatisfaction" : "0.00",
    "Employeesatisfaction" : "70.00",
    "Runningcost" : "583545.33",
    "Finalsubmission" : false,
    "Guid" : "aad5ba91-6202-1eec-9efd-d05013c22b6a",
    "Warehousingcost" : "0.00",
    "Tmstamp" : "Date(1642902493000)",
    "Roundid" : 2,
    "Userid" : "Team1",
    "Completed" : false,
    "Budget" : "10000000.00",
    "Acquisitioncost" : "0.00",
    "Costperbike" : "0.00",
    "Quality" : "7.92",
    "Productioncapacity" : "0.00",
    "Demand" : "600000.00"
  }
}  
 */

export default new Vuex.Store({
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
      blockGame: false,

      gameData: null
    },
    getters: {
      gameData: state => state.gameData
    },
    actions: {
      async updateGameData({ commit, dispatch }) {
        try {
          var response = await axios.get(
              "http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/GetLastGame"
            );
          var gameData = response.data.d;
          commit('updateGameData', gameData);
          await Promise.all([
            // Promise.all läuft parallel und awaitet mehrere gleichzeitig
            dispatch('logistics/updateVendors'),
            //dispatch('purchasing/updateFrameVendors'),
            // ...
          ]);
      } catch (error) {
          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
      }
      }
    },
    mutations: {
      updateGameData: (state, gameData) => state.gameData = gameData
    },
    modules: {
        purchasing: PurchasingStore,
        logistics: LogisticsStore,
        batteryPreparation: BatteryPreparationStore
    }
})