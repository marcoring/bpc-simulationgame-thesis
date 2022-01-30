import Vuex from 'vuex'
import Vue from 'vue'
import PurchasingStore from './modules/PurchasingStore'
import LogisticsStore from './modules/LogisticsStore'
import BatteryPreparationStore from './modules/BatteryPreparationStore'

Vue.use(Vuex)

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
      blockGame: false
    },
    modules: {
        purchasing: PurchasingStore,
        logistics: LogisticsStore,
        batteryPreparation: BatteryPreparationStore
    }
})