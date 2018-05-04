<template>
	<div class="bg">
		<div class="header">
			<img is="router-link" to="/member" tag="img" src="/static/img/back-1.png" alt="">
			<h2>我的积分</h2>
			<h3>当前积分：</h3>
			<h1>26543</h1>
		</div>
		<div class="points_title">
			<p>积分明细</p>
		</div>
		<div class="points_item">
			<div class="points_item_contain left">
				<div class="p1">获得积分</div>
				<div class="p2">2018-02-23 16:40:50</div>
			</div>
			<div class="points_item_contain add right">
				<p>+168</p>
			</div>	
		</div>
		<div class="points_item">
			<div class="points_item_contain left">
				<div class="p1">消费积分</div>
				<div class="p2">2018-02-23 16:40:50</div>
			</div>
			<div class="points_item_contain reduce right">
				<p>-16800</p>
			</div>	
		</div>
		<div class="points_item">
			<div class="points_item_contain left">
				<div class="p1">消费积分</div>
				<div class="p2">2018-02-23 16:40:50</div>
			</div>
			<div class="points_item_contain reduce right">
				<p>-16800</p>
			</div>	
		</div>
		<div class="points_item">
			<div class="points_item_contain left">
				<div class="p1">消费积分</div>
				<div class="p2">2018-02-23 16:40:50</div>
			</div>
			<div class="points_item_contain reduce right">
				<p>-16800</p>
			</div>	
		</div>
	</div>
</template>
<script>
export default{
	props:['back','title']
}
</script>
<style scoped lang="less">
.bg{
	height:100%;
	background:#fff;
	.header{
		background-image: url('/static/img/member/integral_bg.png');
		background-size:cover;
		width: 100%;
		height: 5.173333rem;
		text-align:center;
		line-height:1.173333rem;
		position:relative;
		.back{
			position:absolute;
			line-height:normal;
			left:0.32rem;
			top:0.36rem;
			img{
				width:0.266667rem;
			}
		}
		h2{
			text-align:center;
			font-size:0.48rem;
			color:#fff;
		}
		h3{
			margin-left: 0.586666rem;
			text-align:left;
			font-size:0.4rem;
			color:#fff;
		}
		h1{
			text-align:center;
			font-size:0.8rem;
			color:#fff;
		}
		img{
			position:absolute;
			width:0.266667rem;
			left:0.32rem;
			top:0.36rem;
		}
		
	}
	.points_title{
		width: 100%;
		padding-left: 0.4rem;
		font-size: 0.4rem;
		color: #333333;
		background-color: #f2f2f2;
		height: 1.066666rem;
		line-height: 1.066666rem;;
	}
	.points_item{
		display: flex;
		height: 1.333333rem;
		width: 100%;
		border-bottom: solid thin #dfdfdf;
		padding:0 0.4rem;
		.points_item_contain{
			display: inline-block;
			width: 50%;
			height: 100%;
			
			.p1{
				font-size: 0.4rem;
				color: #333333;
				margin-top: 0.12rem;
				margin-bottom: 0.1rem;
				display: block;
			}
			.p2{
				font-size: 0.24rem;
				color: #999999;
				display: block;
			}
			
		}
		.right{
			text-align: right;
		}
		.left{
			text-align: left;
		}
		.add{
			font-size: 0.48rem;
			color: #EA5319;
			line-height: 1.333333rem;
		}
		.reduce{
			font-size: 0.48rem;
			color: #333333;
			line-height: 1.333333rem;
		}
	}
}
</style>