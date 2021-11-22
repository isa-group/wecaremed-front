<template>
  
  <Header />

  <div class="wizard">
    <form>

      <div>
        <div class="formRow">
          <label for="projectName">Project Name</label>
          <input type="text" id="projectName" name="projectName" />
        </div>

        <div class="formRow">
          <label for="projectInitialDuration">Project Duration</label>
          <!-- <div id="projectDuration"> -->
            <input type="number" id="projectInitialDuration" name="projectInitialDuration" value="2021"/>
            <span style="position: relative; font-size: 30px; top: 10px; left: 835px; margin: 0 10px"> - </span> 
            <input type="number" id="projectFinalDuration" name="projectFinalDuration" value="2023"/>
          <!-- </div> -->
          
        </div>

        <div class="formRow">
          <label for="projectCallId">Project Call ID</label>
          <input type="text" id="projectCallId" name="projectCallId" />
        </div>

        <div class="formRow">
          <label for="fundingId">Proposal ID</label>
          <input type="text" id="fundingId" name="fundingId" />
        </div>
      </div>

      <div class="buttons">
        <router-link id="create" to="/projectDetailsSimple"><Btn>Create</Btn></router-link>
        <router-link id="cancel" to="/"><Btn>Cancel</Btn></router-link>
      </div>

    </form>
    
  </div>
</template>

<script>
import Btn from '@/components/Btn.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'CreateProject',
  components: {
    Btn,
    Header
  }
}
</script>

<style scoped>

.wizard {
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
}
</style>