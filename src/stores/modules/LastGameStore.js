// import dependency to handle HTTP request to our back end
import axios from "axios";

//to handle state
const state = {
  gameData: null,
  gameDataInventory: null,
};

//to handle state
const getters = {
  gameData: (state) => state.gameData,
  gameDataInventory: (state) => state.gameDataInventory,
};

//to handle actions
const actions = {
  async updateGameData({ commit /*,dispatch*/ }) {
    try {
      var response = await axios.get(
        "http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/GetLastGame?$format=json"
      );
      var gameData = response.data.d;
      console.log("updateGameData", gameData);
      commit("updateGameData", gameData);
      // await Promise.all([
      //   // Promise.all läuft parallel und awaitet mehrere gleichzeitig
      //   dispatch('logistics/updateVendors'),
      //   //dispatch('purchasing/updateFrameVendors'),
      //   // ...
      // ]);
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
  async updateGameDataInventory({ rootGetters, commit }) {
    try {
      var response = await axios.get(
        `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/InventorySet(Guid=guid'${rootGetters.gameData.Guid}',Roundid=${rootGetters.gameData.Roundid},Userid='${rootGetters.gameData.Userid}')`
      );
      var gameDataInventory = response.data.d.results;
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
};

//to handle mutations
const mutations = {
  updateGameData: (state, gameData) => (state.gameData = gameData),
  updateGameDataInventory: (state, gameDataInventory) =>
    (state.gameDataInventory = gameDataInventory),
};

//export store module
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
