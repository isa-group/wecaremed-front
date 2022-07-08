<template>
  
  <Topbar v-model:projectInfo="projectInfo" />

  <div class="projectDetailsSimpleGrid">

    <Toast position="bottom-right" />

    <div id="pdfPrintDiv" style="display: none">
      <h1 style="margin-bottom: 20px">{{project.name}} 
      ({{(new Date(project.from).getMonth() + 1).toString().padStart(2, "0") + '/' + new Date(project.from).getFullYear()}}
      - {{(new Date(project.to).getMonth() + 1).toString().padStart(2, "0") + '/' + new Date(project.to).getFullYear()}})
      <br>[{{project.initialCF}}] t CO<sub style="font-size: 22px">2</sub>e</h1>
                        
      <h3>Partners</h3>
                
      <table class="table table-bordered" style="margin-bottom: 35px">
        <thead>
          <tr>
            <th>Coordinator</th>
            <th>Name</th>
            <th>Country</th>
            <th>Number of full time staff members</th>
            <th>Number of part time staff members</th>
            <th>Sum of the staff person months (full time + part time)</th>
            <th>Number of external experts</th>
            <th>Sum of the external experts person months</th>
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

      <h3>Equipment</h3>

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
              <th>Average number of non-local physical participants</th>
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
              <th>Average number of non-local physical participants</th>
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
              <th>Average number of non-local physical participants</th>
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
              <th>Average number of non-local physical participants</th>
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

      <h2>Tons of equivalent carbon dioxide emitted: {{project.initialCF}}</h2> 
      <h2>Price of the ton of CO<sub style="font-size: 22px">2</sub> equivalent: {{co2PermitsPrice + ' €'}}</h2>
      <h2 style="margin-bottom: 40px">CO<sub style="font-size: 22px">2</sub> permits cost: {{round(project.initialCF * co2PermitsPrice) + ' €'}}</h2>

      <h3 style="margin-bottom: 10px">Carbon Footprint breakdown (Tons):</h3>
      <ul>
        <li style="margin-bottom: 10px; font-size: 20px">Fuels (Heating): {{project.fuelsHeatSimpleCF}}</li>
        <li style="margin-bottom: 10px; font-size: 20px">Electricity: {{project.electricitySimpleCF}}</li>
        <li style="margin-bottom: 10px; font-size: 20px">Water: {{project.waterSimpleCF}}</li>
        <li style="margin-bottom: 10px; font-size: 20px">Transportation: {{project.transportationSimpleCF}}</li>
        <li style="margin-bottom: 10px; font-size: 20px">Materials: {{project.materialsSimpleCF}}</li>
        <li style="margin-bottom: 10px; font-size: 20px">Printable deliverables: {{project.printableDeliverablesSimpleCF}}</li>
        <li style="margin-bottom: 10px; font-size: 20px">Equipment: {{project.equipmentSimpleCF}}</li>
        <li style="font-size: 20px">Events: {{project.eventsSimpleCF}}</li>
      </ul>

      
    </div>
    <div class="card col-12">

      <div style="display: flex; align-items: center; justify-content: space-between;">
        <h2 v-if="project.isInitialProject">Project's base data</h2>
        <h2 v-else-if="!project.isInitialProject">Project's scenario data</h2>
      </div>

      <TabView>
        <TabPanel header="Data">
          <div class="card col-12">
            <h4>Partners</h4>

            <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
            :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="10" v-model:filters="partnerFilters"
            filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
            :globalFilterFields="['name','country','employeesPersonMonths', 'externalExpertsPersonMonths', 'employeesWorkingWPP', 
                                  'seasonalEmployees', 'externalExperts', 'coordinator']" removableSort>
              
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
                    <InputText v-model="slotProps.data[slotProps.field]" @focus="$event.target.select()" @focusout="savePartners"/>
                </template>
              </Column>

              <Column field="country" header="Country" :sortable="true">
                <template #body="slotProps">
                  <td :class="slotProps.data[slotProps.field] == 'Select a country' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                </template>
                <template #editor="slotProps">
                  <Dropdown :options="countriesForDropdownWithoutEurope" v-model="slotProps.data[slotProps.field]" @focusout="savePartners" />
                </template>
              </Column>

              <Column field="employeesWorkingWPP" header="Number of full time staff members" :sortable="true">
                <template #editor="slotProps">
                  <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                   showButtons :step="0.25" decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="$event.target.select()" @focusout="savePartners"/>
                </template>
              </Column>

              <Column field="seasonalEmployees" header="Number of part time staff members" :sortable="true">
                <template #editor="slotProps">
                  <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                  showButtons :step="0.25" decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="$event.target.select()" @focusout="savePartners"/>
                </template>
              </Column>


              <Column field="employeesPersonMonths" header="Sum of the staff person months (full time + part time)" :sortable="true">
                <template #editor="slotProps" class="p-field">
                  <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                  showButtons :step="0.25" decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="$event.target.select()" @focusout="savePartners"/>
                </template>
              </Column>

              <Column field="externalExperts" header="Number of external experts" :sortable="true">
                <template #editor="slotProps">
                  <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="$event.target.select()" @focusout="savePartners"/>
                </template>
              </Column>

              <Column field="externalExpertsPersonMonths" header="Sum of the external experts person months" :sortable="true">
                <template #editor="slotProps">
                  <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                  showButtons :step="0.25" decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="$event.target.select()" @focusout="savePartners"/>
                </template>
              </Column>


              <Column field="actions" header="Actions">
                <template #body="slotProps">
                  <i class="pi pi-trash" @click="deletePartner(project.partners.indexOf(slotProps.data))" v-tooltip.top="'Delete partner'"/>
                </template>
              </Column>
            
            </DataTable>
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

          <div class="col-12">
            <div class="card">
              <h4>Events*</h4>

              <TabView>
                <TabPanel header="Public events">
                  <div class="card">
                    <h5>In presence</h5>

                    <div class="p-fluid formgrid grid">
                      <div class="field col-12 md:col-6">
                        <label for="publicOnSiteEventsNumber">Number of in presence public events</label>
                        <InputNumber v-model="project.publicOnSiteEventsNumber" mode="decimal" :inputClass="project.publicOnSiteEventsNumber == 0 ? 'defaultValue' : ''"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()" 
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicOnSiteEventsNumber; $event.target.select()" 
                        @focusout="onCellEditComplete('publicOnSiteEventsNumber', project.publicOnSiteEventsNumber)"
                        id ="publicOnSiteEventsNumber"/>
                      </div>
                      <div class="field col-12 md:col-6">
                        <label for="publicOnSiteEventsAveragePhysicalParticipants">Average number of physical participants</label>
                        <InputNumber v-model="project.publicOnSiteEventsAveragePhysicalParticipants" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()" :inputClass="project.publicOnSiteEventsAveragePhysicalParticipants == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicOnSiteEventsAveragePhysicalParticipants; $event.target.select()" 
                        @focusout="onCellEditComplete('publicOnSiteEventsAveragePhysicalParticipants', project.publicOnSiteEventsAveragePhysicalParticipants)"
                        id ="publicOnSiteEventsAveragePhysicalParticipants"/>
                      </div>
                      <div class="field col-12 md:col-6">
                        <label for="publicOnSiteEventsAverageNonLocalPhysicalParticipants">Average number of non-local physical participants**</label>
                        <InputNumber v-model="project.publicOnSiteEventsAverageNonLocalPhysicalParticipants" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()" :inputClass="project.publicOnSiteEventsAverageNonLocalPhysicalParticipants == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicOnSiteEventsAverageNonLocalPhysicalParticipants; $event.target.select()" 
                        @focusout="onCellEditComplete('publicOnSiteEventsAverageNonLocalPhysicalParticipants', project.publicOnSiteEventsAverageNonLocalPhysicalParticipants)"
                        id ="publicOnSiteEventsAverageNonLocalPhysicalParticipants"/>
                      </div>
                      <div class="field col-12 md:col-6">
                        <label for="publicOnSiteEventsAverageDuration">Average duration (days)</label>
                        <InputNumber v-model="project.publicOnSiteEventsAverageDuration" mode="decimal" :maxFractionDigits="3"
                        showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()" :inputClass="project.publicOnSiteEventsAverageDuration == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicOnSiteEventsAverageDuration; $event.target.select()" 
                        @focusout="onCellEditComplete('publicOnSiteEventsAverageDuration', project.publicOnSiteEventsAverageDuration)"
                        id ="publicOnSiteEventsAverageDuration"/>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <h5>Mixed mode: both in presence and on-line</h5>

                    <div class="p-fluid formgrid grid">
                      <div class="field col-12 md:col-4">
                        <label for="publicHybridEventsNumber">Number of mixed public events</label>
                        <InputNumber v-model="project.publicHybridEventsNumber" mode="decimal" :inputClass="project.publicHybridEventsNumber == 0 ? 'defaultValue' : ''"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicHybridEventsNumber; $event.target.select()" 
                        @focusout="onCellEditComplete('publicHybridEventsNumber', project.publicHybridEventsNumber)"
                        id ="publicHybridEventsNumber"/>
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="publicHybridEventsAveragePhysicalParticipants">Average number of physical participants</label>
                        <InputNumber v-model="project.publicHybridEventsAveragePhysicalParticipants" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()" :inputClass="project.publicHybridEventsAveragePhysicalParticipants == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicHybridEventsAveragePhysicalParticipants; $event.target.select()" 
                        @focusout="onCellEditComplete('publicHybridEventsAveragePhysicalParticipants', project.publicHybridEventsAveragePhysicalParticipants)"
                        id ="publicHybridEventsAveragePhysicalParticipants"/>
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="publicHybridEventsAverageNonLocalPhysicalParticipants">Average number of non-local physical participants**</label>
                        <InputNumber v-model="project.publicHybridEventsAverageNonLocalPhysicalParticipants" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()" :inputClass="project.publicHybridEventsAverageNonLocalPhysicalParticipants == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicHybridEventsAverageNonLocalPhysicalParticipants; $event.target.select()" 
                        @focusout="onCellEditComplete('publicHybridEventsAverageNonLocalPhysicalParticipants', project.publicHybridEventsAverageNonLocalPhysicalParticipants)"
                        id ="publicHybridEventsAverageNonLocalPhysicalParticipants"/>
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="publicHybridEventsAverageVirtualParticipants">Average number of on-line participants</label>
                        <InputNumber v-model="project.publicHybridEventsAverageVirtualParticipants" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()" :inputClass="project.publicHybridEventsAverageVirtualParticipants == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicHybridEventsAverageVirtualParticipants; $event.target.select()" 
                        @focusout="onCellEditComplete('publicHybridEventsAverageVirtualParticipants', project.publicHybridEventsAverageVirtualParticipants)"
                        id ="publicHybridEventsAverageVirtualParticipants"/>
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="publicHybridEventsAverageDuration ">Average duration (days)</label>
                        <InputNumber v-model="project.publicHybridEventsAverageDuration " mode="decimal" :maxFractionDigits="3"
                        showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()" :inputClass="project.publicHybridEventsAverageDuration == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicHybridEventsAverageDuration; $event.target.select()" 
                        @focusout="onCellEditComplete('publicHybridEventsAverageDuration', project.publicHybridEventsAverageDuration)"
                        id ="publicHybridEventsAverageDuration "/>
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="publicHybridEventsAverageHoursPerDays">Average duration (hours per day)</label>
                        <InputNumber v-model="project.publicHybridEventsAverageHoursPerDays" mode="decimal" :maxFractionDigits="3"
                        showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()" :inputClass="project.publicHybridEventsAverageHoursPerDays == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicHybridEventsAverageHoursPerDays; $event.target.select()" 
                        @focusout="onCellEditComplete('publicHybridEventsAverageHoursPerDays', project.publicHybridEventsAverageHoursPerDays)"
                        id ="publicHybridEventsAverageHoursPerDays"/>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <h5>On-line</h5>

                    <div class="p-fluid formgrid grid">
                      <div class="field col-12 md:col-4">
                        <label for="publicVirtualEventsNumber">Number of on-line public events</label>
                        <InputNumber v-model="project.publicVirtualEventsNumber" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()" :inputClass="project.publicVirtualEventsNumber == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicVirtualEventsNumber; $event.target.select()" 
                        @focusout="onCellEditComplete('publicVirtualEventsNumber', project.publicVirtualEventsNumber)"
                        id ="publicVirtualEventsNumber"/>
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="publicVirtualEventsAverageVirtualParticipants">Average number of on-line participants</label>
                        <InputNumber v-model="project.publicVirtualEventsAverageVirtualParticipants" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()" :inputClass="project.publicVirtualEventsAverageVirtualParticipants == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicVirtualEventsAverageVirtualParticipants; $event.target.select()" 
                        @focusout="onCellEditComplete('publicVirtualEventsAverageVirtualParticipants', project.publicVirtualEventsAverageVirtualParticipants)"
                        id ="publicVirtualEventsAverageVirtualParticipants"/>
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="publicVirtualEventsAverageDuration">Average duration (hours)</label>
                        <InputNumber v-model="project.publicVirtualEventsAverageDuration" mode="decimal" :maxFractionDigits="3"
                        showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()" :inputClass="project.publicVirtualEventsAverageDuration == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicVirtualEventsAverageDuration; $event.target.select()" 
                        @focusout="onCellEditComplete('publicVirtualEventsAverageDuration', project.publicVirtualEventsAverageDuration)"
                        id ="publicVirtualEventsAverageDuration"/>
                      </div>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel header="Internal events/meetings">
                  <div class="card">
                    <h5>In presence</h5>

                    <div class="p-fluid formgrid grid">
                      <div class="field col-12 md:col-6">
                        <label for="internalOnSiteEventsNumber">Number of in presence internal events/meetings</label>
                        <InputNumber v-model="project.internalOnSiteEventsNumber" mode="decimal" :inputClass="project.internalOnSiteEventsNumber == 0 ? 'defaultValue' : ''"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalOnSiteEventsNumber; $event.target.select()" 
                        @focusout="onCellEditComplete('internalOnSiteEventsNumber', project.internalOnSiteEventsNumber)"
                        id ="internalOnSiteEventsNumber"/>
                      </div>
                      <div class="field col-12 md:col-6">
                        <label for="internalOnSiteEventsAveragePhysicalParticipants">Average number of physical participants</label>
                        <InputNumber v-model="project.internalOnSiteEventsAveragePhysicalParticipants" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()" :inputClass="project.internalOnSiteEventsAveragePhysicalParticipants == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalOnSiteEventsAveragePhysicalParticipants; $event.target.select()" 
                        @focusout="onCellEditComplete('internalOnSiteEventsAveragePhysicalParticipants', project.internalOnSiteEventsAveragePhysicalParticipants)"
                        id ="internalOnSiteEventsAveragePhysicalParticipants"/>
                      </div>
                      <div class="field col-12 md:col-6">
                        <label for="internalOnSiteEventsAverageNonLocalPhysicalParticipants">Average number of non-local physical participants**</label>
                        <InputNumber v-model="project.internalOnSiteEventsAverageNonLocalPhysicalParticipants" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()" :inputClass="project.internalOnSiteEventsAverageNonLocalPhysicalParticipants == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalOnSiteEventsAverageNonLocalPhysicalParticipants; $event.target.select()" 
                        @focusout="onCellEditComplete('internalOnSiteEventsAverageNonLocalPhysicalParticipants', project.internalOnSiteEventsAverageNonLocalPhysicalParticipants)"
                        id ="internalOnSiteEventsAverageNonLocalPhysicalParticipants"/>
                      </div>
                      <div class="field col-12 md:col-6">
                        <label for="internalOnSiteEventsAverageDuration">Average duration (days)</label>
                        <InputNumber v-model="project.internalOnSiteEventsAverageDuration" mode="decimal" :maxFractionDigits="3"
                        showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()" :inputClass="project.internalOnSiteEventsAverageDuration == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalOnSiteEventsAverageDuration; $event.target.select()" 
                        @focusout="onCellEditComplete('internalOnSiteEventsAverageDuration', project.internalOnSiteEventsAverageDuration)"
                        id ="internalOnSiteEventsAverageDuration"/>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <h5>Mixed mode: both in presence and on-line</h5>

                    <div class="p-fluid formgrid grid">
                      <div class="field col-12 md:col-4">
                        <label for="internalHybridEventsNumber">Number of mixed internal events/meetings</label>
                        <InputNumber v-model="project.internalHybridEventsNumber" mode="decimal" :inputClass="project.internalHybridEventsNumber == 0 ? 'defaultValue' : ''"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalHybridEventsNumber; $event.target.select()" 
                        @focusout="onCellEditComplete('internalHybridEventsNumber', project.internalHybridEventsNumber)"
                        id ="internalHybridEventsNumber"/>
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="internalHybridEventsAveragePhysicalParticipants">Average number of physical participants</label>
                        <InputNumber v-model="project.internalHybridEventsAveragePhysicalParticipants" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()" :inputClass="project.internalHybridEventsAveragePhysicalParticipants == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalHybridEventsAveragePhysicalParticipants; $event.target.select()" 
                        @focusout="onCellEditComplete('internalHybridEventsAveragePhysicalParticipants', project.internalHybridEventsAveragePhysicalParticipants)"
                        id ="internalHybridEventsAveragePhysicalParticipants"/>
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="internalHybridEventsAverageNonLocalPhysicalParticipants">Average number of non-local physical participants**</label>
                        <InputNumber v-model="project.internalHybridEventsAverageNonLocalPhysicalParticipants" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()" :inputClass="project.internalHybridEventsAverageNonLocalPhysicalParticipants == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalHybridEventsAverageNonLocalPhysicalParticipants; $event.target.select()" 
                        @focusout="onCellEditComplete('internalHybridEventsAverageNonLocalPhysicalParticipants', project.internalHybridEventsAverageNonLocalPhysicalParticipants)"
                        id ="internalHybridEventsAverageNonLocalPhysicalParticipants"/>
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="internalHybridEventsAverageVirtualParticipants">Average number of on-line participants</label>
                        <InputNumber v-model="project.internalHybridEventsAverageVirtualParticipants" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()" :inputClass="project.internalHybridEventsAverageVirtualParticipants == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalHybridEventsAverageVirtualParticipants; $event.target.select()" 
                        @focusout="onCellEditComplete('internalHybridEventsAverageVirtualParticipants', project.internalHybridEventsAverageVirtualParticipants)"
                        id ="internalHybridEventsAverageVirtualParticipants"/>
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="internalHybridEventsAverageDuration ">Average duration (days)</label>
                        <InputNumber v-model="project.internalHybridEventsAverageDuration " mode="decimal" :maxFractionDigits="3"
                        showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()" :inputClass="project.internalHybridEventsAverageDuration == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalHybridEventsAverageDuration; $event.target.select()" 
                        @focusout="onCellEditComplete('internalHybridEventsAverageDuration', project.internalHybridEventsAverageDuration)"
                        id ="internalHybridEventsAverageDuration "/>
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="internalHybridEventsAverageHoursPerDays">Average duration (hours/day)</label>
                        <InputNumber v-model="project.internalHybridEventsAverageHoursPerDays" mode="decimal" :maxFractionDigits="3"
                        showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()" :inputClass="project.internalHybridEventsAverageHoursPerDays == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalHybridEventsAverageHoursPerDays; $event.target.select()" 
                        @focusout="onCellEditComplete('internalHybridEventsAverageHoursPerDays', project.internalHybridEventsAverageHoursPerDays)"
                        id ="internalHybridEventsAverageHoursPerDays"/>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <h5>On-line</h5>

                    <div class="p-fluid formgrid grid">
                      <div class="field col-12 md:col-4">
                        <label for="internalVirtualEventsNumber">Number of on-line internal events/meetings</label>
                        <InputNumber v-model="project.internalVirtualEventsNumber" mode="decimal" :inputClass="project.internalVirtualEventsNumber == 0 ? 'defaultValue' : ''"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalVirtualEventsNumber; $event.target.select()" 
                        @focusout="onCellEditComplete('internalVirtualEventsNumber', project.internalVirtualEventsNumber)"
                        id ="internalVirtualEventsNumber"/>
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="internalVirtualEventsAverageVirtualParticipants">Average number of on-line participants</label>
                        <InputNumber v-model="project.internalVirtualEventsAverageVirtualParticipants" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()" :inputClass="project.internalVirtualEventsAverageVirtualParticipants == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalVirtualEventsAverageVirtualParticipants; $event.target.select()" 
                        @focusout="onCellEditComplete('internalVirtualEventsAverageVirtualParticipants', project.internalVirtualEventsAverageVirtualParticipants)"
                        id ="internalVirtualEventsAverageVirtualParticipants"/>
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="internalVirtualEventsAverageDuration">Average duration (hours)</label>
                        <InputNumber v-model="project.internalVirtualEventsAverageDuration" mode="decimal" :maxFractionDigits="3"
                        showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()" :inputClass="project.internalVirtualEventsAverageDuration == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalVirtualEventsAverageDuration; $event.target.select()" 
                        @focusout="onCellEditComplete('internalVirtualEventsAverageDuration', project.internalVirtualEventsAverageDuration)"
                        id ="internalVirtualEventsAverageDuration"/>
                      </div>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel header="Events participated by the project">
                  <div class="card">
                    <h5>In presence</h5>

                    <div class="p-fluid formgrid grid">
                      <div class="field col-12 md:col-4">
                        <label for="participatedOnSiteEventsNumber">Number of in presence events participated by the project</label>
                        <InputNumber v-model="project.participatedOnSiteEventsNumber" mode="decimal" :inputClass="project.participatedOnSiteEventsNumber == 0 ? 'defaultValue' : ''"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.participatedOnSiteEventsNumber; $event.target.select()" 
                        @focusout="onCellEditComplete('participatedOnSiteEventsNumber', project.participatedOnSiteEventsNumber)"
                        id ="participatedOnSiteEventsNumber"/>
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="participatedOnSiteEventsAverageParticipants">Average number of participants of the project</label>
                        <InputNumber v-model="project.participatedOnSiteEventsAverageParticipants" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()" :inputClass="project.participatedOnSiteEventsAverageParticipants == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.participatedOnSiteEventsAverageParticipants; $event.target.select()" 
                        @focusout="onCellEditComplete('participatedOnSiteEventsAverageParticipants', project.participatedOnSiteEventsAverageParticipants)"
                        id ="participatedOnSiteEventsAverageParticipants"/>
                      </div>
                      <div class="field col-12 md:col-4">
                        <label for="participatedOnSiteEventsAverageDuration">Average duration (days)</label>
                        <InputNumber v-model="project.participatedOnSiteEventsAverageDuration" mode="decimal" :maxFractionDigits="3"
                        showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()" :inputClass="project.participatedOnSiteEventsAverageDuration == 0 ? 'defaultValue' : ''"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="onFocusValue=project.participatedOnSiteEventsAverageDuration; $event.target.select()" 
                        @focusout="onCellEditComplete('participatedOnSiteEventsAverageDuration', project.participatedOnSiteEventsAverageDuration)"
                        id ="participatedOnSiteEventsAverageDuration"/>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </TabView>
              <div style="text-align: left; margin-top: 10px">
                * The values of this section refer to the whole project partnership
              </div>

              <div style="text-align: left; margin-top: 10px">
                ** Participants travelling to the hosting city (national/international travel) only for the participation to the event
              </div>
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

                <Column field="deliverableType" header="Deliverable type" :sortable="true">
                  <template #body="slotProps">
                    <td :class="slotProps.data[slotProps.field] == 'Select a deliverable type' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                  </template>
                  <template #editor="slotProps">
                    <Dropdown :options="deliverableOptions" v-model="slotProps.data[slotProps.field]" optionLabel="value" optionValue="value"
                              placeholder="Select a deliverable type" @focusout="savePrintableDeliverables">
                      <template #value="slotProps">
                        <div v-if="slotProps.value">
                          <span>{{slotProps.value}}</span>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                      </template>
                      <template #option="slotProps">
                          <span>{{slotProps.option.value}} ({{slotProps.option.avgPagesPerCopy}} pages, {{slotProps.option.size}})</span>
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
                            :allowEmpty="false" :min="0" @focus="$event.target.select()" :class="slotProps.data[slotProps.field] == 1 ? 'defaultValue' : ''"
                            @focusout="savePrintableDeliverables" />
                  </template>
                </Column>

                
                <Column field="actions" header="Actions">
                  <template #body="slotProps">
                    <i class="pi pi-trash" @click="deletePrintableDeliverable(project.printableDeliverables.indexOf(slotProps.data))" v-tooltip.top="'Delete printable deliverable'" />
                  </template>
                </Column>

              </DataTable>
              <div style="text-align: left; margin-top: 10px">
                * Report type includes the following deliverables: Report/Plan/Analysis/Study/Methodology/Manual/Guidance/Roadmap/Strategy/Proceedings
              </div>
            </div>
          </div>

          <div class="card col-12" style="display:flex; justify-content:space-around">
            <Button label="Save project" @click="saveCurrentProject" />
            <Button  label="Export design phase data to monitoring phase" @click="displayUpdateScenarioValuesDialog" />    
          </div>
          
          <div class="col-12">
            <div class="card p-fluid" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
              <div>
                <h2 class="mb-2">CO₂ equivalent emitted:
                  <Badge :value="project.initialCF  + ' t CO₂e'" class="ml-2 currentCF" size="xlarge" :severity="getTextColorFromCFIndex(project.initialCF)" />
                </h2>
              </div>
              <div>
                <h2 class="mt-2">Price of the ton of CO₂ equivalent:
                  <Badge :value="co2PermitsPrice + ' €'" class="ml-2 currentCF" size="xlarge" />
                </h2>
              </div>
              <div>
                <h2 class="mt-2">CO₂ permits cost:
                  <Badge :value="round(project.initialCF * co2PermitsPrice) + ' €'" class="ml-2 currentCF" size="xlarge" />
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

          <div class="col-12">
            <div class="card p-fluid" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
              <h2>Carbon Footprint breakdown (Tons)</h2>
              <div class="col-12" style="display: flex; justify-content: space-evenly;">
                <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                  <h2 class="font-medium text-3xl">Fuels (Heating)</h2>
                  <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                    <Badge :value="project.fuelsHeatSimpleCF" size="xlarge" class="currentCF" />
                  </div>
                </div>
                <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                  <h2 class="font-medium text-3xl">Electricity</h2>
                  <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                    <Badge :value="project.electricitySimpleCF" size="xlarge" class="currentCF" />
                  </div>
                </div>
                <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                  <h2 class="font-medium text-3xl">Water</h2>
                  <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                    <Badge :value="project.waterSimpleCF" size="xlarge" class="currentCF" />
                  </div>
                </div>
                <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                  <h2 class="font-medium text-3xl">Transportation</h2>
                  <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                    <Badge :value="project.transportationSimpleCF" size="xlarge" class="currentCF" />
                  </div>
                </div>
              </div>
              <div class="col-12" style="display: flex; justify-content: space-evenly;">
                <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                  <h2 class="font-medium text-3xl">Materials</h2>
                  <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                    <Badge :value="project.materialsSimpleCF" size="xlarge" class="currentCF" />
                  </div>
                </div>
                <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                  <h2 class="font-medium text-3xl">Printable<br>Deliverables</h2>
                  <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                    <Badge :value="project.printableDeliverablesSimpleCF" size="xlarge" class="currentCF" />
                  </div>
                </div>
                <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                  <h2 class="font-medium text-3xl">Equipment</h2>
                  <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                    <Badge :value="project.equipmentSimpleCF" size="xlarge" class="currentCF" />
                  </div>
                </div>
                <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                  <h2 class="font-medium text-3xl">Events</h2>
                  <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                    <Badge :value="project.eventsSimpleCF" size="xlarge" class="currentCF" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Dialog header="Warning" v-model:visible="displayUpdateScenarioValues" class="col-4" :modal="true">
              <div class="flex align-items-center  pb-5">
                  <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                  <div>
                    <p>The design phase data will be exported to the monitoring phase for this project, do you want to proceed?</p>
                  </div>
              </div>
              <template #footer>
                  <Button label="Cancel" @click="declineUpdateScenarioValuesDialog" class="p-button-text p-button-info" />
                  <Button label="Ok" @click="confirmUpdateScenarioValuesDialog" class="p-button-text p-button-info" /> 
              </template>
          </Dialog>

        </TabPanel>

        <TabPanel header="Additional data">

          <TabView>
              <!-- Pestaña de Transportation -->
              <TabPanel header="Transportation for work commuting">

                <div class="card">

                  <div class="p-fluid formgrid grid">

                    <div class="field col-12" v-if="project.dataTables">
                      
                      <div class="mb-5 col-12" v-if="project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform]" >
                        <h3>Percentage distribution of travels by main travel mode (%)</h3>
                        <div class="flex align-items-baseline">
                          <label class="mr-2">Transportation data for the country:</label>
                          <Dropdown class="mb-2" :options="countriesForDropdownWithoutEurope" v-model="selectedCountryForTransportationData"/>
                        </div>

                        <div class="flex justify-content-around">
                          <div class="col-5">
                            <label for="carTransportationData">Car</label>
                            <InputNumber id="carTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance[countryTransform].car" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
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

                      <div>
                            <Button label="Reset values" @click="resetTableValuesToDefault('transportation')" class="p-button-info" />
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

                        <div>
                            <Button label="Reset values" @click="resetTableValuesToDefault('material')" class="p-button-info" />
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
                      
                      <div class="mb-5 col-12" v-if="project.dataTables.transportationData.percentageDistributionTravelDistance['europe']" >
                        <h3>Percentage distribution of travels by main travel mode (%) for moving from/to the hosting place</h3>

                        <div class="flex justify-content-around mt-5">
                          <div class="col-5">
                            <label for="carTransportationData">Car</label>
                            <InputNumber id="carTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].car" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].car; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].car, 'europe', 'car')"/>

                            <label for="motorbikesTransportationData">Motorbikes</label>
                            <InputNumber id="motorbikesTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].motorbikes" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].motorbikes; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].motorbikes, 'europe', 'motorbikes')"/>

                            <label for="busTransportationData">Bus</label>
                            <InputNumber id="busTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].bus" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].bus; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].bus, 'europe','bus')"/>

                            <label for="taxiTransportationData">Taxi</label>
                            <InputNumber id="taxiTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].taxi" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].taxi; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].taxi, 'europe','taxi')"/>

                             <label for="internationalRailTransportationData">International Rail</label>
                            <InputNumber id="internationalRailTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].internationalRail" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].internationalRail; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].internationalRail, 'europe', 'internationalRail')"/>

                            <label for="nationalRailTransportationData">National Rail</label>
                            <InputNumber id="nationalRailTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].nationalRail" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].nationalRail; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].nationalRail, 'europe', 'nationalRail')"/>
                          </div>

                          <div class="col-5">
                            <label for="lightRailTramUndergroundTransportationData">Light Rail/Tram/Underground </label>
                            <InputNumber id="lightRailTramUndergroundTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].lightRailTramUnderground" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].lightRailTramUnderground; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].lightRailTramUnderground, 'europe','lightRailTramUnderground')"/>

                            <label for="ferriesTransportationData">Ferries</label>
                            <InputNumber id="ferriesTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].ferries" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].ferries; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].ferries, 'europe','ferries')"/>

                            <label for="cyclingTransportationData">Cycling</label>
                            <InputNumber id="cyclingTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].cycling" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].cycling; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].cycling, 'europe','cycling')"/>

                            <label for="walkingTransportationData">Walking</label>
                            <InputNumber id="walkingTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].walking" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].walking; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].walking, 'europe','walking')"/>

                            <label for="otherTransportationData">Other</label>
                            <InputNumber id="otherTransportationData" v-model="project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].other" mode="decimal" :maxFractionDigits="4"
                            showButtons :step="0.0001" decrementButtonClass="p-button-info"
                            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            :allowEmpty="false" :min="0.0000" :max="1" class="mb-3"
                            @focus="onFocusValue=project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].other; $event.target.select()"
                            @keypress.enter="$event.target.blur()"
                            @focusout="onCellEditCompleteTransportationData(project.dataTables.transportationData.percentageDistributionTravelDistance['europe'].other, 'europe','other')"/>
                          </div>
                        </div>

                      </div>

                      <div>
                            <Button label="Reset values" @click="resetTableValuesToDefault('transportation')" class="p-button-info" />
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
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

