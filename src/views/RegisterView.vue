<template>
  <div class="register">
    <div class="registerForm" data-aos="fade-down">
      <h1>Register</h1>
      <form @submit.prevent="addMasterHandler">
        <label>Username</label> <br />
        <input 
        type="text" 
        placeholder="Username" 
        v-model="formData.username" 
        />
        <br />
        <label>firstName</label> <br />
        <input
          type="text"
          placeholder="firstName"
          v-model="formData.firstName"
        />
        <br />
        <label>lastName</label> <br />
        <input 
        type="text" 
        placeholder="lastName" 
        v-model="formData.lastName" 
        />
        <br />
        <label>phoneNumber</label> <br />
        <input
          type="text"
          placeholder="phoneNumber"
          v-model="formData.phoneNumber"
        />

        <br />
        <label>Email</label> <br />
        <input 
        type="text" 
        placeholder="Email" 
        v-model="formData.email" 
        />
        <br />

        <label>Password</label> <br />
        <input
          type="password"
          placeholder="Password"
          v-model="formData.password"
        />
        <br />

        <label>DOB</label> <br />
        <input type="text" placeholder="Date of birth" v-model="formData.dob" />
        <br />

        <button>Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import AOS from "aos";
import { mapActions, mapGetters } from 'vuex';
AOS.init({
  // delay: 100
  duration: 400,
  easing: "ease-in",
});
// import { mapActions, mapGetters } from "vuex";
export default {
  name: "RegisterView",
  data() {
    return {
      formData: {
        username: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password:"",
        email: "",
        dob: "",
        platformId: "quiz",
        isPrivate: true,
      },
    };
  },
  computed: {
    ...mapGetters(["getRegister"]),
  },
  methods: {
    ...mapActions(["REGISTER"]),
    addMasterHandler() {
      this.$toast.success('Register Successfully', {position: 'top'})
      this.$store.dispatch("REGISTER", {payload: this.formData})
      this.$router.push("/login")
    }
  }
};
</script>

<style scoped>
.register {
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

.registerForm {
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

.registerForm:hover {
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
</style>
