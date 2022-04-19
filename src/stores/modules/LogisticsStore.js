// import dependency to handle HTTP request to our back end
import axios from "axios";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

//to handle state
const state = {
  vendors: [],
  vendor: null,
  types: [],
  type: null,
  quality: [],
  amount: [],
  lastVendor: null,
};

//to get state
const getters = {
  vendors: (state) => state.vendors,
  vendor: (state) => state.vendor,
  types: (state) => state.types,
  type: (state) => state.type,
  quality: (state) => state.quality,
  amount: (state) => state.amount,
  lastVendor: (state) => state.lastVendor,
};

//to handle actions
const actions = {
  async getLastVendor({ getters, commit, rootGetters }) {
    if (rootGetters.gameData.Roundid == 1) {
      return null;
    }
    try {
      var response = await axios.get(
        `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/LogisticsProcessSet(Guid=guid'${
          rootGetters.gameData.Guid
        }',Roundid=${rootGetters.gameData.Roundid - 1},Userid='${
          rootGetters.gameData.Userid
        }')?$format=json`
      );
      commit(
        "updateLastVendor",
        getters.vendors.find((v) => v.Vendorid == response.data.d.Vendorid)
      );
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
  async updateVendors({ commit }) {
    try {
      var response = await axios.get(
        `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/LogisticsVendorSet?$format=json`
      );
      var vendors = response.data.d.results;
      commit("updateVendors", vendors);
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
  async saveVendor({ commit, dispatch, getters, rootGetters }, data) {
    const payload = JSON.stringify({
      Guid: rootGetters.gameData.Guid,
      Roundid: rootGetters.gameData.Roundid,
      Userid: rootGetters.gameData.Userid,
      Vendorid: getters.vendor.Vendorid,
      Smartlogistic: data.Smartlogistic,
      Smartlogcost: String(data.Smartlogcost),
    });
    // this function return backslashes from JSON String
    const payload_without_bs = JSON.parse(payload);
    const axiosConfig = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    try {
      var response = await axios.put(
        `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/LogisticsProcessSet(Guid=guid'${rootGetters.gameData.Guid}',Roundid=${rootGetters.gameData.Roundid},Userid='${rootGetters.gameData.Userid}')`,
        payload_without_bs,
        {
          axiosConfig,
        }
      );
      var vendors = response.data.d.results;
      commit("saveVendor", vendors);
      await dispatch("updateGameData", {}, { root: true });
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
};

//to handle mutations
const mutations = {
  // Hier könnte ich noch checks einbauen, ob Vendors so stimmt z.b., bevor ich sie setze
  updateVendors: (state, vendors) => (state.vendors = vendors),
  updateVendor: (state, vendor) => (state.vendor = vendor),
  updateTypes: (state, types) => (state.types = types),
  updateType: (state, type) => (state.type = type),
  updateQuality: (state, quality) => (state.quality = quality),
  updateAmount: (state, amount) => (state.amount = amount),
  updateLastVendor: (state, lastVendor) => (state.lastVendor = lastVendor),
};

//export store module
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
