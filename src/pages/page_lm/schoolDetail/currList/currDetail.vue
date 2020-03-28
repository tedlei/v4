<template>
  <div class="currD-app">
    <detail @ControlPopup="ControlPopup" :schoolUserId='teacObj.userId' class="currd_d1" :obj="obj"></detail>
    <target class="currd_d2" :obj="obj" :schoolObj="teacObj"></target>
    <!-- <recommend listType="currList" :obj="obj" class="currd_d2"></recommend> -->
    <div class="popup fx" v-if="isShowPopup">
      <popup :obj="obj" @ControlPopup="ControlPopup" type="curr"></popup>
    </div>
  </div>
</template>

<script>
import detail from '@/pages/page_lm/curriculumDetail/detail'
import target from '@/pages/page_lm/curriculumDetail/target'
// import recommend from '@/pages/page_lm/curriculumDetail/recommend'
import popup from '@/pages/page_lm/public/popup'
  export default {
    components:{detail,target,popup},
    props:['teacObj'],
    data() {
      return {
        obj:{},
        isShowPopup:false,    //控制弹窗显示
      }
    },
    created(){
      this.getData(this.$route.query.currId);
    },
    methods:{
      //点击X关闭弹窗
      ControlPopup:function(boo){
        this.isShowPopup=boo;
        let id = this.obj.id;
        let childPage = this.$children[0];
        childPage.setchGz(id)
        childPage.setchYy(id)
      },
      //获取课程详情数据
      getData:function(id){
        let url='/curri/findById.do?id='+id+"&sourceType=1";
        this.fetch({url,method:'get'},1).then(res=>{
          this.obj = res.data[0]
        })
      }
    },
    watch:{
      $route(path){
        this.getData(path.query.currId)
      }
    },
  }
</script>

<style lang="less" scoped>
.currD-app{
  margin: auto;
  width: 1200px;
  .currd_d1{
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(217,217,217,1);
  }
  .currd_d2{
    margin-top:20px; 
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