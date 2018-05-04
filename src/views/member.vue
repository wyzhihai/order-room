<template>
	<div class="bg">
		<header-bar class="aaa" back="/" title="锐思堡国际公寓"></header-bar>
		<div :style="{backgroundImage:'url('+bg+')'}" class="header_banner">
			<div class="vip_message">
				<div>
					<div class="message_icon">
						<img :src="wxInfo.wxImg||'static/img/member/defaultavatar.png'"/>
					</div>
					<div class="message_name">
						<h2>{{userInfo.name||wxInfo.wxUser}}</h2>
						<h3>{{userInfo.vipRank||'非会员'}}</h3>
					</div>
				</div>
				<div style="position: relative;display: flex;justify-content: center;align-items: center;">
					<!-- <div class="update_vip">
						<router-link to="/upgrade">{{userInfo.vipRank?'会员升级':'办理会员'}}</router-link>
					</div> -->
				</div>
				<router-link :to="'/equities?rank='+userInfo.vipRank" class="check_vip">查看会员权益>></router-link>
			</div>
		</div>
		<div class="points_list">
			<div class="function_item">
				<img src="static/img/integral.png"/>
				<span>我的积分</span>
				<div class="more_messages">
					<div>
						<div class="FYMX">{{userInfo.integral?userInfo.integral:0}}</div>
						<div class="right_img">
							<img class="single_right_img" src="static/img/right@2x.png"/>
						</div>
					</div>
					
				</div>
			</div>
			<div is="router-link" tag="div" to="/myOrder" class="function_item">
				<img src="static/img/wodedingdan@2x.png"/>
				<span>我的订单</span>
				<div class="more_messages">
					<div>
						<!--<div class="FYMX">132.88</div>-->
						<div class="right_img">
							<img class="single_right_img" src="static/img/right@2x.png"/>
						</div>
					</div>
				</div>
			</div>
			<div is="router-link" tag="div" to="/bookMark" class="function_item">
				<img src="static/img/collect@2x.png"/>
				<span>我的收藏/住过</span>
				<div class="more_messages">
					<div>
						<!--<div class="FYMX">132.88</div>-->
						<div class="right_img">
							<img class="single_right_img" src="static/img/right@2x.png"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
var bg=require('../../static/img/member/MemberCenter.png')
export default{
	data:function(){
		return{
			bg:bg,
		}
	},
	computed:{
		...mapState({
			userInfo:state=>state.userInfo,
			wxInfo:state=>state.wxInfo,
		})
	},
	methods:{
		
	}
	
}
</script>
<style scoped lang="less">
.bg{
	// height:100%;
	background:#f2f2f2;
	.aaa{
		position:fixed;
		width:100%;
		background: transparent;
	}
	.header_banner{
		background-size: cover;
		height: 6.666666rem;
		padding-top:2rem;
		.vip_message{
			padding-bottom: 0.133333rem;
			width: 94%;
			margin: 0 auto;
			// margin-top: 1.2rem;
			border-radius: 0.24rem;
			/*height: 2.666666rem;*/
			position: relative;
			/*display: flex;*/
			background: rgba(255,255,255,0.6);
			.message_icon{
				margin: 0.346666rem 0.346666rem 0 0.266666rem;
				width: 2.0rem;
				display: inline-block;
				height: 2rem;
				img{
					width: 100%;
					border-radius:1.0rem;
				}

			}
			.message_name{
				display: inline-block;
				margin-top: 0.8rem;
				position: absolute;
				height: auto;
				h2{
					font-size: 0.48rem;
					color: #333333;
					h3{
						font-size: 0.32rem;
						color: #333333;
					}
					
				}

			}
			.update_vip{
				width: 2.666666rem;
				height: 0.8rem;
				background-color: #EA5319;

				line-height: 0.8rem;
				text-align: center;
				border-radius: 0.4rem;

				display: inline-block;
				/*margin: 0 auto;*/
				margin-top: 0.773333rem; 
				a{
					color: #FFFFFF;
				}
			}
			.check_vip{
				font-size: 0.32rem;
				color: #333333;
				right: 0;
				margin-right: 0.266666rem;
				position: absolute;
				bottom: 0;
				float: right;
				margin-bottom: 0.266666rem;
			}
		}
	}
	.points_list{
		margin-top: 0.533333rem;
		background-color: #fff;
		.function_item{
			height: 1.2rem;
			/*width: 100%;*/
			position: relative;
			border-bottom:1px solid #DFDFDF;
			margin:0 0.32rem 0;
			display: flex;
			/*justify-content: center;*/
			align-items: center;
			>img{
				width: 0.32rem;
				margin-right: 0.4rem;
			}
		}
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
	}
	.FYMX{
		margin-right: 0.346666rem;
		height: 100%;
		display: inline-block;
	}

	.single_right_img{
		width:0.16rem;
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
}


</style>