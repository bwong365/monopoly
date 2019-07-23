<template>
  <div>

    <div class="row">
      <div class="col-12 text-center">
        <h1 class="m-4">Welcome to the Monopoly Bank!</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-5 col-sm-4 offset-sm-1 col-lg-3 offset-lg-2 text-center">
        <RouterLink to="/game">
          <img class="player-token" src="@/assets/car.png">
          <h4>Continue an existing game</h4>
        </RouterLink>
      </div>
      <div class="col-5 offset-2 col-sm-4 offset-sm-2 col-lg-3 text-center">
        <RouterLink to="/newgame">
          <img class="player-token dog" src="@/assets/dog.png">
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
</style>
