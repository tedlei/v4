<template>
  <ul class="cou_ul_list fx">
    <li class="cou_ul_li boxSing" v-for="(item,i) of obj" :key="i">
      <div class="cou_div">
        <span class="sp_left fontStyle">{{item.discount}}元课程优惠券</span>
        <span class="sp_right fontStyle">{{item.pClass===1?'通用券':'专用券'}}</span>
      </div>
      <div class="cou_span_style fontStyle">满{{item.expireMoney}}元使用</div>
      <div class="cou_span_style fontStyle">有效日期至：{{item.validDate}}</div>
      <div class="cou_span_style fontStyle">学校：{{item.school}}</div>
      <router-link class="cuo_router fontStyle" to="/">下载APP使用优惠券</router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    props:['obj'],
    data() {
      return {
        
      }
    },
  }
</script>

<style lang="less" scoped>
.fontStyle{
  font-size: 14px;
  color:rgba(51,51,51,1);
}
.cou_ul_list{
    padding-top:20px;
    flex-direction: row;
    flex-wrap: wrap;
    .cou_ul_li{
      margin-top: 20px;
      width:262px;
      padding: 24px 20px 20px 20px;
      background:rgba(230,230,230,1);
      border-radius:5px;
      .cou_div{
        width: 100%;
        height: 20px;
        .sp_left{
          float: left;
        }
        .sp_right{
          float: right;
          font-size: 20px;
        }
      }
      .cou_span_style{
        height: 20px;
        margin-top: 15px;
      }
      .cuo_router{
        margin-top: 15px;
        height: 20px;
        font-size: 14px;
        color:#2AB0EA;
        text-decoration: none;
        float: right;
      }
    }
    li:not(:nth-child(3n+1)){
      margin-left: 27px;
    }
  }
</style>