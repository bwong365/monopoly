<template>
  <div class="card border">
    <div class="card-body">
      <h5 class="card-title">{{ player.name }}</h5>
      <p class="card-text">{{ player.balance }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['player'],
}
</script>


<style>
.card {
  height: 25vh;
  overflow-y: auto
}
</style>