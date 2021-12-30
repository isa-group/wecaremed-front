<template>
  
  <Topbar />

  <div class="grid" style="justify-content: center;">
    <div class="col-3">
			<div class="card">
				<h2>Project general data</h2>
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-12">
						<label for="projectName">Project Name</label>
            <InputText v-model="newProject.name" id="projectName" name="projectName" />
					</div>
          <div class="field col-12 md:col-12" style="display: flex; justify-content: space-around;">
            <div class="field col-12 md:col-4">
              <label for="projectInitialDuration">Project Starting Year</label>
              <InputNumber v-model="newProject.from" id="projectInitialDuration" name="projectInitialDuration" showButtons :min="0" mode="decimal"
              decrementButtonClass="p-button-info" incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"/>
            </div>
            <div class="field col-12 md:col-4">
              <label for="projectFinalDuration">Project Finishing Year</label>
              <InputNumber v-model="newProject.to" id="projectFinalDuration" name="projectFinalDuration" showButtons :min="0" mode="decimal"
              decrementButtonClass="p-button-info" incrementButtonClass="p-button-info" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"/>
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
  created() {
    if (this.$route.params.id) {
      axios.get(`/projects/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data)
        this.newProject = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    }
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
      }
    }
  },
  methods: {
    createProject() {
      this.newProject._id = new mongoose.Types.ObjectId(); 

      axios.post('/projects', this.newProject,{
        auth: {
            username: this.$store.state.username,
            password: this.$store.state.password
          }
      })
      .then((response) => {
        console.log("Response: ", response.data)
        this.$router.push({ path: `/projects/${this.newProject._id}` })
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    updateProject() {
      axios.put('/projects/' + this.newProject._id, this.newProject)
      .then((response) => {
        console.log("Response: ", response.data)
        this.$router.push({ path: `/projects/${this.newProject._id}` })
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    }
  }
}
</script>

<style scoped>

/* .wizard {
  position: relative;
  top: 50px;
}

.formRow {
  font-size: 40px;
  margin-bottom: 40px;
  display: flex;
}

label {
  position: relative;
  top: 6px;
  left: 600px;
  width: 300px;
  text-align: left;
  display: block;
}

input {
  position: relative;
  height: 30px;
  top: 10px;
  padding-left: 10px;
  border: 2px solid #42b983;
  border-radius: 5px;
}

input[type=text] {
  left: 800px;
  width: 300px;
}

input[type=number] {
  left: 835px;
  width: 100px;
}

.buttons {
  position: relative;
  top: 50px;
}

#create {
  position: relative;
  right: 50px;
}

#cancel {
  position: relative;
  left: 50px;
} */
</style>