<template>
  
  <Topbar v-model:projectInfo="project" />

  <div class="projectDetailsSimpleGrid">
    
    <Toast position="bottom-right" />

    <div class="card col-12">
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
        <Column field="coordinator" header="Coordinator" :sortable="true">
          <template #body="slotProps">
            <RadioButton name="projectCoordinator" :value="slotProps.data._id" v-model="project.coordinator"
            @change="onCellEditCompletePartnerCoordinator(slotProps.data, $event)" />
          </template>
        </Column>

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

        <Column field="employeesWorkingWPP" header="Number full time employees" :sortable="true">
          <template #editor="slotProps">
            <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
            :allowEmpty="false" :min="0" />
          </template>
        </Column>

        <Column field="seasonalEmployees" header="Number part time employees" :sortable="true">
          <template #editor="slotProps">
            <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
            :allowEmpty="false" :min="0" />
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


        <Column field="externalExperts" header="Number of external experts" :sortable="true">
          <template #editor="slotProps">
            <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" showButtons decrementButtonClass="p-button-info"
            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
            :allowEmpty="false" :min="0" />
          </template>
        </Column>

        <Column field="externalExpertsPersonMonths" header="Sum person months for the external experts" :sortable="true">
          <template #editor="slotProps">
            <InputNumber v-model="slotProps.data[slotProps.field]" mode="decimal" :maxFractionDigits="3"
            showButtons :step="0.25" decrementButtonClass="p-button-info"
            incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
            :allowEmpty="false" :min="0" />
          </template>
        </Column>


        <Column field="actions" header="Actions">
          <template #body="slotProps">
            <i class="pi pi-trash" @click="deletePartner(slotProps.index + currentPagePartnersTable * 5)" />
          </template>
        </Column>
      
      </DataTable>

      <div style="text-align: left; margin-top: 10px">
          *PP: Preparation phase<br>
          *WPP: Whole project period
      </div>
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
              <div class="field col-12 md:col-3">
                <label for="pcsBoughtDuringProject">PCs</label>
                <InputNumber v-model="selectedPartner.pcsBoughtDuringProject" decrementButtonClass="p-button-info"
                incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="decimal"
                showButtons :allowEmpty="false" :min="0" id="pcsBoughtDuringProject"
                @focus="onFocusValue=selectedPartner.pcsBoughtDuringProject" @keypress.enter="$event.target.blur()"
                @focusout="onCellEditCompletePartnerEquipment('pcsBoughtDuringProject', selectedPartner.pcsBoughtDuringProject)" />
              </div>
              <div class="field col-12 md:col-3">
                <label for="pcsFlatScreenBoughtDuringProject">PCs with flat screen</label>
                <InputNumber v-model="selectedPartner.pcsFlatScreenBoughtDuringProject" mode="decimal" decrementButtonClass="p-button-info"
                showButtons incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                :allowEmpty="false" :min="0" id="pcsFlatScreenBoughtDuringProject" 
                @focus="onFocusValue=selectedPartner.pcsFlatScreenBoughtDuringProject" @keypress.enter="$event.target.blur()"
                @focusout="onCellEditCompletePartnerEquipment('pcsFlatScreenBoughtDuringProject', selectedPartner.pcsFlatScreenBoughtDuringProject)" />
              </div>
              <div class="field col-12 md:col-3">
                <label for="laptopsBoughtDuringProject">Laptop computers</label>
                <InputNumber v-model="selectedPartner.laptopsBoughtDuringProject" mode="decimal"
                showButtons decrementButtonClass="p-button-info" incrementButtonClass="p-button-info"
                incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :allowEmpty="false" :min="0" id="laptopsBoughtDuringProject"
                @focus="onFocusValue=selectedPartner.laptopsBoughtDuringProject" @keypress.enter="$event.target.blur()"
                @focusout="onCellEditCompletePartnerEquipment('laptopsBoughtDuringProject', selectedPartner.laptopsBoughtDuringProject)" />
              </div>
              <div class="field col-12 md:col-3">
                <label for="flatScreensBoughtDuringProject">Flat screens</label>
                <InputNumber v-model="selectedPartner.flatScreensBoughtDuringProject" mode="decimal"
                showButtons decrementButtonClass="p-button-info" incrementButtonClass="p-button-info"
                incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :allowEmpty="false" :min="0" id="flatScreensBoughtDuringProject"
                @focus="onFocusValue=selectedPartner.flatScreensBoughtDuringProject" @keypress.enter="$event.target.blur()"
                @focusout="onCellEditCompletePartnerEquipment('flatScreensBoughtDuringProject', selectedPartner.flatScreensBoughtDuringProject)" />
              </div>
              <div class="field col-12 md:col-3">
                <label for="cppsBoughtDuringProject">Computer Central Processes</label>
                <InputNumber v-model="selectedPartner.cppsBoughtDuringProject" mode="decimal"
                showButtons decrementButtonClass="p-button-info" :allowEmpty="false" :min="0" id="cppsBoughtDuringProject"
                incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                @focus="onFocusValue=selectedPartner.cppsBoughtDuringProject" @keypress.enter="$event.target.blur()"
                @focusout="onCellEditCompletePartnerEquipment('cppsBoughtDuringProject', selectedPartner.cppsBoughtDuringProject)" />
              </div>
              <div class="field col-12 md:col-3">
                <label for="printersBoughtDuringProject">Printers</label>
                <InputNumber v-model="selectedPartner.printersBoughtDuringProject" mode="decimal"
                showButtons decrementButtonClass="p-button-info" incrementButtonClass="p-button-info"
                incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :allowEmpty="false" :min="0" id="printersBoughtDuringProject"
                @focus="onFocusValue=selectedPartner.printersBoughtDuringProject" @keypress.enter="$event.target.blur()"
                @focusout="onCellEditCompletePartnerEquipment('printersBoughtDuringProject', selectedPartner.printersBoughtDuringProject)" />
              </div>
              <div class="field col-12 md:col-3">
                <label for="copyMachinesBoughtDuringProject">Copy machines</label>
                <InputNumber v-model="selectedPartner.copyMachinesBoughtDuringProject" mode="decimal"
                showButtons decrementButtonClass="p-button-info" :allowEmpty="false" :min="0" id="copyMachinesBoughtDuringProject"
                incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                @focus="onFocusValue=selectedPartner.copyMachinesBoughtDuringProject" @keypress.enter="$event.target.blur()"
                @focusout="onCellEditCompletePartnerEquipment('copyMachinesBoughtDuringProject', selectedPartner.copyMachinesBoughtDuringProject)" />
              </div>
              <div class="field col-12 md:col-3">
                <label for="faxMachinesBoughtDuringProject">Fax machines</label>
                <InputNumber v-model="selectedPartner.faxMachinesBoughtDuringProject" mode="decimal"
                showButtons decrementButtonClass="p-button-info" :allowEmpty="false" :min="0" id="faxMachinesBoughtDuringProject"
                incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                @focus="onFocusValue=selectedPartner.faxMachinesBoughtDuringProject" @keypress.enter="$event.target.blur()"
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
                  <InputNumber v-model="project.publicOnSiteEventsNumber" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicOnSiteEventsNumber" 
                  @focusout="onCellEditComplete('publicOnSiteEventsNumber', project.publicOnSiteEventsNumber)"
                  id ="publicOnSiteEventsNumber"/>
                </div>
                <div class="field col-12 md:col-6">
                  <label for="publicOnSiteEventsAveragePhysicalParticipants">Average number of physical participants</label>
                  <InputNumber v-model="project.publicOnSiteEventsAveragePhysicalParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicOnSiteEventsAveragePhysicalParticipants" 
                  @focusout="onCellEditComplete('publicOnSiteEventsAveragePhysicalParticipants', project.publicOnSiteEventsAveragePhysicalParticipants)"
                  id ="publicOnSiteEventsAveragePhysicalParticipants"/>
                </div>
                <div class="field col-12 md:col-6">
                  <label for="publicOnSiteEventsAverageNonLocalPhysicalParticipants">Average number of non-local physical participants**</label>
                  <InputNumber v-model="project.publicOnSiteEventsAverageNonLocalPhysicalParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicOnSiteEventsAverageNonLocalPhysicalParticipants" 
                  @focusout="onCellEditComplete('publicOnSiteEventsAverageNonLocalPhysicalParticipants', project.publicOnSiteEventsAverageNonLocalPhysicalParticipants)"
                  id ="publicOnSiteEventsAverageNonLocalPhysicalParticipants"/>
                </div>
                <div class="field col-12 md:col-6">
                  <label for="publicOnSiteEventsAverageDuration">Average duration (days)</label>
                  <InputNumber v-model="project.publicOnSiteEventsAverageDuration" mode="decimal" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicOnSiteEventsAverageDuration" 
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
                  <InputNumber v-model="project.publicHybridEventsNumber" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicHybridEventsNumber" 
                  @focusout="onCellEditComplete('publicHybridEventsNumber', project.publicHybridEventsNumber)"
                  id ="publicHybridEventsNumber"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="publicHybridEventsAveragePhysicalParticipants">Average number of physical participants</label>
                  <InputNumber v-model="project.publicHybridEventsAveragePhysicalParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicHybridEventsAveragePhysicalParticipants" 
                  @focusout="onCellEditComplete('publicHybridEventsAveragePhysicalParticipants', project.publicHybridEventsAveragePhysicalParticipants)"
                  id ="publicHybridEventsAveragePhysicalParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="publicHybridEventsAverageNonLocalPhysicalParticipants">Average number of non-local physical participants**</label>
                  <InputNumber v-model="project.publicHybridEventsAverageNonLocalPhysicalParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicHybridEventsAverageNonLocalPhysicalParticipants" 
                  @focusout="onCellEditComplete('publicHybridEventsAverageNonLocalPhysicalParticipants', project.publicHybridEventsAverageNonLocalPhysicalParticipants)"
                  id ="publicHybridEventsAverageNonLocalPhysicalParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="publicHybridEventsAverageVirtualParticipants">Average number of on-line participants</label>
                  <InputNumber v-model="project.publicHybridEventsAverageVirtualParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicHybridEventsAverageVirtualParticipants" 
                  @focusout="onCellEditComplete('publicHybridEventsAverageVirtualParticipants', project.publicHybridEventsAverageVirtualParticipants)"
                  id ="publicHybridEventsAverageVirtualParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="publicHybridEventsAverageDuration ">Average duration (days)</label>
                  <InputNumber v-model="project.publicHybridEventsAverageDuration " mode="decimal" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicHybridEventsAverageDuration" 
                  @focusout="onCellEditComplete('publicHybridEventsAverageDuration', project.publicHybridEventsAverageDuration)"
                  id ="publicHybridEventsAverageDuration "/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="publicHybridEventsAverageHoursPerDays">Average duration (hours/day)</label>
                  <InputNumber v-model="project.publicHybridEventsAverageHoursPerDays" mode="decimal" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicHybridEventsAverageHoursPerDays" 
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
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicVirtualEventsNumber" 
                  @focusout="onCellEditComplete('publicVirtualEventsNumber', project.publicVirtualEventsNumber)"
                  id ="publicVirtualEventsNumber"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="publicVirtualEventsAverageVirtualParticipants">Average number of on-line participants</label>
                  <InputNumber v-model="project.publicVirtualEventsAverageVirtualParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicVirtualEventsAverageVirtualParticipants" 
                  @focusout="onCellEditComplete('publicVirtualEventsAverageVirtualParticipants', project.publicVirtualEventsAverageVirtualParticipants)"
                  id ="publicVirtualEventsAverageVirtualParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="publicVirtualEventsAverageDuration">Average duration (hours)</label>
                  <InputNumber v-model="project.publicVirtualEventsAverageDuration" mode="decimal" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.publicVirtualEventsAverageDuration" 
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
                  <InputNumber v-model="project.internalOnSiteEventsNumber" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalOnSiteEventsNumber" 
                  @focusout="onCellEditComplete('internalOnSiteEventsNumber', project.internalOnSiteEventsNumber)"
                  id ="internalOnSiteEventsNumber"/>
                </div>
                <div class="field col-12 md:col-6">
                  <label for="internalOnSiteEventsAveragePhysicalParticipants">Average number of physical participants</label>
                  <InputNumber v-model="project.internalOnSiteEventsAveragePhysicalParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalOnSiteEventsAveragePhysicalParticipants" 
                  @focusout="onCellEditComplete('internalOnSiteEventsAveragePhysicalParticipants', project.internalOnSiteEventsAveragePhysicalParticipants)"
                  id ="internalOnSiteEventsAveragePhysicalParticipants"/>
                </div>
                <div class="field col-12 md:col-6">
                  <label for="internalOnSiteEventsAverageNonLocalPhysicalParticipants">Average number of non-local physical participants**</label>
                  <InputNumber v-model="project.internalOnSiteEventsAverageNonLocalPhysicalParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalOnSiteEventsAverageNonLocalPhysicalParticipants" 
                  @focusout="onCellEditComplete('internalOnSiteEventsAverageNonLocalPhysicalParticipants', project.internalOnSiteEventsAverageNonLocalPhysicalParticipants)"
                  id ="internalOnSiteEventsAverageNonLocalPhysicalParticipants"/>
                </div>
                <div class="field col-12 md:col-6">
                  <label for="internalOnSiteEventsAverageDuration">Average duration (days)</label>
                  <InputNumber v-model="project.internalOnSiteEventsAverageDuration" mode="decimal" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalOnSiteEventsAverageDuration" 
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
                  <InputNumber v-model="project.internalHybridEventsNumber" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalHybridEventsNumber" 
                  @focusout="onCellEditComplete('internalHybridEventsNumber', project.internalHybridEventsNumber)"
                  id ="internalHybridEventsNumber"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="internalHybridEventsAveragePhysicalParticipants">Average number of physical participants</label>
                  <InputNumber v-model="project.internalHybridEventsAveragePhysicalParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalHybridEventsAveragePhysicalParticipants" 
                  @focusout="onCellEditComplete('internalHybridEventsAveragePhysicalParticipants', project.internalHybridEventsAveragePhysicalParticipants)"
                  id ="internalHybridEventsAveragePhysicalParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="internalHybridEventsAverageNonLocalPhysicalParticipants">Average number of non-local physical participants**</label>
                  <InputNumber v-model="project.internalHybridEventsAverageNonLocalPhysicalParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalHybridEventsAverageNonLocalPhysicalParticipants" 
                  @focusout="onCellEditComplete('internalHybridEventsAverageNonLocalPhysicalParticipants', project.internalHybridEventsAverageNonLocalPhysicalParticipants)"
                  id ="internalHybridEventsAverageNonLocalPhysicalParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="internalHybridEventsAverageVirtualParticipants">Average number of on-line participants</label>
                  <InputNumber v-model="project.internalHybridEventsAverageVirtualParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalHybridEventsAverageVirtualParticipants" 
                  @focusout="onCellEditComplete('internalHybridEventsAverageVirtualParticipants', project.internalHybridEventsAverageVirtualParticipants)"
                  id ="internalHybridEventsAverageVirtualParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="internalHybridEventsAverageDuration ">Average duration (days)</label>
                  <InputNumber v-model="project.internalHybridEventsAverageDuration " mode="decimal" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalHybridEventsAverageDuration" 
                  @focusout="onCellEditComplete('internalHybridEventsAverageDuration', project.internalHybridEventsAverageDuration)"
                  id ="internalHybridEventsAverageDuration "/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="internalHybridEventsAverageHoursPerDays">Average duration (hours/day)</label>
                  <InputNumber v-model="project.internalHybridEventsAverageHoursPerDays" mode="decimal" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalHybridEventsAverageHoursPerDays" 
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
                  <InputNumber v-model="project.internalVirtualEventsNumber" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalVirtualEventsNumber" 
                  @focusout="onCellEditComplete('internalVirtualEventsNumber', project.internalVirtualEventsNumber)"
                  id ="internalVirtualEventsNumber"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="internalVirtualEventsAverageVirtualParticipants">Average number of on-line participants</label>
                  <InputNumber v-model="project.internalVirtualEventsAverageVirtualParticipants" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalVirtualEventsAverageVirtualParticipants" 
                  @focusout="onCellEditComplete('internalVirtualEventsAverageVirtualParticipants', project.internalVirtualEventsAverageVirtualParticipants)"
                  id ="internalVirtualEventsAverageVirtualParticipants"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="internalVirtualEventsAverageDuration">Average duration (hours)</label>
                  <InputNumber v-model="project.internalVirtualEventsAverageDuration" mode="decimal" :maxFractionDigits="3"
                  showButtons decrementButtonClass="p-button-info" :step="0.25" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.internalVirtualEventsAverageDuration" 
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
                  <InputNumber v-model="project.participatedOnSiteEventsNumber" mode="decimal"
                  showButtons decrementButtonClass="p-button-info" @keypress.enter="$event.target.blur()"
                  incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.participatedOnSiteEventsNumber" 
                  @focusout="onCellEditComplete('participatedOnSiteEventsNumber', project.participatedOnSiteEventsNumber)"
                  id ="participatedOnSiteEventsNumber"/>
                </div>
                <div class="field col-12 md:col-4">
                  <label for="participatedOnSiteEventsAverageParticipants">Average number of participants of the project</label>
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
                  :allowEmpty="false" :min="0" @focus="onFocusValue=project.participatedOnSiteEventsAverageDuration" 
                  @focusout="onCellEditComplete('participatedOnSiteEventsAverageDuration', project.participatedOnSiteEventsAverageDuration)"
                  id ="participatedOnSiteEventsAverageDuration"/>
                </div>
              </div>
            </div>
					</TabPanel>
				</TabView>
        <div style="text-align: left; margin-top: 10px">
          * The values of this section are referred to the whole project partnership
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
        <Button class="ml-2" label="Save current project" @click="saveCurrentProject" />
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
        <div class="flex align-items-center  pb-5">
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
    Badge
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
      currentPagePartnersTable: 0,
      currentPagePrintableDeliverablesTable: 0,
      displayPartnersWithoutCountryDialog: false,
      displayPartnersWithDefaultValues: false,
      partnersWithoutCountry: [],
      partnersWithDefaultValues: []
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
      console.log(this.partnersWithDefaultValues);
      this.displayPartnersWithoutCountryDialog = true
    },
    closePartnersWithoutCountryErrorDialog() {
      this.displayPartnersWithoutCountryDialog = false
      this.partnersWithoutCountry = []
      this.displayPartnersWithDefaultValues = false;
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
        console.log(partner);
        if(partner.personMonthsPP === null ||
            partner.personMonthsWPP === null ||
            partner.externalExpertsPersonMonths === null ||
            partner.employeesWorkingWPP === null || 
            partner.seasonalEmployees === null ||
            partner.externalExperts === null) {
              this.partnersWithDefaultValues.push(partner);
              this.displayPartnersWithDefaultValues = true;
            }
      }

      if (this.partnersWithoutCountry.length > 0 || this.partnersWithDefaultValues > 0) {
        this.displayPartnersWithoutCountryErrorDialog()
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
        personMonthsPP: "",
        personMonthsWPP:"",
        externalExpertsPersonMonths: "",
        employeesWorkingWPP: "",
        seasonalEmployees: "",
        externalExperts: "",
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

</style>