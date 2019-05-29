import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: null,
    drawer: false,
    addresses:[]
  },
  mutations: {
    setLoginUser(state, user){
      state.login_user = user
    },
    deleteLoginUser(state){
      state.login_user = null
    },
    toggleSideMenu (state){
      state.drawer = !state.drawer
    },
    addAddress(state, { id, address }){
      address.id = id
      state.addresses.push(address)
    },
    updateAddress (state, { id, address}) {
      const index = state.addresses.findIndex(address => address.id === id)

      state.addresses[index] = address
    }

  },
  actions: {
    login(){
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout(){
      firebase.auth().signOut()
    },
    setLoginUser ({commit}, user){
      commit('setLoginUser', user)
    },
    fetchAddresses ({getters, commit }) {
      firebase.firestore().collection(`users/${getters.uid}/addresses`).get().then(snapshot => {
        snapshot.forEach(doc => commit('addAddress', { id: doc.id, address: doc.data() }))
      })
    },
    deleteLoginUser({commit}, user){
      commit('deleteLoginUser', user)
    },
    toggleSideMenu ({ commit }){
      commit('toggleSideMenu')
    },
    addAddress ({ getters, commit}, address){
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).add(address).then(doc =>{
          commit('addAddress', { id: doc.id, address })
        })
      }
    },
    updateAddress ({ getters, commit}, { id, address} ) {
      firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).update(address).then(() => {
        commit('updateAddress', { id, address })
      })
    }
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : '',
    uid: state => state.login_user ? state.login_user.uid : null,
    getAddressById: state => id => state.addresses.find(address => address.id === id),
    // 関数(idを引数に受け取ってstateのaddressesからidがマッチするものを返す関数)を返す関数
  }
})
