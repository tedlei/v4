<template>
  <div class="infor-app fx">
    <div class="infor_div1">
      <breadcrumb></breadcrumb>
    </div>
    <div class="infor_div2">
      <div class="div_left">
        <router-view></router-view>
      </div>
      <div class="div_right">
        <schColList class="div_child" @getCurrListData="getCurrListData" :title="'推荐资讯'" :isClass="'true'" :list="list"></schColList>
      </div>
    </div>
  </div>
</template>

<script>
import breadcrumb from '@/components/component_lm/breadcrumb'
import schColList from "@/pages/page_lm/public/schColList"
import footAdvertising from '@/pages/index/footAdvertising'
  export default {
    components:{breadcrumb,schColList,footAdvertising,},
    data() {
      return {
        list:[],
      }
    },
    created(){
      this.getList();
    },
    methods:{
      getList(){
        let url = '/schoolMessage/getMessage.do';
        let data = {type:"",topic:'',index:"0",status:'1',port:'0'}
        this.fetch({url,data,method:"post"},1).then(res=>{
          let arr = res.data.list;
          let list = [];
          if(arr.length<10){
            list = arr;
          }else{
            let maxNum = 10;
            for(let i =0; i<maxNum; i++){
              let num = parseInt(Math.random()*arr.length);
              let aa = arr[num];
              if(list.indexOf(aa)>-1){
                maxNum++;
              }else{
                list.push(aa);
              }
            }
          }
          this.list = list
        })
      },


      getCurrListData(id){
        this.push({path:'/index/information/infoDetail',query:{id}})
      }
    }
  }
</script>

<style lang="less" scoped>
.infor-app{
  width: 100%;
  min-width: 1200px;
  flex-direction: column;
  align-items: center;
  .infor_div1{
    margin: auto;
    padding-top: 10px;
    width: 1200px;
  }
  .infor_div2{
    margin: auto;
    padding-top: 20px;
    width: 1200px;
    .div_left{
      float: left;
      width:886px;
      background:rgba(255,255,255,1);
      border-radius:5px;
    }
    .div_right{
      float: right;
      width:293px;
      border-radius:5px;
      height:auto;
      .div_child{
        height: 340px;
        padding:10px 20px;
        border-radius: 5px;
        background:rgba(255,255,255,1);
      }
      .div_child+.div_child{
        margin-top: 30px;
      }
    }
  }
}
</style>