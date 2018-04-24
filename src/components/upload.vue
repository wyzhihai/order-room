<template>
	<div class="box">
		<div v-for="(url,index) in urls" class="pic" :style="{backgroundImage:'url('+url+')',backgroundSize:'cover'}">
			<!-- <img :src="url" alt=""> -->
			<div @click="delFile(index)" class="delete"></div>
		</div>
		<div class="wrapper">
			<img src="static/img/img.png" alt="">
			<div class="text">上传图片</div>
			<input @change="addFile" class="file" type="file" multiple name="image[]">
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
			files:[],
		}
	},
	computed:{
		urls(){
			return this.files.map(function(file){
				return URL.createObjectURL(file);
			})
		},
		
	},
	methods:{
		addFile(event){
			Array.prototype.forEach.call(event.target.files,function(file){
				this.files.push(file);
			}.bind(this));
		},
		delFile(index){
			this.files.splice(index,1);
		}
	}
}
</script>
<style scoped lang="less">
.box{
	width:100%;
	display:flex;
	justify-content:flex-start;
	align-items:center;
	flex-wrap:wrap;
	background:#fff;
	padding:0.36rem 0.466667rem;

	.pic{
		width:2.08rem;
		height:2.08rem;
		overflow:hidden;
		margin-right:0.133333rem;
		margin-bottom:0.133333rem;
		position:relative;
		img{
			width:100%;
		}
		.delete{
			width:0.533333rem;
			height:0.533333rem;
			right:0;
			top:0;
			position:absolute;
			background-image:url('/static/img/delete.png');
			background-repeat:no-repeat;
			background-position:center;
			background-size:120%;
		}
	}
	.wrapper{
		width:2.08rem;
		height:2.08rem;
		display:inline-block;
		background:#f2f2f2;
		border:1px dashed  #dfdfdf;
		position:relative;
		padding-top:0.4rem;
		text-align:center;
		border-radius:0.133333rem;
		img{
			width:1.026667rem;
		}
		.text{
			font-size:0.32rem;
			color:#999;
		}
		.file{
			position:absolute;
			top:0;
			left:0;
			width:100%;
			height:100%;
			opacity:0;
		}
	}
}
</style>