<template>
  <div class="paging-app fx">
    <el-pagination 
      :page-size="fyData[2]*1"
      background
      layout="prev, pager, next"
      prev-text="上一页"
      next-text="下一页"
      :total="fyData[0]"
      :current-page="fyData[1]*1"
      @current-change="getys"
      >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props:["fyData"],
    data() {
      return {
        
      }
    },
    methods:{
      getys:function(num){
        this.$emit('getys',num);
      }
    }
  }
</script>

<style lang="less">
.paging-app{
  width: 100%;
  padding-top:60px;
  padding-bottom: 30px;
  justify-content: center;
  .el-pagination.is-background .btn-prev{
    padding:0 5px;
    background: none;
  }
  .el-pagination.is-background .btn-next{
    padding:0 5px;
    background: none;
  }
  .el-pagination.is-background .el-pager li:not(.disabled){
    background: none;
    font-size: 14px;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: var(--colMain);
    color: #FFF;
  }
}
</style>