<template>
	<div class="wrapper">
		<img class="head" :src="info.wximg||'/static/img/comment/head portrait-2.png'" alt="">
		<div class="info">
			<div class="name">{{info.username||'周星驰'}}<small>{{info.room||'豪华单人房'}}</small></div>
			<div class="score">打分 
				<rate class="rate" :length="5" :value="info.content.star>5?5:info.content.star" :readonly="true"></rate>
			</div>
			<div class="text">{{info.content.label}}<br>{{info.content.content}}</div>
			<div v-if="typeof info.img=='object'" class="pics">
				<div class="img" v-for="url in info.img" :style="{backgroundImage:'url('+url+')',backgroundSize:'cover'}"></div>
				<!-- <img v-for="url in info.img" :src="url" alt=""> -->
			</div>
			<div class="date">{{info.content.checkintime}}，{{info.time}}
				<div class="btn">
					<img src="/static/img/xin-default.png" alt="">
					<span>{{info.likes}}</span>
				</div>
			</div>
			<!-- <div class="reply">
				<span>商家回应：</span>{{info.business}}
			</div> -->
		</div>
	</div>
</template>
<script>
export default{
	created(){
		
	},
	props:['info']
}
</script>
<style scoped lang="less">
.wrapper{
	display:flex;
	padding:0.4rem 0.32rem;
	align-items:flex-start;
	border-bottom:1px solid #ccc;
	.head{
		width:1.333333rem
	}
	.info{
		flex-grow:1;
		margin-left:0.266667rem;
		font-size:0.32rem;
		color:#333;
		width:77.3%;
		// word-break:break-all;
		word-wrap:break-word;	
		.name{
			color:#4e687c;
			margin-top:0.186667rem;
			margin-bottom:0.266667rem;
			small{
				float:right;
				color:#999;
				font-size:0.293333rem;
			}
		}
		.rate{
			display:inline-block;
			position:relative;
		}
		.text{
			margin-top:0.48rem;
			margin-bottom:0.32rem;
		}
		.pics{
			display:flex;
			flex-wrap:wrap;
			align-items:flex-start;
			.img{
				width:2.133333rem;
				height:2.133333rem;
				margin-right:0.16rem;
				margin-bottom:0.16rem;
			}
		}
		.date{
			padding:0.533333rem 0;
			color:#999;
			.btn{
				color:#333;
				float:right;
				width:1.733333rem;
				height:0.693333rem;
				line-height:0.693333rem;
				border:1px solid #ccc;
				border-radius:0.346667rem;
				text-align:center;
				img{
					vertical-align:middle;
					width:0.373333rem;
				}
			}
		}
		.reply{
			padding-top:0.32rem;
			border-top:1px solid #ccc;
			span{
				color:#4e687c;
			}
		}
	}
}
</style>