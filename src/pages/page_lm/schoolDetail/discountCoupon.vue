<template>
  <div class="dico-app">
    <div class="schbody_div1">
      领取优惠券
    </div>
    <div class="sch_tyj" v-if="tyjList.length>0">
      <p class="sch_p1">通用券</p>
      <ul class="sch_ul fx">
        <li class="sch_li boxSing" v-for="(obj,i) of tyjList" :key="i">
          <couponDetail :isGz="isGz" :obj="obj"></couponDetail>
          <!-- <p>{{obj.couponPrice}}元通用券</p>
          <p>{{showPic(obj)}}</p>
          <p>有效日期至：{{obj.createTime.split(' ')[0]}}</p>
          <p >点击领取</p> -->
        </li>
      </ul>
    </div>
    <div class="sch_tyj" v-if="zyjList.length>0">
      <p class="sch_p1">学校专业券</p>
      <ul class="sch_ul fx">
        <li class="sch_li boxSing" v-for="(obj,i) of zyjList" :key="i">
          <couponDetail :isGz="isGz" :obj="obj"></couponDetail>
          <!-- <p>{{obj.couponPrice}}元通用券</p>
          <p>{{showPic(obj)}}</p>
          <p>有效日期至：{{obj.createTime.split(' ')[0]}}</p>
          <p>点击领取</p> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import couponDetail from '../../../components/component_lm/couponDetail'
  export default {
    components:{couponDetail},
    props:['isGz'],
    data() {
      return {
        tyjList:[],   //通用卷列表
        zyjList:[],    //专用卷列表
      }
    },
    created(){
      this.getCoupon(this.$route.query.id)
    },
    methods:{
      //获取优惠卷列表
      getCoupon(schoolId){
        this.tyjList = [];
        this.zyjList = [];
        let url = 'coup/findByCoupon.do';
        this.fetch({url,data:{schoolId},method:'get'},4).then(res=>{
          if(res.data.length>0){
            this.yhjClassify(res.data);
          }
        })
      },

      //优惠卷分类
      yhjClassify(arr){
        for(let item of arr){
          if(item.isUniversal==='1') this.tyjList.push(item);
          else this.zyjList.push(item)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.dico-app{
  margin: auto;
  width: 1200px;
  .schbody_div1{
    margin: 40px auto;
    margin-bottom: 0;
    width:1200px;
    height:100px;
    background:rgba(204,204,204,1);
    border-radius:5px;
    text-align: center;
    line-height: 100px;
    font-size: 24px;
    color:rgba(51,51,51,1);
  }
  .sch_tyj{
    padding-top: 30px;
    .sch_p1{
      text-align: center;
      font-size: 22px;
      color:rgba(51,51,51,1);
    }
    .sch_ul{
      width: 100%;
      flex-wrap: wrap;
      .sch_li{
        margin-top: 20px;
        padding:0 20px;
        width:380px;
        height:235px;
        background:rgba(230,230,230,1);
        border-radius:5px;
        // p{
        //   padding-top: 25px;
        //   font-size: 18px;
        //   color:rgba(51,51,51,1);
        // }
        // p:last-child{
        //   padding-top: 40px;
        //   text-align: center;
        //   color:rgba(42,176,234,1);
        //   cursor: pointer;
        // }
      }
      li:not(:nth-child(3n+1)){
        margin-left: 30px;
      }
    }
  }
}
</style>