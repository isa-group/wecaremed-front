<template>
  <Toast position="bottom-right" />
  <Topbar v-model:projectInfo="project" />

  <div class="projectDetailsElectrictyGrid">

    <div class="colCustom">
      <div class="card">

        <!-- Data -->

				<TabView>
					<TabPanel header="Data">
            <div id="pdfPrintDiv" style="display: none">
              <h1 style="margin-bottom: 20px">{{project.name}} 
                    ({{(new Date(project.from).getMonth() + 1).toString().padStart(2, "0") + '/' + new Date(project.from).getFullYear()}}
                    - {{(new Date(project.to).getMonth() + 1).toString().padStart(2, "0") + '/' + new Date(project.to).getFullYear()}})
                    [{{project.currentCF}} / {{project.initialCF}}] t CO2e</h1>
                    
              <h3>Partners</h3>
                        
              <table class="table table-bordered" style="margin-bottom: 35px">
                <thead>
                  <tr>
                    <th>Coordinator</th>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Number full time employees</th>
                    <th>Number part time employees</th>
                    <th>Sum person months (full time + part time)</th>
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
                      <th>Fax machines</th>
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
                      <td>{{partner.faxMachinesBoughtDuringProject}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 style="margin-top: 20px">Events</h3>
              
              <h3 style="margin-top: 20px">Events organized by the project</h3>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Physical participants</th>
                    <th>Non-local physical participants</th>
                    <th>Virtual participants</th>
                    <th>Duration (in days)</th>
                    <th>Duration (hours/day)</th>
                    <th>Hosting country</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="event in project.events.organization" :key="event._id">
                    <td>{{event.name}}</td>
                    <td>{{event.type}}</td>
                    <td>{{event.physicalParticipants}}</td>
                    <td>{{event.nonLocalPhysicalParticipants}}</td>
                    <td>{{event.virtualParticipants}}</td>
                    <td>{{event.durationDays}}</td>
                    <td>{{event.durationHoursPerDay}}</td>
                    <td>{{event.hostingCountry}}</td>
                  </tr>
                </tbody>
              </table>

              <div>
              <h3 style="margin-top: 20px">Project participation in events</h3>
  
              <p>* Fuel type may only be chosen when "Car" is the selected Travel mode</p>
              <table class="table table-bordered" style="margin-bottom: 35px">
                <thead>
                  <tr>
                    <th rowspan="2">Name</th>
                    <th rowspan="2">Type</th>
                    <th rowspan="2">Non-local physical participants</th>
                    <th rowspan="2">Duration (in days)</th>
                    <th rowspan="2">Hosting country</th>
                    <th colspan="3">Arrive at hosting city</th>
                    <th colspan="3">Depart from hosting city</th>
                  </tr>
                  <tr>
                    <th>Distance travelled (km)</th>
                    <th>Travel mode</th>
                    <th>Fuel type*</th>
                    <th>Distance travelled (km)</th>
                    <th>Travel mode</th>
                    <th>Fuel type*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="event in project.events.participation" :key="event._id">
                    <td>{{event.name}}</td>
                    <td>{{event.type}}</td>
                    <td>{{event.nonLocalPhysicalParticipants}}</td>
                    <td>{{event.durationDays}}</td>
                    <td>{{event.hostingCountry}}</td>
                    <td>{{event.distanceTravelledArrive}}</td>
                    <td>{{event.travelModeArrive}}</td>
                    <td>{{event.fuelTypeArrive}}</td>
                    <td>{{event.distanceTravelledDepart}}</td>
                    <td>{{event.travelModeDepart}}</td>
                    <td>{{event.fuelTypeDepart}}</td>
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

              <h2 style="margin-bottom: 40px">Tons of equivalent carbon dioxide emitted: {{project.initialCF}}</h2> 
              
              <h3 style="margin-bottom: 10px">CF Breakdown (Tons):</h3>
              <ul>
                <li style="margin-bottom: 10px; font-size: 20px">Fuels heat: {{project.fuelsHeatCF}}</li>
                <li style="margin-bottom: 10px; font-size: 20px">Electricity: {{project.electricityCF}}</li>
                <li style="margin-bottom: 10px; font-size: 20px">Water: {{project.waterCF}}</li>
                <li style="margin-bottom: 10px; font-size: 20px">Transportation: {{project.transportationCF}}</li>
                <li style="margin-bottom: 10px; font-size: 20px">Materials: {{project.materialsCF}}</li>
                <li style="margin-bottom: 10px; font-size: 20px">Printable deliverables: {{project.printableDeliverablesCF}}</li>
                <li style="margin-bottom: 10px; font-size: 20px">Equipment: {{project.equipmentCF}}</li>
                <li style="font-size: 20px">Events: {{project.eventsCF}}</li>
              </ul>

            </div>

            <div class="partners card col-12">
              <h4>Partners</h4>

              <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
              :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
              filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
              :globalFilterFields="['name','country','employeesPersonMonths', 'employeesWorkingWPP', 
                                    'seasonalEmployees', 'coordinator']" @page="currentPagePartnersTable = $event.page">
                
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
                      
                      <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
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
                      <InputText v-model="slotProps.data[slotProps.field]" />
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

                <Column field="employeesWorkingWPP" header="Number full time employees" :sortable="true">
                  <template #editor="slotProps">
                    <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                    incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                  </template>
                </Column>

                <Column field="seasonalEmployees" header="Number part time employees" :sortable="true">
                  <template #editor="slotProps">
                    <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                    incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                  </template>
                </Column>


                <Column field="employeesPersonMonths" header="Sum person months (full time + part time)" :sortable="true">
                  <template #editor="slotProps" class="p-field">
                    <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                    showButtons :step="0.25" decrementButtonClass="p-button-info"
                    incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                  </template>
                </Column>

                <Column field="actions" header="Actions">
                  <template #body="slotProps">
                    <i class="pi pi-trash" @click="deletePartner(slotProps.index + currentPagePartnersTable * 5)" />
                  </template>
                </Column>
              
              </DataTable>
            </div>

            <div class="externalExperts card col-12">
              <h4>External experts</h4>

              <DataTable :value="project.externalExperts" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
              :rowHover="true" @cell-edit-complete="onCellEditCompleteExternalExpert" sortMode="multiple" :rows="5" v-model:filters="externalExpertFilters"
              filterDisplay="menu" :loading="loading" :filters="externalExpertFilters" responsiveLayout="scroll"
              :globalFilterFields="['typeOfExpertise','country','personMonthsWPP', 'twoWayTravels']" 
              @page="currentPageExternalExpertsTable = $event.page">
                
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
                      
                      <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-warning" @click="clearExternalExpertFilter()"/>
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
                      <InputText v-model="slotProps.data[slotProps.field]" />
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
                    <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                    incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                  </template>
                </Column>

                <Column field="twoWayTravels" header="Number of two-way travels" :sortable="true">
                  <template #editor="slotProps">
                    <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                    incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                  </template>
                </Column>

                <Column field="actions" header="Actions">
                  <template #body="slotProps">
                    <i class="pi pi-trash" @click="deleteExternalExpert(slotProps.index + currentPageExternalExpertsTable * 5)" />
                  </template>
                </Column>
              
              </DataTable>
            </div>

            <div class="equipment col-12">    
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
                      <div class="field col-12 md:col-3">
                        <label for="pcsBoughtDuringProject">PCs</label>
                        <InputNumber v-model="selectedPartner.pcsBoughtDuringProject" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="decimal"
                        showButtons :allowEmpty="false" :min="0" id="pcsBoughtDuringProject" :inputClass="selectedPartner.pcsBoughtDuringProject == 0 ? 'defaultValue' : ''"
                        @focus="onFocusValue=selectedPartner.pcsBoughtDuringProject; $event.target.select()" @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompletePartnerEquipment('pcsBoughtDuringProject', selectedPartner.pcsBoughtDuringProject)" />
                      </div>
                      <div class="field col-12 md:col-3">
                        <label for="pcsFlatScreenBoughtDuringProject">PCs with flat screen</label>
                        <InputNumber v-model="selectedPartner.pcsFlatScreenBoughtDuringProject" mode="decimal" decrementButtonClass="p-button-info"
                        showButtons incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" id="pcsFlatScreenBoughtDuringProject" :inputClass="selectedPartner.pcsFlatScreenBoughtDuringProject == 0 ? 'defaultValue' : ''"
                        @focus="onFocusValue=selectedPartner.pcsFlatScreenBoughtDuringProject; $event.target.select()" @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompletePartnerEquipment('pcsFlatScreenBoughtDuringProject', selectedPartner.pcsFlatScreenBoughtDuringProject)" />
                      </div>
                      <div class="field col-12 md:col-3">
                        <label for="laptopsBoughtDuringProject">Laptop computers</label>
                        <InputNumber v-model="selectedPartner.laptopsBoughtDuringProject" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" incrementButtonClass="p-button-info" :inputClass="selectedPartner.laptopsBoughtDuringProject == 0 ? 'defaultValue' : ''"
                        incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :allowEmpty="false" :min="0" id="laptopsBoughtDuringProject"
                        @focus="onFocusValue=selectedPartner.laptopsBoughtDuringProject; $event.target.select()" @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompletePartnerEquipment('laptopsBoughtDuringProject', selectedPartner.laptopsBoughtDuringProject)" />
                      </div>
                      <div class="field col-12 md:col-3">
                        <label for="flatScreensBoughtDuringProject">Flat screens</label>
                        <InputNumber v-model="selectedPartner.flatScreensBoughtDuringProject" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" incrementButtonClass="p-button-info" :inputClass="selectedPartner.pcsBoughtDuringProject == 0 ? 'defaultValue' : ''"
                        incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :allowEmpty="false" :min="0" id="flatScreensBoughtDuringProject"
                        @focus="onFocusValue=selectedPartner.flatScreensBoughtDuringProject; $event.target.select()" @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompletePartnerEquipment('flatScreensBoughtDuringProject', selectedPartner.flatScreensBoughtDuringProject)" />
                      </div>
                      <div class="field col-12 md:col-3">
                        <label for="printersBoughtDuringProject">Printers</label>
                        <InputNumber v-model="selectedPartner.printersBoughtDuringProject" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" incrementButtonClass="p-button-info" :inputClass="selectedPartner.pcsBoughtDuringProject == 0 ? 'defaultValue' : ''"
                        incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :allowEmpty="false" :min="0" id="printersBoughtDuringProject"
                        @focus="onFocusValue=selectedPartner.printersBoughtDuringProject; $event.target.select()" @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompletePartnerEquipment('printersBoughtDuringProject', selectedPartner.printersBoughtDuringProject)" />
                      </div>
                      <div class="field col-12 md:col-3">
                        <label for="copyMachinesBoughtDuringProject">Copy machines</label>
                        <InputNumber v-model="selectedPartner.copyMachinesBoughtDuringProject" mode="decimal" 
                        showButtons decrementButtonClass="p-button-info" :allowEmpty="false" :min="0" id="copyMachinesBoughtDuringProject"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :inputClass="selectedPartner.pcsBoughtDuringProject == 0 ? 'defaultValue' : ''"
                        @focus="onFocusValue=selectedPartner.copyMachinesBoughtDuringProject; $event.target.select()" @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompletePartnerEquipment('copyMachinesBoughtDuringProject', selectedPartner.copyMachinesBoughtDuringProject)" />
                      </div>
                      <div class="field col-12 md:col-3">
                        <label for="faxMachinesBoughtDuringProject">Fax machines</label>
                        <InputNumber v-model="selectedPartner.faxMachinesBoughtDuringProject" mode="decimal"
                        showButtons decrementButtonClass="p-button-info" :allowEmpty="false" :min="0" id="faxMachinesBoughtDuringProject"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :inputClass="selectedPartner.pcsBoughtDuringProject == 0 ? 'defaultValue' : ''"
                        @focus="onFocusValue=selectedPartner.faxMachinesBoughtDuringProject; $event.target.select()" @keypress.enter="$event.target.blur()"
                        @focusout="onCellEditCompletePartnerEquipment('faxMachinesBoughtDuringProject', selectedPartner.faxMachinesBoughtDuringProject)" />
                      </div>
                    </div>
                  </div>
                </template>

                <template v-else>
                  <strong>Equipment data cannot be displayed because there aren't any partners in this project</strong>
                </template>
              </div>
            </div>

            <div class="events col-12">
              <div class="card">
                <h4>Events</h4>

                <!-- <TabView> -->
                  <!-- <TabPanel header="Events organized by the project "> -->
                    <h5>Events organized by the project</h5>

                    <DataTable :value="project.events.organization" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompleteEvents" sortMode="multiple" :rows="5" v-model:filters="organizationEventsFilters"
                    filterDisplay="menu" :loading="loading" :filters="organizationEventsFilters" responsiveLayout="scroll" :globalFilterFields="['name',
                    'type','physicalParticipants', 'nonLocalPhysicalParticipants', 'virtualParticipants', 'durationDays',
                    'durationHoursPerDay', 'hostingCountry']" @page="currentPageEventsOrganizationTable = $event.page" removableSort>
                      
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
                            
                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-warning" @click="clearOrganizationEventsFilter()"/>
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
                            <InputText v-model="slotProps.data[slotProps.field]" />
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
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                        </template>
                      </Column>

                      <Column field="nonLocalPhysicalParticipants" header="Non-local physical participants" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                        </template>
                      </Column>


                      <Column field="virtualParticipants" header="Virtual participants" :sortable="true">
                        <template #editor="slotProps" class="p-field">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                        </template>
                      </Column>

                      <Column field="durationDays" header="Duration (in days)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                        </template>
                      </Column>

                      <Column field="durationHoursPerDay" header="Duration (hours/day)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" @focus="$event.target.select()" />
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
                          <i class="pi pi-trash" @click="deleteEvent(slotProps.index + currentPageEventsOrganizationTable * 5, 'organization')" />
                        </template>
                      </Column>
                    
                    </DataTable>
                  <!-- </TabPanel> -->

                  <!-- <TabPanel header="Project participation in events"> -->
                    <h5>Project participation in events</h5>

                    <DataTable :value="project.events.participation" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompleteEvents" sortMode="multiple" :rows="5" v-model:filters="participationEventsFilters"
                    filterDisplay="menu" :loading="loading" :filters="participationEventsFilters" responsiveLayout="scroll"
                    :globalFilterFields="['name','type', 'nonLocalPhysicalParticipants','durationDays', 'hostingCountry',
                    'distanceTravelledArrive', 'travelModeArrive', 'fuelTypeArrive', 'distanceTravelledDepart', 'travelModeDepart',
                    'fuelTypeDepart']" @page="currentPageEventsParticipationTable = $event.page" removableSort>
                      
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
                            
                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-warning" @click="clearParticipationEventsFilter()"/>
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
                            <Column header="Type" :sortable="true" :rowspan="2" field="type" />
                            <Column header="Non-local physical participants" :sortable="true" :rowspan="2" field="nonLocalPhysicalParticipants" />
                            <Column header="Duration (in days)" :sortable="true" :rowspan="2" field="durationDays" />
                            <Column header="Hosting country" :sortable="true" :rowspan="2" field="hostingCountry" />
                            <Column header="Arrive at hosting city" :colspan="3" />
                            <Column header="Depart from hosting city" :colspan="3" />
                            <Column header="Actions" :rowspan="2" />
                        </Row>
                        <Row>
                            <Column header="Distance travelled (km)" :sortable="true" field="distanceTravelledArrive"/>
                            <Column header="Travel mode" :sortable="true" field="travelModeArrive"/>
                            <Column header="Fuel type*" :sortable="true" field="fuelTypeArrive"/>
                            <Column header="Distance travelled (km)" :sortable="true" field="distanceTravelledDepart"/>
                            <Column header="Travel mode" :sortable="true" field="travelModeDepart"/>
                            <Column header="Fuel type*" :sortable="true" field="fuelTypeDepart"/>
                        </Row>
                    </ColumnGroup>

                    <Column field="name">
                        <template #body="slotProps">
                          <td :class="slotProps.data[slotProps.field] == 'New event' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                        </template>
                        <template #editor="slotProps">
                            <InputText v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                    <Column field="type">
                      <template #body="slotProps">
                        <td :class="slotProps.data[slotProps.field] == 'Select a type' ? 'defaultValue' : ''" style="display:block;">{{slotProps.data[slotProps.field]}}</td>
                      </template>
                      <template #editor="slotProps">
                        <Dropdown :options="eventTypesForDropdown" v-model="slotProps.data[slotProps.field]" disabled />
                      </template>
                    </Column>

                    <Column field="nonLocalPhysicalParticipants">
                      <template #editor="slotProps">
                        <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" @focus="$event.target.select()" />
                      </template>
                    </Column>

                    <Column field="durationDays">
                      <template #editor="slotProps">
                        <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
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
                        <Dropdown :options="fuelTypesForDropdown" v-model="slotProps.data[slotProps.field]" :disabled="slotProps.data['travelModeArrive'] === 'Car' ? false : true"/>
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
                        <i class="pi pi-trash" @click="deleteEvent(slotProps.index + currentPageEventsParticipationTable * 5, 'participation')" />
                      </template>
                    </Column>
                    <p>* Fuel type may only be chosen when "Car" is the selected Travel mode</p>
                    </DataTable>
                  <!-- </TabPanel> -->
                <!-- </TabView> -->
              </div>
            </div>

            <div class="printableDeliverables col-12">
              <div class="card">
                <h4>Printable deliverables</h4>
              
                <DataTable :value="project.printableDeliverables" editMode="cell" @cell-edit-complete="onCellEditCompletePrintableDeliverable" 
                  sortMode="multiple" :paginator="true" :rows="5" v-model:filters="printableDeliverableFilters" filterDisplay="menu"
                  :loading="loading" :filters="printableDeliverableFilters" responsiveLayout="scroll" :rowHover="true" class="p-datatable-gridlines"
                  :globalFilterFields="['deliverableType', 'deliverableName', 'copies', 'avgPagesPerCopy']"
                  @page="currentPagePrintableDeliverablesTable = $event.page">

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
                        
                        <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-warning" @click="clearPrintableDeliverableFilter()"/>
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
                              :allowEmpty="false" :min="0" @focus="$event.target.select()" :class="slotProps.data[slotProps.field] == 1 ? 'defaultValue' : ''" />
                    </template>
                  </Column>

                  
                  <Column field="actions" header="Actions">
                    <template #body="slotProps">
                      <i class="pi pi-trash" @click="deletePrintableDeliverable(slotProps.index + currentPagePrintableDeliverablesTable * 5)" />
                    </template>
                  </Column>

                </DataTable>
                <div style="text-align: left; margin-top: 10px">
                  * Report type includes the following deliverables: Report/Plan/Analysis/Study/Methodology/Manual/Guidance/Roadmap/Strategy/Proceedings
                </div>
              </div>
            </div>

            <div class="customs card">
              <h4>Customs</h4>
              <TabView>
                <TabPanel header="Heat">
                        <!-- Tabla Custom Heat emissions -->

                    <h5>Additional custom defined Heat emission</h5>

                    <DataTable :value="this.project.customHeat" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompleteCustom($event, 'customHeat', 'heat')" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['nameCustom','valueCustom']" @page="currentPageCustomHeatTable = $event.page">
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button class="p-button-info mr-2" @click="addCustom(this.customTypes[0].value, 'customHeat', 'Heat')"><i class="pi pi-plus mr-2" />New additional custom Heat emission</Button>
                              <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="partnerFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                              </span>
                              <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveCustom('customHeat', 'heat')" />
                            </div>
                            
                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
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
                            <InputText v-model="slotProps.data[slotProps.field]" />
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
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      
                      <Column field="actions" header="Actions">
                        <template #body="slotProps">
                          <i class="pi pi-trash" @click="deleteCustom(slotProps.index + currentPageCustomHeatTable * 5, 'customHeat', 'heat')" />
                        </template>
                      </Column>
                    
                    </DataTable>
                </TabPanel>

                <TabPanel header="Electricity">
                  <h5>Aditional custom defined electricity emission</h5>
                  <DataTable :value="this.project.customElectricity" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                  :rowHover="true" @cell-edit-complete="onCellEditCompleteCustom($event, 'customElectricity', 'electricity')" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                  filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                  :globalFilterFields="['nameCustom','valueCustom']" @page="currentPageCustomElectricityTable = $event.page">
                  
                  <template #header>
                      <div class="flex justify-content-between flex-column sm:flex-row">
                        <div>
                          <Button class="p-button-info mr-2" @click="addCustom(this.customTypes[1].value, 'customElectricity', 'electricity')"><i class="pi pi-plus mr-2" />New additional custom Electricity</Button>
                          <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="partnerFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                          </span>
                          <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveCustom('customElectricity', 'electricity')" />
                        </div>
                        
                        <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
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
                        <InputText v-model="slotProps.data[slotProps.field]" />
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
                      :allowEmpty="false" :min="0" />
                    </template>
                  </Column>

                  
                  <Column field="actions" header="Actions">
                    <template #body="slotProps">
                      <i class="pi pi-trash" @click="deleteCustom(slotProps.index + currentPageCustomElectricityTable * 5, 'customElectricity', 'electricity')" />
                    </template>
                  </Column>
                
                </DataTable>
                </TabPanel>

                <TabPanel header="Water">

                  <h5>Aditional custom defined water emission</h5>
                  <DataTable :value="this.project.customWater" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                  :rowHover="true" @cell-edit-complete="onCellEditCompleteCustom($event, 'customWater', 'water')" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                  filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                  :globalFilterFields="['nameCustom','valueCustom']" @page="currentPageCustomWaterTable = $event.page">
                  
                  <template #header>
                      <div class="flex justify-content-between flex-column sm:flex-row">
                        <div>
                          <Button class="p-button-info mr-2" @click="addCustom(this.customTypes[2].value,'customWater', 'water')"><i class="pi pi-plus mr-2" />New additional custom water emission</Button>
                          <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="partnerFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                          </span>
                          <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveCustom('customWater', 'water')" />
                        </div>
                        
                        <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
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
                        <InputText v-model="slotProps.data[slotProps.field]" />
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
                      :allowEmpty="false" :min="0" />
                    </template>
                  </Column>

                  
                  <Column field="actions" header="Actions">
                    <template #body="slotProps">
                      <i class="pi pi-trash" @click="deleteCustom(slotProps.index + currentPageCustomWaterTable * 5, 'customWater', 'water')" />
                    </template>
                  </Column>
                
                </DataTable>

                </TabPanel>

                <TabPanel header="Transportation">

                    <h5>Aditional custom defined transportation emission</h5>
                    <DataTable :value="this.project.customTransportation" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompleteCustom($event, 'customTransportation', 'transportation')" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['nameCustom','valueCustom']" @page="currentPageCustomTransportationTable = $event.page">
                    
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                          <div>
                            <Button class="p-button-info mr-2" @click="addCustom(this.customTypes[3].value, 'customTransportation', 'transportation')"><i class="pi pi-plus mr-2" />New additional custom transportation emission</Button>
                            <span class="p-input-icon-left">
                              <i class="pi pi-search" />
                              <InputText v-model="partnerFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                            </span>
                            <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveCustom('customTransportation', 'transportation')" />
                          </div>
                          
                          <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
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
                          <InputText v-model="slotProps.data[slotProps.field]" />
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
                        :allowEmpty="false" :min="0" />
                      </template>
                    </Column>

                    
                    <Column field="actions" header="Actions">
                      <template #body="slotProps">
                        <i class="pi pi-trash" @click="deleteCustom(slotProps.index + currentPageCustomTransportationTable * 5, 'customTransportation', 'transportation')" />
                      </template>
                    </Column>
                  
                  </DataTable>

                </TabPanel>

                <TabPanel header="Materials">

                    <h5>Aditional custom defined material emission</h5>
                    <DataTable :value="this.project.customMaterials" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompleteCustom($event, 'customMaterials', 'materials')" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['nameCustom','valueCustom']" @page="currentPageCustomMaterialsTable = $event.page">
                    
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                          <div>
                            <Button class="p-button-info mr-2" @click="addCustom(this.customTypes[4].value, 'customMaterials', 'materials')"><i class="pi pi-plus mr-2" />New additional custom material emission</Button>
                            <span class="p-input-icon-left">
                              <i class="pi pi-search" />
                              <InputText v-model="partnerFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                            </span>
                            <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveCustom('customMaterials', 'materials')" />
                          </div>
                          
                          <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
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
                          <InputText v-model="slotProps.data[slotProps.field]" />
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
                        :allowEmpty="false" :min="0" />
                      </template>
                    </Column>

                    
                    <Column field="actions" header="Actions">
                      <template #body="slotProps">
                        <i class="pi pi-trash" @click="deleteCustom(slotProps.index + currentPageCustomMaterialsTable * 5, 'customMaterials', 'materials')" />
                      </template>
                    </Column>
                  
                  </DataTable>

                </TabPanel>

                <TabPanel header="Events">

                  <h5>Aditional custom defined events emission</h5>
                  <DataTable :value="this.project.customEvents" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                  :rowHover="true" @cell-edit-complete="onCellEditCompleteCustom($event, 'customEvents', 'event')" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                  filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                  :globalFilterFields="['nameCustom','valueCustom']" @page="currentPageCustomEventsTable = $event.page">
                  
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                          <div>
                            <Button class="p-button-info mr-2" @click="addCustom(this.customTypes[5].value,'customEvents', 'event')"><i class="pi pi-plus mr-2" />New additional custom event emission</Button>
                            <span class="p-input-icon-left">
                              <i class="pi pi-search" />
                              <InputText v-model="partnerFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                            </span>
                            <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveCustom('customEvents', 'event')" />
                          </div>
                          
                          <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
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
                          <InputText v-model="slotProps.data[slotProps.field]" />
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
                        :allowEmpty="false" :min="0" />
                      </template>
                    </Column>

                    
                    <Column field="actions" header="Actions">
                      <template #body="slotProps">
                        <i class="pi pi-trash" @click="deleteCustom(slotProps.index + currentPageCustomEventsTable * 5, 'customEvents', 'event')" />
                      </template>
                    </Column>
                
                  </DataTable>

                </TabPanel>


                <TabPanel header="Printable Deliverables">

                    <h5>Additional custom defined printable deliverable emission</h5>

                    <DataTable :value="this.project.customPrintableDeliverables" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompleteCustom($event, 'customPrintableDeliverables', 'Printable Deliverables')" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['nameCustom','valueCustom']" @page="currentPageCustomPrintableDeliverablesTable = $event.page">
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button class="p-button-info mr-2" @click="addCustom(this.customTypes[6].value, 'customPrintableDeliverables', 'Printable Deliverables')"><i class="pi pi-plus mr-2" />New additional custom printable deliverable</Button>
                              <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="partnerFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                              </span>
                              <Button class="ml-2" label="Save" icon="pi pi-check" @click="saveCustom('customPrintableDeliverables', 'Printable Deliverables')" />
                            </div>
                            
                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
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
                            <InputText v-model="slotProps.data[slotProps.field]" />
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
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      
                      <Column field="actions" header="Actions">
                        <template #body="slotProps">
                          <i class="pi pi-trash" @click="deleteCustom(slotProps.index + currentPageCustomPrintableDeliverablesTable * 5, 'customPrintableDeliverables', 'Printable Deliverables')" />
                        </template>
                      </Column>
                    
                    </DataTable>

                </TabPanel>
              </TabView>
          </div>

            <div class="col-12">
              <div class="card p-fluid" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                <Button class="ml-2" label="Save current project" @click="saveCurrentProject" />
              </div>
            </div>

            <div class="cfResults col-12">
              <div class="card p-fluid" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                <div>
                  <h2>Tons of equivalent carbon dioxide emitted:
                    <Badge :value="project.initialCF" class="ml-3" size="xlarge" :severity="getTextColorFromCFIndex(project.initialCF)" />
                  </h2>
                </div>
                <Button icon="pi pi-replay" class="p-button-rounded p-button-outlined p-button-plain mr-5" label="Recalculate"
                        style="width: 15rem; font-size: 1.1rem" @click="calculateCF" />
                <Button icon="pi pi-file-pdf" class="p-button-rounded p-button-outlined p-button-plain mr-5 mt-3" label="Generate PDF"
                        style="width: 15rem; font-size: 1.1rem" @click="generatePDF"/>
              </div>
            </div>

                  <div class="card" style="display:flex; justify-content:space-around">
                    <template v-if="!this.project.isInitialProject">
                      <Button  label="Save current project" @click="saveCurrentProject" />
                      <Button  label="Update the initial values of the project" @click="updateInitialValues" />
                      <Button  label="Go to set initial values" class="p-button-info" @click="goToLinkedProject()"/>      
                    </template>
                    <template v-else-if="this.project.isInitialProject">
                      <Button label="Update initial values" @click="saveCurrentProject" />
                      <Button type="button" label="Go to current project" class="p-button-info" @click="goToLinkedProject()"/>
                    </template>
                  </div>
                  <div class="col-12">
                    <div class="card p-fluid" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                      <div>
                        <h2>Tons of equivalent carbon dioxide emitted:
                          <Badge :value="project.initialCF" class="ml-3" size="xlarge" :severity="getTextColorFromCFIndex(project.initialCF)" />
                        </h2>
                      </div>
                      <Button icon="pi pi-replay" class="p-button-rounded p-button-outlined p-button-plain mr-5" label="Recalculate"
                              style="width: 15rem; font-size: 1.1rem" @click="calculateCF" />
                      <Button icon="pi pi-file-pdf" class="p-button-rounded p-button-outlined p-button-plain mr-5 mt-3" label="Generate PDF"
                              style="width: 15rem; font-size: 1.1rem" @click="generatePDF"/>
                    </div>
                  </div>
                  <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                    <h2 class="font-medium text-3xl">Water</h2>
                    <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                      <Badge :value="project.waterCF" size="xlarge" severity="info" />
                    </div>
                  </div>
                  <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                    <h2 class="font-medium text-3xl">Transportation</h2>
                    <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                      <Badge :value="project.transportationCF" size="xlarge" severity="info" />
                    </div>
                  </div>
                </div>
                <div class="col-12" style="display: flex; justify-content: space-evenly;">
                  <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                    <h2 class="font-medium text-3xl">Materials</h2>
                    <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                      <Badge :value="project.materialsCF" size="xlarge" severity="info" />
                    </div>
                  </div>
                  <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                    <h2 class="font-medium text-3xl">Printable<br>Deliverables</h2>
                    <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                      <Badge :value="project.printableDeliverablesCF" size="xlarge" severity="info" />
                    </div>
                  </div>
                  <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                    <h2 class="font-medium text-3xl">Equipment</h2>
                    <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                      <Badge :value="project.equipmentCF" size="xlarge" severity="info" />
                    </div>
                  </div>
                  <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                    <h2 class="font-medium text-3xl">Events</h2>
                    <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                      <Badge :value="project.eventsCF" size="xlarge" severity="info" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel v-if="!this.project.isInitialProject" header="Analysis">
												<TabView>
              <TabPanel header="General">

              </TabPanel>
              <TabPanel header="Heat">

              </TabPanel>
              <TabPanel header="Electricity">
                <div class="card">
                  <Chart type="radar" :data="chartData" :options="chartOptions" style='width:50'/>
                </div>
                <div class="card">
                  <h5>Aditional custom defined electricity emission</h5>
                  <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['name','country','personMonthsPP','personMonthsWPP', 'employeesWorkingWPP', 
                                          'seasonalEmployees', 'coordinator']">
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button class="p-button-info mr-2" @click="addPartner"><i class="pi pi-plus mr-2" />Add Electricity Emission</Button>
                            </div>
                            <div>
                              <Button type="button" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
                            </div>
                          </div>
                      </template>

                      <template #empty>
                          No Electricity Emissions found.
                      </template>

                      <template #loading>
                          Loading Electricity Emissions. Please wait.
                      </template>

                      <Column field="item" header="Item" :sortable="true">
                        <template #editor="slotProps">
                             <InputText v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="dailyConsumptionPerEmployee" header="Estimated emission (CO2 gr)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>
                    </DataTable>
                </div>
              </TabPanel>
              <TabPanel header="Water">

              </TabPanel>
              <TabPanel header="Transportation">

              </TabPanel>
              <TabPanel header="Materials">

              </TabPanel>
              <TabPanel header="Events">

              </TabPanel>
              
              <TabPanel header="Printable deliverables">

              </TabPanel>
            </TabView>
          </TabPanel>
				</TabView>
      </div>
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
import Chart from 'primevue/chart'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'
import 'primeicons/primeicons.css';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

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
    Row
  },
  data() {
    return {
      placeholder: "Select a partner",
      project: {},
      customHeat: [],
      customElectricity: [],
      customWater: [],
      customTransportation: [],
      customMaterials: [],
      customEvents: [],
      customPrintableDeliverables: [],
      electricityValuesTable:[],
      object: {},
      countriesForDropdown: ["Albania", "Bosnia & Herzegovina", "Croatia", "Cyprus", "France", "Greece", "Italy", "Malta", "Montenegro", "Portugal", "Slovenia", "Spain", "Bulgaria", "North Macedonia"],
      eventTypesForDropdown: ["In presence", "Mixed", "On-line"],
      travelModesForDropdown: ["Car", "Motorbikes", "Bus", "Taxi", "Rail", "Light rail and tram/Underground", "Ferries"],
      fuelTypesForDropdown: ["Diesel", "Petrol", "Hybrid", "Battery electric vehicle", "Plug-in hybrid electric vehicle", "CNG", "LPG", "Other"],
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
        {value: "Printable Deliverables"}
      ],
      chartData: {
				labels: ['Electricity', 'Water', 'Printable deliverables', 'Events', 'Materials', 'Transportation', 'Heat'],
				datasets: [
					{
						label: 'My First dataset',
						backgroundColor: 'rgba(179,181,198,0.2)',
						borderColor: 'rgba(179,181,198,1)',
						pointBackgroundColor: 'rgba(179,181,198,1)',
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: 'rgba(179,181,198,1)',
						data: [65, 59, 90, 81, 56, 55, 40]
					},
					{
						label: 'My Second dataset',
						backgroundColor: 'rgba(255,99,132,0.2)',
						borderColor: 'rgba(255,99,132,1)',
						pointBackgroundColor: 'rgba(255,99,132,1)',
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: 'rgba(255,99,132,1)',
						data: [28, 48, 40, 19, 96, 27, 100]
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
      loading: true,
      onFocusValue: null,
      currentPagePartnersTable: 0,
      currentPageExternalExpertsTable: 0,
      currentPageEventsOrganizationTable: 0,
      currentPageEventsParticipationTable: 0,
      currentPagePrintableDeliverablesTable: 0,
      currentPageCustomPrintableDeliverablesTable: 0,
      currentPageCustomHeatTable: 0,
      currentPageCustomElectricityTable: 0,
      currentPageCustomWaterTable: 0,
      currentPageCustomTransportationTable: 0,
      currentPageCustomMaterialsTable: 0,
      currentPageCustomEventsTable: 0,
      displayPartnersWithoutCountryDialog: false,
      displayPartnersWithDefaultValues: false,
      partnersWithoutCountry: [],
      partnersWithDefaultValues: [],
      displayPartnersError: false
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
  },
  mounted() {
    this.loading = false;
    if (this.$store.state.toggleValue === false)
      this.$store.dispatch("toggleView")
  },
  methods: {
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
    closePartnersWithoutCountryErrorDialog() {
      this.displayPartnersError = false;
      this.displayPartnersWithoutCountryDialog = false
      this.displayPartnersWithDefaultValues = false;
      this.partnersWithoutCountry = []
      this.partnersWithDefaultValues = [];
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
      if (this.displayPartnersWithoutCountryDialog || this.displayPartnersWithDefaultValues > 0) {
        this.displayPartnersErrorDialog();
      } else if (!this.checkHoursNotGreaterThan24() && !this.checkNonLocalPhysicalGreaterThanPhysicalParticipants()) {
        axios.put(`/projects/${this.$route.params.id}`, this.project)
        .catch((error) => {
          console.log(error);
        })
        
        this.savePrintableDeliverables()
        this.savePartners()
        this.saveEvents()
        this.saveCustom()
        this.saveExternalExperts()

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
        this.saveCustom()
        this.saveExternalExperts()
        
        axios.put("/projects/" + this.project._id, this.project).then(() => {
          this.$toast.add({severity:'success', summary: 'Successful', detail: 'Project saved', life: 3000});
        }).catch(error =>{
          console.log(error)
       })
    },
    getTextColorFromCFIndex(cfIndex) {
        if (cfIndex < 150)
            return "success"
        else if (cfIndex > 150 & cfIndex < 250)
            return "warning"
        else
            return "danger"
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
    updateSelectedPartner(event) {
      this.$store.dispatch("updateSelectedPartner", event.value);
    },
    getProject(){
      this.axios.get(`/projects/${this.$route.params.id}`)
      .then((response) => {
        this.project = response.data;

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
            }
            this.project.customHeat = this.customHeat;
            this.project.customElectricity = this.customElectricity;
            this.project.customWater = this.customWater;
            this.project.customTransportation = this.customTransportation;
            this.project.customMaterials = this.customMaterials;
            this.project.customEvents = this.customEvents;
            this.project.customPrintableDeliverables = this.customPrintableDeliverables;
          }
        })
        .catch((e)=>{
          console.log('error' + e);
        })     
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
        faxMachinesBoughtDuringProject: 0,

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
      this.axios.put('/events/updateAll', this.project.events)
      .then(() => {
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'All Events updated', life: 3000});
      }).catch((error) =>{
        console.log(error)
      })
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
    
    saveCustom(custom, toastMessage) {
      this.axios.put('/customs/updateAll', this.project[custom])
      .then(() => {
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'All customs '+ toastMessage + ' updated', life: 3000});
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
    updateInitialValues(){
      if(this.project.isInitialProject){
        this.saveCurrentProject();
      } else {
        axios.delete('/projects/' + this.project.initialProject)
        .then(() => {
          let newInitialProject = Object.assign({}, this.project);
          newInitialProject.name += "_initial"; 
          newInitialProject.isInitialProject = new Boolean(true);
          newInitialProject._id = this.project.initialProject;
          newInitialProject.initialProject = this.project._id;

          for(let partner of newInitialProject.partners){
            partner.project = this.project.initialProject;
          }

          for(let pd of newInitialProject.printableDeliverables) {
            pd.project = this.project.initialProject;
          }

          axios.post('/projects', newInitialProject,{
          auth: {
              username: this.$store.state.username,
              password: this.$store.state.password
            }
          })
          .then( () => {
            for (let pd of newInitialProject.printableDeliverables){
              pd._id = new Mongoose.Types.ObjectId();
              this.axios.post('/printableDeliverables', pd)
              .catch((e)=>{
                console.log('error' + e);
              })
            }

            for(let partner of newInitialProject.partners) {
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
          axios.get('/customs?projectId=' + this.project._id, { params: {
              projectId: this.project._id
            }
          })
          .then( (response) => {
            this.project.customs = response.data;
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

        })
        .catch((e)=>{
          console.log('error' + e);
        })
      }
    },
        goToLinkedProject() {
      location.href = '/projects/' + this.project.initialProject;
    }
  },
  computed: {
    ...mapState([
      'selectedPartnerForEquipmentSimple'
    ]),
    selectedPartner() {
      if (!this.project.partners) return {}

      return this.project.partners.find(p => { 
        return p.name === this.selectedPartnerForEquipmentSimple
      })
    } 
  }
}
</script>

<style>

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

</style>