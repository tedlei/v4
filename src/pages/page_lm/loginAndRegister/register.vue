<template>
  <div class="register-app" ref='regi'>
    <div class="reg_hea">注册</div>
    <div class="reg_inp" :class="phoneCorrect?'':'borColorRed'">
      <el-input v-model="phoneNum" autofocus="true" placeholder="请输入手机号"></el-input>
      <div class="reg_inp_ts_div" v-if="!phoneCorrect">手机号格式错误</div>
    </div>
    <div class="reg_inp vfCode">
      <div class="inp_vfCode" :class="smsCodeCorrect?'':'borColorRed'">
        <el-input v-model="verifyCode" placeholder="请输入验证码"></el-input>
        <div class="reg_inp_ts_div" v-if="!smsCodeCorrect">验证码格式错误</div>
      </div>
      <el-button @click="topSetCode"  type="primary" :disabled="isVfCodeBtn" :class="isVfCodeBtn?'inp_bgColor':''">
        {{!isVfCodeBtn?'获取验证码':fyCodeNum+'秒后重新获取'}}
      </el-button>
    </div>
    <div class="reg_inp" :class="passwordCorrect?'':'borColorRed'">
      <el-input v-model="password" type="password" placeholder="密码长度6-16位，数字、字母或数字和字母的组合"></el-input>
      <div class="reg_inp_ts_div" v-if="!passwordCorrect">密码格式错误</div>
    </div>
    <div class="reg_inp" :class="isVerifyAffirmPwd?'borColorRed':''">
      <el-input v-model="affirmPwd" type="password" placeholder="请输入确认密码"></el-input>
      <div class="reg_inp_ts_div" v-if="isVerifyAffirmPwd">确认密码格式错误</div>
    </div>
    <div class="reg_chickbox ">
      <div class="reg_select" :class="chicked?'reg_sel_bg':'reg_sel_bor'" @click="topChicked">
        <i class="el-icon-check" v-if="chicked"></i>
      </div>
      <span class="reg_span" @click="topChicked">我已阅读并同意</span>
      <router-link class="reg_rou" to="/">服务协议、</router-link><router-link class="reg_rou" to="/">隐私保护政策</router-link>
    </div>
    <el-button class="reg_button" @click="topRegister" type="primary" :disabled="isRegBtn" :class="isRegBtn?'reg_button_bgColor':''">
      注册
    </el-button>
    <div class="reg_textStyle ">
      已经注册，现在<span class="reg_rouTo" @click="goToLogin">登录</span>
    </div>
  </div>
</template>

<script>

import infoVerify from '@/common/infoVerify.js'
export default {
  data() {
    return {
      phoneNum:'',      //电话
      verifyCode:'',    //验证码
      password:'',      //密码
      affirmPwd:'',     //确认密码
      fyCodeNum:60,      //验证码时间

      phoneCorrect:true,       //验证手机号
      smsCodeCorrect:true,     //验证验证码
      passwordCorrect:true,    //验证密码
      isVerifyAffirmPwd:false,    //验证确认密码

      yzmIsCorrect:false,   //验证验证码是否与后端的一致

      chicked:false,   //是否同意隐私政策
      isVfCodeBtn:false,   //是否禁用验证按钮
    }
  },
  mounted(){
    this.$emit('keyEvent',this.$refs.regi,this.topRegister);
  },
  methods:{
    pop:function(message,type){
      if(!type) type="warning";
      this.$message({message,type});
    },
    //是否同意隐私政策
    topChicked:function(){
      this.chicked = !this.chicked;
    },

    //切换登录
    goToLogin:function(){
      this.$router.push('/loginAndRegister')
    },

    //获取验证码
    topSetCode: function() {
      if(!this.phoneCorrect||!infoVerify.removeBlank(this.phoneNum)){
        this.pop('手机号为空或格式错误！');
        return
      }
      this.yzmItem(true);
      infoVerify.topSetCode(this,this.phoneNum);
    },

     //验证码时间
    yzmItem(boole){      
      let itemNum = this.getItem('itemNum');
      if(boole) if(!itemNum||itemNum<=0)this.setItem('itemNum',60);
      else if(!itemNum)return
      this.isVfCodeBtn = true;
      let sett = setInterval(() => {
        let num = this.getItem('itemNum');
        num--
        this.fyCodeNum = num;
        if(num<=0){
          clearInterval(sett);
          this.isVfCodeBtn = false;
          this.fyCodeNum = 60;
        }
        this.setItem('itemNum',num);
      }, 1000);
    },

    //点击注册
    topRegister:function(){
      if(this.isRegBtn)return
      let phone = this.phoneNum;
      let password = this.password;
      let affirmPwd = this.affirmPwd;
      if(!this.yzmIsCorrect){
        this.verifyCode = '';
        this.pop('验证码错误');
        return
      }
      if(password!==affirmPwd){
        this.affirmPwd = '';
        this.pop('密码和确认密码不一致');
        return
      }
      let url="/user/save.do";
      let data={phone,password};
      this.fetch({url,data,method:'post'},2).then(res=>{
        if(res.data.success){
          this.pop('注册成功！','success');
          let sett = setTimeout(() => {
            this.goToLogin();
            clearTimeout(sett)
          }, 1000);
        }else this.pop(res.data.message)
      }).catch(()=>{  
        this.pop('注册失败！')
      })
    }

  },
  watch:{
    //验证手机号
    'phoneNum':function(val){
      infoVerify.phone.call(this,val)
    },
    //验证验证码
    'verifyCode':function(val){
      infoVerify.smsCode.call(this,val)
      infoVerify.isYzmInfo(this,val);
    },
    //验证密码
    'password':function(val){
      infoVerify.password.call(this,val);
    },
    //验证密码
    'affirmPwd':function(val){
      val = infoVerify.removeBlank(val);
      if(val.length<6) this.isVerifyAffirmPwd = true;
      else this.isVerifyAffirmPwd = false;
    },
  },
  computed:{
    isRegBtn:function(){
      if(this.phoneNum.length!==11)return true;
      if(this.verifyCode.length!==6)return true;
      if(this.password.length<6)return true;
      if(this.affirmPwd.length<6)return true;
      if(!this.phoneCorrect||!this.smsCodeCorrect||!this.passwordCorrect||this.isVerifyAffirmPwd)return true;
      if(!this.chicked)return true;
      return false
    }
  }
}
</script>

