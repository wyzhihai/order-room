<template>
  <div class="bg">
  	<div class="banner">
	  	<mt-swipe :showIndicators="false">
	  		<mt-swipe-item><img src="/static/img/banner-1.png" alt=""></mt-swipe-item>
	  		<mt-swipe-item><img src="/static/img/banner-2.png" alt=""></mt-swipe-item>
	  		<mt-swipe-item><img src="/static/img/banner-3.png" alt=""></mt-swipe-item>
	  		<mt-swipe-item><img src="/static/img/banner-4.png" alt=""></mt-swipe-item>
	  	</mt-swipe>
	  </div>
	  <div class="links">
  		<router-link to="/destination" class="link">
  			<span class="title">目的地</span>
  			<span class="destination">佛山</span>
  		</router-link>
  		<a href="#" class="link time">
  			<span class="title">时间</span>
			<span class="date">04月10日<br>04月26日</span>
			<span class="week">周二入住<br>周四离店 共16晚
			</span>
  		</a>
  		<router-link to="/search" class="link">
  			<span class="title">搜索</span>
  			<span class="place">我的附近</span>
  			<span class="tips">酒店名/地名/关键词</span>
  		</router-link>
  		<a href="#" class="link">
  			<span class="title">星级价格</span>
  			<span class="star default">不限价格，不限星级</span>
  		</a>
	  </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.bg{
		background:#f2f2f2;
	}
	.banner{
		width:100%;
		height:4.0rem;
	}
	.banner img{
		width:10.0rem;
		height:4.0rem;
	}
	.links{
		width:9.36rem;
		border-radius:16px;
		background:#fff;
		padding:0 0.4rem;
		margin:0 auto;
	}
	.links .link{
		display:block;
		width:8.56rem;
		height:1.333333rem;
		line-height:1.333333rem;
		border-bottom:1px solid #dfdfdf;
		font-size:0.373333rem;
		background-image:url('/static/img/right@2x.png');
		background-repeat:no-repeat;
		background-size:0.16rem 0.266667rem;
		background-position:center right;
	}
	.links .title{
		display:inline-block;
		width:1.866667rem;
	}
	
	.links .destination,
	.links .time .date,
	.links .place,
	.links .star{
		color:#000;
		font-size:0.426667rem;
	}
	.links .place{
		margin-right:0.693333rem;
	}
	.links .time{
		display:flex;
		line-height:normal;
		align-items:center;
	}
	.links .time .date{
		margin-right:0.213333rem;
	}
	.links .tips,
	.links .star.default{
		font-size:0.373333rem;
		color:#999;
	}
</style>
