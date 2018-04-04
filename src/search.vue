<template>
	<div class="bg">
		<div class="top">
			<header-bar back="/" title="搜索"></header-bar>
			<input type="text" placeholder="酒店/地名/关键词">
		</div>
		<div class="block">
			<div class="title">
				<img src="/static/img/history.png" alt=""><span>搜索历史</span>
				<span class="right">清空</span>
			</div>
			<div class="list">
				<router-link v-for="(item,index) in history" :key="index" to="/" class="item">{{item}}</router-link>
			</div>
		</div>
		<div class="block">
			<div class="title">
				<img src="/static/img/remen.png" alt="">
				<span>大家都在搜</span>
			</div>
			<div class="list">
				<router-link v-for="(item,index) in other" :key="index" to="/" class="item">{{item}}</router-link>
			</div>
		</div>
		<div class="block">
			<div class="title">
				<img src="/static/img/location-1.png" alt="">
				<span>热门位置</span>
			</div>
			<div class="list">
				<router-link v-for="(item,index) in hot" :key="index" to="/" class="item">{{item}}</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	// import headerBar from "@/components/header"
	export default{
		data:function(){
			return{
				history:["禅城区","万达广场","千灯湖","佛山西站"],
				other:["禅城区","万达广场","千灯湖","佛山西站","三水万达","锐思堡","南海区","顺德区"],
				hot:["禅城区","万达广场","千灯湖","佛山西站","三水万达","锐思堡","南海区","顺德区"],
			}
		}
		// components:{headerBar}
	}
</script>
<style scoped lang="less">
	.bg{
		background:#f2f2f2;
		height:100%;
		.top{
			background:#fff;
			text-align:center;
			line-height:1.173333rem;
			input{
				width:9.36rem;
				height:0.933333rem;
				border-radius:0.466667rem;
				border:1px solid #999;
				padding-left:1.12rem;
				background:url('/static/img/search.png') 0.373333rem center no-repeat;
				background-size:0.373333rem;
				&::placeholder{
					color:#ccc;
					font-size:0.4rem;
				}
			}
		}
		.block{
			margin-top:0.4rem;
			background:#fff;
			font-size:0.32rem;
			line-height:0.933333rem;
			color:#333;
			.title{
				padding:0 0.32rem;
				font-size:0.346667rem;
				img{
					width:0.4rem;
					vertical-align:middle;
					margin-right:0.186667rem;
				}
				.right{
					float:right;
					color:#999;
					font-size:0.32rem;
				}
			}
			.list{
				display:flex;
				flex-wrap:wrap;
				.item{
					width:25%;
					text-align:center;
					border-top:1px solid #dfdfdf;
					border-left:1px solid #dfdfdf;
					&:nth-child(4n+1){
						border-left:none;
					}
				}
			}
		}
	}
</style>