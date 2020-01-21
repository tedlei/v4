<template>
  <div class="accPwdLog-app" ref="accPwdLog">
    <div class="reg_inp" :class="userPhoneCorrect?'':'borColorRed'">
      <el-input v-model="accountRoPhone"  autofocus="true" placeholder="请输入手机号或账户名"></el-input>
      <div class="reg_inp_ts_div " v-if="!userPhoneCorrect">手机号、账户名格式错误</div>
    </div>
    <div class="reg_inp" :class="passwordCorrect?'':'borColorRed'">
      <el-input v-model="password" type="password" placeholder="密码长度6-16位，数字、字母或数字和字母的组合"></el-input>
      <div class="reg_inp_ts_div " v-if="!passwordCorrect">密码错误</div>
    </div>
    <div class="reg_inp apl_dtyzm" v-if="isShowDtyzm">
      <div class="dtyzm_width">
        <el-input v-model="dtyzm" placeholder="请输入验证码"></el-input>
      </div>
      <div class="dtyzm fx" @click="createVerifyCode">
        <span 
        v-for="(item,i) of yzmList" 
        :key="i" 
        :style="{'transform':'rotate('+item.num+'deg)'}">{{item.title}}</span>
      </div>
    </div>
    <div class="apl_font">
      <span class="apl_font_span " @click="goToReg">注册账号</span>
      <span class="apl_font_span " @click="goToPhoneLog">忘记密码？</span>
    </div>
    <el-button 
    class="reg_button" 
    type="primary" 
    :disabled="isLoginBtn" 
    :class="isLoginBtn?'reg_button_bgColor':''"
    @click="topLogin"
    >登录</el-button>

  </div>
</template>
<script>
import infoVerify from '@/common/infoVerify.js'
export default {
  data() {
    return {
      accountRoPhone:'',
      password:'',   
      dtyzm:'', 
      yzmList:[],   

      userPhoneCorrect:true,    //验证手机号或账户名
      passwordCorrect:true,    //验证密码
      isShowDtyzm:false,    //是否显示动态验证码

    }
  },
  mounted(){
    this.$emit('keyEvent',this.$refs.accPwdLog,this.topLogin);
    this.createVerifyCode()
  },
  methods:{
    pop:function(message,type){
      if(!type) type="warning";
      this.$message({message,type});
    },
    //切换注册
    goToReg:function(){
      this.$emit("goToReg")
    },
    //切换手机动态登录
    goToPhoneLog:function(){
      this.$emit("goToPwd")
    },

    //获取动态验证码
    createVerifyCode(){
      let list = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L',
      'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f',
      'g','h','i','g','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
      // let str = '';
      let listObj = [];
      for (let i = 0; i < 4; i++) {
        let num1 = parseInt(Math.random()*list.length);
        let num2 = parseInt(Math.random()*110-55);
        listObj.push({title:list[num1],num:num2});
      }
      this.yzmList = listObj
    },

    //点击登录时
    topLogin:function(){
      if(this.isLoginBtn)return
      let accountRoPhone = this.accountRoPhone;
      let password = this.password;
      let list = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L',
      'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f',
      'g','h','i','g','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
      let item = '';
      for (let i = 0; i < 12; i++) {
        let num1 = parseInt(Math.random()*list.length);
        item += list[num1];
      }
      password = item.slice(0,6) + password + item.slice(6)
      let dtyzm = this.dtyzm;
      let url="/login.do?userCode="+accountRoPhone+"&password="+password;
      if(this.isShowDtyzm){
        let str = '';
        for(let o of this.yzmList){
          str+=o.title;
        }
        if(!dtyzm||dtyzm.length!==4||str.toLowerCase()!==dtyzm.toLowerCase()){
          this.pop("验证码错误或为空！");
          return
        }
      }
      this.fetch({url,method:'get'},2).then( async res=>{
        let obj = res.data;
        if(obj.success){
          this.pop('登录成功','success');

          this.setItem('userInfo',obj.data);

          // 用于传递给后台退出当前用户
          document.cookie = "phone=" + obj.data.user.phone
                            + ";expires=" + new Date(Date.now() + 24*60*60*1000*30).toUTCString;

          let sett = setTimeout(() => {
            this.$store.commit('changeUpdateUserInfo', true);
            this.push('/');
            clearTimeout(sett);
          }, 1000);

         
          // 获取当前用户是否为客服用户， 且将获取的成为客服的对应的学校id保存
          let {schoolId, nickName} = await this.getIsService(obj.data);
          this.setItem('clientId', obj.data.user.id);
          this.setItem('serviceSchoolId', schoolId);
          this.setItem('chatNickName', nickName);
        }else{
          this.pop(obj.msg);
          this.createVerifyCode();
          this.password = "";
          this.isShowDtyzm = true;
        }
      })
    },
    // 是否被设置为客服
    getIsService(userInfo){
      return new Promise(resolve => {
        this.fetch({
          url: 'userMessage/getService.do',
          method: 'post',
          data: {
            phone: userInfo.user.phone
          }
        }, 2).then((res)=>{
          resolve(res.data);
        })
      })
    }
  },
  watch:{
    //验证帐户名或手机号
    accountRoPhone:function(val){
      infoVerify.userPhone.call(this,val);
    },
    //验证密码
    password:function(val){
      infoVerify.password.call(this,val);
    },
  },
  computed:{
    isLoginBtn:function(){
      if(this.accountRoPhone.length<8)return true;
      if(this.password.length<6)return true;
      if(!this.userPhoneCorrect||!this.passwordCorrect)return true;
      return false
    }
  }
}
</script>

<style lang="less">

.accPwdLog-app{
  width: 100%;
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
  .apl_dtyzm{
    border: 0;
    display: flex;
    flex-direction: row;
    .dtyzm_width{
      width: 256px;
      border:1px solid rgba(230,230,230,1);
      border-right: 0;
      position: relative;
    }
    .dtyzm{
      width: 120px;
      height: 52px;
      background: #009944;
      border-radius:0px 5px 5px 0px;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      span{
        font-size: 18px;
        color:rgba(255,255,255,1);
      }
      span+span{
        margin-left: 10px;
      }
    }
    .borColorRed{
      border-color: red;
    }
  }
  .borColorRed{
    border-color: red;
  }
  .reg_inp+.reg_inp{
    margin-top:16px;    
  }
  .apl_font{
    margin-top: 20px;
    margin-left: 40px;
    width: 376px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .apl_font_span{
      font-size: 14px;
      color:rgba(42,176,234,1);
      cursor: pointer;
      text-decoration: none;
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
}

</style>