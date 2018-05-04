<template>
	<router-link :to="{path:'/roomDetail',query:{index}}" class="item">
		<!-- <img :src="info.img[0]" alt=""> -->
		<div class="img" :style="{backgroundImage:'url('+info.img[0]+')',backgroundSize:'cover'}"></div>
		<div class="info">
			<div class="left">
				<h3>{{info.styleName}}</h3>
				<span class="gray">{{22}}m<small><sup>2</sup></small> | {{'单人床1.5m'}} | {{true?'有窗':'无窗'}}</span><br>
				<span class="original-price">
					<span :class="userInfo.vipRank?'gray':'orange'">
						￥{{info.oldPrice}}
					</span>
				</span><br>
				<span v-if="userInfo.vipRank" class="vip-price">会员价：<span class="orange"><small>￥</small>{{price}}</span></span><br>
				<span @click.stop.prevent="openPrice" class="check">查看会员价</span>
			</div>
			<a @click.stop.prevent="orderRoom" href="#" :class="{disabled:!canOrder}" class="right">
				<div class="top">订</div>
				<div class="bottom">在线付</div>
			</a>
		</div>
	</router-link>
</template>
<script>
import {mapState} from 'vuex'
export default{
	created:function(){
		
	},
	props:['info','index'],
	computed:{
		canOrder(){
			return this.info.reserve.code==200
		},
		...mapState({
			phone:state=>state.phone,
			shouldLogin:state=>state.shouldLogin,
			userInfo:state=>state.userInfo,
		}),
		price:function(){
			switch(this.userInfo.vipRank){
				case '':
				return this.info.oldPrice;
				case '大众会员':
				return this.info.allPrice.publicPrice;
				case '黄金会员':
				return this.info.allPrice.goldPrice;
				case '钻石会员':
				return this.info.allPrice.diamondPrice;
				default:
				return this.info.oldPrice;
			} 
		},
	},
	methods:{
		openPrice(){
			this.$emit('openPrice',this.info.allPrice);
			// console.log(11111,this.info.allPrice)
		},
		orderRoom(){
			if(this.canOrder&&this.phone)
			{
				this.$store.commit('saveRoomId',this.index);
				this.$router.push({ path: '/orderRoom',query:{index:this.index}});
			}
			else if(this.canOrder){
				this.$store.commit('changeLogin',true);
			}
		}
	}
}
</script>
<style scoped lang="less">
.item{
	padding:0.133333rem 0.32rem;
	border-bottom:1px solid #dfdfdf;
	background:#fff;
	display:flex;
	align-items:flex-start;
	.img{
		width:2.933333rem;
		height:2.933333rem;
		margin-right:0.266667rem;
	}
	.info{
		flex-grow:1;
		align-self:stretch;
		display:flex;
		align-items:center;
		.left{
			flex-grow:1;
			// display:flex;
			// flex-direction:column;
			// justify-content:space-around;
			// height:2.933333rem;
			h3{
				font-size:0.4rem;
				color:#010101;
			}
			.gray{
				color:#999;
				font-size:0.32rem;
				margin:0.32rem 0;
			}
			.original-price{
				.gray{
					text-decoration:line-through;
				}
				.orange{
					font-size:0.4rem;
					color:#ea5319;
				}
			}
			.vip-price{
				font-size:0.32rem;
				color:#333;
				margin-top:0.213333rem;
				margin-bottom:0.32rem;
				.orange{
					font-size:0.4rem;
					color:#ea5319;
				}
			}
			.check{
				font-size:0.32rem;
				color:#ea5319;
			}
		}
		.right{
			display:block;
			width:1.6rem;
			border:1px solid #ea5319;
			border-radius:0.106667rem;
			.top{
				height:0.8rem;
				line-height:0.8rem;
				color:#fff;
				background:#ea5319;
				text-align:center;
				font-size:0.4rem;
			}
			.bottom{
				height:0.533333rem;
				line-height:0.533333rem;
				color:#ea5319;
				text-align:center;
				font-size:0.32rem;
			}
		}
		.disabled{
			border:1px solid #999;
			.top{
				background:#999;
			}
			.bottom{
				color:#999;
			}
		}
	}
}
</style>