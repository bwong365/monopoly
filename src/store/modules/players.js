const getInitialState = () => ({
  players: [
    { name: '', balance: 1500, id: 1 },
    { name: '', balance: 1500, id: 2 },
  ],
  nextId: 3,
})

const state = getInitialState()

const getters = {
  validGameState: ({ players }) => {
    let validState = true;
    players.forEach(player => {
      if (!player.name || !player.balance) {
        validState = false
      }
    })
    return players.length > 1 && validState;
  }
}

const mutations = {
  resetState(state) {
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}