<template>
  <div class="container">
    
    <div class="row">
      <div class="col-12">
        <h2 class="mt-4">New Game</h2>
      </div>
    </div>

    <form @submit.prevent="startGame">
      <!-- inputs will slide in and out -->
      <transition-group name="slide" mode="out-in">
        <InputPlayer
          v-for="(player, index) in players"
          :key="player.id"
          :player="player"
          :index="index"
          :enableDelete="players.length > 2"
          @name-change="onNameChange(name = $event, index)"
          @balance-change="onChangeBalance(balance = $event, index)"
          @delete-player="deletePlayer(index)"
        />
      </transition-group>

      <!-- Buttons behaviour should depend on form validation -->
      <div class="row">
        <div class="col">
          <button
            :disabled="fullGame"
            class="btn btn-primary m-3"
            type="button"
            @click="addPlayer"
          >Add a Player</button>
          <button
            class="btn btn-success m-3"
            type="submit"
          >Let's Go!</button>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import InputPlayer from '../components/InputPlayer'

export default {
  components: {
    InputPlayer
  },
  data() {
    return {
      formError: ''
    }
  },

  computed: {
    ...mapState('players', ['players']),

    fullGame() {
      return this.players.length >= 6
    },
  },

  methods: {
    ...mapMutations('players', ['addPlayer', 'updateName', 'updateBalance', 'deletePlayer']),

    ...mapActions(['startGame']),

    onNameChange(name, index) {
      // Remove all whitespace on field blur
      this.updateName({index, name: name.trim()})
    },

    onChangeBalance(balanceString, index) {
      // Integer check
      const balance = +balanceString
      if(!balance || !Number.isInteger(balance) || balance <= 0) {
        return console.error('balance must be a whole number greater than zero!')
      }
      // TODO: Choose upper limit
      this.updateBalance({index, balance})
    },
  },

  // Initialize game upon element creation
  beforeCreate() {
    this.$store.dispatch('initializeGameState')
  }
}
</script>

<style scoped>
.slide-enter-active {
  animation: enter .5s ease-out;
}
.slide-leave-active {
  animation: exit .5s ease-in-out forwards;
  position: absolute;
}
.slide-move {
  transition: all .7s
}

@keyframes enter {
  from {
    opacity: 0;
    transform: translateX(-5rem)
  }
}

@keyframes exit {
  to {
    opacity: 0;
    transform: translateX(10rem)
  }
}

.btn:disabled {
  opacity: .3
}
</style>
