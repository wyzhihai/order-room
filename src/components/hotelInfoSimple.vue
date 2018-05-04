<template>
	<router-link class="item" :to="{path:'/roomList',query:{id:info.branchId}}">
		<img :src="info.cover||'static/img/collect/lived-1.png'" alt="">
		<div class="info">
			<div>
				<h3>{{info.name}}</h3>
				<span class="blue">
					{{info.score||'5.0'}}分
					{{scoreText}}
				</span><br>
				<span class="gray">
					<span>距我{{info.distance||'12公里'}}，{{info.address}}</span>
				</span>
			</div>
			<div>
				<span class="red">￥<strong>{{info.lowPrice}}</strong></span>
			</div>
			
		</div>
	</router-link>
</template>
<script type="text/javascript">
export default{
	props:['info'],
	computed:{
		scoreText(){
			if(!this.info.score||this.info.score>4.8)
				return '很好';
			else if(this.info.score>4.0&&this.info.score<=4.8)
				return '好';
			else if(this.info.score>=3.0&&this.info.score<=4.0)
				return '一般';
			else
				return '差'
		}
	}
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