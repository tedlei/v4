<template>
  <div class="reco-app" v-if="recoList.length>0">
    <div class="reco_div">课程推荐</div>
    <ul class="reco_ul fx">
      <li class="reco_li boxSing" v-for="(item,i) of recoList" :key="i" @click="toptz(item.id)">
        <div class="recoLiLeft">
          <img style="width:100%;height:100%;" :src="item.courseImage" alt="正在加载……">
        </div>
        <div class="recoLiRight">
          <div class="reco_lg1 color333">{{item.courseName}}</div>
          <div class="reco_lg1">
            <span style="color:#333;">课程报价：</span>{{item.courseHidePrice==='0'||item.courseCategory*1!==0?item.coursePrice+"元":'预约后展示'}}</div>
          <div class="reco_lg2">
            <p></p>
            <p class="reco_p">
              <span style="color:#333;">课程简介：</span>{{item.courseText?item.courseText:'暂无课程简介'}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:['teacObj'],
    data() {
      return {
        recoList:[]
      }
    },
    created(){
      let id = this.teacObj.id
      if(id) this.getCurrList(id);
    },
    methods:{
      //获取推荐课程列表
      getCurrList(id){
        let url = '/curri/schoolList.do';
        let data = {schoolId:id}
        this.fetch({url,data,method:'get'},1).then(res=>{
          this.recoList = res.data.splice(0,4);
        })
      },

      //跳转到课程详情
      toptz(id){
        this.push({path:"/schoolDetail/currDetail",query:{id:this.$route.query.id,num:1,currId:id}})
      }
    },
    watch:{
      "teacObj":function(val){
        this.getCurrList(val.id);
      }
    }
  }
</script>
<style lang="less" scoped>
.reco-app{
  margin:auto; 
  width: 1200px;
  .reco_div{
    font-size: 22px;
    color:rgba(51,51,51,1);
  }
  .reco_ul{
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:space-between;
    .reco_li{
      margin-top:20px;
      width: 590px;
      padding:10px 10px;
      background-color: white;
      border-radius: 5px;
      cursor: pointer;
      .recoLiLeft{
        float: left;
        width:280px;
        height:206px;
        background:rgba(230,230,230,1);
        border-radius:5px;
        overflow: hidden;
      }
      .recoLiRight{
        width:280px;
        padding-top:10px;
        padding-left: 10px;
        float: right;
        .reco_lg1{
          padding-bottom: 25px;
          font-size: 16px;
          color:rgba(102,102,102,1);
        }
        .color333{
          color: #333;
          font-size: 18px;
          font-weight: 600;
          overflow: hidden;
          text-overflow:ellipsis; //单行文本的溢出显示省略号
          white-space: nowrap; //文本不夸行
        }
        .reco_lg2{
          color:rgba(102,102,102,1);
            font-size: 16px;
          .reco_p{
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: 24px;
            padding-right: 10px;
            height: 98px;
          }
        }
      }
    }
  }
}
</style>