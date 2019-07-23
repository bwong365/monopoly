<template>
  <div>
    <ul>
      <li v-for="(player, index) in players" :key="index">{{ player.name }}: {{ player.balance }}</li>
    </ul>
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
