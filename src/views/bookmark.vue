<template>
	<div class="bg">
		<div class="header">
			<router-link to="/" class="back"><img src="/static/img/back-2.png" alt=""></router-link>
			<div class="buttonclass">
				<button @click="select(true)" :class="active?'active':'unactive'">住过</button>
				<button @click="select(false)" :class="!active?'active':'unactive'">收藏</button>
			</div>
		</div>
		<div class="list">
			<hotel-info-simple v-for="(item,index) in hotels" :info="item" :key="item.branchId"></hotel-info-simple>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default{
	data:function(){
		return{
			lived:[],
			collected:[],
			// {
			// 	name:"锐思堡国际公寓 (南海万达广场店)",
			// 	score:5.0,
			// 	distance:100,
			// 	price:138,
			// 	customers:1000,
			// 	lastOrder:30,
			// 	img:'/static/img/home-1.png',
			// 	url:'/'
			// }
			active:true
		}
	},
	computed:{
		hotels(){
			if(this.active)
				return this.lived;
			else
				return this.collected;
		},
		...mapState({
			phone:state=>state.phone,
			wxid:state=>state.openId,
		})
	},
	created:function(){
		if(this.phone){
			this.$http.post('http://api.shiyushuo.net/WXBOOK/book.php',
			{	
				act:"myLived", 
				phone:this.phone
			},
			{
				emulateJSON:true,
			}).then(function(res){
				console.log(res)
				this.lived = res.body.data
			},err=>console.log(err));
		}

		// if(this.wxid){
			this.$http.post('http://api.shiyushuo.net/WXBOOK/book.php',
			{	
				act:"myCollection",
				wxid:this.wxid
			},
			{
				emulateJSON:true,
			}).then(function(res){
				console.log(res)
				this.collected = res.body.data
			},err=>console.log(err));
		// }
	},
	methods: {
		select(b) {
			this.active=b;
		}
	}
}
</script>
<style scoped lang="less">
.bg{
	min-height:100%;
	background:#f2f2f2;
	.header{
		position:fixed;
		width:100%;
		top:0;
		background:#fff;
		height:1.173333rem;
			// line-height:1.173333rem;
			// text-align:center;
			display:flex;
			justify-content:center;
			align-items:center;
			border-bottom:1px solid #aaa;
			.back{
				display:block;
				position:absolute;
				left:0.32rem;
				top:0.36rem;
				img{
					width:0.266667rem;
				}
			}
			.buttonclass{
				border:1px solid #ea5319;
				border-radius:0.133333rem;
				overflow: hidden;
				button{
					width:2.133333rem;
					height:0.746667rem;
					font-size:0.373333rem;
					border:none;
				}
				.active{
					color:#fefefe;
					background:#ea5319;
				}
				.unactive{
					color:#ea5319;
					background:#fff;
				}
			}
			
		}
		.list{
			margin-top:1.173333rem;
		}
	}
	</style>