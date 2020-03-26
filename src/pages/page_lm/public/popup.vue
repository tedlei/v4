<template>
  <div class="popup-app">
    <div class="pop_div1 fx">
      <span>{{type==='curr'?'课程预约':'教师预约'}}</span>
      <i class="el-icon-close" @click="topClose(false)"></i>
    </div>
    <ul class="pop_ul2" v-if="obj&&obj.schoolCooperation">
      <template>
        <li v-for="(item,i) of getList(obj.schoolCooperation)" :key="i">{{item}}</li>
      </template>
    </ul>
    <ul class="pop_ul3 fx">
      <li>电话</li>
      <li :class="phoneCorrect?'':'BgColor'">
        <el-input v-model="phone" @blur="inputPhone" placeholder="请输入电话号码"></el-input>
      </li>
      <li></li>
    </ul>
    <ul class="pop_ul3 fx">
      <li>姓名</li>
      <li :class="nameCorrect?'':'BgColor'">
        <el-input v-model="name" @blur="inputName" placeholder="请输入姓名"></el-input>
      </li>
      <li></li>
    </ul>
    <ul class="pop_ul3 fx">
      <li class="liuyan">留言</li>
      <li class="liuyan" :class="isVerifyYes||leaveMsg?'':'BgColor'">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="leaveMsg">
        </el-input>
        <p>200字</p>
      </li>
      <li></li>
    </ul>
    <ul class="pop_ul3 fx">
      <li>验证码</li>
      <li class="yzm fx">
        <el-input 
        :class="codeCorrect?'':'BgColor'" 
        v-model="verificationCode" 
        @blur="inputCode"
        placeholder="请输入验证码"></el-input>
        <div class="dtyzm fx" @click='createVerifyCode'>
          <span 
          v-for="(item,i) of yzmList" 
          :key="i" 
          :style="{'transform':'rotate('+item.num+'deg)'}">{{item.title}}</span>
        </div>
      </li>
      <li></li>
    </ul>
    <div class="qryy" @click="ControlPopup">确认预约</div>
  </div>
</template>

<script>
  export default {
    props:['obj','type'],
    data() {
      return {
        phone:'',
        name:'',
        leaveMsg:'',
        verificationCode:'',

        yzmList:[],   //动态验证码

        isVerifyYes:true,  //验证成功
        userInfo:{}, //用户信息

        phoneCorrect:true,
        nameCorrect:true,
        codeCorrect:true,
      }
    },
    created(){
      let userInfo = this.getItem('userInfo');
      if (userInfo) {
        this.userInfo = userInfo;
        this.phone = userInfo.user.phone;
      }
      this.createVerifyCode()
    },
    methods:{
      getList(val){

        return(val?val.split(','):[])
      },
      //验证手机号码
      inputPhone(){
        let phone = this.phone.replace(/\s*/g,"");
        if(/^1[2345678]\d{9}$/.test(phone))
          this.phoneCorrect = true
      },
      //验证姓名
      inputName(){
        let name = this.name.replace(/\s*/g,"");
        if(/^[\u4e00-\u9fa5]{2,11}$/.test(name))
          this.nameCorrect = true
      },
      //验证动态验证码
      inputCode(){
        let verificationCode = this.verificationCode.replace(/\s*/g,"");
        if(verificationCode&&verificationCode.length==4)
          this.codeCorrect = true
      },
      //生成动态验证码
      createVerifyCode(){
        let list = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L',
        'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f',
        'g','h','i','g','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        let listObj = [];
        for (let i = 0; i < 4; i++) {
          let num1 = parseInt(Math.random()*list.length);
          let num2 = parseInt(Math.random()*110-55);
          listObj.push({title:list[num1],num:num2});
        }
        this.yzmList = listObj
      },

      //确认预约
      ControlPopup:function(){
        let phone = this.phone.replace(/\s*/g,"")
        let name = this.name.replace(/\s*/g,"")
        let leaveMsg = this.leaveMsg.replace(/\s*/g,"")
        let verificationCode = this.verificationCode.replace(/\s*/g,"")
        let str = '';
        for(let o of this.yzmList){
          str+=o.title;
        }
        if(!/^1[2345678]\d{9}$/.test(phone)){
          this.phoneCorrect = false
          this.isVerifyYes = false;
          this.$message({message:'输入电话为空，或内容错误',type:'warning'})
          return
        }
        if(!/^[\u4e00-\u9fa5]{2,11}$/.test(name)){
          this.nameCorrect = false
          this.isVerifyYes = false;
          this.$message({message:'输入姓名为空，或内容错误',type:'warning'})
          return
        }
        if(!leaveMsg){
          this.isVerifyYes = false;
          this.$message({message:'输入信息为空，或内容错误',type:'warning'})
          return
        }
        if(str.toLowerCase()!==verificationCode.toLowerCase()){
          this.codeCorrect = false;
          this.isVerifyYes = false;
          this.$message({message:'验证码为格式不正确或验证码错误！',type:'warning'})
          this.createVerifyCode();
          return
        }
        let url = '/course/appOin.do';
        let IP = 3
        let data = {
          appointment:{
            appoMessage:leaveMsg, //预约消息
            userName:name,    //用户姓名
            appoPhone:phone,   //预约电话
            schoolId:this.type==='curr'?this.obj.schoolName:this.obj.teacherSchoolId,   //学校id
            appoName:this.type==='curr'?'1':'2'    //预约分类    
          },
          courseAppointment:{
            userId:this.userInfo.user.id,     //用户id
            courseId:this.obj.id    //课程id
          }
        }
        if(this.type==='teac'){
          url = '/appointment/add.do';
          IP = 5;
          delete data.courseAppointment;
          data.teacherAppointment = {
             userId:this.userInfo.user.id,     //用户id
             teacherId : this.obj.id
          }
        }
        this.fetch({url,data,method:'post'},IP).then(res=>{
          console.log(res, 7777777);
          
          let obj = res.data;
          if(obj.success){
            this.$message({message:obj.message,type:'success'})
            this.$emit('ControlPopup',false);
          }else this.$message({message:obj.message,type:'warning'})
        })
      },

      topClose(boo){
        this.$emit('ControlPopup',boo);
      }
    }
  }
