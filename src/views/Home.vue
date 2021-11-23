<template>
  <Header class="fixedHeader"/>

  <div class="dataDiv">
    <h2 class="dataTitle">My projects</h2>
    
    <table class="dataTable myProjectsTable">
      <tr>
        <th>Project name</th>
        <th>From</th>
        <th>To</th>
        <template v-if="this.$store.state.toggleValue">
          <th>Initial CF-Index</th>
          <th>Current CF-Index</th>
        </template>
        <template v-else>
          <th>CF Estimation</th>
        </template>
        <th>Actions</th>
      </tr>
      <tr>
        <td>HADES Project</td>
        <td>2017</td>
        <td>2021</td>
        <td style="color: orange;">4.1</td>
        <template v-if="this.$store.state.toggleValue">
          <td style="color: green;">1.9</td>
        </template>
        <td><img id="goArrowIcon" :src="goArrowIcon" /></td>
      </tr>
    </table>

    <fieldset class="legend">
      <legend>CF-Index Colors</legend>
      <div class="wrapper"><div class="greenSquare"/><p class="legendText">0-3: Ideal</p></div>
      <div class="wrapper"><div class="orangeSquare"/><p class="legendText">3-5: Improvable</p></div>
      <div class="wrapper"><div class="redSquare"/><p class="legendText">5-10: Needs attention</p></div>
    </fieldset>
  
  </div>

    <div id="createProjectDiv">
      <router-link to="/createProject"><Btn id="createProject">Create a new project</Btn></router-link>
    </div>
        
</template>

<script>
import Header from '@/components/Header.vue'
import Btn from '@/components/Btn.vue'
import goArrowIcon from "@/assets/go.png"

export default {
  name: 'Home',
  components: {
    Header,
    Btn,
  },
  data() {
    return {
      goArrowIcon: goArrowIcon
    }
  }
}
</script>

<style>

.fixedHeader {
  position: sticky;
}

.dataDiv {
  /* display: flex; */
}

#goArrowIcon {
  width: 20px;
  cursor: pointer;
}

.dataTitle {
  position: absolute;
  left: 200px;
  font-size: 30px;
}

.dataTable {
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
}

.dataTable td, .dataTable th {
  border: 2px solid rgb(0 0 0 / 70%);
  padding: 8px;
}

.dataTable tr:nth-child(even){background-color: #f2f2f2;}

.dataTable tr:hover {background-color: #ddd;}

.dataTable th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #04AA6D;
  color: white;
}

.myProjectsTable {
  width: 75%;
  left: 190px;
  top: 90px;
}

.legend {
  position: absolute;
  width: 200px;
  height: 140px;
  left: 195px;
  top: 400px;
  border: 2px solid rgb(0 0 0 / 70%);
  text-align: left;
}

.greenSquare {
  background-color: green;
  width: 25px;
  height: 25px;
}

.orangeSquare {
  background-color: orange;
  width: 25px;
  height: 25px;
}

.redSquare {
  background-color: red;
  width: 25px;
  height: 25px;
}

.legendText {
  bottom: 10px;
  position: relative;
  left: 5px;
}

.wrapper {
  display: flex;
}

#createProjectDiv {
  position: absolute;
  left: 195px;
  top: 669px;
}

.green {
  color: green;
}

.orange {
  color: orange;
}

.red {
  color: red;
}

</style>
