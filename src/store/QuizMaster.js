import axios from "axios";

export default {
  state: {
    addContest: {},
    contestIdData: "",
    dynamicIdData: "",
    register: "",
    login: "",
    loginUser: sessionStorage.getItem("userName")
      ? sessionStorage.getItem("userName")
      : "",
    loginBool: sessionStorage.getItem("userId") ? true : false,
    staticContests: [],
    leaderBoard: [],
  },
  getters: {
    getAddContest: (state) => {
      return state.addContest;
    },
    getContestIdData: (state) => {
      return state.contestIdData;
    },
    getRegister: (state) => {
      return state.register;
    },
    getLogin: (state) => {
      return state.login;
    },
    getLoginUser: (state) => {
      console.log(state.loginUser);
      return state.loginUser;
    },
    getLoginBool: (state) => {
      return state.loginBool;
    },
    getDynamicIdData: (state) => {
      return state.dynamicIdData;
    },
    getStaticContest: (state) => {
      return state.staticContests;
    },
    getLeaderBoard: (state) => {
      return state.leaderBoard;
    },
  },
  mutations: {
    setAddContest: (state, value) => {
      state.addContest = value;
    },
    setContestIdData: (state, value) => {
      state.contestIdData = value;
    },
    setRegister: (state, value) => {
      state.register = value;
    },
    setLogin: (state, value) => {
      state.login = value;
    },
    setLoginBool: (state, value) => {
      state.loginBool = value;
    },
    setDynamicIdData: (state, value) => {
      state.dynamicIdData = value;
    },
    setStaticContests: (state, value) => {
      state.staticContests = value;
    },
    setLeaderBoard: (state, value) => {
      state.leaderBoard = value;
    },
    resetLogin: (state) => {
      state.loginBool = false;
      state.login = "";
      sessionStorage.clear();
    },
  },
  actions: {
    async ADD_CONTEST({ commit }, { payload, successData }) {
      //   const headers = {
      //     Authorization: sessionStorage.getItem("accessToken"),
      //     userId: sessionStorage.getItem("userId"),
      //   };
      const response = await axios.post(
        "/api/quizMaster/QuizMaster/addContest",
        payload,
        {
          headers: {
            Authorization: sessionStorage.getItem("accessToken"),
            userId: sessionStorage.getItem("userId"),
          },
        }
      );
      // const date = new Date();
      const payloadData = {
        quizId: payload.contestName,
        quizTopic: payload.contentCategory,
        startTime: payload.durationOfContest,
      };
      axios.post("/api/kafka/addQuiz", payloadData);
      console.log("from Contest store", response.data);
      if (response.data) {
        successData(response.data);
      }
      commit("setAddContest", response.data);
    },
    async GET_CONTEST_BY_ID({ commit }, { id, successData }) {
      // /contest/getContestById/{id}
      const response = await axios.get(
        "/api/quizContest/contest/getContestById/" + id,
        {
          headers: {
            Authorization: sessionStorage.getItem("accessToken"),
            userId: sessionStorage.getItem("userId"),
          },
        }
      );
      // console.log(response.data)
      successData(response.data);
      commit("setContestIdData", response.data);
    },
    async GET_DYNAMIC_ID({ commit }, { id, successData }) {
      const response = await axios.get(
        "/api/quizDynamic/DynamicContest/getDynamicContestById/" + id,
        {
          headers: {
            Authorization: sessionStorage.getItem("accessToken"),
            userId: sessionStorage.getItem("userId"),
          },
        }
      );
      console.log("from store dynamic", response.data);
      successData(response.data);
      commit("setDynamicIdData", response.data);
    },
    async REGISTER({ commit }, { payload }) {
      console.log("register payload", payload);
      const response = await axios.post("/oauth/api/auth/register", payload);
      console.log("reponse data", response);
      commit("setRegister", response.data);
    },
    async LOGIN({ commit }, { payload }) {
      // const headers = {
      //     Authorization: sessionStorage.getItem("accessToken"),
      //     userId: sessionStorage.getItem("userId")
      // }
      console.log("login payload", payload);
      const response = await axios.post("/oauth/api/auth/login", payload);
      // post("url", {
      // headers: {
      // Authorization: "token",
      // userId: "userID"
      // }
      // })
      console.log("response login", response.data);
      sessionStorage.setItem("userName", payload.username);
      sessionStorage.setItem("userId", response.data.userId);
      sessionStorage.setItem("accessToken", response.data.accessToken);
      commit("setLoginBool", true);
      commit("setLogin", response.data);
    },
    async STATIC_CONTESTS({ commit }, { masterId }) {
      // /contest/getAllContestByQuizMaster/{quizMasterId}
      const response = await axios.get(
        "/api/quizContest/contest/getAllContestByQuizMaster/" + masterId,
        {
          headers: {
            Authorization: sessionStorage.getItem("accessToken"),
            userId: sessionStorage.getItem("userId"),
          },
        }
      );
      commit("setStaticContests", response.data);
    },
    async LEADER_BOARD({ commit }, { contestId }) {
      // contestId;
      const response = await axios.get(
        "/api/quizContest/ranking/getLeaderBoard/"+ contestId,
        {
          headers: {
            Authorization: sessionStorage.getItem("accessToken"),
            userId: sessionStorage.getItem("userId"),
          },
        }
      );
      console.log("leader board store", response.data);
      // const data = JSON.stringify(response.data);
      // console.log(data);
      commit("setLeaderBoard", response.data);
    },
    async RESET_LOGIN({ commit }, { payload }) {
      const response = await axios.post("/oauth/api/auth/logout", payload);
      console.log(response);
      commit("resetLogin");
    },
  },
};
