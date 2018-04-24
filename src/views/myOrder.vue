<template>
	<div class='bg'>
		<header-bar class="border" back="/" title="我的订单"></header-bar>
		<order-info v-for="(item,index) in orderList" :key="index" :info="item"></order-info>
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default{
	created(){
		this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',{
			params:{phone:this.phone,act:'myOrder'}
		}).then(function(res){
			console.log(res)
			this.orderList=res.body.data
		},function(err){
			console.log(err)
		})
	},
	data:function(){
		return {
			orderList:[]
		}
	},
	computed:{
		...mapState({
			phone:state=>state.phone,
		}),
	}
}
</script>
<style scoped lang="less">
.bg{
	background:#f2f2f2;
	min-height:100%;
	padding-top:1.173333rem;
	.border{
		border-bottom:1px solid #aaa;
	}
}
</style>