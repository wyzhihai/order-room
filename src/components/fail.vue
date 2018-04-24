<template>
	<div class="contain">
		<h2>已取消</h2>
		<h3>订单已取消</h3>
		<div class="button">
			<div style="width: 50%;display: inline-block;text-align: center;">
				<div class="button_left">
					<p @click="deleteOrder">删除</p>
				</div>
			</div>
			<div style="width: 50%;display: inline-block;text-align: center;">
				<div class="button_right">
					<p @click="orderAgain">再次预订</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex'
export default{
	computed:{
		...mapState({
			hotelName:state=>state.currentHotel.name,
			hotelId:state=>state.currentHotel.id,
			orderId:state=>state.orderId,
			currentHotelId:state=>state.currentHotel.id,
		})
	},
	methods:{
		deleteOrder(){
			this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',{
				params:{act:'delOrder',danhao:this.orderId}
			}).then(function(res){
				alert(res.body.Msg)
				if(res.body.code==200)
					this.$router.replace({path:'/orderRoom'})
			},function(err){
				console.log(err)
			})
		},
		orderAgain(){
			this.$router.push({path:"/roomList",query:{
				id:this.currentHotelId
			}})
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
		color:#EA5319;
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