import chinaCityList from '../../../../../public/js/chinaCityList.js'
import infoVerify from '@/common/infoVerify.js'
import {downloadImageInit} from '@/common/fn.js'
export default {
  props:['isUpdate'],
  data() {
    return {
      info:{   //用户信息
        user:{    //普通用户信息
          phone:'',  //电话号码
          name:'',   //帐户名
          email:'',    //邮箱
          password:''   //密码
        },
        schoolUser:{   //学校用户信息
          linkman:'',    //联系人
          organizationName:'',  // 学校名称
          schoolPhone:'',  //  学校电话
          oneDddress:'',    //省
          twoDddress:'',   //市
          threeDddress:'' ,    //区
          schoolAddress:'',   //学校详细地址
          schoolUrl:'',  //  学校网址
          schoolTrade:'',  //  学校行业
          schoolAptitude:'',  // 营业执照
          schoolPermission:'',   //办学许可
          schoolLogo:'',  // 学校LOGO
          schoolCertificate:'',  // 学校证书
        }
      },

      action:"/upload.do",  //上传图片地址

      verifyCode:'',   //验证码
      qrPwd:'',    //确认密码
      schoolTrade:[],   //学校行业

      provinceList:[],   //省列表
      cityList:[],   //市列表
      areaList:[],   //区列表
      

      radio:false,    //是否同意协议
      isVfCodeBtn:false,    //是否禁用获取验证码
      isShowPwd:true,   //判断用户是否注册
      isLoginNum:'0', 
      fyCodeNum:60,    //验证码时间

      phoneCorrect:true,    //电话验证
      smsCodeCorrect:true,   //验证码验证
      userPhoneCorrect:true,   //帐户名验证
      tNameCorrect:true,    //联系人姓名验证
      passwordCorrect:true,   //密码验证
      qrPwdCorrect:true,   //确认密码验证
      emailCorrect:true,   //邮箱验证
      oratCorrect:true,   //机构全称验证
      fixedPhoneCorrect:true,   //固话验证
      urlCorrect:true,   //网址验证
      industryCorrect:false,   //学校行业
      addressCorrect:true,  //学校详细地址
    }
  },
  created() {
    this.getProvince();
  },
  mounted(){
    this.init();
  },
  methods: {
    // 初始化下载
    init(){
      downloadImageInit('logo', require('../../../../../public/file/logo.png'), 'logo')
      downloadImageInit('authorization', require('../../../../../public/file/authorization.doc'), '授权文件模板.doc')
    },

    //获取图片路劲
    handleAvatarSuccess(res, file ,str) {
      switch(str){
        case 'aptitude' : this.info.schoolUser.schoolAptitude = file.response.message;
        break;
        case 'permission' : this.info.schoolUser.schoolPermission = file.response.message;
        break;
        case 'logo' : this.info.schoolUser.schoolLogo = file.response.message;
        break;
        case 'brand' : this.info.schoolUser.schoolCertificate = file.response.message;
        break;
      }
    },
    //判断图片格式和大小
    beforeAvatarUpload(file,str) {
      let isJPG = file.type === 'image/png'||file.type === 'image/jpeg';
      let isLt2M = true;
      if (!isJPG) {this.$message.error('上传图片只能是 JPG或png 格式!')}
      if(str==='aptitude'||str==='brand'||str==='permission'){
        isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) this.$message.error('上传'+str==='aptitude'?'营业执照':str==='brand'?'授权文件':'办学许可'+'图片大小不能超过 1MB!');
      }
      if(str==='logo'){
        isLt2M = file.size / 1024 < 300;
        if (!isLt2M) this.$message.error('上传LOGO图片大小不能超过 300k!');
      }
      return isJPG && isLt2M;
    },


    //营业执照
    schoolAptitude(file){
      return this.beforeAvatarUpload(file,'aptitude');
    },
    aptitudeSuccess(res, file){
      this.handleAvatarSuccess(res, file, 'aptitude');
    },

    //办学许可
    schoolPermission(file){
      return this.beforeAvatarUpload(file,'permission');
    },
    permissionSuccess(res, file){
      this.handleAvatarSuccess(res, file, 'permission');
    },
    
    //学校LOGO
    schoolLogo(file){
      return this.beforeAvatarUpload(file,'logo');
    },
    logoSuccess(res,file){
      this.handleAvatarSuccess(res, file, 'logo');
    },

    //授权文件
    schoolBrand(file){
      return this.beforeAvatarUpload(file,'brand');
    },
    brandSuccess(res,file){
      this.handleAvatarSuccess(res, file, 'brand');
    },

    //是否同意协议
    topProtocol(){
      this.radio = !this.radio
    },
    //获取省
    getProvince(){
      this.provinceList = chinaCityList['0'];
    },
    //获取市
    getCity(num){
      this.cityList = chinaCityList['0_'+num];
    },
    //获取区
    getArea(num1,num2){
      this.areaList = chinaCityList['0_'+num1+'_'+num2];
    },
    //获取验证码
    topGetyzm:function(){
      if(!this.phoneCorrect||!infoVerify.removeBlank(this.info.user.phone)){
        this.$message({message:'手机号为空或格式错误！',type:"warning"});
        return
      }
      this.yzmItem(true);
      infoVerify.topSetCode(this,this.info.user.phone);
    },
    //验证码时间
    yzmItem(boole){    
      let itemNum = this.getItem('itemNum');
      let sett = this.getItem('sett');
      if(boole){
        if(!itemNum||itemNum<=0)this.setItem('itemNum',60);
      }else return false
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
          this.fyCodeNum = 60;
        }
        this.setItem('itemNum',num);
      }, 1000);
    },

    //电话号码输入完毕后
    inputPhone(){
      let phone = this.info.user.phone.replace(/\s*/g,"");
      if(phone.length<11||!this.phoneCorrect) return
      let url = '/user/find.do?phone='+phone;
      if(!this.phoneCorrect)return;
      this.fetch({url,method:'get'},2).then(res=>{
        let obj = res.data;
        this.isLoginNum = obj.message
        if(obj.message==='2') {
          this.$message({message:'该手机号已注册学校账户！',type:"warning"});
          return
        }else if(obj.message==='1'){
          this.isShowPwd = false;
          this.$message({message:'该手机号已注册普通账户，填写剩余选项完成账户升级',type:"success"});
        }else {
          this.isShowPwd = true;
          this.$message({message:'该手机号未在本网站注册',type:"success"});
          let userInfo = this.info;
          userInfo.user.name = "";
          userInfo.user.password = "";
          return
        }
      })
    },

    //点击提交时查询验证码是否正确
    tjVerifyCode(){
      let url = 'message/codeMessage.do?phone='+this.info.user.phone+"&coder="+this.verifyCode;
      this.fetch({url,method:'get'},2).then(res=>{
        if(!res.data){
          this.$message({message:'验证码错误！',type:'warning'});
          this.smsCodeCorrect = false;
          return
        }
        this.topCommit();
      })
    },

    //提交
    topCommit(){
      // 验证是否已经注册
      let url = "/user/schoolsave.do";
      let userInfo = this.info;
      let schoolUrl = userInfo.schoolUser.schoolUrl
      schoolUrl = schoolUrl.indexOf('http://')>-1?schoolUrl:'http://'+schoolUrl;
      userInfo.schoolUser.schoolUrl = schoolUrl
      if(!this.isShowPwd){
        delete userInfo.user.password;
        delete userInfo.user.name;
      }
      this.fetch({url,data:userInfo,method:'post'},2).then(res=>{
        if(res.data.success){
          this.$message({message:'提交成功，请等待审核',type:'success'});
          setTimeout(() => {
            this.decideIsLogin(userInfo.user.phone);
          }, 2000);
        }else{
          this.$message({message:res.data.message,type:'warning'});
        }
      })
    },
    
    // 判断是否登录
    decideIsLogin(phone){
      let userInfo = this.getItem('userInfo');
      if(userInfo){
        if(userInfo.user.phone===phone){
          this.push('/index');
          return 
        }
      }
      this.quit();
    },

    //自动获取地址
    autoGetCity(d1,d2,d3){
      let school = this.info.schoolUser;
      school.schoolAddress = d1+d2+d3;
      if(d1===d2){
        school.schoolAddress = d1+d3;
      }
    }
  },
  watch: {
    //选择省时
    'info.schoolUser.oneDddress':function(val){
      if(!val)return
      let list = this.provinceList;
      let schoolUser = this.info.schoolUser;
      this.getCity(list.indexOf(val));
      schoolUser.twoDddress = '';
      schoolUser.threeDddress = '';
      this.areaList = [];
      this.autoGetCity(val,schoolUser.twoDddress,schoolUser.threeDddress)
    },
    //选择市
    'info.schoolUser.twoDddress':function(val){
      if(!val)return
      let list = this.provinceList;
      let list1 = this.cityList;
      let school = this.info.schoolUser;
      this.getArea(list.indexOf(school.oneDddress),list1.indexOf(val))
      school.threeDddress = '';
      this.autoGetCity(school.oneDddress,val,school.threeDddress)
    },
    //选择区
    'info.schoolUser.threeDddress':function(val){
      if(!val)return
      let school = this.info.schoolUser;
      this.autoGetCity(school.oneDddress,school.twoDddress,val)
    },
    //验证电话
    'info.user.phone':function(val){
      if(!val)return
      infoVerify.phone.call(this,val);
      this.inputPhone();
    },
    //验证验证码
    'verifyCode':function(val){
      infoVerify.smsCode.call(this,val);
    },
    //帐户名证码
    'info.user.name':function(val){
      infoVerify.userPhone.call(this,val);
    },
    //联系人证码
    'info.schoolUser.linkman':function(val){
      infoVerify.username.call(this,val);
    },
    //密码证码
    'info.user.password':function(val){
      infoVerify.password.call(this,val);
    },
    //确认密码证码
    'qrPwd':function(val){
      let password = this.info.user.password
      if(val===password) this.qrPwdCorrect = true;
      else this.qrPwdCorrect = false;
    },
    //密码证码
    'info.user.email':function(val){
      infoVerify.email.call(this,val);
    },
    //机构全称
    'info.schoolUser.organizationName':function(val){
      if(!val)return
      if(!infoVerify.removeBlank(val)){
        this.oratCorrect = false;
      }else{
        this.oratCorrect = true;
      }
    },
    //学校固话
    'info.schoolUser.schoolPhone':function(val){
      infoVerify.fixedPhone.call(this,val);
    },
    //学校网址
    'info.schoolUser.schoolUrl':function(val){
      infoVerify.url.call(this,val);
    },
    'info.schoolUser.schoolAddress':function(val){
      if(!val)return
      if(!val.replace(/\s*/g,"")) this.addressCorrect = false;
      else this.addressCorrect = true;
    },
    //主营行业
    "schoolTrade":function(val){
      this.info.schoolUser.schoolTrade = JSON.stringify(val);
      if(val.length!==0)this.industryCorrect = true;
      else this.industryCorrect = false;
    }
  },
  computed: {
    //验证提交按钮
    ifiBtn:function(){
      let user = this.info.user;
      let schoolUser = this.info.schoolUser;
      let boole = false;
      if(!schoolUser) return true
      if(!user.phone||!this.phoneCorrect) return true;
      if(!this.verifyCode||!this.smsCodeCorrect) return true;
      if(!schoolUser.linkman||!this.tNameCorrect) return true;
      if(this.isShowPwd){
        if(!user.name||!this.userPhoneCorrect) return true;
        if(!user.password||!this.passwordCorrect) return true;
        if(!this.qrPwd||!this.qrPwdCorrect) return true;
      }
      if(!user.email||!this.emailCorrect) return true;
      if(!schoolUser.organizationName||!this.oratCorrect) return true;
      if(!schoolUser.schoolPhone||!this.fixedPhoneCorrect) return true;
      if(!schoolUser.schoolUrl||!this.urlCorrect) return true;
      if(schoolUser.schoolTrade.length<=0) return true;
      if(!schoolUser.oneDddress||!schoolUser.twoDddress||!schoolUser.threeDddress
        ||!schoolUser.schoolAptitude||!schoolUser.schoolLogo||!schoolUser.schoolCertificate) return true;
      if(!schoolUser.schoolAddress||!this.addressCorrect) return true;
      if(!this.radio)return true;
      return boole;
    },
    
    //是否禁用获取验证码按钮
    isDisBtn(){
      let phone = this.info.user.phone.replace(/\s*/g,"");
      let gsd = this.isLoginNum==='2'?true:false;
      return this.isVfCodeBtn||gsd||!this.phoneCorrect||phone.length<11;
    },

    //是否禁用帐户名
    // isDisaAccount(){
    //   let obj = this.getSchoolData;
    //   if(!obj.user) return false;
    //   return obj.user.name?true:false;
    // },

    //是否显示密码
    // isShowPwd(){
    //   let obj = this.getSchoolData;
    //   if(obj.schoolUser||obj.user) return false
    //   return true
    // }
  },
}