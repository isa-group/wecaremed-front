<template>
  
  <Topbar :projectInfo="project" />

  <div class="grid">
    
    <Toast position="bottom-right" />

		<div class="col-12">
      <div class="card p-fluid col-2">
        <h5>Project Duration</h5>
        <div class="formgrid grid">
          <div class="field col">
            <label for="projectInitialDuration">From</label>
            <InputNumber v-model="project.from" id="projectInitialDuration" showButtons 
            @focus="onFocusValue=project.from" @blur="onCellEditComplete('from', project.from)" :min="0" mode="decimal"
            decrementButtonClass="p-button-info" incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
          </div>
          <div class="field col">
            <label for="projectFinalDuration">To</label>
            <InputNumber v-model="project.to" id="projectFinalDuration" showButtons 
            @focus="onFocusValue=project.to" @blur="onCellEditComplete('to', project.to)" :min="0" mode="decimal"
            decrementButtonClass="p-button-info" incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
          </div>
        </div>
      </div>

      <div class="card col-10">
        <h5>Partners</h5>

        <DataTable :value="project.partners" editMode="cell" :paginator="true" class="p-datatable-gridlines" dataKey="_id"
        :rowHover="true" @cell-edit-complete="onCellEditCompletePartner" sortMode="multiple" :rows="10" v-model:filters="partnerFilters"
        filterDisplay="menu" :loading="loading" :filters="partnerFilters" responsiveLayout="scroll"
        :globalFilterFields="['name','country','personMonthsPP','personMonthsWPP','seasonalEmployees', 'externalExperts', 'coordinator']">
          
          <template #header>
              <div class="flex justify-content-between flex-column sm:flex-row">
                <div>
                  <Button class="p-button-info mr-2" @click="addPartner"><i class="pi pi-plus mr-2" />New partner</Button>
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="partnerFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                  </span>
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
              <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
              showButtons :step="0.25" decrementButtonClass="p-button-info"
              incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
              :allowEmpty="false" :min="0" />
            </template>
          </Column>

          <Column field="personMonthsWPP" header="PersonMonths WPP*" :sortable="true">
            <template #editor="slotProps">
              <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
              showButtons :step="0.25" decrementButtonClass="p-button-info"
              incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
              :allowEmpty="false" :min="0" />
            </template>
          </Column>

          <Column field="seasonalEmployees" header="Seasonal employees" :sortable="true">
            <template #editor="slotProps">
              <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
              showButtons :step="0.25" decrementButtonClass="p-button-info"
              incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
              :allowEmpty="false" :min="0" />
            </template>
          </Column>

          <Column field="externalExperts" header="External experts" :sortable="true">
            <template #editor="slotProps">
              <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
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

        <div style="text-align: left; margin-top: 10px">
            *PP: Preparation phase<br>
            *WPP: Whole project period
        </div>
      </div>
    </div>

    <div class="col-6">    
      <div class="card">
        <h4>Equipment</h4>
        <template v-if="this.project.partners">
          <div class="mb-5">
          <label for="partnerEquipmentDropdown">Showing data for partner: </label>
            <Dropdown class="ml-2" :options="project.partners" optionLabel="name" optionValue="name"
                      v-model="this.selectedPartnerForEquipmentSimple" @change="updateSelectedPartner" />
          </div> 

          <div class="card">
            <h5>Number of IT electrical equipment that will be purchased during the project</h5>

            <div class="p-fluid formgrid grid">
              <div class="field col-12 md:col-3">
                <label for="pcsBoughtDuringProject">PCs</label>
                <InputNumber v-model="selectedPartner.pcsBoughtDuringProject" decrementButtonClass="p-button-text p-button-info"
                incrementButtonClass="p-button-text p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="decimal"
                showButtons :allowEmpty="false" :min="0" id="pcsBoughtDuringProject"
                @focus="onFocusValue=selectedPartner.pcsBoughtDuringProject" 
                @blur="onCellEditCompletePartnerEquipment('pcsBoughtDuringProject', selectedPartner.pcsBoughtDuringProject)" />
              </div>
              <div class="field col-12 md:col-3">
                <label for="pcsFlatScreenBoughtDuringProject">PCs with flat screen</label>
                <InputNumber v-model="selectedPartner.pcsFlatScreenBoughtDuringProject" mode="decimal" decrementButtonClass="p-button-info"
                showButtons incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                :allowEmpty="false" :min="0" id="pcsFlatScreenBoughtDuringProject" 
                @focus="onFocusValue=selectedPartner.pcsFlatScreenBoughtDuringProject"
                @blur="onCellEditCompletePartnerEquipment('pcsFlatScreenBoughtDuringProject', selectedPartner.pcsFlatScreenBoughtDuringProject)" />
              </div>
              <div class="field col-12 md:col-3">
                <label for="laptopsBoughtDuringProject">Laptop computers</label>
                <InputNumber v-model="selectedPartner.laptopsBoughtDuringProject" mode="decimal"
                showButtons decrementButtonClass="p-button-text p-button-info" incrementButtonClass="p-button-text p-button-info"
                incrementButtonIcon="pi pi-angle-up" decrementButtonIcon="pi pi-angle-down" :allowEmpty="false" :min="0" id="laptopsBoughtDuringProject"
                @focus="onFocusValue=selectedPartner.laptopsBoughtDuringProject"
                @blur="onCellEditCompletePartnerEquipment('laptopsBoughtDuringProject', selectedPartner.laptopsBoughtDuringProject)" />
              </div>
              <div class="field col-12 md:col-3">
                <label for="flatScreensBoughtDuringProject">Flat screens</label>
                <InputNumber v-model="selectedPartner.flatScreensBoughtDuringProject" mode="decimal"
                showButtons decrementButtonClass="p-button-info" incrementButtonClass="p-button-info"
                incrementButtonIcon="pi pi-angle-up" decrementButtonIcon="pi pi-angle-down" :allowEmpty="false" :min="0" id="flatScreensBoughtDuringProject"
                @focus="onFocusValue=selectedPartner.flatScreensBoughtDuringProject" 
                @blur="onCellEditCompletePartnerEquipment('flatScreensBoughtDuringProject', selectedPartner.flatScreensBoughtDuringProject)" />
              </div>
              <div class="field col-12 md:col-3">
                <label for="cppsBoughtDuringProject">Computer Central Processes</label>
                <InputNumber v-model="selectedPartner.cppsBoughtDuringProject" mode="decimal"
                  showButtons decrementButtonClass="p-button-outlined p-button-info" :allowEmpty="false" :min="0" id="cppsBoughtDuringProject"
                  incrementButtonClass="p-button-outlined p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  @focus="onFocusValue=selectedPartner.cppsBoughtDuringProject" 
                  @blur="onCellEditCompletePartnerEquipment('cppsBoughtDuringProject', selectedPartner.cppsBoughtDuringProject)" />
              </div>
              <div class="field col-12 md:col-3">
                <label for="printersBoughtDuringProject">Printers</label>
                <InputNumber v-model="selectedPartner.printersBoughtDuringProject" mode="decimal"
                showButtons decrementButtonClass="p-button-outlined p-button-info" incrementButtonClass="p-button-outlined p-button-info"
                incrementButtonIcon="pi pi-angle-up" decrementButtonIcon="pi pi-angle-down" :allowEmpty="false" :min="0" id="printersBoughtDuringProject"
                @focus="onFocusValue=selectedPartner.printersBoughtDuringProject" 
                @blur="onCellEditCompletePartnerEquipment('printersBoughtDuringProject', selectedPartner.printersBoughtDuringProject)" />
              </div>
              <div class="field col-12 md:col-3">
                <label for="copyMachinesBoughtDuringProject">Copy machines</label>
                <InputNumber v-model="selectedPartner.copyMachinesBoughtDuringProject" mode="decimal"
                showButtons decrementButtonClass="p-button-info" :allowEmpty="false" :min="0" id="copyMachinesBoughtDuringProject"
                incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                @focus="onFocusValue=selectedPartner.copyMachinesBoughtDuringProject" 
                @blur="onCellEditCompletePartnerEquipment('copyMachinesBoughtDuringProject', selectedPartner.copyMachinesBoughtDuringProject)" />
              </div>
              <div class="field col-12 md:col-3">
                <label for="faxMachinesBoughtDuringProject">Fax machines</label>
                <InputNumber v-model="selectedPartner.faxMachinesBoughtDuringProject" mode="decimal"
                showButtons decrementButtonClass="p-button-info" :allowEmpty="false" :min="0" id="faxMachinesBoughtDuringProject"
                incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                @focus="onFocusValue=selectedPartner.faxMachinesBoughtDuringProject" 
                @blur="onCellEditCompletePartnerEquipment('faxMachinesBoughtDuringProject', selectedPartner.faxMachinesBoughtDuringProject)" />
              </div>
            </div>
          </div>

          <div class="p-fluid formgrid grid">
            <div class="card col-3 ml-2 mr-2">
              <h5>Other electrical equipment</h5>

              <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-12">
                  <label for="totalWeightOtherElectricalEquipment">Total weight (T) of other electrical equipment</label>
                  <InputNumber v-model="selectedPartner.totalWeightOtherElectricalEquipment" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditCompletePartnerEquipment('totalWeightOtherElectricalEquipment', $event)"
                  id="totalWeightOtherElectricalEquipment"/>
                </div>
              </div>
            </div>

            <div class="card col-9" style="width: 72.75%">
              <h5>Tools and machines</h5>
              
              <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-4">
                  <label for="totalWeightVehicles">Total weight of vehicles (T)</label>
                  <InputNumber v-model="selectedPartner.totalWeightVehicles" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditCompletePartnerEquipment('totalWeightVehicles', $event)"
                  id ="totalWeightVehicles"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="totalWeightMachines">Total weight of machines (T)</label>
                  <InputNumber v-model="selectedPartner.totalWeightMachines" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditCompletePartnerEquipment('totalWeightMachines', $event)"
                  id="totalWeightMachines"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="totalWeightFurniture">Total weight of furniture (T)</label>
                  <InputNumber v-model="selectedPartner.totalWeightFurniture" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditCompletePartnerEquipment('totalWeightFurniture', $event)"
                  id="totalWeightFurniture"/>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <strong>Equipment data cannot be displayed because there aren't any partners in this project</strong>
        </template>
      </div>
    </div>

    <div class="col-6">
      <div class="card">
        <h4>Events</h4>

				<TabView>
					<TabPanel header="Public events">
						<div class="card">
              <h5>On-site</h5>

              <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-6">
                  <label for="publicOnSiteEventsNumber">Number of on-site public events</label>
                  <InputNumber v-model="project.publicOnSiteEventsNumber" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('publicOnSiteEventsNumber', $event)"
                  id ="publicOnSiteEventsNumber"/>
                </div>
                <div class="field col-12 md:col-6">
                  <label for="publicOnSiteEventsAveragePhysicalParticipants">Average physical participants</label>
                  <InputNumber v-model="project.publicOnSiteEventsAveragePhysicalParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('publicOnSiteEventsAveragePhysicalParticipants', $event)"
                  id ="publicOnSiteEventsAveragePhysicalParticipants"/>
                </div>
                <div class="field col-12 md:col-6">
                  <label for="publicOnSiteEventsAverageNonLocalPhysicalParticipants">Average non-local physical participants</label>
                  <InputNumber v-model="project.publicOnSiteEventsAverageNonLocalPhysicalParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('publicOnSiteEventsAverageNonLocalPhysicalParticipants', $event)"
                  id ="publicOnSiteEventsAverageNonLocalPhysicalParticipants"/>
                </div>
                <div class="field col-12 md:col-6">
                  <label for="publicOnSiteEventsAverageDuration">Average duration (days)</label>
                  <InputNumber v-model="project.publicOnSiteEventsAverageDuration" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('publicOnSiteEventsAverageDuration', $event)"
                  id ="publicOnSiteEventsAverageDuration"/>
                </div>
              </div>
            </div>
            <div class="card">
              <h5>Hybrid</h5>

              <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-4">
                  <label for="publicHybridEventsNumber">Number of hybrid public events</label>
                  <InputNumber v-model="project.publicHybridEventsNumber" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('publicHybridEventsNumber', $event)"
                  id ="publicHybridEventsNumber"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="publicHybridEventsAveragePhysicalParticipants">Average physical participants</label>
                  <InputNumber v-model="project.publicHybridEventsAveragePhysicalParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('publicHybridEventsAveragePhysicalParticipants', $event)"
                  id ="publicHybridEventsAveragePhysicalParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="publicHybridEventsAverageNonLocalPhysicalParticipants">Average non-local physical participants</label>
                  <InputNumber v-model="project.publicHybridEventsAverageNonLocalPhysicalParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('publicHybridEventsAverageNonLocalPhysicalParticipants', $event)"
                  id ="publicHybridEventsAverageNonLocalPhysicalParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="publicHybridEventsAverageVirtualParticipants">Average virtual participants</label>
                  <InputNumber v-model="project.publicHybridEventsAverageVirtualParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('publicHybridEventsAverageVirtualParticipants', $event)"
                  id ="publicHybridEventsAverageVirtualParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="publicHybridEventsAverageDuration ">Average duration (days)</label>
                  <InputNumber v-model="project.publicHybridEventsAverageDuration " mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('publicHybridEventsAverageDuration', $event)"
                  id ="publicHybridEventsAverageDuration "/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="publicHybridEventsAverageHoursPerDays">Average hours/day</label>
                  <InputNumber v-model="project.publicHybridEventsAverageHoursPerDays" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('publicHybridEventsAverageHoursPerDays', $event)"
                  id ="publicHybridEventsAverageHoursPerDays"/>
                </div>
              </div>
            </div>
            <div class="card">
              <h5>Virtual</h5>

              <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-4">
                  <label for="publicVirtualEventsNumber">Number of virtual public events</label>
                  <InputNumber v-model="project.publicVirtualEventsNumber" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('publicVirtualEventsNumber', $event)"
                  id ="publicVirtualEventsNumber"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="publicVirtualEventsAverageVirtualParticipants">Average virtual participants</label>
                  <InputNumber v-model="project.publicVirtualEventsAverageVirtualParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('publicVirtualEventsAverageVirtualParticipants', $event)"
                  id ="publicVirtualEventsAverageVirtualParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="publicVirtualEventsAverageDuration">Average duration (days)</label>
                  <InputNumber v-model="project.publicVirtualEventsAverageDuration" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('publicVirtualEventsAverageDuration', $event)"
                  id ="publicVirtualEventsAverageDuration"/>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel header="Internal events/meetings">
						<div class="card">
              <h5>On-site</h5>

              <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-6">
                  <label for="internalOnSiteEventsNumber">Number of on-site internal events/meetings</label>
                  <InputNumber v-model="project.internalOnSiteEventsNumber" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('internalOnSiteEventsNumber', $event)"
                  id ="internalOnSiteEventsNumber"/>
                </div>
                <div class="field col-12 md:col-6">
                  <label for="internalOnSiteEventsAveragePhysicalParticipants">Average physical participants</label>
                  <InputNumber v-model="project.internalOnSiteEventsAveragePhysicalParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('internalOnSiteEventsAveragePhysicalParticipants', $event)"
                  id ="internalOnSiteEventsAveragePhysicalParticipants"/>
                </div>
                <div class="field col-12 md:col-6">
                  <label for="internalOnSiteEventsAverageNonLocalPhysicalParticipants">Average non-local physical participants</label>
                  <InputNumber v-model="project.internalOnSiteEventsAverageNonLocalPhysicalParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('internalOnSiteEventsAverageNonLocalPhysicalParticipants', $event)"
                  id ="internalOnSiteEventsAverageNonLocalPhysicalParticipants"/>
                </div>
                <div class="field col-12 md:col-6">
                  <label for="internalOnSiteEventsAverageDuration">Average duration (days)</label>
                  <InputNumber v-model="project.internalOnSiteEventsAverageDuration" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('internalOnSiteEventsAverageDuration', $event)"
                  id ="internalOnSiteEventsAverageDuration"/>
                </div>
              </div>
            </div>
            <div class="card">
              <h5>Hybrid</h5>

              <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-4">
                  <label for="internalHybridEventsNumber">Number of hybrid internal events/meetings</label>
                  <InputNumber v-model="project.internalHybridEventsNumber" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('internalHybridEventsNumber', $event)"
                  id ="internalHybridEventsNumber"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="internalHybridEventsAveragePhysicalParticipants">Average physical participants</label>
                  <InputNumber v-model="project.internalHybridEventsAveragePhysicalParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('internalHybridEventsAveragePhysicalParticipants', $event)"
                  id ="internalHybridEventsAveragePhysicalParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="internalHybridEventsAverageNonLocalPhysicalParticipants">Average non-local physical participants</label>
                  <InputNumber v-model="project.internalHybridEventsAverageNonLocalPhysicalParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('internalHybridEventsAverageNonLocalPhysicalParticipants', $event)"
                  id ="internalHybridEventsAverageNonLocalPhysicalParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="internalHybridEventsAverageVirtualParticipants">Average virtual participants</label>
                  <InputNumber v-model="project.internalHybridEventsAverageVirtualParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('internalHybridEventsAverageVirtualParticipants', $event)"
                  id ="internalHybridEventsAverageVirtualParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="internalHybridEventsAverageDuration ">Average duration (days)</label>
                  <InputNumber v-model="project.internalHybridEventsAverageDuration " mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('internalHybridEventsAverageDuration', $event)"
                  id ="internalHybridEventsAverageDuration "/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="internalHybridEventsAverageHoursPerDays">Average hours/day</label>
                  <InputNumber v-model="project.internalHybridEventsAverageHoursPerDays" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('internalHybridEventsAverageHoursPerDays', $event)"
                  id ="internalHybridEventsAverageHoursPerDays"/>
                </div>
              </div>
            </div>
            <div class="card">
              <h5>Virtual</h5>

              <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-4">
                  <label for="internalVirtualEventsNumber">Number of virtual internal events/meetings</label>
                  <InputNumber v-model="project.internalVirtualEventsNumber" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('internalVirtualEventsNumber', $event)"
                  id ="internalVirtualEventsNumber"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="internalVirtualEventsAverageVirtualParticipants">Average virtual participants</label>
                  <InputNumber v-model="project.internalVirtualEventsAverageVirtualParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('internalVirtualEventsAverageVirtualParticipants', $event)"
                  id ="internalVirtualEventsAverageVirtualParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="internalVirtualEventsAverageDuration">Average duration (days)</label>
                  <InputNumber v-model="project.internalVirtualEventsAverageDuration" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('internalVirtualEventsAverageDuration', $event)"
                  id ="internalVirtualEventsAverageDuration"/>
                </div>
              </div>
            </div>
          </TabPanel>

					<TabPanel header="Events participated by the project">
						<div class="card">
              <h5>On-site</h5>

              <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-4">
                  <label for="participatedOnSiteEventsNumber">Number of on-site events participated by the project</label>
                  <InputNumber v-model="project.participatedOnSiteEventsNumber" mode="decimal"
                  showButtons decrementButtonClass="p-button-info"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('participatedOnSiteEventsNumber', $event)"
                  id ="participatedOnSiteEventsNumber"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="participatedOnSiteEventsAverageParticipants">Average number of participants</label>
                  <InputNumber v-model="project.participatedOnSiteEventsAverageParticipants" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @input="onCellEditComplete('participatedOnSiteEventsAverageParticipants', $event)"
                  id ="participatedOnSiteEventsAverageParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="participatedOnSiteEventsAverageDuration">Average duration (days)</label>
                  <InputNumber v-model="project.participatedOnSiteEventsAverageDuration" mode="decimal" :minFractionDigits="2" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" @input="onCellEditComplete('participatedOnSiteEventsAverageDuration', $event)"
                  id ="participatedOnSiteEventsAverageDuration"/>
                </div>
              </div>
            </div>
					</TabPanel>
				</TabView>
      </div>
    </div>

    <div class="col-6">
      <div class="card">
        <h4>Printable deliverables</h4>
      
        <DataTable :value="project.printableDeliverables" editMode="cell" @cell-edit-complete="onCellEditCompletePrintableDeliverable" 
          sortMode="multiple" :paginator="true" :rows="10" v-model:filters="printableDeliverableFilters" filterDisplay="menu"
          :loading="loading" :filters="printableDeliverableFilters" responsiveLayout="scroll" :rowHover="true" class="p-datatable-gridlines"
          :globalFilterFields="['deliverableType', 'deliverableName', 'copies', 'avgPagesPerCopy']">

          <template #header>
              <div class="flex justify-content-between flex-column sm:flex-row">
                <div>
                  <Button class="p-button-outlined mr-2" @click="addPrintableDeliverable"><i class="pi pi-plus mr-2" />New printable deliverable</Button>
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="printableDeliverableFilters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                  </span>
                </div>
                
                <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined p-button-warning" @click="clearPrintableDeliverableFilter()"/>
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
                    <span>{{slotProps.option.value}}</span>
                </template>
              </Dropdown>
            </template>
          </Column>

          <Column field="deliverableName" header="Deliverable Name" :sortable="true">
            <template #editor="slotProps">
              <Dropdown :options="getDeliverableNames(slotProps.data.deliverableType)" v-model="slotProps.data[slotProps.field]" />
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

          <Column field="actions" header="Actions">
            <template #body="slotProps">
              <i class="pi pi-trash" @click="deletePrintableDeliverable(slotProps.index)" />
            </template>
          </Column>

        </DataTable>
      </div>
    </div>

    <div class="col-4">
      <div class="card p-fluid" style="display: flex; align-items: center; justify-content: space-around;">
        <h2 class="mr-2">Tons of carbon dioxyde equivalent emited: {{project.initialCF}}</h2>
        <Button icon="pi pi-replay" class="p-button-rounded p-button-outlined p-button-plain mr-5" label="Recalculate"
                style="width: 15rem; font-size: 1.1rem"/> <!-- ¿warning, info, danger, plain o success? -->
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
    Toast
  },
  data() {
    return {
      placeholder: "Select a partner",
      arrayOfObjects: ["MEDIPLASMA SRL", "Q TECHNOLOGIES LTD", "CO2CRC Management Pty Ltd"],
      project: {},
      object: {},
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
        console.log(response.data)
        this.project = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      })

      this.axios.get(`/partners?projectId=${this.$route.params.id}`)
      .then((response) => {
        this.project.partners = response.data;
        this.project.coordinator = response.data.find(p => p.coordinator)._id
        this.$store.dispatch("updateSelectedPartner", response.data[0].name);
      })
      .catch((e)=>{
        console.log('error' + e);
      })

      this.axios.get(`/printableDeliverables?projectId=${this.$route.params.id}`)
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

      if (this.project.partners.filter(p => p.coordinator === true).length === 0) {
        newPartner.coordinator = true
        this.project.coordinator = newPartner._id
      }
        
      this.axios.post('/partners', newPartner)
      .then((response) => {
        console.log("Response: ", response.data)
        this.project.partners.unshift(response.data)
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Partner created', life: 3000});
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    deletePartner(index) {
      let partner = this.project.partners[index]
      
      this.axios.delete('/partners/' + partner._id)
      .then((response) => {
        console.log(response.data)

        if (this.project.partners.length === 1) {
          this.project.partners = []
          this.project.selectedPartnerForEquipmentSimple = {}
        } else {
          this.axios.get(`/partners?projectId=${this.$route.params.id}`)
          .then((response) => {
            console.log(response.data)

            this.project.partners = response.data;
            
            if (this.project.partners.filter(p => p.coordinator === true).length === 0)
              this.onCellEditCompletePartnerCoordinator(this.project.partners[0])
            
            if (this.selectedPartnerForEquipmentSimple === partner.name)
              this.$store.dispatch("updateSelectedPartner", this.project.partners.filter(p => p.name !== partner.name)[0].name)
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
      .then((response) => {
        console.log(response.data)

        this.axios.get(`/printableDeliverables?projectId=${this.$route.params.id}`)
        .then((response) => {
          console.log(response.data)
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

      axios.put("/projects/" + this.project._id, paramsData).then(response => {
        console.log(response.data);
        this.project[field] = newValue
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Project updated', life: 3000});
      }).catch(error =>{
        console.log(error)
      })
    },
    onCellEditCompletePartner(event) {
      let { data, newValue, newData, field } = event;
      const paramsData = {}

      newData[field] = newValue;
      paramsData[field] = newValue;
      
      axios.put("/partners/" + data._id, paramsData).then(response => {
        console.log(response.data);
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

      axios.put("/partners/updateCoordinator", paramsData).then(response => {
        console.log(response.data);
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

      axios.put("/partners/" + partnerId, paramsData).then(response => {
        console.log(response.data);
        this.project[field] = newValue
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Partner equipment data updated', life: 3000});
      }).catch(error =>{
        console.log(error)
      })
    },
    onCellEditCompletePrintableDeliverable(event) {
      let { data, newValue, newData, field } = event;
      const paramsData = {}

      newData[field] = newValue;
      paramsData[field] = newValue;

      if (field === "deliverableType") {
        paramsData["deliverableName"] = "Select a deliverable name"
        newData["deliverableName"] = "Select a deliverable name"
      }
      
      axios.put("/printableDeliverables/" + data._id, paramsData).then(response => {
        console.log(response.data);
        this.project.printableDeliverables.splice(this.project.printableDeliverables.indexOf(data), 1, newData)
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Printable deliverables updated', life: 3000});
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
      if (!this.project.partners) return {}

      return this.project.partners.find(p => { 
        return p.name === this.selectedPartnerForEquipmentSimple
      })
    } 
  }
}
</script>

<style>

.pi-trash {
  font-size: 2rem;
  cursor: pointer
}

</style>