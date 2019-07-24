<template>
  <div>
    <div class="row m-3">
      <div class="col text-center border" v-clickable="bankPlayer">
        <h1>Bank</h1>
        <p>Unlimited Funds</p>
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

      <!-- Game content goes here -->
      <div class="col offset-1 center-col">
        <slot></slot>
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
import { mapState, mapMutations } from 'vuex'
import CardPlayer from '../components/CardPlayer'

export default {
  components: {
    CardPlayer,
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

  computed: {
    ...mapState(['players', 'transaction', 'bankPlayer']),
  },

  methods: {
    ...mapMutations(['selectPlayer']),

    firstColPlayers(i) {
      return this.players.filter((_, index) => (index % 2 === 0))[i - 1]
    },

    secondColPlayers(i) {
      return this.players.filter((_, index) => (index % 2 !== 0))[i - 1]
    }
  }
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>