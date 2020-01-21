<template>
  <div class="selc-app fx">
    <div class="selc_nav">
      <breadcrumb></breadcrumb>
    </div>
    <div class="cond_list fx">
      <el-tag 
      v-for="(tag,i) in tags" 
      :key="tag.name" 
      closable 
      :disable-transitions="true"
      @close="topTag(i,tag.type)">{{tag.name}}</el-tag>
      <div class="cond_icon fx" @click="topTag('all')" v-if="tags.length>0">
        <i class="el-icon-delete"></i> 清空筛选
      </div>
    </div>

  </div>
</template>

<script>
import breadcrumb from '@/components/component_lm/breadcrumb'
  export default {
    components:{breadcrumb},
    props:['tags'],
    data() {
      return {
         
      }
    },
    methods:{
      topTag:function(num,type){
        this.$emit('deleteTag',num,type);
      }
    }
  }
</script>

<style lang="less">
.selc-app{
  width: 100%;
  height: 40px;
  flex-direction: row;
  align-items: center;
  .selc_nav{
    min-width:200px;
    line-height: 40px;
    height: 100%;
  }
  .cond_list{
    flex-grow: 1;
    margin-left: 30px;
    flex-direction: row;
    align-items: center;
    .el-tag+.el-tag{
      margin-left: 20px;
    }
    .el-tag{
      height:20px;
      line-height: 20px;
      background-color:rgba(255,255,255,1);
      color:rgba(102,102,102,1);
      border:1px solid rgba(217,217,217,1);
      i{
        color: var(--colMain);
      }
    }
    .cond_icon{
      margin-left: 30px;
      font-size: 12px;
      color:rgba(102,102,102,1);
      cursor: pointer;
      align-items: center;
      i{
        font-size: 18px;
        margin-right: 5px;
      }
    }
  }
}
</style>