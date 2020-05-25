import Vue from 'vue'
import VueRouter from 'vue-router'
import Map from '../views/Map.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Map',
    component: Map
  },
  {
    path: '/addPlace',
    name: 'addPlace',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddPlace.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
