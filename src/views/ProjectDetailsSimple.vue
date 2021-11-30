<template>
  
  <ProjectDetailsHeader class="fixedHeader"/>

  <div class="simpleData">

      <div>
        <u><h2>General</h2></u>
        
        <div class="projectDurationDiv">
          <label for="projectInitialDuration">Project Duration:</label>
            <input v-model="project.from" type="number" id="projectInitialDuration" name="projectInitialDuration" @change="onCellEditComplete('from', $event)" />
            <span style="position: relative; font-size: 30px; margin: 0 10px"> - </span> 
            <input v-model="project.to" type="number" id="projectFinalDuration" name="projectFinalDuration" @change="onCellEditComplete('to', $event)" />
        </div>

        <div class="partnersDiv">
          <fieldset class="partnersFieldset">
            <legend>Partners</legend>

            <DataTable :value="project.partners" class="dataTable partnersTable" editMode="cell" 
                @cell-edit-complete="onCellEditCompletePartner">
              
              <div class="newPartnerDiv"><Btn id="newPartner" @click="addPartner">New partner</Btn></div>

              <Column field="name" header="Name">
                <template #editor="slotProps">
                    <InputText v-model="slotProps.data[slotProps.field]" />
                </template>
              </Column>

              <Column field="country" header="Country">
                <template #editor="slotProps">
                  <select v-model="slotProps.data[slotProps.field]" name="country" id="country" class="dropdown-toggle">
                    <option v-for="country in countriesForDropdown" :key="country" :value="country">{{country}}</option>
                  </select>
                </template>
              </Column>

              <Column field="personMonthsPP" header="PersonMonths PP*">
                <template #editor="slotProps" class="p-field">
                  <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons buttonLayout="horizontal" :step="0.25" decrementButtonClass="p-button-danger"
                  incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" />
                </template>
              </Column>

              <Column field="personMonthsWPP" header="PersonMonths WPP*">
                <template #editor="slotProps">
                  <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons buttonLayout="horizontal" :step="0.25" decrementButtonClass="p-button-danger"
                  incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" />
                </template>
              </Column>

              <Column field="seasonalEmployees" header="Seasonal employees">
                <template #editor="slotProps">
                  <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons buttonLayout="horizontal" :step="0.25" decrementButtonClass="p-button-danger"
                  incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" />
                </template>
              </Column>

              <Column field="externalExperts" header="External experts">
                <template #editor="slotProps">
                  <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons buttonLayout="horizontal" :step="0.25" decrementButtonClass="p-button-danger"
                  incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" />
                </template>
              </Column>

              <!-- Falta gestionar el cambio de coordinador  -->

              <Column field="coordinator" header="Coordinator">
                <template #body="slotProps">
                  <RadioButton :checked="slotProps.data[slotProps.field]" id="type_radio" name="type_radio" type="radio" />
                  <!-- @change="onCellEditCompletePartnerEquipment('coordinator', $event)" -->
                </template>
              </Column>

              <Column field="actions" header="Actions">
                <template #body="slotProps">
                  <img id="deleteIcon" :src="deleteIcon" @click="deletePartner(slotProps.index)" />
                </template>
              </Column>
            
            </DataTable>

          <div style="text-align: left; margin-top: 10px">
              *PP: Preparation phase<br>
              *WPP: Whole project period
          </div>
        </fieldset>

        </div> 
          
        <div class="dropdownToggleDiv">
        <label for="partnerEquipmentDropdown">Showing data for partner: </label>
          <Dropdown class="my-dropdown-toggle" id="partnerEquipmentDropdown"
          :options="project.partners.map(p => p.name)" 
          :selected="project.partners[0].name" 
          v-on:updateOption="methodToRunOnSelect" 
          :placeholder="placeholder"
          :closeOnOutsideClick="true">
          </Dropdown>
        </div> 

        <u><h2>Equipment</h2></u>
        
        
        
        <div class="itElectricalEquipmentDiv">
          <fieldset class="itElectricalEquipmentFieldset">
            <legend>Number of IT electrical equipment that will be purchased during the project</legend>

            <table class="dataTable itElectricalEquipmentTable">

                <tr>
                  <th>PC</th>
                  <th>PC with flat screen</th>
                  <th>Laptop computer</th>
                  <th>Flat screen</th>
                </tr>
                <tr>
                  <td>
                    <InputNumber v-model="selectedPartner.pcsBoughtDuringProject" mode="decimal"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @input="onCellEditCompletePartnerEquipment('pcsBoughtDuringProject', $event)"/>
                  </td>
                  <td>
                    <InputNumber v-model="selectedPartner.pcsFlatScreenBoughtDuringProject" mode="decimal"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @input="onCellEditCompletePartnerEquipment('pcsFlatScreenBoughtDuringProject', $event)"/>
                  </td>
                  <td>
                    <InputNumber v-model="selectedPartner.laptopsBoughtDuringProject" mode="decimal"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @input="onCellEditCompletePartnerEquipment('laptopsBoughtDuringProject', $event)"/>
                  </td>
                  <td>
                    <InputNumber v-model="selectedPartner.flatScreensBoughtDuringProject" mode="decimal"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @input="onCellEditCompletePartnerEquipment('flatScreensBoughtDuringProject', $event)"/>
                  </td>
                </tr>
                <tr>
                  <th>Computer Central Processes</th> 
                  <th>Printers</th>
                  <th>Copy machines</th>
                  <th>Fax machines</th>
                </tr>
                <tr>
                  <td>
                    <InputNumber v-model="selectedPartner.cppsBoughtDuringProject" mode="decimal"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @input="onCellEditCompletePartnerEquipment('cppsBoughtDuringProject', $event)"/>
                  </td>
                  <td>
                    <InputNumber v-model="selectedPartner.printersBoughtDuringProject" mode="decimal"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @input="onCellEditCompletePartnerEquipment('printersBoughtDuringProject', $event)"/>
                  </td>
                  <td>
                    <InputNumber v-model="selectedPartner.copyMachinesBoughtDuringProject" mode="decimal"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @input="onCellEditCompletePartnerEquipment('copyMachinesBoughtDuringProject', $event)"/>
                  </td>
                  <td>
                    <InputNumber v-model="selectedPartner.faxMachinesBoughtDuringProject" mode="decimal"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @input="onCellEditCompletePartnerEquipment('faxMachinesBoughtDuringProject', $event)"/>
                  </td>
                </tr>
            </table>
          </fieldset>
        </div>

        <div class="otherElectricalEquipmentDiv">
          <fieldset class="otherElectricalEquipmentFieldset">
            <legend>Other electrical equipment</legend>

            <table class="dataTable toolsAndMachinesTable">
              <thead>
                <tr>
                  <th>Total weight (T) of other electrical equipment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <InputNumber v-model="selectedPartner.totalWeightOtherElectricalEquipment" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger" :step="0.25"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @input="onCellEditCompletePartnerEquipment('totalWeightOtherElectricalEquipment', $event)"/>
                  </td>
                </tr>
              </tbody>
            </table>

          </fieldset>
        </div>

        <div class="toolsAndMachinesDiv">
          <fieldset class="toolsAndMachinesFieldset">
            <legend>Tools and machines</legend>

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
                  <td>
                    <InputNumber v-model="selectedPartner.totalWeightVehicles" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger" :step="0.25"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @input="onCellEditCompletePartnerEquipment('totalWeightVehicles', $event)"/>
                  </td>
                  <td>
                    <InputNumber v-model="selectedPartner.totalWeightMachines" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger" :step="0.25"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @input="onCellEditCompletePartnerEquipment('totalWeightMachines', $event)"/>
                  </td>
                  <td>
                    <InputNumber v-model="selectedPartner.totalWeightFurniture" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger" :step="0.25"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @input="onCellEditCompletePartnerEquipment('totalWeightFurniture', $event)" />
                  </td>
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
                  <td>
                    <InputNumber v-model="project.numberPublicEvents" mode="decimal"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" />
                  </td>
                  <td>
                    <InputNumber v-model="project.avgPublicEventsOnSiteParticipants" mode="decimal"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" />
                  </td>
                  <td>
                    <InputNumber v-model="project.avgPublicEventsVirtualParticipants" mode="decimal"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" />
                  </td>
                  <td>
                    <InputNumber v-model="project.avgPublicEventsDuration" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger" :step="0.25"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" />
                  </td>
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
                  <td>
                    <InputNumber v-model="project.numberInternalMeetings" mode="decimal"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" />
                  </td>
                  <td>
                    <InputNumber v-model="project.avgInternalMeetingsOnSiteParticipants" mode="decimal"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" />
                  </td>
                  <td>
                    <InputNumber v-model="project.avgInternalMeetingsVirtualParticipants" mode="decimal"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" />
                  </td>
                  <td>
                    <InputNumber v-model="project.avgInternalMeetingsDuration" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger" :step="0.25"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" />
                  </td>
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
                  <td>
                    <InputNumber v-model="project.numberEventsParticipated" mode="decimal"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" />
                  </td>
                  <td>
                    <InputNumber v-model="project.avgParticipatedEventsParticipants" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger" :step="0.25"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" />
                  </td>
                  <td>
                    <InputNumber v-model="project.avgParticipatedEventsDuration" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                    showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger" :step="0.25"
                    incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" />
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </div>

        <u><h2>Printable deliverables</h2></u>
        
        <div class="printableDeliverablesDiv">
          <fieldset class="printableDeliverablesFieldset">
            <legend>Printable deliverables</legend>

            <DataTable :value="project.printableDeliverables" class="dataTable printableDeliverablesTable" editMode="cell" 
                      @cell-edit-complete="onCellEditCompletePrintableDeliverable">

              <div class="newPrintableDeliverableDiv">
                <Btn id="newPrintableDeliverable" @click="addPrintableDeliverable">New printable deliverable</Btn>
              </div>

              <Column field="deliverableType" header="Deliverable type">
                <template #editor="slotProps">
                  <select v-model="slotProps.data[slotProps.field]" name="deliverableType" id="value" class="dropdown-toggle">
                    <option v-for="option in deliverableOptions" :key="option.value" :value="option.value">{{option.value}}</option>
                  </select>
                </template>
              </Column>

              <Column field="deliverableName" header="Deliverable Name">
                <template #editor="slotProps">
                  <select v-model="slotProps.data[slotProps.field]" name="deliverableName" id="deliverableName" class="dropdown-toggle">
                    <option v-for="type in getDeliverableNames(slotProps.data.deliverableType)" :key="type" :value="type">{{type}}</option>
                  </select>
                </template>
              </Column>

              <Column field="copies" header="Copies">
                <template #editor="slotProps">
                    <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal"
                          showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                          incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                </template>
              </Column>

              <Column field="avgPagesPerCopy" header="Average pages per copy">
                <template #editor="slotProps">
                    <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal"
                          showButtons buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                          incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                </template>
              </Column>

              <Column field="actions" header="Actions">
                <template #body="slotProps">
                  <img id="deleteIcon" :src="deleteIcon" @click="deletePrintableDeliverable(slotProps.index)" />
                </template>
              </Column>

            </DataTable>
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
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import InputNumber from 'primevue/inputnumber';
import axios from "axios";
import 'primeicons/primeicons.css';

