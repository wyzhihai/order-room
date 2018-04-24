<template>
	<div @click.self="close" class="backdrop">
		<div class="bg">
			<h2>用户登录</h2>
			<div @click="close" class="close"><img src="static/img/cross.png" alt=""></div>
			<img class="logo" src="/static/img/logo.png" alt="">
			<div class="block">
				<div class="number">
					<input type="text" v-model="phone" placeholder="请输入手机号">
					<span @click="getCode">{{text}}</span>
				</div>
				<div class="pass">
					<input type="text" v-model="code" placeholder="请输入验证码">
				</div>
			</div>
			<div class="btn" @click="login">登录</div>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default{
	data:function(){
		return{
			phone:"13112345678",
			code:"790252",
			// phone:'',
			// code:'',
			second:0,
		}
	},
	computed:{
		text(){
			if(this.second==0)
				return '获取验证码';
			else
				return this.second+'s后重发';
		},
		...mapState({
			wxInfo:state=>state.wxInfo,
			openId:state=>state.openId,
		})
	},
	methods:{
		getCode(){
			if(this.phone==''){
				alert('请输入手机号码');
				return;
			}
			if(this.second!=0)
				return
			this.second=30;
			this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',{
				params:{
					act:'getPhoneCode',
					phone:this.phone
				}
			}).then(function(res){
				console.log(res)
				var timer=setInterval(function(){
					this.second--;
					if(this.second==0)
					{
						clearInterval(timer);
					}
				}.bind(this),1000)
				if(res.body.code==200){
					alert(res.body.Msg)
				}
				else{
					alert(res.body.Msg)
				}

			},function(err){
				console.log(err)
			})
		},
		login(){
			if(this.phone==""||this.code==""){
				alert('请输入电话号码和验证码')
				return;
			}
			else if(!(/^1\d{10}$/.test(this.phone))){
				alert('不是完整的11位手机号或者正确的手机号前七位')
				return;
			}
			this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',
			{	
				params:{
					act:'login',
					phone:this.phone,
					code:this.code,
					wxusername:this.wxInfo.wxUser,
					wxid:this.openId,
					wximg:this.wxInfo.wxImg
				}
			}).then(function(res){
				console.log(res)
				if(res.data.code == 200){
					this.$store.commit('saveLoginInfo',res.body.data);
					this.$emit('closeLogin');
				}else
				alert(res.data.Msg); 

			},err=>console.log(err));
		},
		close(){
			this.$emit('closeLogin')
		}
	}
}
</script>
<style scoped lang="less">
.backdrop{
	width:100%;
	height:100%;
	background:rgba(0,0,0,0.7);
	display:flex;
	justify-content:center;
	align-items:center;
	position:fixed;
	top:0;
	left:0;
	.bg{
		width:9.333333rem;
		margin:0 auto;
		background:#f2f2f2;
		text-align:center;
		position:relative;
		// border:1px solid #ccc;
		h2{
			height:1.173333rem;
			line-height:1.173333rem;
			background:#fff;
			font-size:0.48rem;
			color:#000;
		}
		.close{
			position:absolute;
			right:0.32rem;
			top:0.4rem;
			img{
				width:0.4rem;
			}
		}
		.logo{
			width:4.64rem;
			margin-top:0.533333rem;
		}
		.block{
			width:8.4rem;
			background:#fff;
			padding:0 0.4rem;
			text-align:left;
			border-radius:0.053333rem;
			margin:1.066667rem auto 0.533333rem auto;
			input{
				width:5.333333rem;
				height:0.586667rem;
				padding-left:0.666667rem;
				border:none;
				background-repeat:no-repeat;
				background-size:0.293333rem;
				background-position:left center;
			}
			a{
				margin-left:0.266667rem;
			}
			.number{
				padding:0.48rem 0;
				border-bottom:1px solid #dfdfdf;
				input{
					border-right:1px solid #dfdfdf;
					background-image:url('/static/img/phone.png');
				}
			}
			.pass{
				padding:0.48rem 0;
				input{
					background-image:url('/static/img/verificationcode.png');
					background-size:0.346667rem;
				}
			}
		}
		.btn{
			width:8.4rem;
			height:1.333333rem;
			line-height:1.333333rem;
			background:#ea5319;
			color:#fff;
			font-size:0.4rem;
			border-radius:0.666667rem;
			margin:0 auto;
			margin-bottom:0.533333rem
		}
	}
}
</style>