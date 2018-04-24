<template>
	<router-link @click.native="saveHotel" class="item" :to="{path:'/roomList',query:{id}}">
		<div class="img" :style="{backgroundImage:'url('+img+')'}"></div>
		<div class="info">
			<div>
				<h3>{{name}}</h3>
				<span class="blue">
					<strong>{{"5.0"}}</strong><small>分</small>
					<span>{{'很好'}}</span>
				</span>
				<span class="gray">
					{{orderCount}}人消费<br>
					<span v-if="distance">距我{{distance}}，{{area}}</span>
				</span>
			</div>
			<div>
				<span class="red">￥<strong>{{lowPrice}}</strong>起</span>
				<span class="right gray">{{time}}小时前有人预定</span>
			</div>
		</div>
	</router-link>
</template>
<script type="text/javascript">
export default{
	props:['info'],
	computed:{
		name(){
			return this.info.name;
		},
		id(){
			return this.info.id;
		},
		distance(){
			return this.info.distance;
		},
		orderCount(){
			return this.info.ordercount;
		},
		area(){
			return this.info.branchDistrict;
		},
		lowPrice(){
			return this.info.lowPrice;
		},
		img(){
			return this.info.cover||'/static/img/hotellist/home-1.png';
		},
		time(){
			return Math.ceil(Math.random()*10);
		}
	},
	methods:{
		saveHotel(){
			this.$store.commit('saveHotel',this.info)
		}
	}
}
</script>
<style scoped lang="less">
.item{
	display:flex;
	align-items:flex-start;
	margin-bottom:0.133333rem;
	text-decoration:none !important;
}
.img{
	width:2.666667rem;
	height:3.2rem;
	margin-right:0.266667rem;
	background-size:contain;
	background-repeat:no-repeat;
	background-position:center;
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