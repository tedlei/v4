<template>
  <div class="register-app" ref='loginApp'>
    <div class="reg_hea">修改密码</div>
    <div class="reg_inp" :class="phoneCorrect?'':'borColorRed'">
      <el-input v-model="phoneNum" autofocus="true" placeholder="请输入手机号"></el-input>
      <div class="reg_inp_ts_div" v-if="!phoneCorrect">手机号格式错误</div>
    </div>

    <div class="reg_inp vfCode">
      <div class="inp_vfCode" :class="smsCodeCorrect?'':'borColorRed'">
        <el-input v-model="verifyCode" placeholder="请输入验证码"></el-input>
        <div class="reg_inp_ts_div" v-if="!smsCodeCorrect">验证码格式错误</div>
      </div>
      <el-button
        @click="topSetCode"
        type="primary"
        :disabled="isVfCodeBtn"
        :class="isVfCodeBtn?'inp_bgColor':''"
      >{{!isVfCodeBtn?'获取验证码':fyCodeNum+'秒后重新获取'}}</el-button>
    </div>

    <div class="reg_inp" :class="passwordCorrect?'':'borColorRed'">
      <el-input v-model="password" placeholder="请输入新密码"></el-input>
      <div class="reg_inp_ts_div" v-if="!passwordCorrect">密码格式错误</div>
    </div>

    <div class="pl_text">
      返回
      <span @click="goToReg">登录</span>
    </div>

    <el-button
      class="reg_button"
      @click="topUpdate"
      type="primary"
      :disabled="isRegBtn"
      :class="isRegBtn?'reg_button_bgColor':''"
    >修改</el-button>
  </div>
</template>

<script>
import infoVerify from "@/common/infoVerify.js";
export default {
  data() {
    return {
      phoneNum: "", //电话
      verifyCode: "", //验证码
      password: "", //新密码
      fyCodeNum: 60, //验证码时间

      phoneCorrect: true, //验证手机号
      smsCodeCorrect: true, //验证验证码
      passwordCorrect: true, //验证验证码
      isVfCodeBtn: false, //是否禁用验证按钮

      yzmIsCorrect:false,   //验证验证码是否与后端的一致
    };
  },
  mounted(){
    // let loginApp = this.$refs.loginApp;
    // loginApp.onkeydown=function(event){
    //   var e = event || window.event || arguments.callee.caller.arguments[0];       
    //   if(e && e.keyCode==13){
    //     this.topUpdate();
    //   }
    // }; 
    this.$emit('keyEvent',this.$refs.loginApp,this.topUpdate);
  },
  methods: {
    //切换注册
    goToReg: function() {
      this.$router.push("/loginAndRegister");
    },
    //获取验证码
    topSetCode: function() {
      if(!this.phoneCorrect||!infoVerify.removeBlank(this.phoneNum)){
        this.$message({message:'手机号为空或格式错误！',type:'warning'});
        return
      }
      this.yzmItem(true);
      infoVerify.topSetCode(this,this.phoneNum);
    },

    //验证码时间
    yzmItem(boole){      
      let itemNum = this.getItem('itemNum');
      let sett = this.getItem('sett');
      if(boole) if(!itemNum||itemNum<=0)this.setItem('itemNum',60);
      else return false
      this.isVfCodeBtn = true;
      sett = setInterval(() => {
        this.setItem('sett',sett);
        let num = this.getItem('itemNum');
        num--
        this.fyCodeNum = num;
        if(num<=0){
          clearInterval(this.getItem('sett'));
          this.setItem('sett',0);
          this.isVfCodeBtn = false;
        }
        this.setItem('itemNum',num);
      }, 1000);
    },





    //点击确认
    topUpdate: function() {
      if(this.isRegBtn)return;
      let phoneNum = this.phoneNum;
      let verifyCode = this.verifyCode;
      let password = this.password;
      let url = '/user/updatePassword.do?password='+password+"&phone="+phoneNum
      if(!this.yzmIsCorrect){
        this.verifyCode = '';
        this.$message({message:'验证码错误',type:'warning'});
        return
      }
      this.fetch({url,method: 'get'},2).then(res=>{
        this.$message({message:res.data.message,type:res.data.success?'success':'warning'});
        if(res.data.success){
          let sett = setTimeout(() => {
            this.$router.push('/loginAndRegister');
            clearTimeout(sett);
          }, 1000);
        }
      }).catch(err=>{
        this.pop(err.data.message);
      })
    }
  },
  watch: {
    //验证手机号
    phoneNum: function(val) {
      infoVerify.phone.call(this, val);
    },
    //验证验证码
    verifyCode: function(val) {
      infoVerify.smsCode.call(this, val);
      infoVerify.isYzmInfo(this,val);
    },
    //验证密码
    password: function(val) {
      infoVerify.password.call(this, val);
    }
  },
  computed: {
    isRegBtn: function() {
      if (this.phoneNum.length !== 11) return true;
      if (this.verifyCode.length !== 6) return true;
      if (this.password.length < 6) return true;
      if (!this.phoneCorrect || !this.smsCodeCorrect || !this.passwordCorrect) return true;
      return false;
    }
  }
};
</script>

<style lang="less">
.register-app {
  width: 100%;
  .reg_hea {
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 30px;
    color: rgba(102, 102, 102, 1);
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  .reg_inp {
    margin-top: 30px;
    margin-left: 38px;
    width: 376px;
    border: 1px solid rgba(230, 230, 230, 1);
    border-radius: 5px;
    position: relative;
    .el-input > .el-input__inner {
      border: 0;
      height: 50px;
      font-size: 16px;
    }
    .reg_inp_ts_div {
      padding-left: 5px;
      padding-right: 5px;
      height: 26px;
      background: rgba(204, 8, 8, 1);
      text-align: center;
      line-height: 26px;
      font-size: 12px;
      color: rgba(255, 255, 255, 1);
      border-radius: 4px;
      position: absolute;
      top: 13px;
      right: 10px;
    }
  }
  .borColorRed {
    border-color: red;
  }
  .reg_inp + .reg_inp {
    margin-top: 16px;
  }
  .vfCode {
    border: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .inp_vfCode {
      width: 245px;
      border: 1px solid rgba(230, 230, 230, 1);
      border-radius: 5px;
      position: relative;
      .reg_inp_ts_div {
        padding-left: 5px;
        padding-right: 5px;
        height: 26px;
        background: rgba(204, 8, 8, 1);
        text-align: center;
        line-height: 26px;
        font-size: 12px;
        color: rgba(255, 255, 255, 1);
        border-radius: 4px;
        position: absolute;
        top: 13px;
        right: 10px;
      }
    }
    .borColorRed {
      border-color: red;
    }
    .el-button {
      border: 0;
      width: 120px;
      height: 50px;
      border-radius: 5px;
      background: #2ab0ea;
      font-size: 16px;
    }
    .inp_bgColor {
      background: rgba(230, 230, 230, 1);
    }
  }
  .pl_text {
    margin-top: 10px;
    margin-left: 38px;
    font-size: 16px;
    color: #aaa;
    span {
      color: #2ab0ea;
      cursor: pointer;
    }
  }
  .reg_button {
    margin-top: 30px;
    margin-left: 38px;
    border: 0;
    width: 376px;
    height: 50px;
    border-radius: 5px;
    font-size: 20px;
    color: rgba(255, 255, 255, 1);
  }
  .reg_button_bgColor {
    background: rgba(230, 230, 230, 1);
  }
}
</style>