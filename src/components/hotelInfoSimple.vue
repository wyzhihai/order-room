<template>
	<router-link class="item" :to="info.url">
		<img :src="info.img" alt="">
		<div class="info">
			<div>
				<h3>{{info.name}}</h3>
				<span class="blue">
					{{info.score}}分
					{{'很好'}}
				</span><br>
				<span class="gray">
					<span>距我{{info.distance}}，{{"万达广场"}}</span>
				</span>
			</div>
			<div>
				<span class="red">￥<strong>{{info.price}}</strong>起</span>
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
		text-decoration:none !important;
		background:#fff;
		border-bottom:1px solid #dfdfdf;
		padding:0.133333rem 0.32rem;
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
		
		line-height:0.533333rem;
	}
	.info h3{
		font-size:0.4rem;
		color:#010101;
	}
	.info .blue{
		font-size:0.4rem;
		color:#49adff;
		margin-right:0.32rem;
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
		font-size:0.48rem;
	}
	
</style>