</script>

<style lang="less">
.popup-app{
  width:626px;
  height:566px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(4,0,0,0.1);
  border-radius:5px;
  .pop_div1{
    padding:0 20px;
    height: 40px;
    border-bottom: 1px solid rgba(255,114,37,1);
    justify-content: space-between;
    align-items: center;
    span{
      font-size: 16px;
      color:rgba(51,51,51,1);
    }
    i{
      font-size: 16px;
      cursor: pointer;
    }
  }
  .pop_ul2{
    padding:0 20px;
    height: 30px;
    background:rgba(255,114,37,1);
    li{
      float: left;
      font-size: 14px;
      color:white;
      line-height: 30px;
    }
    li+li{
      margin-left: 10px;
    }
  }
  .pop_ul3{
    padding-top: 20px;
    justify-content: start;
    align-items: center;
    li{
      overflow: hidden;
    }
    li+li{
      margin-left: 20px;
    }
    li:first-child{
      width: 68px;
      text-align: right;
    }
    li:nth-child(2){
      width:476px;
      height:50px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(230,230,230,1);
      border-radius:5px;
      .el-textarea{
        height: 85%;
      }
      .el-input,.el-textarea__inner{
        border:0;
        height: 100%;
        width: 110%;
        font-size: 16px;
        .el-input__inner{
          border:0;
          height: 100%;
          font-size: 16px;
        }
      }

    }
    li:first-child.liuyan{
      margin-top: -90px;
    }
    li:nth-child(2).liuyan{
      width:476px;
      height:120px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(230,230,230,1);
      border-radius:5px;
      p{
        text-align: right;
        font-size: 14px;
        color:rgba(153,153,153,1);
      }
    }
    li:last-child{
      width: 16px;
      height: 16px;
      // border:1px solid red;
      border-radius: 50%;
      text-align: center;
      line-height: 16px;
      // i{
      //   color:red;
      // }
      // .iGreen{
      //   color:green;
      // }
    }
    // .liGreen{
    //   border-color:green;
    // }
    li:nth-child(2).yzm{
      border:0;
      justify-content: space-between;
      .el-input{
        margin:0;
        width:346px;
        height:50px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(230,230,230,1);
        border-radius:5px;
      }
      div{
        margin-left: 10px;
        width:120px;
        height:50px;
        background:rgba(42,176,235,1);
        border-radius:5px;
        cursor: pointer;
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
    }
    .BgColor{
      border-color: red !important;
    }
  }
  .qryy{
    margin:50px auto;
    margin-bottom: 0; 
    width:150px;
    height:40px;
    text-align: center;
    line-height: 40px;
    font-size:16px;
    color: white;
    background:rgba(42,176,234,1);
    border-radius:5px;
    cursor: pointer;
  }
}
</style>