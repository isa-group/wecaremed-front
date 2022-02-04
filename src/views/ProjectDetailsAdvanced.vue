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
                  :globalFilterFields="['name','country','personMonthsPP', 'coordinator']">
                    
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

                    <Column field="personMonthsPP" header="PersonMonths" :sortable="true">
                      <template #editor="slotProps" class="p-field">
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
                        <i class="pi pi-trash" @click="deletePartner(slotProps.index)" />
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
                  <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['itemCustomTransportationEmission']">
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button class="p-button-info mr-2" @click="addPartner"><i class="pi pi-plus mr-2" />Add Heat Emission</Button>
                            </div>
                            <div>
                              <Button type="button" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
                            </div>
                          </div>
                      </template>

                      <template #empty>
                          No Transportation Emissions found.
                      </template>

                      <template #loading>
                          Loading Transportation Emissions. Please wait.
                      </template>

                      <Column field="itemCustomTransportationEmission" header="Item" :sortable="true">
                        <template #editor="slotProps">
                             <InputText v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="customTransportationEmissionCO2" header="Estimated emission (CO2 gr)" :sortable="true">
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

              <!-- Electricity -->

              <TabPanel header="Electricity">

                <!-- Electricity table -->

                <div class="card">
                  <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['name','country','personMonthsPP','personMonthsWPP', 'externalExpertsPersonMonths', 'employeesWorkingWPP', 
                                          'seasonalEmployees', 'externalExperts', 'coordinator']">
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button type="button" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
                            </div>
                          </div>
                      </template>

                      <template #empty>
                          No Electricity found.
                      </template>

                      <template #loading>
                          Loading electricity entries. Please wait.
                      </template>

                      <Column field="countries" header="Countries" :sortable="true">
                        <template #editor="slotProps">
                            <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="dailyConsumptionPerEmployee" header="Daily consumption per employee (kWh)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="dailyConsumptionPerEmployee" header="Daily consumption per employee (kWh)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>
                    </DataTable>
                </div>

                <!-- Custom Electricity emission table -->

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

                      <Column field="itemCustomElectricityEmission" header="Item" :sortable="true">
                        <template #editor="slotProps">
                             <InputText v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="customElectricutyEmissionCO2" header="Estimated emission (CO2 gr)" :sortable="true">
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
                <div class="card">
                  <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['country']">
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button type="button" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
                            </div>
                          </div>
                      </template>

                      <template #empty>
                          No partners found.
                      </template>

                      <template #loading>
                          Loading partners. Please wait.
                      </template>

                      <Column field="countries" header="Countries" :sortable="true">
                        <template #editor="slotProps">
                            <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="waterUsagePerEmployeeAnnually" header="Water usage per employee annually (m3)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="waterDisposedPerEmployeeAnnually" header="Water disposed per employee annually (m3)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>
                    </DataTable>
                </div>
                <div class="card">
                  <h5>Aditional custom defined water emission</h5>
                  <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['name','country','personMonthsPP','personMonthsWPP', 'externalExpertsPersonMonths', 'employeesWorkingWPP', 
                                          'seasonalEmployees', 'externalExperts', 'coordinator']">
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button class="p-button-info mr-2" @click="addPartner"><i class="pi pi-plus mr-2" />Add Water Emission</Button>
                            </div>
                            <div>
                              <Button type="button" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
                            </div>
                          </div>
                      </template>

                      <template #empty>
                          No Water Emissions found.
                      </template>

                      <template #loading>
                          Loading Water Emissions. Please wait.
                      </template>

                      <Column field="itemCustomWaterEmission" header="Item" :sortable="true">
                        <template #editor="slotProps">
                             <InputText v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="customWaterEmissionCO2" header="Estimated emission (CO2 gr)" :sortable="true">
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
              <TabPanel header="Transportation">
                <div class="card">
                  <h5>Partners</h5>

                  <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                  :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                  filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                  :globalFilterFields="['name']">
                    
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                          <div>
                            <Button class="p-button-info mr-2" @click="addPartner"><i class="pi pi-plus mr-2" />New partner</Button>
                            <span class="p-input-icon-left">
                              <i class="pi pi-search" />
                              <InputText v-model="partnerFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                            </span>
                          </div>
                          
                          <Button type="button" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
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
                    <Column field="numberOfTwoWayTravel" header="Number of two-way travels" :sortable="true">
                      <template #editor="slotProps" class="p-field">
                        <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                        showButtons :step="0.25" decrementButtonClass="p-button-info"
                        incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        :allowEmpty="false" :min="0" />
                      </template>
                    </Column>

                    <Column field="actions" header="Actions">
                      <template #body="slotProps">
                        <i class="pi pi-trash" @click="deletePartner(slotProps.index)" />
                      </template>
                    </Column>
                  
                  </DataTable>
                </div>

                <div class="card">
                  <h5>Distribution of travels</h5>
                  <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['country']">
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button type="button" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
                            </div>
                          </div>
                      </template>

                      <template #empty>
                          No travels found.
                      </template>

                      <template #loading>
                          Loading travels. Please wait.
                      </template>

                      <Column field="countries" header="Countries" :sortable="true">
                        <template #editor="slotProps">
                            <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="foot" header="Foot" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="bikes" header="Bikes" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="car" header="Car" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="motorbike" header="Motorbike" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="bus" header="Bus" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="taxi" header="Taxi" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="nationalRail" header="National rail" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="tram" header="Tram" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="underground" header="Underground" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                    </DataTable>
                </div>

                <div class="card">
                  <h5>Travels at sea</h5>
                  <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['country']">
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button type="button" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
                            </div>
                          </div>
                      </template>

                      <template #empty>
                          No travels found.
                      </template>

                      <template #loading>
                          Loading travels. Please wait.
                      </template>

                      <Column field="fromCountriesSea" header="From" :sortable="true">
                        <template #editor="slotProps">
                            <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="toContriesSea" header="To" :sortable="true">
                        <template #editor="slotProps">
                            <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="distanceTravelsAtSea" header="Distance (Km)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>
                      
                    </DataTable>
                </div>

                <div class="card">
                  <h5>Distribution of cars fleet</h5>
                  <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['country']">
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button type="button" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
                            </div>
                          </div>
                      </template>

                      <template #empty>
                          No travels found.
                      </template>

                      <template #loading>
                          Loading travels. Please wait.
                      </template>

                      <Column field="countries" header="Country" :sortable="true">
                        <template #editor="slotProps">
                            <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="petrol" header="Petrol" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="diesel" header="Diesel" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="hybrid" header="Hybrid" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="plugInHybrid" header="Plug-In Hybrid" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="electric" header="Electric" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="cng" header="CNG" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="lpg" header="LPG" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="alternativeFuel" header="Alternative fuel" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="unknown" header="Unknown" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                    </DataTable>
                </div>

                <div class="card">
                  <h5>Travels in land</h5>
                  <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['country']">
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button type="button" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
                            </div>
                          </div>
                      </template>

                      <template #empty>
                          No travels found.
                      </template>

                      <template #loading>
                          Loading travels. Please wait.
                      </template>

                      <Column field="fromCountriesLand" header="From" :sortable="true">
                        <template #editor="slotProps">
                            <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="toContrieLand" header="To" :sortable="true">
                        <template #editor="slotProps">
                            <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="distanceTravelsInLand" header="Distance (Km)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>
                      
                    </DataTable>
                </div>

                <div class="card">
                  <h5>Aditional custom defined transportation emission</h5>
                  <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['name','country','personMonthsPP','personMonthsWPP', 'externalExpertsPersonMonths', 'employeesWorkingWPP', 
                                          'seasonalEmployees', 'externalExperts', 'coordinator']">
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button class="p-button-info mr-2" @click="addPartner"><i class="pi pi-plus mr-2" />Add Transportation Emission</Button>
                            </div>
                            <div>
                              <Button type="button" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
                            </div>
                          </div>
                      </template>

                      <template #empty>
                          No Transportation Emissions found.
                      </template>

                      <template #loading>
                          Loading Transportation Emissions. Please wait.
                      </template>

                      <Column field="itemCustomTransportationEmission" header="Item" :sortable="true">
                        <template #editor="slotProps">
                             <InputText v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="customTransportationEmissionCO2" header="Estimated emission (CO2 gr)" :sortable="true">
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
              <TabPanel header="Materials">

                <div class="card">
                  <h5>Distribution of materials usage</h5>
                  <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['country']">
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button type="button" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
                            </div>
                          </div>
                      </template>

                      <template #empty>
                          No travels found.
                      </template>

                      <template #loading>
                          Loading travels. Please wait.
                      </template>

                      <Column field="countries" header="Country" :sortable="true">
                        <template #editor="slotProps">
                            <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="primaryMaterial" header="Primary" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="recycledMaterial" header="Recycled" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                    </DataTable>
                </div>

                <div class="card">
                  <h5>Distribution of type of disposal</h5>
                  <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['country']">
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button type="button" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
                            </div>
                          </div>
                      </template>

                      <template #empty>
                          No Distribution of type of disposal found.
                      </template>

                      <template #loading>
                          Loading distribution of type disposals. Please wait.
                      </template>

                      <Column field="countries" header="Country" :sortable="true">
                        <template #editor="slotProps">
                            <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="reUseMaterials" header="Re-Use" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="openClosedLoopMaterials" header="Open/Closed loop" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="combustionMaterials" header="Combustion" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="compostingMaterials" header="Composting" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="landFillMaterials" header="Landfill" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="anaerobicDigestionMaterials" header="Anaerobic digestion" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                    </DataTable>
                </div>

                <div class="card">
                
                  <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['country']">
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button type="button" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
                            </div>
                          </div>
                      </template>

                      <template #empty>
                          No materials found.
                      </template>

                      <template #loading>
                          Loading materials. Please wait.
                      </template>

                      <Column field="countries" header="Country" :sortable="true">
                        <template #editor="slotProps">
                            <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="paperUseAnnuallyMaterials" header="Paper use annually (T)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="plasticsUseAnnuallyMaterials" header="Plastics use annually (T)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="foodUseAnnuallyMaterials" header="Foot use annually (T)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="drinkUseAnnuallyMaterials" header="Drink use annually (T)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="glassUseAnnuallyMaterials" header="Glass use annually (T)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="aluminumUseAnnuallyMaterials" header="Aluminum use annually (T)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                    </DataTable>
                </div>

                <div class="card">
                
                  <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['country']">
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button type="button" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
                            </div>
                          </div>
                      </template>

                      <template #empty>
                          No materials found.
                      </template>

                      <template #loading>
                          Loading materials. Please wait.
                      </template>

                      <Column field="countries" header="Country" :sortable="true">
                        <template #editor="slotProps">
                            <Dropdown :options="countriesForDropdown" v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="paperWasteAnnuallyMaterials" header="Paper waste annually (T)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="plasticsWasteAnnuallyMaterials" header="Plastics waste annually (T)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="foodWasteAnnuallyMaterials" header="Foot waste annually (T)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="drinkWasteAnnuallyMaterials" header="Drink waste annually (T)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="glassWasteAnnuallyMaterials" header="Glass waste annually (T)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <Column field="aluminumWasteAnnuallyMaterials" header="Aluminum waste annually (T)" :sortable="true">
                        <template #editor="slotProps">
                          <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
                          showButtons :step="0.25" decrementButtonClass="p-button-info"
                          incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                          :allowEmpty="false" :min="0" />
                        </template>
                      </Column>

                      <p>(Each value is calculated per employee in working places)</p>

                    </DataTable>
                </div>

                <div class="card">
                  <h5>Aditional custom defined material emission</h5>
                  <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
                    :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="5" v-model:filters="partnerFilters"
                    filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
                    :globalFilterFields="['name','country','personMonthsPP','personMonthsWPP', 'externalExpertsPersonMonths', 'employeesWorkingWPP', 
                                          'seasonalEmployees', 'externalExperts', 'coordinator']">
                      
                      <template #header>
                          <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                              <Button class="p-button-info mr-2" @click="addPartner"><i class="pi pi-plus mr-2" />Add Transportation Emission</Button>
                            </div>
                            <div>
                              <Button type="button" label="Clear" class="p-button-warning" @click="clearPartnerFilter()"/>
                            </div>
                          </div>
                      </template>

                      <template #empty>
                          No Transportation Emissions found.
                      </template>

                      <template #loading>
                          Loading Transportation Emissions. Please wait.
                      </template>

                      <Column field="itemCustomMaterialEmission" header="Item" :sortable="true">
                        <template #editor="slotProps">
                             <InputText v-model="slotProps.data[slotProps.field]" />
                        </template>
                      </Column>

                      <Column field="customMaterialEmissionCO2" header="Estimated emission (CO2 gr)" :sortable="true">
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
              <TabPanel header="Events">

              </TabPanel>
              <TabPanel header="Printable deliverables">

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
//import Toast from 'primevue/toast';
//import Badge from 'primevue/badge';
import Chart from 'primevue/chart'

