<template>
	<div class="bg">
		<header-bar class="header" back="/roomList" title="用户评价"></header-bar>
		<div class="category">
			<div @click="filter(1)" :class="{active:category==1}" class="item">全部<small>({{sum}})</small></div>
			<div @click="filter(2)" :class="{active:category==2}" class="item">晒分<small>({{hasScore}})</small></div>
			<div @click="filter(3)" :class="{active:category==3}" class="item">低分<small>({{lowScore}})</small></div>
			<div @click="filter(4)" :class="{active:category==4}" class="item">最新</div>
		</div>
		<div class="tags">
			<div class="item">干净卫生 {{arrCount['干净卫生']}}</div>
			<div class="item">房间大 {{arrCount['房间大']}}</div>
			<div class="item">位置好 {{arrCount['位置好']}}</div>
			<div class="item">隔音好 {{arrCount['隔音好']}}</div>
			<div class="item">性价比 {{arrCount['性价比']}}</div>
			<div class="item">环境优雅 {{arrCount['环境优雅']}}</div>
			<div class="item">服务热情 {{arrCount['服务服务热情']}}</div>
			<div class="item">价格实惠 {{arrCount['价格优惠']}}</div>
			<div class="item">体验很棒 {{arrCount['体验很棒']}}</div>
		</div>
		<comment-info v-for="(item,index) in result" :info="item" :key="item.time"></comment-info>
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default{
	created(){
		this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',{
			params:{
				act:"commentList",
				branchId:this.hotelId
			}
		}).then(function(res){
			console.log(res)
			this.arrCount=res.body.arrCount;
			this.comments=res.body.data
		},function(err){
			console.log(err)
		})
	},
	data:function(){
		return{
			arrCount:[],
			comments:[],
			category:1
		}
	},
	computed:{
		...mapState({
			hotelId:state=>state.currentHotel.id
		}),
		result(){
			switch(this.category){
				case 1:
				return this.comments;
				case 2:
				return this.comments.filter(item=>{
					return item.content.star!=0;
				});
				case 3:
				return this.comments.filter((item)=>{
					return item.content.star<=2&&item.content.star>=1;
				});
				case 4:
				this.comments.sort((item1,item2)=>{
					var stamp1=new Date(item1.time).getTime();
					var stamp2=new Date(item2.time).getTime()
					return stamp2-stamp1;
				});
				return this.comments
			}
		},
		sum(){
			return this.comments.length;
		},
		hasScore(){
			var count=0;
			this.comments.forEach(item=>{
				if(item.content.star)
					count++;
			})
			return count;
		},
		lowScore(){
			var count=0;
			this.comments.forEach(item=>{
				if(item.content.star<=2)
					count++;
			})
			return count;
		}
	},
	methods:{
		filter(index){
			this.category=index;
		}
	}
}
</script>
<style scoped lang="less">
.bg{
	padding-top:2.373333rem;
	.header{
		border-bottom:1px solid #aaa;
	}
	.category{
		display:flex;
		line-height:1.2rem;
		position:fixed;
		z-index:1;
		width:100%;
		top:1.173333rem;
		background:#fff;
		.item{
			width:25%;
			text-align:center;
			font-size:0.4rem;
			color:#000;
			border-bottom:1px solid #dfdfdf;
			small{
				font-size:0.266667rem;
			}
		}
		.active{
			border-bottom:0.053333rem solid #ea5319 !important;
		}
	}
	.tags{
		padding:0.533333rem 0.32rem 0.266667rem 0.32rem;
		border-bottom:1px solid #dfdfdf;
		display:flex;
		flex-wrap:wrap;
			// height:3.866667rem;
			align-content:flex-start;
			// align-content:space-between;
			.item{
				font-size:0.346667rem;
				color:#666;
				height:0.746667rem;
				line-height:0.746667rem;
				padding:0 0.4rem;
				border:1px solid #ccc;
				border-radius:0.373333rem;
				margin-right:0.266667rem;
				margin-bottom:0.266667rem;
			}
			.active{
				border:1px solid #ea5319;
				color:#ea5319;
			}
		}
	}
	</style>