import Vue from 'vue'
import Router from 'vue-router'
import home from '@/home'
import destination from '@/destination'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },{
    	path:'/destination',
    	name:'destination',
    	component:destination
    }
  ]
})
