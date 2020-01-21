<template>
  <div class="pecImg-app">
      <el-image 
      class="pecImg" 
      v-for="(obj,i) in imgList" 
      :key="i" 
      :src="obj.pic" @click="topImgtz(obj)" lazy></el-image>
  </div>
</template>

<script>
  export default {
    props:['imgList'],
    data() {
      return {
        
      }
    },
    methods:{
      topImgtz(obj){
        var tempwindow=window.open('_blank');
        tempwindow.location=obj.url;
      }
    }
  }
</script>

<style lang="less" scoped>
.pecImg-app{
  width: 100%;
  .pecImg{
    width: 100%;
    height: 150px;
    background: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  .pecImg+.pecImg{
    margin-top: 10px;
  }
}
</style>