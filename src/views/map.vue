<template>
  <!-- 添加标题组件 -->
  <div>
    <header-bar :back="back" title="酒店位置"></header-bar>
    <div class="MapContent">
      <!-- 地图展示 -->
      <iframe class="mapClass" :src ="encodeSearchParams" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import AMap from 'AMap'
import {mapState} from 'vuex'
export default {

  mounted: function () {
    var map, geolocation
    map = new AMap.Map('container', {
      resizeEnable: true
    })
    map.plugin('AMap.Geolocation', function () {
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 200, // 超过2秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition: 'RB'
      })
      map.addControl (geolocation)
      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', onComplete.bind(this))// 返回定位信息
      AMap.event.addListener(geolocation, 'error', onError)// 返回定位出错信息
    }.bind(this))
    // 解析定位结果
    function onComplete (data) {
      var str= []
      str.push(data.position.getLng())
      str.push(data.position.getLat())
      // this.start_x = data.position.getLng()
      // this.start_y = data.position.getLat()
      // this.urls="http://m.amap.com/navi/"+'?start=' + this.start_x + ',' + this.start_y + '&dest='  + '&destName=%E9%98%9C%E9%80%9A%E8%A5%BF&naviBy=car&key=2eff81d0bb5abbb426074b9360e87511'
    }
    // 解析定位错误信息
    function onError(data) {
      console.log('定位失败')
    }
  },
  beforeRouteEnter(to,from,next){
    next(function(vm){
      vm.back=from.path;
    })
  },
  data () {
    return {
      back:'/'
    }
  },
  
  computed: {
    encodeSearchParams () {
      return 'http://m.amap.com/navi/' + '?start=' + this.start_x + ',' + this.start_y + '&dest=' +this.dest_x+','+this.dest_y+ '&destName=%E9%98%9C%E9%80%9A%E8%A5%BF&naviBy=car&key=2eff81d0bb5abbb426074b9360e87511'
    },
    ...mapState({
      start_x:state=>state.searchInfo.longitude,
      start_y:state=>state.searchInfo.latitude,
      dest_x:state=>state.currentHotel.Longitude,
      dest_y:state=>state.currentHotel.Latitude
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.MapContent{
  width: 100%;
  height: 16.266667rem /* 610/37.5 */;
  display: block;
  position: fixed;
  top: 1.066667rem /* 40/37.5 */;
  bottom: 1px;
  .mapClass{
    position: fixed;
    top: 1.066667rem /* 40/37.5 */;
    bottom: 0;
    width: 100%;
    border: none;
    overflow: hidden;
    height: 94%;

  }
}
</style>
