<template>
  <div class="row mt-3">
    
    <div class="col-6">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Player name</span>
        </div>
        <input
          :value="player.name"
          :placeholder="`Player ${index + 1}`"
          class="form-control"
          type="text"
          required
          @change="$emit('name-change', $event.currentTarget.value)"
          @blur="$forceUpdate()"
        >
      </div>
    </div>

    <div class="col-4">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Balance</span>
        </div>
        <input
          :value="player.balance"
          class="form-control"
          type="text"
          required
          @change="$emit('balance-change', $event.currentTarget.value)"
          @blur="$forceUpdate()"
        >
      </div>
    </div>

    <div class="col-2">
      <button
        v-if="enableDelete"
        class="btn btn-danger"
        type="button"
        tabindex="-1"
        @click="$emit('delete-player')"
      >X</button>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    player: Object,
    index: Number,
    enableDelete: Boolean
  },
}
</script>
