<template>
  <div class="bre-app fx">
    当前位置:
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item 
      class="hover_color"
      v-for="(item,i) of breaList" 
      :key="i" 
      :to="{ path:item.path }">{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        breaList:[]
      }
    },
    created(){
      this.getPath(this.$route.path);
    },
    methods:{
      getPath(path){
        let arr = path.slice(1).split('/');
        let bl = this.breaList = [];
        let str = '';
        for(let num in arr){
          str += '/'+arr[num];
          let title = '';
          switch (arr[num]) {
            case 'index' : title = '首页'
              break;
            case 'curriculum': title = '课程列表'
              break;
            case 'curriculumDetail': title = '课程详情'
              break;
            case 'teacher': title = '教师列表'
              break;
            case 'teacherDetail': title = '教师详情'
              break;
            case 'information': title = '教育资讯'
              break;
            case 'infoDetail': title = '资讯详情'
              break;
            case 'school': title = '学校列表'
              break;
          }
          let obj = {path:str,title};
          if(num*1===(arr.length-1)*1) delete obj.path;
          bl.push(obj);
        }
      }
    },
    watch:{
      $route:function(path){
        this.getPath(path.path);
      }
    }
  }
</script>

<style lang="less">
.bre-app{
  width: 100%;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color:rgba(51,51,51,1);
  .el-breadcrumb {
    margin-left: 10px;
  }
  .el-icon-arrow-right{
    color:rgba(51,51,51,1);
    font-size: 12px;
  }
  .is-link{
    color:rgba(51,51,51,1);
    font-size: 14px;
    font-weight: 400;
  }
  .is-link:hover{
    color: #fd8109;
  }
}
</style>