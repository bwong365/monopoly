<template>
  <div class="transactions">
    <div class="row">

      <div class="col-12 text-center">
        <h3 class="m-3">Transactions</h3>
      </div>

      <template v-if="selectionWasMade">

        <div class="col-12">
          <h5>
            <strong>Payer: </strong>{{ selectedPlayer.name }}
          </h5>
        </div>

        <div class="col-12 mt-3">
          <h5><strong>Recipient:</strong></h5>
          <div class="form-group">
            <select class="custom-select custom-select-md" v-model="payee" placeholder="hi">
              <option value="-1" disabled>Recipient:</option>
              <option v-for="player in getPlayersExceptPayer" :key="player.id" :value="player">{{ player.name }}</option>
            </select>
          </div>
        </div>

        <div class="col-12 mt-2">
          <h5><strong>Amount:</strong></h5>
          <div class="form-group">
            <input id="amount" type="text" class="form-control" v-model="amount" @blur="$forceUpdate()">
          </div>
        </div>

        <div class="col-12">
          <button v-if="transactionReady" type="button" class="btn btn-primary" @click="commitTransaction">Engage!</button>
        </div>

      </template>

      <div class="col-12" v-else>
        <h5 class="text-center">To select a payer, click on a player!</h5>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      payee: -1
    }
  },

  computed: {
    ...mapState('transactions', ['transaction', 'bankPlayer']),

    ...mapState('players', ['players']),

    selectedPlayer() {
      return this.transaction.selectedPlayer;
    },

    selectionWasMade() {
      return !!this.transaction.selectedPlayer.name
    },

    transactionReady() {
      return this.selectionWasMade && !!this.transaction.recipient.name && this.transaction.amount > 0
    },

    getPlayersExceptPayer() {
      const list = [];
      if (this.transaction.selectedPlayer !== this.bankPlayer) {
        list.push(this.bankPlayer)
      }
      this.players.forEach(player => {
        if (this.transaction.selectedPlayer !== player) {
          list.push(player)
        }
      })
      return list
    },

    amount: {
      get() {
        return this.transaction.amount
      },
      set(newValue) {
        // Integer check
        let amount = +newValue
        if(!amount || !Number.isInteger(amount) || amount <= 0) {
          return console.error('balance must be a whole number greater than zero!')
        }
        if (this.selectedPlayer !== this.bankPlayer) {
          // Make sure amount is less than or equal to player balance
          amount = Math.min(amount, this.selectedPlayer.balance)
        }
        this.setTransactionAmount(amount)
      }
    }
  },
  
  watch: {
    payee(value) {
      this.selectRecipient(value)
    }
  },

  methods: {
    ...mapMutations('transactions', ['setTransactionAmount', 'selectRecipient']),

    ...mapActions('transactions', ['commitTransaction']),
  }
}
</script>

<style scoped>
.transactions {
  height: 50%;
}
</style>
