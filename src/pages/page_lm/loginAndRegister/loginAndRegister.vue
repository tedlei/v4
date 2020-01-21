<template>
  <div class="lar_log fx" ref="larLogin" :style="{minHeight:divheight+'px',minWidth:divWidth+'px'}">
    <div class="lar-app">
      <div class="larImg" ref="larDiv">
        <img :src="imgUrl" ref="larImg" alt="正在加载">
      </div>
      <div class="lar_div">
        <router-view @keyEvent="keyEvent"></router-view>
      </div>
    </div>
    <footerNav></footerNav>
  </div>
</template>

<script>
import footerNav from '../../../components/component_lm/footer'
  export default {
    components:{footerNav},
    data(){
      return{
        imgUrl:'',
        url:'../../../../public/images/logoBgImg.jpg',
        divheight:0,
        divWidth:0,
      }
    },
    created(){
      let obj = this.getItem('userInfo');
      if(obj && obj.user){
        this.push('/');
      }
      this.getBgImg();
    },
    mounted() {
      this.divheight = this.$refs.larLogin.scrollHeight;
      this.divWidth = this.$refs.larLogin.scrollWidth;
    },
    methods:{
      getBgImg(){
        let url = '/content/cateId.do?categoryId=6'
        this.fetch({url,method:'get'},2).then(res=>{
          this.imgUrl = res.data[0].pic;
        })
      },
      keyEvent(element,incident){
        element.onkeydown=function(event){
          var e = event || window.event || arguments.callee.caller.arguments[0];       
          if(e && e.keyCode==13){
            incident();
          }
        }; 
      }
    }
  }
</script>

<style lang="less" scoped>
.lar_log{
  flex-direction: column;
  position:fixed;
  width: 100%;
  height: 100%;
  min-height: 1000px;
  .lar-app{
    flex: 1;
    width: 100%;
    min-width:1200px;
    overflow: hidden;
    .larImg{
      width: 100%;
      height: 100%;
      background: #000;
      img{
        height: 100%;   
      }
    }
    .lar_div{
      width:452px;
      padding-bottom: 30px;
      background: white;
      position:fixed;
      top: 20%;
      right: 10%;
    }
  }
}
</style>