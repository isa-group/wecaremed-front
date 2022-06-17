<template>
  <Toast position="bottom-right" />
  <Topbar v-model:projectInfo="project" />

  <div class="projectDetailsElectrictyGrid">

    <div class="colCustom">
      <div class="card">

        <div style="display: flex; align-items: center; justify-content: space-between;">
          <h2 v-if="project.isInitialProject">Project's base data</h2>
          <h2 v-else-if="!project.isInitialProject">Project's monitoring period data</h2>

          <div style="margin: 1.5rem 0 1rem 0;">
            <div style="text-align: center">
              <h5 class="m-0 mb-2">Project data</h5>
              <label id="app-mode-label" class="initialDataLabel">Base</label>
              <InputSwitch id="projectData" v-model="toggleProject" @click="toggleProjectView()" />    
              <label id="app-mode-label" class="currentDataLabel" style="margin-left: 0.75rem; margin-right: auto;">Monitoring period</label>
            </div>
          </div>
        </div>

        <!-- Data -->

				<TabView>
					<TabPanel header="Data">
            <div id="pdfPrintDiv" style="display: none">
              
              <h1>{{project.name}}&nbsp;
                ({{ (new Date(project.from).getMonth() + 1).toString().padStart(2, "0") + '/' + new Date(project.from).getFullYear()}} -&nbsp;
                {{(new Date(project.to).getMonth() + 1).toString().padStart(2, "0") + '/' + new Date(project.to).getFullYear()}})
                [{{project.initialCF}} / {{project.currentCF}}] t CO₂e&nbsp;
              </h1>   

              <h3>Partners*</h3>
                        
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Coordinator</th>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Number full time employees</th>
                    <th>Number part time employees</th>
                    <th>Person months</th>
                    <th>Number of external experts</th>
                    <th>Sum person months for the external experts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="partner in project.partners" :key="partner._id">
                    <td>{{partner.coordinator}}</td>
                    <td>{{partner.name}}</td>
                    <td>{{partner.country}}</td>
                    <td>{{partner.employeesWorkingWPP}}</td>
                    <td>{{partner.seasonalEmployees}}</td>
                    <td>{{partner.employeesPersonMonths}}</td>
                    <td>{{partner.externalExperts}}</td>
                    <td>{{partner.externalExpertsPersonMonths}}</td>
                  </tr>
                </tbody>
              </table>
              * The values of this section refer to staff members (full time + part time) concerning the whole project duration

              <h3 style="margin-top: 35px">Equipment</h3>

              <p>Number of IT electrical equipment that will be purchased during the project</p>
              <div v-for="partner in project.partners" :key="partner._id">
                <h5>{{partner.name}}</h5>

                <table class="table table-bordered" style="margin-bottom: 20px">
                  <thead>
                    <tr>
                      <th>PCs</th>
                      <th>PCs with flat screen</th>
                      <th>Laptop computers</th>
                      <th>Flat screens</th>
                      <th>Printers</th>
                      <th>Copy machines</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{partner.pcsBoughtDuringProject}}</td>
                      <td>{{partner.pcsFlatScreenBoughtDuringProject}}</td>
                      <td>{{partner.laptopsBoughtDuringProject}}</td>
                      <td>{{partner.flatScreensBoughtDuringProject}}</td>
                      <td>{{partner.printersBoughtDuringProject}}</td>
                      <td>{{partner.copyMachinesBoughtDuringProject}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 style="margin-top: 20px">Events</h3>

              <div>
                <h5>Public events</h5>

                <h6>In presence</h6>
                <table class="table table-bordered" style="margin-bottom: 20px">
                  <thead>
                    <tr>
                      <th>Number of in presence public events</th>
                      <th>Average number of physical participants</th>
                      <th>Average number of non-local** physical participants</th>
                      <th>Average duration (days)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{project.publicOnSiteEventsNumber}}</td>
                      <td>{{project.publicOnSiteEventsAveragePhysicalParticipants}}</td>
                      <td>{{project.publicOnSiteEventsAverageNonLocalPhysicalParticipants}}</td>
                      <td>{{project.publicOnSiteEventsAverageDuration}}</td>
                    </tr>
                  </tbody>
                </table>

                <h6>Mixed mode: both in presence and on-line</h6>
                <table class="table table-bordered" style="margin-bottom: 20px">
                  <thead>
                    <tr>
                      <th>Number of mixed public events</th>
                      <th>Average number of physical participants</th>
                      <th>Average number of non-local** physical participants</th>
                      <th>Average number of on-line participants</th>
                      <th>Average duration (days)</th>
                      <th>Average duration (hours/day)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{project.publicHybridEventsNumber}}</td>
                      <td>{{project.publicHybridEventsAveragePhysicalParticipants}}</td>
                      <td>{{project.publicHybridEventsAverageNonLocalPhysicalParticipants}}</td>
                      <td>{{project.publicHybridEventsAverageVirtualParticipants}}</td>
                      <td>{{project.publicHybridEventsAverageDuration}}</td>
                      <td>{{project.publicHybridEventsAverageHoursPerDays}}</td>
                    </tr>
                  </tbody>
                </table>

                <h6>On-line</h6>
                <table class="table table-bordered" style="margin-bottom: 20px">
                  <thead>
                    <tr>
                      <th>Number of on-line public events</th>
                      <th>Average number of on-line participants</th>
                      <th>Average duration (hours)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{project.publicVirtualEventsNumber}}</td>
                      <td>{{project.publicVirtualEventsAverageVirtualParticipants}}</td>
                      <td>{{project.publicVirtualEventsAverageDuration}}</td>
                    </tr>
                  </tbody>
                </table>

              <h5 style="margin-top: 20px">Internal events/meetings</h5>

                <h6>In presence</h6>
                <table class="table table-bordered" style="margin-bottom: 20px">
                  <thead>
                    <tr>
                      <th>Number of in presence internal events/meetings</th>
                      <th>Average number of physical participants</th>
                      <th>Average number of non-local** physical participants</th>
                      <th>Average duration (days)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{project.internalOnSiteEventsNumber}}</td>
                      <td>{{project.internalOnSiteEventsAveragePhysicalParticipants}}</td>
                      <td>{{project.internalOnSiteEventsAverageNonLocalPhysicalParticipants}}</td>
                      <td>{{project.internalOnSiteEventsAverageDuration}}</td>
                    </tr>
                  </tbody>
                </table>

                <h6>Mixed mode: both in presence and on-line</h6>
                <table class="table table-bordered" style="margin-bottom: 20px">
                  <thead>
                    <tr>
                      <th>Number of mixed internal events/meetings</th>
                      <th>Average number of physical participants</th>
                      <th>Average number of non-local** physical participants</th>
                      <th>Average number of on-line participants</th>
                      <th>Average duration (days)</th>
                      <th>Average duration (hours/day)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{project.internalHybridEventsNumber}}</td>
                      <td>{{project.internalHybridEventsAveragePhysicalParticipants}}</td>
                      <td>{{project.internalHybridEventsAverageNonLocalPhysicalParticipants}}</td>
                      <td>{{project.internalHybridEventsAverageVirtualParticipants}}</td>
                      <td>{{project.internalHybridEventsAverageDuration}}</td>
                      <td>{{project.internalHybridEventsAverageHoursPerDays}}</td>
                    </tr>
                  </tbody>
                </table>

                <h6>On-line</h6>
                <table class="table table-bordered" style="margin-bottom: 20px">
                  <thead>
                    <tr>
                      <th>Number of on-line internal events/meetings</th>
                      <th>Average number of on-line participants</th>
                      <th>Average duration (hours)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{project.internalVirtualEventsNumber}}</td>
                      <td>{{project.internalVirtualEventsAverageVirtualParticipants}}</td>
                      <td>{{project.internalVirtualEventsAverageDuration}}</td>
                    </tr>
                  </tbody>
                </table>
              * The values of this section refer to the whole project partnership
              ** Participants travelling to the hosting city (national/international travel) only for the participation to the even

              <h5 style="margin-top: 20px">Events participated by the project</h5>

                <h6>In presence</h6>
                <table class="table table-bordered" style="margin-bottom: 20px">
                  <thead>
                    <tr>
                      <th>Number of in presence events participated by the project</th>
                      <th>Average number of participants of the project</th>
                      <th>Average duration (days)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{project.participatedOnSiteEventsNumber}}</td>
                      <td>{{project.participatedOnSiteEventsAverageParticipants}}</td>
                      <td>{{project.participatedOnSiteEventsAverageDuration}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 style="margin-top: 20px">Printable deliverables</h3>
                        
              <table class="table table-bordered" style="margin-bottom: 35px">
                <thead>
                  <tr>
                    <th>Deliverable type</th>
                    <th>Copies</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="pd in project.printableDeliverables" :key="pd._id">
                    <td>{{pd.deliverableType}}</td>
                    <td>{{pd.copies}}</td>
                  </tr>
                </tbody>
              </table>

              <h2>Tons of CO₂ equivalent emitted: {{project.currentCF}}</h2>
              <h2>Price of the ton of CO₂ equivalent: {{co2PermitsPrice + ' €'}}</h2>
              <h2 style="margin-bottom: 40px">CO₂ permits cost: {{round(project.currentCF * co2PermitsPrice) + ' €'}}</h2>
              
              <h3 style="margin-bottom: 10px">Carbon Footprint breakdown (Tons):</h3>
              <ul>
                <li style="margin-bottom: 10px; font-size: 20px">Fuels (Heating): {{project.fuelsHeatAdvancedCF}}</li>
                <li style="margin-bottom: 10px; font-size: 20px">Electricity: {{project.electricityAdvancedCF}}</li>
                <li style="margin-bottom: 10px; font-size: 20px">Water: {{project.waterAdvancedCF}}</li>
                <li style="margin-bottom: 10px; font-size: 20px">Transportation: {{project.transportationAdvancedCF}}</li>
                <li style="margin-bottom: 10px; font-size: 20px">Materials: {{project.materialsAdvancedCF}}</li>
                <li style="margin-bottom: 10px; font-size: 20px">Printable deliverables: {{project.printableDeliverablesAdvancedCF}}</li>
                <li style="margin-bottom: 10px; font-size: 20px">Equipment: {{project.equipmentAdvancedCF}}</li>
                <li style="font-size: 20px">Events: {{project.eventsAdvancedCF}}</li>
              </ul>

            </div>

            <div class="card col-12">

              <h4>Partners*</h4>

              <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
              :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="10" v-model:filters="partnerFilters"
              filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
              :globalFilterFields="['name','country','employeesPersonMonths', 'externalExpertsPersonMonths', 'employeesWorkingWPP', 
                                    'seasonalEmployees', 'externalExperts', 'coordinator'] " removableSort>
                
                <template #header>
                    <div class="flex justify-content-between flex-column sm:flex-row">
                      <div>
                        <Button class="p-button-info mr-2" @click="addPartner"><i class="pi pi-plus mr-2" />New partner</Button>
                        <span class="p-input-icon-left">
                          <i class="pi pi-search" />
                          <InputText v-model="partnerFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                        </span>
                        <Button class="ml-2" label="Save" icon="pi pi-check" @click="savePartners" />
                      </div>
                      
                      <Button type="button" icon="pi pi-filter-slash" label="Clear filters" class="p-button-warning" @click="clearPartnerFilter()"/>
                    </div>
                </template>

                <template #empty>
                    No partners found.
                </template>

                <template #loading>
                    Loading partners. Please wait.
                </template>
                <Column field="coordinator" header="Coordinator" :sortable="true">
                  <template #body="slotProps">
                    <RadioButton name="projectCoordinator" :value="slotProps.data._id" v-model="project.coordinator"
                    @change="onCellEditCompletePartnerCoordinator(slotProps.data, $event)" />
                  </template>
                </Column>

                <Column field="name" header="Name" :sortable="true">
                  <template #body="slotProps">
                    <td :class="slotProps.data[slotProps.field] == 'New partner' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                  </template>
                  <template #editor="slotProps">
                      <InputText v-model="slotProps.data[slotProps.field]" @focus="$event.target.select()"/>
                  </template>
                </Column>

                <Column field="country" header="Country" :sortable="true">
                  <template #body="slotProps">
                    <td :class="slotProps.data[slotProps.field] == 'Select a country' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                  </template>
                  <template #editor="slotProps">
                    <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                  </template>
                </Column>

                <Column field="employeesPersonMonths" header="Person months" :sortable="true">
                  <template #editor="slotProps" class="p-field">
                    <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                    showButtons :step="0.25" decrementButtonClass="p-button-info"
                    incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                  </template>
                </Column>

                <Column field="twoWayTravels" header="Number of two-way travels for work commuting" :sortable="true">
                  <template #editor="slotProps">
                    <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                    incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                  </template>
                </Column>

                <Column field="actions" header="Actions">
                  <template #body="slotProps">
                    <i class="pi pi-trash" @click="deletePartner(project.partners.indexOf(slotProps.data))" v-tooltip.top="'Delete partner'" />
                  </template>
                </Column>
              
              </DataTable>
              <p>* The values of this section refer to staff members (full time + part time) concerning the whole project duration</p>
            </div>

            <div class="card">
              <h4>External experts</h4>

              <DataTable :value="this.project.externalExperts" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
              :rowHover="true" @cell-edit-complete="onCellEditCompleteExternalExpert" sortMode="multiple" :rows="5" v-model:filters="externalExpertFilters"
              filterDisplay="menu" :loading="loading" :filters="externalExpertFilters" responsiveLayout="scroll"
              :globalFilterFields="['typeOfExpertise','country','personMonthsWPP', 'twoWayTravels']" removableSort>
                
                <template #header>
                    <div class="flex justify-content-between flex-column sm:flex-row">
                      <div>
                        <Button class="p-button-info mr-2" @click="addExternalExpert"><i class="pi pi-plus mr-2" />New external expert</Button>
                        <span class="p-input-icon-left">
                          <i class="pi pi-search" />
                          <InputText v-model="externalExpertFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                        </span>
                        <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveExternalExperts" />
                      </div>
                      
                      <Button type="button" icon="pi pi-filter-slash" label="Clear filters" class="p-button-warning" @click="clearExternalExpertFilter()"/>
                    </div>
                </template>

                <template #empty>
                    No external experts found.
                </template>

                <template #loading>
                    Loading external experts. Please wait.
                </template>

                <Column field="typeOfExpertise" header="Type of expertise" :sortable="true">
                  <template #body="slotProps">
                    <td :class="slotProps.data[slotProps.field] == 'New external expert' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                  </template>
                  <template #editor="slotProps">
                      <InputText v-model="slotProps.data[slotProps.field]" @focus="$event.target.select()"/>
                  </template>
                </Column>

                <Column field="country" header="Country" :sortable="true">
                  <template #body="slotProps">
                    <td :class="slotProps.data[slotProps.field] == 'Select a country' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                  </template>
                  <template #editor="slotProps">
                    <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                  </template>
                </Column>

                <Column field="personMonthsWPP" header="Person months" :sortable="true">
                  <template #editor="slotProps">
                    <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                    showButtons :step="0.25" decrementButtonClass="p-button-info"
                    incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                  </template>
                </Column>

                <Column field="twoWayTravels" header="Number of two-way travels for work commuting" :sortable="true">
                  <template #editor="slotProps">
                    <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                    incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                  </template>
                </Column>

                <Column field="actions" header="Actions">
                  <template #body="slotProps">
                    <i class="pi pi-trash" @click="deleteExternalExperts(project.externalExperts.indexOf(slotProps.data))" v-tooltip.top="'Delete external expert'" />
                  </template>
                </Column>
              
              </DataTable>
              *The values of this field are referred only to external experts concerning the whole project duration
            </div>


            <div class="col-12">    
              <div class="card">
                <h4>Equipment</h4>
                <template v-if="selectedPartner">
                  <div class="mb-5">
                  <label for="partnerEquipmentDropdown">Showing data for partner: </label>
                    <Dropdown class="ml-2" :options="project.partners" optionLabel="name" optionValue="name"
                              v-model="selectedPartnerForEquipmentSimple" @change="updateSelectedPartner" />
                  </div> 

                  <div class="card">
                    <h5>Number of IT electrical equipment that will be purchased during the project</h5>

                    <div class="p-fluid formgrid grid">
                      <div class="field col-12 md:col-4">
                        <label for="pcsBoughtDuringProject">PCs</label>
                        <InputNumber v-model="selectedPartner.pcsBoughtDuringProject" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="decimal"
                        showButtons :allowEmpty="false" :min="0" id="pcsBoughtDuringProject" :inputClass="selectedPartner.pcsBoughtDuringProject == 0 ? 'defaultValue' : ''"
                        @focus="onFocusValue=selectedPartner.pcsBoughtDuringProject; $event.target.select()" @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompletePartnerEquipment('pcsBoughtDuringProject', selectedPartner.pcsBoughtDuringProject)" />
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="pcsFlatScreenBoughtDuringProject">PCs with flat screen</label>
                        <InputNumber v-model="selectedPartner.pcsFlatScreenBoughtDuringProject" mode="decimal" decrementButtonClass="p-button-info"
                        showButtons incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" id="pcsFlatScreenBoughtDuringProject" :inputClass="selectedPartner.pcsFlatScreenBoughtDuringProject == 0 ? 'defaultValue' : ''"
                        @focus="onFocusValue=selectedPartner.pcsFlatScreenBoughtDuringProject; $event.target.select()" @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompletePartnerEquipment('pcsFlatScreenBoughtDuringProject', selectedPartner.pcsFlatScreenBoughtDuringProject)" />
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="laptopsBoughtDuringProject">Laptop computers</label>
                        <InputNumber v-model="selectedPartner.laptopsBoughtDuringProject" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" incrementButtonClass="p-button-info" :inputClass="selectedPartner.laptopsBoughtDuringProject == 0 ? 'defaultValue' : ''"
                        incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :allowEmpty="false" :min="0" id="laptopsBoughtDuringProject"
                        @focus="onFocusValue=selectedPartner.laptopsBoughtDuringProject; $event.target.select()" @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompletePartnerEquipment('laptopsBoughtDuringProject', selectedPartner.laptopsBoughtDuringProject)" />
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="flatScreensBoughtDuringProject">Flat screens</label>
                        <InputNumber v-model="selectedPartner.flatScreensBoughtDuringProject" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" incrementButtonClass="p-button-info" :inputClass="selectedPartner.flatScreensBoughtDuringProject == 0 ? 'defaultValue' : ''"
                        incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :allowEmpty="false" :min="0" id="flatScreensBoughtDuringProject"
                        @focus="onFocusValue=selectedPartner.flatScreensBoughtDuringProject; $event.target.select()" @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompletePartnerEquipment('flatScreensBoughtDuringProject', selectedPartner.flatScreensBoughtDuringProject)" />
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="printersBoughtDuringProject">Printers</label>
                        <InputNumber v-model="selectedPartner.printersBoughtDuringProject" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" incrementButtonClass="p-button-info" :inputClass="selectedPartner.printersBoughtDuringProject == 0 ? 'defaultValue' : ''"
                        incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :allowEmpty="false" :min="0" id="printersBoughtDuringProject"
                        @focus="onFocusValue=selectedPartner.printersBoughtDuringProject; $event.target.select()" @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompletePartnerEquipment('printersBoughtDuringProject', selectedPartner.printersBoughtDuringProject)" />
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="copyMachinesBoughtDuringProject">Copy machines</label>
                        <InputNumber v-model="selectedPartner.copyMachinesBoughtDuringProject" mode="decimal" 
                        showButtons decrementButtonClass="p-button-info" :allowEmpty="false" :min="0" id="copyMachinesBoughtDuringProject"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :inputClass="selectedPartner.copyMachinesBoughtDuringProject == 0 ? 'defaultValue' : ''"
                        @focus="onFocusValue=selectedPartner.copyMachinesBoughtDuringProject; $event.target.select()" @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompletePartnerEquipment('copyMachinesBoughtDuringProject', selectedPartner.copyMachinesBoughtDuringProject)" />
                      </div>
                    </div>
                  </div>
                </template>

                <template v-else>
                  <strong>Equipment data cannot be displayed because there aren't any partners in this project</strong>
                </template>
              </div>
            </div>

            <div class="col-12" v-if="project.events">
              <div class="card">
                <h4>Events*</h4>

                <TabView>
                  <TabPanel header="Events organized by the project" v-if="project.events && project.events.organization">

                    <DataTable :value="project.events.organization" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompleteEvents" sortMode="multiple" :rows="5" v-model:filters="organizationEventsFilters"
                    filterDisplay="menu" :loading="loading" :filters="organizationEventsFilters" responsiveLayout="scroll" :globalFilterFields="['name',
                    'type','physicalParticipants', 'nonLocalPhysicalParticipants', 'virtualParticipants', 'durationDays',
                    'durationHoursPerDay', 'hostingCountry']" removableSort>
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button class="p-button-info mr-2" @click="addEvents('organization')"><i class="pi pi-plus mr-2" />New organized event</Button>
                              <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="organizationEventsFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                              </span>
                              <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveEvents" />
                            </div>
                            
                            <Button type="button" icon="pi pi-filter-slash" label="Clear filters" class="p-button-warning" @click="clearOrganizationEventsFilter()"/>
                          </div>
                      </template>

                      <template #empty>
                          No organized events found.
                      </template>

                      <template #loading>
                          Loading events organized. Please wait.
                      </template>

                      <Column field="name" header="Name" :sortable="true">
                        <template #body="slotProps">
                          <td :class="slotProps.data[slotProps.field] == 'New event' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                        </template>
                        <template #editor="slotProps">
                            <InputText v-model="slotProps.data[slotProps.field]" @focus="$event.target.select()"/>
                        </template>
                      </Column>

                      <Column field="type" header="Type" :sortable="true">
                        <template #body="slotProps">
                          <td :class="slotProps.data[slotProps.field] == 'Select a type' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                        </template>
                        <template #editor="slotProps">
                          <Dropdown :options="eventTypesForDropdown" v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="physicalParticipants" header="Physical participants" :sortable="true">
                        <template #body="slotProps">
                          <td :class="slotProps.data[slotProps.field] == 0 && slotProps.data['type'] !== 'On-line' ? 'defaultValue' : ''"
                          style="display:block;" @click="slotProps.data['type'] !== 'On-line' ? '' : slotProps.data[slotProps.field] = 0"
                          >{{slotProps.data['type'] !== 'On-line' ? slotProps.data[slotProps.field] : ''}}</td>
                        </template>
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" @focus="$event.target.select()" :disabled="slotProps.data['type'] !== 'On-line' ? false : true" />
                        </template>
                      </Column>

                      <Column field="nonLocalPhysicalParticipants" header="Non-local** physical participants" :sortable="true">
                        <template #body="slotProps">
                          <td :class="slotProps.data[slotProps.field] == 0 && slotProps.data['type'] !== 'On-line' ? 'defaultValue' : ''"
                          style="display:block;" @click="slotProps.data['type'] !== 'On-line' ? '' : slotProps.data[slotProps.field] = 0"
                          >{{slotProps.data['type'] !== 'On-line' ? slotProps.data[slotProps.field] : ''}}</td>
                        </template>
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]"  mode="decimal" showButtons decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" @focus="$event.target.select()" :disabled="slotProps.data['type'] !== 'On-line' ? false : true"  />
                        </template>
                      </Column>

                      <Column field="virtualParticipants" header="On-line participants" :sortable="true">
                        <template #body="slotProps">
                          <td :class="slotProps.data[slotProps.field] == 0 && slotProps.data['type'] !== 'In presence' ? 'defaultValue' : ''"
                          style="display:block;" @click="slotProps.data['type'] !== 'In presence' ? '' : slotProps.data[slotProps.field] = 0"
                          >{{slotProps.data['type'] !== 'In presence' ? slotProps.data[slotProps.field] : ''}}</td>
                        </template>
                        <template #editor="slotProps" class="p-field">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" @focus="$event.target.select()" :disabled="slotProps.data['type'] !== 'In presence' ? false : true"/>
                        </template>
                      </Column>

                      <Column field="durationDays" header="Duration (in days)" :sortable="true">
                        <template #body="slotProps">
                          <td :class="slotProps.data[slotProps.field] == 0 ? 'defaultValue' : ''"
                          style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                        </template>
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info" incrementButtonClass="p-button-info"
                          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" @focus="$event.target.select()"/>
                        </template>
                      </Column>

                      <Column field="durationHoursPerDay" header="Duration (hours per day)" :sortable="true">
                        <template #body="slotProps">
                          <td :class="slotProps.data[slotProps.field] == 0 && slotProps.data['type'] !== 'In presence' ? 'defaultValue' : ''"
                          style="display:block;" @click="slotProps.data['type'] !== 'In presence' ? '' : slotProps.data[slotProps.field] = 0"
                          >{{slotProps.data['type'] !== 'In presence' ? slotProps.data[slotProps.field] : ''}}</td>
                        </template>
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" @focus="$event.target.select()" :disabled="slotProps.data['type'] !== 'In presence' ? false : true" />
                        </template>
                      </Column>

                      <Column field="hostingCountry" header="Hosting country" :sortable="true">
                        <template #body="slotProps">
                          <td :class="slotProps.data[slotProps.field] == 'Select a country' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                        </template>
                        <template #editor="slotProps">
                          <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="actions" header="Actions">
                        <template #body="slotProps">
                          <i class="pi pi-trash" @click="deleteEvent(project.events.organization.indexOf(slotProps.data), 'organization')" v-tooltip.top="'Delete organized event'" />
                        </template>
                      </Column>
                    
                    </DataTable>
                  </TabPanel>

                  <TabPanel header="Project participation in in-presence events" v-if="project.events && project.events.participation">

                    <DataTable :value="project.events.participation" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompleteEvents" sortMode="multiple" :rows="5" v-model:filters="participationEventsFilters"
                    filterDisplay="menu" :loading="loading" :filters="participationEventsFilters" responsiveLayout="scroll"
                    :globalFilterFields="['name','type', 'nonLocalPhysicalParticipants','durationDays', 'hostingCountry',
                    'distanceTravelledArrive', 'travelModeArrive', 'fuelTypeArrive', 'distanceTravelledDepart', 'travelModeDepart',
                    'fuelTypeDepart']" removableSort>
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button class="p-button-info mr-2" @click="addEvents('participation')"><i class="pi pi-plus mr-2" />New participation in event</Button>
                              <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="participationEventsFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                              </span>
                              <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveEvents" />
                            </div>
                            
                            <Button type="button" icon="pi pi-filter-slash" label="Clear filters" class="p-button-warning" @click="clearParticipationEventsFilter()"/>
                          </div>
                      </template>

                      <template #empty>
                          No participation in events found.
                      </template>

                      <template #loading>
                          Loading participation in events. Please wait.
                      </template>

                      <ColumnGroup type="header">
                        <Row>
                            <Column header="Name" :sortable="true" :rowspan="2" field="name" />
                            <Column header="Number of project participants" :sortable="true" :rowspan="2" field="nonLocalPhysicalParticipants" />
                            <Column header="Duration (in days)" :sortable="true" :rowspan="2" field="durationDays" />
                            <Column header="Hosting country" :sortable="true" :rowspan="2" field="hostingCountry" />
                            <Column header="Arrive at hosting city" :colspan="3" />
                            <Column header="Depart from hosting city" :colspan="3" />
                            <Column header="Actions" :rowspan="2" />
                        </Row>
                        <Row>
                            <Column header="Distance travelled (km)" :sortable="true" field="distanceTravelledArrive"/>
                            <Column header="Travel mode" :sortable="true" field="travelModeArrive"/>
                            <Column header="Fuel type***" :sortable="true" field="fuelTypeArrive"/>
                            <Column header="Distance travelled (km)" :sortable="true" field="distanceTravelledDepart"/>
                            <Column header="Travel mode" :sortable="true" field="travelModeDepart"/>
                            <Column header="Fuel type***" :sortable="true" field="fuelTypeDepart"/>
                        </Row>
                      </ColumnGroup>

                      <Column field="name">
                          <template #body="slotProps">
                            <td :class="slotProps.data[slotProps.field] == 'New event' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                          </template>
                          <template #editor="slotProps">
                              <InputText v-model="slotProps.data[slotProps.field]" @focus="$event.target.select()"/>
                          </template>
                        </Column>

                      <!-- <Column field="type">
                        <template #body="slotProps">
                          <td :class="slotProps.data[slotProps.field] == 'Select a type' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                        </template>
                        <template #editor="slotProps">
                          <Dropdown :options="eventTypesForDropdown" v-model="slotProps.data[slotProps.field]" disabled />
                        </template>
                      </Column> -->

                      <Column field="nonLocalPhysicalParticipants">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                        </template>
                      </Column>

                      <Column field="durationDays">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info" incrementButtonClass="p-button-info"
                          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                        </template>
                      </Column>

                      <Column field="hostingCountry">
                        <template #body="slotProps">
                          <td :class="slotProps.data[slotProps.field] == 'Select a country' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                        </template>
                        <template #editor="slotProps">
                          <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="distanceTravelledArrive">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                        </template>
                      </Column>

                      <Column field="travelModeArrive">
                        <template #body="slotProps">
                          <td :class="slotProps.data[slotProps.field] == 'Select a travel mode' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                        </template>
                        <template #editor="slotProps">
                          <Dropdown :options="travelModesForDropdown" v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="fuelTypeArrive">
                        <template #body="slotProps">
                          <td :class="slotProps.data[slotProps.field] == 'Select a fuel type' && slotProps.data['travelModeArrive'] === 'Car'
                          ? 'defaultValue' : ''" style="display:block;" @click="slotProps.data['travelModeArrive'] === 'Car' ? '' : slotProps.data['fuelTypeArrive'] = '-'"
                          >{{slotProps.data['travelModeArrive'] === 'Car' ? slotProps.data[slotProps.field] : '-'}}</td>
                        </template>
                        <template #editor="slotProps">
                          <Dropdown :options="fuelTypesForDropdown" v-model="slotProps.data[slotProps.field]" :disabled="slotProps.data['travelModeArrive'] === 'Car' ? false : true" />
                        </template>
                      </Column>

                      <Column field="distanceTravelledDepart">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                        </template>
                      </Column>

                      <Column field="travelModeDepart">
                        <template #body="slotProps">
                          <td :class="slotProps.data[slotProps.field] == 'Select a travel mode' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                        </template>
                        <template #editor="slotProps">
                          <Dropdown :options="travelModesForDropdown" v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="fuelTypeDepart">
                        <template #body="slotProps">
                          <td :class="slotProps.data[slotProps.field] == 'Select a fuel type' && slotProps.data['travelModeDepart'] === 'Car'
                          ? 'defaultValue' : ''" style="display:block;" @click="slotProps.data['travelModeDepart'] === 'Car' ? '' : slotProps.data['fuelTypeDepart'] = '-'"
                          >{{slotProps.data['travelModeDepart'] === 'Car' ? slotProps.data[slotProps.field] : '-'}}</td>
                        </template>
                        <template #editor="slotProps">
                          <Dropdown :options="fuelTypesForDropdown" v-model="slotProps.data[slotProps.field]" :disabled="slotProps.data['travelModeDepart'] === 'Car' ? false : true" />
                        </template>
                      </Column>

                      <Column field="actions">
                        <template #body="slotProps">
                          <i class="pi pi-trash" @click="deleteEvent(project.events.participation.indexOf(slotProps.data), 'participation')" v-tooltip.top="'Delete participation in event'" />
                        </template>
                      </Column>
                      
                    </DataTable>

                    <p class="mt-2">*** Fuel type may only be chosen when "Car" is the selected Travel mode</p>

                  </TabPanel>
                </TabView>
                <p>* The values of this section refer to the whole project partnership</p>
                <p>** Participants travelling to the hosting city (national/international travel) only for the participation to the event</p>
              </div>
            </div>


            <div class="col-12">
              <div class="card">
                <h4>Printable deliverables</h4>
              
                <DataTable :value="project.printableDeliverables" editMode="cell" @cell-edit-complete="onCellEditCompletePrintableDeliverable" 
                  sortMode="multiple" :paginator="true" :rows="5" v-model:filters="printableDeliverableFilters" filterDisplay="menu"
                  :loading="loading" :filters="printableDeliverableFilters" responsiveLayout="scroll" :rowHover="true" class="p-datatable-gridlines"
                  :globalFilterFields="['deliverableType', 'deliverableName', 'copies', 'avgPagesPerCopy']" removableSort>

                  <template #header>
                      <div class="flex justify-content-between flex-column sm:flex-row">
                        <div>
                          <Button class="p-button-info mr-2" @click="addPrintableDeliverable"><i class="pi pi-plus mr-2" />New printable deliverable</Button>
                          <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="printableDeliverableFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                          </span>
                          <Button class="ml-2" label="Save" icon="pi pi-check" @click="savePrintableDeliverables" />
                        </div>
                        
                        <Button type="button" icon="pi pi-filter-slash" label="Clear filters" class="p-button-warning" @click="clearPrintableDeliverableFilter()"/>
                      </div>
                  </template>

                  <template #empty>
                      No printable deliverables found.
                  </template>

                  <template #loading>
                      Loading printable deliverables. Please wait.
                  </template>

                  <Column field="name" header="Name" :sortable="true">
                    <template #body="slotProps">
                      <td :class="slotProps.data[slotProps.field] == 'New printable deliverable' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                    </template>
                    <template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.field]" @focus="$event.target.select()"/>
                    </template>
                  </Column>

                  <Column field="deliverableType" header="Deliverable type" :sortable="true">
                    <template #body="slotProps">
                      <td :class="slotProps.data[slotProps.field] == 'Select a deliverable type' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                    </template>
                    <template #editor="slotProps">
                      <Dropdown :options="deliverableOptions" v-model="slotProps.data[slotProps.field]" optionLabel="value" optionValue="value"
                                placeholder="Select a deliverable type">
                        <template #value="slotProps">
                          <div v-if="slotProps.value">
                            <span>{{slotProps.value}}</span>
                          </div>
                          <span v-else>
                              {{slotProps.placeholder}}
                          </span>
                        </template>
                        <template #option="slotProps">
                            <span>{{slotProps.option.value}}</span>
                        </template>
                      </Dropdown>
                    </template>
                  </Column>

                  <Column field="copies" header="Copies" :sortable="true">
                  <template #body="slotProps">
                      <td :class="slotProps.data[slotProps.field] == 1 ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                  </template>
                    <template #editor="slotProps">
                        <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal"
                        showButtons decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="$event.target.select()" :class="slotProps.data[slotProps.field] == 1 ? 'defaultValue' : ''" />
                    </template>
                  </Column>

                  <Column field="avgPagesPerCopy" header="Number of pages per copy" :sortable="true">
                    <template #body="slotProps">
                      <td style="display:block;"
                      :class="deliverableOptions.find(d => {return d.value == slotProps.data.deliverableType}) && slotProps.data[slotProps.field] == deliverableOptions.find(d => {return d.value == slotProps.data.deliverableType}).avgPagesPerCopy ? 'defaultValue' : ''"
                      >{{slotProps.data[slotProps.field]}}</td>
                    </template>
                    <template #editor="slotProps">
                      <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal"
                      showButtons decrementButtonClass="p-button-info"
                      incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                    </template>
                  </Column>

                  <Column field="size" header="Paper size" :sortable="true">
                    <template #body="slotProps">
                      <td :class="slotProps.data[slotProps.field] == 'Select a paper size' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                    </template>
                    <template #editor="slotProps">
                      <Dropdown :options="paperSizes" v-model="slotProps.data[slotProps.field]" placeholder="Select a paper size">
                        <template #value="slotProps">
                          <div v-if="slotProps.value">
                            <span>{{slotProps.value}}</span>
                          </div>
                          <span v-else>
                              {{slotProps.placeholder}}
                          </span>
                        </template>
                        <template #option="slotProps">
                            <span>{{slotProps.option}}</span>
                        </template>
                      </Dropdown>
                    </template>
                  </Column>
                  
                  <Column field="actions" header="Actions">
                    <template #body="slotProps">
                      <i class="pi pi-trash" @click="deletePrintableDeliverable(project.printableDeliverables.indexOf(slotProps.data))" v-tooltip.top="'Delete printable deliverable'" />
                    </template>
                  </Column>

                </DataTable>
                <div style="text-align: left; margin-top: 10px">
                  <p>* Report type includes the following deliverables: Report/Plan/Analysis/Study/Methodology/Manual/Guidance/Roadmap/Strategy/Proceedings</p>
                </div>
              </div>
            </div>

            
            <!-- <div class="card">
              <h4>Customs</h4>
              <TabView>
                <TabPanel header="Heat">
                        Tabla Custom Heat emissions

                  <h5>Additional custom defined Heat emission</h5>

                  <DataTable :value="project.customHeat" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                  :rowHover="true" @cell-edit-complete="onCellEditCompleteCustom($event, 'customHeat', 'heat')" sortMode="multiple" :rows="5" v-model:filters="customFilters"
                  filterDisplay="menu" :loading="loading" :filters="customFilters" responsiveLayout="scroll"
                  :globalFilterFields="['nameCustom','valueCustom']" removableSort>
                    
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                          <div>
                            <Button class="p-button-info mr-2" @click="addCustom(this.customTypes[0].value, 'customHeat', 'Heat')"><i class="pi pi-plus mr-2" />New additional custom Heat emission</Button>
                            <span class="p-input-icon-left">
                              <i class="pi pi-search" />
                              <InputText v-model="customFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                            </span>
                            <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveCustoms" />
                          </div>
                          
                          <Button type="button" icon="pi pi-filter-slash" label="Clear filters" class="p-button-warning" @click="clearCustomFilter()"/>
                        </div>
                    </template>

                    <template #empty>
                        No additional custom heat emission found.
                    </template>

                    <template #loading>
                        Loading custom heat emission. Please wait.
                    </template>

                    <Column field="name" header="Item" :sortable="true">
                      <template #editor="slotProps">
                          <InputText v-model="slotProps.data[slotProps.field]" @focus="$event.target.select()"/>
                      </template>
                      <template #filter="{filterModel, field}">
                          <InputText type="text" v-model="filterModel.value" class="p-column-filter" :placeholder="'Filter by ' + field" />
                      </template>
                    </Column>

                    <Column field="value" header="Value (t CO₂e)" :sortable="true">
                      <template #editor="slotProps" class="p-field">
                        <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                      </template>
                    </Column>

                    
                    <Column field="actions" header="Actions">
                      <template #body="slotProps">
                        <i class="pi pi-trash" @click="deleteCustom(project.customHeat.indexOf(slotProps.data), 'customHeat', 'heat')" v-tooltip.top="'Delete heat custom'" />
                      </template>
                    </Column>
                  
                  </DataTable>
                </TabPanel>

                <TabPanel header="Electricity">
                  <h5>Aditional custom defined electricity emission</h5>
                  <DataTable :value="project.customElectricity" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                  :rowHover="true" @cell-edit-complete="onCellEditCompleteCustom($event, 'customElectricity', 'electricity')" sortMode="multiple" :rows="5" v-model:filters="customFilters"
                  filterDisplay="menu" :loading="loading" :filters="customFilters" responsiveLayout="scroll"
                  :globalFilterFields="['nameCustom','valueCustom']" removableSort>
                  
                  <template #header>
                      <div class="flex justify-content-between flex-column sm:flex-row">
                        <div>
                          <Button class="p-button-info mr-2" @click="addCustom(this.customTypes[1].value, 'customElectricity', 'electricity')"><i class="pi pi-plus mr-2" />New additional custom Electricity</Button>
                          <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="customFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                          </span>
                          <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveCustoms" />
                        </div>
                        
                        <Button type="button" icon="pi pi-filter-slash" label="Clear filters" class="p-button-warning" @click="clearPartnerFilter()"/>
                      </div>
                  </template>

                  <template #empty>
                      No additional custom electricity found.
                  </template>

                  <template #loading>
                      Loading custom electricity. Please wait.
                  </template>

                  <Column field="name" header="Item" :sortable="true">
                    <template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.field]" @focus="$event.target.select()"/>
                    </template>
                    <template #filter="{filterModel, field}">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter" :placeholder="'Filter by ' + field"/>
                    </template>
                  </Column>

                  <Column field="value" header="Value (t CO₂e)" :sortable="true">
                    <template #editor="slotProps" class="p-field">
                      <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                      showButtons :step="0.25" decrementButtonClass="p-button-info"
                      incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      :allowEmpty="false" :min="0" @focus="$event.target.select()"/>
                    </template>
                  </Column>

                  
                  <Column field="actions" header="Actions">
                    <template #body="slotProps">
                      <i class="pi pi-trash" @click="deleteCustom(project.customElectricity.indexOf(slotProps.data), 'customElectricity', 'electricity')" v-tooltip.top="'Delete electricity custom'" />
                    </template>
                  </Column>
                
                </DataTable>
                </TabPanel>

                <TabPanel header="Water">

                  <h5>Aditional custom defined water emission</h5>
                  <DataTable :value="project.customWater" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                  :rowHover="true" @cell-edit-complete="onCellEditCompleteCustom($event, 'customWater', 'water')" sortMode="multiple" :rows="5" v-model:filters="customFilters"
                  filterDisplay="menu" :loading="loading" :filters="customFilters" responsiveLayout="scroll"
                  :globalFilterFields="['nameCustom','valueCustom']" removableSort>
                  
                  <template #header>
                      <div class="flex justify-content-between flex-column sm:flex-row">
                        <div>
                          <Button class="p-button-info mr-2" @click="addCustom(this.customTypes[2].value,'customWater', 'water')"><i class="pi pi-plus mr-2" />New additional custom water emission</Button>
                          <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="customFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                          </span>
                          <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveCustoms" />
                        </div>
                        
                        <Button type="button" icon="pi pi-filter-slash" label="Clear filters" class="p-button-warning" @click="clearCustomFilter()"/>
                      </div>
                  </template>

                  <template #empty>
                      No additional custom water emission found.
                  </template>

                  <template #loading>
                      Loading custom water emissions. Please wait.
                  </template>

                  <Column field="name" header="Item" :sortable="true">
                    <template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.field]" @focus="$event.target.select()"/>
                    </template>
                    <template #filter="{filterModel, field}">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter" :placeholder="'Filter by ' + field"/>
                    </template>
                  </Column>

                  <Column field="value" header="Value (t CO₂e)" :sortable="true">
                    <template #editor="slotProps" class="p-field">
                      <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                      showButtons :step="0.25" decrementButtonClass="p-button-info"
                      incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      :allowEmpty="false" :min="0" @focus="$event.target.select()"/>
                    </template>
                  </Column>

                  
                  <Column field="actions" header="Actions">
                    <template #body="slotProps">
                      <i class="pi pi-trash" @click="deleteCustom(project.customWater.indexOf(slotProps.data), 'customWater', 'water')" v-tooltip.top="'Delete water custom'" />
                    </template>
                  </Column>
                
                </DataTable>

                </TabPanel>

                <TabPanel header="Transportation">

                    <h5>Aditional custom defined transportation emission</h5>
                    <DataTable :value="project.customTransportation" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompleteCustom($event, 'customTransportation', 'transportation')" sortMode="multiple" :rows="5" v-model:filters="customFilters"
                    filterDisplay="menu" :loading="loading" :filters="customFilters" responsiveLayout="scroll"
                    :globalFilterFields="['nameCustom','valueCustom']" removableSort>
                    
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                          <div>
                            <Button class="p-button-info mr-2" @click="addCustom(this.customTypes[3].value, 'customTransportation', 'transportation')"><i class="pi pi-plus mr-2" />New additional custom transportation emission</Button>
                            <span class="p-input-icon-left">
                              <i class="pi pi-search" />
                              <InputText v-model="customFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                            </span>
                            <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveCustoms" />
                          </div>
                          
                          <Button type="button" icon="pi pi-filter-slash" label="Clear filters" class="p-button-warning" @click="clearCustomFilter()"/>
                        </div>
                    </template>

                    <template #empty>
                        No additional custom transportation emission found.
                    </template>

                    <template #loading>
                        Loading custom transportation emissions. Please wait.
                    </template>

                    <Column field="name" header="Item" :sortable="true">
                      <template #editor="slotProps">
                          <InputText v-model="slotProps.data[slotProps.field]" @focus="$event.target.select()"/>
                      </template>
                      <template #filter="{filterModel, field}">
                          <InputText type="text" v-model="filterModel.value" class="p-column-filter" :placeholder="'Filter by ' + field"/>
                      </template>
                    </Column>

                    <Column field="value" header="Value (t CO₂e)" :sortable="true">
                      <template #editor="slotProps" class="p-field">
                        <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="$event.target.select()"/>
                      </template>
                    </Column>

                    
                    <Column field="actions" header="Actions">
                      <template #body="slotProps">
                        <i class="pi pi-trash" @click="deleteCustom(project.customTransportation.indexOf(slotProps.data), 'customTransportation', 'transportation')" v-tooltip.top="'Delete transportation custom'" />
                      </template>
                    </Column>
                  
                  </DataTable>

                </TabPanel>

                <TabPanel header="Materials">

                    <h5>Aditional custom defined material emission</h5>
                    <DataTable :value="project.customMaterials" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompleteCustom($event, 'customMaterials', 'materials')" sortMode="multiple" :rows="5" v-model:filters="customFilters"
                    filterDisplay="menu" :loading="loading" :filters="customFilters" responsiveLayout="scroll"
                    :globalFilterFields="['nameCustom','valueCustom']" removableSort>
                    
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                          <div>
                            <Button class="p-button-info mr-2" @click="addCustom(this.customTypes[4].value, 'customMaterials', 'materials')"><i class="pi pi-plus mr-2" />New additional custom material emission</Button>
                            <span class="p-input-icon-left">
                              <i class="pi pi-search" />
                              <InputText v-model="customFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                            </span>
                            <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveCustoms" />
                          </div>
                          
                          <Button type="button" icon="pi pi-filter-slash" label="Clear filters" class="p-button-warning" @click="clearCustomFilter()"/>
                        </div>
                    </template>

                    <template #empty>
                        No additional custom materials emission found.
                    </template>

                    <template #loading>
                        Loading custom materials emissions. Please wait.
                    </template>

                    <Column field="name" header="Item" :sortable="true">
                      <template #editor="slotProps">
                          <InputText v-model="slotProps.data[slotProps.field]" @focus="$event.target.select()"/>
                      </template>
                      <template #filter="{filterModel, field}">
                          <InputText type="text" v-model="filterModel.value" class="p-column-filter" :placeholder="'Filter by ' + field"/>
                      </template>
                    </Column>

                    <Column field="value" header="Value (t CO₂e)" :sortable="true">
                      <template #editor="slotProps" class="p-field">
                        <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="$event.target.select()"/>
                      </template>
                    </Column>

                    
                    <Column field="actions" header="Actions">
                      <template #body="slotProps">
                        <i class="pi pi-trash" @click="deleteCustom(project.customMaterials.indexOf(slotProps.data), 'customMaterials', 'materials')" v-tooltip.top="'Delete materials custom'" />
                      </template>
                    </Column>
                  
                  </DataTable>

                </TabPanel>

                <TabPanel header="Events">

                  <h5>Aditional custom defined events emission</h5>
                  <DataTable :value="project.customEvents" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                  :rowHover="true" @cell-edit-complete="onCellEditCompleteCustom($event, 'customEvents', 'event')" sortMode="multiple" :rows="5" v-model:filters="customFilters"
                  filterDisplay="menu" :loading="loading" :filters="customFilters" responsiveLayout="scroll"
                  :globalFilterFields="['nameCustom','valueCustom']" removableSort>
                  
                  <template #header>
                      <div class="flex justify-content-between flex-column sm:flex-row">
                        <div>
                          <Button class="p-button-info mr-2" @click="addCustom(this.customTypes[5].value,'customEvents', 'event')"><i class="pi pi-plus mr-2" />New additional custom event emission</Button>
                          <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="customFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                          </span>
                          <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveCustoms" />
                        </div>
                        
                        <Button type="button" icon="pi pi-filter-slash" label="Clear filters" class="p-button-warning" @click="clearCustomFilter()"/>
                      </div>
                  </template>

                  <template #empty>
                      No additional custom event emission found.
                  </template>

                  <template #loading>
                      Loading custom events emissions. Please wait.
                  </template>

                  <Column field="name" header="Item" :sortable="true">
                    <template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.field]" @focus="$event.target.select()"/>
                    </template>
                    <template #filter="{filterModel, field}">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter" :placeholder="'Filter by ' + field"/>
                    </template>
                  </Column>

                  <Column field="value" header="Value (t CO₂e)" :sortable="true">
                    <template #editor="slotProps" class="p-field">
                      <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                      showButtons :step="0.25" decrementButtonClass="p-button-info"
                      incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      :allowEmpty="false" :min="0" @focus="$event.target.select()"/>
                    </template>
                  </Column>

                  
                  <Column field="actions" header="Actions">
                    <template #body="slotProps">
                      <i class="pi pi-trash" @click="deleteCustom(project.customEvents.indexOf(slotProps.data) * 5, 'customEvents', 'event')" v-tooltip.top="'Delete events custom'" />
                    </template>
                  </Column>
                
                </DataTable>

                </TabPanel>


                <TabPanel header="Printable Deliverables">

                    <h5>Additional custom defined printable deliverable emission</h5>

                    <DataTable :value="project.customPrintableDeliverables" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompleteCustom($event, 'customPrintableDeliverables', 'Printable Deliverables')" sortMode="multiple" :rows="5" v-model:filters="customFilters"
                    filterDisplay="menu" :loading="loading" :filters="customFilters" responsiveLayout="scroll"
                    :globalFilterFields="['nameCustom','valueCustom']" removableSort>
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button class="p-button-info mr-2" @click="addCustom(this.customTypes[6].value, 'customPrintableDeliverables', 'Printable Deliverables')"><i class="pi pi-plus mr-2" />New additional custom printable deliverable</Button>
                              <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="customFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                              </span>
                              <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveCustoms" />
                            </div>
                            
                            <Button type="button" icon="pi pi-filter-slash" label="Clear filters" class="p-button-warning" @click="clearCustomFilter()"/>
                          </div>
                      </template>

                      <template #empty>
                          No additional custom printable deliverables found.
                      </template>

                      <template #loading>
                          Loading custom printable deliverables. Please wait.
                      </template>

                      <Column field="name" header="Item" :sortable="true">
                        <template #editor="slotProps">
                            <InputText v-model="slotProps.data[slotProps.field]" @focus="$event.target.select()"/>
                        </template>
                        <template #filter="{filterModel, field}">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" :placeholder="'Filter by ' + field"/>
                        </template>
                      </Column>

                      <Column field="value" header="Value (t CO₂e)" :sortable="true">
                        <template #editor="slotProps" class="p-field">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" @focus="$event.target.select()"/>
                        </template>
                      </Column>

                      <Column field="actions" header="Actions">
                        <template #body="slotProps">
                          <i class="pi pi-trash" @click="deleteCustom(project.customPrintableDeliverables.indexOf(slotProps.data), 'customPrintableDeliverables', 'Printable Deliverables')" v-tooltip.top="'Delete printable deliverables custom'" />
                        </template>
                      </Column>
                    
                    </DataTable>

                </TabPanel>

                <TabPanel header="Equipment">

                    <h5>Additional custom defined equipment emission</h5>

                    <DataTable :value="project.customEquipment" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompleteCustom($event, 'customEquipment', 'Equipment')" sortMode="multiple" :rows="5" v-model:filters="customFilters"
                    filterDisplay="menu" :loading="loading" :filters="customFilters" responsiveLayout="scroll"
                    :globalFilterFields="['nameCustom','valueCustom']" removableSort>
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button class="p-button-info mr-2" @click="addCustom(this.customTypes[7].value, 'customEquipment', 'Equipment')"><i class="pi pi-plus mr-2" />New additional custom equipment</Button>
                              <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="customFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                              </span>
                              <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveCustoms" />
                            </div>
                            
                            <Button type="button" icon="pi pi-filter-slash" label="Clear filters" class="p-button-warning" @click="clearCustomFilter()"/>
                          </div>
                      </template>

                      <template #empty>
                          No additional custom equipment found.
                      </template>

                      <template #loading>
                          Loading custom equipment. Please wait.
                      </template>

                      <Column field="name" header="Item" :sortable="true">
                        <template #editor="slotProps">
                            <InputText v-model="slotProps.data[slotProps.field]" @focus="$event.target.select()"/>
                        </template>
                        <template #filter="{filterModel, field}">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" :placeholder="'Filter by ' + field"/>
                        </template>
                      </Column>

                      <Column field="value" header="Value" :sortable="true">
                        <template #editor="slotProps" class="p-field">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" @focus="$event.target.select()"/>
                        </template>
                      </Column>

                      <Column field="actions" header="Actions">
                        <template #body="slotProps">
                          <i class="pi pi-trash" @click="deleteCustom(project.customEquipment.indexOf(slotProps.data), 'customEquipment', 'Equipment')" v-tooltip.top="'Delete equipment custom'" />
                        </template>
                      </Column>
                    
                    </DataTable>

                </TabPanel>

              </TabView>
            </div> -->

            <div class="card" style="display:flex; justify-content:space-around">
              <template v-if="!project.isInitialProject">
                <Button  label="Save all" @click="saveCurrentProject" />
              </template>
              <template v-else-if="project.isInitialProject">
                <Button label="Save all" @click="saveCurrentProject" />
                <Button  label="Save Base data as scenario data" @click="displayUpdateScenarioValuesDialog" />
              </template>
            </div>
            <div class="col-12">
              <div class="card p-fluid" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                <div>
                  <h2 class="mb-2">CO₂ equivalent emitted:
                    <Badge :value="project.currentCF  + ' t CO₂e'" class="ml-2 currentCF" size="xlarge" :severity="getTextColorFromCFIndex(project.currentCF)" />
                  </h2>
                </div>
                <div>
                  <h2 class="mt-2">Price of the ton of CO₂ equivalent:
                    <Badge :value="co2PermitsPrice + ' €'" class="ml-2 currentCF" size="xlarge" />
                  </h2>
                </div>
                <div>
                  <h2 class="mt-2">CO₂ permits cost:
                    <Badge :value="round(project.currentCF * co2PermitsPrice) + ' €'" class="ml-2 currentCF" size="xlarge" />
                  </h2>
                </div>
                <div>
                  <Button icon="pi pi-replay" class="p-button-rounded p-button-outlined p-button-plain mr-5" label="Recalculate"
                          style="width: 15rem; font-size: 1.1rem" @click="calculateCF()" />
                  <Button icon="pi pi-file-pdf" class="p-button-rounded p-button-outlined p-button-plain mr-5 mt-3" label="Generate PDF"
                          style="width: 15rem; font-size: 1.1rem" @click="generatePDF()"/>
                </div>
              </div>
            </div>

            <Dialog header="Error" v-model:visible="displayPartnersError" class="col-4" :modal="true">
                <div v-if="displayPartnersWithoutCountryDialog" class="flex align-items-center  pb-5">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <div>
                      <p>You need to select a country for each partner in order to calculate the CF of the project!</p>
                      <p>Partners without country:</p>
                      <p v-for="partner in partnersWithoutCountry" :key="partner._id">{{partner.name}}</p>
                    </div>
                </div>
                <div v-if="displayPartnersWithDefaultValues" class="flex align-items-center border-top-1 surface-border pt-5">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <div>
                      <p>There are partners with empty values!</p>
                      <p>Partners with empty values:</p>
                      <p v-for="partner in partnersWithDefaultValues" :key="partner._id">{{partner.name}}</p>
                    </div>
                </div>

                <template #footer>
                    <Button label="Ok" @click="closePartnersWithoutCountryErrorDialog" class="p-button-text p-button-info" autofocus/>
                </template>
            </Dialog>

            <Dialog header="Error" v-model:visible="displayEventsWithDefaultValues" class="col-4" :modal="true">
                
                <div class="flex align-items-center border-top-1 surface-border pt-5">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <div>
                      <p>There are events with empty values!</p>
                      <p>Events with empty values:</p>
                      <p v-for="eventOrganization in eventsOrganizedByTheprojectNotDefined" :key="eventOrganization._id">{{eventOrganization.name}}</p>
                      <p v-for="eventParticipation in eventsParticipationNotDefined" :key="eventParticipation._id">{{eventParticipation.name}}</p>
                    </div>
                </div>

                <template #footer>
                    <Button label="Ok" @click="closeEventsErrorDialog" class="p-button-text p-button-info" autofocus/>
                </template>
            </Dialog>



            <div class="col-12">
              <div class="card p-fluid" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                <h2>Carbon Footprint breakdown (Tons)</h2>
                <div class="col-12" style="display: flex; justify-content: space-evenly;">
                  <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                    <h2 class="font-medium text-3xl">Fuels (Heating)</h2>
                    <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                      <Badge :value="project.fuelsHeatAdvancedCF" size="xlarge" class="currentCF"/>
                    </div>
                  </div>
                  <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                    <h2 class="font-medium text-3xl">Electricity</h2>
                    <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                      <Badge :value="project.electricityAdvancedCF" size="xlarge" class="currentCF"/>
                    </div>
                  </div>
                  <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                    <h2 class="font-medium text-3xl">Water</h2>
                    <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                      <Badge :value="project.waterAdvancedCF" size="xlarge" class="currentCF"/>
                    </div>
                  </div>
                  <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                    <h2 class="font-medium text-3xl">Transportation</h2>
                    <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                      <Badge :value="project.transportationAdvancedCF" size="xlarge" class="currentCF"/>
                    </div>
                  </div>
                </div>
                <div class="col-12" style="display: flex; justify-content: space-evenly;">
                  <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                    <h2 class="font-medium text-3xl">Materials</h2>
                    <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                      <Badge :value="project.materialsAdvancedCF" size="xlarge" class="currentCF"/>
                    </div>
                  </div>
                  <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                    <h2 class="font-medium text-3xl">Printable<br>Deliverables</h2>
                    <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                      <Badge :value="project.printableDeliverablesAdvancedCF" size="xlarge" class="currentCF"/>
                    </div>
                  </div>
                  <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                    <h2 class="font-medium text-3xl">Equipment</h2>
                    <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                      <Badge :value="project.equipmentAdvancedCF" size="xlarge" class="currentCF"/>
                    </div>
                  </div>
                  <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                    <h2 class="font-medium text-3xl">Events</h2>
                    <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                      <Badge :value="project.eventsAdvancedCF" size="xlarge" class="currentCF"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel v-if="!this.project.isInitialProject" header="Analysis">
            <div class="card">

              <h3>Analysis of the project's base and monitoring period data</h3>

              <div class="flex justify-content-around text-center">
                <div class="col-6">
                  <h4>Project base data</h4>
                  <Chart type="radar" :data="chartDataInitial" :options="chartOptions" />

                  <h4>Reference values for KPI-3</h4>
                  <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                      <label for="heatInputInitial">Heat</label>
                      <InputNumber id="heatInputInitial" v-model="analysisInitial.heatInputInitial" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0.001" class="mb-3"
                        @focus="onFocusValue=analysisInitial.heatInputInitial; $event.target.select()"
                        @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompleteAnalysis('heatInputInitial', analysisInitial.heatInputInitial, true)" />

                      <label for="electricityInputInitial">Electricity</label>  
                      <InputNumber id="electricityInputInitial" v-model="analysisInitial.electricityInputInitial" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0.001" class="mb-3"
                        @focus="onFocusValue=analysisInitial.electricityInputInitial; $event.target.select()"
                        @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompleteAnalysis('electricityInputInitial', analysisInitial.electricityInputInitial, true)" />

                      <label for="waterInputInitial">Water</label>  
                      <InputNumber id="waterInputInitial" v-model="analysisInitial.waterInputInitial" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0.001" class="mb-3"
                        @focus="onFocusValue=analysisInitial.waterInputInitial; $event.target.select()"
                        @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompleteAnalysis('waterInputInitial', analysisInitial.waterInputInitial, true)" />

                      <label for="transportationInputInitial">Transportation</label>
                      <InputNumber id="transportationInputInitial" v-model="analysisInitial.transportationInputInitial" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0.001"
                        @focus="onFocusValue=analysisInitial.transportationInputInitial; $event.target.select()"
                        @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompleteAnalysis('transportationInputInitial', analysisInitial.transportationInputInitial, true)" />

                    </div>

                    <div class="field col-12 md:col-6">
                      <label for="materialsInputInitial">Materials</label>  
                      <InputNumber id="materialsInputInitial" v-model="analysisInitial.materialsInputInitial" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0.001" class="mb-3"
                        @focus="onFocusValue=analysisInitial.materialsInputInitial; $event.target.select()"
                        @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompleteAnalysis('materialsInputInitial', analysisInitial.materialsInputInitial, true)"/>

                      <label for="eventsInputInitial">Events</label>  
                      <InputNumber id="eventsInputInitial" v-model="analysisInitial.eventsInputInitial" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0.001" class="mb-3"
                        @focus="onFocusValue=analysisInitial.eventsInputInitial; $event.target.select()"
                        @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompleteAnalysis('eventsInputInitial', analysisInitial.eventsInputInitial, true)"/>

                      <label for="printableDeliverablesInputInitial">Printable Deliverables</label>
                      <InputNumber id="printableDeliverablesInputInitial" v-model="analysisInitial.printableDeliverablesInputInitial" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0.001" class="mb-3"
                        @focus="onFocusValue=analysisInitial.printableDeliverablesInputInitial; $event.target.select()"
                        @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompleteAnalysis('printableDeliverablesInputInitial', analysisInitial.printableDeliverablesInputInitial, true)"/>

                      <label for="equipmentInputInitial">Equipment</label>
                      <InputNumber id="equimentInputInitial" v-model="analysisInitial.equipmentInputInitial" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0.001"
                        @focus="onFocusValue=analysisInitial.equimentInputInitial; $event.target.select()"
                        @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompleteAnalysis('equipmentInputInitial', analysisInitial.equipmentInputInitial, true)"/>
                    </div>  
                  </div>
                </div>

                <div>
                    <Divider layout="vertical">
                    </Divider>
                </div>

                <div class="col-6">
                  <h4>Project monitoring period data</h4>
                  <Chart type="radar" :data="chartDataExecution" :options="chartOptions" />
                  
                  <h4>Reference values for KPI-3</h4>
                  <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                      <label for="heatInputExecution">Heat</label>
                      <InputNumber id="heatInputExecution" v-model="analysisExecution.heatInputExecution" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0.001" class="mb-3"
                        @focus="onFocusValue=analysisExecution.heatInputExecution; $event.target.select()"
                        @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompleteAnalysis('heatInputExecution', analysisExecution.heatInputExecution, false)"/>

                      <label for="electricityInputExecution">Electricity</label>  
                      <InputNumber id="electricityInputExecution" v-model="analysisExecution.electricityInputExecution" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0.001" class="mb-3"
                        @focus="onFocusValue=analysisExecution.electricityInputExecution; $event.target.select()"
                        @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompleteAnalysis('electricityInputExecution', analysisExecution.electricityInputExecution, false)"/>

                      <label for="waterInputExecution">Water</label>  
                      <InputNumber id="waterInputExecution" v-model="analysisExecution.waterInputExecution" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0.001" class="mb-3"
                        @focus="onFocusValue=analysisExecution.waterInputExecution; $event.target.select()"
                        @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompleteAnalysis('waterInputExecution', analysisExecution.waterInputExecution, false)"/>

                      <label for="transportationInputExecution">Transportation</label>
                      <InputNumber id="transportationInputExecution" v-model="analysisExecution.transportationInputExecution" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0.001"
                        @focus="onFocusValue=analysisExecution.transportationInputExecution; $event.target.select()"
                        @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompleteAnalysis('transportationInputExecution', analysisExecution.transportationInputExecution, false)"/>

                    </div>

                    <div class="field col-12 md:col-6">
                      <label for="materialsInputExecution">Materials</label>  
                      <InputNumber id="materialsInputExecution" v-model="analysisExecution.materialsInputExecution" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0.001" class="mb-3"
                        @focus="onFocusValue=analysisExecution.materialsInputExecution; $event.target.select()"
                        @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompleteAnalysis('materialsInputExecution', analysisExecution.materialsInputExecution, false)"/>

                      <label for="eventsInputExecution">Events</label>  
                      <InputNumber id="eventsInputExecution" v-model="analysisExecution.eventsInputExecution" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0.001" class="mb-3"
                        @focus="onFocusValue=analysisExecution.eventsInputExecution; $event.target.select()"
                        @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompleteAnalysis('eventsInputExecution', analysisExecution.eventsInputExecution, false)"/>

                      <label for="printableDeliverablesInputExecution">Printable Deliverables</label>
                      <InputNumber id="printableDeliverablesInputExecution" v-model="analysisExecution.printableDeliverablesInputExecution" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0.001" class="mb-3"
                        @focus="onFocusValue=analysisExecution.printableDeliverablesInputExecution; $event.target.select()"
                        @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompleteAnalysis('printableDeliverablesInputExecution', analysisExecution.printableDeliverablesInputExecution, false)"/>

                      <label for="equipmentInputExecution">Equipment</label>
                      <InputNumber id="equimentInputExecution" v-model="analysisExecution.equipmentInputExecution" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0.001"
                        @focus="onFocusValue=analysisExecution.equipmentInputExecution; $event.target.select()"
                        @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompleteAnalysis('equimentInputExecution', analysisExecution.equimentInputExecution, false)"/>
                    </div>  
                  </div>

                </div>
              </div>
            </div>
          </TabPanel>

          <!-- Pestaña de Mitigation Scenarios -->
          <TabPanel header="Additional Data">

            <TabView>
              <!-- Pestaña de Transportation -->
              <TabPanel header="Transportation">

                <div class="card">

                  <div class="p-fluid formgrid grid">

                    <div class="field col-12" v-if="project.dataTables">
                      
                      <div class="mb-5 col-12" v-if="project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform]" >
                        <h3>Percentage distribution of travels by main travel mode (%)</h3>
                        <div class="flex align-items-baseline">
                          <label class="mr-2">Transportation data for the country:</label>
                          <Dropdown class="mb-2" :options="countriesForDropdown" v-model="selectedCountryForTransportationData"/>
                        </div>

                        <div class="flex justify-content-around">
                          <div class="col-5">
                            <label for="carTransportationData">Car</label>
                            <InputNumber id="carTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].car" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000"  :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].car; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].car, countryTransform, 'car')"/>

                            <label for="motorbikesTransportationData">Motorbikes</label>
                            <InputNumber id="motorbikesTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].motorbikes" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].motorbikes; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].motorbikes, countryTransform, 'motorbikes')"/>

                            <label for="busTransportationData">Bus</label>
                            <InputNumber id="busTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].bus" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].bus; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].bus, countryTransform,'bus')"/>

                            <label for="taxiTransportationData">Taxi</label>
                            <InputNumber id="taxiTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].taxi" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].taxi; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].taxi, countryTransform,'taxi')"/>

                              <label for="nationalRailTransportationData">National Rail</label>
                            <InputNumber id="nationalRailTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].nationalRail" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].nationalRail; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].nationalRail, countryTransform, 'nationalRail')"/>
                          </div>

                          <div class="col-5">
                            <label for="lightRailTramUndergroundTransportationData">Light Rail/Tram/Underground </label>
                            <InputNumber id="lightRailTramUndergroundTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].lightRailTramUnderground" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].lightRailTramUnderground; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].lightRailTramUnderground, countryTransform,'lightRailTramUnderground')"/>

                            <label for="ferriesTransportationData">Ferries</label>
                            <InputNumber id="ferriesTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].ferries" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].ferries; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].ferries, countryTransform,'ferries')"/>

                            <label for="cyclingTransportationData">Cycling</label>
                            <InputNumber id="cyclingTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].cycling" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].cycling; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].cycling, countryTransform,'cycling')"/>

                            <label for="walkingTransportationData">Walking</label>
                            <InputNumber id="walkingTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].walking" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].walking; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].walking, countryTransform,'walking')"/>

                            <label for="otherTransportationData">Other</label>
                            <InputNumber id="otherTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].other" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].other; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].other, countryTransform,'other')"/>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="p-fluid formgrid grid">
                    <div class="field col-12" v-if="project.dataTables">
                      <div class="mb-5" v-if="project.dataTables.transportationData.percentageDistributionCarsFleet" >
                        <h3>Percentage distribution (%) of cars fleet by technology (fuel) for EU</h3>

                        <div class="flex justify-content-around">
                          <div class="col-5">
                            <label for="dieselTransportationData">Diesel</label>
                            <InputNumber id="dieselTransportationData" v-model="project.dataTables.transportationData.percentageDistributionCarsFleet.diesel" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionCarsFleet.diesel; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData2(project.dataTables.transportationData.percentageDistributionCarsFleet.diesel, 'diesel')"/>

                            <label for="petrolTransportationData">Petrol</label>
                            <InputNumber id="petrolTransportationData" v-model="project.dataTables.transportationData.percentageDistributionCarsFleet.petrol" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionCarsFleet.petrol; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData2(project.dataTables.transportationData.percentageDistributionCarsFleet.petrol, 'petrol')"/>
                            
                            <label for="hybridTransportationData">Hybrid</label>
                            <InputNumber id="hybridTransportationData" v-model="project.dataTables.transportationData.percentageDistributionCarsFleet.hybrid" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionCarsFleet.hybrid; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData2(project.dataTables.transportationData.percentageDistributionCarsFleet.hybrid, 'hybrid')"/>

                            <label for="batteryElectricVehicleTransportationData">Battery Electric Vehicle</label>
                            <InputNumber id="dieselTransportationData" v-model="project.dataTables.transportationData.percentageDistributionCarsFleet.batteryElectricVehicle" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionCarsFleet.batteryElectricVehicle; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData2(project.dataTables.transportationData.percentageDistributionCarsFleet.batteryElectricVehicle, 'batteryElectricVehicle')"/>
                          </div>

                          <div class="col-5">
                            <label for="pluginHybridElectricVehicleTransportationData">Plugin Hybrid Electric Vehicle</label>
                            <InputNumber id="pluginHybridElectricVehicleTransportationData" v-model="project.dataTables.transportationData.percentageDistributionCarsFleet.pluginHybridElectricVehicle" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionCarsFleet.pluginHybridElectricVehicle; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData2(project.dataTables.transportationData.percentageDistributionCarsFleet.pluginHybridElectricVehicle, 'pluginHybridElectricVehicle')"/>

                            <label for="cngTransportationData">CNG</label>
                            <InputNumber id="cngTransportationData" v-model="project.dataTables.transportationData.percentageDistributionCarsFleet.cng" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionCarsFleet.cng; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData2(project.dataTables.transportationData.percentageDistributionCarsFleet.cng, 'cng')"/>

                            <label for="lpgTransportationData">LPG</label>
                            <InputNumber id="lpgTransportationData" v-model="project.dataTables.transportationData.percentageDistributionCarsFleet.lpg" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionCarsFleet.lpg; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData2(project.dataTables.transportationData.percentageDistributionCarsFleet.lpg, 'lpg')"/>
                            
                            <label for="otherTransportationData">Other</label>
                            <InputNumber id="otherTransportationData" v-model="project.dataTables.transportationData.percentageDistributionCarsFleet.other" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionCarsFleet.other; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData2(project.dataTables.transportationData.percentageDistributionCarsFleet.other, 'other')"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </TabPanel>

              <!-- Pestaña de Materials -->
              <TabPanel header="Materials">

                <div class="card">

                  <div class="p-fluid formgrid grid">
                    <div class="field col-12" v-if="project.dataTables">
                      <div class="mb-5" v-if="project.dataTables.materialData.percentageDistributionMaterialsUse[materialTransform]" >
                        <h3>Percentage distribution of materials use</h3>

                        <div class="flex align-items-baseline">
                          <label class="mr-2">Data for the material:</label>
                          <Dropdown class="mb-3" :options="materialsForDropdown" v-model="selectedMaterialForMaterialsData"/>
                        </div>

                        <div class="flex justify-content-around">
                          <div class="col-3">
                            <label for="primaryMaterialData">Primary</label>
                            <InputNumber id="primaryMaterialData" v-model="project.dataTables.materialData.percentageDistributionMaterialsUse[materialTransform].primary" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.materialData.percentageDistributionMaterialsUse[materialTransform].primary; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteMaterialsData(project.dataTables.materialData.percentageDistributionMaterialsUse[materialTransform].primary, materialTransform,'primary')"/>
                          </div>
                          <div class="col-3">
                            <label for="reusedMaterialData">Reused</label>
                            <InputNumber id="reusedMaterialData" v-model="project.dataTables.materialData.percentageDistributionMaterialsUse[materialTransform].reused" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.materialData.percentageDistributionMaterialsUse[materialTransform].reused; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteMaterialsData(project.dataTables.materialData.percentageDistributionMaterialsUse[materialTransform].reused, materialTransform,'reused')"/>
                          </div>
                          <div class="col-3">
                            <label for="recycledMaterialData">Recycled</label>
                            <InputNumber id="recycledMaterialData" v-model="project.dataTables.materialData.percentageDistributionMaterialsUse[materialTransform].recycled" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.materialData.percentageDistributionMaterialsUse[materialTransform].recycled; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteMaterialsData(project.dataTables.materialData.percentageDistributionMaterialsUse[materialTransform].recycled, materialTransform,'recycled')"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>

                <!-- Pestaña de Events -->
              <TabPanel header="Events">
                
                <div class="card">

                  <div class="p-fluid formgrid grid">
                    <div class="field col-12" v-if="project.dataTables">
                      <div class="mb-5" v-if="project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform]" >
                        <h3>Percentage distribution of international and national travels for events</h3>

                        <div class="flex align-items-baseline">
                          <label class="mr-2">Data for the event type:</label>
                          <Dropdown class="mb-3" :options="eventsForDropdown" v-model="selectedEventForEventsData"/>
                        </div>

                        <div class="flex justify-content-around">
                          <div class="col-3">
                            <label for="carEventData">Car</label>
                            <InputNumber id="carEventData" v-model="project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].car" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].car; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteEventsData(project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].car, eventTransform,'car')"/>
                          </div>
                          <div class="col-3">
                            <label for="motorbikesEventData">Motorbikes</label>
                            <InputNumber id="motorbikesEventData" v-model="project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].motorbikes" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].motorbikes; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteEventsData(project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].motorbikes, eventTransform,'motorbikes')"/>                          </div>
                          <div class="col-3">
                            <label for="busEventData">Bus</label>
                            <InputNumber id="busEventData" v-model="project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].bus" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].bus; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteEventsData(project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].bus, eventTransform,'bus')"/>
                          </div>

                          <div class="col-3">
                            <label for="nationalRailEventData">National Rail</label>
                            <InputNumber id="nationalRailEventData" v-model="project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].nationalRail" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].nationalRail; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteEventsData(project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].nationalRail, eventTransform,'nationalRail')"/>
                          </div>
                        </div>

                        <div class="flex justify-content-around">

                          <div class="col-3">
                            <label for="internationalRailEventData">International Rail</label>
                            <InputNumber id="internationalRailEventData" v-model="project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].internationalRail" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].internationalRail; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteEventsData(project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].internationalRail, eventTransform,'internationalRail')"/>
                          </div>

                          <div class="col-3">
                            <label for="ferriesEventData">Ferries</label>
                            <InputNumber id="ferriesEventData" v-model="project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].ferries" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].ferries; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteEventsData(project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].ferries, eventTransform,'ferries')"/>
                          </div>

                          <div class="col-3">
                            <label for="airplanesEventData">Airplanes</label>
                            <InputNumber id="busEventData" v-model="project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].airplanes" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].airplanes; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteEventsData(project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].airplanes, eventTransform,'airplanes')"/>
                          </div>

                          <div class="col-3">
                            <label for="otherEventData">Other</label>
                            <InputNumber id="otherEventData" v-model="project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].other" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].other; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteEventsData(project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[eventTransform].other, eventTransform,'other')"/>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                </div>

              </TabPanel>
            </TabView>
          </TabPanel>
				</TabView>
      </div>
    </div>

    <Dialog header="Warning" v-model:visible="displayUpdateScenarioValues" class="col-4" :modal="true">
      <div class="flex align-items-center  pb-5">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <div>
            <p>The values of the project will be updated in it's initial phase, are you sure?</p>
          </div>
      </div>
      <template #footer>
          <Button label="Cancel" @click="declineUpdateScenarioValuesDialog" class="p-button-text p-button-info" />
          <Button label="Ok" @click="confirmUpdateScenarioValuesDialog" class="p-button-text p-button-info" /> 
      </template>
    </Dialog>
  </div>
    

