<template>
	<div class="contain">
		<h2>待付款</h2>
		<h3>{{tipText}}</h3>
		<div class="button">
			<div style="width: 50%;display: inline-block;text-align: center;">
				<div class="button_left">
					<p @click="cancel">取消</p>
				</div>
			</div>
			<div style="width: 50%;display: inline-block;text-align: center;">
				<div class="button_right">
					<p @click="pay">付款</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex'
export default{
	created(){
		this.$http.post('http://api.shiyushuo.net/WXBOOK/book.php',
			{act:"timeOrder",branchId:this.hotelId,danhao:this.orderId}
			,{emulateJSON:true}).then(function(res){
				console.log(res)
				if(res.body.code==200){

				}
			},function(err){
				console.log(err)
			})
		},
		data(){
			return{
				orderTime:new Date(),
			}
		},
		computed:{
			...mapState({
				hotelId:state=>state.currentHotel.id,
				orderId:state=>state.orderId,
				styleId:state=>state.roomList[state.currentRoomId].styleId,
				openId:state=>state.openId,
				stime:state=>state.searchInfo.stime,
				etime:state=>state.searchInfo.etime,
			}),
			tipText(){
				var time=new Date().getTime()-this.orderTime.getTime()
				if(time<10*60*1000)
					return '订单还有'+Math.ceil(10-time/1000/60)+'分钟失效';

			}
		},
		methods:{
			cancel(){
				this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',{
					params:{act:'cancelOrder',danhao:this.orderId}
				}).then(function(res){
					alert(res.body.Msg)
					if(res.body.code==200)
						this.$router.replace({path:'/orderState/fail'})
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
					// alert(JSON.stringify(res))
					WeixinJSBridge.log(res.err_msg);
					if(res.err_msg == "get_brand_wcpay_request:ok"){
                            //微信支付成功，进行支付成功处理
                            alert("微信支付成功...");
                            this.$store.commit('changeOrderState','success')
                            this.$router.push('/orderState/success')
                        }else if(res.err_msg == "get_brand_wcpay_request：cancel"){
                        	alert("取消支付！");
                        	this.$store.commit('changeOrderState','cancel')
                        	this.$router.push('/orderState/wait')
                        }else{
                        	alert("支付失败！");
                        	this.$store.commit('changeOrderState','fail')
                        	this.$router.push('/orderState/fail')
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
	</style>