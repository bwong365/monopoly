<template>
  <div>
    <h2>New Game</h2>
    <div class="input-group" v-for="(player, index) in players" :key="index">
      <div class="input-group-prepend">
        <span class="input-group-text">Name:</span>
      </div>
      <input type="text" class="form-control" :placeholder=`Player`>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['players'])
  }
}
</script>
