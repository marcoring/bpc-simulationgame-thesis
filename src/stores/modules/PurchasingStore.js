import axios from 'axios'

const state = {
    batteryVendors: [],
    batteryVendor: null,
    vendors: [],
    vendor: null,
    types: [],
    type: null,
    quality: [],
    amount: []
}

const getters = {
    batteryVendors: state => state.batteryVendors,
    batteryVendor: state => state.batteryVendor,
    vendors: state => state.vendors,
    vendor: state => state.vendor,
    types: state => state.types,
    type: state => state.type,
    quality: state => state.quality,
    amount: state => state.amount,
}

const actions = {
    async updateVendors({ commit }) {
        try {
            var response = await axios.get(
                "http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/AppDevVendorSet/?$format=json"
              );
            var vendors = response.data.d.results;
            commit('updateVendors', vendors);
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
}

const mutations = {
    // Hier könnte ich noch checks einbauen, ob Vendors so stimmt z.b., bevor ich sie setze
    updateBatteryVendors: (state, batteryVendors) => state.batteryVendors = batteryVendors,
    updateBatteryVendor: (state, batteryVendor) => state.batteryVendor = batteryVendor,
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