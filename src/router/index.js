import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddContestView from "../views/AddContestView.vue"
import AddQuestionView from "../views/AddQuestionView.vue"
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue"
import QuizMasterContestView from "../views/QuizMasterContestView.vue"
import LeaderBoardView from "../views/LeaderBoardView.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/addContest',
    name: 'addContest',
    component: AddContestView,
  },
  {
    path: '/addQuestion/:contestId',
    name: 'addQuestion',
    component: AddQuestionView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: "/viewContest",
    name: "viewContest",
    component: QuizMasterContestView,
  },
  {
    path: "/leaderBoard/:contestId",
    name: "learboard",
    component: LeaderBoardView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
