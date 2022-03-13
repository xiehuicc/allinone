import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login/login'
import sideBar from '../views/sideBar'
import tenant from '../views/person/tenant'
import visitor from '../views/person/visitor'
import employee from '../views/person/employee'
import roomMessage from '../views/room/roomMessage'
import roomConfigs from '../views/room/roomConfigs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component:login
    },
    {
      path: '/sideBar',
      name:'home',
      component: sideBar,
      children: [
        {
          path: '/tenant',
          component: tenant
        },
        {
          path: '/visitor',
          component:visitor
        },
        {
          path: '/employee',
          component:employee
        },
        {
          path: '/roomMessage',
          component:roomMessage
        },
        {
          path: '/roomConfigs',
          component:roomConfigs
        }
      ]
    },
  ]
})
