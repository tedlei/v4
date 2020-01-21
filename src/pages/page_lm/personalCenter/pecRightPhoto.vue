<template>
  <div class="prp-app">
    <div class="prp_photo">
      <el-image class="pecImg" :key="imgSrc" :src="imgSrc" lazy></el-image>
    </div>
    <div class="prp_font">{{nickname}}</div>
  </div>
</template>

<script>
  export default {
    props:['imgSrc','nickname'],
  }
</script>

<style lang="less" scoped>
.prp-app{
  width: 100%;
  padding-top: 40px;
  .prp_photo{
    margin:0 auto;
    width: 108px;
    height: 108px;
    border:1px solid #eee;
    border-radius: 50%;
    background:rgba(230,230,230,1);
    overflow: hidden;
    .pecImg{
      width: 100%;
      height: 100%;
    }
  }
  .prp_font{
    padding-top:15px;
    text-align:center;
    color:rgba(51,51,51,1);
  }
}
</style>