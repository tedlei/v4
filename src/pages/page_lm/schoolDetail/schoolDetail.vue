<template>
  <div class="schDet-app fx">
    <schoolHeader @topHea='topHea' @attention="attention" :num="num" :teacObj="teacObj"></schoolHeader>
    <router-view :teacObj="teacObj" :isGz='isGz' @topHea='topHea'></router-view>
    <footAdvertising></footAdvertising>
    <indexFooter></indexFooter>
  </div>
</template>

<script>
import schoolHeader from './schoolHeader'

import footAdvertising from '@/pages/index/footAdvertising'
import { isNull } from 'util'
  export default {
    components:{schoolHeader,footAdvertising},
    data() {
      return {
        num:0,   
        teacObj:{},
        isGz:false,   //是否关注
      }
    },
    watch:{
      $route:function(path){
        this.num = path.query.num;
      }
    },
    created(){
      let obj = this.$route.query;
      
      // this.verifySign(obj.id);

      let num = obj.num;
      if(num)this.num = num*1;
      else this.num = 0;
      this.getSchoolDetail(obj.id)
    },
    methods:{
      /**
       * 检测当从后台跳转来时是否与当前账号一致  不一致则退出
       */
      verifySign(schoolId){
        let userInfo = this.getItem('userInfo');
        
        // 不存在或为非学校用户或学校id不同
        if (!isNull(userInfo) && !(userInfo && userInfo.schoolUser && userInfo.schoolUser.id === schoolId)) {
          // 退出并清除用户数据
          this.$message({
            message: "与当前账号不一致，已退出",
            type: "warning"
          })
          this.removeItemUserInfo();
        }
      },

      //header控制
      topHea:function(num,src){
        if(num===4){
          let ui=this.getItem('userInfo');
          if(!ui){
          this.$message({message:'请登录后在操作！',type:'warning'});
          return
          }
          if(ui.schoolUser.id===this.teacObj.id){
          this.$message({message:'请不要和自己聊天！',type:'warning'});
          return
          }
        }

        if(num===5){
          // alert('点击此处跳转学校官网');
          window.open("http://"+src);
          return;
        }
        this.$router.push({path:src,query:{num,id:this.$route.query.id}});
      },

      //获取学校数据
      getSchoolDetail(num){
        let url = "/schooluser/getSh.do";
        this.fetch({url,data:{userid:num},method:'post'},1).then((res)=>{
          this.teacObj = res.data;
        })
      },

      //关注
      attention(boo){
        this.isGz = boo;
      }
    },
  }
</script>

<style lang="less" scoped>
.schDet-app{
  width: 100%;
  min-width: 1200px;
  background:rgba(245,245,245,1);
  flex-direction: column;
  align-items: center;
  .sch_div1{
    width: 1200px;
    margin:20px auto;
    .bor_bot{
      padding-bottom: 30px;
      border-bottom: 1px solid rgba(217,217,217,1);
    }
  }
  // .popup{
  //   position:fixed;
  //   width: 100%;
  //   height: 100%;
  //   background-color: rgba(0,0,0,0.1);
  //   justify-content: center;
  //   align-items: center;
  // }
}
</style>