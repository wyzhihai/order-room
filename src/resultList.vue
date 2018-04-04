<template>
	<div class="bg">
		<header-bar back="/" title="锐思堡国际公寓"></header-bar>
		<div class="sort-bar">
			<div class="item">
				<span class="text">3月27日<br>入住1晚</span>
				<img src="/static/img/below-default.png" alt="">
			</div>
			<div class="item">
				<span class="text">智能排行</span>
				<img src="/static/img/below-default.png" alt="">
			</div>
			<div class="item">
				<span class="text">位置区域</span>
				<img src="/static/img/below-default.png" alt="">
			</div>
			<div class="item">
				<span class="text">筛选</span>
				<img src="/static/img/below-default.png" alt="">
			</div>
		</div>
		<div class="list">
			<hotel-info v-for="(item,index) in hotels" :key="index" :info="item"></hotel-info>
		</div>
	</div>
</template>
<script>
export default{
	data:function(){
		return{
			hotels:[
			{
				name:"锐思堡国际公寓 (南海万达广场店)",
				score:5.0,
				distance:100,
				price:188,
				customers:1000,
				lastOrder:30,
				img:'/static/img/home-1.png',
				url:'/'
			},
			{
				name:"2513乐尚酒店公寓 (南海万达广场店)",
				score:5.0,
				distance:100,
				price:188,
				customers:1000,
				lastOrder:30,
				img:'/static/img/home-2.png',
				url:'/'
			}
			]
		}
	}
}
</script>
<style scoped lang="less">
	.bg{
		height:100%;
		background:#f2f2f2;
		.sort-bar{
			font-size:0.32rem;
			color:#333;
			background:#fff;
			height:1.28rem;
			display:flex;
			justify-content:space-around;
			align-items:center;
			border-bottom:1px solid #aaa;
			.item{
				display:flex;
				align-items:center;
				img{
					width:0.213333rem;
					margin-left:0.266667rem;
				}
			}
		}
		.list{
			background:#fff;
		}
	}
</style>