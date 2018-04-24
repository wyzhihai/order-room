<template>
	<div @click="close" class="backdrop">
		<calendar class="calendar" :range="range" 
		:value="initValue" :begin="begin" :end="end" @select="select"></calendar>
		<div class="footer">
			<button @click="close">完成</button>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default{
	created:function(){
		var start=[this.stime.getFullYear(),this.stime.getMonth()+1,this.stime.getDate()];
		var end=[this.etime.getFullYear(),this.etime.getMonth()+1,this.etime.getDate()];
		this.initValue=[start,end];
		
		this.value=[[start[0],start[1]-1,start[2]],[end[0],end[1]-1,end[2]]];
	},
	data:function(){
		return {
			range:true,
			value:[], 
			initValue:[],
		}
	},
	computed:{
		...mapState({
			stime:state=>state.searchInfo.stime,
			etime:state=>state.searchInfo.etime
		}),
		begin(){
			var year= new Date().getFullYear();
			var month= new Date().getMonth()+1;
			var date= new Date().getDate();
			return [year,month,date];
		},
		end(){
			var end=new Date().getTime()+90*24*60*60*1000;
			var year= new Date(end).getFullYear();
			var month= new Date(end).getMonth()+1;
			var date= new Date(end).getDate();
			return [year,month,date];
		}
	},
	methods:{
		close(){
			var stime=new Date(this.value[0][0],this.value[0][1],this.value[0][2]);
			var etime=new Date(this.value[1][0],this.value[1][1],this.value[1][2]);
			this.$store.commit('changeTime',{stime,etime});
			this.$emit('close');
		},
		select(begin,end){
			console.log(begin,end);
			this.value=[begin,end];
		}
	}
}
</script>
<style scoped lang="less">
.backdrop{
	position:fixed;
	width:100%;
	height:100%;
	top:0;
	background:rgba(0,0,0,0.7);
	.calendar{
		position:absolute;
		bottom:1.733333rem;
	}
	.footer{
		position:absolute;
		bottom:0;
		width:100%;
		background:#fff;
		display:flex;
		justify-content:center;
		align-items:center;
		height:1.733333rem;
		border-top:1px solid #aaa;
		button{
			border:none;
			width:8.8rem;
			height:1.2rem;
			background:#ea5319;
			border-radius:0.6rem;
			color:#fff;
		}
	}
}
</style>