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
    lastVendorBattery: null,
    lastVendorBatteryM: null,
    lastVendorEngine: null,
    lastVendorEngineM: null,
    lastVendorFrame: null,
    lastVendorFrameM: null,
    lastVendorSensors: null,
    lastVendorSensorsM: null,
    types: [],
    type: null,
    quality: [],
    amount: [],
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
    lastVendorBattery: state => state.lastVendorBattery,
    lastVendorBatteryM: state => state.lastVendorBatteryM,
    lastVendorEngine: state => state.lastVendorEngine,
    lastVendorEngineM: state => state.lastVendorEngineM,
    lastVendorFrame: state => state.lastVendorFrame,
    lastVendorFrameM: state => state.lastVendorFrameM,
    lastVendorSensors: state => state.lastVendorSensors,
    lastVendorSensorsM: state => state.lastVendorSensorsM
}

const actions = {
  async getLastVendorBattery({commit, rootGetters}) {
    if(rootGetters.gameData.Roundid == 1) {
      return null;
    }
    try {
    var response = await axios.get(
        `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/PurchaseProcessSet(Guid=guid'${rootGetters.gameData.Guid}',Roundid=${rootGetters.gameData.Roundid - 1},Materialid='BAT',Userid='${rootGetters.gameData.Userid}')?$format=json`
      );
    commit('updateLastVendorBattery', response.data.d);
    /*for (const property in response.data.d) {
      console.log(`${property}: ${response.data.d[property]}`);
    }*/
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
  async getLastVendorBatteryM({getters, commit, rootGetters}) {
    if(rootGetters.gameData.Roundid == 1) {
      return null;
    }
    try {
    var response = await axios.get(
        `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/PurchaseProcessSet(Guid=guid'${rootGetters.gameData.Guid}',Roundid=${rootGetters.gameData.Roundid - 1},Materialid='BAT',Userid='${rootGetters.gameData.Userid}')?$format=json`
      );
    commit('updateLastVendorBatteryM', getters.batteryVendors.find(v => v.Vendorid == response.data.d.Vendorid));
    /*for (const property in response.data.d) {
      console.log(`${property}: ${response.data.d[property]}`);
    }*/
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
  async getLastVendorEngine({ commit, rootGetters}) {
    if(rootGetters.gameData.Roundid == 1) {
      return null;
    }
    try {
    var response = await axios.get(
        `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/PurchaseProcessSet(Guid=guid'${rootGetters.gameData.Guid}',Roundid=${rootGetters.gameData.Roundid - 1},Materialid='ENG',Userid='${rootGetters.gameData.Userid}')?$format=json`
      );
    
      commit('updateLastVendorEngine', response.data.d);  
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
  async getLastVendorEngineM({getters, commit, rootGetters}) {
    if(rootGetters.gameData.Roundid == 1) {
      return null;
    }
    try {
    var response = await axios.get(
        `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/PurchaseProcessSet(Guid=guid'${rootGetters.gameData.Guid}',Roundid=${rootGetters.gameData.Roundid - 1},Materialid='ENG',Userid='${rootGetters.gameData.Userid}')?$format=json`
      );
    commit('updateLastVendorEngineM', getters.engineVendors.find(v => v.Vendorid == response.data.d.Vendorid));
    /*for (const property in response.data.d) {
      console.log(`${property}: ${response.data.d[property]}`);
    }*/
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
  async getLastVendorFrame({ commit, rootGetters}) {
    if(rootGetters.gameData.Roundid == 1) {
      return null;
    }
    try {
    var response = await axios.get(
        `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/PurchaseProcessSet(Guid=guid'${rootGetters.gameData.Guid}',Roundid=${rootGetters.gameData.Roundid - 1},Materialid='FR',Userid='${rootGetters.gameData.Userid}')?$format=json`
      );
    commit('updateLastVendorFrame', response.data.d);
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
  async getLastVendorFrameM({getters, commit, rootGetters}) {
    if(rootGetters.gameData.Roundid == 1) {
      return null;
    }
    try {
    var response = await axios.get(
        `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/PurchaseProcessSet(Guid=guid'${rootGetters.gameData.Guid}',Roundid=${rootGetters.gameData.Roundid - 1},Materialid='FR',Userid='${rootGetters.gameData.Userid}')?$format=json`
      );
    commit('updateLastVendorFrameM', getters.frameVendors.find(v => v.Vendorid == response.data.d.Vendorid));
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
  async getLastVendorSensors({commit, rootGetters}) {
    if(rootGetters.gameData.Roundid == 1) {
      return null;
    }
    try {
    var response = await axios.get(
        `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/PurchaseProcessSet(Guid=guid'${rootGetters.gameData.Guid}',Roundid=${rootGetters.gameData.Roundid - 1},Materialid='SEN',Userid='${rootGetters.gameData.Userid}')?$format=json`
      );
      commit('updateLastVendorSensors', response.data.d);
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
  async getLastVendorSensorsM({getters, commit, rootGetters}) {
    if(rootGetters.gameData.Roundid == 1) {
      return null;
    }
    try {
    var response = await axios.get(
        `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/PurchaseProcessSet(Guid=guid'${rootGetters.gameData.Guid}',Roundid=${rootGetters.gameData.Roundid - 1},Materialid='SEN',Userid='${rootGetters.gameData.Userid}')?$format=json`
      );
      commit('updateLastVendorSensorsM', getters.sensorsVendors.find(v => v.Vendorid == response.data.d.Vendorid));
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
    async saveVendorBattery({ commit, dispatch, getters, rootGetters }, data) {
      const payload = JSON.stringify({                       
            Guid:rootGetters.gameData.Guid,    
            Roundid:rootGetters.gameData.Roundid,  
            Userid:rootGetters.gameData.Userid, 
            Vendorid:getters.batteryVendor.Vendorid,
            Amount:data.amount.battery,
            Quality:String(data.quality.battery),
            Materialid:"BAT",
            Totalcost:data.totalCost,
            Costperunit:data.costPerUnit
      });
      // this function return backslashes from JSON String
      const payload_without_bs = JSON.parse(payload);
      const axiosConfig = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        }
    };
        try {
        var response = await axios.put(
            `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/PurchaseProcessSet(Guid=guid'${rootGetters.gameData.Guid}',Roundid=${rootGetters.gameData.Roundid},Materialid='BAT',Userid='${rootGetters.gameData.Userid}')`,
                payload_without_bs,
                console.log('PAYLOAD', payload_without_bs),
              {
                axiosConfig
              },
            );
        var vendors = response.data.d.results;
        commit('saveVendor', vendors);
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
    },
    async saveVendorEngine({ commit, dispatch, getters, rootGetters }, data) {
      const payload = JSON.stringify({                       
            Guid:rootGetters.gameData.Guid,    
            Roundid:rootGetters.gameData.Roundid,  
            Userid:rootGetters.gameData.Userid, 
            Vendorid:getters.engineVendor.Vendorid,
            Amount:data.amount.engine,
            Quality:String(data.quality.engine),
            Materialid:"ENG",
            Totalcost:data.totalCost,
            Costperunit:data.costPerUnit
      });
      // this function return backslashes from JSON String
      const payload_without_bs = JSON.parse(payload);
      const axiosConfig = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        }
    };
        try {
        var response = await axios.put(
            `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/PurchaseProcessSet(Guid=guid'${rootGetters.gameData.Guid}',Roundid=${rootGetters.gameData.Roundid},Materialid='ENG',Userid='${rootGetters.gameData.Userid}')`,
                payload_without_bs,
                console.log('PAYLOAD', payload_without_bs),
              {
                axiosConfig
              },
            );
        var vendors = response.data.d.results;
        commit('saveVendor', vendors);
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
    },
    async saveVendorFrame({ commit, dispatch, getters, rootGetters }, data) {
      const payload = JSON.stringify({                       
            Guid:rootGetters.gameData.Guid,    
            Roundid:rootGetters.gameData.Roundid,  
            Userid:rootGetters.gameData.Userid, 
            Vendorid:getters.frameVendor.Vendorid,
            Amount:data.amount.frame,
            Quality:String(data.quality.frame),
            Materialid:"FR",
            Totalcost:data.totalCost,
            Costperunit:data.costPerUnit
      });
      // this function return backslashes from JSON String
      const payload_without_bs = JSON.parse(payload);
      const axiosConfig = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        }
    };
        try {
        var response = await axios.put(
            `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/PurchaseProcessSet(Guid=guid'${rootGetters.gameData.Guid}',Roundid=${rootGetters.gameData.Roundid},Materialid='FR',Userid='${rootGetters.gameData.Userid}')`,
                payload_without_bs,
                console.log('PAYLOAD', payload_without_bs),
              {
                axiosConfig
              },
            );
        var vendors = response.data.d.results;
        commit('saveVendor', vendors);
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
    },
    async saveVendorSensors({ commit, dispatch, getters, rootGetters }, data) {
      const payload = JSON.stringify({                       
            Guid:rootGetters.gameData.Guid,    
            Roundid:rootGetters.gameData.Roundid,  
            Userid:rootGetters.gameData.Userid, 
            Vendorid:getters.sensorsVendor.Vendorid,
            Amount:data.amount.sensors,
            Quality:String(data.quality.sensors),
            Materialid:"SEN",
            Totalcost:data.totalCost,
            Costperunit:data.costPerUnit
      });
      // this function return backslashes from JSON String
      const payload_without_bs = JSON.parse(payload);
      const axiosConfig = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        }
    };
        try {
        var response = await axios.put(
            `http://z40lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/Z_40_T2_BIKEGAME_ACF_SRV/PurchaseProcessSet(Guid=guid'${rootGetters.gameData.Guid}',Roundid=${rootGetters.gameData.Roundid},Materialid='SEN',Userid='${rootGetters.gameData.Userid}')`,
                payload_without_bs,
                console.log('PAYLOAD', payload_without_bs),
              {
                axiosConfig
              },
            );
        var vendors = response.data.d.results;
        commit('saveVendor', vendors);
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

const mutations = {
    updateBatteryVendors: (state, batteryVendors) => state.batteryVendors = batteryVendors,
    updateBatteryVendor: (state, batteryVendor) => state.batteryVendor = batteryVendor,
    updateEngineVendors: (state, engineVendors) => state.engineVendors = engineVendors,
    updateEngineVendor: (state, engineVendor) => state.engineVendor = engineVendor,
    updateFrameVendors: (state, frameVendors) => state.frameVendors = frameVendors,
    updateFrameVendor: (state, frameVendor) => state.frameVendor = frameVendor,
    updateSensorsVendors: (state, sensorsVendors) => state.sensorsVendors = sensorsVendors,
    updateSensorsVendor: (state, sensorsVendor) => state.sensorsVendor = sensorsVendor,
    updateVendors: (state, vendors) => state.vendors = vendors,
    updateVendor: (state, vendor) => state.vendor = vendor,
    updateTypes: (state, types) => state.types = types,
    updateType: (state, type) => state.type = type,
    updateQuality: (state, quality) => state.quality = quality,
    updateAmount: (state, amount) => state.amount = amount,
    updateLastVendorBattery: (state, lastVendorBattery) => state.lastVendorBattery = lastVendorBattery,
    updateLastVendorBatteryM: (state, lastVendorBatteryM) => state.lastVendorBatteryM = lastVendorBatteryM,
    updateLastVendorEngine: (state, lastVendorEngine) => state.lastVendorEngine = lastVendorEngine,
    updateLastVendorEngineM: (state, lastVendorEngineM) => state.lastVendorEngineM = lastVendorEngineM,
    updateLastVendorFrame: (state, lastVendorFrame) => state.lastVendorFrame = lastVendorFrame,
    updateLastVendorFrameM: (state, lastVendorFrameM) => state.lastVendorFrameM = lastVendorFrameM,
    updateLastVendorSensors: (state, lastVendorSensors) => state.lastVendorSensors = lastVendorSensors,
    updateLastVendorSensorsM: (state, lastVendorSensorsM) => state.lastVendorSensorsM = lastVendorSensorsM
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}