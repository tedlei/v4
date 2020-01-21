<template>
  <div class="reco-app">
    <div class="reco_tab">相似课程推荐</div>
    <div class="reco_div fx">
      <div class="reco_left">
        <coList :curriculumList="curriculumList" :currId = obj.id :listType="listType"></coList>
      </div>
    </div>
  </div>
</template>

<script>
import coList from '../public/coList'
  export default {
    components:{coList},
    props:["obj","schoolTj","listType"],
    data() {
      return {
        curriculumList:[],
        
      }
    },
    methods:{
      //获取课程详情'相似课程推荐'和'学校其他课程'的数据
      getData(){
        this.curriculumList = [];
        this.list = [];
        let position = this.getItem("position")
        let provincialLevel = position.provincialLevel//.replace(/市|省/g, '')
        let cityLevel = position.cityLevel////.replace(/市|区/g, '')
        let url="curri/searchname.do";
        let data = {name:this.obj.courseName,address:provincialLevel,courseThreeAddress:cityLevel,schoolId:''}
        this.fetch({url,data,method:'post'},1).then(res=>{
          for (let index = 0; index < 3; index++) {
            this.curriculumList.push(res.data[parseInt(Math.random()*res.data.length)])
          }
        })
      },
    },
    watch:{
      "obj":function(){
        this.getData();
      }
    }
  }
</script>

<style lang="less">
.reco-app{
  margin-top: 30px;
  width: 100%;
  .reco_tab{
    width:120px;
    height:40px;
    background:rgba(255,232,210,1);
    border-radius:3px;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    color:rgba(51,51,51,1);
  }
  .reco_div{
    width: 100%;
    padding-top:10px;
    flex-direction: row;
    .reco_left{
      width:866px;
      border-top:1px solid rgba(217,217,217,1);
      padding:14px 20px;
      padding-bottom: 0;
      padding-right: 0;
      .coLits-app{
        // padding:0;
        .col_li:last-child{
          border:0;
        }
      }
    }
    .reco_right{
      margin-top:20px;
      margin-left: 40px;
      padding:20px 20px;
      width:293px;
      height:354px;
      background:rgba(242,242,242,1);
      border:1px solid rgba(217,217,217,1);
      border-radius:5px;
    }
  }
}
</style>