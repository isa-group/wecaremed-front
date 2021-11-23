<template>
  <div id="nav">

    <div>

      <div class="homeDiv">
        <router-link id="home" to="/"><Btn>Home</Btn></router-link>
      </div>

      <div class="appMode">
        <label id="toggle-label">{{ text }}</label>
        <Toggle v-model="toggleValue" labelledby="toggle-label" @click="toggleView"/>
      </div>
      
    </div>

    <div class="projectNameDiv">
      <h1>ATENEA Project (2018 - 2022) [</h1><h1 id="currentCF">2.3</h1><h1>/</h1><h1 id="initialCF">8.8</h1><h1>]</h1>
    </div>

    <div class="loginDiv">
      <Btn>Logout</Btn>
      <p id="currentUser">Logged as XXXXXXXXX</p>
    </div>
    
  </div>
</template>

<script>
import Toggle from '@vueform/toggle'
import Btn from './Btn.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PorjectDetailsHeader',
  components: {
    Toggle,
    Btn
  },
  methods: {
    ...mapActions([
      "toggleView"
    ])
  },
  computed: {
    ...mapState([
      'toggleValue', 'text'
    ])
  }
}
</script>

<style src="@vueform/toggle/themes/default.css"></style>

<style scoped>

#nav {
  padding: 30px 0;
  background-color: white;
}

.appMode {
  position: absolute;
  top: 110px;
  left: 38px;
}

h1 {
  font-size: 50px;
}

#toggle-label {
  font-size: 25px;
  margin-right: 10px;
  top: 3px;
  position: relative;
}

#home {
  position: relative;
  left: 11px;
}

.homeDiv {
  position: absolute;
  top: 38px;
  left: 38px;
}

#logoText {
    color: black;
    font-family: fantasy;
    font-size: 2em;
    font-weight: bold;
    bottom: 30px;
    position: relative;
}

.loginDiv {
    position: absolute;
    top: 38px;
    right: 38px;
}

.projectNameDiv {
  display: inline-flex;
}

#currentCF {
  color: green;
}

#initialCF {
  position: relative;
  top: 40px;
  color: red;
  font-size: 25px;
}

</style>
