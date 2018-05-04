<template>
	<div class="bg">
		<div class="banner">
			<Carousel loop autoplay dots="none" arrow="never">
				<CarouselItem>
					<img src="static/img/banner-1.png" alt="">
				</CarouselItem>
				<CarouselItem>
					<img src="static/img/banner-2.png" alt="">
				</CarouselItem>
				<CarouselItem>
					<img src="static/img/banner-3.png" alt="">
				</CarouselItem>
				<CarouselItem>
					<img src="static/img/banner-4.png" alt="">
				</CarouselItem>
			</Carousel>
		</div>
		<div class="links">
			<router-link to="/destination" class="link">
				<span class="title">目的地</span>
				<span class="destination">{{destination?destination:currentCity}} <span v-if="!currentCity&&!destination">自动定位中...</span></span>
			</router-link>
			<a @click="showSelectDate=true" href="#" class="link time">
				<span class="title">时间</span>
				<span class="date">{{stime|toLocaleDateString}}<br>{{etime|toLocaleDateString}}</span>
				<span class="week">周{{stime|toWeek}}入住<br>周{{etime|toWeek}}离店 共{{days}}晚
				</span>
			</a>
			<router-link to="/search" class="link">
				<span class="title">搜索</span>
				<span class="place">{{keyword}}</span>
				<span v-if="!keyword" class="tips">酒店名/地名/关键词</span>
			</router-link>
			<a @click="showStarLevel=true" href="#" class="link">
				<span class="title">星级价格</span>
				<span class="star" :class="{'default':defaultClass}">{{priceText}}，{{starText}}</span>
			</a>
			<router-link class="btn" to="/hotelList">查找酒店</router-link>
			<div class="menu">
				<span @click="jump({path:'/bookMark'})" class="menu-item">住过/收藏</span>
				<span @click="jump({path:'/myOrder'})" class="menu-item">我的订单</span>
				<span @click="jump({path:'/member'})" class="menu-item">会员中心</span>
			</div>
		</div>
		<router-link to="/"><img class="member" src="static/img/0@2x.png" alt=""></router-link>
		<div class="recommend">
			<h2>为你推荐</h2>
			<hotel-info  v-for="(item,index) in hotels" :info="item" :key="item.id"></hotel-info>
		</div>
		<star-level @close="close" v-if="showStarLevel"></star-level>
		<select-date @close="close" v-if="showSelectDate"></select-date>

	</div>
</template>

<script>
import {mapState} from 'vuex';
export default {
	name: 'home',
	created(){
		this.$store.commit('saveHotelList',[])
		this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',{params:{act:'recommend'}}).then(function(res){
			console.log(res);
			this.$store.commit('saveHotelList',res.body.data)
		},function(err){
			// console.log(err);
		})
	},
	filters:{
		toLocaleDateString(date){
			return date.getMonth()+1+'月'+date.getDate()+'日';
		},
		toWeek(date){
			var week=['日','一','二','三','四','五','六'];
			return week[date.getDay()];
		}
	},
	data () {
		return {
			showStarLevel:false,
			showSelectDate:false,
			defaultS:null,
			defaultE:null,
		}
	},
	computed:{
		...mapState({
			hotels:state=>state.hotelList,
			destination:state=>state.searchInfo.destination,
			stime:state=>state.searchInfo.stime,
			etime:state=>state.searchInfo.etime,
			keyword:state=>state.searchInfo.keyword,
			minPrice:state=>state.searchInfo.minPrice,
			maxPrice:state=>state.searchInfo.maxPrice,
			star:state=>state.searchInfo.star,
			longitude:state=>state.searchInfo.longitude,
			latitude:state=>state.searchInfo.latitude,
			currentCity:state=>state.currentPosition.city?state.currentPosition.city.replace('市',''):'',
			phone:state=>state.phone,
			shouldLogin:state=>state.shouldLogin,
			openId:state=>state.openId,
			userInfo:state=>state.userInfo,
		}),

		defaultClass(){
			return this.star==0&&this.minPrice==0&&this.maxPrice==500;
		},
		days(){
			return (this.etime.getTime()-this.stime.getTime())/1000/60/60/24;
		},
		priceText(){
			if(this.minPrice==0&&this.maxPrice==500)
				return '不限价格';
			else if(this.maxPrice==500)
				return '￥'+this.minPrice+'以上';
			else
				return '￥'+this.minPrice+'~'+this.maxPrice;
		},
		starText(){
			if(this.star==0)
				return '不限星级';
			else if(this.star==2)
				return '经济型';
			else if(this.star==3)
				return '舒适/三星';
			else if(this.star==4)
				return '高档/四星';
			else if(this.star==5)
				return'豪华/五星';

		}
	},
	methods:{
		close(){
			this.showStarLevel=false;
			this.showSelectDate=false;
		},
		toTimeString(date){
			return date.getFullYear()+"年"+date.getMonth()+1+"月"+date.getDate()+"号"
		},
		error(err){
			console.log(err);
		},
		jump(path){
			if(this.phone)
				this.$router.push(path)
			else
				this.$store.commit('changeLogin',true);
		},
		
	},
	beforeRouteLeave(to,from,next){
		if(to.path=='/hotelList'&&!this.destination&&!this.currentCity)
			next(false);
		else
			next();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.bg{
	background:#f2f2f2;
}
.banner{
	width:100%;
	height:4.0rem;
}
.banner img{
	width:100%;
}
.links{
	width:93.6%;
	border-radius:16px;
	background:#fff;
	padding:0 0.4rem;
	margin:0 auto;
	font-size:0.373333rem;
	padding-bottom:0.533333rem;
	transform:translateY(-0.693333rem);
}
.links .link{
	color:#666 !important;
	display:block;
	width:100%;
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

.links .time{
	display:flex;
	line-height:normal;
	align-items:center;
	height:1.733333rem;
}
.links .time .date{
	margin-right:0.213333rem;
}
.links .tips,
.links .star.default{
	font-size:0.373333rem;
	color:#999;
}
.links .btn{
	display:block;
	width:100%;
	height:1.2rem;
	line-height:1.2rem;
	text-align:center;
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
.recommend{
	background:#fff;
	h2{
		font-size:0.48rem;
		color:#333;
		text-align:center;
		padding:0.32rem 0 0.293333rem 0;
		border-bottom:1px solid #dfdfdf;
	}
}


</style>
