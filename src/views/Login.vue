<template>
  
  <Topbar />

  <div class="grid" style="justify-content: center;">
    <div class="col-3">
			<div class="card">
        <form>
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Username</label><br>
                <input type="text" v-model="newAuth.username" name="username" id="usernamedId" />
            </div>

            <div class="form-group">
                <label>Password</label><br>
                <input type="password" v-model="newAuth.password" name="password" id="passwordId" />
            </div>

            <Button type="button" icon="pi pi-check" label="Sign Up" class="p-button-info mt-4" @click="signIn()" />

        </form>
			</div>
		</div>
  </div>
</template>

<script>
import Button from 'primevue/button'
import axios from "axios";
import Topbar from '@/components/Topbar.vue';

export default {
  name: 'Login',
  components: {
    Button,
    Topbar
  },
  created(){
    this.signIn();
  },
  data() {
    return {
      newAuth: {
        username: '',
        password: ''
      }
      
    }
  },
  methods: {
    async signIn() {
      var url = '/';
      var username = this.newAuth.username;
      var password = this.newAuth.password;
      var credentials = Buffer.from(username + ':' + password, 'utf8').toString('base64')
      var basicAuth = 'Basic' + credentials;
      console.log(credentials);
      await axios.post(url, {
        headers: {'Authorization' : basicAuth}
      })
      .then((response) => {
        console.log("Response: ", response.data)
        this.$router.push({ path: `/` })
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