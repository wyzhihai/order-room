<template>
	<div class="bg">
		<div class="top">
			<header-bar back="/" title="选择目的地"></header-bar>
			<!-- <input type="text" placeholder="城市/酒店名"> -->
		</div>
		<div class="current">
			<h2>当前位置</h2>
			<router-link class="location" to="/destination">
				<img src="/static/img/location-1.png" alt="">
				<div class="detail">
					<h3>{{currentStreet}}</h3>
					<p>{{currentPosition}}</p>
				</div>
			</router-link>
		</div>
		<div class="recent">
			<router-link @click.native="select(currentCity)" class="btn" to="/">{{currentCity}}</router-link>
		</div>
		<div class="hot">
			<h2>热门搜索</h2>
			<div class="btns">
				<router-link @click.native="select(item)" to="/" class="btn" v-for="(item,index) in hotCity" :key="index">
					{{item}}
				</router-link>
				<div class="btn"></div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default{

	data:function(){
		return{
			hotCity:["广州","佛山","东莞","长沙","柳州","合肥","常德"]
		}
	},
	computed:{
		...mapState({
			currentPosition:state=>state.currentPosition.city+state.currentPosition.district+state.currentPosition.neighborhood||'佛山市南海区桂南路28号',
			currentCity:state=>state.currentPosition.city?state.currentPosition.city.replace('市',''):'佛山',
			currentStreet:state=>state.currentPosition.street||'万达广场'
		})
	},
	methods:{
		select(item){
			this.$store.commit('changeDestination',item)
		}
	}
}
</script>
<style scoped lang="less">
.bg{
	background:#f2f2f2;
	height:100%;
	.top{
		background:#fff;
		text-align:center;
		line-height:1.173333rem;
		input{
			width:93.3%;
			height:0.8rem;
			border:1px solid #ea5319;
			border-radius:0.4rem;
			margin-top:1.173333rem;
			margin-bottom:0.24rem;
			padding-left:0.906667rem;
			background:url('/static/img/search.png') 0.266667rem center no-repeat;
			background-size:0.373333rem 0.373333rem;
			&::placeholder{
				color:#999;
				font-size:0.373333rem;
			}
		}
	}
	.current{
		background:#fff;
		margin-top:0.4rem;
		padding:0 0.32rem;
		margin-top:1.173333rem;
		border-top:1px solid #aaa;
		// border-top:1px solid transparent;
			// padding-top:0.1px;
			border-bottom:1px solid #dfdfdf;
			h2{
				font-size:0.4rem;
				color:#010101;
				margin-top:0.293333rem;
				margin-bottom:0.426667rem;
			}
			.location{
				display:flex;
				img{
					align-self:flex-start;
					width:0.293333rem;
					margin-right:0.24rem;
				}
				.detail{
					flex-grow:1;
					h3{
						font-size:0.4rem;
						color:#000;
						margin-bottom:0.16rem;
					}
					p{
						font-size:0.266667rem;
						color:#999;
						margin-bottom:0.186667rem;
					}
				}
			}
		}
		.recent{
			background:#fff;
			padding:0.16rem 0.32rem;
		}
		.btn{
			display:block;
			width:2.133333rem;
			height:0.933333rem;
			line-height:0.933333rem;
			text-align:center;
			border:1px solid #999;
			border-radius:0.106667rem;
			font-size:0.4rem;
			color:#000;
			&:last-child:not(:first-child){
				opacity:0;
			}
		}
		.hot{
			margin-top:0.4rem;
			background:#fff;
			padding:0.266667rem 0.32rem;
			h2{
				font-size:0.4rem;
				color:#010101;
				margin-bottom:0.533333rem;
			}
			.btns{
				height:2.133333rem;
				display:flex;
				flex-wrap:wrap;
				justify-content:space-between;
				align-content:space-between;
			}
		}
	}
	</style>