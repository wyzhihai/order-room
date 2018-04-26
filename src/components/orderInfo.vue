<template>
	<div class="item">
		<div class="pic">
			<img :src="info.cover||'static/img/myOrder/dingdan-1.png'" alt="">
		</div>
		<div class="info">
			<div class="row">
				<h3>{{info.fullname}}</h3>
				<span class="state">{{allState[state]}}</span>
			</div>
			<div class="gray">{{info.num||1}}间，{{info.roomType}}</div>
			<div class="gray">{{info.arriveTime}} - {{info.leaveTime}}</div>
			<div class="gray">房价：￥{{info.roomPrice}}</div>
		</div>
		<div class="btns">
			<template v-if="state==0">
				<div @click="del" class="btn">删除</div>
				<div @click="orderAgain" class="btn">再次预定</div>
			</template>
			<template v-else-if="state==1">
				<div @click="cancel" class="btn">取消</div>
				<div @click="goToPay" class="btn">去付款</div>
			</template>
			<template v-else-if="state==2">
				<div @click="orderAgain" class="btn">再次预定</div>
				<div @click="comment" class="btn">评价</div>
			</template>
			<template v-else-if="state==3">
				<div @click="orderAgain" class="btn">再次预定</div>
			</template>
			<template v-else>
				<div @click="del" class="btn">删除</div>
				<div @click="orderAgain" class="btn">再次预定</div>
			</template>
			
			
		</div>
	</div>
</template>
<script>
export default{
	props:['info'],
	data(){
		return{
			allState:['已超时','待付款','待评价','已评价','已取消']
		}
	},
	computed:{
		state(){
			if(this.info.whether=='0'){
				if(!this.info.isPay)
					return 0;
				else
					return 1
			}else if(this.info.whether=='1'){
				if(!this.info.isCom)
					return 3;
				else
					return 2;
			}else if(this.info.whether=='2'){
				return 4;
			}/*else if(this.info.whether=='3'){
				return 5;
			}else{
				return 6;
			}*/
			// if(!this.info.whether&&!this.info.isPay)
			// 	return 0;
			// if(!this.info.whether&&this.info.isPay)
			// 	return 1;
			// if(this.info.whether&&!this.info.isCom)
			// 	return 2;
			// if(this.info.whether&&this.info.isCom)
			// 	return 3;
		}

	},
	methods:{
		cancel(){
			this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',{
				params:{act:'cancelOrder',danhao:this.info.danhao}
			}).then(function(res){
				alert(res.body.Msg)
				if(res.body.code==200){
					// this.$router.replace({path:'/orderState/canceled/'+this.info.danhao})
					this.$emit('refresh')
				}
			},function(err){
				console.log(err)
			})
		},
		del(){
			this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',{
				params:{act:'delOrder',danhao:this.info.danhao}
			}).then(function(res){
				alert(res.body.Msg)
				if(res.body.code==200){
					this.$emit('refresh')
				}
			},function(err){
				console.log(err)
			})
		},
		comment(){
			this.$router.push({path:"/addComment",query:{
				hotelName:this.info.fullname,
				hotelId:this.info.branchId,
				orderId:this.info.danhao
			}})
		},
		orderAgain(){
			this.$router.push({path:"/roomList",query:{
				id:this.info.branchId
			}})
		},
		goToPay(){
			this.$router.push({path:"/orderState/wait/"+this.info.danhao})
		},
		// pay(){
		// 	var data ={
		// 		branchId:this.info.branchId,
		// 		danhao:this.info.danhao,
		// 		openId:this.$store.state.openId,
		// 		styleId:this.info.styleId,
		// 		stime:this.info.stime,
		// 		etime:this.info.etime
		// 	} ;
		// 	console.log(data)
		// 	this.$http.post('http://api.shiyushuo.net/WXBOOK/sdk/example/jsapi.php',data,{emulateJSON:true}).then(function(res){
		// 		console.log(res)
		// 		// var map={'200':'success','206':'fail'}
		// 		// this.$store.commit('changeOrderState',res.body.code);
		// 		// this.$router.push('/orderState/'+map[this.orderState])
		// 		if(res.data.code==200){
		// 			console.log('####')
		// 			console.log(res.data.data)
		// 			this.jsApiCall(res.data.data);
		// 		}
		// 		else{
		// 			alert(res.data.Msg);
		// 		}
		// 	},function(err){
		// 		console.log(err)
		// 	})
		// },
		// jsApiCall(a)
		// {
		// 	var obj = eval('(' + a + ')');
		// 	WeixinJSBridge.invoke(
		// 		'getBrandWCPayRequest',
		// 		obj,
		// 		function(res){
		// 			WeixinJSBridge.log(res.err_msg);
		// 			if(res.err_msg == "get_brand_wcpay_request:ok"){
  //                           //微信支付成功，进行支付成功处理
  //                           alert("微信支付成功...");
  //                           this.$store.commit('changeOrderState','success')
  //                           this.$router.push('/orderState/success')
  //                       }else if(res.err_msg == "get_brand_wcpay_request：cancel"){
  //                       	alert("取消支付！");
  //                       	this.$store.commit('changeOrderState','cancel')
  //                       	this.$router.push('/orderState/success/wait')
  //                       }else{
  //                       	alert("支付失败！");
  //                       	this.$store.commit('changeOrderState','fail')
  //                       	this.$router.push('/orderState/fail')
  //                       }
  //                   }.bind(this)
  //                   );
		// }
	}
}
</script>
<style scoped lang="less">
.item{
	padding:0.533333rem 0.32rem;
	border-bottom:1px solid #dfdfdf;
	background:#fff;
	display:flex;
	position:relative;
	.pic{
		width:1.066667rem;
		height:1.066667rem;
		border-radius:3px;
		overflow:hidden;
		margin-right:0.266667rem;
		img{
			width:100%;
		}
	}
	.info{
		flex-grow:1;
		line-height:1;
		.row{
			display:flex;
			margin-bottom:0.186667rem;
			h3{
				flex-grow:1;
				font-size:0.4rem;
				color:#010101;
			}
			.state{
				font-size:0.346667rem;
				color:#01baaf;
			}
		}
		.gray{
			color:#999;
			font-size:0.346667rem;
			margin-bottom:0.186667rem;
			&:last-child{
				margin:0;
			}
		}
	}
	.btns{
		position:absolute;
		right:0.32rem;
		bottom:0.2rem;
		.btn{
			display:inline-block;
			text-align:center;
			width:2.0rem;
			height:0.666667rem;
			line-height:0.666667rem;
			border-radius:0.333333rem;
			border:1px solid #ea5319;
			background:#fff;
			color:#ea5319;
			font-size:0.346667rem;
			margin-left:0.266667rem;
		}
	}
}
</style>