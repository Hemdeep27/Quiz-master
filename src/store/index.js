import Vue from 'vue'
import Vuex from 'vuex'
import QuizMaster from './QuizMaster'
import Question from './Question'
import firebase from './firebaseStore'

Vue.use(Vuex)



export default new Vuex.Store({
  modules: {
    QuizMaster,
    Question,
    firebase
  }
})
