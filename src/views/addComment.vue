<!-- 评价 组件 -->
<template>
  <div class="ratings-select">
    <!-- 顶部标题 -->
    <header class="title">
      <router-link class="back" :to="from"><img src="static/img/back-2.png" alt=""></router-link>
      <span class="headtitle">{{hotelName}}</span>
      <span @click.prevent="upload" class="btn">{{loading?'发布中...':'发布'}}</span>
    </header>
    <!-- 评论表情选择 -->
    <div class="ratings-type">
      <ul class="supports">
        <li class="support-item" v-for="(item,index) in items" :key="index">
          <img @click="changeScore(index+1)" class="icon" :src="score==index+1?item.face2:item.face">
          <span :class="{orange:score==index+1}" class="text">{{item.sub}}</span>
        </li>
      </ul>
    </div>
    <!-- 评论区 -->
    <div class="ratings-Content">
      <div class="ratings-item">
        <span class="item" v-for="(item, index) in recommend" :key="index" @click="select(item, index,$event)">{{item}}</span>
      </div>
      <section class="user-rating">
        <textarea v-model="label" disabled  class="form-control" rows="2" placeholder="入住后感觉如何，快来说说酒店的环境，服务，入住房间等情况吧"></textarea>
        <textarea class="msg" :disabled="loading" v-model="message" cols="30" rows="5"></textarea>
        <span class="ratingNumber" v-show="this.message.length < 200">还差{{lackNumber}}字即可发布！</span>
      </section>
    </div>
    <!-- 上传图片 -->
    <upload :disabled="loading" ref="upload"></upload>
    <!-- 入住类型 -->
    <!-- <div class="chooseType">
      <p class="text">入住类型</p>
      <span class="items" v-for="(item,index) in Type" :key="index" @click="selectType(index)" :class="{clickClass: index == activeIndex}">{{item}}</span>
    </div> -->
  </div>
</template>

