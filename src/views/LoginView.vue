<template>
  <div class="login">
    <div id="loginForm" data-aos="fade-down">
      <h1>Login</h1><br>
      <!-- <form @submit.prevent="Login"> -->
        <label>Username</label> <br />
        <input
          type="text"
          placeholder="username"
          v-model="formData.username"
        /><br />
        <label>Password</label> <br />
        <input type="password" placeholder="Password" 
        v-model="formData.password"/>
        <br />
        <button @click="Login">Login</button>
      <!-- </form> -->
    </div>
  </div>
</template>

<script>
import AOS from "aos";

// Vue.use(VueToast);
AOS.init({
    // delay: 100
    duration: 400,
    easing: "ease-in"
});
import { mapActions, mapGetters } from "vuex";

import Vue from "vue"
import Toast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

Vue.use(Toast);

export default {
  name: "LoginView",
  computed:{
    ...mapGetters(["getLogin"])
  },
  methods:{
    ...mapActions(["LOGIN"]),
    Login() {
      this.$store.dispatch("LOGIN", {payload: this.formData});
      // if(sessionStorage.getItem("userID")) {
        // debugger;
        this.$toast.success('Successfully logged in', {position: "top"});
        this.$router.push("/")
      // }
    }
  },
  data() {
    return {  
      formData: {
        username: "",
        password: "",
        platformId: "quiz",
      }
    };
  },
};
</script>

<style scoped>
.login {
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  margin: 30px 0 100px 0;
  /* height: 100vh; */
  /* background-color: rgb(121, 200, 115); */
}

h1 {
  display: inline;
  margin-bottom: 20px;
}

.loginForm {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  margin-right: 30px;
  padding: 50px 50px;
  border: 2px solid rgba(3, 101, 214, 0.866);
  /* background-color: rgb(224, 126, 80); */
  transition: box-shadow 1s ease-in-out;
}

.loginForm:hover {
    box-shadow: 10px 13px 0px rgba(3, 102, 214, 0.3);
}

label {
  font-size: 22px;
  margin-bottom: 10px;
}

input {
  height: 45px;
  width: 330px;
  border: none;
  font-size: 18px;
  margin-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  border-radius: 5px;
}

select {
  height: 45px;
  width: 330px;
  border: none;
  font-size: 18px;
  margin-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  border-radius: 5px;
}

input:active {
    
}

input::placeholder {
  font-size: 22px;
}

button {
  width: 290px;
  height: 45px;
  border: none;
  font-size: 22px;
  margin-top: 20px;
  border-radius: 8px;
}

button:hover {
  color: black;
  box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 4px;
}

/* @media (max-width:412px) {
     .loginForm {
      height: 100px;
     }
} */
</style>
