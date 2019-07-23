<template>
  <div>

    <div class="row">
      <div class="col-12 text-center">
        <h1 class="m-4">Welcome to the Monopoly Bank!</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-5 col-sm-4 offset-sm-1 col-lg-3 offset-lg-2 text-center">
        <RouterLink
          to="/game"
          class="link" 
        >
          <img class="player-token hvr-rotate" src="@/assets/car.png">
          <h4>Continue an existing game</h4>
        </RouterLink>
      </div>
      <div class="col-5 offset-2 col-sm-4 offset-sm-2 col-lg-3 text-center">
        <RouterLink
          to="/newgame"
          class="link"
        >
          <img class="player-token dog hvr-rotate" src="@/assets/dog.png">
          <h4>Start a new game</h4>
        </RouterLink>
      </div>
    </div>
    
  </div>
</template>

<style>
.player-token {
  width: 16rem;
}

.dog {
  transform: scaleX(-1);
}

.link:hover {
  text-decoration: none
}

/* Rotate */
.hvr-rotate {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}
.hvr-rotate:hover, .hvr-rotate:focus, .hvr-rotate:active {
  -webkit-transform: rotate(5deg);
  transform: rotate(5deg);
}
</style>
