import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import destination from '@/views/destination'
import search from '@/views/search'
import hotelList from '@/views/hotelList'
import bookmark from '@/views/bookmark'
import myOrder from '@/views/myOrder'
import member from '@/views/member'
import roomList from '@/views/roomList'
import hotelPhoto from '@/views/hotelPhoto'
import roomDetail from '@/views/roomDetail'
import orderRoom from '@/views/orderRoom'
import comments from '@/views/comments'
import map from '@/views/map'
import orderState from '@/views/orderState'
import wait from '@/components/wait'
import success from '@/components/success'
import fail from '@/components/fail'
import addComment from '@/views/addComment'
import test from '@/views/test'

// import calendarTest from '@/views/calendarTest'
Vue.use(Router)

export default new Router({
  mode:'hash',
  routes: [
  {
    path:'/test',
    component:test
  },
  {
    path:'/',
    name:'home',
    component:home
  },{
   path:'/destination',
   name:'destination',
   component:destination
 },{
   path:'/search',
   name:'search',
   component:search
 },{
   path:'/hotelList',
   name:'hotelList',
   component:hotelList
 },{
   path:'/bookmark',
   name:'bookmark',
   component:bookmark
 },{
   path:'/myOrder',
   name:'myOrder',
   component:myOrder
 },{
  path:'/member',
  name:'member',
  component:member
},{
  path:'/roomList',
  name:'roomList',
  component:roomList
},{
  path:'/hotelPhoto',
  name:'hotelPhoto',
  component:hotelPhoto
},{
  path:'/roomDetail',
  name:'roomDetail',
  component:roomDetail
},{
  path:'/orderRoom',
  name:'orderRoom',
  component:orderRoom
},{
  path:'/comments',
  name:'comments',
  component:comments
},{
  path:'/map',
  name:'map',
  component:map
},{
  path:'/orderState',
  name:'orderState',
  component:orderState,
  children:[{
    path:'wait',
    component:wait
  },{
    path:'success',
    component:success
  },{
    path:'fail',
    component:fail
  }]
},{
  path:'/addComment',
  name:'addComment',
  component:addComment
}
]
})
