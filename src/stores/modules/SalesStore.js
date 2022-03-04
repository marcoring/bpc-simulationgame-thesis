// import dependency to handle HTTP request to our back end
import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

//to handle state
const state = {
    lastVendor: null
}

//to handle state
const getters = {
    lastVendor: state => state.lastVendor
}

//to handle actions
const actions = {
    async getLastVendor({ rootGetters, commit}) {
      if(rootGetters.gameData.Roundid == 1) {
        return null;
      }
      try {
      var response = await axios.get(
          `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/SalesProcessSet(Guid=guid'${rootGetters.gameData.Guid}',Roundid=${rootGetters.gameData.Roundid - 1},Userid='${rootGetters.gameData.Userid}')?$format=json`
        );
        var lastVendor = response.data.d;
        console.log('LAST VENDOR SALES STORE', lastVendor)
        commit('updateLastVendor', lastVendor);
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
    async saveVendor({ commit, dispatch, /*getters,*/ rootGetters }, data) {
      console.log("SAVE VENDOR", data)
      const payload = JSON.stringify({                       
            Guid:rootGetters.gameData.Guid,    
            Roundid:rootGetters.gameData.Roundid,  
            Userid:rootGetters.gameData.Userid,   
            Priceperbike:String(data.amount.pricePerBike),        
            Onlineshop:data.Onlineshop, 
            Onlinemarketing:data.Onlinemarketing,        
            Marketanalyzer:data.Onlinemarketing,        
            Dronedelivery:data.Dronedelivery,        
            Salespersons:Number(data.amount.numOfSalesPersons),        
            Salescost:String(data.Salescost),        
            Salescapacity:String(data.Salescapacity)
      });
      // this function return backslashes from JSON String
      console.log("PAYLOAD", payload);
      const payload_without_bs = JSON.parse(payload);
      console.log("PAYLOAD WITHOUT BS", payload_without_bs);
      const axiosConfig = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        }
    };
        try {
        var response = await axios.put(
            `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/SalesProcessSet(Guid=guid'${rootGetters.gameData.Guid}',Roundid=${rootGetters.gameData.Roundid},Userid='${rootGetters.gameData.Userid}')`,
                payload_without_bs
              ,
              {
                axiosConfig
              },
            );
        var vendors = response.data.d.results;
        commit('saveVendor', vendors);
        console.log('PAYLOAD', payload_without_bs)
        await dispatch('updateGameData', {}, { root: true });
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
}

//to handle mutations
const mutations = {
    updateLastVendor: (state, lastVendor) => state.lastVendor = lastVendor
}

//export store module
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}