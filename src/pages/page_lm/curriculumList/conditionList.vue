<template>
  <div class="conl-app">
    <template v-for="(item,i) of cl">
      <div class="conl_div fx" v-if="item.isShow" :key="i">
        <div class="conl_span">{{item.className}}:</div>
        <div class="conl_List">
          <template v-for="(obj,t) in item.type">
            <el-tag :class="item.selNum===t?'fontColor':''"  :key="t" :type="obj" effect="dark" @click="topTag(i,t)">
              {{obj}}
            </el-tag>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    props:['condList','listType'],
    data() {
      return {
        
      }
    },
    methods:{
      topTag:function(i,t){
        this.$emit('selectTag',i,t);
      },
    },
    computed: {
      cl:function(){
        let obj = this.condList;
        let str = this.listType;
        for(let i in obj){
          if(obj[i].classify===str){
            obj[i].isShow = true;
          }else{
            obj[i].isShow = false;
          }
        }
        return obj;
      }
    },
  }
</script>

<style lang="less" scoped>
.conl-app{
  width: 1200px;
  padding:0 20px;
  background-color: white;
  border-radius: 5px;
  .conl_div{
    width: 100%;
    min-height: 40px;
    border-bottom: 1px solid rgba(242,242,242,1);
    flex-direction: row;
    justify-content:start;
    .conl_span{
      line-height: 31px;
      font-size: 12px;
      color:rgba(128,128,128,1);
      flex-grow: 1;
    }
    .conl_List{
      width: 1100px;
    }
    .el-tag{
      border:0;
      background-color: white;
      color:rgba(102,102,102,1);
      font-size: 12px;
      cursor: pointer;
    }
    .el-tag:hover{
      color: var(--colMain);
    }
    .fontColor{
      color: var(--colMain);
    }
  }
}
</style>