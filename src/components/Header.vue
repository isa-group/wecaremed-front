<template>
  <div id="nav">

    <div class="appMode">
      <label id="toggle-label">{{ text }}</label>
      <Toggle v-model="toggleValue" labelledby="toggle-label" @click="toggleView"/>
    </div>

    <div class="logoDiv">
      <img id="roseLogo" :src="RoseLogo">
      <label id="logoText">ROSE</label>
    </div>

    <div class="loginDiv">
      <Btn>Logout</Btn>
      <p id="currentUser">Logged as XXXXXXXXX</p>
    </div>
    
  </div>
</template>

<script>
import Toggle from '@vueform/toggle'
import RoseLogo from '@/assets/ROSE Logo.png'
import Btn from './Btn.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Header',
  components: {
    Toggle,
    Btn
  },
  data() {
    return {
      RoseLogo: RoseLogo
    }
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

<style>

.appMode {
  position: absolute;
}

#toggle-label {
  font-size: 25px;
  margin-right: 10px;
  top: 3px;
  position: relative;
}

#roseLogo {
  width: 100px;
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

</style>
