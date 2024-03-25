import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    school: null,
    student: null,
    schools: [],
    courses: [],
    students: [],
    payments: [],
    lessons: [],
    presence: [],
    timetables: [],
  },
  getters: {
  },
  mutations: {
    set(state, payload) {
      state[payload.key] = payload.value;
    },
    add(state, payload) {
      const id = payload.id || Object.entries(payload.value)[0][0];
      const value = state[payload.key];
      const index = value.findIndex((obj) => obj[id] == payload.value[id]);
      index == -1 ? value.push(payload.value) : value[index] = payload.value;
      state[payload.key] = value.filter(item => item.created_at).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },
  },
  actions: {
  },
  modules: {
  }
});