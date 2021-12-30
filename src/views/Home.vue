<template>

  <Topbar />
  
  <div style="display: flex;justify-content: space-evenly; align-items: center;">

    <Toast position="bottom-right"/>

    
    <div class="card col-8">
      <h1>My projects</h1>

      <DataTable :value="projects" :paginator="true" class="p-datatable-gridlines" dataKey="id"
      :rowHover="true" sortMode="multiple" :rows="5" :loading="loading" responsiveLayout="scroll">
        
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
            {{slotProps.data.from}}
          </template>
        </Column>

        <Column field="to" header="To" :sortable="true">
        <template #body="slotProps">
            {{slotProps.data.to}}
          </template>
        </Column>

        <template v-if="!this.$store.state.toggleValue">
          <Column field="initialCF" header="CF Estimation" :sortable="true">
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
            <router-link :to="'/projects/' + this.projects[slotProps.index]._id + '?advancedMode=' + this.$store.state.toggleValue">
              <i class="pi pi-arrow-circle-right mr-3" />
            </router-link>
            <router-link :to="'/editProject/' + this.projects[slotProps.index]._id">
              <i class="pi pi-pencil mr-3" />
            </router-link>
            <router-link to="/">
              <i class="pi pi-trash" @click="confirmDeleteProject(slotProps.index)" />
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
          
    </div>
    
    <div class="card col-2" style="height: fit-content;">
      <h5>{{this.$store.state.toggleValue ? "CF Index colors" : "CF Estimation colors"}}</h5>
        <div class="wrapper"><div class="coloredSquare greenSquare mb-2 mr-2"/> <p class="legendText">0-3: Ideal</p></div>
        <div class="wrapper"><div class="coloredSquare orangeSquare mb-2 mr-2"/><p class="legendText">3-5: Improvable</p></div>
        <div class="wrapper"><div class="coloredSquare redSquare mr-2"/>   <p class="legendText">5-10: Needs attention</p></div>
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
      projects: []
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
      this.axios.get('/projects', {
        auth: {
              username: "wecaremed",
              password: "supersecret"
          }})
      .then((response) => {
        console.log(response.data)
        this.projects = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    getTextColorFromCFIndex(cfIndex) {
      if (cfIndex < 3)
        return "greenText"
      else if (cfIndex > 3 & cfIndex < 5)
        return "orangeText"
      else
        return "redText"
    },
    confirmDeleteProject(index) {
      console.log("Hola: ", this.projectToDelete)
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
    }
  }
}
</script>

<style>

.pi-trash, .pi-arrow-circle-right, .pi-pencil {
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
