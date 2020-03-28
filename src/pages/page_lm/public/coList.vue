<template>
  <div class="coLits-app">
    <ul class="coList_ul">
      <li class="col_li fx" v-for="(item,i) of curriculumList" :key="i" @click="topList(item.id,i)">
        <div class="col_image" :class="listType==='teacher'||listType==='teacList'?'wihe':''">
          <img v-lazy="val6(item,listType)" >
        </div>
        <div class="col_center" :class="listType==='teacher'||listType==='teacList'?'mar':''">
          <div class="fx">
            <el-tag class="tag-j tag-d boxSing" v-html="val5(item,listType)"></el-tag>
            <template v-if="item&&item.schoolCooperation">
              <template v-for="(o,i) of zhsj(item.schoolCooperation)">
                <div class="tag-j m-l boxSing" v-if="o!=='vip'&&o!=='svip'" :key="i+'div'">{{o}}</div>
                <div class="col_bgImg" v-else :key="i+'img'">
                  {{o==='vip'?'VIP':'SVIP'}}
                </div>
              </template>
            </template>
          </div>
          <div class="col_price">
            {{val1(item,listType)}}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {{val2(item,listType)}}
          </div>
          <div class="col_price">
            <p>{{val3(item,listType)}}</p>
          </div>
          <div class="col_price" v-if="listType==='teacher'">
            授课内容:&nbsp;&nbsp;{{item.teacherAdept}}
          </div>
          <div class="col_price">
            <p v-if="listType==='school'">{{'学校简介:&nbsp;&nbsp;'+val4(item,listType)}}</p>
            <p v-else>{{val4(item,listType)}}</p>
          </div>
        </div>
        <el-button v-if="listType==='curriculum'">查看详情</el-button>
        <div v-if="listType!=='curriculum'" class="ckgd" :class="listType==='teacher'?'ckMargin':''">【查看更多】</div>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    props:["curriculumList","listType","currId"],
    data() {
      return {
      }
    },
    methods:{
      zhsj(val){
        return eval(val.split(','))
      },

      topList:function(id){
        if(id===this.currId){
          scrollTo({top: 0,behavior: "smooth"});  //滑动到网页顶部
          return
        }
        let listType = this.listType;
        let str = '';
        let query = {id}
        switch(listType){
          case 'curriculum': str = '/index/curriculum/curriculumDetail';
          break;
          case 'school': str = '/schoolDetail';
          break;
          case 'teacher': str = '/index/teacher/teacherDetail';
          break;
          case 'currList': 
            str = '/schoolDetail/currDetail';
            query = {id:this.$route.query.id,num:1,currId:id}
          break;
          case 'teacList': 
            str = '/schoolDetail/teacDetail';
            query = {id:this.$route.query.id,num:1,teacId:id}
        }
        this.$router.push({path:str,query})
      },
    },
    computed: {
      val1:function(){
        return function(item,listType){
          let str = '';
          if(!item) return
          switch(listType){
            case 'curriculum': str = '课程价格：'+ (item.courseCategory!=='0'||item.courseHidePrice==='0'?item.coursePrice+"元":'预约后展示');
            break;
            case 'school': str ='在售课程数：'+item.subjectNum;    
            break;
            case 'teacher': str = '所属学校：'+item.organizationName;
            break;
            case 'teacList': str = '所属学校：'+item.organizationName;
            break;
            case 'currList': str = '上课时间：'+item.courseTime;
            break;
          }
          return str;
        } 
      },
      val2:function(){
        return function(item,listType){
          let str = '';
          if(!item) return
          switch(listType){
            case 'school': str ='学校教师数：'+(item.schoolTeacher?item.schoolTeacher:0);    
            break;
            case 'currList': str ='课程价格：'+(item.courseHidePrice==='0'||item.courseCategory*1!==0?item.coursePrice+"元":'预约后展示');
            break;
          }
          return str;
        } 
      },
      val3:function(){
        return function(item,listType){
          let str = '';
          if(!item) return
          switch(listType){
            case 'curriculum': str = '课程所属学校：'+item.organizationName;
            break;
            case 'school': str ='学校地址：'+item.schoolAddress;
            break;
            case 'teacher': str = '教学年龄：'+item.teacherAge;     //没有年龄
            break;
            case 'teacList': str = '教学年龄：'+item.teacherAge;     //没有年龄
            break;
            case 'currList': str = '学习周期：'+item.coursePeriod;
            break;
          }
          return str;
        } 
      },
      val4:function(){
        return function(item,listType){
          
          let str = '';
          if(!item) return
          switch(listType){
            case 'curriculum': str = '课程简介：'+(item.courseText?item.courseText:'暂无课程简介');
            break;
            case 'school': str = item.schoolText?item.schoolText:'暂无学校简介';   //修改后的
            break;
            case 'teacher': str = "教学寄语："+item.teacherIntro;    //没有
            break;
            case 'teacList': str = "教学经历："+item.teacherIntro;    //没有
            break;
            case 'currList': str = '教学目标：'+item.courseTarget;
            break;
          }
          return str;
        } 
      },
      val5:function(){
        return function(item,listType){
          let str = '';
          if(!item) return
          switch(listType){
            case 'curriculum': str = item.courseName;
            break;
            case 'school': str = item.organizationName;
            break;
            case 'teacher': str =item.teacherName; 
            break;
            case 'teacList': str =item.teacherName; 
            break;
            case 'currList': str = item.courseName;   //没有
            break;
          }
          return str;
        } 
      },
      val6:function(){
        return function(item,listType){
          let str = '';
          if(!item)return
          switch(listType){
            case 'curriculum': str = item.courseImage;
            break;
            case 'school': str = item.schoolImage;
            break;
            case 'teacher': str = item.teacherImage;  
            break;
            case 'teacList': str = item.teacherImage;  
            break;
            case 'currList': str = item.courseImage;  
            break;
          }
          str = str?str:'../../../../public/images/currImg.jpg';
          console.log(str)
          return str;
        } 
      },
    },
  }
