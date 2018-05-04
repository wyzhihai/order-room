// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store'
// import iView from 'iview';
import {Carousel,CarouselItem} from 'iview'
Vue.component('Carousel',Carousel)
Vue.component('CarouselItem',CarouselItem)
import 'iview/dist/styles/iview.css'
// Vue.use(iView);
Vue.use(VueResource)
Vue.config.productionTip = false;

import headerBar from "@/components/headerBar";
import hotelInfo from "@/components/hotelInfo";
import hotelInfoSimple from "@/components/hotelInfoSimple";
import orderInfo from "@/components/orderInfo";
import roomInfo from '@/components/roomInfo';
import commentInfo from '@/components/commentInfo'
// import { Swipe, SwipeItem } from '@/components/swipe';
import Rate from '@/components/rate';
import vipPrice from '@/components/vipPrice';
import starLevel from '@/components/starLevel'
import selectDate from '@/components/selectDate'
import calendar from '@/components/calendar.vue'
import login from '@/components/login'
import upload from '@/components/upload'
import vipSuccess from '@/components/vipSuccess'
Vue.component('header-bar',headerBar);
Vue.component('hotel-info',hotelInfo);
Vue.component('hotel-info-simple',hotelInfoSimple);
Vue.component('order-info',orderInfo);
Vue.component('room-info',roomInfo);
Vue.component('comment-info',commentInfo);
// Vue.component('swipe', Swipe);
// Vue.component('swipe-item', SwipeItem);
Vue.component('rate',Rate);
Vue.component('vip-price',vipPrice);
Vue.component('star-level',starLevel);
Vue.component('select-date',selectDate)
Vue.component('calendar',calendar)
Vue.component('login',login)
Vue.component('upload',upload)
Vue.component('vip-success',vipSuccess)
/* eslint-disable no-new */
var vm=new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
