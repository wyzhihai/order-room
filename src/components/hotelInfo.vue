<template>
	<router-link class="item" :to="info.url">
		<img :src="info.img" alt="">
		<div class="info">
			<div>
				<h3>{{info.name}}</h3>
				<span class="blue">
					<strong>{{info.score}}</strong><small>分</small>
					<span>{{'很好'}}</span>
				</span>
				<span class="gray">
					{{info.customers}}人消费<br>
					<span>距我{{info.distance}}，{{"万达广场"}}</span>
				</span>
			</div>
			<div>
				<span class="red">￥<strong>{{info.price}}</strong>起</span>
				<span class="right gray">{{info.lastOrder}}小时前有人预定</span>
			</div>
			
		</div>
	</router-link>
</template>
<script type="text/javascript">
	export default{
		props:['info']
	}
</script>
<style scoped lang="less">
	.item{
		display:flex;
		align-items:flex-start;
		margin-bottom:0.133333rem;
		text-decoration:none !important;
	}
	img{
		width:2.666667rem;
		margin-right:0.266667rem;
	}
	.info{
		align-self:stretch;
		flex-grow:1;
		display:flex;
		flex-direction:column;
		justify-content:space-between;
		padding:0.266667rem 0.32rem 0.266667rem 0;
		border-bottom:1px solid #dfdfdf;
		line-height:0.533333rem;
	}
	.info h3{
		font-size:0.4rem;
		color:#010101;
	}
	.info .blue{
		font-size:0.426667rem;
		color:#49adff;
		margin-right:0.32rem;
	}
	.info .blue strong{
		font-size:0.48rem;
	}
	.info .blue small{
		font-size:0.32rem;
		margin-right:0.133333rem;
	}
	.info .gray{
		font-size:0.32rem;
		color:#999;
	}
	.info .red{
		font-size:0.32rem;
		color:#ea5319;
	}
	.info .red strong{
		font-size:0.426667rem;
	}
	.info .right{
		float:right;
	}
</style>