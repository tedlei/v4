<template>
  <el-carousel :interval="5000" arrow="always" height="464px">
    <el-carousel-item v-for="(item,i) in imgList" :key="i">
      <img style="widht:100%;height:100%;" :src="item" alt="正在加载……">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    props:["teacObj"],
    data() {
      return {
        imgList:[]
      }
    },
    mounted(){
      this.getImgList(this.teacObj)
    },
    methods:{
      getImgList(val){
        if(val.schoolAdvertOne)this.imgList.push(val.schoolAdvertOne)
        if(val.schoolAdvertTwo)this.imgList.push(val.schoolAdvertTwo)
        if(val.schoolAdvertThree)this.imgList.push(val.schoolAdvertThree)
      }
    },
    watch:{
      "teacObj":function(val){
        this.getImgList(val)
      }
    }
  }
</script>

<style lang="less">
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
// .el-carousel__indicator--horizontal{
//   padding:0;
//   width:10px;
//   height:10px;
//   background:rgba(102,102,102,1);
//   border-radius:50%;
//   button{
//     display: none;
//   }
// }
</style>