</script>

<style lang="less">
.coLits-app{
  width: 100%;
  .coList_ul{
    width: 100%;
    .col_li{
      flex-direction: row;
      align-items: center;
      width: 100%;
      padding:19px 30px;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(230,230,230,1);
      cursor: pointer;
      .col_image{
        width: 170px;
        height: 120px;
        background-color: rgba(230,230,230,1);
        border:1px solid #e6e6e6;
        border-radius:5px;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .wihe{
        width:140px;
        height:180px;
      }
      .col_center{
        flex-grow: 1;
        padding-left: 20px;
        div{
          flex-direction: row;
          align-items: center;
          .tag-j{
            padding:0 10px;
            width:auto;
            height: 26px;
            border:0;
            line-height: 28px;
            text-align: center;
            background:rgba(255,228,214,1);
            border-radius:3px;
            font-size: 14px;
            color:rgba(255,114,37,1);
          }
          .tag-d{
            max-width: 346px;
            margin-right: 10px;
            padding:0;
            font-size: 20px;
            color:#333;
            background: none;
            text-align: left;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .m-l{
            margin-left: 20px;
          }
          .col_bgImg{
            margin-left: 20px;
            width: 46px;
            height: 26px;
            border-radius: 5px;
            background-color: var(--colMain);
            opacity: 0.8;
            text-align: center;
            line-height: 26px;
            color: white;
            font-size: 12px;
          }
        }
        .col_price{
          margin-top:10px;
          height: 20px;
          width: 500px;
          font-size: 14px;
          color:rgba(102,102,102,1);
          .col_span+.col_span{
            margin-left: 10px;
          }
          p{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
      .mar>.col_price{
        margin-top:19px;
      }
      .el-button{
        width:118px;
        background:rgba(255,255,255,1);
        border:1px solid var(--colMain);
        border-radius:5px;
        font-size: 14px;
        color:var(--colMain);
      }
    }
    .col_li:hover{
      background: #fff9f4;
      .tag-d{
        color: var(--colMain) !important;
      }
    }
    .ckgd{
      margin-top:93px;
      font-size: 14px;
      color:var(--colMain);
      cursor: pointer;
    }
    .ckMargin{
      margin-top:161px;
    }
  }
}
</style>