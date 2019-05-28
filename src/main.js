import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

  var firebaseConfig = {
    apiKey: "AIzaSyC-hOBE65KSxn69eBp8TK0c69HCY_3Ihus",
    authDomain: "my-address-pj-a4659.firebaseapp.com",
    databaseURL: "https://my-address-pj-a4659.firebaseio.com",
    projectId: "my-address-pj-a4659",
    storageBucket: "my-address-pj-a4659.appspot.com",
    messagingSenderId: "1028998214531",
    appId: "1:1028998214531:web:36ff2711e99befd0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
