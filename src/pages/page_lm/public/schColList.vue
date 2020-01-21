<template>
  <div class="scl-app">
    <p class="tar_p" @click="topName">{{title}}</p>
    <div class="tar_divl fx">
      <div></div><div></div><div></div>
    </div>
    <ul class="list-app" v-if="list.length>0">
      <li class="ulLi" v-for="(item,i) of list" :key="i" @click="toptz(item.id)">
        <span>{{isClass?item.schoolTopic:item.courseName}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:['title',"list","isClass"],
    data() {
      return {
        
      }
    },
    methods:{
      //点击跳转
      toptz(id){
        this.$emit('getCurrListData',id);
      },

      //跳转到课程列表
      topName(){
        let {id,num} = this.$route.query;
        let src = this.$route.path;
        let path ='/index/curriculum'
        let query = {}
        if(num){
          query.num = num;
          query.id = id;
          path = '/schoolDetail/currList'
        }
        if(src.indexOf('/index/information')>=0&&src!=='/index/information'){
          path = '/index/information';
          query = {}
        }
        this.push({path,query})
      }
    }
  }
</script>

<style lang="less" scoped>
.scl-app{
  width: 100%;
  .tar_p{
    text-align: center;
    font-size: 20px;
    color:rgba(51,51,51,1);
    cursor: pointer;
  }
  .tar_p:hover{
    color:#FF7225;
  }
  .tar_divl{
    margin-top: 10px;
    height: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    div:nth-child(1),div:nth-child(3){
      width:80px;
      height:2px;
      background: linear-gradient(to left, #FF7225, #fff );
    }
    div:nth-child(2){
      margin:0 10px;
      width:12px;
      height:12px;
      background:rgba(217,217,217,1);
      border-radius:50%;
    }
    div:nth-child(3){
      width:80px;
      height:2px;
      background: linear-gradient(to right, #FF7225, #fff );
    }
  }
  .tar_p2{
    width: 100%;
    margin-top: 20px;
    text-indent:2em;
    font-size: 14px;
    color:rgba(153,153,153,1);
    word-wrap:break-word;
    word-break:break-all;
  }
  .tar_p3{
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
    color:rgba(51,51,51,1);
    span{
      color:#FF7225;
    }
  }
  .list-app{
    width: 100%;
    .ulLi{
      margin-top: 7px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: rgba(153,153,153,1);
      font-size: 14px;
      cursor: pointer;
    }
    .ulLi:hover{
      color: var(--colMain); 
    }
  }
}
</style>