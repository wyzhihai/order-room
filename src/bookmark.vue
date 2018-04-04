<template>
	<div class="bg">
		<div class="header">
			<img src="/static/img/back-2.png" alt="">
			<button>住过</button><button>收藏</button>
		</div>
		<div class="list">
			<hotel-info-simple v-for="(item,index) in hotels" :info="item" :key="index"></hotel-info-simple>
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
		.header{
			background:#fff;
			height:1.173333rem;
			// line-height:1.173333rem;
			// text-align:center;
			display:flex;
			justify-content:center;
			align-items:center;
			position:relative;
			border-bottom:1px solid #aaa;
			img{
				position:absolute;
				width:0.266667rem;
				left:0.32rem;
				top:0.36rem;
			}
			button{
				width:2.133333rem;
				height:0.746667rem;
				font-size:0.373333rem;
				&:first-of-type{
					color:#fefefe;
					background:#ea5319;
					border-radius:0.133333rem 0 0 0.133333rem;
					border:none;
				}
				&:last-of-type{
					color:#ea5319;
					background:#fff;
					border-radius:0 0.133333rem 0.133333rem 0;
					border:1px solid #ea5319;
				}
			}
		}
	}
</style>