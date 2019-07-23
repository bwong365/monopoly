<template>
  <div>
    
    <div class="row">
      <div class="col-12">
        <h2 class="mt-4">New Game</h2>
      </div>
    </div>

    <form @submit.prevent="startGame">
      <PlayerInput
        v-for="(player, index) in players"
        :key="index"
        :player="player"
        :index="index"
        :enableDelete="players.length > 1"
      />

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
import PlayerInput from '../components/PlayerInput'

export default {
  components: {
    PlayerInput
  },
  data() {
    return {
      formError: ''
    }
  },

  computed: {
    ...mapState(['players']),

    fullGame() {
      return this.players.length >= 6
    },
  },

  methods: {
    ...mapMutations(['addPlayer']),

    ...mapActions(['startGame']),

  },

  beforeCreate() {
    this.$store.commit('initializeGameState')
  }
}
</script>

<style scoped>
.btn:disabled {
  opacity: .3
}
</style>
