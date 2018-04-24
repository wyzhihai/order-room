<template>
	<div @click.self="close" class="backdrop">
		<div class="dialog">
			<div class="control">
				<h3>星级</h3>
				<div @click="selectStar" class="star">
					<div data-value="2" class="item" :class="{'active':star==2}">经济型</div>
					<div data-value="3" class="item" :class="{'active':star==3}">舒适/三星</div>
					<div data-value="4" class="item" :class="{'active':star==4}">高档/四星</div>
					<div data-value="5" class="item" :class="{'active':star==5}">豪华/五星</div>
				</div>
				<h3>价格</h3>
				<div class="range">
					<div class="mark">
						<div class="item">0<br>|</div>
						<div class="item">100<br>|</div>
						<div class="item">200<br>|</div>
						<div class="item">300<br>|</div>
						<div class="item">400<br>|</div>
						<div class="item">不限<br>|</div>
					</div>
					<Slider v-model="price" show-tip="never" :range="true" showStops :step="100" :min="0" :max="500"></Slider>
				</div>
			</div>
			<div class="footer">
				<div @click="close" class="btn">完成</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default{

	data:function(){
		return{
			star:this.$store.state.searchInfo.star,
			price:[this.$store.state.searchInfo.minPrice,this.$store.state.searchInfo.maxPrice]
		}
	},
	// computed:{
	// 	...mapGetters({
	// 		star:state=>state.searchInfo.star,
	// 		price:state=>[state.searchInfo.minPrice,state.searchInfo.maxPrice]
	// 	})
	// },
	methods:{
		close(){
			this.$store.commit('changeStar',this.star);
			this.$store.commit('changePrice',this.price);
			this.$emit('close');
		},
		selectStar(event){
			this.star=parseInt(event.target.dataset.value);
		}
	}
}
</script>
<style lang="less">
.ivu-slider-wrap{
	height:0.133333rem;
	background:#ccc;
	margin:0;
	.ivu-slider-button-dragging{
		transform:scale(1);
	}
	.ivu-slider-bar{
		height:0.133333rem;
		background:#ea5319;
	}
	.ivu-slider-button-wrap{
		width:0.746667rem;
		height:0.746667rem;
		top:-0.266667rem;
		.ivu-slider-button{
			width:0.746667rem;
			height:0.746667rem;
			border:2px solid #ea5319;
		}
	}
	
}
</style>
<style scoped lang="less">
.backdrop{
	position:fixed;
	width:100%;
	height:100%;
	top:0;
	background:rgba(0,0,0,0.7);
	.dialog{
		position:absolute;
		width:100%;
		bottom:0;
		background:#f2f2f2;
		.control{
			background:#fff;
			padding:0 0.32rem;
			padding-bottom:1.546667rem;
			h3{
				color:#999;
				font-size:0.32rem;
				padding-top:0.426667rem;
				padding-bottom:0.16rem;
			}
			.star{
				display:flex;
				justify-content:space-between;
				.item{
					font-size:0.32rem;
					color:#333;
					width:2.133333rem;
					height:0.746667rem;
					line-height:0.746667rem;
					text-align:center;
					border:1px solid #ccc;
					border-radius:0.08rem;
				}
				.active{
					color:#fff;
					background:#ea5319;
					border:none;
				}
			}
			.range{
				padding:0 0.4rem;
				font-size:0.373333rem;
				color:#000;
				font-family:'ArialMT';
				.mark{
					position:relative;
					padding-top:1.3rem;
					.item{
						position:absolute;
						text-align:center;
						width:1.333333rem;
						transform:translateX(-50%);
						top:0rem;
						&:nth-child(1){
							left:0;
						}
						&:nth-child(2){
							left:20%;
						}
						&:nth-child(3){
							left:40%;
						}
						&:nth-child(4){
							left:60%;
						}
						&:nth-child(5){
							left:80%;
						}
						&:nth-child(6){
							left:100%;
						}
					}
				}
				
			}
		}
		.footer{
			height:1.733333rem;
			padding:0.32rem 0;
			.btn{
				color:#fff;
				font-size:0.4rem;
				border-radius:0.546667rem;
				width:93.6%;
				height:1.093333rem;
				line-height:1.093333rem;
				background:#ea5319;
				margin:0 auto;
				text-align:center;
			}
		}
	}
}
</style>