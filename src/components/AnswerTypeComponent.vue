<template>
  <div class="answerType">
    <h1>Select Your Answer Type</h1>

    <select v-model="answerType" @change="answerChange">
      <option v-for="option in options" :value="option.value" :key="option.id">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "AnswerTypeComponent",
  emits: ["answer-type"],
  data() {
    return {
      answerType: "",
      options: [
        { text: "Single", value: "SINGLE" },
        { text: "Multiple", value: "MULTI" },
      ],
    };
  },
  methods: {
    answerChange(data){
      data = this.answerType;
      console.log("In answer type", data)
      this.$emit("answer-type", data)
    }
  }
};
</script>

<style scoped>
.answerType {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: calc(90vh - 340px);
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
