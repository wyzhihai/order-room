<template>
	<div class="bg">
		<header-bar back="/" title="锐思堡国际公寓"></header-bar>
		<div v-if="searchFail" class="error"><img src="/static/img/warning.png" alt="">暂无相关酒店，我们为你推荐附近酒店</div>
		<!-- <div class="sort-bar">
			<div class="item">
				<span class="text">3月27日<br>入住1晚</span>
				<img src="/static/img/below-default.png" alt="">
			</div>
			<div class="item">
				<span class="text">智能排行</span>
				<img src="/static/img/below-default.png" alt="">
			</div>
			<div class="item">
				<span class="text">位置区域</span>
				<img src="/static/img/below-default.png" alt="">
			</div>
			<div class="item">
				<span class="text">筛选</span>
				<img src="/static/img/below-default.png" alt="">
			</div>
		</div> -->
		<div class="list">
			<hotel-info v-for="(item,index) in hotels" :key="index" :info="item"></hotel-info>
		</div>
		
	</div>
</template>
<script>
import {mapState} from 'vuex';
export default{
	beforeRouteEnter(to,from,next){
		next(function(vm){
			if(from.path=="/")
				vm.loadHotelList();
		})
	},
	data:function(){
		return{
			searchFail:false
		}
	},
	computed:{
		...mapState({
			hotels:state=>state.hotelList,
			destination:state=>state.searchInfo.destination,
			keyword:state=>state.searchInfo.keyword,
			stime:state=>state.searchInfo.stime,
			etime:state=>state.searchInfo.etime,
			longitude:state=>state.searchInfo.longitude,
			latitude:state=>state.searchInfo.latitude,
			currentCity:state=>state.currentPosition.city?state.currentPosition.city.replace('市',''):'',
		})
	},
	methods:{
		loadHotelList(){
			this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',
			{	
				params:{
					act:'index',
					city:this.destination||this.currentCity,
					keyWord:this.keyword||'万达广场',
					stime:this.toTimeString(this.stime),
					etime:this.toTimeString(this.etime),
					longitude:this.longitude,
					latitude:this.latitude
				}
			}).then(function(res){
				console.log('hotel list',res)
				this.searchFail=res.body.code==208;
				this.$store.commit('saveHotelList',res.body.data)
			},err=>console.log(err));
		},
		toTimeString(date){
			return date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"号"
		},
	}
}
</script>
<style scoped lang="less">
.bg{
	height:100%;
	background:#f2f2f2;
	padding-top:1.15rem;
	.error{
		height:0.666667rem;
		line-height:0.666667rem;
		background:#ffcbcf;
		font-size:0.32rem;
		color:#fe4c5a;
		img{
			width:0.426667rem;
			vertical-align:middle;
			margin:0 0.266667rem;
		}
	}
	.sort-bar{
		font-size:0.32rem;
		color:#333;
		background:#fff;
		height:1.28rem;
		display:flex;
		justify-content:space-around;
		align-items:center;
		border-bottom:1px solid #aaa;

		.item{
			display:flex;
			align-items:center;
			img{
				width:0.213333rem;
				margin-left:0.266667rem;
			}
		}
	}
	.list{
		background:#fff;
		border-top:1px solid #aaa;
	}
}
</style>