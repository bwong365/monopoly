<template>
  <div>
    <nav class="navbar bg-conexus">
      <RouterLink to="/" class="navbar-brand ml-5">
        <img class="logo hvr-bounce-in" src="@/assets/Monopoly-Logo.svg">
      </RouterLink>
    </nav>

    <main>
      <transition appear name="fade" mode="out-in">
        <RouterView/>
      </transition>
    </main>
  </div>
</template>

<style scoped>
.bg-conexus {
  background-color: #028eaa;
  box-shadow: 0 .125rem .25rem rgba(0,0,0,.3);
}

/* Bounce In */
.hvr-bounce-in {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
}
.hvr-bounce-in:hover, .hvr-bounce-in:focus, .hvr-bounce-in:active {
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
  -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
  transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

.fade-enter-to,
.fade-leave {
  opacity: 1
}

.fade-enter-active {
  transition: .25s all;
}

.fade-enter-leave {
  transition: .125s all;
}
</style>
