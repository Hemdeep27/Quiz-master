<template>
  <div class="question">
    <!-- <h1> Question</h1> -->
    <div class="questoinMain">
      <div class="questionTop">
        <div class="topOne">
          <label>Enter Question</label><br />
          <input type="text" v-model="questionData.question" />
        </div>
        <div class="topTwo">
          <input
            id="fileCss"
            :type="typeOfQuestion"
            v-if="questionBool"
            :accept="`${questionTypeValue}/*`"
            @change="fileChange"
            ref="fileType"
          /><br v-if="questionBool" />
          <button @click="uploadHandler" v-if="questionBool">Upload</button>
        </div>
        <div class="topThree">
          <label>Question difficulty</label><br />
          <select v-model="questionData.difficulty">
            <option
              v-for="option in options"
              :value="option.value"
              :key="option.value"
            >
              {{ option.text }}
            </option>
          </select>
          <!-- <br /> -->
        </div>
        <!-- <br> -->
      </div>
      <h3>Enter your Options</h3>

      <div class="questionMid">
        <!-- <br> -->
        <div class="midOne">
          <br />
          <label>option1</label><br />
          <input type="text" v-model="questionData.optionOne" /><br />
          <label>option2</label> <br />
          <input type="text" v-model="questionData.optionTwo" /> <br />
          <br />
        </div>

        <div class="midTwo">
          <br />
          <label>option3</label> <br />
          <input type="text" v-model="questionData.optionThree" /> <br />
          <label>option4</label> <br />
          <input type="text" v-model="questionData.optionFour" /> <br />
        </div>
      </div>
      <div class="questionBottom">
        <p>Confirm and then click next</p>
        <button @click="questionDataHandler">Confirm</button>
      </div>
    </div>

    <!-- {{ questionData }} -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "QuestionComponent",
  emits: ["question-data"],
  props: {
    questionType: {
      typeof: String,
      default: "text",
      require: true,
    },
  },
  computed: {
    ...mapGetters(["getFirebaseDownloadRes", "getFirebaseUploadRes"]),
    typeOfQuestion() {
      if (this.questionType === "TEXT") {
        return "text";
      } else {
        return "file";
      }
    },
    questionTypeValue() {
      if (this.questionType === "IMAGE") {
        return "image";
      } else if (this.questionType === "VIDEO") {
        return "video";
      } else {
        return "audio";
      }
    },
    questionBool() {
      if (this.questionType === "TEXT") {
        return false;
      } else {
        return true;
      }
    },
  },
  data() {
    return {
      fileName: "",
      questionData: {
        question: "",
        questionUrl: "",
        difficulty: "",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        optionFour: "",
        marks: "",
      },
      textQuestion: "",
      selectValue: "easy",
      options: [
        { text: "easy", value: "easy" },
        { text: "difficult", value: "difficult" },
      ],
    };
  },
  watch: {
    questionData() {
      console.log(this.questionData);
    },
  },
  methods: {
    ...mapActions(["FIREBASE_UANDD"]),
    questionDataHandler(data) {
      if (this.questionData.difficulty === "easy") {
        this.questionData.marks = 1;
      } else {
        this.questionData.marks = 2;
      }
      data = this.questionData;
      console.log("Question Data", data);
      this.$emit("question-data", data);
    },
    fileChange(event) {
      const file = event.target.files[0];
      this.fileName = file.name;
      console.log(this.fileName);
    },
    async uploadHandler() {
      const refValue = this.$refs.fileType.files[0];
      // console.log("Questoin component ref value",refValue)
      await this.$store.dispatch("FIREBASE_UANDD", {
        fileName: this.fileName,
        refValue: refValue,
      });
      this.$toast.success('File Added Successfully', {position: "top"});
      // setTimeout(())
      this.questionData.questionUrl = this.getFirebaseDownloadRes;
      // console.log(this.getFirebaseDownloadRes)
    },
  },
};
</script>

<style scoped>
.questionMain {
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  /* flex-direction: row; */
  /* flex-wrap: wrap; */
  height: max-content;
}

.questionTop {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 20px;
}

.topTwo {
  display: flex;
  margin-left: 40px;
  flex-direction: column;
  justify-content: center;
  /* margin-bottom: 0; */
}


.topTwo button {
  height: 25px;
  width: 90px;
  margin-left: 140px;
}

.topThree {
  margin-left: 20px;
}

.questionMid {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.questionBottom {
  display: flex;
  justify-content: center;

  margin: 20px;
}

.midOne {
  margin-right: 40px;
}

label {
  font-size: 20px;
  margin-top: 20px;
}

input {
  width: 290px;
  height: 45px;
  border: none;
  border: 2px solid red;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 25px;
}

#fileCss {
  /* margin-top: 10px; */
  margin-left: 30px;
  font-size: 18px;
  height: 28px;
  width: 290px;
  border: none;
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
</style>