<script>
// import axios from 'axios'
// axios.defaults.timeout=5*60*1000;
import {mapState} from 'vuex'
export default {
  name: 'HelloWorld',
  beforeRouteEnter(to,from,next){
    next(function(vm){
      vm.from=from.path;
    })
  },
  data () {
    return {
      score:5,
      from:'/orderState/success',
      items: [
      {
        face: 'static/img/bad-default.png',
        face2: 'static/img/bad-selected.png',
        sub: '差'
      },
      {
        face: 'static/img/ordinary-default.png',
        face2: 'static/img/ordinary-selected.png',
        sub: '一般'
      },
      {
        face: 'static/img/decent-default.png',
        face2: 'static/img/decent-selected.png',
        sub: '还不错'
      },
      {
        face: 'static/img/satisfaction-default.png',
        face2: 'static/img/satisfaction-selected.png',
        sub: '很满意'
      },
      {
        face: 'static/img/praise-default.png',
        face2: 'static/img/praise-selected.png',
        sub: '超赞'
      }],
      recommend:['卫生干净', '房间大', '位置好', '性比价高', '环境优雅', '服务热情', '隔音好', '价格实惠'],
      message: '',
      label:'',
      imgList:[],
      loading:false
    }
  },
  methods: {
    select (item, index, event) {
      // 判断/点击选中标签添加class
      if(this.loading)
        return;
      if (event.target.classList.contains('activeClass')) {
        event.target.classList.remove('activeClass')
      } else {
        event.target.classList.add('activeClass')
      }
      // 判断评论区是否已经包含某个字符串
      if (this.label.indexOf(item) !== -1) {
        item = item + '#'
        this.label = this.label.replace(item, '')
      } else {
        this.label += item
        this.label = this.label + '#'
      }
    },
    // selectType (index) {
    //   this.activeIndex = index
    // },
    changeScore(index){
      if(this.loading)
        return;
      this.score=index;
    },
    // upload(){
    //   if(this.loading)
    //     return;
    //   if(!this.label||!this.message){
    //     alert('请输入评论内容')
    //     return;
    //   }else{
    //     this.loading=true
    //   }
    //   var formData=new FormData();
    //   var config={ 
    //     headers:{'Content-Type':'multipart/form-data' },
    //     onUploadProgress(e){
    //       console.log('upload-progress:',e.loaded+':'+e.total)
    //     },
    //     onDownloadProgress(e){
    //       console.log('download-progress:',e)
    //     }
    //   };
    //   this.$refs.upload.files.forEach(function(file){
    //     formData.append('image[]',file)
    //   })
    //   formData.append('act','uploads');
    //   formData.append('key','image');
    //   // console.log('formData:',formData)
    //   axios.post('http://api.shiyushuo.net/WXBOOK/book.php',formData,config).then(function(res){
    //     console.log('uploaded:res',res)
    //     this.imgList=res.data;
    //     this.addComment();
    //   }.bind(this))
    //   .catch(function(err){
    //     console.log(err)
    //   })
    // },
    // addComment(){
    //   axios.post('http://api.shiyushuo.net/WXBOOK/book.php',{
    //     act:"addComment",
    //     branchId:this.hotelId,
    //     imgArr:JSON.stringify(this.imgList),
    //     wxid:this.openId,
    //     danhao:this.orderId,
    //     content:JSON.stringify({
    //       star:this.score,
    //       label:this.label,
    //       content:this.message,
    //       checkintime:this.formatDate(this.stime)
    //     },{headers:{'Content-Type':'application/json' }})
    //   }).then(function(res){
    //     console.log('addComment',res)
    //     this.loading=false;
    //     if(res.status==200){
    //       alert(res.statusText);
    //       // this.$router.push('/comments/'+this.hotelId);
    //     }
    //   })
    //   .catch(function(err){
    //     console.log('catch:',err)
    //   })
    // },
    
    upload(){
      if(this.loading)
        return;
      if(!this.label||!this.message){
        alert('请输入评论内容')
        return;
      }else{
        this.loading=true
      }
      var formData=new FormData();
      var config={ 
        headers:{'Content-Type':'multipart/form-data' },
        uploadProgress(e){
          console.log('progress:',e.loaded+':'+e.total)
        }
      };
      this.$refs.upload.files.forEach(function(file){
        formData.append('image[]',file)
      })
      formData.append('act','uploads');
      formData.append('key','image');
      console.log('formData:',formData)
      this.$http.post('http://api.shiyushuo.net/WXBOOK/book.php',formData,config).then(function(res){
        console.log('uploaded:res',res.body)
        this.imgList=res.body;
        this.addComment();
      }.bind(this),function(err){
        console.log(err)
      })
    },
    addComment(){
      this.$http.post('http://api.shiyushuo.net/WXBOOK/book.php',{
        act:"addComment",
        branchId:this.hotelId,
        imgArr:JSON.stringify(this.imgList),
        wxid:this.openId,
        danhao:this.orderId,
        content:JSON.stringify({
          star:this.score,
          label:this.label,
          content:this.message,
          checkintime:this.formatDate(this.stime)
        })
      },{
        emulateJSON:true
      }).then(function(res){
        console.log('addComment',res)
        this.loading=false;
        if(res.body.code==200){
          alert(res.body.Msg);
          this.$router.push('/comments/'+this.hotelId);
        }
      },function(err){
        console.log(err)
      })
    },
    formatDate(date){
      return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    }
  },
  computed: {

    // 计算评论限定字数的差值
    lackNumber: function () {
      if (this.message.length < 200) {
        return 200 - (this.message.length)
      }
    },
    ...mapState({
      stime:state=>state.searchInfo.stime,
      openId:state=>state.openId,
    }),
    hotelName(){
      return this.$route.query.hotelName;
    },
    hotelId(){
      return this.$route.query.hotelId;
    },
    orderId(){
      return this.$route.query.orderId;
    }
  }
}
</script>

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
        .msg{
          width:100%;
          margin-top:0.266667rem;
        }
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
          bottom:0.32rem;
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
