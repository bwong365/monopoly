import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import router from './router'
import players from './store/modules/players'
import transactions from './store/modules/transactions'

const vuexPersist = new VuexPersist({
  key: 'monopoly',
  storage: localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test: []
  },

  actions: {
    startGame({ getters }) {
      if (getters['players/validGameState']) {
        router.replace('/game')
      }
    },

    initializeGameState({ commit }) {
      commit('players/resetState')
      commit('transactions/resetState')
    }
  },

  // Save all state changes to local storage
  plugins: [vuexPersist.plugin],

  modules: {
    players,
    transactions
  }
})
