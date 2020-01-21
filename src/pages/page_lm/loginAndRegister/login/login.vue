<template>
  <div class="login-app">
    <ul class="login_header">
      <li class="login_li" @click="topSelClass(true)">
        <div class="login_li_div " :class="loginClass?'selStyle':''">账号密码登录</div>
      </li>
      <li class="login_li" @click="topSelClass(false)">
        <div class="login_li_div " :class="loginClass?'':'selStyle'">手机动态登录</div>
      </li>
    </ul>
    <accPwdLog v-show="loginClass" @keyEvent="keyEvent" @goToReg='goToReg' @goToPwd="goToPwd"></accPwdLog>
    <phoneLog v-show="!loginClass" @keyEvent="keyEvent" @goToReg='goToReg'></phoneLog>
  </div>
</template>

<script>
import accPwdLog from './accPwdLog'
import phoneLog from './phoneLog'
export default {
  components:{accPwdLog,phoneLog},
  data() {
    return {
     loginClass:true,   //登录类型  true：账号密码登录   false：手机动态登录
    }
  },
  methods:{
    //账密登录、手机登录切换
    topSelClass:function(boole){
      this.loginClass = boole;
    },

    //切换注册
    goToReg:function(){
      this.$router.push('/loginAndRegister/register')
    },

    //切换忘记密码
    goToPwd:function(){
      this.$router.push('/loginAndRegister/forgetPassword')
    },

    keyEvent(element,incident){
      this.$emit('keyEvent',element,incident);
    }
  }
}
</script>

<style lang="less">

.login-app{
  width: 100%;
  .login_header{
    height: 60px;
    border:1px solid rgba(230,230,230,1);
    display: flex;
    flex-direction: row;
    .login_li{
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .login_li_div{
        height: 57px;
        line-height: 57px;
        font-size: 20px;
        color:rgba(153,153,153,1);
      }
      .selStyle{
        border-bottom: 2px solid rgba(42,176,234,1);
        font-size:20px;
        color:rgba(51,51,51,1);
      }
    }
  }
}

</style>