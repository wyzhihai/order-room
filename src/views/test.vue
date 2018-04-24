<template>
	<div @click="click">
		{{com}}
	</div>

</template>
<script>
export default {
	// beforeCreate(){
	// 	console.log('beforeCreate')
	// 	console.log(this.res)
	// 	console.log(this.$el)
	// },
	// created:function(){
	// 	console.log('created')
	// 	console.log(this.res)
	// 	console.log(this.$el)
	// 	console.log(this)
	// },
	// beforeMount(){
	// 	console.log('before mount')
	// 	console.log(this.res)
	// 	console.log(this.$el)
	// },
	// mounted(){
	// 	console.log('mounted')
	// 	console.log(this.res)
	// 	console.log(this.$el)
	// },
	// activated(){
	// 	console.log('activated')
	// 	console.log(this.res)
	// 	console.log(this.$el)
	// },
	// deactivated(){
	// 	console.log('deactivated')
	// 	console.log(this.res)
	// 	console.log(this.$el)
	// },
	data(){
		return{
			res:'@@@@@@@@'
		}
	},
	computed:{
		com:function(){
			// console.log(this)
			return this.res
		}
	},
	methods:{
		click:function(){
			this.res+='$$$$$$$$$$'
		}
	},
	watch:{
		res:(to,from)=>{
			// console.log(this)
			// console.log(to,from)
		}
	},
	beforeRouteEnter:(to,from,next)=>{

		console.log('beforeRouteEnter',this);
		next();
	},
	beforeRouteUpdate(to,from,next){

		console.log('beforeRouteUpdate',this)
		next();
	}

}

</script>
<style scoped lang="less">
div{
	border:1px solid red
}
</style>