</template>
<script>
import Dropdown from 'primevue/dropdown';
import { mapState } from 'vuex'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import InputNumber from 'primevue/inputnumber';
import axios from "axios";
import {FilterMatchMode} from 'primevue/api';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Topbar from '@/components/Topbar.vue';
import Mongoose from "mongoose"
import Toast from 'primevue/toast';
import Badge from 'primevue/badge';
import Dialog from 'primevue/dialog';
import Chart from 'primevue/chart'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'
import 'primeicons/primeicons.css';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import InputSwitch from 'primevue/inputswitch';
import Divider from 'primevue/divider';

export default {
  name: 'ProjectDetailsAdvanced',
  components: {
    Dropdown,
    Button,
    DataTable,
    Column,
    InputText,
    RadioButton,
    InputNumber,
    TabView,
    TabPanel,
    Topbar,
    Toast,
    Chart,
    Badge,
    Dialog,
    ColumnGroup,
    Row,
    InputSwitch,
    Divider
  },
  data() {
    return {
      co2PermitsPrice: process.env.VUE_APP_CO2_PERMITS_PRICE,
      placeholder: "Select a partner",
      project: {},
      projectInitial: {},
      customHeat: [],
      customElectricity: [],
      customWater: [],
      customTransportation: [],
      customMaterials: [],
      customEvents: [],
      customPrintableDeliverables: [],
      customEquipment: [],
      electricityValuesTable:[],
      object: {},
      analysisInitial: this.$store.state.analysisParamsInitial,
      analysisExecution: this.$store.state.analysisParamsExecution,
      KPI1ParamsInitial: {},
      KPI1ParamsExecution: {},
      KPI2ParamsInitial: {},
      KPI2ParamsExecution: {},
      KPI3ParamsInitial: {},
      KPI3ParamsExecution: {},
      countriesForDropdown: ["Albania", "Bosnia & Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Europe", "France", "Greece", "Italy", "Malta", "Montenegro", "North Macedonia", "Portugal", "Slovenia", "Spain"],
      selectedCountryForTransportationData: "Albania",
      materialsForDropdown: ["Glass", "Food & Drink", "Aluminium Cans", "Plastics", "Paper"],
      selectedMaterialForMaterialsData: "Glass",
      eventsForDropdown: ["International", "National"],
      selectedEventForEventsData: "International",
      eventTypesForDropdown: ["In presence", "Mixed", "On-line"],
      travelModesForDropdown: ["Airplane", "Bus", "Car", "Ferries", "International Rail", "Light rail and tram/Underground", "Motorbikes", "National Rail", "Taxi"],
      fuelTypesForDropdown: ["Battery electric vehicle", "CNG", "Diesel", "Hybrid", "LPG", "Other", "Petrol", "Plug-in hybrid electric vehicle"],
      paperSizes: ["A0", "A1", "A2", "A3", "A4", "A5", "A6"],
      deliverableOptions: [
        {value: "Report type*", avgPagesPerCopy: 50, size: "A4"},
        {value: "Articles/Newsletter/Booklet", avgPagesPerCopy: 10, size: "A4"},
        {value: "Brochure/Flyer", avgPagesPerCopy: 2, size: "A4"},
        {value: "Poster/Rollup", avgPagesPerCopy: 1, size: "A0"},
      ],
      deliverableAdvancedOptions: [
        {value: "Application form", deliverableNames: ["Application form"]},
        {value: "Data", deliverableNames: ["Database", "Evaluation report", "Good practices", "Thematic data collection", "Stakeholders and beneficiaries"]},
        {value: "Digital or written communication", deliverableNames: ["Article", "Booklet", "Brochure", "Flyer", "Goodies", "Newsletter", "Poster", "Proceedings", "Social networks", "Story telling", "Widget"]},
        {value: "Informal/formalized grouping of actors", deliverableNames: ["Blog","Forum", "Platform"]},
        {value: "Map", deliverableNames: ["GIS", "Itinerary / routes", "Maps"]},
        {value: "Meeting", deliverableNames: ["Minutes", "Report", "SC and TC meeting minutes"]},
        {value: "Method", deliverableNames: ["Action plan", "Benchmarking method", "Community building", "Evaluation method", "Evaluation plan", "Guidelines", "Indicators list", "Manual", "Methodology", "Model", "Report", "Road map", "Steering and Technical committees procedures", "Strategy", "Toolkit"]},
        {value: "Observatory", deliverableNames: ["Observatory"]},
        {value: "Other", deliverableNames: ["Other"]},
        {value: "Plan", deliverableNames: ["Communication/Capitalization Plan"]},
        {value: "Preliminary study", deliverableNames: ["Preliminary or fine-tuning study for launching pilot activities"]},
        {value: "Press conference", deliverableNames: ["Kit", "Report"]},
        {value: "Provision of information and Data", deliverableNames: ["Feeding the web platform", "Report"]},
        {value: "Public/political event", deliverableNames: ["Conference/meeting report", "Forum"]},
        {value: "Report", deliverableNames: ["Benchmarking study", "Case study", "Comparative analysis", "Consultation report", "Diagnosis", "Feasibility study", "Needs Analysis", "Prospective study", "State of the art ", "SWOT Analysis", "Technical workshop report"]},
        {value: "Tailored event", deliverableNames: ["A typical/tailored event report"]},
        {value: "Technical event", deliverableNames: ["Seminar / Workshop / Metting reports"]},
        {value: "Tool", deliverableNames: ["Collecting information tool instructions", "Course", "Decision tool", "GIS", "Guidance", "Intranet guidance", "Legal acts", "Manual", "Maps", "Monitoring tool", "Plan", "Protocol", "Questionnaire", "Survey", "Toolbox", "Training", "Training material"]},
        {value: "Tool Service", deliverableNames: ["Facilities", "Software support/service", "Testing report"]},
        {value: "Training course", deliverableNames: ["Methodology", "Training report"]},
        {value: "Training material", deliverableNames: ["E-learning platform", "Training course material"]}
      ],
      customTypes : [
        {value: "Heat"},
        {value: "Electricity"},
        {value: "Water"},
        {value: "Transportation"},
        {value: "Materials"},
        {value: "Events"},
        {value: "Printable Deliverables"},
        {value: "Equipment"},
      ],
      chartDataInitial: {
				labels: ['Printable deliverables', 'Equipment', 'Electricity', 'Water', 'Transportation', 'Events', 'Materials', 'Heat'],
				datasets: [
					{
						label: 'KPI-1',
						backgroundColor: 'rgba(179,181,198,0.2)',
						borderColor: 'rgba(179,181,198,1)',
						pointBackgroundColor: 'rgba(179,181,198,1)',
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: 'rgba(179,181,198,1)',
						data: [0, 0, 0, 0, 0, 0, 0, 0]
					},
					{
						label: 'KPI-2',
						backgroundColor: 'rgba(255,99,132,0.2)',
						borderColor: 'rgba(255,99,132,1)',
						pointBackgroundColor: 'rgba(255,99,132,1)',
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: 'rgba(255,99,132,1)',
						data: [0, 0, 0, 0, 0, 0, 0, 0]
					},
          {
						label: 'KPI-3',
						backgroundColor: 'rgba(50,168,82,0.2)',
						borderColor: 'rgba(50,168,82,1)',
						pointBackgroundColor: 'rgba(50,168,82,1)',
						pointBorderColor: '##fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: 'rgba(50,168,82,1)',
						data: [0, 0, 0, 0, 0, 0, 0, 0]
					}
				]
			},
      chartDataExecution: {
				labels: ['Printable deliverables', 'Equipment', 'Electricity', 'Water', 'Transportation', 'Events', 'Materials', 'Heat'],
				datasets: [
					{
						label: 'KPI-1',
						backgroundColor: 'rgba(179,181,198,0.2)',
						borderColor: 'rgba(179,181,198,1)',
						pointBackgroundColor: 'rgba(179,181,198,1)',
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: 'rgba(179,181,198,1)',
						data: [0, 0, 0, 0, 0, 0, 0, 0]
					},
					{
						label: 'KPI-2',
						backgroundColor: 'rgba(255,99,132,0.2)',
						borderColor: 'rgba(255,99,132,1)',
						pointBackgroundColor: 'rgba(255,99,132,1)',
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: 'rgba(255,99,132,1)',
						data: [0, 0, 0, 0, 0, 0, 0, 0]
					},
          {
						label: 'KPI-3',
						backgroundColor: 'rgba(50,168,82,0.2)',
						borderColor: 'rgba(50,168,82,1)',
						pointBackgroundColor: 'rgba(50,168,82,1)',
						pointBorderColor: '##fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: 'rgba(50,168,82,1)',
						data: [0, 0, 0, 0, 0, 0, 0, 0]
					}
				]
			},
			chartOptions: {
				plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          r: {
            pointLabels: {
              color: '#495057',
              font: {
                size: 18
              }
            },
            grid: {
              color: '#ebedef',

            },
            angleLines: {
              color: '#ebedef'
            }
          }
        }
			},
      partnerFilters: null,
      externalExpertFilters: null,
      organizationEventsFilters: null,
      participationEventsFilters: null,
      printableDeliverableFilters: null,
      customFilters: null,
      loading: true,
      onFocusValue: null,
      displayPartnersWithoutCountryDialog: false,
      displayPartnersWithDefaultValues: false,
      displayEventsWithDefaultValues : false,
      partnersWithoutCountry: [],
      partnersWithDefaultValues: [],
      eventsOrganizedByTheprojectNotDefined: [],
      eventsParticipationNotDefined: [],
      displayPartnersError: false,
      eventsLoaded: false,
      displayUpdateScenarioValues: false,
      durationHoursPerDayFlag: false
    }
  },
  created() {
    this.project.events = {}
    this.project.events.organization = []
    this.project.events.participation = []

    this.getProject();
    this.initPartnerFilters();
    this.initExternalExpertFilters();
    this.initOrganizationEventsFilters();
    this.initParticipationEventsFilters();
    this.initPrintableDeliverableFilters();
    this.initCustomFilters();
  },
  mounted() {
    this.loading = false;
    if (this.$store.state.toggleValue === false)
      this.$store.dispatch("toggleView")
  },
  methods: {
    round(num) {
      return Math.round((num + Number.EPSILON) * 100) / 100
    },

    round4Decimals(num) {
      return Math.round((num + Number.EPSILON) * 10000) / 10000
    },

    generatePDF() {
      var html = htmlToPdfmake(document.getElementById('pdfPrintDiv').innerHTML);
      const documentDefinition = { content: html, pageOrientation: 'landscape' };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).open();
    },
    displayPartnersWithoutCountryErrorDialog() {
      this.displayPartnersWithoutCountryDialog = true
    },
    displayPartnersWithDefaultValuesErrorDialog(){
      this.displayPartnersWithDefaultValues = true;
    },
    displayPartnersErrorDialog() {
      this.displayPartnersError = true;
    },
    displayUpdateScenarioValuesDialog() {
      this.displayUpdateScenarioValues = true;
    },
    displayEventsErrorDialog() {
      this.displayEventsWithDefaultValues = true;
    },
    closePartnersWithoutCountryErrorDialog() {
      this.displayPartnersError = false;
      this.displayPartnersWithoutCountryDialog = false;
      this.displayPartnersWithDefaultValues = false;
      this.partnersWithoutCountry = [];
      this.partnersWithDefaultValues = [];
    },
    closeEventsErrorDialog() {
      this.displayEventsWithDefaultValues = false;
      this.eventsOrganizedByTheprojectNotDefined = [];
      this.eventsParticipationNotDefined = [];
    },
    confirmUpdateScenarioValuesDialog() {
      this.displayUpdateScenarioValues = false;
      this.updateScenarioValues();
      // if(this.project.isInitialProject) {
      //   this.saveCurrentProject();
      // } else {
      //   this.updateInitialValues();
      // }
    },
    declineUpdateScenarioValuesDialog() {
      this.displayUpdateScenarioValues = false;
    },
    calculateCF() {
      this.checkEventsNotFilled()
      this.checkEventsOrganizationHoursPerDayGreaterThan24()
      for (let partner of this.project.partners) {
        if (partner.country === "Select a country") {
          this.partnersWithoutCountry.push(partner)
        }
      }

      for(let partner of this.project.partners) {
        if(partner.twoWayTravels === null ||
            partner.employeesPersonMonths === null ) {
              this.partnersWithDefaultValues.push(partner);
            }
      }

      if (this.partnersWithoutCountry.length > 0) {
        this.displayPartnersWithoutCountryErrorDialog();
      }

      if (this.partnersWithDefaultValues.length > 0){
        this.displayPartnersWithDefaultValuesErrorDialog();
      }

      if(this.checkEventsOrganization() == true || this.checkEventsParticipation() == true) {
        this.displayEventsErrorDialog();
      }

      if (this.displayPartnersWithoutCountryDialog || this.displayPartnersWithDefaultValues > 0) {
        this.displayPartnersErrorDialog();
      } 

      if (this.durationHoursPerDayFlag){
        this.$toast.add({severity:'error', summary: 'Caution', detail: 'The value of Duration (hours per day) should be lower than 24', life: 8000});
      }
      else if (!this.checkHoursNotGreaterThan24() && !this.checkNonLocalPhysicalGreaterThanPhysicalParticipants() && !this.durationHoursPerDayFlag) {
        axios.put(`/projects/${this.$route.params.id}`, this.project)
        .catch((error) => {
          console.log(error);
        })
        
        this.savePrintableDeliverables()
        this.savePartners()
        this.saveEvents()
        this.saveCustoms()
        this.saveExternalExperts()

        axios.put(`/projects/calculateAdvancedCF/${this.$route.params.id}`)
        .then((response) => {
          this.project.fuelsHeatAdvancedCF = response.data.fuelsHeatAdvancedCF
          this.project.electricityAdvancedCF = response.data.electricityAdvancedCF
          this.project.waterAdvancedCF = response.data.waterAdvancedCF
          this.project.transportationAdvancedCF = response.data.transportationAdvancedCF
          this.project.materialsAdvancedCF = response.data.materialsAdvancedCF
          this.project.eventsAdvancedCF = response.data.eventsAdvancedCF
          this.project.printableDeliverablesAdvancedCF = response.data.printableDeliverablesAdvancedCF
          this.project.currentCF = response.data.currentCF
          this.project.equipmentAdvancedCF = response.data.equipmentAdvancedCF

          this.$toast.add({severity:'success', summary: 'Successful', detail: 'Project CF calculated', life: 3000});
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      }
    },
    checkEventsNotFilled() {
      if (this.project.publicOnSiteEventsNumber === 0) {
        if (this.project.publicOnSiteEventsAveragePhysicalParticipants !== 0
            || this.project.publicOnSiteEventsAverageNonLocalPhysicalParticipants !== 0
            || this.project.publicOnSiteEventsAverageDuration !== 0) {
          this.$toast.add({severity:'warn', summary: 'Caution', detail: 'Some values were input while the number of public in presence events is 0!', life: 8000});
        }
      }

      if (this.project.publicHybridEventsNumber === 0) {
        if (this.project.publicHybridEventsAveragePhysicalParticipants !== 0
            || this.project.publicHybridEventsAverageNonLocalPhysicalParticipants !== 0
            || this.project.publicHybridEventsAverageVirtualParticipants !== 0
            || this.project.publicHybridEventsAverageDuration !== 0
            || this.project.publicHybridEventsAverageHoursPerDays !== 0) {
          this.$toast.add({severity:'warn', summary: 'Caution', detail: 'Some values were input while the number of public mixed events is 0!', life: 8000});
        }
      }

      if (this.project.publicVirtualEventsNumber === 0) {
        if (this.project.publicVirtualEventsAverageVirtualParticipants !== 0
            || this.project.publicVirtualEventsAverageDuration !== 0) {
          this.$toast.add({severity:'warn', summary: 'Caution', detail: 'Some values were input while the number of public on-line events is 0!', life: 8000});
        }
      }
  
      if (this.project.internalOnSiteEventsNumber === 0) {
        if (this.project.internalOnSiteEventsAveragePhysicalParticipants !== 0
            || this.project.internalOnSiteEventsAverageNonLocalPhysicalParticipants !== 0
            || this.project.internalOnSiteEventsAverageDuration !== 0) {
          this.$toast.add({severity:'warn', summary: 'Caution', detail: 'Some values were input while the number of internal in presence events is 0!', life: 8000});
        }
      }

      if (this.project.internalHybridEventsNumber === 0) {
        if (this.project.internalHybridEventsAveragePhysicalParticipants !== 0
            || this.project.internalHybridEventsAverageNonLocalPhysicalParticipants !== 0
            || this.project.internalHybridEventsAverageVirtualParticipants !== 0
            || this.project.internalHybridEventsAverageDuration !== 0
            || this.project.internalHybridEventsAverageHoursPerDays !== 0) {
          this.$toast.add({severity:'warn', summary: 'Caution', detail: 'Some values were input while the number of internal mixed events is 0!', life: 8000});
        }
      }

      if (this.project.internalVirtualEventsNumber === 0) {
        if (this.project.internalVirtualEventsAverageVirtualParticipants !== 0
            || this.project.internalVirtualEventsAverageDuration !== 0) {
          this.$toast.add({severity:'warn', summary: 'Caution', detail: 'Some values were input while the number of internal on-line events is 0!', life: 8000});
        }
      }
  
      if (this.project.participatedOnSiteEventsNumber === 0) {
        if (this.project.participatedOnSiteEventsAverageParticipants !== 0
            || this.project.participatedOnSiteEventsAverageDuration !== 0) {
          this.$toast.add({severity:'warn', summary: 'Caution', detail: 'Some values were input while the number of participated in presence events is 0!', life: 8000});
        }
      }  
    },
    checkHoursNotGreaterThan24(){
      let res = false;
      if (this.project.publicHybridEventsAverageHoursPerDays > 24 || this.project.internalHybridEventsAverageHoursPerDays > 24) {
        res = true;
        this.$toast.add({severity:'error', summary: 'Caution', detail: 'The value of Average duration (hours/day) should be lower than 24', life: 8000});
      }
      return res;
    },
    checkNonLocalPhysicalGreaterThanPhysicalParticipants(){
      let res = false;
      if (this.project.publicOnSiteEventsAverageNonLocalPhysicalParticipants > this.project.publicOnSiteEventsAveragePhysicalParticipants 
        || this.project.publicHybridEventsAverageNonLocalPhysicalParticipants > this.project.publicHybridEventsAveragePhysicalParticipants
        || this.project.internalOnSiteEventsAverageNonLocalPhysicalParticipants > this.project.internalOnSiteEventsAveragePhysicalParticipants
        || this.project.internalHybridEventsAverageNonLocalPhysicalParticipants > this.project.internalHybridEventsAveragePhysicalParticipants) {
          res = true;
        this.$toast.add({severity:'error', summary: 'Caution', detail: 'Average number of non-local physical participants cannot be greater than the value of Average number of physical participants', life: 8000});
      }
      return res;
    },
    saveCurrentProject(){
        this.savePrintableDeliverables();
        this.savePartners();
        this.saveEvents()
        this.saveCustoms()
        this.saveExternalExperts()
        
        axios.put("/projects/" + this.project._id, this.project).then(() => {
          this.$toast.add({severity:'success', summary: 'Successful', detail: 'Project saved', life: 3000});
        }).catch(error =>{
          console.log(error)
       })
    },
    getTextColorFromCFIndex(cfIndex) {
      cfIndex
        // if (cfIndex < 150)
        //     return "success"
        // else if (cfIndex > 150 & cfIndex < 250)
        //     return "warning"
        // else
        //     return "danger"
        return ""
    },
    initPartnerFilters() {
      this.partnerFilters = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      }
    },
    clearPartnerFilter() {
      this.initPartnerFilters();
    },
    initExternalExpertFilters() {
      this.externalExpertFilters = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      }
    },
    clearExternalExpertFilter() {
      this.initExternalExpertFilters();
    },
    initOrganizationEventsFilters() {
      this.organizationEventsFilters = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      }
    },
    initParticipationEventsFilters() {
      this.participationEventsFilters = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      }
    },
    clearOrganizationEventsFilter() {
      this.initOrganizationEventsFilters();
    },
    clearParticipationEventsFilter() {
      this.initParticipationEventsFilters();
    },
    initPrintableDeliverableFilters() {
      this.printableDeliverableFilters = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      }
    },
    clearPrintableDeliverableFilter() {
      this.initPrintableDeliverableFilters();
    },
    initCustomFilters() {
      this.customFilters = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      }
    },
    clearCustomFilter() {
      this.initCustomFilters();
    },
    updateSelectedPartner(event) {
      this.$store.dispatch("updateSelectedPartner", event.value);
    },
    getProject(){
      this.axios.get(`/projects/${this.$route.params.id}`)
      .then((response) => {

        this.project = response.data;

        // Nos traemos las tablas de datos para los cálculos de CF para este proyecto
        axios.get(`/dataTables/${this.$route.params.id}`)
        .then( (responseDataTables) => {
          this.project.dataTables = responseDataTables.data;
        })
        .catch( (errorDT) => {
          console.log('error' + errorDT);
        })

        if (this.project.isInitialProject == this.$store.state.toggleProject) {
          location.href = '/projects/' + this.project.initialProject
        } else {
          this.chartDataExecution.datasets[0].data[0] = this.project.printableDeliverablesAdvancedCF,
          this.chartDataExecution.datasets[0].data[1] = this.project.equipmentAdvancedCF,
          this.chartDataExecution.datasets[0].data[2] = this.project.electricityAdvancedCF,
          this.chartDataExecution.datasets[0].data[3] = this.project.waterAdvancedCF,
          this.chartDataExecution.datasets[0].data[4] = this.project.transportationAdvancedCF,
          this.chartDataExecution.datasets[0].data[5] = this.project.eventsAdvancedCF,
          this.chartDataExecution.datasets[0].data[6] = this.project.materialsAdvancedC,
          this.chartDataExecution.datasets[0].data[7] = this.project.fuelsHeatAdvancedCF

          this.axios.get(`/projects/` + this.project.initialProject)
          .then( (res) => {
            this.projectInitial = res.data;

            this.chartDataInitial.datasets[0].data[0] = this.projectInitial.printableDeliverablesAdvancedCF,
            this.chartDataInitial.datasets[0].data[1] = this.projectInitial.equipmentAdvancedCF,
            this.chartDataInitial.datasets[0].data[2] = this.projectInitial.electricityAdvancedCF,
            this.chartDataInitial.datasets[0].data[3] = this.projectInitial.waterAdvancedCF,
            this.chartDataInitial.datasets[0].data[4] = this.projectInitial.transportationAdvancedCF,
            this.chartDataInitial.datasets[0].data[5] = this.projectInitial.eventsAdvancedCF,
            this.chartDataInitial.datasets[0].data[6] = this.projectInitial.materialsAdvancedC,
            this.chartDataInitial.datasets[0].data[7] = this.projectInitial.fuelsHeatAdvancedCF

            this.calculateKPI2();
            this.calculateKPI3();

          })
          .catch((error) => {
            console.log('error' + error);
          })

          this.axios.get(`/partners?projectId=${this.$route.params.id}`)
          .then((response) => {
            this.project.partners = response.data;
            if (response.data.length > 0) {
              this.project.coordinator = response.data.find(p => p.coordinator)._id
              this.$store.dispatch("updateSelectedPartner", response.data[0].name);
            }
          })
          .catch((e)=>{
            console.log('error' + e);
          })

          this.axios.get(`/externalExperts?projectId=${this.$route.params.id}`)
          .then((response) => {
            this.project.externalExperts = response.data;
          })
          .catch((e)=>{
            console.log('error' + e);
          })

          this.axios.get(`/events?projectId=${this.$route.params.id}`)
          .then((response) => {
            let events = response.data;
            this.project.events = {organization: [], participation: []}

            for (let e of events) {
              this.project.events[e.category].push(e)
            }
            this.eventsLoaded = true
          })
          .catch((e)=>{
            console.log('error' + e);
          })

          this.axios.get(`/printableDeliverables?projectId=${this.$route.params.id}`)
          .then((response) => {
            this.project.printableDeliverables = response.data;
          })
          .catch((e)=>{
            console.log('error' + e);
          })
        
          let projectID = this.$route.params.id;
          axios.get('/customs?projectId=' + projectID, { params: {
            projectId: projectID
          }})
          .then((response) => {
            
            this.project.customHeat = [];
            this.project.customElectricity = [];
            this.project.customWater = [];
            this.project.customTransportation = [];
            this.project.customMaterials = [];
            this.project.customEvents = [];
            this.project.customPrintableDeliverables = [];
            this.project.customEquipment = [];
            
            for(let i = 0; i < response.data.length; i++){
              if (response.data[i].type.endsWith("Heat")) {
                this.customHeat.push(response.data[i]);
              } else if(response.data[i].type.endsWith("Electricity")){
                this.customElectricity.push(response.data[i]);
              } else if(response.data[i].type.endsWith("Water")) {
                this.customWater.push(response.data[i]);
              } else if(response.data[i].type.endsWith("Transportation")) {
                this.customTransportation.push(response.data[i]);
              } else if(response.data[i].type.endsWith("Materials")) {
                this.customMaterials.push(response.data[i]);
              } else if(response.data[i].type.endsWith("Events")) {
                this.customEvents.push(response.data[i]);
              } else if(response.data[i].type.endsWith("Deliverables")) {
                this.customPrintableDeliverables.push(response.data[i]);
              } else if(response.data[i].type.endsWith("Equipment")) {
                this.customEquipment.push(response.data[i]);
              }
              this.project.customHeat = this.customHeat;
              this.project.customElectricity = this.customElectricity;
              this.project.customWater = this.customWater;
              this.project.customTransportation = this.customTransportation;
              this.project.customMaterials = this.customMaterials;
              this.project.customEvents = this.customEvents;
              this.project.customPrintableDeliverables = this.customPrintableDeliverables;
              this.project.customEquipment = this.customEquipment;
            }
          })
          .catch((e)=>{
            console.log('error' + e);
          })
        }
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    addPrintableDeliverable() {
      let newPrintableDeliverable = {
        name: "New printable deliverable",
        deliverableType: "Select a deliverable type",
        deliverableName: "Select a deliverable name",
        copies: 1,
        avgPagesPerCopy: 1,
        size: "A4",
        project: this.project._id
      }

      this.axios.post('/printableDeliverables', newPrintableDeliverable)
      .then((response) => {
        this.project.printableDeliverables.push(response.data)
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Printable deliverable created', life: 3000});
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    addPartner() {
      let newPartner = {
        _id: new Mongoose.Types.ObjectId(),
        name: "New partner",
        country: "Select a country",
        employeesPersonMonths: "",
        employeesWorkingWPP: "",
        seasonalEmployees: "",
        externalExperts: "",
        externalExpertsPersonMonths: "",
        coordinator: false,

        pcsBoughtDuringProject: 0,
        pcsFlatScreenBoughtDuringProject: 0,
        laptopsBoughtDuringProject: 0,
        flatScreensBoughtDuringProject: 0,
        printersBoughtDuringProject: 0,
        copyMachinesBoughtDuringProject: 0,

        totalWeightOtherElectricalEquipment: 0,

        totalWeightVehicles: 0,
        totalWeightMachines: 0,
        totalWeightFurniture: 0,
        project: this.project._id
      }

      let noCoordinator = this.project.partners.filter(p => p.coordinator === true).length === 0
        
      if (noCoordinator)
        newPartner.coordinator = true
        
      this.axios.post('/partners', newPartner)
      .then((response) => {
        this.project.partners.push(response.data)

        if (noCoordinator) {
          this.onCellEditCompletePartnerCoordinator(this.project.partners[0])
        }

        if (this.project.partners.length === 1)
          this.$store.dispatch("updateSelectedPartner", newPartner.name)
        
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Partner created', life: 3000});
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    deletePartner(index) {
      let partner = this.project.partners[index]
      
      this.axios.delete('/partners/' + partner._id)
      .then(() => {

        if (this.project.partners.length === 1) {
          this.project.partners = []
          this.$store.dispatch("updateSelectedPartner", "");
        } else {

          this.project.partners.splice(index, 1)
          
          if (this.project.partners.filter(p => p.coordinator === true).length === 0)
              this.onCellEditCompletePartnerCoordinator(this.project.partners[0])
          
          if (this.selectedPartnerForEquipmentSimple === partner.name)
            this.$store.dispatch("updateSelectedPartner", this.project.partners.filter(p => p._id !== partner._id)[0].name)

          this.axios.get(`/partners?projectId=${this.$route.params.id}`)
          .then((response) => {
            this.project.partners = response.data;
          })
          .catch((e)=>{
            console.log('error' + e);
          })
        }
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Partner deleted', life: 3000});
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    addExternalExpert() {
      let newExternalExpert = {
        _id: new Mongoose.Types.ObjectId(),
        typeOfExpertise: "New external expert",
        country: "Select a country",
        personMonthsWPP: 0,
        twoWayTravels: 0,
        
        project: this.project._id
      }

      this.axios.post('/externalExperts', newExternalExpert)
      .then((response) => {
        this.project.externalExperts.push(response.data)
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'External experts created', life: 3000});
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    deleteExternalExperts(index) {
      let externalExpert = this.project.externalExperts[index]
      
      this.axios.delete('/externalExperts/' + externalExpert._id)
      .then(() => {

        this.axios.get(`/externalExperts?projectId=${this.$route.params.id}`)
        .then((response) => {
          this.project.externalExperts = response.data
        })
        .catch((e)=>{
          console.log('error' + e);
        })

        this.$toast.add({severity:'success', summary: 'Successful', detail: 'External expert deleted', life: 3000});
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    addEvents(eventCategory) {
      let newEvent = {
        _id: new Mongoose.Types.ObjectId(),
        name: "New event",
        category: eventCategory,
        type: eventCategory == 'participation' ? "In presence" : "Select a type",
        physicalParticipants: 0,
        nonLocalPhysicalParticipants: 0,
        virtualParticipants: 0,
        durationDays: 0,
        durationHoursPerDay: 0,
        hostingCountry: "Select a country",
        
        distanceTravelledArrive: 0,
        travelModeArrive: "Select a travel mode",
        fuelTypeArrive: "Select a fuel type",
        distanceTravelledDepart: 0,
        travelModeDepart: "Select a travel mode",
        fuelTypeDepart: "Select a fuel type",
        project: this.project._id
      }

      this.axios.post('/events', newEvent)
      .then((response) => {
        this.project.events[eventCategory].push(response.data)
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Event created', life: 3000});
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    deleteEvent(index, eventCategory) {
      let event = this.project.events[eventCategory][index]
      
      this.axios.delete('/events/' + event._id)
      .then(() => {

        this.axios.get(`/events?projectId=${this.$route.params.id}`)
        .then((response) => {
          let events = response.data;
          this.project.events = {organization: [], participation: []}

          for (let e of events) {
            this.project.events[e.category].push(e)
          }
        })
        .catch((e)=>{
          console.log('error' + e);
        })

        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Event deleted', life: 3000});
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    savePrintableDeliverables() {
      this.axios.put('/printableDeliverables/updateAll', this.project.printableDeliverables)
      .then(() => {
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'All Printable Deliverables updated', life: 3000});
      }).catch((error) =>{
        console.log(error)
      })
    },
    savePartners() {
      this.axios.put('/partners/updateAll', this.project.partners)
      .then(() => {
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'All Partners updated', life: 3000});
      }).catch((error) =>{
        console.log(error)
      })
    },
    saveEvents() {
      let allEvents = [];

      if (this.project.events) {
        for(let event of this.project.events.organization) {
          allEvents.push(event);
        }

        for(let event of this.project.events.participation) {
          allEvents.push(event);
        }

        this.axios.put('/events/updateAll', allEvents)
        .then(() => {
          this.$toast.add({severity:'success', summary: 'Successful', detail: 'All Events updated', life: 3000});
        }).catch((error) =>{
          console.log(error)
        })
      }
    },
    saveExternalExperts() {
      this.axios.put('/externalExperts/updateAll', this.project.externalExperts)
      .then(() => {
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'All External experts updated', life: 3000});
      }).catch((error) =>{
        console.log(error)
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

      this.axios.delete('/printableDeliverables/' + printableDeliverable._id)
      .then(() => {

        this.axios.get(`/printableDeliverables?projectId=${this.$route.params.id}`)
        .then((response) => {
          this.project.printableDeliverables = response.data;
        })
        .catch((e)=>{
          console.log('error' + e);
        })
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Printable deliverable deleted', life: 3000});
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    onCellEditComplete(field, newValue) {
      if (newValue === this.onFocusValue) return;

      const paramsData = {}
      paramsData[field] = newValue;

      axios.put("/projects/" + this.project._id, paramsData).then(() => {
        this.project[field] = newValue
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Project updated', life: 3000});
      }).catch(error =>{
        console.log(error)
      })
    },
    onCellEditCompletePartner(event) {
      let { data, newValue, newData, field } = event;

      if (newValue === data[field]) return;

      const paramsData = {}

      newData[field] = newValue;
      paramsData[field] = newValue;

      if (field === "name") {
        this.$store.dispatch("updateSelectedPartner", newValue);
      }
      
      axios.put("/partners/" + data._id, paramsData).then(() => {
        this.project.partners.splice(this.project.partners.indexOf(data), 1, newData)
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Partner updated', life: 3000});
      }).catch(error =>{
        console.log(error)
      })
    },
    onCellEditCompletePartnerCoordinator(partner) {
      const paramsData = {}
      paramsData["_id"] = partner._id;
      this.project.partners.map(p => {
        if (p._id === partner._id) {
          p.coordinator = true
        } else {
          p.coordinator = false
        }
      });

      axios.put(`/partners/updateCoordinator?=${this.$route.params.id}`, paramsData).then(() => {
        this.project.coordinator = partner._id
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Project coordinator updated', life: 3000});
      }).catch(error =>{
        console.log(error)
      })
    },
    onCellEditCompletePartnerEquipment(field, newValue) {
      
      if (newValue === this.onFocusValue) return;

      let partnerId = this.selectedPartner._id
      const paramsData = {}
      paramsData[field] = newValue;
      
      axios.put("/partners/" + partnerId, paramsData).then(() => {
        this.project[field] = newValue
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Partner equipment data updated', life: 3000});
      }).catch(error =>{
        console.log(error)
      })
    },
    onCellEditCompleteExternalExpert(event) {
      let { data, newValue, newData, field } = event;

      if (newValue === data[field]) return;

      const paramsData = {}

      newData[field] = newValue;
      paramsData[field] = newValue;

      axios.put("/externalExperts/" + data._id, paramsData).then(() => {
        this.project.externalExperts.splice(this.project.externalExperts.indexOf(data), 1, newData)
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'External experts updated', life: 3000});
      }).catch(error =>{
        console.log(error)
      })
    },
    onCellEditCompleteEvents(event) {
      let { data, newValue, newData, field } = event;

      if (newValue === data[field]) return;

      if(field === "durationHoursPerDay" && newValue > 24) {
        this.durationHoursPerDayFlag = true;
        this.$toast.add({severity:'error', summary: 'Caution', detail: 'The value of Duration (hours per day) should be lower than 24', life: 8000});
      } else if (field === "durationHoursPerDay" && newValue <= 24) {
        this.durationHoursPerDayFlag = false;
      }
      const paramsData = {}

      newData[field] = newValue;
      paramsData[field] = newValue;

      axios.put("/events/" + data._id, paramsData).then(() => {
        this.project.events[data.category].splice(this.project.events[data.category].indexOf(data), 1, newData)
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Events updated', life: 3000});
      }).catch(error =>{
        console.log(error)
      })
    },
    onCellEditCompletePrintableDeliverable(event) {
      let { data, newValue, newData, field } = event;

      if (newValue === data[field]) return;

      const paramsData = {}

      newData[field] = newValue;
      paramsData[field] = newValue;

      if (field === "deliverableType") {
        paramsData["deliverableName"] = "Select a deliverable name"
        newData["deliverableName"] = "Select a deliverable name"

        let newPrintableDeliverable = this.deliverableOptions.filter(d => d.value == newValue)[0]

        paramsData["avgPagesPerCopy"] = newPrintableDeliverable.avgPagesPerCopy
        newData["avgPagesPerCopy"] = newPrintableDeliverable.avgPagesPerCopy
        paramsData["size"] = newPrintableDeliverable.size
        newData["size"] = newPrintableDeliverable.size
      }
      
      axios.put("/printableDeliverables/" + data._id, paramsData).then(() => {
        this.project.printableDeliverables.splice(this.project.printableDeliverables.indexOf(data), 1, newData)
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Printable deliverables updated', life: 3000});
      }).catch(error =>{
        console.log(error)
      })
    },
    addCustom(customType, custom, toastMessage){
      let newCustom = {
        _id: new Mongoose.Types.ObjectId(),
        name: "New Custom Item",
        type: customType,
        value: 0,
        project: this.project._id
      }
        
      this.axios.post('/customs', newCustom)
      .then(() => {
        this.project[custom].push(newCustom);
        
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Custom ' + toastMessage + ' created', life: 3000});
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    onCellEditCompleteCustom(event, custom, toastMessage) {
      let { data, newValue, newData, field } = event;

      if (newValue === data[field]) return;

      const paramsData = {}
      newData[field] = newValue;
      paramsData[field] = newValue;
      
      axios.put("/customs/" + data._id, paramsData).then(() => {
        this.project[custom].splice(this.project[custom].indexOf(data), 1, newData)
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Custom ' + toastMessage + ' updated', life: 3000});
      }).catch(error =>{
        console.log(error)
      })
    },
    
    saveCustoms() {
      let allCustoms = [];

      allCustoms.push(this.project.customHeat);
      allCustoms.push(this.project.customElectricity);
      allCustoms.push(this.project.customWater);
      allCustoms.push(this.project.customTransportation);
      allCustoms.push(this.project.customMaterials);
      allCustoms.push(this.project.customEvents);
      allCustoms.push(this.project.customPrintableDeliverables);
      allCustoms.push(this.project.customEquipment);

      this.axios.put('/customs/updateAll', allCustoms)
      .then(() => {
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'All customs updated', life: 3000});
        this.allCustoms = [];
      }).catch((error) =>{
        console.log(error)
      })
    },
    deleteCustom(index, custom, toastMessage) {
      let customData = this.project[custom][index]

      this.axios.delete('/customs/' + customData._id)
      .then(() => {
        this.project[custom].splice(index, 1);
        let projectID = this.$route.params.id;
        axios.get('/customs?projectId=' + projectID, { params: {
          projectId: projectID
        }})
        .catch((e)=>{
          console.log('error' + e);
        })

        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Custom ' + toastMessage + ' deleted', life: 3000});
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    updateScenarioValues(){

      // Para entender bien la lógicq debemos recordar que initialProject es el proyecto en fase Base

      // Eliminamos el proyecto en etapa Scenario
      axios.delete('/projects/' + this.project.initialProject)
        .then(() => {
          
          // Aquí, creamos una copia del proyecto en la etapa Base para la fase Scenario
          let newScenarioProject = Object.assign({}, this.project);
          // Aquí ponemos que no es initial, ya que la propiedad isInitial es true si es el proyecto en fase Base
          newScenarioProject.isInitialProject = new Boolean(false);
          newScenarioProject._id = this.project.initialProject;
          newScenarioProject.initialProject = this.project._id;

          // A cada partner que tiene la copia de Base, ahora le asignamos el ID del proyecto Scenario
          for(let partner of newScenarioProject.partners){
            partner.project = this.project.initialProject;
          }

          // Ídem para los Printable Deliverables
          for(let pd of newScenarioProject.printableDeliverables) {
            pd.project = this.project.initialProject;
          }

          // Guardamos el nuevo proyecto en fase Scenario, que tendrá los mismos valores que el proyecto en Base
          axios.post('/projects', newScenarioProject,{
          auth: {
              username: this.$store.state.username,
              password: this.$store.state.password
            }
          })
          .then( () => {

            // Aquí, lo que hacemos es guardar cada nuevo Printable Deliverable copia del Base con un ID nuevo propio, pero
            // que ya tiene asociado el ID del proyecto en fase Scenario
            for (let pd of newScenarioProject.printableDeliverables){
              pd._id = new Mongoose.Types.ObjectId();
              this.axios.post('/printableDeliverables', pd)
              .catch((e)=>{
                console.log('error' + e);
              })
            }

            // Ídem para Partners
            for(let partner of newScenarioProject.partners) {
              partner._id = new Mongoose.Types.ObjectId();
              this.axios.post('/partners', partner)
              .catch((e)=>{
                console.log('error' + e);
              })
            }
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'All Printable deliverables saved', life: 3000});
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'All Partners saved', life: 3000});
            
          })
          .catch( (error) => {
            console.log('error', error);
          })

          // Nos traemos de la BD todos los customs aosicados al proyecto en fase Base
          axios.get('/customs?projectId=' + this.project._id, { params: {
              projectId: this.project._id
            }
          })
          .then( (response) => {
            this.project.customs = response.data;

            // Asociamos a cada custom un nuevo ID y les asociamos el ID del proyecto nuevo Scenario
            for(let custom of this.project.customs) {
              custom._id = new Mongoose.Types.ObjectId();
              custom.project = this.project.initialProject;

              this.axios.post('/customs', custom)
              .catch((e)=>{
                console.log('error' + e);
              })
            }
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'All Customs saved', life: 3000});
          })
          .catch((e)=>{
            console.log('error' + e);
          })

          // Ídem para los external experts
          this.axios.get(`/externalExperts?projectId=` + this.project._id)
          .then((response) => {
            this.project.externalExperts = response.data;
            for(let externalExpert of response.data) {
              externalExpert._id = new Mongoose.Types.ObjectId();
              externalExpert.project = this.project.initialProject;
              axios.post('/externalExperts', externalExpert)
              .catch((e)=>{
                console.log('error' + e);
              })
            }
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'All external experts saved', life: 3000});
          })
          .catch((e)=>{
            console.log('error' + e);
          })

          // Ídem para los events
          this.axios.get(`/events?projectId=` + this.project._id)
          .then((response) => {
            
          for(let event of response.data) {
              event._id = new Mongoose.Types.ObjectId();
              event.project = this.project.initialProject;

              axios.post('/events', event)
              .catch((e)=>{
                console.log('error' + e);
              })
            }
          this.$toast.add({severity:'success', summary: 'Successful', detail: 'All events saved', life: 3000});
          })
          .catch((e)=>{
            console.log('error' + e);
          })
        })
        .catch((e)=>{
          console.log('error' + e);
        })
    },
    checkEventsOrganization() {
      let res = false;
      for( let event of this.project.events.organization) {
        if(event.type.endsWith('type') || event.hostingCountry.endsWith('country')) {
          res = true;
          this.eventsOrganizedByTheprojectNotDefined.push(Object.assign({}, event));
        }
      }
      return res;
    },
    checkEventsParticipation() {
      let res = false;

      for (let event of this.project.events.participation) {
        if(event.type.endsWith('type') || event.hostingCountry.endsWith('country')) {
          res = true;
          this.eventsParticipationNotDefined.push(Object.assign({}, event));
          break;
        }
        if(event.travelModeArrive == 'Car') {
          if(event.fuelTypeArrive.endsWith('type')) {
            res = true;
            this.eventsParticipationNotDefined.push(Object.assign({}, event));
            break;
          }
        }
        if(event.travelModeDepart.endsWith('Car')) {
          if(event.fuelTypeDepart.endsWith('type')) {
            res = true;
            this.eventsParticipationNotDefined.push(Object.assign({}, event));
            break;
          }
        }
      }

      return res;
    },
    toggleProjectView() {
      this.$store.commit("toggleProject");
      location.href = '/projects/' + this.project.initialProject
    },
    onCellEditCompleteAnalysis(analysisField, newValue, isInitial) {
      // La variable isInitial la vamos a usar para saber si el valor del campo
      // es para el proyecto en la fase inicial o si es de la fase de ejecución
      if(newValue == this.onFocusValue) return;

      if (isInitial == true) {
        this.analysisInitial[analysisField] = newValue;
        this.$store.commit("analysisParamsInitial", this.analysisInitial);
      } else {
        this.analysisExecution[analysisField] = newValue;
        this.$store.commit("analysisParamsExecution", this.analysisExecution);
      }
      this.calculateKPI3();
    },
    calculateKPI2(){
      
      // Dataset para el proyecto en fase inicial para los KPI2
      let advancedCFInitial = this.projectInitial.currentCF;

      let printableDeliverablesInitialKPI2 = (this.projectInitial.printableDeliverablesAdvancedCF / advancedCFInitial) * 100;
      let equipmentInitialKPI2 = (this.projectInitial.equipmentAdvancedCF / advancedCFInitial) * 100;
      let electricityInitialKPI2 = (this.projectInitial.electricityAdvancedCF / advancedCFInitial) * 100;
      let waterInitialKPI2 = (this.projectInitial.waterAdvancedCF / advancedCFInitial) * 100;
      let transportationInitialKPI2 = (this.projectInitial.transportationAdvancedCF / advancedCFInitial) * 100;
      let eventsInitialKPI2 = (this.projectInitial.eventsAdvancedCF / advancedCFInitial) * 100;
      let materialsInitialKPI2 = (this.projectInitial.materialsAdvancedCF / advancedCFInitial) * 100;
      let heatInitialKPI2 = (this.projectInitial.fuelsHeatAdvancedCF / advancedCFInitial) * 100;

      // Dataset para el proyecto en fase execution para los KPI2
      let advancedCFExecution = this.project.currentCF;

      let printableDeliverablesExecutionKPI2 = (this.project.printableDeliverablesAdvancedCF / advancedCFExecution) * 100;
      let equipmentExecutionKPI2 = (this.project.equipmentAdvancedCF / advancedCFExecution) * 100;
      let electricityExecutionKPI2 = (this.project.electricityAdvancedCF / advancedCFExecution) * 100;
      let waterExecutionKPI2 = (this.project.waterAdvancedCF / advancedCFExecution) * 100;
      let transportationExecutionKPI2 = (this.project.transportationAdvancedCF / advancedCFExecution) * 100;
      let eventsExecutionKPI2 = (this.project.eventsAdvancedCF / advancedCFExecution) * 100;
      let materialsExecutionKPI2 = (this.project.materialsAdvancedCF / advancedCFExecution) * 100;
      let heatExecutionKPI2 = (this.project.fuelsHeatAdvancedCF / advancedCFExecution) * 100;

      // Asignamos los valores al dataset de los KPI2

      this.chartDataInitial.datasets[1].data[0] = printableDeliverablesInitialKPI2;
      this.chartDataInitial.datasets[1].data[1] = equipmentInitialKPI2;
      this.chartDataInitial.datasets[1].data[2] = electricityInitialKPI2;
      this.chartDataInitial.datasets[1].data[3] = waterInitialKPI2;
      this.chartDataInitial.datasets[1].data[4] = transportationInitialKPI2;
      this.chartDataInitial.datasets[1].data[5] = eventsInitialKPI2;
      this.chartDataInitial.datasets[1].data[6] = materialsInitialKPI2;
      this.chartDataInitial.datasets[1].data[7] = heatInitialKPI2;

      this.chartDataExecution.datasets[1].data[0] = printableDeliverablesExecutionKPI2;
      this.chartDataExecution.datasets[1].data[1] = equipmentExecutionKPI2;
      this.chartDataExecution.datasets[1].data[2] = electricityExecutionKPI2;
      this.chartDataExecution.datasets[1].data[3] = waterExecutionKPI2;
      this.chartDataExecution.datasets[1].data[4] = transportationExecutionKPI2;
      this.chartDataExecution.datasets[1].data[5] = eventsExecutionKPI2;
      this.chartDataExecution.datasets[1].data[6] = materialsExecutionKPI2;
      this.chartDataExecution.datasets[1].data[7] = heatExecutionKPI2;
    },
    calculateKPI3(){
      
      // Dataset para el proyecto en fase inicial para los KPI3
      let initialParams = this.$store.state.analysisParamsInitial;
      let printableDeliverablesReferenceValueInitial = initialParams.printableDeliverablesInputInitial;
      let equipmentReferenceValueInitial = initialParams.equipmentInputInitial;
      let electricityReferenceValueInitial = initialParams.electricityInputInitial;
      let waterReferenceValueInitial = initialParams.waterInputInitial;
      let transportationReferenceValueInitial = initialParams.transportationInputInitial;
      let eventsReferenceValueInitial = initialParams.eventsInputInitial;
      let materialsReferenceValueInitial = initialParams.materialsInputInitial;
      let heatReferenceValueInitial = initialParams.heatInputInitial;

      let printableDeliverablesInitialKPI3 = (this.projectInitial.printableDeliverablesAdvancedCF / printableDeliverablesReferenceValueInitial)
      let equipmentInitialKPI3 = (this.projectInitial.equipmentAdvancedCF / equipmentReferenceValueInitial)
      let electricityInitialKPI3 = (this.projectInitial.electricityAdvancedCF / electricityReferenceValueInitial)
      let waterInitialKPI3 = (this.projectInitial.waterAdvancedCF / waterReferenceValueInitial)
      let transportationInitialKPI3 = (this.projectInitial.transportationAdvancedCF / transportationReferenceValueInitial)
      let eventsInitialKPI3 = (this.projectInitial.eventsAdvancedCF / eventsReferenceValueInitial)
      let materialsInitialKPI3 = (this.projectInitial.materialsAdvancedCF / materialsReferenceValueInitial)
      let heatInitialKPI3 = (this.projectInitial.fuelsHeatAdvancedCF / heatReferenceValueInitial)

      // Dataset para el proyecto en fase execution para los KPI3
      let executionParams = this.$store.state.analysisParamsExecution;
      let printableDeliverablesReferenceValueExecution = executionParams.printableDeliverablesInputExecution;
      let equipmentReferenceValueExecution = executionParams.equipmentInputExecution;
      let electricityReferenceValueExecution = executionParams.electricityInputExecution;
      let waterReferenceValueExecution = executionParams.waterInputExecution;
      let transportationReferenceValueExecution = executionParams.transportationInputExecution;
      let eventsReferenceValueExecution = executionParams.eventsInputExecution;
      let materialsReferenceValueExecution = executionParams.materialsInputExecution;
      let heatReferenceValueExecution = executionParams.heatInputExecution;

      let printableDeliverablesExecutionKPI3 = (this.project.printableDeliverablesAdvancedCF / printableDeliverablesReferenceValueExecution)
      let equipmentExecutionKPI3 = (this.project.equipmentAdvancedCF / equipmentReferenceValueExecution)
      let electricityExecutionKPI3 = (this.project.electricityAdvancedCF / electricityReferenceValueExecution)
      let waterExecutionKPI3 = (this.project.waterAdvancedCF / waterReferenceValueExecution)
      let transportationExecutionKPI3 = (this.project.transportationAdvancedCF / transportationReferenceValueExecution)
      let eventsExecutionKPI3 = (this.project.eventsAdvancedCF / eventsReferenceValueExecution)
      let materialsExecutionKPI3 = (this.project.materialsAdvancedCF / materialsReferenceValueExecution)
      let heatExecutionKPI3 = (this.project.fuelsHeatAdvancedCF / heatReferenceValueExecution)

      // Asignamos los valores al dataset de los KPI3

      this.chartDataInitial.datasets[2].data[0] = printableDeliverablesInitialKPI3;
      this.chartDataInitial.datasets[2].data[1] = equipmentInitialKPI3;
      this.chartDataInitial.datasets[2].data[2] = electricityInitialKPI3;
      this.chartDataInitial.datasets[2].data[3] = waterInitialKPI3;
      this.chartDataInitial.datasets[2].data[4] = transportationInitialKPI3;
      this.chartDataInitial.datasets[2].data[5] = eventsInitialKPI3;
      this.chartDataInitial.datasets[2].data[6] = materialsInitialKPI3;
      this.chartDataInitial.datasets[2].data[7] = heatInitialKPI3;

      this.chartDataExecution.datasets[2].data[0] = printableDeliverablesExecutionKPI3;
      this.chartDataExecution.datasets[2].data[1] = equipmentExecutionKPI3;
      this.chartDataExecution.datasets[2].data[2] = electricityExecutionKPI3;
      this.chartDataExecution.datasets[2].data[3] = waterExecutionKPI3;
      this.chartDataExecution.datasets[2].data[4] = transportationExecutionKPI3;
      this.chartDataExecution.datasets[2].data[5] = eventsExecutionKPI3;
      this.chartDataExecution.datasets[2].data[6] = materialsExecutionKPI3;
      this.chartDataExecution.datasets[2].data[7] = heatExecutionKPI3;
    },

    checkEventsOrganizationHoursPerDayGreaterThan24() {
      for( let event of this.project.events.organization) {
        if(event.durationHoursPerDay > 24) {
          this.durationHoursPerDayFlag = true;
          break;
        } else {
          this.durationHoursPerDayFlag = false;
        }
      }
    },

    onCellEditCompleteTransportationData(newValue, country, fieldTable) {
      // La variable isInitial la vamos a usar para saber si el valor del campo
      // es para el proyecto en la fase inicial o si es de la fase de ejecución
      if(newValue == this.onFocusValue) return;
      this.project.dataTables.transportationData.percentageDistributionTravelDistance[country][fieldTable] = newValue;

      let sum = 0;

      for(let field of Object.values(this.project.dataTables.transportationData.percentageDistributionTravelDistance[country])){
        sum += field;
      }


      if(this.round4Decimals(sum) != 1) {
        this.$toast.add({severity:'warn', summary: 'Warning', detail: 'Sum of the values of the table is not equal to 1, it is: ' + this.round4Decimals(sum), life: 3000});
      }

      axios.put('/dataTables/' + this.project._id, this.project.dataTables.transportationData, {params: {
        projectId: this.project._id,
        dataTableName: 'transportation'
      }})
      .then( () => {
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Percentage distribution of travels updated', life: 3000});
      })
      .catch( (error) => {
        console.log("Error: ", error);
      })
    },

    onCellEditCompleteTransportationData2(newValue, fieldTable) {
      // La variable isInitial la vamos a usar para saber si el valor del campo
      // es para el proyecto en la fase inicial o si es de la fase de ejecución
      if(newValue == this.onFocusValue) return;
      this.project.dataTables.transportationData.percentageDistributionCarsFleet[fieldTable] = newValue;

           let sum = 0;

      for(let field of  Object.values(this.project.dataTables.transportationData.percentageDistributionCarsFleet)){
        sum += field;
      }

      if(this.round4Decimals(sum) != 1) {
        this.$toast.add({severity:'warn', summary: 'Warning', detail: 'Sum of the values of the table is not equal to 1, it is: ' + this.round4Decimals(sum), life: 3000});
      }


      axios.put('/dataTables/' + this.project._id, this.project.dataTables.transportationData, {params: {
        projectId: this.project._id,
        dataTableName: 'transportation'
      }})
      .then( () => {
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Percentage distribution of cars fleet updated', life: 3000});
      })
      .catch( (error) => {
        console.log("Error: ", error);
      })
    },

    onCellEditCompleteMaterialsData(newValue, material, fieldTable) {
      // La variable isInitial la vamos a usar para saber si el valor del campo
      // es para el proyecto en la fase inicial o si es de la fase de ejecución
      if(newValue == this.onFocusValue) return;
      this.project.dataTables.materialData.percentageDistributionMaterialsUse[material][fieldTable] = newValue;

           let sum = 0;

      for(let field of  Object.values(this.project.dataTables.materialData.percentageDistributionMaterialsUse[material])){
        sum += field;
      }

      if(this.round4Decimals(sum) != 1) {
        this.$toast.add({severity:'warn', summary: 'Warning', detail: 'Sum of the values of the table is not equal to 1, it is: ' + this.round4Decimals(sum), life: 3000});
      }


      axios.put('/dataTables/' + this.project._id, this.project.dataTables.materialData, {params: {
        projectId: this.project._id,
        dataTableName: 'material'
      }})
      .then( () => {
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Percentage distribution of materials use updated', life: 3000});
      })
      .catch( (error) => {
        console.log("Error: ", error);
      })
    },

    onCellEditCompleteEventsData(newValue, event, fieldTable) {
      // La variable isInitial la vamos a usar para saber si el valor del campo
      // es para el proyecto en la fase inicial o si es de la fase de ejecución
      if(newValue == this.onFocusValue) return;
      this.project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[event][fieldTable] = newValue;

      let sum = 0;

      for(let field of Object.values(this.project.dataTables.eventsData.percentageDistributionInternationalNationalTravels[event])){
        sum += field;
      }

      if(this.round4Decimals(sum) != 1) {
        this.$toast.add({severity:'warn', summary: 'Warning', detail: 'Sum of the values of the table is not equal to 1, it is: ' + this.round4Decimals(sum), life: 3000});
      }


      axios.put('/dataTables/' + this.project._id, this.project.dataTables.eventsData, {params: {
        projectId: this.project._id,
        dataTableName: 'events'
      }})
      .then( () => {
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Percentage distribution of travels updated', life: 3000});
      })
      .catch( (error) => {
        console.log("Error: ", error);
      })
    }

  },
  
  computed: {
    ...mapState([
      'selectedPartnerForEquipmentSimple', 'toggleProject'
    ]),
    selectedPartner() {
      if (!this.project.partners) return {}

      return this.project.partners.find(p => { 
        return p.name === this.selectedPartnerForEquipmentSimple
      })
    },
    countryTransform(){
      return this.selectedCountryForTransportationData.replace("&", "").toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    },

    materialTransform(){
      return this.selectedMaterialForMaterialsData.replace("&", "And").toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    },

     eventTransform(){
      return this.selectedEventForEventsData.replace("&", "").toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }
  }
}
</script>

<style>
.initialDataLabel + .p-inputswitch .p-inputswitch-slider {
  background: #3B82F6;
}

.initialDataLabel + .p-inputswitch:not(.p-disabled):hover .p-inputswitch-slider {
    background: #003399;
}

.projectDetailsElectrictyGrid {
  display: flex;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
  margin-top: -0.5rem;
  align-content: space-between;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}

.colCustom {
    flex: 0 0 auto;
    padding: 0.5rem;
    width: 100%;
}

#app-mode-label {
    position: relative;
    bottom: 7px;
    margin-right: 0.75rem;
}

.layout-topbar-menu {
    align-items: center;
    width: max-content;
    margin-right: 0.75rem;
}
</style>