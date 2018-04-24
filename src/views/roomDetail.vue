<template>
	<div class="bg">
		<div class="header">
			<router-link class="back" to="/roomList"><img src="/static/img/back-2.png" alt=""></router-link>
			<h2>商务大床房</h2>
			<!-- <img class="collect" src="/static/img/collect-default-1.png" alt=""> -->
		</div>
		<swipe class="my-swipe" :speed="3000" :auto="10000" :showIndicators="false">
			<swipe-item class="slide">
				<img :src="room.img[0]" alt="">
			</swipe-item>
			<swipe-item class="slide">
				<img :src="room.img[1]" alt="">
			</swipe-item>
			<swipe-item class="slide">
				<img :src="room.img[2]" alt="">
			</swipe-item>
		</swipe>
		<div class="info">
			<div class="column">
				<div>床型<span>1张双人床1.8m</span></div>
				<div>面积<span>{{room.roomstyle.area}}m<sup>2</sup></span></div>
			</div>
			<div class="column">
				<div>可住<span>{{room.roomstyle.person}}人</span></div>
				<div>早餐<span>{{room.roomstyle.breakfast?'有早餐':'无早餐'}}</span></div>
			</div>
		</div>
		<div class="device">
			<h3>配套设施</h3>
			<div class="wrapper">
				<div class="column">
					<div class="item"><img src="/static/img/roomdetail/shower.png" alt=""><span>热水淋浴</span></div>
					<div class="item"><img src="/static/img/roomdetail/television.png" alt=""><span>电视机</span></div>
					<div class="item"><img src="/static/img/roomdetail/wirednetwork.png" alt=""><span>有线网络</span></div>
					<div class="item"><img src="/static/img/roomdetail/bathfoam.png" alt=""><span>浴液</span></div>
				</div>
				<div class="column">
					<div class="item"><img src="/static/img/roomdetail/wifi.png" alt=""><span>无线网络</span></div>
					<div class="item"><img src="/static/img/roomdetail/elevator.png" alt=""><span>电梯</span></div>
					<div class="item"><img src="/static/img/roomdetail/refrigerator.png" alt=""><span>冰箱</span></div>
					<div class="item"><img src="/static/img/roomdetail/toiletsoap.png" alt=""><span>香皂</span></div>
				</div>
				<div class="column">
					<div class="item"><img src="/static/img/roomdetail/airconditioner.png" alt=""><span>空调冷气</span></div>
					<div class="item"><img src="/static/img/roomdetail/washingmachine.png" alt=""><span>洗衣机</span></div>
					<div class="item"><img src="/static/img/roomdetail/tissue.png" alt=""><span>纸巾</span></div>
				</div>
			</div>
		</div>
		<div class="return">
			<h3>退款规则</h3>
			<p>订单确认后不可取消/变更，如未入住，酒店将扣除全部房费，房间整晚保留，请及时入住。</p>
		</div>
		<div class="use">
			<h3>使用规则</h3>
			<p>直接消费，请携带入住人身份证，凭姓名和预定手机号直接入住</p>
			<p>请在14:00之后入住并于次日12:00之前退房，如需提前入住或延时退房，请咨询前台</p>
			<p>入住需要押金，金额以前台为准</p>
		</div>
		<div class="footer">
			<div class="amount">￥{{room.lowPrice}}</div>
			<div @click="orderRoom" :class="{disabled:!canOrder}" class="btn">预定</div>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex';
export default{
	created:function(){
		console.log(this.room)
	},
	computed:{
		index(){
			return this.$route.query.index;
		},
		// room(){
		// 	return this.$store.state.roomList[this.index];
		// },
		...mapState({
			room:function(state){
				return state.roomList[this.index]
			},
			// room:state=>state.roomList[this.index],
			phone:state=>state.phone,
		}),
		canOrder:function(){
			return this.room.reserve.code==200;
		},
	},
	methods:{
		orderRoom:function(){
			if(this.canOrder&&this.phone){
				this.$store.commit('saveRoomId',this.index);
				this.$router.push({path:'/orderRoom',query:{index:this.index}})
			}
			else if(this.canOrder)
				this.$store.commit('changeLogin',true);
		}
	}
}
</script>
<style scoped lang="less">
.bg{
	padding-top:1.173333rem;
	padding-bottom:1.413333rem;
	.header{
		position:fixed;
		top:0;
		width:100%;
		z-index:3;
		display:flex;
		align-items:center;
		padding:0 0.32rem;
		line-height:1.2rem;
		border-bottom:1px solid #aaa;
		background:#fff;
		.back{
			width:0.586667rem;
			img{
				width:0.266667rem;
				vertical-align:middle;
			}
		}
		h2{
			flex-grow:1;
			text-align:center;
			font-size:0.48rem;
			color:#000;
		}
		.collect{
			width:0.586667rem;
		}
	}
	.my-swipe{
		height:4.0rem;
			// margin-top:1.2rem;
			img{
				width:100%;
				border-radius:0.133333rem;
			}
		}
		.info{
			padding:0.4rem 0.32rem;
			color:#999;
			font-size:0.346667rem;
			display:flex;
			border-bottom:1px solid #dfdfdf;
			.column{
				width:50%;
				div:first-child{
					margin-bottom:0.266667rem;
				}
				span{
					color:#333;
					margin-left:0.266667rem;
				}
			}
		}
		.device{
			padding:0.4rem 0.32rem;
			font-size:0.346667rem;
			color:#333;
			border-bottom:1px solid #dfdfdf;
			h3{
				margin-bottom:0.4rem;
			}
			.wrapper{
				width:100%;
				display:flex;
				justify-content:space-between;
				.item{
					margin-bottom:0.266667rem;
					&:last-child{
						margin:0;
					}
					img{
						width:0.426667rem;
						margin-right:0.293333rem;
					}
				}
			}
		}
		.return{
			padding:0.4rem 0.32rem;
			font-size:0.32rem;
			color:#333;
			border-bottom:1px solid #dfdfdf;
			h3{
				font-size:0.346667rem;
				margin-bottom:0.266667rem;
			}
		}
		.use{
			padding:0.4rem 0.32rem;
			font-size:0.32rem;
			color:#333;
			// margin-bottom:1.413333rem;
			h3{
				color:#ea5319;
				font-size:0.346667rem;
			}
			p{
				margin-top:0.266667rem;
				padding-left:0.4rem;
				position:relative;
				&:before{
					content:'';
					display:inline-block;
					vertical-align:middle;
					width:0.133333rem;
					height:0.133333rem;
					background:#ea5319;
					border-radius:0.066667rem;
					position:absolute;
					left:0.133333rem;
					top:0.2rem;
				}
			}
		}
		.footer{
			position:fixed;
			bottom:0;
			width:100%;
			height:1.413333rem;
			line-height:1.413333rem;
			font-size:0.48rem;
			display:flex;
			border-top:1px solid #aaa;
			.amount{
				width:50%;
				color:#ea5319;
				background:#fafafa;
				padding-left:0.426667rem;
			}
			.btn{
				width:50%;
				color:#fff;
				background:#ea5319;
				text-align:center;
			}
			.disabled{
				background:#999;
			}
		}
	}
	</style>