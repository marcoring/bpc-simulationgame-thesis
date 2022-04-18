import Vuex from "vuex";
import Vue from "vue";
import PurchasingStore from "./modules/PurchasingStore";
import LogisticsStore from "./modules/LogisticsStore";
import BatteryPreparationStore from "./modules/BatteryPreparationStore";
import EnginePreparationStore from "./modules/EnginePreparationStore";
import AppDevAndMaintenanceStore from "./modules/AppDevAndMaintenanceStore";
import SalesStore from "./modules/SalesStore";
import SensorsPreparationStore from "./modules/SensorsPreparationStore";
import QualityAssuranceStore from "./modules/QualityAssuranceStore";
import FramePreparationStore from "./modules/FramePreparationStore";
import BikeConstructionStore from "./modules/BikeConstructionStore";
import axios from "axios";
import LastGameStore from "./modules/LastGameStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    round: 1,
    nextStep: "purchasing",
    color: "#4E9455",
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
    gameData: null,
    gameDataInventory: null,
  },
  getters: {
    gameData: (state) => state.gameData,
    gameDataInventory: (state) => state.gameDataInventory,
  },
  actions: {
    async updateGameData({ commit, dispatch }) {
      try {
        var response = await axios.get(
          "http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/GetLastGame"
        );
        var gameData = response.data.d;
        console.log("updateGameData", gameData);
        commit("updateGameData", gameData);
        await Promise.all([
          // Promise.all läuft parallel und awaitet mehrere gleichzeitig
          dispatch("logistics/updateVendors"),
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
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    },
    async updateGameDataInventory({ commit, rootGetters }) {
      try {
        var response = await axios.get(
          `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/InventorySet(Guid=guid'${rootGetters.gameData.Guid}',Roundid=${rootGetters.gameData.Roundid},Userid='${rootGetters.gameData.Userid}')`
        );
        var gameDataInventory = response.data.d;
        console.log("updateGameDataInventory", gameDataInventory);
        commit("updateGameDataInventory", gameDataInventory);
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
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    },
  },
  mutations: {
    updateGameData: (state, gameData) => (state.gameData = gameData),
    updateGameDataInventory: (state, gameDataInventory) =>
      (state.gameDataInventory = gameDataInventory),
    updateRound: (state, roundId) => (state.round = roundId),
  },
  modules: {
    purchasing: PurchasingStore,
    logistics: LogisticsStore,
    batteryPreparation: BatteryPreparationStore,
    enginePreparation: EnginePreparationStore,
    appDevAndMaintenance: AppDevAndMaintenanceStore,
    sales: SalesStore,
    sensorsPreparation: SensorsPreparationStore,
    qualityAssurance: QualityAssuranceStore,
    framePreparation: FramePreparationStore,
    bikeConstruction: BikeConstructionStore,
    lastGame: LastGameStore,
  },
});
