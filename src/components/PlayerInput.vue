<template>
  <div class="row mt-3">
    <div class="col-6">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Player name</span>
        </div>
        <input
          :value="player.name"
          :placeholder="`Player ${index + 1}`"
          class="form-control"
          type="text"
          required
          @change="onNameChange(index, $event.currentTarget)"
          @blur="$forceUpdate()"
        >
      </div>
    </div>
    <div class="col-4">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Balance</span>
        </div>
        <input
          :value="player.balance"
          class="form-control"
          type="text"
          required
          @change="onChangeBalance(index, $event.currentTarget)"
          @blur="$forceUpdate()"
        >
      </div>
    </div>
    <div class="col-2">
      <button v-if="enableDelete" class="btn btn-danger" tabindex="-1" @click="deletePlayer(index)">X</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    player: Object,
    index: Number,
    enableDelete: Boolean
  },
  
  methods: {
    ...mapMutations([ 'updateName', 'updateBalance', 'deletePlayer']),

    onChangeBalance(index, input) {
      const balance = +input.value
      if(!balance || !Number.isInteger(balance)) {
        input.value = this.players[index].balance
        return console.error('balance must be a number!')
      }
      this.updateBalance({index, balance: +balance})
    },

    onNameChange(index, input) {
      this.updateName({index, name: input.value.trim()})
    },
  }
}
</script>
