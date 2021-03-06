<template>

  <Topbar />

  <div style="display: flex;justify-content: space-evenly; align-items: center;">

    <Toast position="bottom-right"/>

    <div class="card col-12">

      <h1>My projects</h1>

      <DataTable :value="projects" :paginator="true" class="p-datatable-gridlines" dataKey="id" ref="dt" :exportFilename="$store.state.toggleValue == false ? 'WECAREMED - My projects in Design phase' : 'WECAREMED - My projects in Monitoring phase'"
      :rowHover="true" sortMode="multiple" :rows="10" :loading="loading" responsiveLayout="scroll"  v-model:filters="filters"
      filterDisplay="row">
        
        <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <div>
                <router-link to="/createProject">
                  <Button class="p-button-info"><i class="pi pi-plus mr-2"/>Create a new project</Button>
                </router-link>
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

        <Column class="centered-cell" field="callId" header="Call ID" :sortable="true">
          <template #body="slotProps">
            {{slotProps.data.callId}}
          </template>
          <template #filter="{filterModel,filterCallback}">
           <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter centered-cell" placeholder="Search by Call ID" v-tooltip.top.focus="'Filter as you type'"/>
         </template>
        </Column>

        <Column class="centered-cell" field="proposalId" header  ="Proposal ID" :sortable="true">
          
          <template #body="slotProps">
            {{slotProps.data.proposalId}}
          </template>

         <template #filter="{filterModel,filterCallback}">
           <InputText  type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter centered-cell" placeholder="Search by Proposal ID" v-tooltip.top.focus="'Filter as you type'"/>
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
      filters: {
        'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        'callId': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        'proposalId': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
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
      this.projectToClone.from = this.fromAux;
      this.projectToClone.to = this.toAux;

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


            // Volvemos a poner en el formato correcto el from y el to del proyecto original
            // porque lo modificamos para la tabla y que en el CSV salga en el formato correcto
            // Vamos a hacer una copia del proyecto original para enviarlo a la BD con la fecha bien
            // y así no modificar el que utilizamos para la vista y que se vea bien en la tabla
            let projectOriginalCopy = Object.assign({}, this.projects[this.projectToClone.tableIndex])
            projectOriginalCopy.from = this.fromAux;
            projectOriginalCopy.to = this.toAux;
            axios.put('/projects/' + projectOriginalID, projectOriginalCopy)
            .catch((e) => {
              console.log('error ', e);
            })
            // Volvemos a dar el formato correcto para la tabla al proyecto cuando ya lo hemos posteado
            this.projectToClone.from = this.projects[this.projectToClone.tableIndex].from;
            this.projectToClone.to = this.projects[this.projectToClone.tableIndex].to;

            this.projects.unshift(this.projectToClone);
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

          // Ahora vamos a clonar las tablas por defecto del proyecto en Monitoring phase
          axios.get('/dataTables/' + projectOriginalID)
          .then( (responseDataTables) => {
            this.projectToClone.dataTables = responseDataTables.data;

            
            // Se copian las tablas de transportation en el Monitoring del clonado
            axios.get('/dataTables/' + this.projectClonedID)
            .then((responseDataTablesProjectCloned) => {
              let projectClonedTables = responseDataTablesProjectCloned.data;

              // Reasignamos a cada tabla que vamos a copiar, el ID de su correspondiente en el proyecto
              // cuando se creó el clon y el proyecto asociado
              this.projectToClone.dataTables.transportationData._id = projectClonedTables.transportationData._id;
              this.projectToClone.dataTables.transportationData.project = this.projectToClone._id;
      
              axios.put('/dataTables/' + this.projectClonedID, this.projectToClone.dataTables.transportationData, {params: {
              projectId: this.projectClonedID,
              dataTableName: 'transportation'
              }})
              .catch( (error) => {
                console.log("Error: ", error);
              })

              this.projectToClone.dataTables.materialData._id = projectClonedTables.materialData._id;
              this.projectToClone.dataTables.materialData.project = this.projectToClone._id;

              // Se copian las tablas de material en el monitoring del clone
              axios.put('/dataTables/' + this.projectClonedID, this.projectToClone.dataTables.materialData, {params: {
              projectId: this.projectClonedID,
              dataTableName: 'material'
              }})
              .catch( (error) => {
                console.log("Error: ", error);
              })

              this.projectToClone.dataTables.eventsData._id = projectClonedTables.eventsData._id;
              this.projectToClone.dataTables.eventsData.project = this.projectToClone._id;

              // Se copian las tablas de events en el monitoring del clone
              axios.put('/dataTables/' + this.projectClonedID, this.projectToClone.dataTables.eventsData, {params: {
                projectId: this.projectClonedID,
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



          // Ahora vamos a clonar las tablas por defecto del proyecto en Design phase
          axios.get('/dataTables/' + projectOriginalInitialID)
          .then( (responseDataTablesInitial) => {
            this.projectClonedInitial.dataTables = responseDataTablesInitial.data;
            
            
            // Se copian las tablas de transportation en el Design del clonado
            axios.get('/dataTables/' + this.projectInitialID)
            .then((responseDataTablesProjectClonedInitial) => {
              let projectClonedTablesInitial = responseDataTablesProjectClonedInitial.data;

              // Reasignamos a cada tabla que vamos a copiar, el ID de su correspondiente en el proyecto
              // cuando se creó el clon y el proyecto asociado
              this.projectClonedInitial.dataTables.transportationData._id = projectClonedTablesInitial.transportationData._id;
              this.projectClonedInitial.dataTables.transportationData.project = this.projectClonedInitial._id;
      
              axios.put('/dataTables/' + this.projectInitialID, this.projectClonedInitial.dataTables.transportationData, {params: {
              projectId: this.projectInitialID,
              dataTableName: 'transportation'
              }})
              .catch( (error) => {
                console.log("Error: ", error);
              })

              this.projectClonedInitial.dataTables.materialData._id = projectClonedTablesInitial.materialData._id;
              this.projectClonedInitial.dataTables.materialData.project = this.projectClonedInitial._id;

              // Se copian las tablas de material en el design del clone
              axios.put('/dataTables/' + this.projectInitialID, this.projectClonedInitial.dataTables.materialData, {params: {
              projectId: this.projectInitialID,
              dataTableName: 'material'
              }})
              .catch( (error) => {
                console.log("Error: ", error);
              })

              this.projectClonedInitial.dataTables.eventsData._id = projectClonedTablesInitial.eventsData._id;
              this.projectClonedInitial.dataTables.eventsData.project = this.projectClonedInitial._id;

              // Se copian las tablas de events en el monitoring del clone
              axios.put('/dataTables/' + this.projectInitialID, this.projectClonedInitial.dataTables.eventsData, {params: {
                projectId: this.projectInitialID,
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

        })
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
