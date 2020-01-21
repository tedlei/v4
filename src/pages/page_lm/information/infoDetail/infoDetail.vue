<template>
  <div class="infod-app">
    <p v-if="stringify(zxObj)==='{}'" class="infod_jz">正在加载……</p>
    <template v-else>
      <div class="infod_p1">
        <p class="infod_p">{{zxObj.schoolTopic}}</p>
        <p>
          <span class="info_span">作者：{{zxObj.schoolAuthor}}</span>
          <span class="info_span">发布时间：{{zxObj.schoolTime?zxObj.schoolTime.split(' ')[0]:''}}</span>
        </p>
      </div>
      <div class="infd_div1" v-html="zxObj.schoolContent"></div>
      <p class="infod_p2" 
      style="margin-top:50px;"
      :class="ltObj?'':'isNull'" 
      @click="topTz(ltObj?ltObj.id:false)">
        上一篇：
        <span>{{ltObj?ltObj.schoolTopic:'没有上一篇'}}</span>
      </p>
      <p class="infod_p2" 
      :class="gtObj?'':'isNull'" 
      @click="topTz(gtObj?gtObj.id:false)">
        下一篇：
        <span>{{gtObj?gtObj.schoolTopic:"没有下一篇"}}</span>
      </p>
    </template>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        zxObj:{},
        ltObj:{}, //上一篇
        gtObj:{},  //下一篇
      }
    },
    created(){
      this.getDataObj(''+this.$route.query.id);
    },
    methods:{
      getDataObj(id){
        let url = '/schoolMessage/getByid.do'
        this.fetch({url,data:{id},method:'post'},1).then(res=>{
          this.zxObj = res.data.at;
          this.ltObj = res.data.gt;
          this.gtObj = res.data.lt;
        })
      },

      topTz(id){
        if(!id)return
        id=''+id;
        this.push({path:'/index/information/infoDetail',query:{id}})
      },
    },
    watch:{
      $route:function(path){
        this.getDataObj(''+path.query.id); 
      }
    }
  }
</script>

<style lang="less">
.infod-app{
  width: 100%;
  padding: 20px 20px;
  .infod_jz{
    height: 300px;
    padding-top: 20px;
    text-align: center;
    font-size: 18px;
    color:#ddd;
  }
  .infod_p1{
    text-align: center;
    font-size: 24px;
    color:rgba(51,51,51,1);
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(229,229,229,1);
    .infod_p{
      overflow: hidden; //容器隐藏溢出部分
      text-overflow:ellipsis; //单行文本的溢出显示省略号
      white-space: nowrap; //文本不夸行
    }
    .info_span{
      font-size: 12px;
      color:rgba(153,153,153,1);
    }
    .info_span+.info_span{
      margin-left: 60px;
    }
  }
  .infd_div1{
    padding-top:30px; 
    width: 100%;
    height: auto;
    img{
      display: block;
      margin:10px auto;
      max-width: 846px !important;
    }
    div{
      display: inline-block;
    }
  }
  .infod_p2{
    padding-top: 10px;
    font-size: 14px;
    color:#333;
    cursor: pointer;
    span{
      color:#999;
    }
  }
  .isNull{
    cursor: no-drop;
  }
}
</style>