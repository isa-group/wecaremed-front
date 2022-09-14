<template>

  <Topbar />

  <div style="display: flex;justify-content: space-evenly; align-items: center;">

    <Toast position="bottom-right"/>

    <div class="card col-12">

      <h1>My projects</h1>

      <DataTable :value="projects" :paginator="true" class="p-datatable-gridlines" dataKey="id" ref="dt" :exportFilename="$store.state.toggleValue == false ? 'WECAREMED - My projects in Design phase' : 'WECAREMED - My projects in Monitoring phase'"
      :rowHover="true" sortMode="multiple" :rows="10" :loading="loading" responsiveLayout="scroll"  v-model:filters="filters"
      filterDisplay="row" @filter="calculateDifferenceInCF($event)">
        
        <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <div>
                <router-link to="/createProject">
                  <Button class="p-button-info h-full font-bold"><i class="pi pi-plus mr-2"/>Create a new project</Button>
                </router-link>
              </div>

              <div class="text-center">
                <h3 v-if="Object.values(filters).length > 0 && Object.values(filters).some(v => v.value)">Difference in CF between the "Design" and "Monitoring" phases: {{filteredValues}}</h3>
              </div>

              <Button icon="pi pi-external-link" :label="$store.state.toggleValue == false ? 'Export Design phase data to CSV' 
              : 'Export Monitoring phase data to CSV'" @click="exportCSV($event)" />
            </div>
        </template>

        <template #empty>
            No projects found.
        </template>

        <template #loading>
            Loading projects. Please wait.
        </template>

        <Column class="centered-cell" field="name" header="Name" :sortable="true">
          <template #body="slotProps">
            {{slotProps.data.name}}
          </template>
          <template #filter="{filterModel,filterCallback}">
           <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter centered-cell" placeholder="Search by name" v-tooltip.top.focus="'Filter as you type'"/>
         </template>
        </Column>

        <Column class="centered-cell" field="status" header="Status" :sortable="true">
          <template #body="slotProps">
            {{slotProps.data.status}}
          </template>
          <template #filter="{filterModel,filterCallback}">
           <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter centered-cell" placeholder="Search by Status" v-tooltip.top.focus="'Filter as you type'"/>
         </template>
        </Column>

        <Column class="centered-cell" field="callId" header="Call ID" :sortable="true">
          <template #body="slotProps">
            {{slotProps.data.callId}}
          </template>
          <template #filter="{filterModel,filterCallback}">
           <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter centered-cell" placeholder="Search by Call ID" v-tooltip.top.focus="'Filter as you type'"/>
         </template>
        </Column>

        <Column class="centered-cell" field="proposalId" header="Project number" :sortable="true">
          <template #body="slotProps">
            {{slotProps.data.proposalId}}
          </template>
         <template #filter="{filterModel,filterCallback}">
           <InputText  type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter centered-cell" placeholder="Search by Project number" v-tooltip.top.focus="'Filter as you type'"/>
         </template>
        </Column>

        <Column class="centered-cell" field="from" header="From" :sortable="true">
          <template #body="slotProps">
            {{slotProps.data.from}}
          </template>
        </Column>

        <Column class="centered-cell" field="to" header="To" :sortable="true">
          <template #body="slotProps">
            {{slotProps.data.to}}
          </template>
        </Column>

        <template v-if="!this.$store.state.toggleValue">
          <Column class="centered-cell" field="initialCF" header="CF Estimation (t CO₂e)" :sortable="true">
            <template #body="slotProps">
              <span :class="getTextColorFromCFIndex(slotProps.data.initialProjectData.initialCF)">{{slotProps.data.initialProjectData.initialCF}}</span>
            </template>
          </Column>
        </template>

        <template v-else>
          <Column class="centered-cell" style="width: 7%;" field="initialCF" header="Design Phase CF (t CO₂e)" :sortable="true">
            <template #body="slotProps">
              <span :class="getTextColorFromCFIndex(slotProps.data.initialProjectData.initialCF)">{{slotProps.data.initialProjectData.initialCF}}</span>
            </template>
          </Column>

          <Column class="centered-cell" style="width: 7%;" field="currentCF" header="Monitoring Phase CF (t CO₂e)" :sortable="true">
            <template #body="slotProps">
              <span :class="getTextColorFromCFIndex(slotProps.data.currentCF)">{{slotProps.data.currentCF}}</span>
            </template>
          </Column>

          <Column class="centered-cell" style="width: 7%;" field="differenceCF" header="Difference in CF between the two phases" :sortable="true">
            <template #body="slotProps">
              <span :class="getTextColorFromCFIndex(slotProps.data.differenceCF)">{{slotProps.data.differenceCF}}</span>
            </template>
         </Column>
        </template>

        

        <Column class="centered-cell" field="actions" header="Actions" :exportable="false">
          <template #body="slotProps">
            <router-link :to="'/projects/' + (this.$store.state.toggleValue == true ? slotProps.data._id : slotProps.data.initialProject)">
              <i class="pi pi-arrow-circle-right mr-3" v-tooltip.top="'Go to project'" />
            </router-link>
            <router-link :to="'/editProject/' + (slotProps.data._id)">
              <i class="pi pi-pencil mr-3" v-tooltip.top="'Edit project general data'" />
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
import {FilterMatchMode} from 'primevue/api';
import InputText from 'primevue/inputtext';

