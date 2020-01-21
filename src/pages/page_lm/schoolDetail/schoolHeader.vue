<template>
  <div class="schHea-app">
    <div class="sch_div fx"> 
      <div class="sch_logo">
        <img :src="teacObj.schoolLogo" alt="正在加载...">
        <!-- <div ref="sch_span" :style="{'left':num1+'px'}">{{teacObj.organizationName}}</div>
        <div :style="{'left':num2+'px'}">{{teacObj.organizationName}}</div> -->
      </div>
      <ul class="sch_ul">
        <template v-for="(item,i) of heaList">
          <li :key="i" class="sch_li" :class="i===num*1?'schBorderBottom':''" @click="topHea(i,item.src)">{{item.title}}</li>
        </template>
        <li class="sch_li" v-if="isShowPhone"  @click="topHea(5,teacObj.schoolUrl)">进入学校网站</li>
      </ul>
      <div style="width:300px;" v-if="!isShowPhone"></div>
      <div class="sch_jgz" @click="topGz(teacObj.id,isGz)" :class="isGz?'ygz':''">{{isGz?'已关注':"+关注"}}</div>
      <div class="sch_phone" v-if="isShowPhone">联系电话：<span>{{teacObj.schoolPhone}}</span></div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['num',"teacObj"],
    data() {
      return {
        heaList:[
          {title:'主页',src:'/schoolDetail'},
          {title:'课程',src:'/schoolDetail/currList'},
          {title:'教师',src:'/schoolDetail/teacList'},
          {title:'简介',src:'/schoolDetail/synopsis'},
          {title:'在线客服',src:'/schoolDetail/chatWindow'},
        ],
        isGz:false,   //是否关注
        isShowPhone:false,   //是否显示电话
      }
    },
    created() {
      this.ControlPopup();
    },
    methods:{
      //查询是否登陆
       ControlPopup: function(){
        let heaList = this.heaList;
        let {id} = this.$route.query;
        let ui = this.getItem('userInfo')
        if(ui&&ui.schoolUser&&id!==ui.schoolUser.id&&this.isLogin()){
          heaList.push({title:'客服',src:'/schoolDetail/chatWindow'});
        }
      },

      topHea:function(num,src){
        this.$emit("topHea",num,src);
      },

      //加关注
      topGz(schoolid,isGz){
        if(isGz)return;
        let userInfo = this.getItem("userInfo");
        if(!userInfo){
          this.$message({message:'需要登录后在进行关注！',type:'warning'});
          return;
        }
        let userid = userInfo.user.id;
        let url = '/attention/add.do';
        this.fetch({url,data:{userid,schoolid},method:'post'},4).then(res=>{
          if(res.data){
            this.$message({message:'关注成功',type:'success'});
            this.isGz = res.data;
            this.$emit('attention',res.data);
          }
          else this.$message({message:'关注失败，请重新关注！',type:'warning'});
        })
      },

      //查询是否关注
      setchIsGz(schoolid){
        let userInfo =  this.getItem('userInfo');
        if(!userInfo)return;
        let userid = userInfo.user.id;
        let url = '/attention/findByfollow.do';
        this.fetch({url,data:{userid,schoolid},method:'post'},4).then(res=>{
          this.isGz = res.data.success;
          this.$emit('attention',res.data.success);
        })
      },

      //判断是否显示学校电话
      getJurisdiction(id){
        let url = 'user/findByRole.do';
        this.fetch({url,data:{schoolId:id},method:'get'},2).then(res=>{
          let roleName = res.data[res.data.length-1].roleName;
          this.isShowPhone = res.data?roleName==="school"?false:true:false
        })
      },
    },
    watch: {
      'teacObj':function(val){
        this.getJurisdiction(val.id);
        this.setchIsGz(val.id);
      },
    }
  }
</script>

<style lang="less" scoped>
.schHea-app{
  width: 100%;
  height: 56px;
  background-color: white;
  border-bottom: 1px solid rgba(204,204,204,1);
  .sch_div{
    margin:auto;
    padding-right: 40px;
    width: 1200px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .sch_logo{
      width: 150px;
      height: 50px;
      // background-color: antiquewhite;
      // border: 1px solid rgba(0,0, 0, 0.1);
      // border-radius: 5px;
      // position: relative;
      overflow: hidden;
      img{
        width: 100%;
      }
      // div{
      //   padding-left: 10px;
      //   font-size: 28px;
      //   color: #000;
      //   display: inline-block;
      //   white-space: nowrap;
      //   position:absolute;
      //   // animation: 10s wordsLoop linear infinite normal;
      // }
      // span:first-child{
      //   left: -100%;
      // }
      // span+span{
      //   left: 100%;
      // }

      // @keyframes wordsLoop {
      //       0% {
      //           transform: translateX(200px);
      //           -webkit-transform: translateX(100px);
      //       }
      //       100% {
      //           transform: translateX(-100%);
      //           -webkit-transform: translateX(-100%);
      //       }
      //   }
 
      //   @-webkit-keyframes wordsLoop {
      //       0% {
      //           transform: translateX(200px);
      //           -webkit-transform: translateX(200px);
      //       }
      //       100% {
      //           transform: translateX(-100%);
      //           -webkit-transform: translateX(-100%);
      //       }
      //   }
      // @keyframes wordsLoop {
      //   0% {
      //     transform: translateX(200px);
      //     -webkit-transform: translateX(30px);
      //   }
      //   100% {
      //     transform: translateX(-100%);
      //     -webkit-transform: translateX(-60%);
      //   }
      // }
    }
    .sch_ul{
      li+li{
        margin-left: 30px;
      }
      .sch_li{
        height: 53px;
        float: left;
        line-height: 58px;
        padding:0 10px;
        cursor: pointer;
      }
      .schBorderBottom{
        font-weight:bold;
        color:#FF7225;
        border-bottom: 2px solid #FF7225;
      }
    }
    .sch_jgz{
      margin-left: 30px;
      width:72px;
      height:30px;
      background:rgba(42,176,235,1);
      border-radius:3px;
      text-align: center;
      line-height: 30px;
      font-size: 16px;
      color: white;
      cursor: pointer;
    }
    .ygz{
      background: #e6e6e6;
      color: #999999;
      cursor: default;
    }
    .sch_phone{
      font-size: 16px;
      color:rgba(51,51,51,1);
      span{
        color: #FF7225;
      }
    }
  }
}
</style>