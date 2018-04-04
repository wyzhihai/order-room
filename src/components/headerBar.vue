<template>
	<div class="header">
		<router-link class="back" :to="back"><img src="/static/img/back-2.png" alt=""></router-link>
		<h2>{{title}}</h2>
	</div>
</template>
<script>
	export default{
		props:['back','title']
	}
</script>
<style scoped lang="less">
	.header{
		background:#fff;
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
			// text-align:center;
			font-size:0.48rem;
			color:#000;
		}
	}
</style>