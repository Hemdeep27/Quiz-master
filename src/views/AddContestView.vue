<template>
  <div class="addContest">
    <div class="contestForm" data-aos="fade-down">
      <h1>Add a Contest</h1>
      <form @submit.prevent="addContestHandler">
        <label>Contest Name</label> <br />
        <input type="text" v-model="contestName" placeholder="Contest Name" />
        <br />
        <label>Contest Category</label> <br />
        <input
          type="text"
          v-model="contestCategory"
          placeholder="Contest Categroy"
        /><br />
        <label>noOfQuestions</label> <br />
        <input
          type="number"
          v-model="noOfQuestions"
          placeholder="Number of Question"
        />
        <br />
        <label>Quiz Type</label> <br />
        <select v-model="quizType">
          <option
            v-for="option in options"
            :value="option.value"
            :key="option.value"
          >
            {{ option.text }}
          </option></select
        ><br />
        <label v-if="quizType === 'static'">Duration</label><br />

        <input
          v-if="quizType === 'static'"
          type="text"
          pattern="[0-5]?[0-9]"
          v-model="duration"
          placeholder="Enter minutes"
        /><br />
        <label v-if="quizType === 'dynamic'">Duration of a Question(sec)</label
        ><br />

        <input
          v-if="quizType === 'dynamic'"
          type="text"
          pattern="[0-5]?[0-9]"
          v-model="durationOfQuestion"
          placeholder="Enter minutes"
        /><br />
        <label v-if="quizType === 'dynamic'">Date</label>
        <br v-if="quizType === 'dynamic'" />
        <input v-if="quizType === 'dynamic'" type="date" v-model="date" /><br />
        <label v-if="quizType === 'dynamic'">Start Time</label>
        <br v-if="quizType === 'dynamic'" />
        <input v-if="quizType === 'dynamic'" type="time" v-model="start" />
        <br v-if="quizType === 'dynamic'" />
        <!-- <label v-if="quizType === 'dynamic'">End Time</label>
        <br v-if="quizType === 'dynamic'" />
        <input v-if="quizType === 'dynamic'" type="number" /><br
          v-if="quizType === 'dynamic'"
        /> -->
        <button>Submit</button>
      </form>
      <!-- {{contestId}} -->
      <!-- {{getLoginUser}} -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "addContest",
  data() {
    return {
      quizMasterId: sessionStorage.getItem("userName"),
      contestId: "",
      contestData: [],
      idData: "",
      contestName: "",
      contestCategory: "",
      noOfQuestions: 0,
      quizType: "static",
      duration: 0,
      date: "",
      milliseconds: "",
      options: [
        { text: "static", value: "static" },
        { text: "dynamic", value: "dynamic" },
      ],
      durationOfQuestion: 0,
      start: "",
      end: "",
      // data: this.contestCategory.toLowerCase()
    };
  },
  computed: {
    ...mapGetters[("getAddContest", "getLoginUser")],
  },
  watch: {
    contestId() {
      this.idData = this.contestId;
    },
    date() {
      this.startTimeToUnix();
    },
    start() {
      this.startTimeToUnix();
    },
  },
  methods: {
    ...mapActions["ADD_CONTEST"],
    startTimeToUnix() {
      let futureDate = new Date(this.date + "T" + this.start);
      this.milliseconds = futureDate.getTime();
      // return this.milliseconds;
    },
    addContestHandler() {
      console.log(this.getLoginUser);
      const staticPayload = {
        approved: true,
        contentCategory: this.contestCategory.toLowerCase(),
        contestName: this.contestName,
        durationOfContest: this.minutesToUnixTimestamp(this.duration),
        moderatorId: "1",
        quizMasterId: this.quizMasterId,
        quizType: this.quizType,
        noOfQuestions: this.noOfQuestions,
      };
      // console.log(staticPayload);

      const dynamicPayload = {
        approved: true,
        contentCategory: this.contestCategory.toLowerCase(),
        contestName: this.contestName,
        durationOfContest: this.durationOfQuestion,
        moderatorId: "1",
        quizMasterId: this.quizMasterId,
        quizType: this.quizType,
        noOfQuestions: this.noOfQuestions,
        startTime: this.milliseconds,
        endTime:
          (this.durationOfQuestion + 10) * this.noOfQuestions * 1000 +
          this.milliseconds,
      };
      // console.log(dynamicPayload)
      // debugger;
      this.$toast.success('Contest Added Successfully', {position: "top"});
      if (this.quizType === "dynamic") {
        this.$store.dispatch("ADD_CONTEST", {
          payload: dynamicPayload,
          successData: (data) => {
            this.contestId = data;
            this.$router.push("/addQuestion/" + this.contestId);
          },
        });
      } else {
        this.$store.dispatch("ADD_CONTEST", {
          payload: staticPayload,
          successData: (data) => {
            this.contestId = data;
            // console.log("after Dispatching ADD_CONTEST", this.contestId)
            // console.log("ContestId before Dispatch",this.contestId);
            // this.$store.dispatch("GET_CONTEST_BY_ID", {id:this.contestId, successData: (data) => {
            //   this.contestData = data;
            //   console.log(data);
            // }})
            this.$router.push("/addQuestion/" + this.contestId.contestId);
          },
        });
      }
    },

    minutesToUnixTimestamp(minutes) {
      let milliseconds = minutes * 60 * 1000;
      return milliseconds;
    },
    futureTime() {
      // let futureDate = null;
    },
  },
};
</script>

<style scoped>
.addContest {
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

.contestForm {
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

.contestForm:hover {
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
