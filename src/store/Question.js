import axios from "axios";

export default {
  state: {
    addQuestion: "",
  },
  getters: {
    getAddQuestion: (state) => {
      return state.addQuestion;
    },
  },
  mutations: {
    setAddQuestion: (state, value) => {
      state.addQuestion = value;
    },
  },
  actions: {
    async ADD_QUESTION({ commit }, { contestId, payload }) {
      console.log("contestId", contestId);
      const response = await axios.post(
        `/api/quizMaster/QuizMaster/addQuestion/${contestId}`,
        payload,
        {
          headers: {
            Authorization: sessionStorage.getItem("accessToken"),
            userId: sessionStorage.getItem("userId"),
          },
        }
      );
      console.log(response.data);
      commit("setAddQuestion", response.data);
    },
  },
};
