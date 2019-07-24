import Vue from 'vue'

const getInitialState = () => ({
  bankPlayer: { name: 'Bank', balance: -1, id: 0 },
  transaction: {
    selectedPlayer: {},
    recipient: {},
    amount: 0
  },
  transactionLogs: [],
})

const state = getInitialState

const mutations = {
  resetState(state) {
    Object.assign(state, getInitialState())
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
    Vue.set(transaction, 'selectedPlayer', {})
  }
}

const actions = {
  commitTransaction({ commit }) {
    commit('transact')
    commit('logTransaction')
    commit('clearTransaction')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}