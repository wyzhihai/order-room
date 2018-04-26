<template>
	<div class="bg">
		<div class="header">
			<div class="fix">
				<router-link class="back" to="/roomList">
					<img src="/static/img/back-1.png" alt="">
				</router-link>
				<h2>填写资料</h2>
			</div>
			<div class="info">
				<h3>{{styleName}}{{roomName}}</h3>
				<div class="date">入住：{{stime|dateFormat}}&nbsp;&nbsp;&nbsp;&nbsp;离店：{{etime|dateFormat}}</div>
				<div class="gray">{{styleName}}{{roomName}}&nbsp;&nbsp;&nbsp;共{{days}}晚
					<router-link class="right" to="/roomDetail">房型详情</router-link>
				</div>
			</div>
		</div>
		<div class="fields">
			<div class="row">
				<label>房间数</label><input type="text" disabled value="1间">
			</div>
			<div class="row">
				<label>入住人</label><input v-model="userName" placeholder="请输入姓名" type="text">
			</div>
			<div class="row">
				<label>手机号</label><input :value="phone" disabled type="text">
			</div>
			<div class="row">
				<label for="">发票</label>
				<span>如开发票，请向酒店前台索取</span>
			</div>
			<div class="row">
				<label for="">积分抵扣</label>
				<span>共0分，满10000积分可用</span>
			</div>
		</div>
		<!-- <div class="member">
			<div class="text">
				<h3>我同意注册成为一城一寓共享会员</h3>
				<router-link class="link" to="/">免费注册，即可享受会员价及相关会员权益</router-link>
			</div>
			<img @click="checked=!checked" :src="checked?'/static/img/consent-selected.png':'/static/img/consent-default.png'" alt="">
		</div> -->
		<div class="rule">
			<h3>退款规则</h3>
			<p>订单确认后不可取消/变更，如未入住，酒店将扣除全部房费，房间整晚保留，请及时入住。</p>
		</div>
		<div class="footer">
			<div @click="showDetail=!showDetail" class="amount">
				<span class="orange">￥{{amount}}</span>
				<span :class="{'up':showDetail}" class="gray">明细</span>
			</div>
			<div @click="createOrder" class="btn">去支付</div>
		</div>

		<div @click="showDetail=!showDetail" v-show="showDetail" class="backdrop">
			<div class="block">
				<div class="div1">
					<span>{{styleName}}{{roomName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>一间 {{days}}晚</span>
				</div>
				<div class="div1">
					<span>{{stime|dateFormat}}至{{etime|dateFormat}}</span>
					<div style="float: right;">
						<span style="color: #EA5319;">￥{{price}}</span>
						<span style="color: #EA5319;">x</span>
						<span style="color: #EA5319;">{{days}}</span>
					</div>
				</div>
				<div class="div1">
					<span>在线支付</span>
					<div style="float: right;">
						<span style="color: #EA5319;">￥{{amount}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState,mapGetters} from 'vuex';
export default{
	created:function(){
		if(this.userInfo)
			this.userName=this.userInfo.name
	},
	data:function(){
		return{
			showDetail: false,
			checked:true,
			userName:''
		}
	},
	computed:{
		...mapState({
			userInfo:state=>state.userInfo,
			phone:state=>state.phone,
			roomName:state=>state.roomList[state.currentRoomId].roomName,
			styleName:state=>state.roomList[state.currentRoomId].styleName,
			stime:state=>state.searchInfo.stime,
			etime:state=>state.searchInfo.etime,
			lowPrice:state=>state.roomList[state.currentRoomId].lowPrice,
			allPrice:state=>state.roomList[state.currentRoomId].allPrice,
			priceId:state=>state.roomList[state.currentRoomId].priceId,
			colour:state=>state.roomList[state.currentRoomId].colour,
			orderId:state=>state.orderId,
			styleId:state=>state.roomList[state.currentRoomId].styleId,
			openId:state=>state.openId,
			roomIndex:state=>state.currentRoomId,
			currentHotel:state=>state.currentHotel,
		}),
		...mapGetters({
			hotelId:'currentHotelId',
		}),
		days:function(){
			return (this.etime.getTime()-this.stime.getTime())/1000/60/60/24
		},
		price:function(){
			if(!this.userInfo)
				return this.lowPrice;
			switch(this.userInfo.vipRank){
				case '':
				return this.lowPrice;
				case '大众会员':
				return this.allPrice.publicPrice;
				case '黄金会员':
				return this.allPrice.goldPrice;
				case '钻石会员':
				return this.allPrice.diamondPrice;
			} 
		},
		amount:function(){
			return (this.price*this.days).toFixed(2);
		}
	},
	filters:{
		dateFormat(date){
			return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
		}
	},
	methods:{
		createOrder(){
			if(this.userName==''){
				alert('请输入入住人姓名！！')
				return;
			}else{
				this.$store.commit('saveUserName',this.userName);
			}
			this.$http.post('http://api.shiyushuo.net/WXBOOK/book.php',{
				act:'createOrder',
				id:this.hotelId,
				username:this.userName,
				phone:this.phone,
				num:1,
				priceId:this.priceId,
				styleId:this.styleId,
				stime:this.toLocalString(this.stime),
				etime:this.toLocalString(this.etime)
			},{
				emulateJSON:true,
			}).then(function(res){
				if(res.body.code==200){
					// var orderInfo={
					// 	danhao:res.body.danhao,
					// 	money:this.totalAmount,
					// 	names:this.currentHotel.name,
					// 	address:this.currentHotel.branchCity+this.currentHotel.branchDistrict+this.currentHotel.branchAddres,

					// }
					// this.$store.commit('saveOrderInfo',orderInfo);
					this.$router.push({path:'/orderState/wait/'+res.body.danhao});
				}else{
					alert(res.body.Msg)
				}
			},function(err){
				console.log(err)
			})
		},
		pay(){
			var data ={
				branchId:this.hotelId,
				danhao:this.orderId,
				openId:this.openId,
				styleId:this.styleId,
				stime:this.toLocalString(this.stime),
				etime:this.toLocalString(this.etime)
			} ;
			console.log(data)
			this.$http.post('http://api.shiyushuo.net/WXBOOK/sdk/example/jsapi.php',data,{emulateJSON:true}).then(function(res){
				console.log(res)
				// var map={'200':'success','206':'fail'}
				// this.$store.commit('changeOrderState',res.body.code);
				// this.$router.push('/orderState/'+map[this.orderState])
				if(res.data.code==200){
					console.log('####')
					console.log(res.data.data)
					this.jsApiCall(res.data.data);
				}
				else{
					alert(res.data.Msg);
				}
			},function(err){
				console.log(err)
			})
			
		},
		jsApiCall(a)
		{
			var obj = eval('(' + a + ')');
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest',
				obj,
				function(res){
					WeixinJSBridge.log(res.err_msg);
					if(res.err_msg == "get_brand_wcpay_request:ok"){
                            //微信支付成功，进行支付成功处理
                            alert("微信支付成功...");
                            this.$store.commit('changeOrderState','success')
                            this.$router.push({path:'/orderState/success',query:{hotel:this.hotelId,room:this.roomIndex}})
                        }else if(res.err_msg == "get_brand_wcpay_request：cancel"){
                        	alert("取消支付！");
                        	this.$store.commit('changeOrderState','fail')
                        	this.$router.push({path:'/orderState/fail',query:{hotel:this.hotelId,room:this.roomIndex}})
                        }else{
                        	alert("支付失败！");
                        	this.$store.commit('changeOrderState','cancel')
                        	this.$router.push({path:'/orderState/wait',query:{hotel:this.hotelId,room:this.roomIndex}})
                        	
                        }
                    }.bind(this)
                    );
		},
		toLocalString(date){
			return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
		}
	}
}
</script>

<style scoped lang="less">
.bg{
	background:#f2f2f2;
	min-height:100%;
	padding-bottom:1.413333rem;
	padding-top:1.173333rem;
	.header{
		height:1.333333rem;
		background:#ea5319;
		position:relative;
		.fix{
			position:fixed;
			top:0;
			z-index:3;
			width:100%;
			background:#ea5319;
		}
		.back{
			position:absolute;
			left:0.32rem;
			top:0.346667rem;
			img{
				width:0.32rem;
			}
		}
		h2{
			color:#fff;
			font-size:0.48rem;
			text-align:center;
			line-height:1.18rem;
		}
		.info{
			position:absolute;
			top:0;
			left:3.2%;
			background:#fff;
			width:93.6%;
			border-radius:0.133333rem;
			padding:0.3rem 0.266667rem;
			h3{
				font-size:0.4rem;
				color:#010101;
			}
			.date{
				font-size:0.32rem;
				color:#999;
				margin-top:0.2rem;
				margin-bottom:0.1rem;
			}
			.gray{
				font-size:0.32rem;
				color:#999;
				.right{
					color:#ea5319;
					float:right;
				}
			}
		}
	}
	.fields{
		background:#fff;
		margin-top:1.5rem;
		font-size:0.373333rem;
		.row{
			padding:0 0.32rem;
			line-height:1.2rem;
			border-bottom:1px solid #dfdfdf;
			label{
				display:inline-block;
				width:1.826667rem;
				color:#999;
			}
			input{
				border:none;
			}
			[disabled]{
				background:transparent;
			}
		}
	}
	.member{
		margin-top:0.266667rem;
		padding:0.453333rem 0.32rem;
		background:#fff;
		display:flex;
		justify-content:space-between;
		align-items:center;
		img{
			width:0.426667rem;
		}
		h3{
			font-size:0.373333rem;
			color:#333;
			margin-bottom:0.266667rem;
		}
		.link{
			font-size:0.32rem;
			color:#999;
			padding-right:0.613333rem;
			background:url('/static/img/right@2x.png') right center no-repeat;
			background-size:0.16rem;
		}
	}
	.rule{
		padding:0.4rem 0.32rem;
		h3{
			color:#333;
			font-size:0.373333rem;
		}
		p{
			color:#999;
			font-size:0.32rem;
		}
	}
	.footer{
		display:flex;
		position:fixed;
		bottom:0;
		width:100%;
		z-index:4;
		line-height:1.413333rem;
		border-top:1px solid #aaa;
		.amount{
			width:50%;
			background:#fff;
			padding-left:0.64rem;
			padding-right:0.32rem;
			.orange{
				color:#ea5319;
				font-size:0.48rem;
			}
			.gray{
				color:#999;
				font-size:0.32rem;
				float:right;
				padding-right:0.4rem;
				background-image:url('/static/img/up.png');
				background-position: right center;
				background-repeat:no-repeat;
				background-size:0.266667rem
			}
			.up{
				background-image:url('/static/img/below-default.png');
			}
		}
		.btn{
			width:50%;
			text-align:center;
			font-size:0.48rem;
			color:#fff;
			background:#ea5319;
		}
	}
	.backdrop{
		position:fixed;
		width:100%;
		height:100%;
		top:0;
		left:0;
		background:rgba(0,0,0,0.7);
		z-index:3;
		.block{
			background:#fff;
			position:fixed;
			width:100%;
			bottom:1.413333rem;
		}
	}
}
	//-------------------------------------
	
	.div1{
		height: 1.333333rem;
		font-size: 0.4rem;
		color: #010101;
		font-family: "微软雅黑";
		border-bottom: thin solid #DFDFDF;
		text-align: left;
		line-height: 1.333333rem;
		padding: 0 0.32rem 0 0.4rem;
	}
	// .div1:last-child{
	// 	padding: 0;
	// }
	.QTF_left{
		float: left;
		width: 50%;
		padding-left: 0.64rem;
		padding-right: 0.32rem;
		color: #EA5319;
	}
	.QTF{
		display: inline-block;
		width: 50%;
		background-color: #EA5319;
		height: 100%;
		float: right;
		text-align: center;
		color: #fff;
		font-size: 0.48rem;
	}
	.div2{
		font-size: 0.32rem;
	}
	.QTF_left img{
		width: 0.213333rem;
	}
	</style>