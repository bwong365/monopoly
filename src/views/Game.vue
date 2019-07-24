<template>
  <div>
    <PlayerSurround>
      <TransactionWidget/>
      <TransactionLogs/>
    </PlayerSurround>
  </div>
</template>

<script>
import PlayerSurround from '../components/PlayerSurround'
import TransactionWidget from '../components/TransactionWidget'
import TransactionLogs from '../components/TransactionLogs'
export default {
  components: {
    TransactionWidget,
    TransactionLogs,
    PlayerSurround
  }  
}
</script>