export default {
  name: 'ProjectDetailsSimple',
  components: {
    ProjectDetailsHeader,
    Dropdown,
    Btn,
    DataTable,
    Column,
    InputText,
    RadioButton,
    InputNumber
  },
  data() {
    return {
      deleteIcon: deleteIcon,
      placeholder: "Select a partner",
      arrayOfObjects: ["MEDIPLASMA SRL", "Q TECHNOLOGIES LTD", "CO2CRC Management Pty Ltd"],
      project: {},
      countriesForDropdown: ["Albania", "Bosnia & Herzegovina", "Croatia", "Cyprus", "France", "Greece", "Italy", "Malta", "Montenegro", "Portugal", "Slovenia", "Spain", "Gibraltar"],
      deliverableOptions: {
        applicationForm: {value: "Application form", deliverableNames: ["Application form"]},
        method: {value: "Method", deliverableNames: ["Steering and Technical committees procedures", "Guidelines", "Indicators list", "Evaluation method", "Evaluation plan", "Methodology", "Model", "Benchmarking method", "Toolkit", "Road map", "Strategy", "Action plan", "Manual", "Community building", "Report"]},
        tool: {value: "Tool", deliverableNames: ["Manual", "Guidance", "Plan", "Intranet guidance", "Course", "Training", "Toolbox", "Survey", "Questionnaire", "Collecting information tool instructions", "Training material", "Decision tool", "Monitoring tool", "Protocol", "Maps", "GIS", "Legal acts"]},
        meeting: {value: "Meeting", deliverableNames: ["SC and TC meeting minutes", "Report", "Minutes"]},
        data: {value: "Data", deliverableNames: ["Evaluation report", "Thematic data collection", "Good practices", "Stakeholders and beneficiaries", "Database"]},
        plan: {value: "Plan", deliverableNames: ["Communication/Capitalization Plan"]},
        informalOrFormalizedGroupingOfActors: {value: "Informal/formalized grouping of actors", deliverableNames: ["Forum", "Blog", "Platform"]},
        digitalOrWrittenCommunication: {value: "Digital or written communication", deliverableNames: ["Article", "Booklet", "Brochure", "Newsletter", "Proceedings ", "Social networks", "Story telling", "Flyer", "Poster", "Widget", "Goodies"]},
        provisionOfInformationAndData: {value: "Provision of information and Data", deliverableNames: ["Feeding the web platform", "Report"]},
        report: {value: "Report", deliverableNames: ["State of the art ", "SWOT Analysis", "Needs Analysis", "Diagnosis", "Case study", "Comparative analysis", "Feasibility study", "Prospective study", "Benchmarking study", "Consultation report", "Technical workshop report"]},
        map: {value: "Map", deliverableNames: ["Maps", "GIS", "Itinerary / routes"]},
        observatory: {value: "Observatory", deliverableNames: ["Observatory"]},
        preliminaryStudy: {value: "Preliminary study", deliverableNames: ["Preliminary or fine-tuning study for launching pilot activities"]},
        toolService: {value: "Tool Service", deliverableNames: ["Testing report", "Software support/service", "Facilities"]},
        pressConference: {value: "Press conference", deliverableNames: ["Report", "Kit"]},
        publicOrPoliticalEvent: {value: "Public/political event", deliverableNames: ["Conference/meeting report", "Forum"]},
        trainingMaterial: {value: "Training material", deliverableNames: ["E-learning platform", "Training course material"]},
        trainingCourse: {value: "Training course", deliverableNames: ["Training report", "Methodology"]},
        tailoredEvent: {value: "Tailored event", deliverableNames: ["A typical/tailored event report"]},
        technicalEvent: {value: "Technical event", deliverableNames: ["Seminar/ Workshop /Metting reports"]},
        other: {value: "Other", deliverableNames: ["Other"]}
      }
    }
  },
  created(){
    this.getProject();
  },
  methods: {
    methodToRunOnSelect(payload) {
      this.object = payload;
      this.$store.dispatch("updateSelectedPartner", payload);
    },
    getProject(){
      this.axios.get('/projects')
      .then((response) => {
        console.log(response.data)
        this.project = response.data[0];
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    
      this.axios.get('/partners')
      .then((response) => {
        console.log(response.data)
        this.project.partners = response.data;
        this.$store.dispatch("updateSelectedPartner", response.data[0].name);
      })
      .catch((e)=>{
        console.log('error' + e);
      })

      this.axios.get('/printableDeliverables')
      .then((response) => {
        console.log(response.data)
        this.project.printableDeliverables = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    addPrintableDeliverable() {
      let newPrintableDeliverable = {
        deliverableType: "Select a deliverable type",
        deliverableName: "Select a deliverable name",
        copies: 1,
        avgPagesPerCopy: 1,
        project: this.project._id}

      this.axios.post('/printableDeliverables/new', newPrintableDeliverable)
      .then((response) => {
        console.log("Response: ", response.data)
        this.project.printableDeliverables.unshift(response.data)
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    addPartner() {
      let newPartner = {
        name: "New partner",
        country: "Select a country",
        personMonthsPP: 1,
        personMonthsWPP: 1,
        employeesWorkingWPP: 1,
        seasonalEmployees: 1,
        externalExperts: 1,
        coordinator: false,

        pcsBoughtDuringProject: 0,
        pcsFlatScreenBoughtDuringProject: 0,
        laptopsBoughtDuringProject: 0,
        flatScreensBoughtDuringProject: 0,
        cppsBoughtDuringProject: 0,
        printersBoughtDuringProject: 0,
        copyMachinesBoughtDuringProject: 0,
        faxMachinesBoughtDuringProject: 0,

        totalWeightOtherElectricalEquipment: 0,

        totalWeightVehicles: 0,
        totalWeightMachines: 0,
        totalWeightFurniture: 0,
        project: this.project._id}

      this.axios.post('/partners/new', newPartner)
      .then((response) => {
        console.log("Response: ", response.data)
        this.project.partners.unshift(response.data)
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    deletePartner(index) {
      let partner = this.project.partners[index]

      this.axios.delete('/partners/delete/' + partner._id)
      .then((response) => {

        console.log(response.data)
        // this.project.partners.splice(partner, 1);
        
        // Esto va bien ahora porque hay pocos datos, si hay muchos seguramente haya que modificarlo
        // Por algún motivo, a veces se desincronizan los datos del backend y el frontend

        this.axios.get('/partners')
        .then((response) => {
          console.log(response.data)
          this.project.partners = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })

      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    getDeliverableNames(deliverableType) {
      for (let option in this.deliverableOptions) {
        if (this.deliverableOptions[option].value === deliverableType) {
          return this.deliverableOptions[option].deliverableNames;
        }
      }
    },
    deletePrintableDeliverable(index) {
      let printableDeliverable = this.project.printableDeliverables[index]

      this.axios.delete('/printableDeliverables/delete/' + printableDeliverable._id)
      .then((response) => {

        console.log(response.data)
        // this.project.printableDeliverables.splice(printableDeliverable, 1);
        
        // Esto va bien ahora porque hay pocos datos, si hay muchos seguramente haya que modificarlo
        // Por algún motivo, a veces se desincronizan los datos del backend y el frontend

        this.axios.get('/printableDeliverables')
        .then((response) => {
          console.log(response.data)
          this.project.printableDeliverables = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })

      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    onCellEditComplete(field, event) {
      let newValue = event.target.value
      const paramsData = {}
      paramsData[field] = newValue;

      axios.put("/projects/update/" + this.project._id, paramsData).then(response => {
        console.log(response.data);
        this.project[field] = newValue
      }).catch(error =>{
        console.log(error)
      })
    },
    onCellEditCompletePartner(event) {
      let { data, newValue, newData, field } = event;
      const paramsData = {}

      newData[field] = newValue;
      paramsData[field] = newValue;
      
      axios.put("/partners/update/" + data._id, paramsData).then(response => {
        console.log(response.data);
        this.project.partners.splice(this.project.partners.indexOf(data), 1, newData)
      }).catch(error =>{
        console.log(error)
      })
    },
    onCellEditCompletePartnerEquipment(field, event) {
      let newValue = event.value
      let partnerId = this.selectedPartner._id
      const paramsData = {}
      paramsData[field] = newValue;

      axios.put("/partners/update/" + partnerId, paramsData).then(response => {
        console.log(response.data);
        this.project[field] = newValue
      }).catch(error =>{
        console.log(error)
      })
    },
    // onCellEditCompletePartnerCoordinator(event) {         Crear un nuevo método con un endpoint específico en el backend para cambiar
    //   let newValue = event.value                          de coordinador en un proyecto
    //   let partnerId = this.selectedPartner._id
    //   const paramsData = {}
    //   paramsData["coordinator"] = newValue;

    //   axios.put("/partners/update/" + partnerId, paramsData).then(response => {
    //     console.log(response.data);
    //     this.project[field] = newValue
    //   }).catch(error =>{
    //     console.log(error)
    //   })
    // }
    onCellEditCompletePrintableDeliverable(event) {
      let { data, newValue, newData, field } = event;
      const paramsData = {}

      newData[field] = newValue;
      paramsData[field] = newValue;

      if (field === "deliverableType") {
        paramsData["deliverableName"] = "Select a deliverable name"
        newData["deliverableName"] = "Select a deliverable name"
      }
      
      axios.put("/printableDeliverables/update/" + data._id, paramsData).then(response => {
        console.log(response.data);
        this.project.printableDeliverables.splice(this.project.printableDeliverables.indexOf(data), 1, newData)
      }).catch(error =>{
        console.log(error)
      })
    }
  },
  computed: {
    ...mapState([
      'selectedPartnerForEquipmentSimple'
    ]),
    selectedPartner() {
      return this.project.partners.find(p => { 
        return p.name === this.selectedPartnerForEquipmentSimple
      })
    } 
  }
}
</script>

<style scoped>

@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

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