import 'primeicons/primeicons.css';

export default {
  name: 'ProjectDetailsSimple',
  components: {
    Dropdown,
    Dialog,
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
    Badge,
  },
  data() {
    return {
      co2PermitsPrice: process.env.VUE_APP_CO2_PERMITS_PRICE,
      placeholder: "Select a partner",
      project: {},
      initialProject: {},
      object: {},
      projectInfo: [],
      countriesForDropdown: ["Albania", "Bosnia & Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Europe", "France", "Greece", "Italy", "Malta", "Montenegro", "North Macedonia", "Portugal", "Slovenia", "Spain"],
      countriesForDropdownWithoutEurope: ["Albania", "Bosnia & Herzegovina", "Bulgaria", "Croatia", "Cyprus", "France", "Greece", "Italy", "Malta", "Montenegro", "North Macedonia", "Portugal", "Slovenia", "Spain"],
      selectedCountryForTransportationData: "Albania",
      materialsForDropdown: ["Glass", "Food & Drink", "Aluminium Cans", "Plastics", "Paper"],
      selectedMaterialForMaterialsData: "Glass",
      eventsForDropdown: ["International", "National"],
      selectedEventForEventsData: "International",
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
      partnerFilters: null,
      printableDeliverableFilters: null,
      loading: true,
      onFocusValue: null,
      displayPartnersWithoutCountryDialog: false,
      displayPartnersWithDefaultValues: false,
      partnersWithoutCountry: [],
      partnersWithDefaultValues: [],
      displayPartnersError: false,
      isInitialProject: false,
      displayUpdateScenarioValues: false
    }
  },
  created() {
    this.getProject();
    this.initPartnerFilters();
    this.initPrintableDeliverableFilters();
  },
  mounted() {
    this.loading = false;
    if (this.$store.state.toggleValue === true)
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
    closePartnersWithoutCountryErrorDialog() {
      this.displayPartnersError = false;
      this.displayPartnersWithoutCountryDialog = false
      this.displayPartnersWithDefaultValues = false;
      this.partnersWithoutCountry = []
      this.partnersWithDefaultValues = [];
    },
    confirmUpdateScenarioValuesDialog() {
      this.displayUpdateScenarioValues = false;
      this.updateScenarioValues();
      // this.saveCurrentProject();
      // if(this.project.isInitialProject) {
      //   this.updateScenarioValues();
      // } else {
      //   this.saveCurrentProject();
      // }
    },
    declineUpdateScenarioValuesDialog() {
      this.displayUpdateScenarioValues = false;
    },
    calculateCF() {
      
      this.checkEventsNotFilled()

      for (let partner of this.project.partners) {
        if (partner.country === "Select a country") {
          this.partnersWithoutCountry.push(partner)
        }
      }

      for(let partner of this.project.partners) {
        if(partner.employeesWorkingWPP === null ||
            partner.seasonalEmployees === null ||
            partner.employeesPersonMonths === null || 
            partner.externalExperts === null ||
            partner.externalExpertsPersonMonths === null) {
              this.partnersWithDefaultValues.push(partner);
            }
      }

      if (this.partnersWithoutCountry.length > 0) {
        this.displayPartnersWithoutCountryErrorDialog();
      }

      if (this.partnersWithDefaultValues.length > 0){
        this.displayPartnersWithDefaultValuesErrorDialog();
      }
      if (this.displayPartnersWithoutCountryDialog || this.displayPartnersWithDefaultValues > 0) {
        this.displayPartnersErrorDialog();
      } else if (!this.checkHoursNotGreaterThan24() && !this.checkNonLocalPhysicalGreaterThanPhysicalParticipants()) {

        axios.put(`/projects/${this.$route.params.id}`, this.project)
        .catch((error) => {
          console.log(error);
        })

        this.savePrintableDeliverables()
        this.savePartners()

        axios.put(`/projects/calculateCF/${this.$route.params.id}`)
        .then((response) => {
          let partners = this.project.partners
          let printableDeliverables = this.project.printableDeliverables
          let coordinator = this.project.coordinator
          
          this.project = response.data;
          this.project.partners = partners
          this.project.printableDeliverables = printableDeliverables
          this.project.coordinator = coordinator

          this.$toast.add({severity:'success', summary: 'Successful', detail: 'Project CF calculated', life: 3000});
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      }
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
    initPrintableDeliverableFilters() {
      this.printableDeliverableFilters = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      }
    },
    clearPrintableDeliverableFilter() {
      this.initPrintableDeliverableFilters();
    },
    updateSelectedPartner(event) {
      this.$store.dispatch("updateSelectedPartner", event.value);
    },
    getProject(){
      this.axios.get(`/projects/${this.$route.params.id}`)
      .then((response) => {
        this.project = response.data;
        this.projectInfo = [response.data, response.data];
        this.isInitialProject = this.project.isInitialProject;

        axios.get(`/dataTables/${this.$route.params.id}`)
        .then( (responseDataTables) => {
          this.project.dataTables = responseDataTables.data;
        })
        .catch( (errorDT) => {
          console.log('error' + errorDT);
        })

        if (this.project.isInitialProject == false) {
          location.href = '/projects/' + this.project.initialProject
        } else {
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

          this.axios.get(`/printableDeliverables?projectId=${this.$route.params.id}`)
          .then((response) => {
            this.project.printableDeliverables = response.data;
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
        externalExpertsPersonMonths: "",
        employeesWorkingWPP: "",
        seasonalEmployees: "",
        externalExperts: "",
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
    savePrintableDeliverables() {
      this.axios.put('/printableDeliverables/updateAll', this.project.printableDeliverables)
      .then(() => {
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'All Printable Deliverables updated', life: 2000});
      }).catch((error) =>{
        console.log(error)
      })
    },
    savePartners() {
      this.axios.put('/partners/updateAll', this.project.partners)
      .then(() => {
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'All Partners updated', life: 2000});
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
        // this.$toast.add({severity:'success', summary: 'Successful', detail: 'Partner updated', life: 3000});
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
        // this.$toast.add({severity:'success', summary: 'Successful', detail: 'Printable deliverables updated', life: 3000});
      }).catch(error =>{
        console.log(error)
      })
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
        axios.put("/projects/" + this.project._id, this.project).then(() => {
          this.$toast.add({severity:'success', summary: 'Successful', detail: 'Project saved', life: 3000});
        }).catch(error =>{
          console.log(error)
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
        console.log("La suma es: ", sum);
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
    },
    resetTableValuesToDefault(table) {
      axios.put('/projects/resetDefaultValues/' + this.project._id,this.project.dataTables.transportationData, {params: {
        projectId: this.project._id,
        dataTableName: table
      }})
      .then( () => {
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Percentage distribution of travels values has been reset to default', life: 3000});
        axios.get(`/dataTables/${this.$route.params.id}`)
        .then( (responseDataTables) => {
          this.project.dataTables = responseDataTables.data;
        })
        .catch( (errorDT) => {
          console.log('error' + errorDT);
        })
      })
      .catch( (error) => {
        console.log("Error: ", error);
      })
    },

    },
  computed: {
    ...mapState([
      'selectedPartnerForEquipmentSimple',
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
.defaultValue {
  background-color: #d0e1fd;
}

.projectDetailsSimpleGrid {
  display: flex;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
  margin-top: -0.5rem;
  align-content: space-between;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
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