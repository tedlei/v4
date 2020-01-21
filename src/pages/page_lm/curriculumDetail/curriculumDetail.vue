<template>
  <div class="curd-app fx">
    <div class="curd_w">
      <breadcrumb></breadcrumb>
    </div>
    <div class="curd_detail">
      <detail @ControlPopup="ControlPopup" :schoolUserId="schoolObj.userId" :obj="obj"></detail>
    </div>
    <div class="curd_detail bor0 padding_b">
      <target :obj="obj" :schoolObj="schoolObj"></target>
    </div>
    <div class="popup fx" v-if="isShowPopup" @click="topClose">
      <popup :obj="obj" @ControlPopup="ControlPopup" type="curr"></popup>
    </div>
  </div>
</template>

<script>
import breadcrumb from '@/components/component_lm/breadcrumb'
import popup from '@/pages/page_lm/public/popup'
import detail from './detail'
import target from './target'
// import recommend from './recommend'
  export default {
    components:{breadcrumb,popup,detail,target},
    data() {
      return {
        obj:{},  //课程详情
        schoolObj:{},   //学校详情
        isShowPopup:false,    //控制弹窗显示
      }
    },
    mounted(){
      this.getData(this.$route.query.id);
    },
    methods:{
      //点击X关闭弹窗
      ControlPopup:function(boo){
        this.isShowPopup=boo;
        let id = this.obj.id;
        let childPage = this.$children[1];
        childPage.setchGz(id)
        childPage.setchYy(id)
      },

      //点击灰色区域时
      topClose(event){
        if(event.currentTarget===event.target) this.isShowPopup=false;
      },
      
      //获取课程详情数据
      getData:function(id){
        let url='curri/findById.do?id='+id+"&sourceType=1";
        this.fetch({url,method:'get'},1).then(res=>{
          this.obj = res.data[0]
          this.getSchoolData(res.data[0].schoolId);
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
      $route(path){
        this.getData(path.query.id)
      }
    },
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
  .padding_b{
    padding-bottom: 0;
  }
  .popup{
    position:fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    background-color: rgba(0,0,0,0.1);
    justify-content: center;
    align-items: center;
  }
}
</style>