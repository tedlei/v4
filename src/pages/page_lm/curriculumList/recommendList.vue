<template>
  <div class="resList-app">
    <div class="resl_span">{{listData[0].title}}</div>
    <div>
      <optionModule :cuClass="true" :value="listData[0].content"></optionModule>
    </div>
    <div class="resl_span padd-top">{{listData[1].title}}</div>
    <div class="fx" style="flex-direction: column;justify-content: space-between;margin-bottom:-15px;">
      <optionModule :cuClass="false" :value="listData[1].content"></optionModule>
    </div>
  </div>
</template>

<script>
import optionModule from "@/pages/index/option.vue";
export default {
  components: { optionModule },
  data() {
    return {
      listData: [
        {
          title: "推荐课程",
          content: {}
        },
        {
          title: "推荐学校",
          content: {}
        }
      ]
    };
  },

  methods:{
    //获取推荐课程的数据
    getData(){
      let url = '/content/cateId.do';
      let data = {categoryId:3}
      this.fetch({url,data,method:'get'},2).then(res=>{
        this.listData[0].content=res.data[0];
      })
      data = {categoryId:2}
      this.fetch({url,data,method:'get'},2).then(res=>{
        this.listData[1].content=res.data[0];
      })
    }
  },
  created(){
    this.getData()
  }
};
</script>

<style lang="less" scoped>
.resList-app {
  width: 100%;
  .resl_span {
    font-size: 22px;
    color: rgba(102, 102, 102, 1);
    padding-bottom: 19px;
  }
  .padd-top{
    padding-top:14px;
  }
}
</style>