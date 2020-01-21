<template>
  <div class="synopsis-app">
    <carousel style="margin-top:10px;" :teacObj="teacObj"></carousel>
    <div class="syno_div">
      <p class="syno_p">学校简介</p>
      <div class="syon_jj" v-html="teacObj.schoolIntroduction"></div>
    </div>
    <mapImg :teacObj="teacObj"></mapImg>
  </div>
</template>

<script>
import carousel from '../homePage/carousel'
import mapImg from '../homePage/mapImg'
export default {
  components:{carousel,mapImg},
  props:['teacObj']
}
</script>

<style lang="less">
.synopsis-app{
  margin:auto;
  width: 1200px;
  .syno_div{
    padding:40px 0;
    .syno_p{
      margin:20px 0;
      font-size: 22px;
      color:rgba(51,51,51,1);
      img{
        display: block;
        max-width: 1150px;
        margin:10px auto;
      }
    }
    div{
      padding-top: 10px;
      span,img{
        max-width: 1200px !important;
      }
      img{
        display: block;
        margin:10px auto;
      }
    }
  }
}
</style>