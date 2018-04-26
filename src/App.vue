<template>
	<div id="app">
		<router-view/>
		<login @closeLogin="closeLogin" v-if="shouldLogin&&showLogin"></login>
	</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
	name: 'App',
	created(){
        // sessionStorage.setItem('openid','##########')
        var openId=sessionStorage.getItem('openid')
        var wxUser=sessionStorage.getItem('nicename')
        var wxImg=sessionStorage.getItem('headimgurl')
        this.$store.commit('saveOpenId',openId);
        this.$store.commit('saveWxInfo',{wxUser,wxImg})

        var stime=new Date();
        var etime=new Date(stime.getTime()+24*60*60*1000);
        this.$store.commit('changeTime',{stime,etime});

        var map, geolocation;
    // //加载地图，调用浏览器定位服务
    map = new AMap.Map('container', {
    	resizeEnable: true
    });
    map.plugin('AMap.Geolocation', function() {
    	geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
        });
    	map.addControl(geolocation);
    	geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete.bind(this));//返回定位信息
        AMap.event.addListener(geolocation, 'error', this.error);      //返回定位出错信息
    }.bind(this));
    //解析定位结果
    function onComplete(data) {
    	var longitude=data.position.getLng();
    	var latitude=data.position.getLat();
    	// console.log(longitude,latitude)
    	this.$store.commit('savePosition',{longitude,latitude});
    	AMap.service('AMap.Geocoder',function(){
    		var geocoder=new AMap.Geocoder({  radius: 1000,
    			extensions: "all"})
    		var lnglatXY=[longitude,latitude];
    		geocoder.getAddress(lnglatXY,function(status,result){
    			if(status==='complete'&&result.info==='OK')
    				this.$store.commit('saveCurrentPosition',result.regeocode.addressComponent);
    			else
    				console.log('errro!')
    		}.bind(this))
    	}.bind(this))
    }
    //解析定位错误信息
    function onError(data) {
    	console.log(data)
    }
    this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',{
        params:{act:'wxin',wxid:this.openId}
    }).then(function(res){
        console.log(res)
        if(res.body.code==200)
        {
            this.$store.commit('saveLoginInfo',res.body.data)
        }
        else if(res.body.code==206){
            this.$store.commit('changeShouldLogin',true);
        }
    },function(err){
        console.log(err)
    })
},
data:function(){
	return {

	}
},
computed:{
	...mapState({
		showLogin:state=>state.showLogin,
        shouldLogin:state=>state.shouldLogin,
        openId:state=>state.openId,
    })
},
methods:{
	closeLogin(){
		this.$store.commit('changeLogin',false)
	}
}

}
</script>

<style>
html,body,#app{
	height:100%;
}
*{
	font-family:"MicrosoftYaHei";
	box-sizing:border-box;
}
a{
	color:#666 ;
	text-decoration:none !important;
}
</style>
