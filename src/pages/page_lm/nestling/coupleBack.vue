<template>
  <div class="app-cb">
    <div class="cb_div fx">
      <span class="cb_span">*<span>标题 :</span></span>
      <input class="cb_input" v-model="headline" type="text" >
      <span class="cb_span1">（注：6-20个字）</span>
    </div>
    <div class="cb_div fx">
      <span class="cb_span">*<span>内容 :</span></span>
      <textarea class="cb_textarea" v-model="content"></textarea>
      <span class="cb_span1">（注：10-200个字）</span>
    </div>
    <div class="cb_div fx">
      <span class="cb_span">*<span>手机号 :</span></span>
      <input class="cb_input" type="number" v-model="phone">
      <span class="cb_span1"></span>
    </div>
    <div class="cb_div fx">
      <span class="cb_span">*<span>验证码 :</span></span>
      <div class="cb_div_input">
        <input type="text" v-model="yzm">
        <div @click="createVerifyCode">
          <span 
          v-for="(item,i) of yzmList" 
          :key="i" 
          :style="{'transform':'rotate('+item.num+'deg)'}">{{item.title}}</span>
        </div>
      </div>
      <span class="cb_span1"></span>
    </div>
    <div class="cb_div fx">
      <span class="cb_span"><span></span></span>
      <div class="cb_div_input">
        <button @click="topCommit">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      headline:'',   //标题
      content:'',    //内容
      phone:'',
      yzm:'',    

      yzmList:[],  //动态验证码
    };
  },



  created() {
    this.createVerifyCode();
  },

  methods: {
    //生成动态验证码
    createVerifyCode(){
      let list = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L',
      'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f',
      'g','h','i','g','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
      // let str = '';
      let listObj = [];
      for (let i = 0; i < 4; i++) {
        let num1 = parseInt(Math.random()*list.length);
        let num2 = parseInt(Math.random()*110-55);
        // str += list[num1];
        listObj.push({title:list[num1],num:num2});
      }
      // this.dtyzm=str
      this.yzmList = listObj
    },

    //提交问题反馈
    topCommit(){
      let problemTitle = this.headline;
      let problemContent = this.content;
      let problemPhone = this.phone;
      let yzm = this.yzm
      let [f1,f2,f3,f4] = this.yzmList
      let fyzm = f1.title+f2.title+f3.title+f4.title;
      let url = '/addProblem/saveProblem.do';
      let data = {
        problemTitle,
        problemContent,
        problemPhone
      }
      if(problemTitle.length<6||problemTitle.length>20){
        this.$message({message:'标题内容过多或过少,请输入6-20个字符',type:'warning'})
        return
      }
      if(!problemContent){
        this.$message({message:'标题内容过多或过少,请输入10-200个字符',type:'warning'})
        return
      }
      if(problemPhone.length<11||!problemPhone){
        this.$message({message:'输入手机号为空或格式不正确',type:'warning'})
        return
      }
      if(yzm.toUpperCase()!==fyzm.toUpperCase()){
        this.$message({message:'动态验证码为空,或格式不正确',type:'warning'})
        this.yzm = '';
        this.createVerifyCode();
        return
      }
      this.fetch({url,data,method:'post'},2).then(res=>{
        let {message,success} = res.data;
        if(success){
          this.headline=''
          this.content=''
          this.phone=''
          this.yzm=''
          this.createVerifyCode();
        }
        this.$message({message,type:success?'success':'warning'})
      })
    }
  }

}

</script>

<style lang='less' scoped>
.app-cb{
  width: 100%;
  padding-bottom: 30px;
  .cb_div{
    margin-top: 30px;
    align-items: center;
    .cb_span{
      width: 120px;
      color: red;
      text-align: right;
      span{
        margin-left: 5px;
        font-size: 18px;
        color:#666666;
      }
    }
    .cb_input{
      margin:0 30px;
      padding-left: 10px;
      width:500px;
      height:50px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(230,230,230,1);
      border-radius:5px;
      font-size: 16px;
      color:rgba(153,153,153,1);
      outline:none;
    }
    .cb_input::-webkit-outer-spin-button,
    .cb_input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .cb_input[type="number"]{
        -moz-appearance: textfield;
    }
    .cb_textarea{
      margin:0 30px;
      padding-top: 10px;
      padding-left: 10px;
      width:500px;
      height:200px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(230,230,230,1);
      border-radius:5px;
      resize:none;
      outline:none;
    }
    .cb_span1{
      font-size: 14px;
      color:rgba(153,153,153,1);
    }
    .cb_div_input{
      margin:0 30px;
      width:512px;
      input{
        padding-left: 10px;
        float: left;
        width:350px;
        height:50px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(230,230,230,1);
        border-radius:5px;
        outline:none;
      }
      div{
        float: right;
        width:120px;
        height:50px;
        background:rgba(253,129,9,1);
        border-radius:5px;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        color: white;
        cursor: pointer;
        span+span{
          margin-left: 5px;
          display: inline-block;
        }
      }
      button{
        width:120px;
        height:50px;
        background:rgba(253,129,9,1);
        border-radius:5px;
        border:0;
        outline:none;
        color: white;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
}
</style>