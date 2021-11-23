import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
  state: {
    toggleValue: false,
    text: "Simple",
    selectedPartnerForEquipmentSimple: "MEDIPLASMA SRL"
  },
  mutations: {
    toggleView(state) {
      state.toggleValue = !state.toggleValue;
      state.text = state.toggleValue ? "Advanced" : "Simple"
    },
    updateSelectedPartner(state, selectedOption) {
      state.selectedPartnerForEquipmentSimple = selectedOption;
    }
  },
  actions: {
    toggleView(context) {
      context.commit("toggleView")
    },
    updateSelectedPartner({commit}, selectedOption) {
      commit("updateSelectedPartner", selectedOption)
    },
  },
  modules: {
  }
})
