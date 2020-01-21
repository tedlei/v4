<template>
  <div class="schBody-app">
    <carousel :teacObj="teacObj" style="margin-top:10px;"></carousel>
    <div class="schbody_div1" @click="topyhj">
      领取优惠券
    </div>
    <recommend :teacObj="teacObj" style="margin-top:30px;"></recommend>
    <mapImg :teacObj="teacObj" style="margin-top:30px;"></mapImg>
  </div>
</template>

<script>
import carousel from './carousel'
import recommend from './recommend'
import mapImg from './mapImg'
  export default {
    components:{carousel,recommend,mapImg},
    props:['teacObj'],
    data() {
      return {
        
      }
    },
    methods:{
      topyhj:function(){
        this.$emit('topHea',0,'/schoolDetail/discountCoupon');
      }
    }
  }
</script>

<style lang="less" scoped>
.schBody-app{
  width: 100%;
  width: 1200px;
  margin: auto;
  padding-bottom: 20px;
  .schbody_div1{
    margin: 40px auto;
    margin-bottom: 0;
    width:1200px;
    height:100px;
    background:rgba(204,204,204,1);
    border-radius:5px;
    text-align: center;
    line-height: 100px;
    font-size: 24px;
    color:rgba(51,51,51,1);
    cursor: pointer;
  }
}
</style>