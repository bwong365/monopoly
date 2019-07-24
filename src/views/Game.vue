<template>
  <div>

    <div class="row m-3">
      <div class="col text-center border" v-clickable="bankPlayer">
        <h1>Bank</h1>
        <p>Balance: Unlimited Funds</p>
      </div>
    </div>

    <div class="row">
      <div class="col-4 col-lg-3">
        <CardPlayer
          v-for="i in 3"
          :key="i"
          :player="firstColPlayers(i) || {}"
          v-clickable="firstColPlayers(i)"
        />
      </div>

      <div class="col offset-1 center-col">
        <div class="transactions">
          
            <div class="row">
              <div class="col-12 text-center">
                <h3 class="m-3">Transactions</h3>
              </div>
              <template v-if="selectionWasMade">
                <div class="col-12">
                  <h5>
                    <strong>Cash from:</strong> {{ transaction.selectedPlayer.name }}
                  </h5>
                </div>
                <div class="col-12 mt-3">
                  <h5><strong>Cash to:</strong></h5>
                  <div class="form-group">
                    <select class="custom-select custom-select-md" v-model="payee" placeholder="hi">
                      <option value="-1" disabled>Cash to:</option>
                      <option v-for="player in playersExceptPayer" :key="player.id" :value="player">{{ player.name }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-12 mt-2">
                  <h5><strong>How much:</strong></h5>
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
        <div class="row logs">
          <p>Transaction Logs:</p>
          <ul class="list-group logs">
            <li v-for="(log, index) in transactionLogs" :key="index" class="list-group-item">
              {{ log }}
            </li>
          </ul>
        </div>
      </div>

      <div class="col-4 col-lg-3 offset-1">
        <CardPlayer
          v-for="i in 3"
          :key="i"
          :player="secondColPlayers(i) || {}"
          v-clickable="secondColPlayers(i)"
        />
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import CardPlayer from '../components/CardPlayer'

export default {
  components: {
    CardPlayer
  },

  directives: {
    clickable: {
      bind(el, binding, vnode) {
        if (!binding.value) { return }
        el.classList.add('clickable')
        el.addEventListener('click', () => vnode.context.selectPlayer(binding.value))
      }
    }
  },

  data() {
    return {
      payee: -1
    }
  },

  computed: {
    ...mapState(['players', 'transaction', 'bankPlayer', 'transactionLogs']),

    selectionWasMade() {
      return !!this.transaction.selectedPlayer.name
    },

    transactionReady() {
      return this.selectionWasMade && !!this.transaction.recipient.name && this.transaction.amount > 0
    },

    playersExceptPayer() {
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

    selectedPlayer() {
      return this.transaction.selectedPlayer;
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
        console.log(this.transaction)
      }
    }
  },

  methods: {
    ...mapMutations(['selectPlayer', 'setTransactionAmount', 'selectRecipient']),

    ...mapActions(['commitTransaction']),

    firstColPlayers(i) {
      return this.players.filter((_, index) => (index % 2 === 0))[i - 1]
    },

    secondColPlayers(i) {
      return this.players.filter((_, index) => (index % 2 !== 0))[i - 1]
    }
  },

  watch: {
    payee(value) {
      this.selectRecipient(value)
    }
  }

}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}

.transactions {
  height: 50%;
}

.list-group {
  overflow-y: scroll;
  max-height: 300px;
  width: 100%;
  scrollbar-width: thin;
}
</style>
