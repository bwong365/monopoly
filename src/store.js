import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import router from './router'

const vuexPersist = new VuexPersist({
  key: 'monopoly',
  storage: localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [
      { name: '', balance: 1500}
    ]
  },

  mutations: {
    initializeGameState(state) {
      console.log('initializing')
      state.players = [{ name: '', balance: 1500}]
    },

    addPlayer({ players }) {
      if (players.length >= 6) { return console.error('Cannot add more than 6 players') }
      players.push({name: '', balance: 1500})
    },

    updateName({ players }, { index, name }) {
      if (!players[index]) { return console.error('Player index not found') }
      players[index].name = name
    },

    updateBalance({ players }, { index, balance }) {
      if (!players[index]) { return console.error('Player index was not found') }
      players[index].balance = +balance
    },

    deletePlayer({ players }, index) {
      if (players.length <= 1) { return console.error('Cannot delete only player') }
      players.splice(index, 1)
    }
  },

  actions: {
    startGame() {
      router.replace('/game')
    }
  },

  plugins: [vuexPersist.plugin]
})
