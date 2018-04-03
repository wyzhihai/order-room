<template>
  <div>
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
  		<button>查找酒店</button>
  		<div class="menu">
  			<span class="menu-item">住过/收藏</span>
  			<span class="menu-item">我的订单</span>
  			<span class="menu-item">会员中心</span>
  		</div>
	  </div>
	  <router-link to="/"><img class="member" src="static/img/0@2x.png" alt=""></router-link>
  </div>
  <div class="recommend">
  	<h2>为你推荐</h2>
		<router-link class="item" to="/" v-for="(item,index) in hotels" :key="index">
			<img :src="item.img" alt="">
			<div class="info">
				<div>
					<h3>{{item.name}}</h3>
					<span class="blue">
						<strong>{{item.score}}</strong><small>分</small>
						<span>{{'很好'}}</span>
					</span>
					<span class="gray">
						{{item.customers}}人消费<br>
						<span>距我{{item.distance}}，{{"万达广场"}}</span>
					</span>
				</div>
				<div>
					<span class="red">￥<strong>{{item.price}}</strong>起</span>
					<span class="right gray">{{item.lastOrder}}小时前有人预定</span>
				</div>
				
			</div>
		</router-link>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hotels:[
      	{
      		name:"锐思堡国际公寓 (南海万达广场店)",
      		score:5.0,
      		distance:100,
      		price:188,
      		customers:1000,
      		lastOrder:30,
      		img:'/static/img/home-1.png'
      	},
      	{
      		name:"2513乐尚酒店公寓 (南海万达广场店)",
      		score:5.0,
      		distance:100,
      		price:188,
      		customers:1000,
      		lastOrder:30,
      		img:'/static/img/home-2.png'
      	}
      ]
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
		font-size:0.373333rem;
		padding-bottom:0.533333rem;
		transform:translateY(-0.693333rem);
	}
	.links .link{
		display:block;
		width:8.56rem;
		height:1.333333rem;
		line-height:1.333333rem;
		border-bottom:1px solid #dfdfdf;
		background-image:url('/static/img/right@2x.png');
		background-repeat:no-repeat;
		background-size:0.16rem 0.266667rem;
		background-position:center right;
		text-decoration:none !important;
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
	.links button{
		width:8.56rem;
		height:1.2rem;
		border:none;
		border-radius:0.6rem;
		background:#ea5319;
		color:#fff;
		font-size:0.426667rem;
		margin:0.666667rem 0 1.066667rem 0;
	}
	.links .menu{
		display:flex;
		justify-content:space-between;
	}
	.links .menu .menu-item{
		line-height:24px;
		padding-left:0.613333rem;
		background-repeat:no-repeat;
		background-size:0.346667rem 0.32rem;
		background-position:center left;
	}
	.links .menu .menu-item:nth-child(1){
		background-image:url('/static/img/collect@2x.png');
	}
	.links .menu .menu-item:nth-child(2){
		background-image:url('/static/img/wodedingdan@2x.png');
	}
	.links .menu .menu-item:nth-child(3){
		background-image:url('/static/img/member@2x.png');
	}
	.member{
		width:100%;
		margin:-0.426667rem 0 0.266667rem 0;
	}
	.recommend h2{
		font-size:0.48rem;
		color:#333;
		text-align:center;
		padding:0.32rem 0 0.293333rem 0;
		border-bottom:1px solid #dfdfdf;
	}
	.recommend .item{
		display:flex;
		align-items:flex-start;
		margin-bottom:0.133333rem;
	}
	.recommend img{
		width:2.666667rem;
		margin-right:0.266667rem;
	}
	.recommend .info{
		align-self:stretch;
		flex-grow:1;
		display:flex;
		flex-direction:column;
		justify-content:space-between;
		padding:0.266667rem 0.32rem 0.266667rem 0;
		border-bottom:1px solid #dfdfdf;
	}
	.recommend .info h3{
		font-size:0.4rem;
		color:#010101;
	}
	.recommend .info .blue{
		font-size:0.426667rem;
		color:#49adff;
		margin-right:0.32rem;
	}
	.recommend .info .blue small{
		font-size:0.32rem;
		margin-right:0.133333rem;
	}
	.recomment .info .gray{
		font-size:0.32rem;
		color:#999;
	}
	.recommend .info .red{
		font-size:0.32rem;
		color:#ea5319;
	}
	.recommend .info .red strong{
		font-size:0.426667rem;
	}
	.recommend .info .right{
		float:right;
	}
</style>
