<template>
  <div class="app-nt fx">
    <div class="nt_main fx">
      <ul class="nt_ul" :style="{height:selList.length*50+'px'}">
        <li class="nt_li" v-for="(item,i) of selList" :key="i" :class="selNum===i?'sel_li':''" @click="topSel(i,item.src)">{{item.title}}</li>
      </ul>
      <div  class="nt_div">
        <p class="nt_p">{{selList[selNum].title}}</p>
        <router-view class="nt_height"></router-view>
      </div>
    </div>
    <footerNav class=nt_foo></footerNav>
  </div>
</template>

<script>
import footerNav from '../../../components/component_lm/footer'
export default {
  components:{footerNav},
  data () {
    return {
      selList:[
        {title:'关于雏鸟',src:'/'},
        {title:'隐私协议',src:'/privacy'},
        {title:'用户使用协议',src:'/userAgreement'},
        {title:'常见问题',src:'/commonIssue'},
        {title:'问题反馈',src:'/coupleBack'},
        {title:'链接交换',src:'/linKswop'},
      ],
      selNum:0,
    };
  },
  created() {
    let {num} = this.$route.query;
    if(num) this.selNum = num*1;
  },
  methods: {
    //点击选择时
    topSel(num,src){
      this.selNum = num;
      this.push({path:'/nestling'+src,query:{num:this.selNum}})
    }
  }

}

</script>

<style lang='less' scoped>
.app-nt{
  width: 100%;
  height: 100%;
  position:absolute;
  flex-direction: column;
  padding-bottom: 20px;
  .nt_main{
    flex: 1;
    width: 1200px;
    margin: 20px auto;
    justify-content: space-between;
    .nt_ul{
      width: 260px;
      border-radius: 5px;
      background: white;
      .nt_li{
        height: 50px;
        font-size: 18px;
        color:rgba(51,51,51,1);
        text-align: center;
        line-height: 50px;
        cursor: pointer;
      }
      .nt_li:hover,.sel_li{
        background: var(--colMain);
        color: white;
      }
      .sel_li{
        cursor: default;
      }
      .nt_li:first-child{
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      .nt_li:last-child{
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
    .nt_div{
      width: 920px;
      border-radius: 5px;
      background: white;
      .nt_p{
        padding-left: 40px;
        height: 80px;
        line-height: 80px;
        border-bottom: 1px solid rgba(230,230,230,1);
        font-size: 20px;
        color:rgba(51,51,51,1);
      }
      .nt_height{
        height: auto;
      }
    }
  }
  .nt_foo{
    border-top: 1px solid rgba(230,230,230,1);
  }
}
</style>