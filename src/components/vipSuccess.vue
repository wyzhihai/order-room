<!-- 升级会员成功后的弹出框 -->
<template>
  <div class="bgbox">
    <div class="popdiv">
      <span class="logo"></span>
      <h2>恭喜您成为一城一寓会员共享联盟</h2>
      <h1>{{vipPank}}</h1>
      <div class="close"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      vipPank: '大众会员'
    }
  },
  methods: {
  }
}
</script>
<style lang='less' scoped>
.bgbox{
	width:100%;
	height:100%;
  display:flex;
	justify-content:center;
	align-items:center;
	position:fixed;
	top:0;
  left:0;
  background:rgba(0,0,0,0.4);
  .popdiv{
    margin:0 1.6rem /* 60/37.5 */;
		background: #ffffff;
		text-align:center;
		position:relative;
    border-radius:.266667rem /* 10/37.5 */;
    overflow: hidden;
    width: 100%;
    height: 5.333333rem /* 200/37.5 */;
    .logo{
      width: 1.066667rem /* 40/37.5 */;
      height: 1.226667rem /* 46/37.5 */;
      display: block;
      margin: 1.066667rem /* 40/37.5 */ auto .4rem /* 15/37.5 */;
      background-image: url(/static/img/chenggong.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
    }
    h2{
      width: 100%;
      height: .426667rem /* 16/37.5 */;
      line-height: .426667rem /* 16/37.5 */;
      font-size: .4rem /* 15/37.5 */;
      text-align: center;
      color: #ea5319;
      overflow: hidden;
      margin-bottom: .426667rem /* 16/37.5 */;
    }
    h1{
      width: 100%;
      height: .426667rem /* 16/37.5 */;
      line-height: .426667rem /* 16/37.5 */;
      font-size: .4rem /* 15/37.5 */;
      text-align: center;
      color: #ea5319;
      overflow: hidden;
      margin-bottom: .48rem /* 18/37.5 */;
      font-weight: bold;
    }
    .close{
      width: .4rem /* 15/37.5 */;
      height: .4rem /* 15/37.5 */;
      position: absolute;
      top: .4rem /* 15/37.5 */;
      right: .4rem /* 15/37.5 */;
      background-image: url(/static/img/cross.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
    }
  }
}
</style>