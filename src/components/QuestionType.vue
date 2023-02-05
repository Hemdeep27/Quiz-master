<template>
  <div class="questionType">
    <h1>Question Type</h1>
    <select v-model="selectValue" @change="questionTypeChange">
          <option
            v-for="option in options"
            :value="option.value"
            :key="option.value"
          >
            {{ option.text }}
          </option></select>
  </div>
</template>

<script>
export default {
  name: "QuestionType",
  emits: ["question-type"],
  data() {
    return {
        selectValue: "",
         options: [
        { text: "Text", value: "TEXT" },
        { text: "Image", value: "IMAGE" },
        { text: "Video", value: "VIDEO" },
        { text: "Audio", value: "AUDIO" },
      ],
    };
  },
  methods: {
    questionTypeChange(value) {
        // debugger;
        value = this.selectValue
        this.$emit("question-type", value);
    }
  },
};
</script>

<style scoped>
.questionType {
     display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;
    height: calc(100vh - 340px);
    border: 2px solid red;
    width: 400px;
    box-shadow: 10px 10px red;
}

h1 {
    margin-top: 80px;
}

select {
    width: 290px;
    height: 45px;
    border: none;
    border: 2px solid red;
    border-radius: 5px;
    margin-top: 30px;
    font-size: 25px;
}

select:hover {
  box-shadow: rgba(195, 28, 28, 0.55) 0px 0px 0px 4px;
}
</style>
