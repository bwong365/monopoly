import Vue from 'vue'
import Router from 'vue-router'
import AppHome from './views/Home'
import AppNewGame from './views/NewGame'
import AppGame from './views/Game'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: AppHome },
    { path: '/newgame', component: AppNewGame },
    { path: '/game', component: AppGame },
  ]
})
