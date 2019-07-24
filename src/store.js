import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import router from './router'

const vuexPersist = new VuexPersist({
  key: 'monopoly',
  storage: localStorage
})

Vue.use(Vuex)

// Helper for initialization
const getInitialState = () => ({
  players: [
    { name: '', balance: 1500, id: 1 },
    { name: '', balance: 1500, id: 2 },
  ],
  nextId: 3,
  bankPlayer: { name: 'Bank', balance: -1, id: 0 },
  transaction: {
    selectedPlayer: {},
    recipient: {},
    amount: 0
  },
  transactionLogs: [],
})

export default new Vuex.Store({
  state: getInitialState(),

  getters: {
    validGameState: ({ players }) => {
      let validState = true;
      players.forEach(player => {
        if (!player.name || !player.balance) {
          validState = false
        }
      })
      return players.length > 1 && validState;
    }
  },

  mutations: {
    initializeGameState(state) {
      console.log('initializing')
      Object.assign(state, getInitialState())
    },

    addPlayer(state) {
      if (state.players.length >= 6) { return console.error('Cannot add more than 6 players') }
      state.players.push({ name: '', balance: 1500, id: state.nextId })
      state.nextId += 1
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
      if (players.length <= 2) { return console.error('Two players required!') }
      players.splice(index, 1)
    },

    selectPlayer({ transaction }, player) {
      Vue.set(transaction, 'selectedPlayer', player)
    },

    selectRecipient({ transaction }, recipient) {
      Vue.set(transaction, 'recipient', recipient)
    },

    setTransactionAmount({ transaction }, amount) {
      Vue.set(transaction, 'amount', +amount)
    },

    transact({ transaction, bankPlayer }) {
      if (transaction.selectedPlayer !== bankPlayer) {
        transaction.selectedPlayer.balance -= transaction.amount
      }

      if (transaction.recipient !== bankPlayer) {
        transaction.recipient.balance += transaction.amount
      }
    },

    logTransaction({ transaction, transactionLogs }) {
      const { selectedPlayer, recipient, amount } = transaction
      const log = ` $${amount} | ${selectedPlayer.name} -> ${recipient.name}`
      transactionLogs.unshift(log)
    },

    clearTransaction({ transaction }) {
      Vue.set(transaction, 'amount', 0)
      Vue.set(transaction, 'recipient', {})
      Vue.set(transaction, 'selectedPlayer', {})
    }
  },

  actions: {
    startGame({ getters }) {
      if (getters.validGameState) {
        router.replace('/game')
      }
    },

    commitTransaction({ commit }) {
      commit('transact')
      commit('logTransaction')
      commit('clearTransaction')
    }
  },

  // Save all state changes to local storage
  plugins: [vuexPersist.plugin]
})
