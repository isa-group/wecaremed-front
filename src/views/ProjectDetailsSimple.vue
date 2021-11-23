<template>
  
  <ProjectDetailsHeader class="fixedHeader"/>

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
            <table class="dataTable partnersTable">
              <div class="newPartnerDiv"><Btn id="newPartner">New partner</Btn></div>

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Country</th>
                  <th>PersonMonths PP*</th>
                  <th>PersonMonths WPP*</th>
                  <th>Employees Working WPP*</th>
                  <th>Seasonal employees</th>
                  <th>External experts</th>
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
                  <td>5</td>
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
                  <td>7</td>
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
                  <td>2</td>
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
          
        <u><h2>Equipment</h2></u>
        
        <div class="dropdownToggleDiv">
        <label for="partnerEquipmentDropdown">Showing data for partner: </label>
          <Dropdown class="my-dropdown-toggle" id="partnerEquipmentDropdown"
          :options="arrayOfObjects" 
          :selected="selectedPartnerForEquipmentSimple" 
          v-on:updateOption="methodToRunOnSelect" 
          :placeholder="placeholder"
          :closeOnOutsideClick="true">
          </Dropdown>
        </div>

        <div class="itElectricalEquipmentDiv">
          <fieldset class="itElectricalEquipmentFieldset">
            <legend>IT electrical equipment</legend>

            <table class="dataTable itElectricalEquipmentTable">
              <thead>
                <tr>
                  <th>PC</th>
                  <th>PC with flat screen</th>
                  <th>Laptop computer</th>
                  <th>Flat screen</th>
                  <th>Computer Central Processes</th> 
                  <th>Printers</th>
                  <th>Copy machines</th>
                  <th>Fax machines</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10</td>
                  <td>15</td>
                  <td>25</td>
                  <td>50</td>
                  <td>500</td>
                  <td>10</td>
                  <td>10</td>
                  <td>5</td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </div>

        <div class="otherElectricalEquipmentDiv">
          <fieldset class="otherElectricalEquipmentFieldset">
            <legend>Other electrical equipment</legend>

            <label for="itItemsPurchased">Total weight (T) of other electrical equipment: </label>
            <input type="number" id="itItemsPurchased" name="itItemsPurchased" value="78"/>

          </fieldset>
        </div>

        <div class="toolsAndMachinesDiv">
          <fieldset class="toolsAndMachinesFieldset">
            <legend>Other electrical equipment</legend>

            <table class="dataTable toolsAndMachinesTable">
              <thead>
                <tr>
                  <th>Total weight of vehicles (T)</th>
                  <th>Total weight of machines (T)</th>
                  <th>Total weight of furniture (T)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>7.49</td>
                  <td>201.55</td>
                  <td>5.04</td>
                </tr>
              </tbody>
            </table>
          </fieldset>
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
              <div class="newPrintableDeliverableDiv"><Btn id="newPrintableDeliverable">New printable deliverable</Btn></div>

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
                <tr>
                  <td>Written communication</td>
                  <td>Poster</td>
                  <td>5</td>
                  <td>1</td>
                  <td><img id="deleteIcon" :src="deleteIcon" /></td>
                </tr>
                <tr>
                  <td>Method</td>
                  <td>Action plan</td>
                  <td>1</td>
                  <td>140</td>
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
import Dropdown from 'vue-dropdowns';
import { mapState } from 'vuex'
import Btn from '@/components/Btn.vue'

export default {
  name: 'ProjectDetailsSimple',
  components: {
    ProjectDetailsHeader,
    Dropdown,
    Btn
  },
  data() {
    return {
      deleteIcon: deleteIcon,
      placeholder: "Select a partner",
      arrayOfObjects: ["MEDIPLASMA SRL", "Q TECHNOLOGIES LTD", "CO2CRC Management Pty Ltd"],
    }
  },
  methods: {
    methodToRunOnSelect(payload) {
      this.object = payload;
      this.$store.dispatch("updateSelectedPartner", payload);
    },
  },
  computed: {
    ...mapState([
      'selectedPartnerForEquipmentSimple'
    ])
  }
}
</script>

<style scoped>

.fixedHeader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* background-color: #42b983; */
  z-index: 1;
}

.dropdownToggleDiv {
  text-align: left;
}

.my-dropdown-toggle {
  border-radius: 5px;
}
.my-dropdown-toggle > .dropdown-toggle {
    color: #04AA6D;
    font-size: 25px;
    font-weight: 800;
}

.my-dropdown-toggle > .dropdown-toggle-placeholder {
    color: #c4c4c4;
}

#deleteIcon {
  width: 20px;
  cursor: pointer;
}

.simpleData {
  margin: 200px 60px 0;
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

.newPartnerDiv {
  position: absolute;
  right: 0;
  top: -100px;
}

.newPrintableDeliverableDiv {
  position: absolute;
  right: 0;
  top: -100px;
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
  border: 2px solid #42b983;
  border-radius: 5px;
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

.itElectricalEquipmentDiv, .otherElectricalEquipmentDiv {
  margin-bottom: 15px;
}

</style>