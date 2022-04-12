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
    toggleProject: false,
    analysisParamsInitial :{
      heatInputInitial: 1.0,
      electricityInputInitial: 1.0,
      waterInputInitial: 1.0,
      transportationInputInitial: 1.0,
      materialsInputInitial: 1.0,
      eventsInputInitial: 1.0,
      printableDeliverablesInputInitial: 1.0,
      equipmentInputInitial: 1.0
    },
    analysisParamsExecution :{
      heatInputExecution: 1.0,
      electricityInputExecution: 1.0,
      waterInputExecution: 1.0,
      transportationInputExecution: 1.0,
      materialsInputExecution: 1.0,
      eventsInputExecution: 1.0,
      printableDeliverablesInputExecution: 1.0,
      equipmentInputExecution: 1.0
    }
  },
  mutations: {
    toggleView(state) {
      state.toggleValue = !state.toggleValue;
      state.appModeText = state.toggleValue ? "Advanced" : "Simple"
    },
    toggleValue(state){
      if (state.toggleValue) {
        state.toggleValue = false;
      } else {
        state.toggleValue = true;
      }
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
    saveUserId(state, userId){
      state.userId = userId;
    },
    toggleViewProject(state) {
      state.toggleProject = !state.toggleProject;
    },
    toggleProject(state){
      if (state.toggleProject) {
        state.toggleProject = false;
      } else {
        state.toggleProject = true;
      }
    },
    analysisParamsInitial(state, newValues) {
      state.analysisParamsInitial = newValues;
    },
    analysisParamsExecution(state, newValues) {
      state.analysisParamsExecution= newValues;
    }
    
  },
  actions: {
    toggleView(context) {
      context.commit("toggleView")
    },
    toggleValue({commit}){
      commit("toggleValue");
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
    saveUserId({commit}, userId) {
      commit("saveUserId", userId);
    },
    toggleViewProject(context) {
      context.commit("toggleViewProject")
    },
    toggleProject({commit}){
      commit("toggleProject");
    },
    analysisParamsInitial({commit}, newValues) {
      commit("analysisParamsInitial", newValues);
    },
    analysisParamsExecution({commit}, newValues) {
      commit("analysisParamsExecution", newValues);
    }
  },
  modules: {
  }
})
