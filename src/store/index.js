import { createStore } from 'vuex'

export default createStore({
  state: {
    OTP: null,
    user: null,
    schools: [],
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
    schools(state, payload) {
      state.schools = payload;
    },
    addSchool(state, payload) {
      const index = state.schools.findIndex((obj) => obj.code == payload.code);
      index == -1 ? state.schools.push(payload) : state.schools[index] = payload;
  },
  },
  actions: {
  },
  modules: {
  }
})
