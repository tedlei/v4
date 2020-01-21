<template>
  <div class="reco-app">
    <div class="reco_tab">相似教师推荐</div>
    <div class="reco_div fx">
      <div class="reco_left">
        <coList :curriculumList="curriculumList" :listType="listType"></coList>
      </div>
    </div>
  </div>
</template>

<script>
import coList from '../public/coList'
import schColList from '../public/schColList'
  export default {
    components:{coList,schColList},
    props:['teacherList','listType'],
    data() {
      return {
        list:[]
      }
    },
    computed:{
      curriculumList:function(){
        let teacherList = this.teacherList
        return teacherList?teacherList.splice(1,4):[];
      }
    }
  }
</script>

<style lang="less">
.reco-app{
  width: 100%;
  .reco_tab{
    width:120px;
    height:40px;
    background:rgba(200,238,255,1);
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
      .coLits-app{
        padding:0;
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