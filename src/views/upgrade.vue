<template>
    <div class="page">
        <div class="detail-wrapper clearfix">
          <div class="updaepage">
            <div class="image" :style="{backgroundImage: 'url(' + memberBenefit[currentRank].url + ')'}"></div>
            <div class="lists">
                <p class="title">{{memberBenefit[currentRank].name}}卡</p>
                <ul>
                    <li v-for="(item, index) in memberBenefit[currentRank].text" :key="index" class="item">
                        <img src="static/img/xing.png" alt="">
                        <span class="text">{{item}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="btns">
            <div class="selectBtn" @click="selectRank(2)">钻石会员</div>
            <div class="selectBtn" @click="selectRank(1)">黄金会员</div>
            <div class="selectBtn" @click="selectRank(0)">大众会员</div>
        </div>
    </div>

    <div class="bottomPay">
      <div class="content">
          <div class="content-left">
              <div class="price">￥{{price}}</div>
              <div class="des" >{{states}}</div>
          </div>
          <div class="content-right">
            <div @click="pay" class="pay">立即{{action}}</div>
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
    created:function(){

    },
    // 不是会员 price: "0"
            // 大众升级黄金price: "58"
             // 大众升级钻石 price: "138"
             // 黄金升级钻石 price: "100"
             components: {
             },
             data () {
                return {
                    currentRank:0,
                    memberBenefit: 
                    [{
                        url: 'static/img/dzCare.png',
                        name: "大众会员",
                        text: [
                        "尊享通过前台/无预订/400 热线方式预订可获客房 9.5 折优惠及 1倍消费积分",
                        "尊享通过网络预定可获客房 9.5 折优惠及 1倍",
                        "尊享预订保留 19:00，退房时间 12:00",
                        "尊享无停留退房、免交押金服务",
                        "尊享积分兑换免费房和精美礼品",
                        "尊享贰伍壹叁餐饮 8.8 折优惠（详询餐饮店）"
                        ],
                    },
                    {
                        url: "static/img/hjCare.png",
                        name: "黄金会员",
                        text: [
                        "送 1000 积分，享受联盟店房费 8.5 折优惠及 2 倍积分",
                        "尊享会员本人入住免费赠送营养自助早餐 1 份（仅限有餐饮配套门店提供）",
                        "尊享预订保留 20:00，退房时间延迟 1 小时",
                        "尊享无停留退房、免交押金服务",
                        "尊享新开店或指定分店各类会员专享特价房",
                        "尊享积分兑换免费房和精美礼品",
                        "尊享贰伍壹叁餐饮 8.8 折优惠（详询餐饮店）",
                        "NO SHOW（预订未到）每月 2 次“积分扣除”豁免"
                        ], 
                    },  
                    {
                        url: "static/img/zsCare.png",
                        name: "钻石会员",
                        text: [
                        "送 3000 积分，享受联盟店房费 8.0 折优惠及 3 倍积分",
                        "尊享会员本人入住免费赠送营养自助早餐 2 份（仅限有餐饮配套门店提供）",
                        "尊享预订保留 20:00，退房时间延迟 1 小时",
                        "尊享无停留退房、免交押金服务",
                        "尊享新开店或指定分店各类会员专享特价房",
                        "尊享积分兑换免费房和精美礼品",
                        "尊享贰伍壹叁餐饮 8.8 折优惠（详询餐饮店）",
                        "会员生日当月可赠送 50 元现金券一张，三个月有效",
                        "尊享客房免费升上一级最优房型（视酒店客房情况）",
                        "NO SHOW（预订未到）每月 2 次“积分扣除”豁免"
                        ],
                    }]
                }
            },
            computed: {
                userRank(){
                    return this.$store.state.userInfo.vipRank;
                },
                price(){
                    if(!this.userRank||this.userRank=='大众会员'){
                        if(this.currentRank==0)
                            return 0;
                        else if(this.currentRank==1)
                            return 58;
                        else if(this.currentRank==2)
                            return 138;
                    }else if(this.userRank=='黄金会员'){
                        if(this.currentRank<=1)
                            return 0;
                        else
                            return 100;

                    }else if(this.userRank=='钻石会员'){
                        return 0;
                    }
                },
                states(){
                    if(!this.userRank){
                        if(this.currentRank==0)
                            return '开通大众会员';
                        else if(this.currentRank==1)
                            return '开通黄金会员';
                        else if(this.currentRank==2)
                            return '开通钻石会员';
                    }else if(this.userRank=='大众会员'){
                        if(this.currentRank==0)
                            return '您已经是大众会员';
                        else if(this.currentRank==1)
                            return '升级为黄金会员';
                        else if(this.currentRank==2)
                            return '升级为钻石会员';
                    }else if(this.userRank=='黄金会员'){
                        if(this.currentRank<=1)
                            return '您已经是黄金会员';
                        else
                            return '升级为钻石会员';
                    }else if(this.userRank=='钻石会员'){
                        return '您已经是钻石会员'
                    }
                },
                action(){
                    if(!this.userRank){
                        return '开通';
                    }
                    else if(this.userRank=='大众会员'){
                        if(this.currentRank==0)
                            return '';
                        else
                            return '升级';
                    }else if(this.userRank=='黄金会员'){
                        if(this.currentRank<=1)
                            return '';
                        else
                            return '升级';
                    }else{
                        return '升级'
                    }
                }
            },
            methods: {
                selectRank(index){
                    this.currentRank=index;
                },
                pay(){

                }
            }
        }
        </script>

        <!-- Add "scoped" attribute to limit CSS to this component only -->
        <style lang="less" scoped>
        .page{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #f2f2f2;
            overflow: auto;
            padding-bottom:1.5rem;
            .detail-wrapper{
                width: 100%;
                
                display: inline-block;
                .updaepage{
                    width:100%;
                    // padding-bottom: 3.5rem;
                    min-height:12.0rem;
                    .image{
                        display: block;
                        // width:7.946667rem /* 298/37.5 */;
                        height: 4.213333rem /* 158/37.5 */;
                        margin: .266667rem /* 10/37.5 */ 1rem /* 37.5/37.5 */ .48rem /* 18/37.5 */;
                        background-repeat: no-repeat;
                        background-position:center;
                        background-size: 100%;
                    }
                    .lists{
                        display: block;
                // width:7.946667rem /* 298/37.5 */;
                margin: 0 1rem /* 37.5/37.5 */;
                .title{
                    display: block;
                    width:100%;
                    height: .533333rem /* 20/37.5 */;
                    line-height: .533333rem /* 20/37.5 */;
                    text-align: center;
                    font-size: .48rem /* 18/37.5 */;
                    font-family: 'Microsoft YaHei';
                    font-weight: bold;
                    color: #ea5319;
                    margin-bottom: .373333rem /* 14/37.5 */;
                }
                .item{
                    display:flex;
                    width: 100%;
                    line-height: 1.8;
                    img{
                        width: 0.28rem /* 10/37.5 */;
                        height: 0.266667rem /* 10/37.5 */;
                        margin-right: .213333rem /* 8/37.5 */;
                        margin-top:0.133333rem;
                    }
                    .text{
                        flex-grow:1;
                        font-family: 'Microsoft YaHei';
                        color: #000000;
                        font-size: .266667rem /* 10/37.5 */;
                        text-align: left;
                    }
                }
            }
        }
    }
    .btns{
        display:flex;
        flex-direction:column;
        align-items:center;
        // position:fixed;
        // width:100%;
        // bottom:1.333333rem;

        .selectBtn{
            width:3.2rem /* 120/37.5 */;
            height: .8rem /* 30/37.5 */;
            line-height: .8rem /* 30/37.5 */;
            border: 1px solid #ea5319;
            border-radius: .4rem /* 15/37.5 */;
            overflow: hidden;
            position: relative;
            text-align: center;
            font-size: .32rem /* 12/37.5 */;
            color: #ea5319;
            margin-bottom:0.266667rem;
        // margin: -3.066667rem /* 115/37.5 */ auto 0;
    }
}
.bottomPay{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 1.333333rem /* 50/37.5 */;
    .content{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        background: #ffffff;
        font-size: 0;
        color: #000000;
        height: 1.333333rem /* 50/37.5 */;
        .content-left{
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            font-size: .373333rem /* 14/37.5 */;
            .price{
                display: inline-block;
                margin-left: .32rem /* 12/37.5 */;
                height: 100%;
                line-height: 1.333333rem /* 50/37.5 */;
            }
            .des{
                display: inline-block;
                margin-left: .32rem /* 12/37.5 */;
                height: 100%;
                line-height: 1.333333rem /* 50/37.5 */;
            }
        }
        .content-right{
            -webkit-box-flex: 0;
            -ms-flex: 0 0 3.2rem /* 120/37.5 */;
            flex: 0 0 3.2rem /* 120/37.5 */;
            width: 3.2rem /* 120/37.5 */;
            .pay{
                background-color: #ea5319;
                color: #ffffff;
                line-height: 1.333333rem /* 50/37.5 */;
                text-align: center;
                font-size: .373333rem /* 14/37.5 */;
            }
        }
    }
}
}
</style>