export default {
  name: 'Home',
  components: {
    Button,
    DataTable,
    Column,
    Topbar,
    Dialog,
    InputText,
    Toast
  },
  data() {
    return {
      deleteProjectDialog: false,
      loading: true,
      projects: [],
      initialProjects: [],
      cloneProjectDialog: false,
      filteredValues: [],
      filters: {
        'name': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'status': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'callId': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'proposalId': {value: null, matchMode: FilterMatchMode.CONTAINS}
      },
      fromAux: "",
      toAux:""
    }
  },
  created() {
    this.getProjects();
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    calculateDifferenceInCF(event) {
      this.filteredValues = event.filteredValue.map(p => p.differenceCF).reduce((a, b) => a + b, 0)
    },
    getProjects() {

      this.axios.get('/projects/initialProjects', { params: {
        userId: this.$store.state.userId,
      }})
      .then((response) => {
        this.initialProjects = response.data;

        this.axios.get('/projects', { params: {
        userId: this.$store.state.userId,
        }})
        .then((res) => {
          for (let project of res.data) {
            let result = {}
            for (let initialProject of this.initialProjects) {
              if (initialProject._id === project.initialProject) {
                result = initialProject
              }
            }
            project.initialProjectData = result
            project.differenceCF = this.round(project.initialProjectData.initialCF - project.currentCF)
            this.fromAux = project.from;
            this.toAux = project.to;
            project.from = (new Date(project.from).getMonth() + 1).toString().padStart(2, "0") + '/' + new Date(project.from).getFullYear()
            project.to = (new Date(project.to).getMonth() + 1).toString().padStart(2, "0") + '/' + new Date(project.to).getFullYear()
            this.projects.unshift(project);
          }
        })
        .catch((e)=>{
          console.log('error' + e);
        })

      })
      .catch((e)=>{
        console.log('error' + e);
      })

    },
    exportCSV() {
      this.$refs.dt.exportCSV();
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

    async confirmCloneProject(index) {
      this.projectToClone = Object.assign({}, this.projects[index]);
      this.projectToClone.tableIndex = index;
      this.projectClonedInitial = await this.getProjectFromDB(this.projects[index].initialProject);
      this.cloneProjectDialog = true;
    },

    async getProjectFromDB(projectID){
      var project = {};

      await axios.get(`/projects/` + projectID)
      .then((response) => {
        project = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      });

      return project;
    },
    
    async cloneProject() { 
      let nextNumCopies = this.projects[this.projectToClone.tableIndex].numCopies + 1; // Variable para actualizar el número de copias del proyecto que clonamos
      this.cloneProjectDialog = false;
      this.submitted = true

      let projectOriginal = this.projects[this.projectToClone.tableIndex];
      
      let projectOriginalID = projectOriginal._id;
      let projectOriginalInitialID = this.projectClonedInitial._id;

      // Asignamos al proyecto ya copiado las propiedades correctas para un nuevo proyecto (número de copias a 0...)
      this.projectToClone._id = new mongoose.Types.ObjectId(); 
      this.projectToClone.name = projectOriginal.name + "_copy_" + nextNumCopies;
      this.projectToClone.numCopies = 0;
      this.projectToClone.isInitialProject = new Boolean(false);
      this.projectToClone.from = this.fromAux;
      this.projectToClone.to = this.toAux;

      // Asignamos las propiedades adecuadas para el proyecto en Design phase asociado al clon
      this.projectClonedInitial._id = new mongoose.Types.ObjectId();
      this.projectClonedInitial.name = projectOriginal.name + "_copy_" + nextNumCopies
      this.projectClonedInitial.numCopies = 0;

      // Enviamos a la BD el proyecto clon en Monitoring phase y obtenemos su respuesta para tener el id asociado del clon
      let responsePostCloneMonitoring = await  this.postProject(this.projectToClone);
      // En la respuesta, copiamos el id que ha generado mongoose del proyecto clon para asociárselo 
      // al proyecto clon en Design phase 
      this.projectClonedID = responsePostCloneMonitoring._id;
      this.projectClonedInitial.initialProject = responsePostCloneMonitoring._id;

      // Enviamos a la BD el proyecto clon en Design phase (el proyecto initial asociado)
      let responsePostCloneDesign = await this.postProject(this.projectClonedInitial);
      // En la respuesta, copiamos el id que ha generado mongoose del proyecto clon en design phase
      // para asociárselo al clon del monitoring phase
      this.projectInitialID = responsePostCloneDesign._id;
      this.projectToClone.initialProject = this.projectInitialID;

      // Actualizamos en la DB el proyecto en Monitoring phase con la propiedad que lo asocia con su Design phase
      this.updateProject(this.projectClonedID,this.projectToClone);

      // Clonamos los partners del Monitoring phase
      this.clonePartners(projectOriginalID, this.projectClonedID);
      // Clonamos los partners del Design phase
      this.clonePartners(projectOriginalInitialID, this.projectInitialID);

      // Actualizamos la propiedad de número de copias del proyecto original
      projectOriginal.numCopies = nextNumCopies;
      // Volvemos a poner en el formato correcto el from y el to del proyecto original
      // porque lo modificamos para la tabla y que en el CSV salga en el formato correcto
      // Vamos a hacer una copia del proyecto original para enviarlo a la BD con la fecha bien
      // y así no modificar el que utilizamos para la vista y que se vea bien en la tabla
      let projectOriginalCopy = Object.assign({}, projectOriginal);
      projectOriginalCopy.from = this.fromAux;
      projectOriginalCopy.to = this.toAux;
      this.updateProject(projectOriginalID,projectOriginalCopy);

      // // Volvemos a dar el formato correcto para la tabla al proyecto cuando ya lo hemos posteado
      this.projectToClone.from = this.projects[this.projectToClone.tableIndex].from;
      this.projectToClone.to = this.projects[this.projectToClone.tableIndex].to;

      this.projects.unshift(this.projectToClone);
      this.projectToClone = {};

      // Copiamos para el clon del Monitoring phase los printable deliverables del original
      this.clonePrintableDeliverables(projectOriginalID, this.projectClonedID);
      // Copiamos para el clon del Design phase los printable deliverables del original
      this.clonePrintableDeliverables(projectOriginalInitialID, this.projectInitialID);

      // Copiamos para el clon del Monitoring phase los customs del original
      this.cloneCustoms(projectOriginalID, this.projectClonedID);
      // Copiamos para el clon del Design phase los customs del original
      this.cloneCustoms(projectOriginalInitialID, this.projectInitialID);

      // Copiamos los external experts del original en Monitoring phase para su clon en Monitoring phase
      this.cloneExternalExperts(projectOriginalID, this.projectClonedID);
      // Copiamos los external experts del original en Design phase para su clon en Design phase
      this.cloneExternalExperts(projectOriginalInitialID, this.projectInitialID);

      // Copiamos los events del original en Monitoring phase para su clon en Monitoring phase
      this.cloneEvents(projectOriginalID, this.projectClonedID);
      // Copiamos los events del original en Design phase para su clon en Design phase
      this.cloneEvents(projectOriginalInitialID, this.projectInitialID);

      // Ahora vamos a clonar las tablas por defecto del proyecto en Monitoring phase
      this.cloneDefaultTables(projectOriginalID, this.projectToClone, this.projectClonedID);
      // Ahora vamos a clonar las tablas por defecto del proyecto en Design phase
      this.cloneDefaultTables(projectOriginalInitialID, this.projectClonedInitial, this.projectInitialID);
    },

    async postProject(project) {

      let response = {};

      await axios.post('/projects', project)
      .then((req) => {
        response = req.data;
      })
      .catch( (error) => {
            console.log('error' + error);
      })
      
      return response;
    },

    updateProject(projectID, project) {
      axios.put('/projects/' + projectID, project)
      .catch((e) => {
        console.log('error ', e);
      })
    },

    clonePartners(projectOriginalID, projectClonID) {
      // Copiamos para el clon los partners
      
      axios.get(`/partners?projectId=`+projectOriginalID)
      .then((responsePartners) => {
        for (var partner of responsePartners.data){
          partner._id = new mongoose.Types.ObjectId();
          partner.project = projectClonID;
          axios.post('/partners', partner)
          .catch((error) =>{
            console.log(error);
          })
          
        }
      })
      .catch((errorGet) =>{
            console.log(errorGet);
      })

    },

    clonePrintableDeliverables(projectOriginalID, projectClonID) {
      // Copiamos para el clon los printable deliverables del original
      axios.get(`/printableDeliverables?projectId=`+ projectOriginalID)
      .then((responsePD) => {
        for (let printableDeliverable of responsePD.data){
          printableDeliverable._id = new mongoose.Types.ObjectId();
          printableDeliverable.project = projectClonID;
          axios.post('/printableDeliverables', printableDeliverable)
          .catch((error) =>{console.log(error)})
        }
      })
      .catch((e)=>{
        console.log('error', e);
      })
    },

    cloneCustoms(projectOriginalID, projectClonID) {
      // Copiamos para el clon del original los customs del original
      axios.get('/customs?projectId=' + projectOriginalID, { params: {
          projectId: projectOriginalID
        }
      })
      .then( (responseCustom) => {
        for(let custom of responseCustom.data) {
          custom._id = new mongoose.Types.ObjectId();
          custom.project = projectClonID;
          axios.post('/customs', custom)
          .catch((e)=>{
            console.log('error' + e);
          })
                      }
      })
      .catch((e)=>{
        console.log('error' + e);
      })      
    },

    cloneExternalExperts(projectOriginalID, projectClonID) {
      axios.get(`/externalExperts?projectId=` + projectOriginalID)
      .then((response) => {
        for(let externalExpert of response.data) {
          externalExpert._id = new mongoose.Types.ObjectId();
          externalExpert.project = projectClonID;

          axios.post('/externalExperts', externalExpert)
          .catch((e)=>{
            console.log('error' + e);
          })
        }
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },

    cloneEvents(projectOriginalID, projectClonID) {
      axios.get(`/events?projectId=` + projectOriginalID)
      .then((response) => {
      for(let event of response.data) {
          event._id = new mongoose.Types.ObjectId();
          event.project = projectClonID;

          axios.post('/events', event)
          .catch((e)=>{
            console.log('error' + e);
          })
        }

      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },

    cloneDefaultTables(projectOriginalID, projectClon, projectClonID) {
      axios.get('/dataTables/' + projectOriginalID)
      .then( (responseDataTables) => {
        projectClon.dataTables = responseDataTables.data;

        
        // Se copian las tablas de transportation en el Monitoring del clonado
        axios.get('/dataTables/' + projectClonID)
        .then((responseDataTablesProjectCloned) => {
          let projectClonedTables = responseDataTablesProjectCloned.data;

          // Reasignamos a cada tabla que vamos a copiar, el ID de su correspondiente en el proyecto
          // cuando se creó el clon y el proyecto asociado
          projectClon.dataTables.transportationData._id = projectClonedTables.transportationData._id;
          projectClon.dataTables.transportationData.project = projectClon._id;
  
          axios.put('/dataTables/' + projectClonID, projectClon.dataTables.transportationData, {params: {
          projectId: projectClonID,
          dataTableName: 'transportation'
          }})
          .catch( (error) => {
            console.log("Error: ", error);
          })

          projectClon.dataTables.materialData._id = projectClonedTables.materialData._id;
          projectClon.dataTables.materialData.project = projectClon._id;

          // Se copian las tablas de material en el monitoring del clone
          axios.put('/dataTables/' + projectClonID, projectClon.dataTables.materialData, {params: {
          projectId: projectClonID,
          dataTableName: 'material'
          }})
          .catch( (error) => {
            console.log("Error: ", error);
          })

          projectClon.dataTables.eventsData._id = projectClonedTables.eventsData._id;
          projectClon.dataTables.eventsData.project = projectClon._id;

          // Se copian las tablas de events en el monitoring del clone
          axios.put('/dataTables/' + projectClonID, projectClon.dataTables.eventsData, {params: {
            projectId: projectClonID,
            dataTableName: 'events'
          }})
          .catch( (error) => {
            console.log("Error: ", error);
          })


        })
        
      })
      .catch( (errorDT) => {
        console.log('error' + errorDT);
      })




    },

    round(num) {
      return Math.round((num + Number.EPSILON) * 100) / 100
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

.p-column-header-content {
  justify-content: center;
}

.centered-cell {
  text-align: center !important;
}

</style>
