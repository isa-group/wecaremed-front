<template>

  <Topbar />
  
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
            <i class="pi pi-arrow-circle-right" />
          </router-link> 
        </template>
      </Column>
    
    </DataTable>
  </div>
  
  <div class="card col-2">
    <h5>{{this.$store.state.toggleValue ? "CF Index colors" : "CF Estimation colors"}}</h5>
      <div class="wrapper"><div class="coloredSquare greenSquare mb-2 mr-2"/> <p class="legendText">0-3: Ideal</p></div>
      <div class="wrapper"><div class="coloredSquare orangeSquare mb-2 mr-2"/><p class="legendText">3-5: Improvable</p></div>
      <div class="wrapper"><div class="coloredSquare redSquare mr-2"/>   <p class="legendText">5-10: Needs attention</p></div>
  </div>
  
</template>

<script>
import Button from 'primevue/button'
import goArrowIcon from "@/assets/go.png"
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Topbar from '@/components/Topbar.vue';

export default {
  name: 'Home',
  components: {
    Button,
    DataTable,
    Column,
    Topbar
  },
  data() {
    return {
      goArrowIcon: goArrowIcon,
      projects: []
    }
  },
  created() {
    this.getProjects();
  },
  methods: {
    getProjects() {
      this.axios.get('/projects')
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
    }
  }
}
</script>

<style>

.legend {
  /* position: absolute; */
  width: 200px;
  height: 140px;
  /* left: 195px; */
  /* top: 400px; */
  border: 2px solid rgb(0 0 0 / 70%);
  text-align: left;
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

/* .legendText {
  bottom: 10px;
  position: relative;
  left: 5px;
} */

/* .fixedHeader {
  position: sticky;
}

#goArrowIcon {
  width: 20px;
  cursor: pointer;
}

.dataTitle {
  position: absolute;
  left: 200px;
  font-size: 30px;
}

.dataTable {
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
}

.dataTable td, .dataTable th {
  border: 2px solid rgb(0 0 0 / 70%);
  padding: 8px;
}

.dataTable tr:nth-child(even){background-color: #f2f2f2;}

.dataTable tr:hover {background-color: #ddd;}

.dataTable th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #04AA6D;
  color: white;
}

.myProjectsTable {
  width: 75%;
  left: 190px;
  top: 90px;
}

#createProjectDiv {
  position: absolute;
  left: 195px;
  top: 669px;
}

.p-button.p-button-success, .p-buttonset.p-button-success > .p-button, .p-splitbutton.p-button-success > .p-button {
    background: #86EFAC;
    border: 1px solid #86EFAC;
    border-radius: 0 10px 10px 0;
}

.p-button.p-button-success:enabled:hover, .p-buttonset.p-button-success > .p-button:enabled:hover, .p-splitbutton.p-button-success > .p-button:enabled:hover {
    background: #65eb95;
    color: #1c2127;
    border-color: #65eb95;
}

.p-inputnumber-button-down {
  border-radius: 10px 0 0 10px;
  background: #f95454;
  border: 1px solid #f95454;
}

.p-button.p-button-danger:enabled:hover, .p-buttonset.p-button-danger > .p-button:enabled:hover, .p-splitbutton.p-button-danger > .p-button:enabled:hover {
    background: #fb7d7d;
    border-color: #fb7d7d;
}

.p-button {
    margin: 0;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    vertical-align: bottom;
    text-align: center;
    overflow: hidden;
    position: relative;
} */

</style>
