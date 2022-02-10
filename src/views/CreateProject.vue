<template>
  
  <Topbar />

  <div class="grid" style="justify-content: center;">
    <div class="col-5">
			<div class="card">
				<h2>Project general data</h2>
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-12">
						<label for="projectName">Project Name</label>
            <InputText v-model="newProject.name" id="projectName" name="projectName" :class="{'p-invalid': submitted && errors.filter(e => e.field === 'name').length > 0}" />
            <small style="margin-top: 5px" class="p-error" v-for="error in errors.filter(e => submitted && e.field === 'name')" :key="error.message">{{error.message}}</small>
          </div>
          <div class="field col-12 md:col-12">
            <div class="col-12 md:col-12" style="display: flex; justify-content: space-around;">
              <div class="field col-12 md:col-4">
                <label for="projectInitialDuration">Project Starting Year</label>
                <InputNumber v-model="newProject.from" id="projectInitialDuration" name="projectInitialDuration" showButtons :min="0" mode="decimal"
                decrementButtonClass="p-button-info" incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                :useGrouping="false" :class="{'p-invalid': submitted && errors.filter(e => e.field === 'duration').length > 0}" />
              </div>
              <div class="field col-12 md:col-4">
                <label for="projectFinalDuration">Project Finishing Year</label>
                <InputNumber v-model="newProject.to" id="projectFinalDuration" name="projectFinalDuration" showButtons :min="0" mode="decimal"
                decrementButtonClass="p-button-info" incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                :useGrouping="false" :class="{'p-invalid': submitted && errors.filter(e => e.field === 'duration').length > 0}" />
              </div>
            </div>
            <div class="col-12 md:col-12" style="display: flex; justify-content: center;">
              <small class="p-error" v-for="error in errors.filter(e => submitted && e.field === 'duration')" :key="error.message">{{error.message}}</small>
            </div>
          </div>
					<div class="field col-12 md:col-12">
						<label for="projectCallId">Project Call ID</label>
            <InputText v-model="newProject.callId" id="projectCallId" name="projectCallId" />
					</div>
					<div class="field col-12 md:col-12">
						<label for="fundingId">Proposal ID</label>
            <InputText v-model="newProject.proposalId" id="fundingId" name="fundingId" />
					</div>
          <div class="field col-12 md:col-12" style="display: flex; justify-content: space-around;">
            <div class="field col-12 md:col-4" v-if="!this.$route.params.id">
              <Button type="button" icon="pi pi-check" label="Create" class="p-button-info mt-4" @click="createProject()"/>
            </div>
            <div class="field col-12 md:col-4" v-else>
              <Button type="button" icon="pi pi-refresh" label="Update" class="p-button-info mt-4" @click="updateProject()"/>
            </div>
            <div class="field col-12 md:col-4">
              <router-link id="cancel" to="/">
                <Button type="button" icon="pi pi-times" label="Cancel" class="p-button-secondary mt-4" />
              </router-link>
            </div>
          </div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import axios from "axios";
import mongoose from "mongoose"
import Topbar from '@/components/Topbar.vue';

export default {
  name: 'CreateProject',
  components: {
    InputText,
    InputNumber,
    Button,
    Topbar
  },
  data() {
    return {
      newProject: {
        name: "",
        from: new Date().getFullYear(),
        to: new Date().getFullYear() + 2,
        callId: "",
        proposalId: "",
        initialCF: 0,
        currentCF: 0,
        publicOnSiteEventsNumber: 0,
        publicOnSiteEventsAveragePhysicalParticipants: 0,
        publicOnSiteEventsAverageNonLocalPhysicalParticipants: 0,
        publicOnSiteEventsAverageDuration: 0,
        publicHybridEventsNumber: 0,
        publicHybridEventsAveragePhysicalParticipants: 0,
        publicHybridEventsAverageNonLocalPhysicalParticipants: 0,
        publicHybridEventsAverageVirtualParticipants: 0,
        publicHybridEventsAverageDuration: 0,
        publicHybridEventsAverageHoursPerDays: 0,
        publicVirtualEventsNumber: 0,
        publicVirtualEventsAverageVirtualParticipants: 0,
        publicVirtualEventsAverageDuration: 0,
        internalOnSiteEventsNumber: 0,
        internalOnSiteEventsAveragePhysicalParticipants: 0,
        internalOnSiteEventsAverageNonLocalPhysicalParticipants: 0,
        internalOnSiteEventsAverageDuration: 0,
        internalHybridEventsNumber: 0,
        internalHybridEventsAveragePhysicalParticipants: 0,
        internalHybridEventsAverageNonLocalPhysicalParticipants: 0,
        internalHybridEventsAverageVirtualParticipants: 0,
        internalHybridEventsAverageDuration: 0,
        internalHybridEventsAverageHoursPerDays: 0,
        internalVirtualEventsNumber: 0,
        internalVirtualEventsAverageVirtualParticipants: 0,
        internalVirtualEventsAverageDuration: 0,
        participatedOnSiteEventsNumber: 0,
        participatedOnSiteEventsAverageParticipants: 0,
        participatedOnSiteEventsAverageDuration: 0,
        user : this.$store.state.userId
      },
      errors: [],
      submitted: false,
    }
  },
  created() {
    if (this.$route.params.id) {
      axios.get(`/projects/${this.$route.params.id}`)
      .then((response) => {
        this.newProject = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    }
  },
  methods: {
    createProject() {
      this.submitted = true
      this.newProject._id = new mongoose.Types.ObjectId(); 
      this.newUserId = this.$store.state.userId;

      axios.post('/projects', this.newProject,{
        auth: {
            username: this.$store.state.username,
            password: this.$store.state.password
          }
      })
      .then(() => {
        this.$router.push({ path: `/projects/${this.newProject._id}` })
      })
      .catch((error)=>{
        this.errors = error.response.data
      })
    },
    updateProject() {
      this.submitted = true
      axios.put('/projects/' + this.newProject._id, this.newProject)
      .then(() => {
        this.$router.push({ path: `/projects/${this.newProject._id}` })
      })
      .catch((error)=>{
        this.errors = error.response.data
      })
    }
  }
}
</script>