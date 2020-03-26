<template>
  <div v-if="hideError" class="chatw-app">
    <div class="chatw_div1">{{teacObj.organizationName}}</div>
    <div class="chatw_div2" ref="scroll">
      <button class="chatw_but" @click="getHistoryMessage(teacObj.id)">{{historyText}}</button>
      <template v-for="(item,i) of dataList.list">
        <p class="chatw_p1" :key="'i'+i">{{item.timer}}</p>
        <template v-for="(obj,j) of item.main">
          <div class="div_margin" :key="'j'+j+i">
            <div class="chatw_div_left" v-if="obj.messageSource==='2'">
              <div class="div_img">
                <img :src="dataList.fromImgSrc" alt="正在加载……" />
              </div>
              <div>
                <span v-if="obj.messageSource === '2'"
                      style="display:block;margin-bottom: 9px;font-size: 16px;"
                >{{obj.teacherName}}</span>
                <div class="div_content">
                  <div class="left_arrows"></div>
                  <div class="left_div">{{obj.messageContent}}</div>
                  <span @click="dlt(i,j,obj.id)">删除</span>
                </div>
              </div>
              <div class="clear"></div>
            </div>
            <div class="chatw_div_right" v-if="obj.messageSource==='1'">
              <div class="div_img">
                <img :src="dataList.sendImgSrc" alt="正在加载……" />
              </div>
              <div class="div_content">
                <div class="left_arrows"></div>
                <div class="right_div">{{obj.messageContent}}</div>
                <span @click="dlt(i,j,obj.id)">删除</span>
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </template>
      </template>
    </div>
    <div class="dhatw_footer">
      <div class="dhatw_inp fx">
        <div class="chatw_d_img">
          <img :src="dataList.sendImgSrc" alt="正在加载……" />
        </div>
        <div class="chatw_inpur fx">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" @keydown.enter.native="enterSend" v-model="input" maxlength="400"></el-input>
          <div class="chatw_font_right">{{characterNum}}字</div>
        </div>
      </div>
      <div class="chatw_btn" :class="input.length ? 'send': ''" @click="send(input,'send')">发送</div>
    </div>
  </div>
  <error v-else></error>
</template>

<script>
import chat from './chat'
import error from "../../../components/component_lzj/error";

export default {
  mixins: [chat],
  props:['teacObj'],
  components: {error},
  data() {
    return {
      msgList: [], //聊天列表
      input: ""
    };
  },
  computed:{
    //剩余字数
    characterNum:function(){
      let num = this.input.length;
      if(num>=400){
        this.$message({ message: "最多输入400个字符", type: "warning" });
      }
      return 400-num;
    }
  }
};
</script>

<style lang="less">
.chatw-app {
  margin: auto;
  margin-top: 20px;
  padding: 20px;
  padding-bottom: 40px;
  width: 1200px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  .chatw_div1 {
    height: 70px;
    text-align: center;
    line-height: 55px;
    font-size: 18px;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  .chatw_div2 {
    height: 500px;
    overflow-y: auto;
    padding-bottom: 20px;
    .chatw_but{
      display: block;
      height: 30px;
      margin: 10px auto;
      padding:  0 8px;
      border-radius: 5px;
      font-size: 12px;
      color: #999;
      border: 0;
      cursor: pointer;
    }
    .chatw_but:focus{outline:0;} 
    .chatw_p1 {
      padding-top: 10px;
      text-align: center;
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
    }
    .chatw_div_left {
      margin-top: 10px;
      min-width: 200px;
      // min-height: 60px;
      max-width: 1000px;
      .div_img {
        overflow: hidden;
        float: left;
        width: 60px;
        height: 60px;
        margin-right: 40px;
        background-color: rgba(204, 204, 204, 1);
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .div_content {
        position: relative;
        float: left;
        min-width: 55px;
        max-width: 880px;
        padding: 10px 10px;
        background: rgba(230, 230, 230, 1);
        border-radius: 5px;
        .left_arrows {
          position: absolute;
          left: -12px;
          border: 6px solid transparent;
          border-right-color: rgba(230, 230, 230, 1);
        }
        .left_div{
          width: 100%;
          height: auto;
          word-wrap:break-word;
        }
        span {
          // position: relative;
          position: absolute;
          // top: 42px;
          bottom: -22px;
          right: 22px;
          font-size: 14px;
          color: rgba(204, 204, 204, 1);
          float: right;
          cursor: pointer;
        }
      }
      .clear {
        clear: both;
      }
    }
    .chatw_div_right {
      margin-left: 160px;
      margin-top: 40px;
      padding-right: 10px;
      min-width: 200px;
      // min-height: 60px;
      max-width: 1000px;
      // display: flex;
      // justify-content: flex-end;
      
      .div_img {
        float: right;
        width: 60px;
        height: 60px;
        background: rgba(204, 204, 204, 1);
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .div_content {
        position: relative;
        float: right;
        min-width: 55px;
        max-width: 873px;
        padding: 10px 10px;
        margin-right: 40px;
        background: rgba(230, 230, 230, 1);
        border-radius: 5px;
        .left_arrows {
          position: absolute;
          right: -12px;
          border: 6px solid transparent;
          border-left-color: rgba(230, 230, 230, 1);
        }
        .right_div{
          width: 100%;
          height: auto;
          word-wrap:break-word;
        }
        span {
          position: absolute;
          // top: 42px;
          bottom: -20px;
          font-size: 14px;
          color: rgba(204, 204, 204, 1);
          cursor: pointer;
        }
      }
      .clear {
        clear: both;
      }
    }
    .div_margin + .div_margin {
      margin-top: 40px;
    }
  }
  .dhatw_footer {
    height: 170px;
    border-top: 1px solid rgba(230, 230, 230, 1);
    .dhatw_inp {
      margin-top: 35px;
      justify-content: space-between;
      align-items: center;
      .chatw_d_img {
        width: 60px;
        height: 60px;
        background: rgba(204, 204, 204, 1);
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .chatw_inpur {
        margin-left: 15px;
        flex-grow: 1;
        height: 70px;
        background: rgba(250, 250, 250, 1);
        border: 1px solid rgba(230, 230, 230, 1);
        border-radius: 5px;
        overflow: hidden;
        .el-textarea {
          .el-textarea__inner {
            padding: 5px 10px;
            height: 90px;
            flex-grow: 1;
            border: 0;
            flex-grow: 1;
          }
        }
        .chatw_font_right {
          width: 60px;
          text-align: center;
          line-height: 70px;
          font-size: 14px;
          background-color: white;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
    .chatw_btn {
      margin-top: 20px;
      float: right;
      width: 80px;
      height: 40px;
      background: rgba(230, 230, 230, 1);
      border-radius: 5px;
      font-size: 14px;
      text-align: center;
      line-height: 40px;
      color: rgba(153, 153, 153, 1);
      cursor: pointer;
    }
    .send{
      background-color: #2ab0ea;
      color: #fff;
    }
  }
}
</style>