<!-- 评价 组件 -->
<template>
  <div class="ratings-select">
    <!-- 顶部标题 -->
    <header class="title">
      <router-link class="back" to="/orderState/success"><img src="static/img/back-2.png" alt=""></router-link>
      <span class="headtitle">{{title}}</span>
      <a @click="upload" href="#" class="btn">发布</a>
    </header>
    <!-- 评论表情选择 -->
    <div class="ratings-type">
      <ul class="supports">
        <li class="support-item" v-for="(item,index) in items" :key="index">
          <img @click="changeScore(index)" class="icon" :src="score==index?item.face2:item.face">
          <span :class="{orange:score==index}" class="text">{{item.sub}}</span>
        </li>
      </ul>
    </div>
    <!-- 评论区 -->
    <div class="ratings-Content">
      <div class="ratings-item">
        <span class="item" v-for="(item, index) in recommend" :key="index" @click="select(item, index,$event)">{{item}}</span>
      </div>
      <section class="user-rating">
        <textarea   class="form-control" rows="4" placeholder="入住后感觉如何，快来说说酒店的环境，服务，入住房间等情况吧">{{ reversedMessage }}</textarea>
        <span class="ratingNumber" v-show="this.message.length < 10">还差{{lackNumber}}字即可发布！</span>
      </section>
    </div>
    <!-- 上传图片 -->
    <el-upload class="upload" :limit="9" action="http://api.shiyushuo.net/WXBOOK/book.php" list-type="picture-card" :multiple="true" :auto-upload="true" :data="upLoadData" :before-upload="beforeUpload"  :onError="uploadError" :onSuccess="uploadSuccess" name="image[]" >
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <!-- 入住类型 -->
    <!-- <div class="chooseType">
      <p class="text">入住类型</p>
      <span class="items" v-for="(item,index) in Type" :key="index" @click="selectType(index)" :class="{clickClass: index == activeIndex}">{{item}}</span>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      title: '锐利堡国际公寓（南海万达广场分店）',
      userContent: '入住后',
      score:0,
      items: [
      {
        face: '/static/img/bad-default.png',
        face2: '/static/img/bad-selected.png',
        sub: '差'
      },
      {
        face: '/static/img/ordinary-default.png',
        face2: '/static/img/ordinary-selected.png',
        sub: '一般'
      },
      {
        face: '/static/img/decent-default.png',
        face2: '/static/img/decent-selected.png',
        sub: '还不错'
      },
      {
        face: '/static/img/satisfaction-default.png',
        face2: '/static/img/satisfaction-selected.png',
        sub: '很满意'
      },
      {
        face: '/static/img/praise-default.png',
        face2: '/static/img/praise-selected.png',
        sub: '超赞'
      }],
      message: '',
      activeIndex: 0,
      // element ui 上传组件
      dialogImageUrl: '',
      dialogVisible: false,
      fileList:[],//要上传的文件对象
      // autoUpload: 'ture',
      uploadUrl: 'http://api.shiyushuo.net/WXBOOK/book.php',
      upLoadData: {
        act: "uploads",
        key: 'image'
      }
    }
  },
  props: {
    recommend: {
      type: Array,
      default () {
        return ['卫生干净', '房间大', '位置好', '性比价高', '环境优雅', '服务热情', '隔音好', '价格实惠']
      }
    },
    Type: {
      type: Array,
      default () {
        return ['情侣', '朋友', '亲子', '出差', '其他']
      }
    }
  },
  methods: {
    beforeUpload(file){
      console.log(file)

      // return false
    },

    // 图片上传成功后的回调
    uploadSuccess (response, file, fileList) {
      this.dialogImageUrl = file.url
      this.upLoadData.key = file.name
      // this.upload()
      // console.log('上传')
    },
    // 图片上传错误
    uploadError (response, file, fileList) {
      console.log('上传失败，请重试！')
    },
    select (item, index, event) {
      // 判断/点击选中标签添加class
      if (event.target.classList.contains('activeClass')) {
        event.target.classList.remove('activeClass')
      } else {
        event.target.classList.add('activeClass')
      }
      // 判断评论区是否已经包含某个字符串
      if (this.message.indexOf(item) !== -1) {
        item = item + '#'
        this.message = this.message.replace(item, '')
      } else {
        this.message += item
        this.message = this.message + '#'
      }
    },
    selectType (index) {
      this.activeIndex = index
    },
    // 此处的 upload() 是自定义方法， 大胆修改！
    upload(){
      this.$http.get('http://api.shiyushuo.net/WXBOOK/book.php',
      {	
        params:{
          act:'uploads',
          key: this.upLoadData.key,
        }
      }).then(function(res){
        console.log(res)
        console.log("上传成功字节")
      },err=>console.log(err));
    },
    changeScore(index){
      this.score=index;
    }
  },
  computed: {
    // 显示评论区便签方框选择文字
    reversedMessage: function (item, index) {
      if (this.message) {
        return this.message
      }
    },
    // 计算评论限定字数的差值
    lackNumber: function () {
      if (this.message.length < 10) {
        return 10 - (this.message.length)
      }
    }
  }
}
</script>
<style lang="less">
.upload{
  background-color: #ffffff;
  margin-bottom: .4rem /* 15/37.5 */;
  text-align: left;
  padding: .32rem /* 12/37.5 */;
  .el-upload-list__item-status-label{
    display:none!important;
  }
  .el-upload-list--picture-card .el-upload-list__item{
    width: 2.08rem /* 78/37.5 */;
    height: 2.08rem /* 78/37.5 */;
    line-height: 2.08rem /* 78/37.5 */;
    border-radius: 0px;
    border: 0px;
  }
  .el-upload--picture-card{
    width: 2.08rem /* 78/37.5 */;
    height: 2.08rem /* 78/37.5 */;
    line-height: 2.08rem /* 78/37.5 */;
    background-image: url('/static/img/sample.png');
    background-repeat: no-repeat;
    background-size: 2.08rem /* 78/37.5 */ 2.08rem /* 78/37.5 */;
    border-color: transparent;
  }
  .el-upload-list--picture-card .el-upload-list__item-actions{
    background-color: transparent;
    .el-upload-list__item-preview{
      display: none!important;
    }
    .el-upload-list__item-delete{
      display: inline-block!important;
      width: 0.666667rem /* 20/37.5 */;
      height: 0.666667rem /* 20/37.5 */;
      position: absolute!important;
      top: 0;
      right: 0;
      background-image: url(/static/img/delete.png);
      background-size: 0.666667rem /* 20/37.5 */ 0.666667rem /* 20/37.5 */;
      background-repeat: no-repeat;
      .el-icon-delete{
        display: none;
      }
    }
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.ratings-select{
  height: 100%;
  background-color: #f2f2f2;
  .title{
    height: 1.173333rem /* 44/37.5 */;
    background-color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: .026667rem /* 1/37.5 */ solid #cccccc;
    .back{
      position:absolute;
      top:0.333333rem;
      left:0.32rem;
      img{
        width:0.266667rem;
      }
    }
    .headtitle{
      width: 50%;
      text-align: center;
      font-size: .48rem /* 18/37.5 */;
      display: block;
      height: 1.173333rem /* 44/37.5 */;
      line-height: 1.173333rem /* 44/37.5 */;
      color: #000000;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0 auto;
    }
    .btn{
      display: block;
      position: absolute;
      top: 0;
      right: .32rem /* 12/37.5 */;
      line-height: 1.173333rem /* 44/37.5 */;
      font-size: .4rem /* 15/37.5 */;
      color: #ea5319;
      text-decoration:none;
    }
  }
  .ratings-type{
    width: 100%;
    height: 2.933333rem /* 110/37.5 */;
    background-color: #ffffff;
    overflow: hidden;
    margin-top: 1.173333rem /* 44/37.5 */;
    margin-bottom: .533333rem /* 20/37.5 */;
    text-align: center;
    overflow: hidden;
    .supports{
      list-style-type:none;
      margin: 0;
      padding: 0;
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-around;
      margin-top: .666667rem /* 25/37.5 */;
      .support-item{
        list-style-type:none;
        display: inline-block;
        width: 1.066667rem /* 40/37.5 */;
        line-height: .32rem /* 12/37.5 */;
        overflow: hidden;
        .icon{
          display: inline-block;
          vertical-align: top;
          width: 1.066667rem /* 40/37.5 */;
          height: 1.066667rem /* 40/37.5 */;
          margin: 0px;
          background-size: 1.066667rem /* 40/37.5 */ 1.066667rem /* 40/37.5 */;
          background-repeat: no-repeat;
            //  background-image: url(../assets/bad-selectud.png);
          }
          .text{
            display: inline-block;
            vertical-align: top;
            font-size: .32rem /* 12/37.5 */;
            color: #666666;
            text-align: center;
            margin-top: .426667rem /* 16/37.5 */;
            text-align: center;
          }
          .orange{
            color:#ea5319;
          }
        }
      }
    }
    .ratings-Content{
      background-color: #ffffff;
      margin-bottom: .4rem /* 15/37.5 */;
      overflow: hidden;
      .ratings-item{
        margin: .426667rem /* 16/37.5 */ .32rem /* 12/37.5 */ .16rem /* 6/37.5 */;
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        .item{
          display: block;
          width: auto;
          height: .666667rem /* 25/37.5 */;
          line-height: .666667rem /* 25/37.5 */;
          padding: 0 .133333rem /* 5/37.5 */;
          font-size: .32rem /* 12/37.5 */;
          color: #999999;
          border: 1px solid #cccccc;
          border-radius: .08rem /* 3/37.5 */;
          margin:0 .266667rem /* 10/37.5 */ .266667rem /* 10/37.5 */ 0;
        }
        .activeClass{
          color: #ea5319;
          border-color: #ea5319;
        }
      }
      .user-rating{
        margin: 0 .32rem /* 12/37.5 */ .293333rem /* 11/37.5 */;
        overflow: hidden;
        position: relative;
        .form-control{
          width:100%;
          padding: 0;
          margin: 0;
          font-size: .346667rem /* 13/37.5 */;
          color: #999999;
          text-align: left;
          display: block;
          border: 0px;
        }
        .ratingNumber{
          position: absolute;
          right: 0;
          bottom: 0rem /* 0/37.5 */;
          font-size: .32rem /* 12/37.5 */;
          color: #999999;
        }
      }
    }
    .chooseType{
      background-color: #ffffff;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      padding: .4rem /* 15/37.5 */ 0 0;
      overflow: hidden;
      justify-content: flex-start;
      .text{
        display: inline-block;
        width: 100%;
        font-size: .32rem /* 12/37.5 */;
        color: #999999;
        text-align: left;
        padding-left: .32rem /* 12/37.5 */;
        padding-bottom: .346667rem /* 13/37.5 */;
        margin: 0;
        overflow: hidden;
        box-sizing:border-box;
      }
      .items{
        display: block;
        width: 2.773333rem /* 104/37.5 */;
        height: .8rem /* 30/37.5 */;
        line-height: .8rem /* 30/37.5 */;
        font-size: .373333rem /* 14/37.5 */;
        color: #000000;
        border: .026667rem /* 1/37.5 */ solid #cccccc;
        border-radius: .106667rem /* 4/37.5 */;
        margin:0 .16rem /* 6/37.5 */ .266667rem /* 10/37.5 */ .32rem /* 12/37.5 */;
        text-align: center;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
      }
      .clickClass{
        color: #ea5319;
        border-color: #ea5319;
      }
    }
  }
  </style>
