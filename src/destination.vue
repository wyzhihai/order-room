<template>
	<div class="bg">
		<div class="header">
			<router-link class="back" to="/">
				<img src="/static/img/back-2.png" alt="">
			</router-link>
			<h2>选择目的地</h2>
			<input type="text" placeholder="城市/酒店名">
		</div>
		<div class="current">
			<h2>当前位置</h2>
			<router-link class="location" to="/">
				<img src="/static/img/location-1.png" alt="">
				<div class="detail">
					<h3>万达广场</h3>
					<p>佛山市南海区桂南路28号</p>
				</div>
			</router-link>
		</div>
		<div class="recent">
			<router-link class="btn" to="/">佛山</router-link>
		</div>
		<div class="hot">
			<h2>热门搜索</h2>
			<div class="btns">
				<router-link class="btn" to="/" v-for="(item,index) in hotCity" :key="index">{{item}}</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data:function(){
			return{
				hotCity:["广州","佛山","东莞","深圳","长沙","柳州","惠州","合肥","上海","北京","杭州","武汉"]
			}
		}
	}
</script>
<style scoped lang="less">
	.bg{
		background:#f2f2f2;
		height:100%;
		.header{
			position:relative;
			background:#fff;
			padding:0 0.32rem;
			.back{
				position:absolute;
				top:0.4rem;
				img{
					width:0.266667rem;
				}
			}
			h2{
				// font-weight:bold;
				font-size:0.453333rem;
				color:#010101;
				text-align:center;
				padding-top:0.346667rem;
				padding-bottom:0.533333rem;
			}
			input{
				width:9.333333rem;
				height:0.8rem;
				border:1px solid #ea5319;
				border-radius:0.4rem;
				margin-bottom:0.24rem;
				padding-left:0.906667rem;
				background:url('/static/img/search.png') 0.266667rem center no-repeat;
				background-size:0.373333rem 0.373333rem;
				&::placeholder{
					color:#999;
					font-size:0.373333rem;
				}
			}
		}
		.current{
			background:#fff;
			margin-top:0.4rem;
			padding:0 0.32rem;
			border-bottom:1px solid #dfdfdf;
			h2{
				font-size:0.4rem;
				color:#010101;
				margin-top:0.293333rem;
				margin-bottom:0.426667rem;
			}
			.location{
				display:flex;
				img{
					align-self:flex-start;
					width:0.293333rem;
					vertical-align:middle;
				}
				.detail{
					flex-grow:1;
					h3{
						font-size:0.4rem;
						color:#000;
						margin-bottom:0.16rem;
					}
					p{
						font-size:0.266667rem;
						color:#999;
						margin-bottom:0.186667rem;
					}
				}
			}
		}
		.recent{
			background:#fff;
			padding:0.16rem 0.32rem;
		}
		.btn{
			display:block;
			width:2.133333rem;
			height:0.933333rem;
			line-height:0.933333rem;
			text-align:center;
			border:1px solid #999;
			border-radius:4px;
			font-size:0.4rem;
			color:#000;
		}
		.hot{
			margin-top:0.4rem;
			background:#fff;
			padding:0.266667rem 0.32rem;
			h2{
				font-size:0.4rem;
				color:#010101;
				margin-bottom:0.533333rem;
			}
			.btns{
				height:3.333333rem;
				display:flex;
				flex-wrap:wrap;
				justify-content:space-between;
				align-content:space-between;
			}
		}
	}
</style>