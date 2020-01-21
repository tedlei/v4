<template>
  <div class="currList-app">
    <ul class="curr_ul boxSing">
      <li class="curr_li" 
      :class="i===num?'liColor':''" 
      v-for="(item,i) of list" 
      @click="topqhNum(i)"
      :key="i">{{item.categoryName}}</li>
    </ul>
    <div class="curr_div">
      <coList @currObj="currObj" :curriculumList="currList" :boole="true" :listType="'currList'" v-if="currList.length>0"></coList>
      <div class="curr_div_text" v-else>暂无数据</div>
      <paging v-if="total*1>10" :fyData="fyData" @getys="getys"></paging>
    </div>
  </div>
</template>

<script>
import coList from '@/pages/page_lm/public/coList'
import paging from '@/pages/page_lm/public/paging'
  export default {
    components:{coList,paging},
    data() {
      return {
        list:[],
        num:0,
        total:0,   //总条数
        pageSize:10,  //也条数
        pageNo:1,  //当前页
        currList:[]
      }
    },

    created(){
      this.getCurrClassify();
    },
    methods:{
      //点击列表时跳转
      currObj:function(id){
        this.$router.push({path:'/schoolDetail/currDetail',query:{id:this.$route.query.id,num:1,currId:id}});
      },

      //分页
      getys(num){
        this.pageNo = num;
        this.getCurrList();
      },

      //获取自定义课程分类
      getCurrClassify(){
        let id = this.$route.query.id;
        let list = this.list;
        list.push({categoryName:'全部课程'});
        let url = '/cate/userCate.do';
        this.fetch({url,data:{schoolId:id},method:'get'},4).then(res=>{
          if(res.data.length>0){
            this.list = list.concat(res.data);
          }
          this.getCurrList();
        })
      },

      //获取课程数据
      getCurrList(){
        scrollTo({top: 0,behavior: "smooth"});  //滑动到网页顶部
        let num = this.num;
        let id = this.$route.query.id;
        let url = '/curri/schoolCourse.do';
        let data = {schoolId:id,pageNo:''+this.pageNo,pageSize:''+this.pageSize}
        if(num!==0) data.category = this.list[num].categoryName
        this.fetch({url,data,method:'post'},1).then(res=>{
          this.currList = res.data.rows
          this.total = res.data.total;
        })
      },

      //切换自定义分类时
      topqhNum(i){
        this.num = i;
        this.getCurrList();
      }
    },
    computed: {
      fyData:function(){
        return [this.total,this.pageNo,this.pageSize]
      }
    },
  }
</script>

<style lang="less" scoped>
.currList-app{
  width: 1200px;
  margin:20px auto;
  margin-bottom: 0;
  .curr_ul{
    float: left;
    width: 160px;
    height: auto;
    padding:20px 20px;
    padding-right: 0;
    background: white;
    .curr_li{
      font-size: 18px;
      color:rgba(51,51,51,1);
      cursor: pointer;
    }
    li+li{
      margin-top:20px; 
    }
    .liColor,.curr_li:hover{
      color:#FF7225;
    }
  }
  .curr_div_text{
    min-height: 300px;
    text-align: center;
    line-height: 300px;
    color:#666;
  }
  .curr_div{
    float: right;
    padding-bottom: 20px;
    width:1011px;
    min-height: 100px;
    background:rgba(255,255,255,1);
    border-radius:5px;
  }
}
</style>