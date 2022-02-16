import axios from 'axios'

const state = {
    batteryVendors: [],
    batteryVendor: null,
    engineVendors: [],
    engineVendor: null,
    frameVendors: [],
    frameVendor: null,
    sensorsVendors: [],
    sensorsVendor: null,
    types: [],
    type: null,
    quality: [],
    amount: [],
    tempSelection: {
      batteryVendor: {},
      engineVendor: {},
      frameVendor: {},
      sensorsVendor: {}
    }
}

const getters = {
    batteryVendors: state => state.batteryVendors,
    batteryVendor: state => state.batteryVendor,
    engineVendors: state => state.engineVendors,
    engineVendor: state => state.engineVendor,
    frameVendors: state => state.frameVendors,
    frameVendor: state => state.frameVendor,
    sensorsVendors: state => state.sensorsVendors,
    sensorsVendor: state => state.sensorsVendor,
    vendors: state => state.vendors,
    vendor: state => state.vendor,
    types: state => state.types,
    type: state => state.type,
    quality: state => state.quality,
    amount: state => state.amount,
    tempSelection: state => state.tempSelection
}

const actions = {
    async updateBatteryVendors({ commit }) {
        try {
            var response = await axios.get(
                "http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/AppDevVendorSet/?$format=json"
              );
            var batteryVendors = response.data.d.results;
            commit('updateBatteryVendors', batteryVendors);
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
    },
    async updateEngineVendors({ commit }) {
        try {
            var response = await axios.get(
                "http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/AppDevVendorSet/?$format=json"
              );
            var engineVendors = response.data.d.results;
            commit('updateEngineVendors', engineVendors);
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
    },
    async updateFrameVendors({ commit }) {
        try {
            var response = await axios.get(
                "http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/AppDevVendorSet/?$format=json"
              );
            var frameVendors = response.data.d.results;
            commit('updateFrameVendors', frameVendors);
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
    },
    async updateSensorsVendors({ commit }) {
        try {
            var response = await axios.get(
                "http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/AppDevVendorSet/?$format=json"
              );
            var sensorsVendors = response.data.d.results;
            commit('updateSensorsVendors', sensorsVendors);
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
    },
}

const mutations = {
    // Hier könnte ich noch checks einbauen, ob Vendors so stimmt z.b., bevor ich sie setze
    updateBatteryVendors: (state, batteryVendors) => state.batteryVendors = batteryVendors,
    updateBatteryVendor: (state, batteryVendor) => {
      state.batteryVendor = batteryVendor
      state.tempSelection.batteryVendor = batteryVendor
    },
    updateEngineVendors: (state, engineVendors) => state.engineVendors = engineVendors,
    updateEngineVendor: (state, engineVendor) => {
      state.engineVendor = engineVendor
      state.tempSelection.engineVendor = engineVendor
    },
    updateFrameVendors: (state, frameVendors) => state.frameVendors = frameVendors,
    updateFrameVendor: (state, frameVendor) => {
      state.frameVendor = frameVendor
      state.tempSelection.frameVendor = frameVendor
    },
    updateSensorsVendors: (state, sensorsVendors) => state.sensorsVendors = sensorsVendors,
    updateSensorsVendor: (state, sensorsVendor) => {
      state.sensorsVendor = sensorsVendor
      state.tempSelection.sensorsVendor = sensorsVendor
    },
    updateVendors: (state, vendors) => state.vendors = vendors,
    updateVendor: (state, vendor) => state.vendor = vendor,
    updateTypes: (state, types) => state.types = types,
    updateType: (state, type) => state.type = type,
    updateQuality: (state, quality) => state.quality = quality,
    updateAmount: (state, amount) => state.amount = amount,
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}