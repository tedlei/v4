<template>
  <div>
      <div class="pec-app">
        <div class="pec_div_left">
          <pecImgList :imgList="imgList"></pecImgList>
        </div>
        <div class="pec_div_right">
          <pecRightHeader :title="title"></pecRightHeader>
          <pecRightPhoto  v-if="isPhoto"
                          :imgSrc="this.$store.getters.headPortraitUrl(this)"
                          :nickname="this.$store.getters.nickName(this)"></pecRightPhoto>
          <personalData v-if="isPage==='personalData'"></personalData>
          <updatePwd v-if="isPage==='updatePwd'"></updatePwd>
          <wdAttention v-if="isPage==='wdAttention'"></wdAttention>
          <coupon v-if="isPage==='coupon'"></coupon>
          <subscribe v-if="isPage==='subscribe'"></subscribe>
        </div>
      </div>
    <indexFooter></indexFooter>
  </div>
</template>

<script>
import pecImgList from './pecImgList'
import pecRightHeader from './pecRightHeader'
import pecRightPhoto from './pecRightPhoto'

import personalData from './personalData/personalData'
import wdAttention from './wdAttention/wdAttention'
import subscribe from './subscribe/subscribe'
import coupon from './coupon/coupon'
import updatePwd from './updatePwd'

  export default {
    components:{pecImgList,pecRightHeader,pecRightPhoto,personalData,wdAttention,subscribe,coupon,updatePwd},
    data() {
      return {
        imgList:[],   //广告图片
        isPage:'personalData',   //控制子组件
        userInfo:{
          user:{}
        },    //用户信息
      }
    },
    watch: {
      $route(){
        let num = this.$route.query.command;
        this.getParam(num);
      }
    },
    created(){
      let userInfo = this.getItem('userInfo');
      this.userInfo = userInfo;
      let num = this.$route.query.command;
      if(!userInfo){
        this.$message({message:'您没有登录，请先登录',type:'warning'})
        this.push('/loginAndRegister')
        return
      }
      this.getParam(num);
      this.getImage();
    },
    methods:{
      getParam:function(num){
        let str = '';
        switch(num){
          case '1': str="personalData";
          break;
          case '2': str="wdAttention";
          break;
          case '5': str="updatePwd";
          break;
          case '4': str="coupon";
          break;
          case '3': str="subscribe";
          break;
        }
        this.isPage = str;
      },
      getImage(){
        let url = '/content/cateId.do?categoryId=7'
        this.fetch({url,method:'get'},2).then(res=>{
          this.imgList = res.data;
        })
      }
    },
    computed:{
      title:function(){
        let str = '';
        switch(this.isPage){
          case 'personalData': str="个人资料";
          break;
          case 'wdAttention': str="我的关注";
          break;
          case 'updatePwd': str="密码设置";
          break;
          case 'coupon': str="我的卡券";
          break;
          case 'subscribe': str="我的预约";
          break;
          default: str=this.isPage;
        }
        return str;
      },
      isPhoto:function(){
        let boole = true;
        switch(this.isPage){
          case 'updatePwd': boole=false;
          break;
          case 'coupon': boole=false;
          break;
        }
        return boole;
      }
    }
  }
</script>

<style lang="less" scoped>
.pec-app{
  width: 100%;
  min-width: 1200px;
  padding-top:20px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: row; 
  justify-content: center;
  background:rgba(242,242,242,1);
  .pec_div_left{
    width: 260px;
  }
  .pec_div_right{
    margin-left: 20px;
    width: 920px;
    background: rgba(255,255,255,1);
  }
}
</style>