import 'primeicons/primeicons.css';

export default {
  name: 'ProjectDetailsSimple',
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
    //Toast,
    //Badge,
    Chart
  },
  data() {
    return {
      placeholder: "Select a partner",
      arrayOfObjects: ["MEDIPLASMA SRL", "Q TECHNOLOGIES LTD", "CO2CRC Management Pty Ltd"],
      project: {},
      object: {},
      countriesForDropdown: ["Albania", "Bosnia & Herzegovina", "Croatia", "Cyprus", "France", "Greece", "Italy", "Malta", "Montenegro", "Portugal", "Slovenia", "Spain", "Bulgaria", "North Macedonia"],
      paperSizes: ["A0", "A1", "A2", "A3", "A4", "A5", "A6"],
      fuelTypesForDropdown: ["Biomass", "Coal", "District Heat", "Gas oil", "Natural Gas"],
      deliverableOptions: [
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
        {value: "Training material", deliverableNames: ["E-learning platform", "Training course material"]},
        
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
      onFocusValue: null
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
    calculateCF() {
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

        // console.log(response.data)
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    getTextColorFromCFIndex(cfIndex) {
        if (cfIndex < 3)
            return "success"
        else if (cfIndex > 3 & cfIndex < 5)
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
      })
      .catch((e)=>{
        console.log('error' + e);
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

      this.axios.get(`/printableDeliverables?projectId=${this.$route.params.id}`)
      .then((response) => {
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
        size: "Select a paper size",
        project: this.project._id
      }

      this.axios.post('/printableDeliverables', newPrintableDeliverable)
      .then((response) => {
        this.project.printableDeliverables.unshift(response.data)
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
        this.project.partners.unshift(response.data)

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
          this.axios.get(`/partners?projectId=${this.$route.params.id}`)
          .then((response) => {

            this.project.partners = response.data;
            
            if (this.project.partners.filter(p => p.coordinator === true).length === 0)
              this.onCellEditCompletePartnerCoordinator(this.project.partners[0])
            
            if (this.selectedPartnerForEquipmentSimple === partner.name)
              this.$store.dispatch("updateSelectedPartner", this.project.partners.filter(p => p._id !== partner._id)[0].name)
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

      console.log("newValue", newValue)
      console.log("this.onFocusValue", newValue)

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
      console.log("field", field)
      console.log("newValue", newValue)
      console.log("this.onFocusValue", this.onFocusValue)
      
      if (newValue === this.onFocusValue) return;

      let partnerId = this.selectedPartner._id
      const paramsData = {}
      paramsData[field] = newValue;
      
      console.log("paramsData", paramsData)

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
      }
      
      axios.put("/printableDeliverables/" + data._id, paramsData).then(() => {
        this.project.printableDeliverables.splice(this.project.printableDeliverables.indexOf(data), 1, newData)
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Printable deliverables updated', life: 3000});
      }).catch(error =>{
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
    savePrintableDeliverables() {
      this.axios.put('/printableDeliverables/updateAll', this.project.printableDeliverables)
      .then(() => {
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'All Printable Deliverables updated', life: 3000});
      }).catch((error) =>{
        console.log(error)
      })
    },
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