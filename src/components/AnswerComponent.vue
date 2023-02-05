<template>
  <div class="answer">
    <!-- <h1>This is Answers Component</h1> -->
    <h2>Choose your answers</h2>
    <div v-if="answerMulti" class="multi">
      <div>
        <input type="checkbox" name="option1" v-model="answer[0]" />
        <label>{{ optionsData[0] }}</label>
      </div>
      <div>
        <input type="checkbox" name="option2" v-model="answer[1]" />
        <label>{{ optionsData[1] }}</label>
      </div>
      <div>
        <input type="checkbox" name="option3" v-model="answer[2]" />
        <label>{{ optionsData[2] }}</label>
      </div>
      <div>
        <input type="checkbox" name="option4" v-model="answer[3]" />
        <label>{{ optionsData[3] }}</label>
      </div>
    </div>
     <div class="singleAnswer" v-if="answerSingle">
      <select v-model="singleAnswer" @change="AnswerHandler">
        <option
          v-for="option in options"
          :value="option.value"
          :key="option.id"
        >
          {{ option.text }}
        </option>
      </select>
      <!-- {{optionsData}} -->
    </div>
    
    <div class="answerCheck" v-if="answerMulti" >
        <p>confirm first and then Click Next</p>
        <button @click="AnswerHandler">Confirm</button>
    </div>
   
  </div>
</template>

<script>
export default {
  name: "AnswerComponent",
  emits: ["answers"],
  props: {
    answerType: {
      typeof: String,
      default: "single",
      require: true,
    },
    optionsData: {
      typeof: Array,
      default: [],
      require: true,
    },
  },
  computed: {
    answerMulti() {
      if (this.answerType === "MULTI") {
        return true;
      }
      return false;
    },
    answerSingle() {
      if (this.answerType === "SINGLE") {
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      options: [
        { text: this.optionsData[0], value: this.optionsData[0] },
        { text: this.optionsData[1], value: this.optionsData[1] },
        { text: this.optionsData[2], value: this.optionsData[2] },
        { text: this.optionsData[3], value: this.optionsData[3] },
      ],
      answer: [],
      singleAnswer: "",
    };
  },
  watch: {
    answer() {
      for (let i = 0; i < 4; i++) {
        if (this.answer[i]) {
          this.answer[i] = this.optionsData[i];
        } else {
          this.answer[i] = "";
        }
      }
      console.log(this.answer);
    },
    singleAnswer() {
      this.answer[0] = this.singleAnswer;
      console.log(this.answer);
    },
  },
  methods: {
    AnswerHandler(data) {
      data = this.answer;
      this.$emit("answers", data);
    },
  },
};
</script>

<style scoped>

h2 {
text-align: center;
 margin-top: 5rem;
}

.answer {
  /* display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; */
  height: calc(100vh - 340px);
}

.multi {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  font-size: 24px;
  flex-direction: column;
}

.singleAnswer {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

select {
  width: 295px;
  height: 49px;
  border: none;
  margin-top: 10px;
  border: 2px solid red;
  border-radius: 5px;
  font-size: 25px;
}

.multi label {
  position: relative;
  top: -8px;
  right: 70px;
}

.answerCheck {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

.answerCheck button {
  height: 35px;
  font-size: 18px;
  width: 200px;
  border-radius: 7px;
  border: none;
}

button:hover {
  color: rgba(221, 28, 44, 0.78);
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

input {
  display: inline;
  width: 190px;
  height: 20px;
  border: none;
  font-size: 18px;
  border: 2px solid red;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 25px;
}
</style>
