<template>

  <Topbar />
  
  <div style="display: flex;justify-content: space-evenly; align-items: center;">

    <Toast position="bottom-right"/>

    <div class="card col-8">
      <h1>My projects</h1>

      <DataTable :value="projects" :paginator="true" class="p-datatable-gridlines" dataKey="id"
      :rowHover="true" sortMode="multiple" :rows="10" :loading="loading" responsiveLayout="scroll">
        
        <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <div>
                <router-link to="/createProject">
                  <Button class="p-button-info"><i class="pi pi-plus mr-2"/>Create a new project</Button>
                </router-link>
              </div>
            </div>
        </template>

        <template #empty>
            No projects found.
        </template>

        <template #loading>
            Loading projects. Please wait.
        </template>

        <Column field="name" header="Name" :sortable="true">
          <template #body="slotProps">
            {{slotProps.data.name}}
          </template>
        </Column>

        <Column field="from" header="From" :sortable="true">
          <template #body="slotProps">
            {{(new Date(slotProps.data.from).getMonth() + 1).toString().padStart(2, "0") + '/' + new Date(slotProps.data.from).getFullYear()}}
          </template>
        </Column>

        <Column field="to" header="To" :sortable="true">
        <template #body="slotProps">
            {{(new Date(slotProps.data.to).getMonth() + 1).toString().padStart(2, "0") + '/' + new Date(slotProps.data.to).getFullYear()}}
          </template>
        </Column>

        <template v-if="!this.$store.state.toggleValue">
          <Column field="initialCF" header="CF Estimation (t CO₂e)" :sortable="true">
            <template #body="slotProps">
              <span :class="getTextColorFromCFIndex(slotProps.data.initialCF)">{{slotProps.data.initialCF}}</span>
            </template>
          </Column>
        </template>

        <template v-else>
          <Column field="initialCF" header="Preparation Phase CF (t CO₂e)" :sortable="true">
            <template #body="slotProps">
              <span :class="getTextColorFromCFIndex(slotProps.data.initialCF)">{{slotProps.data.initialCF}}</span>
            </template>
          </Column>

          <Column field="currentCF" header="Execution Phase CF (t CO₂e)" :sortable="true">
            <template #body="slotProps">
              <span :class="getTextColorFromCFIndex(slotProps.data.currentCF)">{{slotProps.data.currentCF}}</span>
            </template>
          </Column>
        </template>

        <Column field="actions" header="Actions">
          <template #body="slotProps">
            <router-link :to="'/projects/' + (this.$store.state.toggleProject == true ? slotProps.data._id : slotProps.data.initialProject)">
              <i class="pi pi-arrow-circle-right mr-3" v-tooltip.top="'Go to project'" />
            </router-link>
            <router-link :to="'/editProject/' + (slotProps.data._id)">
              <i class="pi pi-pencil mr-3" v-tooltip.top="'Edit project'" />
            </router-link>
            <router-link to="/">
              <i class="pi pi-clone mr-3" @click="confirmCloneProject(projects.indexOf(slotProps.data))" v-tooltip.top="'Clone project'" />
            </router-link>
            <router-link to="/">
              <i class="pi pi-trash" @click="confirmDeleteProject(projects.indexOf(slotProps.data))" v-tooltip.top="'Delete project'" />
            </router-link>
          </template>
        </Column>
      
      </DataTable>

      <Dialog v-model:visible="deleteProjectDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
        <div class="flex align-items-center justify-content-center">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <span v-if="projectToDelete">Are you sure you want to delete <b>{{projectToDelete.name}}</b>?</span>
        </div>
        <template #footer>
          <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProjectDialog = false"/>
          <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProject" />
        </template>
      </Dialog>
          
      <Dialog v-model:visible="cloneProjectDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
        <div class="flex align-items-center justify-content-center">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <span v-if="projectToClone">Are you sure you want to clone <b>{{projectToClone.name}}</b>?
              The name of the copy will be <b>{{projectToClone.name}}_copy_{{projectToClone.numCopies+1}}</b></span>
        </div>
        <template #footer>
          <Button label="No" icon="pi pi-times" class="p-button-text" @click="cloneProjectDialog = false"/>
          <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="cloneProject" />
        </template>
      </Dialog>
    </div>
    
    <!-- <div class="card col-2" style="height: fit-content;">
      <h5>{{this.$store.state.toggleValue ? "CF Index colors" : "CF Estimation colors"}}</h5>
        <div class="wrapper"><div class="coloredSquare greenSquare mb-2 mr-2"/> <p class="legendText">0-150: Ideal</p></div>
        <div class="wrapper"><div class="coloredSquare orangeSquare mb-2 mr-2"/><p class="legendText">150-250: Improvable</p></div>
        <div class="wrapper"><div class="coloredSquare redSquare mr-2"/>   <p class="legendText">>250: Needs attention</p></div>
    </div> -->
  
  </div>

