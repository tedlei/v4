<template>
  <div class="upd-app">
    <div class="upd_text">密码修改</div>

    <ul class="upd_ul">
      <li class="ul_left">旧密码</li>
      <li class="ul_center">
        <el-input v-model="formerPwd" type="password" placeholder="请输入旧密码" :class="fpVerify?'borderColor':''"></el-input>
      </li>
      <li class="ul_icon">
        <i v-if="fpIcon" :class="fpVerify?'el-icon-circle-close red':'el-icon-circle-check green'"></i>
      </li>
      <li class="ul_right">
        <div v-if="fpVerify" class="ped_li_text" :class="fpVerify?'red':''">密码格式不正确</div>
      </li>
    </ul>

    <ul class="upd_ul">
      <li class="ul_left">新密码</li>
      <li class="ul_center">
        <el-input v-model="newPwd" type="password" placeholder="请输入新密码" :class="npVerify?'borderColor':''"></el-input>
      </li>
      <li class="ul_icon">
        <i v-if="npIcon" :class="npVerify?'el-icon-circle-close red':'el-icon-circle-check green'"></i>
      </li>
      <li class="ul_right">
        <div v-if="npVerify" class="ped_li_text" :class="npVerify?'red':''">密码格式不正确</div>
      </li>
    </ul>

    <ul class="upd_ul">
      <li class="ul_left">确认密码</li>
      <li class="ul_center">
        <el-input v-model="affirmPwd" type="password" placeholder="确认密码" :class="afpVerify?'borderColor':''"></el-input>
      </li>
      <li class="ul_icon">
        <i v-if="apIcon" :class="afpVerify?'el-icon-circle-close red':'el-icon-circle-check green'"></i>
      </li>
      <li class="ul_right">
        <div v-if="afpVerify" class="ped_li_text" :class="afpVerify?'red':''">新密码与确认密码不一致</div>
      </li>
    </ul>
    <el-button type="primary" @click="topUpdate" :class="isBtnDisabled?'':'btnColor'" :disabled="isBtnDisabled">确认</el-button>
  </div>
</template>

<script>
import infoVerify from '@/common/infoVerify.js'
  export default {
    data() {
      return {
        formerPwd:"",   //旧密码
        newPwd:'',    //新密码
        affirmPwd:'',    //确认密码

        //Icon
        fpIcon:false,
        npIcon:false,
        apIcon:false,

        fpVerify:false,   //旧密码验证
        npVerify:false,   //新密码验证
        isBtnDisabled:true,    //是否禁用确认按钮   

        userInfo:{},    //
      }
    },
    created(){
      this.userInfo = this.getItem('userInfo');
    },
    methods:{
      pop:function(message,type){
        if(!type) type="warning";
        this.$message({message,type});
      },
      isDis(){
        let formerPwd = this.formerPwd.length;
        let newPwd = this.newPwd.length;
        let affirmPwd = this.affirmPwd.length;
        let fpVerify = this.fpVerify
        let npVerify = this.npVerify
        let afpVerify = this.afpVerify
        if(formerPwd>=6&&newPwd>=6&&affirmPwd>=6&&!fpVerify&&!npVerify&&!afpVerify) this.isBtnDisabled = false;
        else this.isBtnDisabled = true;
      },

      //修改密码
      topUpdate:function(){
        let usedpassword = this.formerPwd;
        let password = this.newPwd;
        let url = '/user/updatePassword.do'
        let data = {usedpassword:usedpassword,password:password,phone:this.userInfo.user.phone}
        this.fetch({url,data,method:'get'},2).then(res=>{
          if(res.data.success){
            this.pop(res.data.message,'success');
            let sett = setTimeout(() => {
              this.updateLogout();
              window.localStorage.clear();
              this.$router.push('/loginAndRegister')
              clearTimeout(sett);
            }, 1000);
          }else this.pop(res.data.message);
        }).catch(err=>{
          this.pop(err.data.message);
        })
      },

      //修改后退出
      updateLogout(){
        this.fetch({url:'/logout.do',method:'get'},2)
      },

    },
    watch:{
      "formerPwd":function(val){
        this.fpIcon = true; 
        if(infoVerify.removeBlank(val).length<6) this.fpVerify = true;
        else this.fpVerify = false;
        this.isDis()
      },
      "newPwd":function(val){
        this.npIcon = true; 
        if(infoVerify.removeBlank(val).length<6) this.npVerify = true;
        else this.npVerify = false;
        this.isDis()
      },
      "affirmPwd":function(){
        this.apIcon = true; 
        this.isDis()
      }
    },
    computed:{
      afpVerify:function(){
        let newPwd = this.newPwd;
        let affirmPwd = this.affirmPwd;
        let boo = false;
        if(this.npVerify) return boo;
        if(!affirmPwd) return boo;
        if(affirmPwd!==newPwd)boo = true;
        return boo
      }
    }
  }
</script>

<style lang="less">
.upd-app{
  width: 100%;
  padding-bottom: 140px;
  .upd_text{
    margin-top: 30px;
    text-align: center;
    font-size: 18px;
    color:rgba(51,51,51,1);
  }
  .upd_ul{
    margin-top:16px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    li+li{
      margin-left: 25px;
    }
    .ul_left{
      width: 80px;
      text-align: right;
      color:rgba(102,102,102,1);
    }
    .ul_center{
      width: 375px;
      .el-input{
        height: 50px;
        border:1px solid rgba(230,230,230,1);
        border-radius:5px;
        .el-input__inner{
          border: 0;
          height: 100%;
          font-size: 16px;
        }
      }
      .borderColor{
        border-color: red;
      }
      .el-select{
        width: 100px;
      }
      .el_select_width{
        width: 118px;
        .el-input>.el-input__inner{
          padding-right:20px;
          padding-left: 5px;
        }
        .el-input>.el-input__suffix {
          right: -2px;
        }
      }
    }
    .ul_icon{
      width: 20px;
      font-size: 20px;
      .red{
        color:red;
      }
      .green{
        color:green;
      }
    }
    .ul_right{
      margin:5px;
      width: 220px;
      .ped_li_text{
        font-size: 14px;
        color:rgba(153,153,153,1);
      }
      .red{
        color:red;
      }
    }
  }
  .el-button{
    margin-top:20px;
    margin-left:385px;
    width:150px;
    height:40px;
    border: 0;
    background:rgba(230,230,230,1);
  }
  .btnColor{
    background:rgba(42,176,234,1);
  }
}
</style>