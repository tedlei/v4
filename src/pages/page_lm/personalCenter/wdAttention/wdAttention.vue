<template>
  <!-- 关注 -->
  <div class="wdAtt-app">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane 
      v-for="(item,i) of xzList" 
      :label="item" 
      :name="''+(i+1)" 
      :key="i">{{item}}</el-tab-pane>
    </el-tabs>
    <attenLiat 
      @searchKc="searchKc"
      @searchXX="searchXX"
      :activeName="activeName" 
      :attentionList="attentionList" 
      v-if="attentionList.length>0" 
      :type="1"></attenLiat>
    <div v-else class="wdAtt_d2">
      <span>您还没有关注{{activeName==='1'?'课程':activeName==='2'?'学校':'教师'}}</span>
    </div>
    <paging v-if="attentionList.length>0" :fyData="fyData" @getys="getys"></paging>
  </div>
</template>

<script>
import attenLiat from './attenList'
import paging from '@/pages/page_lm/public/paging'
  export default {
    components:{attenLiat,paging},
    data() {
      return {
        xzList:["课程","学校","教师"],
        activeName: '1',    //点击时切换
        attentionList:[],           //关注列表

        pageNum:1,    //当前页
        pageSize:9,   //每页多少条
        overall:0
      };
    },
    created(){
      let activeName = this.getItem('activeName');
      if(activeName) this.activeName = activeName;
      else this.activeName = '1';
      this.getData(this.activeName);
    },
    methods: {
      getData:function(num){
        this.attentionList = [];
        if(num*1===1){
          this.searchKc();
        }else if(num*1===2){
          this.searchXX(1);
        }else if(num*1===3){
          this.searchXX(2);
        }
      },

      //获取关注的课程
      searchKc(){
        let userInfo = this.getItem('userInfo')
        let pageNum = this.pageNum;
        let pageSize = this.pageSize;
        let data = {userid:userInfo.user.id,pageNum:pageNum,pageSize:pageSize}
        let url = '/course/findCourse.do';
        this.fetch({url,data,method:'get'},3).then(res=>{
          this.overall = res.data.total;
          this.attentionList = res.data.rows;
        })
      },

      //获取学校关注列表
      searchXX(num){
        let userInfo = this.getItem('userInfo')
        let pageNum = ''+this.pageNum;
        let pageSize = ''+this.pageSize;
        let url = '';
        let data = {userid:userInfo.user.id,pageNum,pageSize} 
        let IP = 1
        if(num===1){
          url += '/attention/getListS.do';
          IP = 4;
        }
        if(num===2){
          url += '/addTeacher/getList.do'
          IP = 5;
        }
        this.fetch({url,data,method:'post'},IP).then(res=>{
          this.overall = res.data.total;
          this.attentionList = res.data.rows;
        })
      },

      //点击分页时
      getys(num){
        this.pageNum = num;
        this.searchKc()
      },
    },
    watch:{
      'activeName':function(val){
        this.getData(val);
        this.setItem('activeName',val);
      },
    },
    computed: {
      fyData(){
        return [this.overall,this.pageNum,this.pageSize]
      },
    },
  }
</script>

<style lang="less">
.wdAtt-app{
  width: 100%;
  .el-tabs{
    margin:30px auto;
    width: 660px;
    height: 60px;
    .el-tabs__nav{
      width: 100%;
      height: 60px;
      .el-tabs__item{
        width: 33.333%;
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
  .wdAtt_d2{
    padding:0 30px;
    height: 300px;
    text-align: center;
    line-height: 150px;
    color:#bbb;
  }
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
  border-bottom: 2px solid rgba(42,176,234,1);
}
</style>