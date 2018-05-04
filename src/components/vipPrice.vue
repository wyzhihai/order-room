<template>
	<div @click.self="close(0)" class="backdrop">
		<div class="dialog">
			<header>会员价 <span @click="close(0)"><img src="/static/img/del.png" alt=""></span></header>
			<div class="content">
				<p class="item">
					<span>大众会员</span>
					<span>￥{{allPrice.publicPrice}}</span>
				</p>
				<p class="item">
					<span>黄金会员</span>
					<span>￥{{allPrice.goldPrice}}</span>
				</p>
				<p class="item">
					<span>钻石会员</span>
					<span>￥{{allPrice.diamondPrice}}</span>
				</p>
			</div>
			<!-- <footer><span @click="close(1)">{{rank?'升级':'办理'}}会员</span></footer> -->
		</div>
	</div>
</template>
<script>
export default{

	props:['allPrice','rank'],
	methods:{
		close:function(go){
			this.$emit('close');
			if(go)
				this.$router.push({path:'/upgrade'})
		}
	}
}
</script>
<style scoped lang="less">
.backdrop{
	position:fixed;
	top:0;
	left:0;
	width:100%;
	height:100%;
	background:rgba(0,0,0,0.7);
	display:flex;
	justify-content:center;
	align-items:center;
	z-index:3;
	.dialog{
		background:#fff;
		width:8.0rem;
		header{
			line-height:1.2rem;
			background:#ea5319;
			text-align:center;
			font-size:0.48rem;
			color:#fff;
			position:relative;
			span{
				position:absolute;
				right:0.4rem;
				img{
					width:0.386667rem;
				}
			}
		}
		.item{
			padding:0.426667rem 1.28rem;
			font-size:0.373333rem;
			color:#000;
			display:flex;
			justify-content:space-between;
			border-bottom:1px solid #dfdfdf;
		}
		footer{
			text-align:center;
			padding:0.346667rem 0;
			margin-top:1.28rem;
			span{
				display:inline-block;
				width:4.0rem;
				height:1.2rem;
				line-height:1.2rem;
				border-radius:0.6rem;
				color:#fff;
				font-size:0.4rem;
				background:#ea5319;
			}
		}
	}
}
</style>