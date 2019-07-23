import Vue from 'vue'
import Router from 'vue-router'
import AppHome from './views/Home'
import NewGame from './views/NewGame'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: AppHome },
    { path: 'newgame', component: NewGame }
  ]
})
