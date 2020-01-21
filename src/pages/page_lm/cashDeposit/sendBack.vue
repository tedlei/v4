<template>
  <div class="send-app">
    <div class="send_d1">
      <span>退还保证金</span>
    </div>
    <p class="send_p1">
      您申请退还保证金证明你将要注销雏鸟凭【平台一切服务，请确认这一操作为负责人操作。保证金一旦退还，机构的一切信息将在该平台注销，请慎重考虑】
    </p>
    <p class="send_p2">为确保不违规操作：</p>
    <ul class="send_u1">
      <li class="send_l1 fx">
        <div class="send_d_left"><span>输入负责人电话</span></div>
        <div class="send_d_right">
          <el-input v-model="phone" placeholder="请输入内容"></el-input>
        </div>
      </li>
      <li class="send_l1 fx">
        <div class="send_d_left"><span>手机验证码</span></div>
        <div class="send_d_right send_yzm fx">
          <el-input v-model="phone" placeholder="请输入内容"></el-input>
          <el-button type="primary" :class="false?'':'btnBgColor'">
            {{false?'获取验证码':60+'秒后从新获取'}}
          </el-button>
        </div>
      </li>
    </ul>
    <div class="send_btn">
      <el-button type="primary" :disabled="true" :class="false?'':'jyBtn'">提交申请</el-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      phone:'',
    }
  },

  computed: {},

  methods: {}
}

</script>

<style lang='less'>
.send-app{
  width: 100%;
  .send_d1{
    height: 60px;
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid rgba(230,230,230,1);
    span{
      font-size: 30px;
      color:rgba(51,51,51,1);
    }
  }
  .send_p1{
    padding:30px 60px;
    font-size: 15px;
    color:rgba(51,51,51,1);
  }
  .send_p2{
    padding-top:50px;
    padding-left: 60px;
    font-size: 18px;
    color:rgba(51,51,51,1);
  }
  .send_u1{
    padding-top: 25px;
    .send_l1{
      justify-content: center;
      align-items: center;
      .send_d_left{
        margin-right: 20px;
        text-align: right;
        width: 140px;
        font-size: 18px;
        color:rgba(102,102,102,1);
      }
      .send_d_right{
        width:376px;
        height:50px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(230,230,230,1);
        border-radius:5px;
        .el-input{
          height: 100%;
          border: 0;
          .el-input__inner{
            height: 100%;
            border: 0;
            font-size: 16px;
          }
        }
      }
      .send_yzm{
        justify-content: space-between;
        align-items: center;
        border:0;
        .el-input{
          width: 246px;
          height: 100%;
          border: 1px solid rgba(230,230,230,1);
          border-radius:5px;
          .el-input__inner{
            height: 100%;
            border: 0;
            font-size: 16px;
          }
        }
        .el-button{
          padding: 0;
          width: 120px;
          height: 100%;
          font-size: 16px;
          border:0;
        }
        .btnBgColor{
          color:rgba(153,153,153,1);
          background:rgba(230,230,230,1);
        }
      }
    }
    li+li{
      margin-top: 30px;
    }
  }
  .send_btn{
    padding-top: 50px;
    padding-bottom:150px;
    text-align: center;
    .el-button{
      padding: 0;
      width:181px;
      height:40px;
      font-size: 16px;
      color:white;
      border-radius:5px;
      border:0;
    }
    .jyBtn{
      background:rgba(230,230,230,1);
      color:rgba(153,153,153,1);
    }
  }
}
</style>