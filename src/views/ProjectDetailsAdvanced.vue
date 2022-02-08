<template>
  
  <Topbar v-model:projectInfo="project" />

  <div class="projectDetailsElectrictyGrid">

    <div class="colCustom">
      <div class="card">

        <!-- Data -->

				<TabView>
					<TabPanel header="Data">
						<TabView>

              <!-- General -->

              <TabPanel header="General">
                <div class="card">

                  <!-- Tabla Parners -->

                  <h5>Partners</h5>

                <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                :globalFilterFields="['name','country','personMonthsPP','personMonthsWPP', 'externalExpertsPersonMonths', 'employeesWorkingWPP', 
                                      'seasonalEmployees', 'externalExperts', 'coordinator']" @page="currentPagePartnersTable = $event.page">
                  
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

                  <Column field="name" header="Name" :sortable="true">
                    <template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.field]" />
                    </template>
                    <template #filter="{filterModel, field}">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter" :placeholder="'Filter by ' + field"/>
                    </template>
                  </Column>

                  <Column field="country" header="Country" :sortable="true">
                    <template #editor="slotProps">
                      <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                    </template>
                  </Column>

                  <Column field="personMonthsPP" header="PersonMonths PP*" :sortable="true">
                    <template #editor="slotProps" class="p-field">
                      <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                      showButtons :step="0.25" decrementButtonClass="p-button-info"
                      incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      :allowEmpty="false" :min="0" />
                    </template>
                  </Column>

                  <Column field="personMonthsWPP" header="PersonMonths WPP*" :sortable="true">
                    <template #editor="slotProps">
                      <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                      showButtons :step="0.25" decrementButtonClass="p-button-info"
                      incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      :allowEmpty="false" :min="0" />
                    </template>
                  </Column>
                  
                  <Column field="coordinator" header="Coordinator" :sortable="true">
                    <template #body="slotProps">
                      <RadioButton name="projectCoordinator" :value="slotProps.data._id" v-model="project.coordinator"
                      @change="onCellEditCompletePartnerCoordinator(slotProps.data, $event)" />
                    </template>
                  </Column>

                  <Column field="actions" header="Actions">
                    <template #body="slotProps">
                      <i class="pi pi-trash" @click="deletePartner(slotProps.index + currentPagePartnersTable * 5)" />
                    </template>
                  </Column>
                
                </DataTable>
                </div>

              </TabPanel>

              <!-- Heat -->

              <TabPanel header="Heat">

                <!-- Heat Table -->

                <div class="card">

                  <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                  :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                  filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                  :globalFilterFields="['country']">
                    
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                          <Button type="button" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
                        </div>
                    </template>

                    <template #empty>
                        No heat items found.
                    </template>

                    <template #loading>
                        Loading items. Please wait.
                    </template>

                    <Column field="country" header="Country" :sortable="true">
                      <template #editor="slotProps">
                        <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                      </template>
                    </Column>

                    <Column field="fuelTypeHeat" header="FuelType" :sortable="true">
                      <template #editor="slotProps" class="p-field">
                        <Dropdown :options="fuelTypesForDropdown" v-model="slotProps.data[slotProps.field]" />
                      </template>
                    </Column>

                    <Column field="coordinator" header="Coordinator" :sortable="true">
                      <template #body="slotProps">
                        <RadioButton name="projectCoordinator" :value="slotProps.data._id" v-model="project.coordinator"
                        @change="onCellEditCompletePartnerCoordinator(slotProps.data, $event)" />
                      </template>
                    </Column>

                    <Column field="actions" header="Actions">
                      <template #body="slotProps">
                        <i class="pi pi-trash" @click="deletePartner(slotProps.index)" />
                      </template>
                    </Column>
                  
                  </DataTable>
                </div>

                <!-- Custom Heat Emissions -->

                <div class="card">
                  <h5>Aditional custom defined transportation emission</h5>
                  
                </div>
              </TabPanel>

              <!-- Electricity -->

              <TabPanel header="Electricity">

                <!-- Electricity table -->

                <div class="card">
                  
                </div>

                <!-- Custom Electricity emission table -->

                <div class="card">
                  <h5>Aditional custom defined electricity emission</h5>
                  
                </div>
              </TabPanel>

              <!-- Water -->

              <TabPanel header="Water">

                <!-- Water table -->

                <div class="card">
                  
                </div>

                <!-- Water custom table -->

                <div class="card">
                  <h5>Aditional custom defined water emission</h5>
                  
                </div>
              </TabPanel>

              <!-- Transportation -->

              <TabPanel header="Transportation">

                <!-- Transportation table -->
                <div class="card">
                  
                </div>

                <!-- Custom transportation table -->

                <div class="card">
                  <h5>Aditional custom defined transportation emission</h5>
                  
                </div>
              </TabPanel>

              <!-- Materials -->

              <TabPanel header="Materials">

                <!-- Materials table -->
                <div class="card">
                  <h5>Distribution of materials usage</h5>
                  
                </div>


               <!-- Custom Materials table --> 
                <div class="card">
                  <h5>Aditional custom defined material emission</h5>

                </div>

              </TabPanel>
              <TabPanel header="Events">

              </TabPanel>
              <TabPanel header="Printable deliverables">
                <div class="col-12">
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
                        <template #editor="slotProps">
                            <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal"
                                  showButtons decrementButtonClass="p-button-info"
                                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                                  :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="avgPagesPerCopy" header="Average pages per copy" :sortable="true">
                        <template #editor="slotProps">
                            <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal"
                                  showButtons decrementButtonClass="p-button-info"
                                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                                  :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="size" header="Paper size" :sortable="true">
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
                          <i class="pi pi-trash" @click="deletePrintableDeliverable(slotProps.index + currentPagePrintableDeliverablesTable * 5)" />
                        </template>
                      </Column>

                    </DataTable>
                    <div style="text-align: left; margin-top: 10px">
                      * Report type includes the following deliverables: Report/Plan/Analysis/Study/Methodology/Manual/Guidance/Roadmap/Strategy/Proceedings
                    </div>
                  </div>
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
                  </div>
                </div>

                <Dialog header="Error" v-model:visible="displayPartnersWithoutCountryDialog" class="col-4" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <div>
                        <p>You need to select a country for each partner in order to calculate the CF of the project!</p>
                        <p>Partners without country:</p>
                        <p v-for="partner in partnersWithoutCountry" :key="partner._id">{{partner.name}}</p>
                    </div>
                    </div>
                    <template #footer>
                        <Button label="Ok" @click="closePartnersWithoutCountryErrorDialog" class="p-button-text p-button-info" autofocus/>
                    </template>
                </Dialog>

                <div class="col-12">
                  <div class="card p-fluid" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                    <h2>CF Breakdown (Tons)</h2>
                    <div class="col-12" style="display: flex; justify-content: space-evenly;">
                      <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                        <h2 class="font-medium text-3xl">Fuels Heat</h2>
                        <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                          <Badge :value="project.fuelsHeatCF" size="xlarge" severity="info" />
                        </div>
                      </div>
                      <div class="card p-fluid col-2" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                        <h2 class="font-medium text-3xl">Electricity</h2>
                        <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                          <Badge :value="project.electricityCF" size="xlarge" severity="info" />
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
            </TabView>
          </TabPanel>

          <TabPanel header="Actions">
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
                    :globalFilterFields="['name','country','personMonthsPP','personMonthsWPP', 'externalExpertsPersonMonths', 'employeesWorkingWPP', 
                                          'seasonalEmployees', 'externalExperts', 'coordinator']">
                      
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

					<TabPanel header="Analisys">
						<div class="card">
              <h5>On-site</h5>

              <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-4">
                  <label for="participatedOnSiteEventsNumber">Number of on-site events participated by the project</label>
                  <InputNumber v-model="project.participatedOnSiteEventsNumber" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.participatedOnSiteEventsNumber" 
                  @focusout="onCellEditComplete('participatedOnSiteEventsNumber', project.participatedOnSiteEventsNumber)"
                  id ="participatedOnSiteEventsNumber"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="participatedOnSiteEventsAverageParticipants">Average number of participants</label>
                  <InputNumber v-model="project.participatedOnSiteEventsAverageParticipants" mode="decimal" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.participatedOnSiteEventsAverageParticipants" 
                  @focusout="onCellEditComplete('participatedOnSiteEventsAverageParticipants', project.participatedOnSiteEventsAverageParticipants)"
                  id ="participatedOnSiteEventsAverageParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="participatedOnSiteEventsAverageDuration">Average duration (days)</label>
                  <InputNumber v-model="project.participatedOnSiteEventsAverageDuration" mode="decimal" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" @focus="onFocusValue=project.participatedOnSiteEventsAverageDuration" 
                  @focusout="onCellEditComplete('participatedOnSiteEventsAverageDuration', project.participatedOnSiteEventsAverageDuration)"
                  id ="participatedOnSiteEventsAverageDuration"/>
                </div>
              </div>
            </div>
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
// import Toast from 'primevue/toast';
// import Badge from 'primevue/badge';
// import Dialog from 'primevue/dialog';
import Chart from 'primevue/chart'
import 'primeicons/primeicons.css';

