<template>
  <div class="addQuestion">
    <h1>Question View</h1>
    <question-type
      v-if="questionType"
      @question-type="questionTypeValue"
    ></question-type>
    <question-component
      v-if="question"
      :questionType="payload.typeOfQuestion"
      @question-data="questionDataHandler"
    ></question-component>
    <answer-type-component
      v-if="answerType"
      @answer-type="answerTypeHandler"
    ></answer-type-component>
    <answer-component
      v-if="answer"
      :answerType="payload.typeOfAnswer"
      :optionsData="optionData"
      @answers="answerDataHandler"
    ></answer-component>
    <button v-if="!answer" @click="nextHandler">Next</button>
    <button v-if="answer" @click="submitHandler">Submit</button>
    <!-- {{next}} -->
    <!-- {{getContestIdData}} -->
    <!-- -- dynamic data {{getDynamicIdData}} -->
  </div>
</template>

<script>
import Vue from "vue"
import Toast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

Vue.use(Toast);


import QuestionType from "../components/QuestionType.vue";
import QuestionComponent from "../components/QuestionComponent.vue";
import AnswerTypeComponent from "../components/AnswerTypeComponent.vue";
import AnswerComponent from "../components/AnswerComponent.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AddQuestionView",
  data() {
    return {
      next: 0,
      noOfQuestions: 0,
      questionType: true,
      question: false,
      answerType: false,
      answer: false,
      payload: {
        question: "",
        questionUrl: "",
        typeOfQuestion: "",
        typeOfAnswer: "",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        optionFour: "",
        difficultyLevel: "",
        marks: 0,
        answer: [],
      },
      optionData: [],
    };
  },
  components: {
    QuestionType,
    QuestionComponent,
    AnswerTypeComponent,
    AnswerComponent,
  },
  computed: {
    ...mapGetters(["getAddContest", "getAddQuestion", "getContestIdData", "getDynamicIdData"]),
    questionsCount() {
      return this.getContestIdData.noOfQuestions;
    },
  },
  watch: {},
  methods: {
    ...mapActions["ADD_QUESTION", "GET_CONTEST_BY_ID", "GET_DYNAMIC_ID"],
    questionTypeValue(value) {
      // debugger;
      this.payload.typeOfQuestion = value;
      console.log(this.payload);
    },
    questionDataHandler(data) {
      this.payload.question = data.question;
      this.payload.questionUrl = data.questionUrl;
      this.payload.difficultyLevel = data.difficulty;
      this.payload.marks = data.marks;
      this.payload.optionOne = data.optionOne;
      this.payload.optionTwo = data.optionTwo;
      this.payload.optionThree = data.optionThree;
      this.payload.optionFour = data.optionFour;
      this.optionData[0] = this.payload.optionOne;
      this.optionData[1] = this.payload.optionTwo;
      this.optionData[2] = this.payload.optionThree;
      this.optionData[3] = this.payload.optionFour;
      // console.log("emits question data", this.payload)
    },
    answerTypeHandler(data) {
      this.payload.typeOfAnswer = data;
      // console.log(data);
      // console.log("emits answer type",this.payload)
    },
    answerDataHandler(data) {
      this.payload.answer = data;
      console.log(data);
      console.log("emits answers data", this.payload);
    },
    nextHandler() {
      // data.push("")
      if (this.next === 0) {
        // console.log("In question Type")
        (this.questionType = !this.questionType),
          (this.question = !this.question);
        this.next++;
      } else if (this.next === 1) {
        // console.log("In question Type")
        (this.question = !this.question),
          (this.answerType = !this.answerType),
          this.next++;
      } else if (this.next === 2) {
        (this.answerType = !this.answerType),
          (this.answer = !this.answer),
          this.next++;
      } else {
        this.submitHandler();
      }
    },
    submitHandler() {
      console.log("Done");
      this.next = 0;
      this.answer = !this.answer;
      this.questionType = !this.questionType;
      if (this.noOfQuestions === 1) {
      this.$toast.success('Contest created successfully', {position: "top"});
        this.$router.push("/");
      } else {
      this.$toast.success('Question Added Successfully', {position: "top"});
        this.noOfQuestions--;
      }
      // this.$store.dispatch("ADD_CONTEST", {payload: this.payload, contestId: this.getAddContest})
      // console.log("router params",this.$router.params);
      this.$store.dispatch("ADD_QUESTION", {
        contestId: this.getAddContest.contestId,
        payload: this.payload,
      });
      // console.log("questionType: ", this.questionType)
      // console.log("answerType: ", this.questionType)
    },
  },
  created() {
    console.log("from question view created",this.getAddContest)
    this.noOfQuestions = this.getAddContest.noOfQuestions
    // debugger;
    // console.log("static", this.getAddContest);
    // this.$store.dispatch("GET_CONTEST_BY_ID", {id:this.getAddContest, successData: (data) => {
    //   // debugger;
    //   this.noOfQuestions = data.noOfQuestions;
    //   console.log("no of question: ",this.noOfQuestions)
    // }});
    // console.log("dynamic", this.getAddContest);
    // this.$store.dispatch("GET_DYNAMIC_ID", {id:this.getAddContest, successData: (data) => {
    //   // debugger;
    //   this.noOfQuestions = data.noOfQuestions;
    //   console.log("no of questions in Dynamic", this.noOfQuestions)
    // }});
  },
};
</script>

<style scoped>
.addQuestion {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px 0 100px 0;
}

h1 {
    margin-bottom: 30px;
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
  box-shadow: rgba(195, 28, 28, 0.55) 0px 0px 0px 4px;
}
</style>
