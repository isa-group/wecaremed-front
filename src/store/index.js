import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
  state: {
    toggleValue: false,
    appModeText: "Simple",
    selectedPartnerForEquipmentSimple: "",
    username: '',
    password: '',
    userId: '',
    isSuperUser : Boolean
  },
  mutations: {
    toggleView(state) {
      state.toggleValue = !state.toggleValue;
      state.appModeText = state.toggleValue ? "Advanced" : "Simple"
    },
    updateSelectedPartner(state, selectedOption) {
      state.selectedPartnerForEquipmentSimple = selectedOption;
    },
    saveUsername(state, username){
      state.username = username;
    },
    savePassword(state, password){
      state.password = password;
    },
    removeCredentialsUser(state){
      state.username = '';
      state.password = '';
    },
    saveIsSuperUser(state, superUser){
      state.isSuperUser = superUser;
    },
    saveUserId(state, userId){
      state.userId = userId;
    }
  },
  actions: {
    toggleView(context) {
      context.commit("toggleView")
    },
    updateSelectedPartner({commit}, selectedOption) {
      commit("updateSelectedPartner", selectedOption)
    },
    saveUsername({commit}, username){
      commit("saveUsername", username);
    },
    savePassword({commit}, password){
      commit("savePassword", password);
    },
    removeCredentialsUser({commit}){
      commit("removeCredentialsUser");
    },
    saveIsSuperUser({commit}, superUser) {
      commit("saveIsSuperUser", superUser);
    },
    saveUserId({commit}, userId) {
      commit("saveUserId", userId);
    }
  },
  modules: {
  }
})
