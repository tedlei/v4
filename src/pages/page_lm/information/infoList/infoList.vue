<template>
  <div class="il-app">
    <ul class="il_ul">
      <li class="il_li">资讯分类：</li>
      <li class="il_li il_hover_color" 
      v-for="(item,i) of list" 
      :class="i===listNum?'liColor':''" 
      @click="topSelect(i)"
      :key="i">{{item?item:'所有'}}</li>
    </ul>
    <template v-if="informationList.length>0&&seachNum===0">
      <div class="il_div1">
        <div class="il_list" v-for="(item,i) of informationList" :key="i" @click="topZx(item.id)">
          <div>{{item.schoolTopic}}</div>
          <div class="il_div_text">作者：{{item.schoolAuthor}}</div>
          <div>{{item.schoolTime.split(' ')[0]}}</div>
        </div>
      </div>
      <paging :fyData='fyData' @getys="getys"></paging>
    </template>
    <div class="cll_span" v-if="informationList.length<=0&&seachNum===0">抱歉，没有找到您想要的资讯</div>
    <div class="cll_span" v-if="seachNum===1">搜索中，请等待……</div>
  </div>
</template>

<script>
import paging from '@/pages/page_lm/public/paging'
  export default {
    components:{paging},
    data() {
      return {
        list:['','学前资讯','小学资讯','中学资讯','艺术培训','学历提升','职业培训','资格证书','其他资讯'],
        listNum:0,

        informationList:[], //资讯列表   

        setParam:{    //参数
          type:"",     //资讯分类   *
          topic:this.$route.query.search?this.$route.query.search:'',   //资讯题目
          index:"0",    // 分页   
          pageSize:"20",    //每页条数
        },

        pageNo:1,  //当前页
        size:0,   //总条数  

        seachNum:0  //获取数据过程
      }
    },
    created(){
      this.getZxData()
    },
    methods:{
      //当选择分类时
      topSelect:function(num){
        this.listNum = num;
        this.setParam.type = this.list[num];
        this.getZxData();
      },

      //获取资讯数据
      getZxData(){
        this.seachNum = 1;
        scrollTo({top: 0,behavior: "smooth"});  //滑动到网页顶部
        let url = '/schoolMessage/getMessage.do';
        let data = this.setParam;
        data.status = '1';  
        data.port = '0';
        this.fetch({url,data,method:"post"},1).then(res=>{
          this.seachNum = 0;
          this.size = res.data.size;
          this.informationList = res.data.list;
        })
      },

      //选择分页
      getys(num){
        this.pageNo = num;
        this.setParam.index = ''+(num-1);
        this.getZxData()
      },

      //点击列表
      topZx(num){
        this.push({path:'information/infoDetail',query:{id:num}})
      }
    },
    watch:{
      $route:function(path){
        this.setParam.topic = path.query.search;
        this.getZxData();
      }
    },
    computed:{
      fyData(){
        return [this.size,this.pageNo ,this.pageSize]
      }
    }
  }
</script>

<style lang="less" scoped>
.il-app{
  width: 100%;
  .il_ul{
    padding:0 20px;
    height: 40px;
    border-bottom: 1px solid rgba(230,230,230,1);
    .il_li{
      float: left;
       color:rgba(51,51,51,1);
    }
    .il_li:first-child{
      height: 39px;
      line-height: 39px;
      font-size: 14px;
      color:rgba(128,128,128,1);
    }
    .il_li+.il_li{
      height: 39px;
      line-height: 39px;
      padding:0 10px;
      font-size: 12px;
      cursor: pointer;
    }
    .il_li:nth-child(2){
      margin-left: 20px;
    }
    .liColor,.il_hover_color:hover{
      color: var(--colMain);
    }
  }
  .il_div1{
    .il_list{
      padding:0 20px;
      height: 40px;
      border-bottom: 1px solid rgba(242,242,242,1);
      font-size: 12px;
      color:#999999;
      cursor: pointer;
      div{
        float: left;
        height: 40px;
        line-height: 40px;
      }
      div:first-child{
        font-size: 14px;
        margin-right:100px;
        width: 450px;
        color:rgba(51,51,51,1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      div:last-child{
        float: right;
      }
      .il_div_text{
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .il_list:hover{
      background: #fff9f4;
      div:first-child{
        color: var(--colMain) !important;
      }
    }
  }
  .cll_span{
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 500px;
    color:rgba(153,153,153,1);
  }
}
</style>