<template>
  <div class="det-app fx">
    <div class="det_img">
      <img :src="obj.courseImage">
    </div>
    <div class="det_right">
      <div class="fx">
        <el-tag class="tag-j tag-d boxSing" v-html="obj.courseName"></el-tag>
        <template v-if="obj.schoolCooperation">
          <el-tag class="tag-j m-l boxSing" v-for="(o,i) of zhsj(obj.schoolCooperation)" :key="i">{{o.toUpperCase()}}</el-tag>
        </template>
        <el-tag  class="tag-j m-l boxSing back" :class="isGz?'ygz':''" @click="topGz(isGz,obj.id)">{{isGz?"已关注":"+ 关注"}}</el-tag>
      </div>
      <div class="det_rou">所属学校：{{obj.organizationName}}</div>
      <div class="det_rou divColor">
        上课时间：{{obj.courseTime}} 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        课程价格：<span class="currColor">{{isYY||(obj.courseHidePrice==='0')?obj.coursePrice+"元":'预约后展示'}}
        </span>
      </div>
      <div class="det_rou divColor">上课地点：{{obj.courseOneAddress+(obj.courseOneAddress===obj.courseTwoAddress?'':obj.courseTwoAddress)+obj.courseThreeAddress+obj.courseAddress}}</div>
      <div class="det_rou divColor">学习周期：{{obj.coursePeriod}}</div>
      <div class="det_rou divColor">课程级别：{{obj.courseGrade}}</div>
      <div class="det_h">
        <el-button class="det_btn" type="primary" @click="toOnlineConsulting(obj)">在线咨询</el-button>
        <el-button class="det_btn" :class="isYY?'det_btn_bg':''" type="primary" :disabled="isYY" @click="ControlPopup(true)">
          {{!isYY?'课程预约':'已预约'}}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['obj', 'schoolUserId'],
    data() {
      return {
        isGz:false,    //是否关注
        isYY:false,    //是否预约
      }
    },
    methods:{
      zhsj(val){
        return eval(val.split(','))
      },
      /**
       * @return {boolean}
       */
      ControlPopup: function(boo){
        if(!this.isLogin()){
          this.$message({message:'请先登陆！',type:'warning'});
          return true;
        }
        this.$emit('ControlPopup',boo);
        return false;
      },

      //点击弹出聊天窗口
      toOnlineConsulting(){
        let serviceSchoolId = this.getItem('serviceSchoolId');

        if (this.ControlPopup(false)) return;

        // 如果当前为学校用户并且当前咨询为自身则拦截
        if (serviceSchoolId === this.schoolUserId) {
          this.$message({message: '无法咨询自身所属的学校！', type: 'warning'});
          return
        }

        let url = 'http://192.168.3.87:8080/#/onlineConsulting?category=3&id=' + this.obj.schoolId,
            name = 'newWindow',
            configuration = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no," +
                    "width=626,height=500,left=100,top=100";
        
        window.open(url, name, configuration);
      },

      //点击关注时
      topGz(boole,id){
        if(boole)return
        let userInfo = this.getItem("userInfo");
        if(!userInfo){
          this.$message({message:'需要登录后在进行关注！',type:'warning'});
          return;
        }
        let url = "/course/follow.do";
        let data={curseId:id,userId:userInfo.user.id};
        this.fetch({url,data,method:'post',},3).then(res=>{
          if(res.data.success) {
            this.isGz = true;
            this.$message({message:res.data.message,type:'success'})
          }
        })
      },

      //查询课程是否关注
      setchGz(id){
        let userInfo = this.getItem("userInfo");
        if(!userInfo)return;
        let url = "/course/findByFollow.do?userid="+userInfo.user.id+"&curseid="+id;
        this.fetch({url,method:'get',},3).then(res=>{
          this.isGz = res.data.success;
        })
      },

      //查询课程是否预约
      setchYy(id){
        let userInfo = this.getItem("userInfo");
        if(!userInfo)return;
        let url = "/course/findByAppOin.do?userId="+userInfo.user.id+"&curseId="+id;
        this.fetch({url,method:'get',},3).then(res=>{
          this.isYY = res.data;
        })
      },
    },
    watch: {
      "obj":function(val){
        this.setchGz(val.id);
        this.setchYy(val.id);
      }
    },
  }
</script>

<style lang="less">
.det-app{
  width: 100%;
  flex-direction: row;
  .det_img{
    width:400px;
    height:280px;
    background:rgba(230,230,230,1);
    border-radius:5px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .det_right{
    margin-left: 30px;
    flex-grow: 1;
    div{
      flex-direction: row;
      align-items: center;
      .tag-j{
        border:0;
        width:auto;
        height: 26px;
        line-height: 26px;
        text-align: center;
        background:rgba(255,228,214,1);
        border-radius:3px;
        font-size: 14px;
        color:rgba(255,114,37,1);
      }
      .tag-d{
        margin-right: 10px;
        padding:0;
        font-size: 20px;
        color:#333;
        background: none;
        text-align: left;
      }
      .m-l{
        margin-left: 20px;
      }
      .back{
        background:var(--colMain);
        color: white;
        cursor: pointer;
      }
      .back:hover{
        opacity: 0.7;
      }
      .ygz{
        background:rgba(230,230,230,1);
        color:rgba(153,153,153,1);
        cursor:default;
      }
    }
    .det_rou{
      display: block;
      margin-top:14px;
      height: 20px;
      font-size: 14px;
      color:rgba(51,51,51,1);
      text-decoration: none;
    }
    .divColor{
      color:rgba(102,102,102,1);
      .currColor{
        color: var(--colMain);
      }
    }
    .det_h{
      margin-top:44px;
      .el-button+.el-button{
        margin-left: 30px;
      }
      .det_btn,.det_btn:hover{
        background: var(--colMain);
        border-color: var(--colMain);
      }
      .det_btn:hover{
        opacity: 0.8;
      }
      .det_btn_bg,.det_btn_bg:hover{
        background: #aaa ;
        border-color:#aaa;
      }
    }
  }
}
</style>