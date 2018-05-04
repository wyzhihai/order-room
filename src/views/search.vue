<template>
	<div class="bg">
		<div class="top">
			<header-bar back="/" title="搜索"></header-bar>
			<input v-model="text" @keyup.enter="back" type="text" placeholder="酒店/地名/关键词">
		</div>
		<div class="block">
			<div class="title">
				<img src="/static/img/history.png" alt=""><span>搜索历史</span>
				<span @click="clear" class="right">清空</span>
			</div>
			<div class="list">
				<router-link tag="span" @click.native="select(item)" v-for="(item,index) in history" :key="index" to="/" class="item">{{item}}</router-link>
			</div>
		</div>
		<div class="block">
			<div class="title">
				<img src="/static/img/remen.png" alt="">
				<span>大家都在搜</span>
			</div>
			<div class="list">
				<router-link tag="span" @click.native="select(item)" v-for="(item,index) in other" :key="index" to="/" class="item">{{item}}</router-link>
				<div class="item"></div>
				<div class="item"></div>
				<div class="item"></div>
			</div>
		</div>
		<div class="block">
			<div class="title">
				<img src="/static/img/location-1.png" alt="">
				<span>热门位置</span>
			</div>
			<div class="list">
				<router-link tag="span" @click.native="select(item)" v-for="(item,index) in hot" :key="index" to="/" class="item">{{item}}</router-link>
				<div class="item"></div>
			</div>
		</div>
	</div>
</template>
<script>
	// import headerBar from "@/components/header"
	export default{
		data:function(){
			return{
				text:'',
				history:["禅城区","南海区","三水区","花都区"],
				other:["万达广场"],
				hot:["禅城区","南沙区","芙蓉区","萝岗区","三水区","包河区","南海区","花都区",'武陵区','岳麓区','城中区'],
			}
		},
		computed:{
			// history(){
			// 	var arr=[];
			// 	for(var i=0;i<4;i++){
			// 		var temp=this.hot[Math.floor(Math.random()*11)]
			// 		if(arr.indexOf(temp)==-1)
			// 			arr[i]=temp;
			// 		else
			// 			i--;
			// 	}
			// 	return arr;
			// }
		},
		methods:{
			select(item){
				this.$store.commit('changeKeyword',item)
			},
			clear(){
				this.history=[];
			},
			back(){
				if(this.text){
					this.select(this.text);
					this.$router.go(-1);
				}
			}
		}
	}
	</script>
	<style scoped lang="less">
	.bg{
		background:#f2f2f2;
		min-height:100%;
		.top{
			background:#fff;
			text-align:center;
			line-height:1.173333rem;
			input{
				width:93.6%;
				height:0.933333rem;
				border-radius:0.466667rem;
				border:1px solid #999;
				padding-left:1.12rem;
				margin-top:1.173333rem;
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