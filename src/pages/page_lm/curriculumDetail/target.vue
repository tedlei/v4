<template>
  <div class="target-app fx">
    <div class="tar_left">
      <div class="tar_grow">
        <div class="tar_div">教学目标</div>
        <p class="tar_p">{{obj.courseTarget}}</p>
      </div>
      <div class="tar_grow">
        <div class="tar_div">课程介绍</div>
        <div class="tar_html" v-html="obj.courseContent"></div>
      </div>
      <recommend  listType="curriculum" :obj='obj' :schoolTj="obj.schoolName"></recommend>
    </div>
    <div class="tar_right">
      <div class="tar_top">
        <intro :obj="schoolObj"></intro>
      </div>
      <div class="reco_bottom">
          <schColList @getCurrListData="getCurrListData" :title="'推荐课程'" :list="list"></schColList>
      </div>
    </div>
  </div>
</template>

<script>
import intro from '../public/intro'
import schColList from '../public/schColList'
import recommend from './recommend'
  export default {
    props:["obj",'schoolObj'],
    components:{intro,schColList,recommend},
    data() {
      return {
        list:[]
      }
    },
    methods:{
      //获取课程详情'相似课程推荐'和'学校其他课程'的数据
      getData(){
        this.curriculumList = [];
        this.list = [];
        let position = this.getItem("position")
        let provincialLevel = position.provincialLevel//.replace(/市|省/g, '')
        let cityLevel = position.cityLevel//.replace(/市|区/g, '')
        let url="curri/searchname.do";
        let data = {name:this.obj.courseName,address:provincialLevel,courseThreeAddress:cityLevel,schoolId:''}
        this.fetch({url,data,method:'post'},1).then(res=>{
          for (let index = 0; index < 3; index++) {
            this.curriculumList.push(res.data[parseInt(Math.random()*res.data.length)])
          }
        })
        data = {schoolId:this.obj.schoolId,name:'',address:''}
        this.fetch({url,data,method:'post'},1).then(res=>{
          this.addValue(res.data);
        })
      },

      //随机课程
      addValue(obj){
        for (let index = 0; index < 10; index++) {
          let num = parseInt(Math.random()*obj.length);
          this.list.push(obj[num]);
        }
      },

      //跳转
      getCurrListData(id){
        let {path,query} = this.$route;
        let q = this.parse(query);
        if(query.currId){
          q.currId = id;
        }else{
          q.id = id;
        }
        if (this.stringify(query) === this.stringify(q)) return;
        this.push({path,query: q})
      }
    },
    watch:{
      "obj":function(){
        this.getData();
      }
    }
  }
</script>

<style lang="less">
.target-app{
  width: 100%;
  flex-direction: row;
  .tar_left{
    width: 866px;
    .tar_grow{
      width: 100%;
      .tar_div{
        width:120px;
        height:40px;
        background:rgba(255,232,210,1);
        border-radius:3px;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        color:rgba(51,51,51,1);
      }
      .tar_p{
        width: 100%;
        margin-top: 20px;
        text-indent:2em;
        font-size: 16px;
        line-height: 24px;
        color:#333;
        word-wrap:break-word;
        word-break:break-all;
      }
      .tar_html{
        margin-top: 10px;
        width: 100%;
        height: auto;
        background-color:transparent;
        text-align: left;
        overflow: hidden;
        p{
          margin: 0;
          img{
            display:block;
            margin: auto;
          }
        }
      }
    }
    .tar_grow+.tar_grow{
      margin-top: 20px;
    }
  }
  .tar_right{
    margin-left: 40px;
    width:293px;
    height:700px;
    .tar_top{
      padding:20px 20px;
      width:293px;
      height:354px;
      background:rgba(242,242,242,1);
      border:1px solid rgba(217,217,217,1);
      border-radius:5px;
    }
    .reco_bottom{
      margin-top:20px;
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