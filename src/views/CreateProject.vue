<template>
  
  <Topbar />

  <div class="grid" style="justify-content: center;">
    <div class="col-5">
			<div class="card">
				<h2>General data of the Project</h2>
				<div class="p-fluid formgrid grid">

					<div class="field col-12 md:col-12">
						<label for="projectName">Project Name</label>
            <InputText v-model="newProject.name" id="projectName" name="projectName" :class="{'p-invalid': submitted && errors.filter(e => e.field === 'name').length > 0}" />
            <small style="margin-top: 5px" class="p-error" v-for="error in errors.filter(e => submitted && e.field === 'name')" :key="error.message">{{error.message}}</small>
          </div>
          
          <div class="field col-12 md:col-12">
            <div class="col-12 md:col-12" style="display: flex; justify-content: space-around;">
              
              <div class="field col-12 md:col-4">
                <label for="projectInitialDuration">Project Starting Date</label>
                <Calendar v-model="newProject.from" view="month" dateFormat="mm/yy" id="projectInitialDuration" name="projectInitialDuration"
                :class="{'p-invalid': submitted && errors.filter(e => e.field === 'duration').length > 0}">
                  <template #date="slotProps">
                    <h1>{{slotProps}}</h1>
                  </template>
                </Calendar>
              </div>

              <div class="field col-12 md:col-4">
                <label for="projectFinalDuration">Project Finishing Date</label>
                <Calendar v-model="newProject.to" view="month" dateFormat="mm/yy" id="projectFinalDuration" name="projectFinalDuration"
                :class="{'p-invalid': submitted && errors.filter(e => e.field === 'duration').length > 0}" />
              </div>
            </div>

            <p>Duration of the project (months): {{projectDurationMonths}}</p>

            <div class="col-12 md:col-12" style="display: flex; justify-content: center;">
              <small class="p-error" v-for="error in errors.filter(e => submitted && e.field === 'duration')" :key="error.message">{{error.message}}</small>
            </div>
          </div>

					<div class="field col-12 md:col-12">
						<label for="projectStatus">Project status</label>
            <Dropdown v-model="newProject.status" :options="projectStatusOptions" id="projectStatus" name="projectStatus" class="ml-2" />
					</div>

          <div class="field col-12 md:col-12">
						<label for="projectCallId">Project call ID</label>
            <InputText v-model="newProject.callId" id="projectCallId" name="projectCallId" />
					</div>

					<div class="field col-12 md:col-12">
						<label for="fundingId">Project number</label>
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
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import axios from "axios";
import mongoose from "mongoose"
import Topbar from '@/components/Topbar.vue';

export default {
  name: 'CreateProject',
  components: {
    InputText,
    Calendar,
    Dropdown,
    Button,
    Topbar
  },
  data() {
    return {
      newProject: {
        name: "",
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(new Date().getFullYear() + 2, new Date().getMonth(), 0),
        callId: "",
        proposalId: "",
        status: "0 - Draft",
        isInitialProject: new Boolean(false),
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
      projectStatusOptions: [
        "0 - Draft", "1 - Scenario analysis", "2 - Best design", "3 - Submitted", "4 - Approved", "5 - End of year 1 monitoring report", "6 - End of year 2 monitoring report",
        "7 - End of year 3 monitoring report", "8 - End of year 4 monitoring report", "9 - End of year 5 monitoring report", "10 - End of year 6 monitoring report",
        "11 - Final monitoring report"
      ],
    }
  },
  computed: {
    projectDurationMonths() {
      let fromDate = new Date(this.newProject.from)
      let toDate = new Date(this.newProject.to)
      return toDate.getMonth() - fromDate.getMonth() + 1 + 12 * (toDate.getFullYear() - fromDate.getFullYear())
    },
  },
  created() {
    if (this.$route.params.id) {
      axios.get(`/projects/${this.$route.params.id}`)
      .then((response) => {
        this.newProject = response.data;
        this.newProject.from = new Date(new Date(this.newProject.from).getFullYear(), (new Date(this.newProject.from).getMonth()), 2)
        this.newProject.to = new Date(new Date(this.newProject.to).getFullYear(), (new Date(this.newProject.to).getMonth() + 1), 0)
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    }
  },
  methods: {
    async createProject() {
      this.newProject.from = new Date(this.newProject.from.getFullYear(), this.newProject.from.getMonth(), 2)
      this.newProject.to = new Date(this.newProject.to.getFullYear(), this.newProject.to.getMonth() + 1, 0)
      this.submitted = true;
      this.newInitialProject = Object.assign({}, this.newProject);
      this.newInitialProject.isInitialProject = new Boolean(true);
      this.newInitialProject._id = new mongoose.Types.ObjectId();
      this.newProject._id = new mongoose.Types.ObjectId();
      this.newUserId = this.$store.state.userId;
      this.newProject.initialProject = this.newInitialProject._id
      this.newInitialProject.initialProject = this.newProject._id

      Promise.all([
        axios.post('/projects', this.newInitialProject),
        axios.post('/projects', this.newProject)
      ]).then(async () => {
        this.$router.push({ path: `/projects/${this.newProject._id}` })
      }).catch(error => {
        this.errors = error.response.data
      })
    },
    updateProject() {
      this.submitted = true
      this.newProject.from = new Date(this.newProject.from.getFullYear(), this.newProject.from.getMonth(), 2)
      this.newProject.to = new Date(this.newProject.to.getFullYear(), this.newProject.to.getMonth() + 1, 0)
      axios.put('/projects/' + this.newProject._id, this.newProject)
      .then(() => {
        this.axios.get(`/projects/` + this.newProject.initialProject)
        .then((response) => {

          let initialProjectToUpdate = response.data;
          initialProjectToUpdate.name = this.newProject.name;
          initialProjectToUpdate.from = this.newProject.from;
          initialProjectToUpdate.to = this.newProject.to;
          initialProjectToUpdate.callId = this.newProject.callId;
          initialProjectToUpdate.proposalId = this.newProject.proposalId;
          initialProjectToUpdate.status = this.newProject.status;

          axios.put('/projects/' + this.newProject.initialProject, initialProjectToUpdate)
          .catch((errorUpdateInitial) => {
            this.errors = errorUpdateInitial.response.data;
          })

          this.$router.push({ path: `/` });
        })   
      })
      .catch((error)=>{
        this.errors = error.response.data
      })
    }
  }
}
</script>