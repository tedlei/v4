<template>
  <div class="cll-app">
    <ul class="cll_height">
      <li class="cll_li" :class="popular==='1'?'fontColor':''" @click="topRm('1')">综合</li>
      <li class="cll_li" :class="popular==='2'?'fontColor':''" @click="topRm('2')">热门</li>
      <li class="cll_li fx" @click="topRm('3')" v-if='listType==="curriculum"'>
        <span :class="popular!=='1'&&popular!=='2'?'fontColor':''">价格</span>
        <div class="fx cll_div">
          <i class="el-icon-arrow-up" :class="rank==='ASC'?'fontColor':''"></i>
          <i class="el-icon-arrow-down" :class="rank==='DESC'?'fontColor':''"></i>
        </div>
      </li>
    </ul>
    <div class="cll_he">
      <coList :curriculumList="curriculumList" :listType="listType" v-if="curriculumList.length>0&&seachNum===0"></coList>
      <div class="cll_span" v-if="curriculumList.length<=0&&seachNum===0">
        抱歉，没有找到您想要的{{listType==='curriculum'?'课程':listType==='school'?'学校':'教师'}}
      </div>
      <div class="cll_span" v-if="seachNum===1">
        搜索中，请等待……
      </div>
      <paging :fyData="fyData" @getys="getys" v-if="curriculumList.length>0"></paging>
    </div>
  </div>
</template>

<script>
  import coList from '../../public/coList'
  import paging from '@/pages/page_lm/public/paging'
  export default {
    components:{coList,paging},
    props:["curriculumList","listType","total",'fyData','popular','seachNum'],
    data() {
      return {
        priceSort:false,  
        rank:''
      }
    },
    methods:{
      getys(num){
        this.$emit('getys',num);
      },
      topRm(str){
        if(str==='3'){
          this.rank = this.rank===''?'ASC':this.rank==='ASC'?'DESC':'ASC';
          this.$emit('topRm','',true);
          this.$emit('topSort',this.rank);
        }else{
          this.rank = '';
          this.$emit('topSort','',true);
          this.$emit('topRm',str);
        }
      },
    }
  }
</script>

<style lang="less" scoped>
.cll-app{
  width: 100%;
  .cll_height{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid rgba(230,230,230,1);
    .cll_li{
      float: left;
      padding-left: 30px;
      padding-right: 30px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      color:rgba(51,51,51,1);
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      .cll_div{
        margin-left: 5px;
        flex-direction: column;
        font-size: 12px;
        i{
          line-height: 0.7;
        }
        .fontColor{
          color: var(--colMain);
        }
      }
      .fontColor{
        color: var(--colMain);
      }
    }
    .fontColor,.cll_li:hover{
      color: var(--colMain);
    }
  }
  .cll_he{
    min-height: 500px;
    .cll_span{
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 500px;
      color:rgba(153,153,153,1);
    }
  }
}
</style>