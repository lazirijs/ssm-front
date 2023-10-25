import { createStore } from 'vuex'

export default createStore({
  state: {
    OTP: null,
    user: null,
  },
  getters: {
  },
  mutations: {
    OTP(state, payload) {
      state.OTP = payload;
    },
    user(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async OTP({ commit }, payload) {
      commit("OTP", payload);
    },
    async user({ commit }, payload) {
      commit("user", payload);
    },
  },
  modules: {
  }
})
