import chinaCityList from '../../../../../public/js/chinaCityList.js'
import infoVerify from '@/common/infoVerify.js'
export default {
  data() {
    return {
      userPhone:'',    // 账户名--新设置
      userInfoData:{
        name:'',    // 账户名--已设置
        phone:'',      //电话号码
        birthday: '',      //生日
        nickName:'',       //昵称
        email:'',     //邮箱
        qq:'',       //QQ
        oneDddress:"",     //获取选择器——省
        twoDddress:"",          //获取选择器——市
        threeDddress:"",      //获取选择器——区
        detailedDddress:''   //详细地址
      },

      userPhoneCorrect:true,    //用户名验证
      tNameCorrect:true,    //验证昵称
      emailCorrect:true,    //邮箱验证
      qqCorrect:true,    //qq验证
      idVerify:false,   //电话验证
      
      selYear: [],   //生日选择器——年
      selMonth: [],   //生日选择器——年
      selDay: [],    //生日选择器——年
      
      getYear: null,     //获取选择器——年
      getMonth:null,     //获取选择器——月
      getDate:null,      //获取选择器——日

      selProvince: [],    //地区选择器——省
      selCity: [],        //地区选择器——市
      selDistrict: [],     //地区选择器——区

      isUpdateData:true,
    }
  },
  created(){
    this.acquireYear();    //获取年
    this.acquireMonth();   //获取月
    this.acquireDay();   //获取月
    this.acquireProvince();   //获取省
    this.getUserInfo();   //获取用户数据
  },
  methods:{
    //获取年列表
    acquireYear:function(){
      let date = new Date();
      let yearNum = date.getFullYear()*1;
      this.selYear = [];
      for(let i=yearNum;i>yearNum-70;i--){
        this.selYear.push({value: i,label: i+'年'})
      }
    },
    //获取月列表
    acquireMonth:function(){
      this.selMonth = [];
      for(let i=1;i<13;i++){
        this.selMonth.push({value: i,label: i+'月'})
      }
    },

    //获取日列表
    acquireDay:function(y,m){
      let getDate = this.getDate;
      this.selDay = [];
      let num = 0;
      if(m===1||m===3||m===5||m===7||m===8||m===10||m===12) num = 31;
      else if(m===4||m===6||m===9||m===11){
        num = 30;
      } 
      else{
        if(y%4===0&&y%100!==0||y%400===0)num = 29;
        else num = 28;
      }
      if(!(y&&m)) num = 30;
      if(getDate>num) this.getDate = num;
      for(let i=1;i<num+1;i++){
        this.selDay.push({value: i,label: i+'日'})
      }
    },

    //获取生日
    getBirthday:function(y,m,d){
      if(!y||!m||!d)return
      let item =  new Date(y+'-'+m+'-'+d);
      this.userInfoData.birthday = item;
    },

    //获取省
    acquireProvince:function(){
      this.selProvince = chinaCityList[0];
    },

    //获取市
    acquireCity:function(num){
      this.selCity = chinaCityList['0_'+num];
      // this.userInfoData.twoDddress = chinaCityList['0_'+num][0]
    },

    //获取区
    acquireDistrict:function(num,num1){
      this.selDistrict = chinaCityList['0_'+num+'_'+num1];
    },

    //点击提交
    topSave(){
      let userPhone = this.userPhone
      let userInfoData = this.userInfoData;
      let userInfo = this.getItem('userInfo').user;
      let url = '/user/update.do';
      let num = 0;
      for(let name in userInfoData){
        if(name!=='birthday'){
          if(userInfoData[name]!==userInfo[name]){
            num ++;
          }
        }else{
          if(new Date(userInfoData.birthday)===new Date(userInfo.birthday)){
            num++
          }
        }
      }
      if(!num){
        this.$message({message:'请修改数据后再保存！',type:'warning'});
        return
      }
      let name = userInfoData.name;
      if(!userInfoData.name) userInfoData.name = userPhone;
      else delete userInfoData.name
      this.fetch({url,data:userInfoData,method:'post'},2).then(res=>{
        let obj = res.data;
        if(obj.success){
          this.$message({message:obj.message,type:'success'});
          userInfoData.name = name?name:userPhone
          this.setUserInfo(userInfoData);
          this.isUpdateData = true;
          setTimeout(() => {
            scrollTo({top: 0,behavior: "smooth"});  //滑动到网页顶部
          }, 1000);

          // 更新头部头像 昵称
          this.$store.commit('changeUpdateUserInfo', true);
        }
        else this.$message({message:obj.message,type:'warning'});
      })
    },

    //自动设置日期
    autoSetItem(date){
      if(!date)return
      let item = new Date(date)
      this.getYear = item.getFullYear();
      this.getMonth = item.getMonth()+1
      this.getDate = item.getDate()
    },

    //获取用户数据
    getUserInfo(){
      let userInfo = this.getItem('userInfo');
      let obj = this.userInfoData;
      for(let name in obj){
        if(userInfo.user[name]) obj[name] = userInfo.user[name];
      }
      this.autoSetItem(userInfo.user.birthday);
      setTimeout(() => {
        if(userInfo.user.twoDddress) this.userInfoData.twoDddress = userInfo.user.twoDddress
      }, 10);
      setTimeout(() => {
        if(userInfo.user.threeDddress) obj.threeDddress = userInfo.user.threeDddress;
        this.isUpdateData = true;
      }, 20);
    },

    //设置用户数据
    setUserInfo(obj){
      let userInfo = this.getItem('userInfo');
      for(let name in obj){
        if(obj[name]) userInfo.user[name] = obj[name];
      }
      this.setItem("userInfo",userInfo);
    }
  },
  watch:{
    'getYear':function(val){
      let m = this.getMonth;
      let d = this.getDate;
      this.getBirthday(val,m,d)
      this.acquireDay(val,m);
      this.isUpdateData = false;
    },
    'getMonth':function(val){
      let y = this.getYear;
      let d = this.getDate;
      this.getBirthday(y,val,d)
      this.acquireDay(y,val);
      this.isUpdateData = false;
    },
    'getDate':function(val){
      let y = this.getYear;
      let m = this.getMonth;
      this.getBirthday(y,m,val)
      this.isUpdateData = false;
    },
    'userInfoData.oneDddress':function(val){
      if(!val)return
      let obj = this.selProvince;
      let num = obj.indexOf(val);
      this.acquireCity(num)
      this.userInfoData.twoDddress = ''
      this.userInfoData.threeDddress = ''
      this.selDistrict = [];
      this.isUpdateData = false;
    },
    'userInfoData.twoDddress':function(val){
      if(!val)return
      let obj = this.selProvince;
      let num = obj.indexOf(this.userInfoData.oneDddress);
      let num1 = chinaCityList['0_'+num].indexOf(val);
      this.acquireDistrict(num,num1)
      this.userInfoData.threeDddress = ''
      this.isUpdateData = false;
    },
    //验证帐户名
    'userPhone':function(val){
      infoVerify.userPhone.call(this,val)
      this.isUpdateData = false;
    },
    //验证昵称
    'userInfoData.nickName':function(val){
      infoVerify.username.call(this,val)
      this.isUpdateData = false;
    },
    //地址验证
    'userInfoData.detailedDddress':function(val){
      if(val.length>0)this.idVerify = false;
      else this.idVerify = true;
      this.isUpdateData = false;
    },
    //验证邮箱
    'userInfoData.email':function(val){
      infoVerify.email.call(this,val)
      this.isUpdateData = false;
    },
    //验证qq
    'userInfoData.qq':function(val){
      infoVerify.qq.call(this,val)
      this.isUpdateData = false;
    }
    
  },
  computed: {
    isBtnDisabled:function(){
      let boole = true;
      if(this.userPhoneCorrect&&this.userPhone||this.userInfoData.name) boole = false
      else return true
      if(this.tNameCorrect&&this.userInfoData.nickName) boole = false
      else return true
      if(this.emailCorrect&&this.userInfoData.email) boole = false
      else return true
      if(this.qqCorrect&&this.userInfoData.qq) boole = false
      else return true
      if(this.userInfoData.detailedDddress) boole = false
      else return true
      if(this.userInfoData.birthday&&this.userInfoData.oneDddress&&this.userInfoData.twoDddress&&this.userInfoData.threeDddress)
        boole = false
      else return true
      return boole
    }
  },
}
