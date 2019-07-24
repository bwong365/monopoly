<template>
  <div class="row logs">
    <p>Transaction Logs:</p>
    <ul class="list-group logs">
      <li v-for="(log, index) in transactionLogs" :key="index" class="list-group-item">
        {{ log }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState('transactions', ['transactionLogs'])
}
</script>

<style scoped>
.list-group {
  overflow-y: scroll;
  max-height: 300px;
  width: 100%;
  scrollbar-width: thin;
}
</style>

