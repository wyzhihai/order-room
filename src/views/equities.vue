<!--  -->
<template>
  <div>
      <div class="careType">
        <span v-for="(item, index) in des" :key="index" class="careTitle" @click="selectType(index)" :class="{clickClass: index == activeIndex}">{{item.name}}</span>
    </div>
    <ul class="content">
      <li v-for="(item, indexs) in des[activeIndex].text" :key="indexs" class="text">{{item}}</li>
  </ul>
</div>
</template>

<script>
export default {
    created(){
        switch(this.$route.query.rank){
            case '大众会员':
            this.activeIndex=0
            break;
            case '黄金会员':
            this.activeIndex=1
            break;
            case '钻石会员':
            this.activeIndex=2
            break;
            default:
            this.activeIndex=0
            break;
        }
    },
    data () {
        return {
            activeIndex:0,
            des: [
            {
                name: "大众卡",
                text: [
                "尊享通过前台/无预订/400 热线方式预订可获客房 9.5 折优惠及 1倍消费积分",
                "尊享通过网络预定可获客房 9.5 折优惠及 1倍",
                "尊享预订保留 19:00，退房时间 12:00",
                "尊享无停留退房、免交押金服务",
                "尊享积分兑换免费房和精美礼品",
                "尊享贰伍壹叁餐饮 8.8 折优惠（详询餐饮店）"
                ]
            },
            {
                name: "黄金卡",
                text: [
                "送 1000 积分，享受联盟店房费 8.5 折优惠及 2 倍积分",
                "尊享会员本人入住免费赠送营养自助早餐 1 份（仅限有餐饮配套门店提供）",
                "尊享预订保留 20:00，退房时间延迟 1 小时",
                "尊享无停留退房、免交押金服务",
                "尊享新开店或指定分店各类会员专享特价房",
                "尊享积分兑换免费房和精美礼品",
                "尊享贰伍壹叁餐饮 8.8 折优惠（详询餐饮店）",
                "NO SHOW（预订未到）每月 2 次“积分扣除”豁免"
                ]
            },
            {
                name: "钻石卡",
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
                ]
            },
            ]
        }
    },
    methods: {
        selectType (index) {
            this.activeIndex = index
        },
    }
}
</script>

<style lang='less' scoped>
.careType{
    width: 100%;
    height: 1.2rem /* 45/37.5 */;
    line-height: 45px;
    border-bottom: 1px solid #e6e6e6;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    .careTitle{
        font-size: .4rem /* 15/37.5 */;
        text-align: center;
        display: inline-block;
        color:#999;
        flex: 1;
    }
    .clickClass{
        color: #ea5319;
    }
}
.content{
    margin: .8rem /* 30/37.5 */ 1.066667rem /* 40/37.5 */ 0;
    .text{
        // margin-bottom: .346667rem /* 13/37.5 */;
        font-size: .32rem /* 12/37.5 */;
        text-align: left;
        line-height: 2 /* 14/37.5 */;

    }
}
</style>