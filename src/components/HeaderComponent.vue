<template>
  <div
    class="Header"
  >
  <!-- data-aos="fade-down" -->
    <div class="headerLeft">
      <h1 @click="homeHandler">QuizMaster</h1>
    </div>
    <!-- v-if="getLoginBool" -->
    <div v-if="getLoginBool" class="headerRight">
      <button id="viewContest" @click="viewContestHandler">VIEW PROFILE</button>
      <button id="addContest" @click="addContestHandler">ADD CONTEST</button>
      <button id="logout" @click="logoutHandler">LOGOUT</button>
    </div>
    <div v-if="!getLoginBool" class="headerRight">
      <button id="login" @click="loginHandler">LOGIN</button>
      <button id="signup" @click="registerHandler">SIGNUP</button>
    </div>
    <!-- {{getLoginBool}} -->
  </div>
</template>

<script>
import Vue from "vue"
import Toast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

Vue.use(Toast);


import AOS from "aos";
import { mapActions, mapGetters } from "vuex";
AOS.init();
export default {
  name: "HeaderComponent",
  data() {
    return {
      isNavScrolled: false,
    };
  },
  computed: {
    ...mapGetters(["getLoginBool"]),
  },
  methods: {
    ...mapActions(["RESET_LOGIN"]),
    homeHandler() {
      this.$router.push("/")
    },
    loginHandler() {
      this.$router.push("/login");
    },
    registerHandler() {
      this.$router.push("/register");
    },
    viewContestHandler() {
        
      this.$router.push("/viewContest");
    },
    addContestHandler() {
      this.$router.push("/addContest");
    },
    logoutHandler() {
      console.log(
        "sessionStorage for userName",
        sessionStorage.getItem("userName")
        
      );
      this.$toast.success('Logged Out Successfully', {position: 'top'})
      const payload = {
        username: sessionStorage.getItem("userName"),
        password: "a",
        platformId: "quiz",
      };
      console.log("logout: ", payload);
      this.$store.dispatch("RESET_LOGIN", { payload: payload });
      this.$router.push("/")
    },
    
  },
};
</script>

<style scoped>
.Header {
  /* position: sticky; */
  height: 2rem;
  display: flex;
  flex-direction: row;
  padding: 30px 30px;
  /* justify-content: space-between; */
  /* padding: 30px 30px; */
  /* overflow-y: unset; */
  /* background-color: rgb(129, 129, 226); */
}

.nav-scrolled {
  background-color: blue;
  /* other styles */
}

#login {
  color: rgb(129, 129, 226);
  border: 3px solid rgb(129, 129, 226);
}

#login:hover {
  color: black;
}

#addContest {
  color: rgb(129, 129, 226);
  border: 3px solid rgb(129, 129, 226);
}

#addContest:hover {
  color: black;
}

#signup {
  background-color: rgb(129, 129, 226);
  /* margin-right: 100px; */
}

#logout {
  background-color: rgb(129, 129, 226);
}

h1 {
  /* margin-top: 6px; */
  margin-left: 2rem;
  cursor: pointer;
  /* display: inline; */
  /* margin-right: 30rem; */
}

h1:hover {
  color: rgb(123, 123, 228)
}

.headerLeft {
    /* top: 3rem; */
    /* position: relative; */
    /* margin-top: 2rem; */
    /* display: inline; */
}

.headerRight {
  display: flex;
  margin-left: 30rem;
  /* margin-top: 2px; */
}

button {
  margin: 0 40px;
  font-size: 16px;
  width: 7rem;
  height: 2.5rem;
  color: white;
  letter-spacing: 1px;
  /* float: right; */
  border: none;
  border-radius: 5px;
  background-color: none;
  transition: box-shadow 0.6ms ease-in-out;
}

button:hover {
  color: black;
  box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 4px;
}


@media (max-width: 412px) {
  h1 {
    margin-left: 0.5rem;
  }
}
</style>
