<template>
	<div class="bg">
		<header-bar back="/myOrder" title="订单详情"></header-bar>
		<div class="contain">
			<h2>{{states[state].title}}</h2>
			<h3>{{states[state].tip}}</h3>
			<div class="button">
				<div style="width: 50%;display: inline-block;text-align: center;">
					<div class="button_left">
						<p @click="op1">{{states[state].op1}}</p>
					</div>
				</div>
				<div style="width: 50%;display: inline-block;text-align: center;">
					<div class="button_right">
						<p @click="op2">{{states[state].op2}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="mask1">
			<div class="ZXZF">
				<span class="zxzf_title">在线支付</span>
				<span class="zxzf_price">￥{{orderInfo.totalPrice}}</span>
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
					orderInfo.brand}}({{orderInfo.names}})</p></div>
					<div class="second_title color999">
						<p>{{orderInfo.address}}</p>
					</div>
				</div>
			</div>
			<div class="seller_message">
				<div class="more_messages">
					<router-link tag="span" :to="'/roomDetail?hotelId='+orderInfo.branch+'&styleId='+orderInfo.styleId+'&priceId='+orderInfo.priceId" >
						<div class="FYMX">查看房型</div>
						<div class="right_img">
							<img class="single_right_img" src="static/img/right@2x.png"/>
						</div>
					</router-link>
				</div>
				<div style="display: inline-block;">
					<div class="title"><p>{{orderInfo.checkInType}}</p></div>
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
					<a :href="'tel:'+hotelNumber">联系商家</a>
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
						<div class="second_title">{{orderInfo.username}}</div>
						<div class="second_title">{{orderInfo.phone}}</div>
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
						<div class="second_title">{{orderInfo.time}}</div>
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
		// this.$store.commit('saveOrderTime',new Date());

		this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',{
			params:{act:'orderDetail',danhao:this.orderId}
		}).then(function(res){
			console.log(res)
			if(res.body.code==200){
				this.orderInfo=res.body.data;
				this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',{
					params:{act:"branchPhone",branchId:this.orderInfo.branch}
				}).then(function(res){
					if(res.body.code==200)
						this.hotelNumber=res.body.data;
					else
						alert(res.body.Msg)
				},function(err){
					console.log(err);
				});
			}
			else
				alert(res.body.Msg)
		},function(err){
			console.log(err);
		})
		
	},
	data:function(){
		return{
			hotelNumber:'',
			orderInfo:{},
			states:{timeout:{title:'已超时',tip:'',op1:'删除',op2:'再次预定'},
			wait:{title:'待付款',tip:'',op1:'取消',op2:'去付款'},
			success:{title:'预定成功',tip:'',op1:'评论',op2:'再次预定'},
			commented:{title:'已评价',tip:'',op1:'查看评论',op2:'再次预定'},
			canceled:{title:'已取消',tip:'',op1:'删除',op2:'再次预定'}}
		}
	},
	computed:{
		// ...mapState({
		// 	totalAmount:state=>state.totalAmount,
		// 	currentHotel:state=>state.currentHotel,
		// 	currentRoom:state=>state.roomList[state.currentRoomId],
		// 	stime:state=>state.searchInfo.stime,
		// 	etime:state=>state.searchInfo.etime,
		// 	userName:state=>state.userName,
		// 	phone:state=>state.phone,
		// 	orderId:state=>state.orderId,
		// 	orderTime:state=>state.orderTime,
		// }),
		openId(){
			return this.$store.state.openId;
		},
		state(){
			return this.$route.params.state;
		},
		orderId(){
			return this.$route.params.id;
		},
		stime(){
			return new Date(this.orderInfo.arriveTime)
		},
		etime(){
			return new Date(this.orderInfo.leaveTime)
		},
		days(){
			return Math.ceil((this.etime.getTime()-this.stime.getTime())/1000/60/60/24);
		}
	},
	methods:{
		op1(){
			switch(this.state){
				case 'timeout':
				case 'canceled':
				this.del();
				break;
				case 'wait':
				this.cancel();
				break;
				case 'success':
				this.comment();
				break;
				case 'commented':
				this.checkComment();
				break;
			}
		},
		op2(){
			switch(this.state){
				case 'timeout':
				case 'success':
				case 'commented':
				case 'canceled':
				this.orderAgain();
				break;
				case 'wait':
				this.pay();
				break;
			}
		},
		pay(){
			var data ={
				branchId:this.orderInfo.branch,
				danhao:this.orderId,
				openId:this.openId,
				styleId:this.orderInfo.roomType[0].styleId,
				stime:this.orderInfo.arriveTime,
				etime:this.orderInfo.leaveTime
			} ;
			console.log(data)
			this.$http.post('http://api.shiyushuo.net/WXBOOK/sdk/example/jsapi.php',data,{emulateJSON:true}).then(function(res){
				// console.log(res)
				// alert(JSON.stringify(res))
				// var map={'200':'success','206':'fail'}
				// this.$store.commit('changeOrderState',res.body.code);
				// this.$router.push('/orderState/'+map[this.orderState])
				if(res.body.code==200){
					this.jsApiCall(res.body.data);
				}
				else{
					alert('@@@@@@@@'+res.body.Msg);
				}
			},function(err){
				console.log('#####:',err)
			})
		},
		jsApiCall(a)
		{
			var obj = eval('(' + a + ')');
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest',
				obj,
				function(res){
					// alert(JSON.stringify(res))
					WeixinJSBridge.log(res.err_msg);
					if(res.err_msg == "get_brand_wcpay_request:ok"){
                            //微信支付成功，进行支付成功处理
                            alert("微信支付成功...");
                            this.$store.commit('changeOrderState','success')
                            this.$router.replace('/orderState/success/'+this.orderId)
                        }else if(res.err_msg == "get_brand_wcpay_request：cancel"){
                        	alert("取消支付！");
                        	this.$store.commit('changeOrderState','cancel')
                        	this.$router.replace('/orderState/wait/'+this.orderId)
                        }else{
                        	alert("支付失败！");
                        	this.$store.commit('changeOrderState','fail')
                        	this.$router.replace('/orderState/wait/'+this.orderId)
                        }
                    }.bind(this)
                    );
		},
		comment(){
			this.$router.push({path:"/addComment",query:{
				hotelName:this.orderInfo.brand+this.orderInfo.names,
				hotelId:this.orderInfo.branch,
				orderId:this.orderId
			}})
		},
		checkComment(){
			this.$router.push({path:'/comments/'+this.orderInfo.branch})
		},
		orderAgain(){
			this.$router.push({path:"/roomList",query:{
				id:this.orderInfo.branch
			}})
		},
		cancel(){
			this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',{
				params:{act:'cancelOrder',danhao:this.orderId}
			}).then(function(res){
				alert(res.body.Msg)
				if(res.body.code==200)
					this.$router.replace({path:'/orderState/canceled/'+this.orderId})
			},function(err){
				console.log(err)
			})
		},
		del(){
			this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',{
				params:{act:'delOrder',danhao:this.orderId}
			}).then(function(res){	
				alert(res.body.Msg)
				if(res.body.code==200)
					this.$router.replace({path:'/myOrder'})
			},function(err){
				console.log(err)
			})
		}
	},
	filters:{
		toLocaleDateString(date){
			return date.getMonth()+1+'月'+date.getDate()+'日';
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
		.contain{
			height: auto;
			width: 100%;
			background-color: #fff;
			h2{
				text-align:center;
				color:#333333;
				font-size: 0.64rem;
				padding-top: 0.64rem;
			}
			h3{
				text-align:center;
				color:#999999;
				font-size: 0.4rem;
				padding-top: 0.4rem;
				padding-bottom: 0.666666rem;
			}
			.button{
				display: flex;
				padding-bottom: 0.213333rem;
				margin-bottom: 0.4rem;
				.button_left{
					display: inline-block;
					width: 3.733333rem;
					line-height: 1.066666rem;

					height: 1.066666rem;
					border-radius: 0.533333rem;
					border:1px solid #EA5319;
					text-align: center;
					p{
						font-size: 0.4rem;
						color: #EA5319;
					}
				}
				.button_right{
					display: inline-block;
					width: 3.733333rem;
					line-height: 1.066666rem;

					height: 1.066666rem;
					border-radius: 0.533333rem;
					background-color: #EA5319;
					text-align: center;
					p{
						font-size: 0.4rem;
						color: #fff;
					}
				}
			}

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