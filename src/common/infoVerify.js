/* eslint-disable no-useless-escape */
/**
 * 调用方法: import name from 'path'
 * name.phone.call(this, newValue)
 */
export default {
  // 手机验证
  phone (newValue) {
    if (/^1[34578]\d{9}$/.test(newValue)) this.phoneCorrect = true
    else this.phoneCorrect = false
  },
  // qq验证
  qq (newValue) {
    if (/^[1-9][0-9]{4,9}$/.test(newValue)) this.qqCorrect = true
    else this.qqCorrect = false
  },
  // 手机号或帐户名验证
  userPhone (newValue) {
    if (/^[a-zA-Z0-9_]{8,16}$/.test(newValue)) this.userPhoneCorrect = true
    else this.userPhoneCorrect = false
  },
  // 邮箱验证
  email (newValue) {
    if (/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(newValue)) this.emailCorrect = true
    else this.emailCorrect = false
  },

  // 密码验证 6-16位
  password (newValue) {
    if (/^[a-zA-Z0-9]{6,16}$/.test(newValue)) this.passwordCorrect = true
    else this.passwordCorrect = false
  },
  // 验证码
  smsCode (newValue) {
    if (newValue.length === 6 && /^\d{6}$/.test(newValue.trim())) this.smsCodeCorrect = true
    else this.smsCodeCorrect = false
  },
  /**
  * 用户姓名验证
  */
  username (newValue) {
    if (/^([\u4e00-\u9fa5]|[a-zA-Z0-9]){2,11}$/.test(newValue)) this.tNameCorrect = true
    else this.tNameCorrect = false
  },
  /**
  * 座机电话验证
  */
 fixedPhone (newValue) {
    if (/^(\d{3}-?\d{7,8}|\d{4}-?\d{7,8})|(1[34578]\d{9})$/.test(newValue)) this.fixedPhoneCorrect = true
    else this.fixedPhoneCorrect = false
  },
  
  /**
  * 网址验证
  */
  url (newValue) {
    if (/((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(newValue)) this.urlCorrect = true
    else this.urlCorrect = false
  },

  //替换输入框的表情包
  onInput(val){
    var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
    if (regStr.test(val)) {
      val = val.replace(regStr, "");
    }
    return val
  },
  //去除字符串的空格
  removeBlank:function(str){
    let val = str.replace(/\s*/g,"");
    return val
  },

  //获取验证码
  topSetCode:function(then,phone){
    let url = '/message/phone.do';
    let data = {phone}
    then.fetch({url,data,method:'get'},2).then(res=>{
      then.$message({message:res.data.message,type:'success'});
    }).catch(()=>{
      then.$message({message:'获取验证码失败，请点击从新获取！',type:'warning'});
    })
  },

  //验证验证码是否正确
  isYzmInfo(then,val){
    if(val.length!==6) return
    let url ='/message/codeMessage.do?phone='+then.phoneNum+"&coder="+val;
    then.fetch({url,method:'get'},2).then(res=>{
      then.yzmIsCorrect=res.data;
    }).catch(()=>{
      then.pop("验证码验证失败！");
    })
  },
}
