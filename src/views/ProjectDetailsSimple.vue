<template>
  
  <ProjectDetailsHeader />

  <div class="simpleData">

      <div>
        <u><h2>General</h2></u>
        
        <div class="projectDurationDiv">
          <label for="projectInitialDuration">Project Duration:</label>
            <input type="number" id="projectInitialDuration" name="projectInitialDuration" value="2021"/>
            <span style="position: relative; font-size: 30px; margin: 0 10px"> - </span> 
            <input type="number" id="projectFinalDuration" name="projectFinalDuration" value="2023"/>
        </div>

        <div class="partnersDiv">
          <fieldset class="partnersFieldset">
            <legend>Partners</legend>

            <table class="dataTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Country</th>
                  <th>PersonMonths PP*</th>
                  <th>PersonMonths WPP*</th>
                  <th>Employees Working WPP*</th>
                  <th>Seasonal employees</th>
                  <th>Coordinator</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MEDIPLASMA SRL</td>
                  <td>Italy</td>
                  <td>3</td>
                  <td>4</td>
                  <td>10</td>
                  <td>3</td>
                  <td><input value="1" id="type_radio_1" name="type_radio" type="radio" /></td>
                  <td><img id="deleteIcon" :src="deleteIcon" /></td>
                </tr>
                <tr>
                  <td>Q TECHNOLOGIES LTD</td>
                  <td>United Kingdom</td>
                  <td>3</td>
                  <td>4</td>
                  <td>8</td>
                  <td>5</td>
                  <td><input value="2" id="type_radio_2" name="type_radio" type="radio" checked/></td>
                  <td><img id="deleteIcon" :src="deleteIcon" /></td>
                </tr>
                <tr>
                  <td>CO2CRC Management Pty Ltd</td>
                  <td>Australia</td>
                  <td>2</td>
                  <td>3</td>
                  <td>5</td>
                  <td>4</td>
                  <td><input value="3" id="type_radio_3" name="type_radio" type="radio" /></td>
                  <td><img id="deleteIcon" :src="deleteIcon" /></td>
                </tr>
              </tbody>
            </table>
          <div style="text-align: left; margin-top: 10px">
              *PP: Preparation phase<br>
              *WPP: Whole project period
          </div>
        </fieldset>

        </div> 

        <u><h2>Materials</h2></u>

        <div class="itItemsPurchasedDiv">
          <label for="itItemsPurchased">IT items that will be purchased during the project: </label>
          <input type="number" id="itItemsPurchased" name="itItemsPurchased" value="78"/>
        </div>

        <u><h2>Events</h2></u>

        <div class="publicEventsDiv">
          <fieldset class="publicEventsFieldset">
            <legend>Public events</legend>

            <table class="dataTable eventsTable">
              <thead>
                <tr>
                  <th>Number of public events</th>
                  <th>Average onsite participants</th>
                  <th>Average virtual participants</th>
                  <th>Average duration (days.hours)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>5</td>
                  <td>25</td>
                  <td>25</td>
                  <td>3.13</td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </div>

        <div class="internalMeetingsDiv">
          <fieldset class="internalMeetingsFieldset">
            <legend>Internal events/meetings</legend>

            <table class="dataTable eventsTable">
              <thead>
                <tr>
                  <th>Number of internal events/meetings</th>
                  <th>Average onsite participants</th>
                  <th>Average virtual participants</th>
                  <th>Average duration (days.hours)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>7</td>
                  <td>15</td>
                  <td>5</td>
                  <td>2.0</td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </div>

        <div class="eventsParticipatedByProjectDiv">
          <fieldset class="eventsParticipatedByProjectFieldset">
            <legend>Events participated by the project</legend>

            <table class="dataTable eventsTable">
              <thead>
                <tr>
                  <th>Number of events participated by the project</th>
                  <th>Average number of participants</th>
                  <th>Average duration (days.hours)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10</td>
                  <td>40</td>
                  <td>4.0</td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </div>

        <u><h2>Printable deliverables</h2></u>
        
        <div class="printableDeliverablesDiv">
          <fieldset class="printableDeliverablesFieldset">
            <legend>Printable deliverables</legend>

            <table class="dataTable printableDeliverablesTable">
              <thead>
                <tr>
                  <th>Deliverable type</th>
                  <th>Printable type</th>
                  <th>Copies</th>
                  <th>Average pages per copy</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tool service</td>
                  <td>Testing report</td>
                  <td>2</td>
                  <td>80</td>
                  <td><img id="deleteIcon" :src="deleteIcon" /></td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </div>
        
        <div id="tonsEmitedDiv">
          <strong id="tonsEmited">Tons of carbon dioxyde equivalent emited: 5.45</strong>
        </div>
      </div>

  </div>
</template>

<script>
import deleteIcon from '@/assets/delete.png'
import ProjectDetailsHeader from '@/components/ProjectDetailsHeader.vue'

export default {
  name: 'ProjectDetailsSimple',
  components: {
    // Btn,
    ProjectDetailsHeader
  },
  data() {
    return {
      deleteIcon: deleteIcon
    }
  }
}
</script>

<style scoped>

#deleteIcon {
  width: 20px;
  cursor: pointer;
}

.simpleData {
  margin: auto 60px;
}

h2 {
  text-align: left;
  font-size: 40px;
}

.projectDurationDiv {
  text-align: left;
  position: relative;
  top: -15px;
}

fieldset {
  width: fit-content;
}

.itItemsPurchasedDiv, #tonsEmitedDiv {
  text-align: left;
}

.publicEventsDiv, .internalMeetingsDiv {
  margin-bottom: 15px;
}

.printableDeliverablesFieldset {
  margin-bottom: 100px;
}

label {
  font-size: 25px;
}

input {
  position: relative;
  height: 30px;
  bottom: 3px;
  padding-left: 10px;
}

input[type=text] {
  width: 300px;
}

input[type=number] {
  width: 100px;
}

.buttons {
  position: relative;
  top: 50px;
}

#tonsEmited {
  font-size: 50px;
}

.eventsTable {
  width: 1100px;
}

.printableDeliverablesTable {
  width: 1000px;
}

legend {
  text-align: left;
  padding: 0 8px;
  border: none;
  font-size: 20px;
}

#projectInitialDuration {
  margin-left: 10px;
}

</style>