<template>
  <div class="atl-app">
    <ul class="atl_ul">
      <li class="atl_li" v-for="(item,i) of attentionList" :key="i">
        <template v-if="item">
          <div class="atl_li_img" 
          :class="(type*1===1&&activeName==='3')||(type*1===2&&activeName==='2')?'atl_teac':''"
           @click="topRouter(item.id,activeName,type)">
            <img :src="imageUrl(item,activeName,type)" alt="正在加载……">
          </div>
          <div class="atl_div">
            <div class="atl_span">
              <p class="p1">{{isShowName(item,activeName,type)}}</p>
              <p class="p2">{{isShowSchool(item,activeName,type)}}</p>
            </div>
            <el-button class="atl_btn" v-if="type*1===1" type="info" @click="cancelGz(item.id,activeName)">
              取消关注
            </el-button>
            <el-button class="atl_btn" v-else type="info" @click="cancelYy(item.id,activeName,i)">
              取消预约
            </el-button>
          </div>
        </template>
      </li>
    </ul>
    
  </div>
</template>

<script>
  export default {
    props:['attentionList',"type","activeName"],
    data () {
      return {
        // teacherTheir:''   教师所属学校
      }
    },
    methods:{
      //取消关注
      cancelGz(id,activeName){
        let userInfo = this.getItem('userInfo')
        let userid = userInfo.user.id
        let url = '';
        let data = {};
        let method = 'post';
        let IP = 1
        if(activeName==='1'){
          url = '/course/deLeFollow.do';
          data ={userid:userid,curseid:id}
          method = 'get';
          IP=3;
        }
        if(activeName==='2'){
          url = '/attention/delete.do'
          data = {userid,schoolid:id};
          IP = 4;
        }
        if(activeName==='3'){
          url ='/addTeacher/delete.do'
          data = {userid,teacherid:id};
          IP=5;
        }
        this.fetch({url,data,method},IP).then(res=>{
          if(res.data.success){
            this.$message({message:res.data.message,type:'success'})
            if(activeName==='1')this.$emit('searchKc');
            else if(activeName==='2'||activeName==='3')this.$emit('searchXX',activeName*1-1);
          }else this.$message({message:res.data.message,type:'warning'})
        })
      },

      //取消预约
      cancelYy(id,activeName,num){
        let userInfo = this.getItem('userInfo')
        let userid = userInfo.user.id
        let url = '/course/deLeAppOin.do';
        let data = {userId:userid,courseId:id};
        let method = 'post';
        let IP = 3
        if(activeName*1===2){
          url = '/appointment/curriCancel.do';
          method = 'post';
          IP=5;
          data = {userid,teacherid:id}
        }
        this.fetch({url,data,method},IP).then(res=>{
          if(res.data.success){
            this.$message({message:res.data.message,type:'success'})
            this.$emit('deleteList',num);
          }else this.$message({message:res.data.message,type:'warning'})
        })
      },

      //图片路劲
      imageUrl(item,activeName,type){
        if(activeName==='1') return item.courseImage
        if(type*1 === 1){
          if(activeName==='2') return item.schoolImage
          if(activeName==='3') return item.teacherImage
        }else{
          if(activeName==='1') return item.courseImage
          if(activeName==='2') return item.teacherImage
        }
      },
      
      //是否显示价格
      isShowSchool(item,activeName,type){
        if(activeName==='1') return '价格：'+item.coursePrice+'元';
        if(activeName==='2'){
          return type*1 === 1?'课程数量:'+item.subjectNum:item.teacherName;
        }
      },

      //显示名称
      isShowName(item,activeName,type){
      if(activeName==='1') return item.courseName;
        if(type*1 === 1){
          if(activeName==='2') return item.organizationName;
          if(activeName==='3') return item.teacherName;
        }else{
          if(activeName==='2') return item.organizationName;
        }
      },

      //跳转到详情
      topRouter(id,activeName,type){
        let url = ''
        if(activeName==='1') url = '/index/curriculum/curriculumDetail'
        if(type*1 === 1){
          if(activeName==='2') url = '/schoolDetail'
          if(activeName==='3') url = '/index/teacher/teacherDetail'
        }else{
          if(activeName==='2') url = '/index/teacher/teacherDetail'
        }
        this.push({path:url,query: {id}});
      }
    }
  }
</script>

<style lang="less">
.atl-app{
  width: 100%;
  padding-left:40px;
  padding-right: 40px; 
  .atl_ul{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // justify-content: space-between;
    .atl_li{
      margin-left: 26px;
      width: 262px;
      padding-bottom: 30px;
      .atl_li_img{
        display: block;
        width: 262px;
        height:206px;
        background:rgba(230,230,230,1);
        border:1px solid #e6e6e6;
        border-radius:5px;
        overflow: hidden;
        cursor: pointer;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .atl_teac{
        margin:auto;
        width: 220px;
        height: 280px;
      }
      .atl_div{
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .atl_span{
          flex-grow: 1;
          .p1{
            width: 160px;
            font-size: 14px;
            color:rgba(51,51,51,1);
            overflow: hidden;
            text-overflow:ellipsis; 
            white-space: nowrap; 
          }
          .p2{
            margin-top: 5px;
            font-size: 12px;
            color:rgba(255,114,37,1);
          }
        }
        .atl_btn{
          margin-top: 5px;
          padding:0;
          width:72px;
          height:30px;
          border:0;
          background:rgba(230,230,230,1);
          border-radius:3px;
          font-size: 12px;
          color:#999;
        }
        .atl_btn:hover{
          background: #ddd;
        }
      }
    } 
    .atl_li:nth-child(3n-2){
      margin-left: 0;
    }
  }
}
</style>