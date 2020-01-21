<template>
  <div class="duty-app">
    <div class="cash_d4">
      <p class="p1">尊敬的用户您已缴纳保证金！</p>
      <p class="p2">您可以查看<span @click="topIsShow">保证金协议</span></p>
      <protocol v-show="isShowxy"></protocol>
    </div>
    <div class="cash_d3">
        <el-button type="primary" @click="topPayment" class="disBgColor">
          申请退还保证金
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
        isShowxy:false,  //是否显示协议
      }
    },
    methods:{
      topIsShow(){
        this.isShowxy = true;
      },
      topPayment(){
        this.$router.push('/cashDeposit/sendBack')
      },
    }
  }
</script>

<style lang="less" scoped>
.duty-app{
  width: 100%;
  .cash_d4{
    padding:0 30px;
    padding-top: 90px;
    color:rgba(51,51,51,1);
    p{
      margin-left: 250px;
    }
    .p1{
      font-size: 24px;
    }
    .p2{
      padding-top: 10px;
      font-size: 14px;
      span{
        color:#2AB0EA;
        cursor: pointer;
      }
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