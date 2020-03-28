<template>
<!-- 预约 -->
  <div class="sub-app">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="课程" name="1"></el-tab-pane>
      <el-tab-pane label="教师" name="2"></el-tab-pane>
    </el-tabs>

    <attenLiat :attentionList="attentionList" @deleteList="deleteList" :activeName="activeName" :type="2"></attenLiat>
    <p class='sub_p'>您还没有预约{{activeName==='1'?'课程':'教师'}}</p>
    <paging v-if="attentionList.length>0" :fyData="fyData" @getys="getys"></paging>
  </div>
</template>

<script>
import attenLiat from '../wdAttention/attenList'
import paging from '@/pages/page_lm/public/paging'
  export default {
    components:{attenLiat,paging},
    data() {
      return {
        activeName:'1',
        attentionList:[],   //教师、课程列表

        nowPage:1,   //当前页
        overallPages:0,   //总页数
      }
    },
    created(){
      this.getData(this.activeName);
    },
    methods:{
      getData:function(num){
        let obj = [];
        this.getys(1);
        this.getTeacherList(num*1);
        this.attentionList = obj;
      },

      //获取教师或课程列表
      getTeacherList(num){
        this.attentionList = [];
        let userInfo = this.getItem('userInfo');
        let IP = 5;
        let url = '/appointment/findAppoin.do';
        let data = {userid:userInfo.user.id,pageNum:''+this.nowPage,pageSize:'9'};
        let method = 'post';
        if(!userInfo) return;
        if(num===1){
          IP = 3;
          url = '/course/findAppOinPage.do';
          method = 'get';
          // data = {userId:userInfo.user.id,pageNum:''+this.nowPage,pageSize:'9'}
        }
        this.fetch({url,data,method},IP).then(res=>{
          console.log(res);
          this.overallPages = res.data.total;
          this.attentionList = res.data.rows;
        })
      },

      //改变分页时
      getys(num){
        this.nowPage = num;
      },

      //删除列表
      deleteList(num){
        this.attentionList.splice(num,1);
      }
    },
    computed: {
      fyData:function(){
        return [this.overallPages,this.nowPage,9];
      }
    },
    watch:{
      "activeName":function(val){
        this.getData(val);
        this.setItem('activeName',val);
      }
    }
  }
</script>

<style lang="less">
.sub-app{
  width: 100%;
  .el-tabs{
    margin:30px auto;
    width: 660px;
    height: 60px;
    .el-tabs__nav{
      width: 100%;
      height: 60px;
      .el-tabs__item{
        width: 50%;
        height: 60px; 
        line-height: 60px;
        font-size: 16px;
        text-align: center;
      }
    }
    .el-tabs__content{
      display:none;
    }
  }
  .sub_p{
    padding:70px 0 210px 0;
    text-align: center;
    font-size: 16px;
    color: #aaa;
  }
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
  border-bottom: 2px solid rgba(42,176,234,1);
}
</style>