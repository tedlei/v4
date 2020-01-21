<template>
  <div class="cashd-app">
    <div class="cashd_div">
      <router-view></router-view>
    </div>
    <footerDiv></footerDiv>
  </div>
</template>

<script>
import footerDiv from '@/components/component_lm/footer'

  export default {
    components:{footerDiv},
    data() {
      return {
      }
    },
    created(){
      this.authLogin = true;
    }
  }
</script>

<style lang="less" scoped>
.cashd-app{
  width: 100%;
  min-width: 1200px;
  height: 200px;
  .cashd_div{
    margin: auto;
    margin-top: 20px;
    width: 1200px;
    background: white;
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
  }
}
</style>