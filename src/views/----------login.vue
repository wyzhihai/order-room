<template>
	<div class="bg">
		<header-bar back="/" title="用户登录"></header-bar>
		<img class="logo" src="/static/img/logo.png" alt="">
		<div class="block">
			<div class="number">
				<input type="text" placeholder="手机号">
				<a href="#/login">获取验证码</a>
			</div>
			<div class="pass">
				<input type="text" placeholder="验证码">
			</div>
		</div>
		<div class="btn">登录</div>
	</div>
</template>
<script>
export default{

}
</script>
<style scoped lang="less">
.bg{
	background:#f2f2f2;
	min-height:100%;
	padding:1.173333rem 0;
	text-align:center;
	.logo{
		width:4.64rem;
		margin-top:1.2rem;
	}
	.block{
		width:8.4rem;
		background:#fff;
		padding:0 0.4rem;
		text-align:left;
		border-radius:0.053333rem;
		margin:2.133333rem auto 1.2rem auto;
		input{
			width:5.626667rem;
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
	}
}
</style>