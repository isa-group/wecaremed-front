<template>

  <Topbar />
  
  <div style="display: flex;justify-content: space-evenly; align-items: center;">

    <Toast position="bottom-right"/>

    <div class="card col-8">
      <h1>My projects</h1>

      <DataTable :value="projects" :paginator="true" class="p-datatable-gridlines" dataKey="id"
      :rowHover="true" sortMode="multiple" :rows="5" :loading="loading" responsiveLayout="scroll"
      @page="currentPageProjectsTable = $event.page">
        
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
          <Column field="initialCF" header="CF Estimation (t CO2e)" :sortable="true">
            <template #body="slotProps">
              <span :class="getTextColorFromCFIndex(slotProps.data.initialCF)">{{slotProps.data.initialCF}}</span>
            </template>
          </Column>
        </template>

        <template v-else>
          <Column field="initialCF" header="Initial CF" :sortable="true">
            <template #body="slotProps">
              <span :class="getTextColorFromCFIndex(slotProps.data.initialCF)">{{slotProps.data.initialCF}}</span>
            </template>
          </Column>

          <Column field="currentCF" header="Current CF" :sortable="true">
            <template #body="slotProps">
              <span :class="getTextColorFromCFIndex(slotProps.data.currentCF)">{{slotProps.data.currentCF}}</span>
            </template>
          </Column>
        </template>

        <Column field="actions" header="Actions">
          <template #body="slotProps">
            <router-link :to="'/projects/' + (this.projects[slotProps.index + currentPageProjectsTable * 5]._id)">
              <i class="pi pi-arrow-circle-right mr-3" />
            </router-link>
            <router-link :to="'/editProject/' + (this.projects[slotProps.index + currentPageProjectsTable * 5]._id)">
              <i class="pi pi-pencil mr-3" />
            </router-link>
            <router-link to="/">
              <i class="pi pi-clone mr-3" @click="confirmCloneProject(slotProps.index + currentPageProjectsTable * 5)" />
            </router-link>
            <router-link to="/">
              <i class="pi pi-trash" @click="confirmDeleteProject(slotProps.index + currentPageProjectsTable * 5)" />
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
    
    <div class="card col-2" style="height: fit-content;">
      <h5>{{this.$store.state.toggleValue ? "CF Index colors" : "CF Estimation colors"}}</h5>
        <div class="wrapper"><div class="coloredSquare greenSquare mb-2 mr-2"/> <p class="legendText">0-150: Ideal</p></div>
        <div class="wrapper"><div class="coloredSquare orangeSquare mb-2 mr-2"/><p class="legendText">150-250: Improvable</p></div>
        <div class="wrapper"><div class="coloredSquare redSquare mr-2"/>   <p class="legendText">>250: Needs attention</p></div>
    </div>
  
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
      currentPageProjectsTable: 0,
      cloneProjectDialog: false,
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
      if (cfIndex < 150)
        return "greenText"
      else if (cfIndex > 150 & cfIndex < 250)
        return "orangeText"
      else
        return "redText"
    },
    confirmDeleteProject(index) {
      this.projectToDelete = this.projects[index]
      this.deleteProjectDialog = true;
    },
    deleteProject() {
      axios.delete('/projects/' + this.projectToDelete._id)
      .then((response) => {
        console.log(response.data)
        this.projects.splice(this.projects.indexOf(this.projectToDelete), 1)
        this.deleteProjectDialog = false
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Project deleted', life: 3000});
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    confirmCloneProject(index) {
      this.projectToClone = Object.assign({}, this.projects[index]);
      this.projectToClone.tableIndex = index;
      this.cloneProjectDialog = true;
    },
    cloneProject() { 
      let nextNumCopies = this.projects[this.projectToClone.tableIndex].numCopies + 1;
      let projectToCloneId = this.projects[this.projectToClone.tableIndex]._id;
      this.cloneProjectDialog = false;
      this.submitted = true
      
      this.projectToClone._id = new mongoose.Types.ObjectId(); 
      this.projectToClone.name = this.projects[this.projectToClone.tableIndex].name + "_copy_" + nextNumCopies;
      this.newUserId = this.$store.state.userId;
      axios.post('/projects', this.projectToClone,{
        auth: {
            username: this.$store.state.username,
            password: this.$store.state.password
          }
      })
      .then((req) => {
        axios.get(`/partners?projectId=`+projectToCloneId)
          .then((response) => {
            for (let partner of response.data){
              partner._id = new mongoose.Types.ObjectId();
              partner.project = req.data._id;
              axios.post('/partners', partner)
              .catch((error) =>{console.log(error)})
              }
            })
            .catch((e)=>{
              console.log('error', e);
            })

            this.axios.get(`/printableDeliverables?projectId=`+ projectToCloneId)
            .then((response) => {
              for (let printableDeliverable of response.data){
                printableDeliverable._id = new mongoose.Types.ObjectId();
                printableDeliverable.project = req.data._id;
                axios.post('/printableDeliverables', printableDeliverable)
                .catch((error) =>{console.log(error)})
              }
            })
            .catch((e)=>{
              console.log('error', e);
            })
            this.projects[this.projectToClone.tableIndex].numCopies = nextNumCopies;
            axios.put('/projects/' + projectToCloneId, this.projects[this.projectToClone.tableIndex])
            .catch((error)=>{
              this.errors = error.response.data
            })
            this.projects[this.projectToClone.tableIndex].numCopies = nextNumCopies;
            this.projects.push(this.projectToClone);
            this.projectToClone = {}
          })
          .catch((error)=>{
            this.errors = error.response.data
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
