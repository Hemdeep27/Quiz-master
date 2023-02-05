<template>
  <div>
    <!-- <h1>View Contest</h1> -->
    <div class="quizMaster">
        <h1>QuizMaster</h1>
        <h3>followers</h3>
    </div>

    <div class="viewContest">
      <div class="staticContet">
          <h1>Static Contest</h1>
        <div
          v-for="contest in getStaticContest"
          :key="contest.contestId"
        >
          <contest-component :contestData="contest"></contest-component>
          <!-- <contest-component :contestData="contest"></contest-component> -->
          <!-- <contest-component :contestData="contest"></contest-component> -->
        </div>
      </div>

      <div class="dynamicContest">
        <h1>Dynamic Contest</h1>
        <div
          v-for="contest in getStaticContest"
          :key="contest.contestId"
        >
          <contest-component :contestData="contest"></contest-component>
        </div>
      </div>
    </div>

    <!-- {{ getStaticContest }} -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ContestComponent from "../components/ContestComponent.vue";
export default {
  name: "QuizMasterContestView",
  components: {
    ContestComponent,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getStaticContest"]),
  },
  methods: {
    ...mapActions(["STATIC_CONTETST"]),
  },
  created() {
    this.$store.dispatch("STATIC_CONTESTS", {
      masterId: sessionStorage.getItem("userName"),
    });
  },
};
</script>

<style scoped>
.quizMaster {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.quizMaster h1 {
    /* margin-left: 2rem; */
    margin-top: 2rem;
}

.quizMaster h3 {
    margin-left: 3rem;
    margin-top: 2.75rem;
}

.viewContest {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 4rem 0 6rem 0;
}
</style>
