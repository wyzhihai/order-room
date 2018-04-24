<template>
	<div class="bg">
		<header-bar class="bar" back="/roomList" title="酒店相册"></header-bar>
		<div class="title">客房</div>
		<div class="photos">
			<img v-for="n in 8" :src="'static/img/hotelphoto/photo-'+n+'.png'" alt="">
		</div>
	</div>
</template>
<script>
	export default{

	}
</script>
<style scoped lang="less">
	.bg{
		background:#f2f2f2;
		min-height:100%;
		padding-top:1.173333rem;
		.bar{
			border-bottom:1px solid #aaa;
		}
		.title{
			line-height:1.066667rem;
			background:#fff;
			font-size:0.4rem;
			color:#333;
			text-align:center;
			border-bottom:1px solid #dfdfdf;
			// margin-top:1.173333rem;
		}
		.photos{
			background:#fff;
			padding-left:0.32rem;
			display:flex;
			flex-wrap:wrap;
			justify-content:center;
			align-items:flex-start;
			img{
				margin-top:0.293333rem;
				margin-right:0.293333rem;
				width:4.533333rem;
			}
		}
	}
</style>