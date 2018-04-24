<template>
	<div class="bg">
		<header-bar back="/orderRoom" title="订单详情"></header-bar>
		<router-view></router-view>
		<div class="mask1">
			<div class="ZXZF">
				<span class="zxzf_title">在线支付</span>
				<span class="zxzf_price">￥{{totalAmount}}</span>
				<div style="display: inline-block;" class="more_messages">
					

					<!-- <a href="" >
						<div class="FYMX">费用明细</div>
						<div class="right_img">
							<img class="single_right_img" src="static/img/right@2x.png"/>
						</div>
					</a> -->
				</div>
			</div>
			<a href="">
				<div class="warning">
					<span>预订成功后，不可变更、取消</span>
					<!--<div class="right_img">
						<img class="single_right_img" src="../../static/img/right@2x.png"/>
					</div>-->
				</div>
			</a>
		</div>
		<div class="mask2">
			<div class="seller_message">
				<div class="more_messages">
					<router-link tag="span" to="/roomList" >
						<div class="FYMX">查看商家</div>
						<div class="right_img">
							<img class="single_right_img" src="static/img/right@2x.png"/>
						</div>
					</router-link>
				</div>
				<div style="display: inline-block;">
					<div class="title"><p>{{
					currentHotel.name}}</p></div>
					<div class="second_title color999">
						<p>{{currentHotel.branchAddres}}</p>
					</div>
				</div>
			</div>
			<div class="seller_message">
				<div class="more_messages">
					<router-link tag="span" to="/roomDetail" >
						<div class="FYMX">查看房型</div>
						<div class="right_img">
							<img class="single_right_img" src="static/img/right@2x.png"/>
						</div>
					</router-link>
				</div>
				<div style="display: inline-block;">
					<div class="title"><p>{{currentRoom.styleName+currentRoom.roomName}}</p></div>
					<div class="second_title">
						<span>入住：</span><span>{{stime|toLocaleDateString}}</span> <span>离店：</span><span>{{etime|toLocaleDateString}}</span> 共<span>{{days}}</span><span>晚</span><span>1</span>间
					</div>
					<div class="third_title">
						<p>大床 | 不含早 | 有WIFI</p>
					</div>
				</div>
			</div>
			<div class="two_button">
				<div class="two_button_item">
					<img src="static/img/location-1.png"/> 
					<router-link to="/map">查看路线</router-link>
				</div>
				<div class="two_button_item">
					<img src="static/img/phone-1.png"/> 
					<a>联系商家</a>
				</div>
			</div>
		</div>
		<div class="mask3">
			<div class="seller_message">
				<div>
					<div class="title"><p>预订信息</p></div>
				</div>
				<div style="display: flex;">
					<div class="info_item" style="margin-right: 0.453333rem;">
						<div class="second_title color999">入住人</div>
						<div class="second_title color999">联系手机</div>
						<div class="second_title color999">预计到店</div>
						<div class="second_title color999">入住说明</div>
					</div class="info_item">
					<div class="info_item">
						<div class="second_title">{{userName}}</div>
						<div class="second_title">{{phone}}</div>
						<div class="second_title">18：00之前（不影响酒店留房）</div>
						<div class="second_title">商家通常14：00开始办理入住</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mask3">
			<div class="seller_message">
				<div>
					<div class="title"><p>订单信息</p></div>
				</div>
				<div style="display: flex;">
					<div class="info_item" style="margin-right: 0.453333rem;">
						<div class="second_title color999">订单号</div>
						<div class="second_title color999">下单时间</div>						
					</div class="info_item">
					<div class="info_item">
						<div class="second_title">{{orderId}}</div>
						<div class="second_title">{{orderTime|toLocaleDateTimeString}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default{
	created:function(){
		this.$store.commit('saveOrderTime',new Date())
	},
	data:function(){
		return{
		}
	},
	computed:{
		...mapState({
			totalAmount:state=>state.totalAmount,
			currentHotel:state=>state.currentHotel,
			currentRoom:state=>state.roomList[state.currentRoomId],
			stime:state=>state.searchInfo.stime,
			etime:state=>state.searchInfo.etime,
			userName:state=>state.userName,
			phone:state=>state.phone,
			orderId:state=>state.orderId,
			orderTime:state=>state.orderTime,
		}),
		days(){
			return (this.etime.getTime()-this.stime.getTime())/1000/60/60/24;
		}
	},
	methods:{
		
	},
	filters:{
		toLocaleDateString(date){
			return date.getMonth()+1+'月'+date.getDate()+'日';
		},
		toLocaleDateTimeString(date){
			return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes();
		},
	}
	
}
</script>
<style scoped lang="less">
html{
	height: auto;

	.bg{
		height:100%;
		background:#f2f2f2;
		padding-top:1.173333rem;
		*{
			font-family: "微软雅黑";
		}
		.mask1{
			margin-bottom: 0.4rem;
			background-color: #fff;
			div{
				height: 1.2rem;
				line-height: 1.2rem;
				margin:0 0.32rem 0;
				
			}
			.ZXZF{
				position: relative;
				border-bottom:1px solid #DFDFDF;
				.zxzf_title{
					font-size: 0.373333rem;
					color: #333333;
					margin-right: 0.293333rem;
				}
				.zxzf_price{
					font-size: 0.373333rem;
					color: #EA5319;
					line-height: 1.2rem;
				}
			}
			.warning{
				color: #333333;
				font-size: 0.373333rem;
				position: relative;
			}
		}
		.right_img{
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			display: inline-block;
			float: right;
			margin: 0!important;
		}
		.single_right_img{
			width:0.16rem;
		}
		.more_messages{
			font-size: 0.373333rem;
			color: #999999;
			right: 0;
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0!important;
			height: 100%;
			display: flex;
			.FYMX{
				margin-right: 0.3rem!important;
				height: 100%;
				display: inline-block;
			}
		}
		.mask2{
			margin-bottom: 0.4rem;
			background-color: #fff;
			.two_button{
				height: 1.066666rem;
				display: flex;
				justify-content: center;
				align-items: center;
				.two_button_item{
					color: #EA5319;
					font-size: 0.4rem;
					width: 50%;
					display: inline-block;
					text-align: center;
					&:first-child{
						border-right: 1px solid #DFDFDF;
					}
					>a{
						color: #EA5319;
					}
					img{
						width: 0.293333rem;
					}
				}
			}
		}
		.mask3{
			margin-bottom: 0.4rem;
			background-color: #fff;
			.info_item{
			}
			.seller_message{
				border: none;
			}

		}
		.title{
			font-size: 0.4rem;
			color: #333333;
			margin: 0.373333rem 0 0.32rem;
			display: inline-block;
		}
		.second_title{
			font-size: 0.32rem;
			color: #333333;
			margin-bottom: 0.266666rem;
		}
		.third_title{
			font-size: 0.32rem;
			color: #999999;
			margin-bottom: 0.266666rem;
		}
		.color999{
			color: #999999;
		}
		.seller_message{
			position: relative;
			border-bottom:1px solid #DFDFDF;
			margin:0 0.32rem 0;
		}
	}
}


</style>