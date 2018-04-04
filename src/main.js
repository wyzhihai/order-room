// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css'
import {Swipe,SwipeItem} from 'mint-ui';
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.config.productionTip = false;

import headerBar from "@/components/headerBar";
import hotelInfo from "@/components/hotelInfo";
import hotelInfoSimple from "@/components/hotelInfoSimple";
Vue.component('header-bar',headerBar);
Vue.component('hotel-info',hotelInfo);
Vue.component('hotel-info-simple',hotelInfoSimple);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