export default {
  name: 'ProjectDetailsSimple',
  components: {
    Dropdown,
    // Dialog,
    Button,
    DataTable,
    Column,
    InputText,
    RadioButton,
    InputNumber,
    TabView,
    TabPanel,
    Topbar,
    // Toast,
    // Badge,
    Chart
  },
  data() {
    return {
      placeholder: "Select a partner",
      project: {},
      object: {},
      countriesForDropdown: ["Albania", "Bosnia & Herzegovina", "Croatia", "Cyprus", "France", "Greece", "Italy", "Malta", "Montenegro", "Portugal", "Slovenia", "Spain", "Bulgaria", "North Macedonia"],
      paperSizes: ["A0", "A1", "A2", "A3", "A4", "A5", "A6"],
      deliverableOptions: [
        {value: "Report type*", avgPagesPerCopy: 50, size: "A4"},
        {value: "Articles/Newsletter/Booklet", avgPagesPerCopy: 10, size: "A4"},
        {value: "Brochure/Flyer", avgPagesPerCopy: 2, size: "A4"},
        {value: "Poster", avgPagesPerCopy: 1, size: "A0"},
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
      printableDeliverableFilters: null,
      loading: true,
      onFocusValue: null,
      currentPagePartnersTable: 0,
      currentPagePrintableDeliverablesTable: 0,
      displayPartnersWithoutCountryDialog: false,
      partnersWithoutCountry: [],
    }
  },
  created() {
    this.getProject();
    this.initPartnerFilters();
    this.initPrintableDeliverableFilters();
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    displayPartnersWithoutCountryErrorDialog() {
      this.displayPartnersWithoutCountryDialog = true
    },
    closePartnersWithoutCountryErrorDialog() {
      this.displayPartnersWithoutCountryDialog = false
      this.partnersWithoutCountry = []
    },
    calculateCF() {
      
      this.checkEventsNotFilled()

      for (let partner of this.project.partners) {
        if (partner.country === "Select a country") {
          this.partnersWithoutCountry.push(partner)
        }
      }

      if (this.partnersWithoutCountry.length > 0) {
        this.displayPartnersWithoutCountryErrorDialog()
      } else {

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

        this.axios.get(`/printableDeliverables?projectId=${this.$route.params.id}`)
        .then((response) => {
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
        personMonthsPP: 1,
        personMonthsWPP: 1,
        externalExpertsPersonMonths: 1,
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