<template>
  
  <Toast />

  <div class="grid" style="justify-content: center;">
    <div class="col-4">
			<div class="card">
				<h2>Login/Register</h2>

				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-10">
						<label for="usernameId">Email</label>
            <InputText v-model="username" name="username" id="usernamedId" @keypress.enter="signIn()"
            :class="{'p-invalid': submitted && error.field === 'email'}" />
            <small class="p-error" v-if="submitted && error.field === 'email'" :key="error.message">{{error.message}}</small>
					</div>
        </div>
        <div class="p-fluid formgrid grid">
          <div class="field col-12 md:col-10">
						<label for="usernameId">Password</label>
            <Password v-model="password" name="password" id="passwordId" :feedback="false" @keypress.enter="signIn()" 
            :class="{'p-invalid': submitted && error.field === 'password'}" />
            <small class="p-error" v-if="submitted && error.field === 'password'">{{error.message}}</small>
					</div>
        </div>

        <small class="p-error" v-if="submitted && error.message === 'Missing credentials'">{{error.message}}</small>

        <div class="grid">
          <Button type="button" icon="pi pi-check" label="Log in" class="p-button-info mt-4 mr-2" @click="signIn()" />
          <Button type="button" icon="pi pi-check" label="Register" class="p-button-info mt-4 ml-2" @click="signUp()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import axios from "axios";
import Toast from 'primevue/toast';

export default {
  name: 'Login',
  components: {
    InputText,
    Password,
    Button,
    Toast,
  },
  created(){
    // this.signIn();
  },
  data() {
    return {
      error: {},
      submitted: false,
      username: this.$store.state.username,
      password: this.$store.state.password
    }
  },
  methods: {
    signIn() {
      this.submitted = true
      this.$store.dispatch("saveUsername", this.username);
      this.$store.dispatch("savePassword", this.password);
      
      axios.post('/auth/login', {email: this.username, password: this.password})
      .then((response) => {
        this.$store.dispatch("saveUserId", response.data.userId);
        window.location.href = '/';
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Logged in successfully', life: 3000});
      }).catch(err => {
        this.error = err.response.data
      })    
    },
    signUp() {
      this.submitted = true
      this.$store.dispatch("saveUsername", this.username);
      this.$store.dispatch("savePassword", this.password);
      
      axios.post('/auth/register', {email: this.username, password: this.password})
      .then((response ) => {
        this.$store.dispatch("saveUserId", response.data.userId); 
        window.location.href = '/';
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Registered successfully', life: 3000});
      }).catch(err => {
        this.error = err.response.data
      })    
    }
  }
}
</script>

<style scoped>

.grid {
  justify-content: center;
}
</style>
