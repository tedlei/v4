<template>
  <div class="coupon-app">
    <ul class="cou_ul">
      <li class="cou_li1">使用规则：</li>
      <li>使用时用户向学校出示优惠码即可使用，获得优惠券优惠。</li>
    </ul>
    <ul class="cou_ul">
      <li class="cou_li1"></li>
      <li>
        只有下载雏鸟网APP才能查看到优惠券优惠码哟。下载使用优惠：
        <router-link to="/">APP下载地址</router-link>
      </li>
    </ul>
    <unused style="width:100%;" :obj="couponList"></unused>

    <div class="cou_text">已使用</div>
    
    <unused :obj="couponUse"></unused>
  </div>
</template>

<script>
import unused from './unused'
  export default {
    components:{unused},
    data() {
      return {
        couponList:[   //卡券列表——未使用
          {pClass:1,validDate:'2020-1-1',discount:300,expireMoney:5000,school:'雏鸟教育平台'},
          {pClass:2,validDate:'2020-1-1',discount:300,expireMoney:5000,school:'雏鸟教育平台'},
          {pClass:1,validDate:'2020-1-1',discount:300,expireMoney:5000,school:'雏鸟教育平台'},
          {pClass:2,validDate:'2020-1-1',discount:300,expireMoney:5000,school:'雏鸟教育平台'},
          {pClass:1,validDate:'2020-1-1',discount:300,expireMoney:5000,school:'雏鸟教育平台'},
        ],
        couponUse:[
          {pClass:1,validDate:'2020-1-1',discount:300,expireMoney:5000,school:'雏鸟教育平台'},
          {pClass:2,validDate:'2020-1-1',discount:300,expireMoney:5000,school:'雏鸟教育平台'},
          {pClass:1,validDate:'2020-1-1',discount:300,expireMoney:5000,school:'雏鸟教育平台'}
        ]
      }
    },
  }
</script>

<style lang="less" scoped>
.coupon-app{
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 20px;
  .cou_ul{
    margin-top:15px;
    height: 20px;
    .cou_li1{
      width: 80px;
      height: 20px;
    }
    li{
      float: left;
      font-size: 16px;
      color:rgba(51,51,51,1);
      a{
        color: #2AB0EA;
        text-decoration: none;
      }
    } 
  }
  .cou_text{
    margin-top: 40px;
    height: 20px;
    font-size: 16px;
    color:rgba(51,51,51,1);
  }
}
</style>