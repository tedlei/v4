<template>
  <div class="scen-app">
    <div class="scen_logo">
      <div class="scen_mar fx">
        <div class="scen_div_l"><img src="../../../../public/images/logo.png" alt="LOGO"></div>
        <div class="scen_div_r">
          <p>客服电话:</p>
          <p>023-6153-4567</p>
        </div>
      </div>
    </div>
    <infoFillIn :isUpdate="isUpdate"></infoFillIn>
    <footerDiv></footerDiv>
  </div>
</template>

<script>
import footerDiv from '@/components/component_lm/footer'
import infoFillIn from './infoFillIn/infoFillIn'
  export default {
    components:{footerDiv,infoFillIn},
    data() {
      return {
        isUpdate:false,
      }
    },
  }
</script>

<style lang="less" scoped>
.scen-app{
  width: 100%;
  .scen_logo{
    padding:12px 0;
    height:100px;
    background:rgba(255,255,255,1);
    .scen_mar{
      margin: auto;
      width: 1200px;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      .scen_div_l{
        width:120px;
        height:44px;
        background:rgba(204,204,204,1);
        img{
          width: 100%;
          height: 100%;
          background: white;
        }
      }
      .scen_div_r{
        font-size: 18px;
        color:rgba(102,102,102,1);
      }
    }
  }
}
</style>
