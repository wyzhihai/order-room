import Vue from 'vue'
import Router from 'vue-router'
import home from '@/home'
import destination from '@/destination'
import search from '@/search'
import resultList from '@/resultList'
import bookmark from '@/bookmark'
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
    },{
    	path:'/search',
    	name:'search',
    	component:search
    },{
    	path:'/resultList',
    	name:'resultList',
    	component:resultList
    },{
    	path:'/bookmark',
    	name:'bookmark',
    	component:bookmark
    }
  ]
})
