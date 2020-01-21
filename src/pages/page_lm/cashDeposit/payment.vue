<template>
  <div class="pay-app">
    <div class="cash_d1">
      <span>保证金</span>
    </div>
    <div class="cash_d2">
      <p>为了更好地规范学校发布内容和进一步规范学校行为，没所入驻学校需要缴纳一定的保证金才能取得雏鸟网更多的权限，
        在学校申请退出雏鸟网平台时，保证金会进行退还。保证金具体规则请参考保证金协议。</p>
      <protocol></protocol>
      <p>保证金：5000元</p>
    </div>
    <div class="cash_d3">
        <el-button type="primary" @click="topPayment">
          同意本协议并支付
        </el-button>
      </div>
  </div>
</template>

<script>
import protocol from './protocol'
  export default {
    components:{protocol},
    data() {
      return {
        
      }
    },
    methods:{
      topPayment(){
        this.$router.push('/cashDeposit/dutyPaid')
      },
    }
  }
</script>

<style lang="less" scoped>
.pay-app{
  width: 100%;
  .cash_d1{
    height: 60px;
    border-bottom: 1px solid rgba(230,230,230,1); 
    text-align: center;
    line-height: 60px;
    span{
      font-size: 30px;
      color:rgba(51,51,51,1);
    }
  }
  .cash_d2{
    padding:30px;
    color:rgba(51,51,51,1);
    p{
      line-height: 26px;
    }
    p:first-child{
      font-size: 16px;
      text-indent: 2rem;
    }
    p:last-child{
      font-size: 22px;
    }

  }
  .cash_d3{
    height: 120px;
    line-height: 120px;
    text-align: center;
    .el-button{
      width:181px;
      height:40px;
      border:0;
      border-radius:5px;
    }
    .disBgColor{
      background:rgba(230,230,230,1);
      color:rgba(153,153,153,1);
    }
  }
}
</style>