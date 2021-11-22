import { createStore } from 'vuex'

export default createStore({
  state: {
    toggleValue: false,
    text: "Simple"
  },
  mutations: {
    toggleView() {
      this.state.toggleValue = !this.state.toggleValue;
      this.state.text = (this.state.toggleValue) ? "Advanced" : "Simple"
    }
  },
  actions: {
    toggleView(context) {
      context.commit("toggleView")
    }
  },
  modules: {
  }
})
