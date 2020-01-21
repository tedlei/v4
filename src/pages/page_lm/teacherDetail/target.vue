<template>
  <div class="teacget-app fx">
    <div class="teacget_left">
      <div class="teacget_grow">
        <div>教学经历</div>
        <p class="teacget_p" v-html="obj.teacherMessage"></p>
      </div>
      <recommend :teacherList="teacherList" :obj="obj" listType="teacher"></recommend>
    </div>
    <div class="teacget_right">
      <intro class="teac_zj" :obj="schoolObj"></intro>
      <schColList class="teac_zj" @getCurrListData="getCurrListData" title="推荐课程" :list="list"></schColList>
    </div>
  </div>
</template>

<script>
import intro from '../public/intro'
import schColList from '../public/schColList'
import recommend from './recommend'
  export default {
    components:{intro,schColList,recommend},
    props:['obj',"schoolObj","teacherList"],
    data() {
      return {
        list:[]
        
      }
    },
    methods:{
      getCurrList(id){
        this.list = [];
        let url="curri/searchname.do"
        let data = {schoolId:id,name:'',address:''}
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

      //跳转课程
      getCurrListData(id){
        this.push({path:'/index/curriculum/curriculumDetail',query:{id}});
      }
    },
    watch:{
      "obj":function(val){
        this.getCurrList(val.teacherSchoolId);
      }
    }
  }
</script>

<style lang="less">
.teacget-app{
  width: 100%;
  flex-direction: row;
  .teacget_left{
    width: 866px;
    .teacget_grow{
      width: 100%;
      div{
        width:120px;
        height:40px;
        background:rgba(255,232,210,1);
        border-radius:3px;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        color:rgba(51,51,51,1);
      }
      .teacget_p{
        padding-top: 10px;
        width: 100%;
        img{
          display: block;
          margin: auto;
        }
      }
    }
  }
  .teacget_right{
    width:293px;
    .teac_zj{
      margin-left: 40px;
      padding:20px 20px;
      width: 100%;
      height:354px;
      background:rgba(242,242,242,1);
      border:1px solid rgba(217,217,217,1);
      border-radius:5px;
    }
    .teac_zj+.teac_zj{
      margin-top: 30px;
    }
  }
  
}
</style>