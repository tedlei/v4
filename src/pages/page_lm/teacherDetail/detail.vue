<template>
  <div>
    <div class="tdet-app fx">
      <div class="tdet_img">
        <img :src="obj.teacherImage" alt="正在加载……">
      </div>
      <div class="tdet_right fx">
        <div class="fx">
          <el-tag class="tag-j tag-d boxSing">
            {{obj.teacherName}}
          </el-tag>
          <el-tag 
          class="tag-j m-l boxSing back" 
          :class="isGz?'ygz':''" 
          @click="topGz(obj.id,isGz)">{{!isGz?'+ 关注':'已关注'}}</el-tag>
        </div>
        <a class="tdet_rou" href='http://www.baidu.com'>所属学校：{{obj.organizationName}}</a>
        <div class="tdet_rou divColor">教龄：{{obj.teacherAge}}</div>
        <div class="tdet_rou divColor">毕业学校：{{obj.teacherSchool}}</div>
        <div class="tdet_rou divColor">
          授课内容：{{obj.teacherAdept}}
        </div>
        <div class="tdet_rou divColor tdet_widht">教师寄语：{{obj.teacherIntro}}</div>
        <div class="tdet_h">
          <el-button class="tdet_btn" type="primary" :disabled="seachIsYy" plain @click="ControlPopup(true)">
            {{seachIsYy?'已预约':'预约联系'}}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['obj'],
    data() {
      return {
        isGz:false,
        seachIsYy:false,
        userInfo:{},
      }
    },
    created(){
      let userInfo = this.getItem('userInfo');
      if(userInfo) this.userInfo = userInfo;
    },
    methods:{
      ControlPopup:function(boo){
        if(JSON.stringify(this.userInfo)==="{}"){
          this.$message({message:'请登录后在预约！',type:'warning'})
          return 
        }
        this.$emit('ControlPopup',boo);
      },

      //加关注
      topGz(teacherid,isGz){
        if(isGz)return
        if(JSON.stringify(this.userInfo)==="{}"){
          this.$message({message:'需要登录后在进行关注！',type:'warning'});
          return;
        }
        let userid = this.userInfo.user.id;
        let url = '/addTeacher/add.do'
        this.fetch({url,data:{userid,teacherid},method:'post'},5).then(res=>{
          if(res.data)this.isGz = res.data;
          else this.$message({message:'关注失败，请重新关注！',type:'warning'});
        })
      },
       //查询是否关注
      setchIsGz(teacherid){
        if(JSON.stringify(this.userInfo)==="{}") {
          this.isGz = false;
          return
        }
        let userid = this.userInfo.user.id;
        let url = '/addTeacher/findByfollow.do';
        this.fetch({url,data:{userid,teacherid},method:'post'},5).then(res=>{
          this.isGz = res.data.success;
        })
      },

      //查询是否预约
      isYy(teacherid){
        if(JSON.stringify(this.userInfo)==="{}") {
          this.seachIsYy = false;
          return
        }
        let url = '/appointment/select.do';
        let data = {userid:this.userInfo.user.id,teacherid};
        this.fetch({url,data,method:'post'},5).then(res=>{
          this.seachIsYy = res.data;
        })
      }
    },
    watch: {
      'obj':function(val){
        this.setchIsGz(val.id);
        this.isYy(val.id);
      }
    },
  }
</script>

<style lang="less">
.tdet-app{
  width: 100%;
  flex-direction: row;
  div.tdet_img{
    width:220px;
    height:280px;
    background:rgba(230,230,230,1);
    border-radius:5px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .tdet_right{
    margin-left: 30px;
    flex-grow: 1;
    flex-direction: column;
    div{
      flex-direction: row;
      align-items: center;
      .tag-j{
        border:0;
        height: 26px;
        line-height: 28px;
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
        color:white;
        cursor: pointer;
      }
      .back:hover{
        opacity: 0.8;
      }
      .ygz{
        background: #e6e6e6;
        color: #999999;
        cursor: default;
      }
    }
    .tdet_rou{
      display: block;
      margin-top:14px;
      height: 20px;
      font-size: 14px;
      color:rgba(51,51,51,1);
      text-decoration: none;
      .teac_p_span+.teac_p_span{
        margin-left: 10px;
      }
    }
    .tdet_h{
      margin-top: 7px;
      .tdet_btn{
        background: var(--colMain);
        color: white;
        border-color: var(--colMain);
      }
      .tdet_btn:hover{
        opacity: 0.8;
      }
    }
    .divColor{
      color:rgba(102,102,102,1);
    }
    div.tdet_widht{
      flex: 1;
      width: 914px;
      max-height: 60px;
      // display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
}
</style>