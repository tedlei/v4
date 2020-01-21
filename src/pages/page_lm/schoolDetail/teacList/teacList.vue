<template>
  <div class="teac-app">
    <ul class="div_left fx" v-if="teacherList.length>0">
      <li v-for="(item,i) of teacherList" :key="i" class="teac_li boxSing" @click="topTeac(item.id)">
        <div class="teac_img">
          <img :src="item.teacherImage" alt="正在加载……">
        </div>
        <div class="teac_r_div">
          <p class="teac_p1">{{item.teacherName}}</p>
          <p class="teac_p2">毕业院校：{{item.teacherSchool}}</p>
          <p class="teac_p2">擅长学科：<span v-for="(it,i) of getxk(item.teacherAdept)" :key="i" class="teac_p_span">{{it}}</span>
          </p>
          <div class="teac_div1">
            教师寄语：{{item.teacherIntro}}
          </div>
        </div>
      </li>
    </ul>
    <div class="div_left teac_div_text" v-else>暂无数据</div>
    <div class="div_right">
      <intro class="child_d1" :obj="teacObj"></intro>
      <schColList title="学校课程" @getCurrListData="getCurrListData" class="child_d1 child_d2" :list="schoolCurrList"></schColList>
    </div>
  </div>
</template>

<script>
import intro from '@/pages/page_lm/public/intro'
import schColList from '@/pages/page_lm/public/schColList'
  export default {
    props:['teacObj'],
    components:{intro,schColList},
    data() {
      return {
        teacherList:[],   //教师列表
        schoolCurrList:[],   //课程列表    
      }
    },
    created(){
      this.getTeacherList();
      this.getData();
    },
    methods:{
      topTeac:function(id){
        this.$router.push({path:'/schoolDetail/teacDetail',query:{id:this.$route.query.id,num:2,teacId:id}});
      },

      //获取教师列表
      getTeacherList(){
        scrollTo({top: 0,behavior: "smooth"});  //滑动到网页顶部
        let url = '/teacher/select.do';
        this.fetch({url,data:{schoolid:this.$route.query.id},method:'post'},1).then(res=>{
          this.teacherList = res.data;
        })
      },

       //获取课程详情'相似课程推荐'和'学校其他课程'的数据
      getData(){
        let url="curri/searchname.do";
        let data = {schoolId:this.teacObj.id,name:'',address:''}
        this.fetch({url,data,method:'post'},1).then(res=>{
          this.addValue(res.data);
        })
      },

      //随机课程
      addValue(obj){
        for (let index = 0; index < 10; index++) {
          let num = parseInt(Math.random()*obj.length);
          this.schoolCurrList.push(obj[num]);
        }
      },

      //跳转
      getCurrListData(id){
        this.push({
          path:'/schoolDetail/currDetail',
          query:{
            id:this.$route.query.id,
            currId:id,
            num:1
          }
        })
      },

      getxk(str){
        return str.split(',')
      }
    }
  }
</script>

<style lang="less">
.teac-app{
  margin: auto;
  width: 1200px;
  .div_left{
    float: left;
    width: 886px;
    min-height: 200px;
    flex-wrap: wrap;
    justify-content: space-between;
    .teac_li{
      margin-top:20px;
      width: 433px;
      padding:10px;
      background-color: white;
      border-radius:5px;
      cursor: pointer;
      .teac_img{
        float: left;
        width:140px;
        height:180px;
        overflow: hidden;
        background:rgba(230,230,230,1);
        border-radius:5px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .teac_r_div{
        float: right;
        width: 248px;
        padding-top: 14px; 
        .teac_p1{
          font-size: 20px;
          color:rgba(51,51,51,1);
        }
        .teac_p2{
          margin-top:15px;
          font-size:14px;
          color:rgba(102,102,102,1);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .teac_p_span+.teac_p_span{
            margin-left: 10px;
          }
        }
        .teac_div1{
          height: 60px;
          margin-top: 10px;
          font-size: 14px;
          color:#999999;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          span{
            color:#666;
          }
        }
      }
    }
  }
  .teac_div_text{
    text-align: center;
    line-height: 300px;
    color:#666;
  }
  .div_right{
    padding-top: 20px;
    float: right;
    width: 293px;
    min-height: 200px;
    .child_d1{
      padding:20px;
      height: 345px;
      background-color: white;
      border-radius: 5px;
      .tar_divl>div:first-child{
        background: linear-gradient(to left, #FF7225, #fff );
      }
      .tar_divl>div:last-child{
        background: linear-gradient(to left, #fff, #FF7225 );
      }
    }
    .child_d2{
      margin-top: 60px;
    }
  }
}
</style>