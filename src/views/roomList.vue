<template>
	<div class='bg'>
		<router-link to="/hotelPhoto" class="banner">
			<div :style="{background:'rgba(255,255,255,'+opacity+')'}" class="header">
				<router-link class="back" :to="from">
					<img src="/static/img/back-3.png" alt="">
				</router-link>
				<span :style="{color:'rgb('+color+','+color+','+color+')'}" class="title">酒店详情</span>
			</div>
			<img class="pic" src="static/img/roomlist/particularsbanner-1.png" alt="">
			<img class='btn' @click.prevent="toggleCollect" :src="collected?'static/img/collect-pressed.png':'static/img/collect-default.png'">
		</router-link>
		<router-link class="link" to="/comments" style="border-bottom:1px solid #dfdfdf">
			<h3>{{hotel.name}}</h3>
			<span class="blue score">{{'5.0'}}<small>分</small> {{'很好'}}</span>
			<span class="blue right">{{comCount}}条评论</span>
		</router-link>
		<router-link class="link" to="/map">
			<h3>{{hotel.branchCity}}市 {{hotel.branchDistrict}} {{hotel.branchAddres}}</h3>
			<span class="gray">距我{{hotel.distance}}</span>
			<span class=" gray right">查看地图</span>
		</router-link>
		<div @click="showDate=true" class="select-date">
			<span class="date">{{stime|toLocaleDateString}} <!-- <span class="gray">今天</span> --> — {{etime|toLocaleDateString}} <!-- <span class="gray">明天</span> --></span>
			<span class="right">共{{days}}晚</span>
		</div>
		<room-info @openPrice="showAllPrice" v-for="(item,index) in roomList" :info='item' :key="index" :index="index"></room-info>
		<vip-price @close="showPrice=false" :allPrice="allPrice" v-if="showPrice"></vip-price>
		<select-date @close="showDate=false" v-if="showDate"></select-date>
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default{
	beforeRouteEnter(to,from,next){
		next(function(vm){
			if(from.path=="/hotelList"||from.path=="/myOrder"||from.path=='/bookMark'||from.path=='/'){
				vm.from=from.path;
				vm.loadRoomList();
			}
		})
	},
	created(){
		window.addEventListener('scroll',this.scroll);
		if(this.phone&&this.openId){
			this.$http.post('http://api.shiyushuo.net/WXBOOK/book.php',
			{	
				act:"myCollection",
				wxid:this.openId
			},
			{
				emulateJSON:true,
			}).then(function(res){
				this.collectList = res.body.data;
				for(var i = 0,len=this.collectList.length; i < len; i++) { 
					if(this.collectList[i].branchId == this.hotelId)
						this.collected=true
				}
			},err=>console.log(err))
		}
		
	},
	destroyed(){
		window.removeEventListener('scroll',this.scroll)
	},
	data:function(){
		return{
			showPrice:false,
			showDate:false,
			allPrice:{},
			from:'/hotelList',
			scrollTop:0,
			collected:false
		}
	},
	computed:{
		days(){
			return (this.etime.getTime()-this.stime.getTime())/1000/60/60/24;
		},
		opacity(){
			if(this.scrollTop<=100)
				return this.scrollTop/100;
			else
				return 1;
		},
		color(){
			if(this.scrollTop<=100)
				return 255-Math.ceil(this.scrollTop*255/100);
			else
				return 0
		},
		hotelId(){
			return this.$route.query.id||this.hotel.id;
		},
		...mapState({
			hotel:state=>state.currentHotel,
			stime:state=>state.searchInfo.stime,
			etime:state=>state.searchInfo.etime,
			roomList:state=>state.roomList,
			userName:state=>state.userName,
			openId:state=>state.openId,
			phone:state=>state.phone,
			longitude:state=>state.searchInfo.longitude,
			latitude:state=>state.searchInfo.latitude,
			comCount:state=>state.currentHotel.comCount,
			destination:state=>state.searchInfo.destination,
			currentCity:state=>state.currentPosition.city?state.currentPosition.city.replace('市',''):'',
		})
	},
	methods:{
		loadRoomList(){
			var params={
				act:'detail',
				branchId:this.hotelId,
				longitude:this.longitude,
				Latitude:this.latitude
			}
			if(this.from=='/bookMark'||this.from=='/myOrder')
				params.act='idDetail';
			this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',{params}).then(function(res){
				console.log('room list',res)
				var currentHotel={
					Latitude:res.body.Latitude,
					Longitude:res.body.Longitude,
					branchCity:res.body.branchCity,
					branchAddres:res.body.branchAddres,
					branchDistrict:res.body.branchDistrict,
					cover:"http://api.shiyushuo.net/HMS/imgOne/b2e09416aa8d00277534d593025d7a11.png",
					distance:res.body.distance,
					id:this.hotelId,
					name:res.body.fullname,
					comCount:res.body.comCount
				}
				if(this.from=='/hotelList'){
					this.$store.commit('saveComCount',res.body.comCount)
					this.$store.commit('saveHotelCity',this.destination||this.currentCity)
				}
				else
					this.$store.commit('saveHotel',currentHotel)
				this.$store.commit('saveRoomList',res.body.data);
				
			},function(err){
				console.log(err);
			})
		},
		toggleCollect() {
			if(this.phone&&this.openId){
				if(this.collected){
					this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',{
						params:{
							act:'delCollect',
							branchId: this.hotelId,
							wxid: this.openId 
						}
					}).then(function(res){
						if(res.data.code==200){
							alert(res.data.Msg)
							this.collected = !this.collected;
						}
						else{
							alert(res.data.Msg);
						}
					},function(err){
						console.log(err);
					})
				}
				else {
					this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',{
						params:{
							act:'addCollect',
							username: this.userName,
							branchId: this.hotelId,
							wxid: this.openId 
						}
					}).then(function(res){
						if(res.data.code==200){
							alert(res.data.Msg)
							this.collected = !this.collected;
						}
						else{
							alert(res.data.Msg);
						}
					},function(err){
						console.log(err);
					})
				}
			}
			else
				this.$store.commit('changeLogin',true);
			
			
		},
		showAllPrice(allPrice){
			this.allPrice=allPrice;
			this.showPrice=true;
		},
		scroll(){
			this.scrollTop=window.pageYOffset;
		}
	},
	filters:{
		toLocaleDateString(date){
			return (date.getMonth()+1)+'月'+date.getDate()+'日';
		},
	}
}
</script>
<style scoped lang="less">
.bg{
	background:#f2f2f2;
	min-height:100%;
	.banner{
		display:block;
		width:100%;
		position:relative;
		.header{
			width:100%;
			position:fixed;
			line-height:1.066667rem;
			color:#fff;
			text-align:center;
			font-size:0.48rem;
			.back{
				display:block;
				position:absolute;
				left:0.32rem;
				top:0.106667rem;
				img{
					width:0.88rem;
				}
			}
		}
		.pic{
			width:100%;
		}
		.btn{
			position:absolute;
			width:1.52rem;
			height:1.52rem;
			border-radius:0.533333rem;
			bottom:-0.85rem;
			right:0.333333rem;
		}
	}
	.link{
		padding:0.4rem 0.32rem;
		display:block;
		background:#fff;
		h3{
			font-size:0.4rem;
			color:#010101;
			margin-bottom:0.133333rem;
			width:75%;
		}
		.blue{
			color:#49adff;
			font-size:0.36rem;
		}
		.gray{
			color:#999;
			font-size:0.36rem;
		}
		.right{
			float:right;
			padding-right:0.48rem;
			background:url('/static/img/right@2x.png') right center no-repeat;
			background-size:0.16rem;
		}
	}
	.select-date{
		line-height:1.2rem;
		font-size:0.373333rem;
		color:#010101;
		margin-top:0.266667rem;
		border-bottom:1px solid #dfdfdf;
		background:#fff;
		padding:0 0.32rem;
		.date{
			padding-left:0.666667rem;
			background:url('/static/img/calendar.png') left center no-repeat;
			background-size:0.373333rem;
		}
		.right{
			float:right;
			color:#ea5319;
			font-size:0.293333rem;
			padding-right:0.48rem;
			background:url('/static/img/right@2x.png') right center no-repeat;
			background-size:0.16rem;
		}
		.gray{
			color:#999;
			font-size:0.293333rem;
		}
	}
}
</style>