</template>

<script>
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Topbar from '@/components/Topbar.vue';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import axios from 'axios'
import mongoose from "mongoose"

export default {
  name: 'Home',
  components: {
    Button,
    DataTable,
    Column,
    Topbar,
    Dialog,
    Toast
  },
  data() {
    return {
      deleteProjectDialog: false,
      loading: true,
      projects: [],
      cloneProjectDialog: false
    }
  },
  created() {
    this.getProjects();
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    getProjects() {
      this.axios.get('/projects', { params: {
        userId: this.$store.state.userId,
      }})
      .then((response) => {
        this.projects = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    getTextColorFromCFIndex(cfIndex) {
      cfIndex
      // if (cfIndex < 150)
      //   return "greenText"
      // else if (cfIndex > 150 & cfIndex < 250)
      //   return "orangeText"
      // else
      //   return "redText"
      return ""
    },
    confirmDeleteProject(index) {
      this.projectToDelete = this.projects[index]
      this.deleteProjectDialog = true;
    },
    deleteProject() {
      axios.delete('/projects/' + this.projectToDelete._id)
      .then(() => {
        axios.delete('/projects/' + this.projectToDelete.initialProject)
        .then( () => {
          this.projects.splice(this.projects.indexOf(this.projectToDelete), 1)
          this.deleteProjectDialog = false
          this.$toast.add({severity:'success', summary: 'Successful', detail: 'Project deleted', life: 3000});

        }).catch( (err) => {
          console.log('error' + err);
        })
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    confirmCloneProject(index) {
      this.projectToClone = Object.assign({}, this.projects[index]);
      
      axios.get(`/projects/` + this.projects[index].initialProject)
      .then((response) => {
        this.projectClonedInitial = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      });
      this.projectToClone.tableIndex = index;
      this.cloneProjectDialog = true;
    },
    cloneProject() { 
      let nextNumCopies = this.projects[this.projectToClone.tableIndex].numCopies + 1;
      this.cloneProjectDialog = false;
      this.submitted = true
      
      let projectOriginalID = this.projects[this.projectToClone.tableIndex]._id;
      let projectOriginalInitialID = this.projectClonedInitial._id;

      // We create the clone of the project, the ID of the clone, the new name and the isInitialProject to false
      this.projectToClone._id = new mongoose.Types.ObjectId(); 
      this.projectToClone.name = this.projects[this.projectToClone.tableIndex].name + "_copy_" + nextNumCopies;
      this.projectToClone.numCopies = 0;
      this.projectToClone.isInitialProject = new Boolean(false);

      // We create a copy of the clone for create a initial project to the clone
      this.projectClonedInitial._id = new mongoose.Types.ObjectId();
      this.projectClonedInitial.name = this.projects[this.projectToClone.tableIndex].name + "_copy_" + nextNumCopies
      this.projectClonedInitial.numCopies = 0;

      // Send to DB the clone of the project
      axios.post('/projects', this.projectToClone)
      .then((req) => {
        // Copy the clone ID for the initialProject value of the initial project
        this.projectClonedID = req.data._id;
        this.projectClonedInitial.initialProject = req.data._id;
        
        // Send to DB the initial project
        axios.post('/projects', this.projectClonedInitial)
        .then( (response) => {
          // Copy the initial project ID for the clone project
          this.projectInitialID = response.data._id;
          this.projectToClone.initialProject = this.projectInitialID;

          // Send to DB the update of the clone project with the initialProject value updated
          axios.put('/projects/' + this.projectClonedID, this.projectToClone)
          .catch((e) => {
            console.log('error ', e);
          })

          // Copiamos para el clon los partners
          axios.get(`/partners?projectId=`+projectOriginalID)
          .then((responsePartners) => {
            for (var partner of responsePartners.data){
              partner._id = new mongoose.Types.ObjectId();
              partner.project = this.projectClonedID;
              axios.post('/partners', partner)
              .catch((error) =>{
                console.log(error);
              })
              
            }
            this.projects[this.projectToClone.tableIndex].numCopies = nextNumCopies;
            axios.put('/projects/' + projectOriginalID, this.projects[this.projectToClone.tableIndex])
            .catch((e) => {
              console.log('error ', e);
            })

            this.projects.push(this.projectToClone);
            this.projectToClone = {};
          })
          .catch((error)=>{
              this.errors = error.response.data
          })

          // Copiamos para el initial los partners
          axios.get(`/partners?projectId=`+projectOriginalInitialID)
          .then((responsePartners) => {
            for (var partner of responsePartners.data){
              partner._id = new mongoose.Types.ObjectId();
              partner.project = this.projectInitialID;
              axios.post('/partners', partner)
            }
            this.projectClonedInitial = {};
          })
          .catch((error)=>{
              this.errors = error.response.data
          })




          // Copiamos para el clon los printable deliverables del original
          this.axios.get(`/printableDeliverables?projectId=`+ projectOriginalID)
          .then((responsePD) => {
            for (let printableDeliverable of responsePD.data){
              printableDeliverable._id = new mongoose.Types.ObjectId();
              printableDeliverable.project = this.projectClonedID;
              axios.post('/printableDeliverables', printableDeliverable)
              .catch((error) =>{console.log(error)})
            }
          })
          .catch((e)=>{
            console.log('error', e);
          })
          
          // Copiamos para el clon del initial los printable deliverables del initial
          this.axios.get(`/printableDeliverables?projectId=`+ projectOriginalInitialID)
          .then((responsePD) => {
            for (let printableDeliverable of responsePD.data){
              printableDeliverable._id = new mongoose.Types.ObjectId();
              printableDeliverable.project = this.projectInitialID;
              axios.post('/printableDeliverables', printableDeliverable)
              .catch((error) =>{console.log(error)}) 
            }
          })
          .catch((e)=>{
            console.log('error', e);
          })
          

          // Copiamos para el clon del original los customs del original
          axios.get('/customs?projectId=' + projectOriginalID, { params: {
              projectId: projectOriginalID
            }
          })
          .then( (responseCustom) => {
            for(let custom of responseCustom.data) {
              custom._id = new mongoose.Types.ObjectId();
              custom.project = this.projectClonedID;
              axios.post('/customs', custom)
              .catch((e)=>{
                console.log('error' + e);
              })
                          }
          })
          .catch((e)=>{
            console.log('error' + e);
          })

          // Copiamos los customs del initial para el clon del initial
          axios.get('/customs?projectId=' +  projectOriginalInitialID, { params: {
              projectId:  projectOriginalInitialID
            }
          })
          .then( (responseCustom) => {
            for(let custom of responseCustom.data) {
              custom._id = new mongoose.Types.ObjectId();
              custom.project = this.projectInitialID;

              axios.post('/customs', custom)
              .catch((e)=>{
                console.log('error' + e);
              })
            }
          })
          .catch((e)=>{
            console.log('error' + e);
          })

          // Copiamos los external experts del original para su clon
          this.axios.get(`/externalExperts?projectId=` + projectOriginalID)
          .then((response) => {
            for(let externalExpert of response.data) {
              externalExpert._id = new mongoose.Types.ObjectId();
              externalExpert.project = this.projectClonedID;

              axios.post('/externalExperts', externalExpert)
              .catch((e)=>{
                console.log('error' + e);
              })
            }
          })
          .catch((e)=>{
            console.log('error' + e);
          })


          // Copiamos los external experts del initial para el clon del initial
          this.axios.get(`/externalExperts?projectId=` + projectOriginalInitialID)
          .then((response) => {
            for(let externalExpert of response.data) {
              externalExpert._id = new mongoose.Types.ObjectId();
              externalExpert.project = this.projectInitialID;

              axios.post('/externalExperts', externalExpert)
              .catch((e)=>{
                console.log('error' + e);
              })
            }
          })
          .catch((e)=>{
            console.log('error' + e);
          })

          // Copiamos los events del original para su clon
          this.axios.get(`/events?projectId=` + projectOriginalID)
          .then((response) => {
          for(let event of response.data) {
              event._id = new mongoose.Types.ObjectId();
              event.project = this.projectClonedID;

              axios.post('/events', event)
              .catch((e)=>{
                console.log('error' + e);
              })
            }

          })
          .catch((e)=>{
            console.log('error' + e);
          })

          // Copiamos los events del initial para el clon del initial
          this.axios.get(`/events?projectId=` + projectOriginalInitialID)
          .then((response) => {
          for(let event of response.data) {
              event._id = new mongoose.Types.ObjectId();
              event.project = this.projectInitialID;

              axios.post('/events', event)
              .catch((e)=>{
                console.log('error' + e);
              })
            }

          })
          .catch((e)=>{
            console.log('error' + e);
          })
        })
      })
    }
  }
}
</script>

<style>

.pi-trash, .pi-arrow-circle-right, .pi-pencil, .pi-clone {
  font-size: 2rem;
  cursor: pointer;
  color: #495057;
}

.coloredSquare {
  width: 25px;
  height: 25px;
  border-radius: 5px;
}

.greenSquare {
  background-color: rgb(21,153,97);
}

.orangeSquare {
  background-color: rgb(253,198,8);
}

.redSquare {
  background-color: rgb(179,7,27);
}

.greenText {
  color: rgb(21,153,97);
}

.orangeText {
  color: rgb(253,198,8);
}

.redText {
  color: rgb(179,7,27);
}

.wrapper {
  display: flex;
}

</style>
