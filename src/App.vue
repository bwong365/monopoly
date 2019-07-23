<template>
  <div>
    <nav class="navbar bg-conexus">
      <RouterLink to="/" class="navbar-brand"><img class="logo" src="@/assets/Monopoly-Logo.svg"></RouterLink>
    </nav>
      
    <div class="container">
      <RouterView/>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.bg-conexus {
  background-color: #028eaa;
  box-shadow: 0 .125rem .25rem rgba(0,0,0,.3);
}

.logo {
  transition: all .5s
}

.logo:hover {
  opacity: .5
}
</style>
