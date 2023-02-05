import { storage } from "@/firebase";
import "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  state: {
    firebaseUploadRes: [],
    firebaseDownloadRes: "",
  },
  getters: {
    getFirebaseUploadRes: (state) => {
      return state.firebaseUploadRes;
    },
    getFirebaseDownloadRes: (state) => {
      return state.firebaseDownloadRes;
    },
  },
  mutations: {
    setFirebaseUploadRes: (state, value) => {
      state.firebaseUploadRes = value;
    },
    setFirebaseDownloadRes: (state, value) => {
      // console.log(value);
      state.firebaseDownloadRes = value;
    },
  },
  actions: {
    async FIREBASE_UANDD({ commit }, { fileName, refValue }) {
      const storageRef = ref(storage, `files/${fileName}`);
      // this.$refs.ref.files[0]
      // console.log("store ref value", refValue)
      const uploadRes = await uploadBytes(storageRef, refValue);
      const downloadRes = await getDownloadURL(storageRef, refValue);
      // console.log("firebase uploaded", uploadRes);
      commit("setFirebaseUploadRes", uploadRes.metadata);
      // console.log("Image Url in store", downloadRes);
      commit("setFirebaseDownloadRes", downloadRes);
    },
  },
};
