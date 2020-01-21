<template>
  <div class="intro-app fx">
    <p class="tar_p" @click="topTzSchool(obj.id)">{{obj.organizationName}}</p>
    <div class="tar_divl fx">
      <div></div><div></div><div></div>
    </div>
    <div class="tar_p2">{{obj.schoolText?obj.schoolText:'暂无学校简介'}}</div>
    <p class="tar_p3" v-if="isShowPhone">咨询电话：<span>{{obj.schoolPhone}}</span></p>
  </div>
</template>

<script>
  export default {
    props:["obj"],
    data() {
      return {
        isShowPhone:false,   //是否显示电话
      }
    },
    methods:{
      //跳转到学校
      topTzSchool(id){
        this.push('/schoolDetail?id='+id);
      },

      //判断是否显示学校电话
      getJurisdiction(id){
        let url = 'user/findByRole.do';
        this.fetch({url,data:{schoolId:id},method:'get'},2).then(res=>{
          let roleName = res.data[res.data.length-1].roleName;
          this.isShowPhone = res.data?roleName==="school"?false:true:false
        })
      }
    },
    watch:{
      'obj':function(val){
        this.getJurisdiction(val.id);
      }
    }
  }
</script>

<style lang="less">
.intro-app{
  width: 100%;
  height: 100%;
  flex-direction: column;
  .tar_p{
    text-align: center;
    font-size: 20px;
    color:rgba(51,51,51,1);
    cursor: pointer;
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .tar_p:hover{
    color: #FF7225;
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
    text-indent: 2em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 11;
    overflow: hidden;
    color: #999999;
    font-size: 14px;
  }
  .tar_p3{
    margin-top:25px;
    font-size: 18px;
    color:rgba(51,51,51,1);
    span{
      color:#FF7225;
    }
  }
}
</style>