<style lang="less">
.register-app{
  width:100%;
  .reg_hea{
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 30px;
    color:rgba(102,102,102,1);
    border-bottom: 1px solid rgba(230,230,230,1);
  }
  .reg_inp{
    margin-top:30px;
    margin-left: 38px;
    width: 376px;
    border:1px solid rgba(230,230,230,1);
    border-radius:5px;
    position: relative;
    .el-input>.el-input__inner{
      border:0;
      height: 50px;
      font-size: 16px;
    }
    .reg_inp_ts_div{
      padding-left: 5px;
      padding-right: 5px;
      height:26px;
      background:rgba(204,8,8,1);
      text-align: center;
      line-height: 26px;
      font-size: 12px;
      color:rgba(255,255,255,1);
      border-radius:4px;
      position:absolute;
      top:13px;
      right: 10px;
    }
  }
  .borColorRed{
    border-color: red;
  }
  .reg_inp+.reg_inp{
    margin-top:16px;    
  }
  .vfCode{
    border: 0;
    display: flex;
    flex-direction:row;
    justify-content: space-between;
    .inp_vfCode{
      width: 245px;
      border:1px solid rgba(230,230,230,1);
      border-radius: 5px;
      position: relative;
      .reg_inp_ts_div{
        padding-left: 5px;
        padding-right: 5px;
        height:26px;
        background:rgba(204,8,8,1);
        text-align: center;
        line-height: 26px;
        font-size: 12px;
        color:rgba(255,255,255,1);
        border-radius:4px;
        position:absolute;
        top:13px;
        right: 10px;
      }
    }
    .borColorRed{
      border-color: red;
    }
    .el-button{
      padding:0;
      border:0;
      width:120px;
      height:50px;
      border-radius:5px;
      background:#2ab0ea;
      font-size: 16px;
    }
    .el-button:active{
      background:#409EFF;
    }
    .inp_bgColor{
      background:rgba(230,230,230,1);
      color:rgba(153,153,153,1);
    }
  }
  .reg_chickbox{
    margin-top: 16px;
    margin-left: 38px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .reg_select{
      width:18px;
      height:18px;
      text-align:center;
      line-height: 18px;
      border-radius:50%;
      cursor: pointer;
    }
    .reg_sel_bor{
      background:rgba(255,255,255,1);
      border:1px solid rgba(153,153,153,1);
    }
    .reg_sel_bg{
      background:rgba(42,176,234,1);
      i{
        color:white;
        font-size: 14px;
      }
    }
    .reg_span{
      margin-left: 10px;
      font-size: 14px;
    }
    .reg_rou{
      font-size: 14px;
      color:#2AB0EA;
    }
  }
  .reg_button{
    margin-top: 30px;
    margin-left: 38px;
    border: 0;
    width:376px;
    height:50px;
    border-radius:5px;
    font-size: 20px;
    color:rgba(255,255,255,1);
  }
  .reg_button_bgColor{
    background:rgba(230,230,230,1);
  }
  .reg_textStyle{
    margin-top:16px;
    text-align: center;
    font-size: 14px;
    color:rgba(102,102,102,1);
    .reg_rouTo{
      color:#2AB0EA;
      cursor: pointer;
    }
  }
}

</style>