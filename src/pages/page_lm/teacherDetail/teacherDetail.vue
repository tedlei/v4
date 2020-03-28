<template> 
  <div class="curd-app fx">
    <div class="curd_w">
      <breadcrumb></breadcrumb>
    </div>
    <div class="curd_detail">
      <detail @ControlPopup="ControlPopup" :obj="obj"></detail>
    </div>
    <div class="curd_detail bor0">
      <target :schoolObj="schoolObj" :teacherList="teacherList" :obj="obj"></target>
    </div>
    <div class="popup fx" v-if="isShowPopup" @click="topgb">
      <popup @ControlPopup="ControlPopup" :obj='obj' type='teac'></popup>
    </div>
  </div>
</template>

<script>
import breadcrumb from '@/components/component_lm/breadcrumb'
import popup from '@/pages/page_lm/public/popup'
import detail from './detail'
import target from './target'
  export default {
    components:{breadcrumb,popup,detail,target},
    data() {
      return {
        obj:{},
        isShowPopup:false,    //控制弹窗显示
        teacherList:[],  
        schoolObj:{},  //学校数据
      }
    },
    mounted(){
      this.getTeacherObj(this.$route.query.id);
    },
    methods:{
      
      topgb(event){
        if(event.currentTarget == event.target){
          this.isShowPopup=false;
        }
      },

      //点击X关闭弹窗
      ControlPopup:function(boo){
        this.isShowPopup=boo;
        console.log(1111111);
        
        if(!boo)this.$children[1].seachIsYy = true;
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
      }
    },
    watch:{
      $route:function(path){
        this.getTeacherObj(path.query.id);
      }
    }
  }
</script>

<style lang="less" scoped>
.curd-app{
  width: 100%;
  min-width: 1200px;
  flex-direction:column;
  align-items: center;
  .cul_titleNav{
    width: 1200px;
  }
  .curd_w{
    margin: auto;
    padding-top:20px;
    width: 1200px;
  }
  .curd_detail{
    margin: auto;
    padding:28px 0;
    width: 1200px;
    border-bottom:1px solid rgba(217,217,217,1);
  }
  .bor0{
    border:0;
  }
  .padd{
    padding:0;
  }
  .popup{
    position:fixed;
    z-index: 1000;
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