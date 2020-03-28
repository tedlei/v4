<template>
  <div class="teacd-app">
    <detail @ControlPopup="ControlPopup" class="teacd_d1" :obj="obj"></detail>
    <target class="teacd_d2" :schoolObj="schoolObj" :teacherList="teacherList" :obj="obj"></target>
    <!-- <recommend  @getCurrListData="getCurrListData" :obj="obj" :teacherList="teacherList" :listType="'teacList'" class="teacd_d3"></recommend> -->
    <div class="popup fx" v-if="isShowPopup">
      <popup @ControlPopup="ControlPopup" :obj="obj" type="teac"></popup>
    </div>
  </div>
</template>

<script>
import detail from '@/pages/page_lm/teacherDetail/detail'
import target from '@/pages/page_lm/teacherDetail/target'
// import recommend from '@/pages/page_lm/teacherDetail/recommend'
import popup from '@/pages/page_lm/public/popup'
  export default {
    components:{detail,target,popup},
    data() {
      return {
        obj:{},
        isShowPopup:false,    //控制弹窗显示
        teacherList:[],  
        schoolObj:{},  //学校数据
      }
    },
    created(){ 
      this.getTeacherObj(this.$route.query.teacId);
    },
    methods:{
      ControlPopup:function(boo){
        this.isShowPopup=boo;
        if(!boo)this.$children[0].seachIsYy = true;
      },

      //获取教师信息
      getTeacherObj(id){
        let url = '/teacher/byid.do'
        this.fetch({url,data:{userid:id},method:'post'},1).then(res=>{
          this.obj = res.data[0];
          this.getSchoolData(this.obj.teacherSchoolId);
          this.teacherList = res.data;
        })
      },

       //获取学校信息
      getSchoolData(id){
        let url = '/schooluser/getSh.do'
        this.fetch({url,data:{userid:id},method:'post'},1).then(res=>{
          this.schoolObj = res.data
        })
      },

      //跳转
      getCurrListData(id){
        this.push({path:'/schoolDetail/currDetail',query:{currId:id,id:this.$route.query.id,num:1}})
      }
    },
    watch:{
      $route:function(path){
        this.getTeacherObj(path.query.teacId);
      }
    }
  }
</script>

<style lang="less" scoped>
.teacd-app{
  margin:auto;
  width: 1200px;
  .teacd_d1{
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(217,217,217,1);
  }
  .teacd_d2{
    margin-top: 20px;
  }
  .teacd_d3{
    margin-top: 20px;
  }
  .popup{
    position:fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.1);
    justify-content: center;
    align-items: center;
  }
}
</style>