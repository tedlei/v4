<template>
  <div class="cul-app">
    <div class="cul_div">
      <selCondition :tags="tags" @deleteTag="deleteTag"></selCondition>
      <conditionList :condList="condList" :listType="listType" @selectTag="selectTag"></conditionList>
      <div class="cul_list fx">
        <div class="list_left">
          <courseListLeft
          @getys="getys"
          @topRm="topRm"
          @topSort="topSort"
          :seachNum="seachNum"
          :popular="getlistType"
          :fyData="fyData"
          :curriculumList="curriculumList"
          :listType="listType"></courseListLeft>
        </div>
        <div class="list_right">
          <recommendList></recommendList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import selCondition from './selCondition'
import conditionList from './conditionList'
import courseListLeft from './courseListLeft/courseListLeft'
import recommendList from './recommendList'
import js from './data.js'
import chinaCityList from '../../../../public/js/chinaCityList.js'
import {mapState} from 'vuex'
  export default {
    components:{selCondition,conditionList,courseListLeft,recommendList},
    data() {
      return {
        tags: [],   //筛选条件
        curriculumList:[],  //课程列表
        condList:js.condList,
        listType: '',
        total:0,   //数据总条数
        pageSize:'10',     //页码大小:
        subjectList:[],    //科目分类
        seachNum:0,    //搜索过程
        valObj:{      //课程列表 传到后台的参数
          keywords: this.$route.query.search?this.$route.query.search:'',   // 搜索字段
          category: ''   ,   // 课程分类
          subject: ''   ,   // 科目分类
          grade: ''   ,   // 年级分类
          address: ''   ,   // 上课地点
          addressList:'',   //地区
          time: ''   ,   // 上课时间
          level: ''   ,   // 课程级别
          pageNo:'1',        //页码
          sort:"",    //升序或降序
          popular:"1"     //综合或热门
        },
        schoolObj:{     //学校列表 传到后台的参数
          name: this.$route.query.search?this.$route.query.search:'',   // 搜索字段
          type:'',   //学校分类  
          oneaddress: "",   //省
          twoaddress: "",    //市
          thressaddress: "",  //区
          index:"0",     //当前页
          follow:'1',    //综合 、热门
          pageSize:'10',     //页码大小:
        },
        teacherObj:{
          name: this.$route.query.search?this.$route.query.search:'',   // 搜索字段,
          letter:"",
          oneaddress:"",
          twoaddress:"",
          index:"0",
          follow:'1',
          pageSize:'10',     //页码大小:
        }
      }
    },
    computed:{
      //控制分页
      fyData:function(){
        let val = 0;
        switch(this.listType){
          case "curriculum":
            val = this.valObj.pageNo;
          break;
          case "school":
            val = parseInt(this.schoolObj.index)+1;
          break;
          case "teacher":
            val = parseInt(this.teacherObj.index)+1;
          break
        }
        return [this.total,val,this.pageSize];
      },

      //控制综合和热门
      getlistType(){
        let val = ''
        switch (this.listType) {
          case 'curriculum':
            val = this.valObj.popular;
            break;
          case 'school ':
            val = this.schoolObj.follow;
            break;
          default:val = this.teacherObj.follow;
            break;
        }
        return val;
      },
      ...mapState(['addressUpdate'])
    },
    methods:{
      topYY:function(){
        this.seachNum = 1;
        scrollTo({top: 0});  //滑动到网页顶部
        this.curriculumList = [];
        switch(this.listType){
          case "curriculum":
            this.getCurrList();
          break;
          case "school":
            this.getSchoolList();
          break;
          case "teacher":
            this.getTeacherList();
          break;
        }
      },

      deleteTag:function(num,type){   //删除筛选条件
        let obj = this.condList[2];
        let njObj = this.condList[1];
        if(num==='all'){
          obj.isShow = false;
          njObj.isShow = false;
          this.tags = [];
          for(let obj of this.condList){
            obj.selNum = 0;
          }
          this.tagsVal();
          return;
        }
        this.tags.splice(num,1);
        this.condList[type].selNum=0;
        this.tagsVal();
      },

      //选择条件
      selectTag:function(i,t,boo){  
        let num = this.condList[i].selNum;
        let obj = this.tags;
        let str = this.condList[i].type[num];
        let str1 = this.condList[i].type[t];
        this.condList[i].selNum=t;
        if(i===0){
          this.condList[2].isShow = false;
          this.addTag(t);  //选择课程分类时
        }
        if(i===1) this.updateSubject(t);   //选择年级分类或行业分类
        for(let l in obj){
          if(obj[l].name===str){
            if(t!==0){
              this.tags.splice(l,1,{name: str1, type: i });
              if(!boo){
                this.tagsVal();
              }
              return;
            }
            this.tags.splice(l,1);
            if(!boo){
              this.tagsVal();
            }
            return;
          }
        }
        if(t!==0){
          this.tags.push({name: str1, type: i })
        }
        if(!boo){
          this.tagsVal();
        }
      },

      //增加条件
      addTag:function(num){
        let obj = this.condList[2];
        let njObj = this.condList[1];
        let tags = this.tags;
        obj.selNum = 0;
        njObj.selNum = 0;
        for (var i = tags.length-1;i >= 0 ;i--) {
          if (tags[i].type===2||tags[i].type===1) {
            tags.splice(i,1);        
          }
        }
        if(num===0||num===js.condList.length-1){
          obj.isShow = false;
          njObj.isShow = false;
          return;
        }
        obj.type = ['不限'];
        njObj.type = ["不限"];
        if(num===1||num===4) obj.isShow = true;
        if(num===2||num===3||num===5||num===6||num===7){
          njObj.isShow = true;
          this.subjectList = {subject:js.subject[num-1],num};
          obj.type = obj.type.concat(js.subject[num-1][0]);
          if(num===5||num===6||num===7){
            js.condList[1].className = '行业分类';
            njObj.type = njObj.type.concat(js.gradeList[num-3]);
          }else{
            njObj.type = njObj.type.concat(js.gradeList[num-2]);
            js.condList[1].className = '年级分类';
          }
        }else{
          njObj.isShow = false;
          obj.type = obj.type.concat(js.subject[num-1]);
        }
      },

      //改变科目分类
      updateSubject(num){
        this.selectTag(2,0,true);
        let obj = this.subjectList;
        let obj1 = this.condList[2];
        obj1.type = ['不限'];
        if(!num) obj1.isShow = false;
        else obj1.isShow = true;
        if(obj.num===2||obj.num===3){
          if(num===7) obj1.type = obj1.type.concat(obj.subject[1]);
          else  obj1.type = obj1.type.concat(obj.subject[0]);
        }else{
          if(num!==0)obj1.type = obj1.type.concat(obj.subject[num-1]);
        }
      },

      //请求获取课程列表
      getCurrList() {
        this.curriculumList = [];
        let url='';
        let data = this.valObj;
        data.pageSize = this.pageSize;
        if(!data.keywords) delete data.keywords;
        url='curri/search.do';
        // else url='/curri/list.do';

        this.fetch({url,data,method:'post'},1).then(res=>{
          this.seachNum = 0;
          this.total = res.data.total;
          this.curriculumList = res.data.rows;
        })
      },

      //请求获取学校列表
      getSchoolList(){
        this.curriculumList = [];
        let url='/schooluser/getschool.do';
        let data = this.schoolObj;
        data.pageSize = this.pageSize;
        this.fetch({url,data,method:'post'},1).then(res=>{
          this.seachNum = 0;
          this.total = res.data.size;
          this.curriculumList = res.data.list;
        })
      },

      //获取教师列表
      getTeacherList(){
        this.curriculumList = [];
        let url = '/teacher/getteacher.do';
        let data = this.teacherObj;
        data.pageSize = this.pageSize;
        this.fetch({url,data,method:'post'},1).then(res=>{
          this.seachNum = 0;
          this.total = res.data.size;
          this.curriculumList = res.data.list;
        })
      },

      /**
       * 获取判断值
       */
      getRouterValue(value){
        if (value.indexOf('?') > -1) value = value.split('?')[0];
        return  value;
      },
      
      //获取分页
      getys(num){
        switch(this.listType){
          case "curriculum":
            this.valObj.pageNo = ''+num;
          break;
          case "school":
            this.schoolObj.index = ''+(num-1);
          break;
          case "teacher":
            this.teacherObj.index = ''+(num-1);
          break
        }
        this.topYY();
      },

      //获取热门或综合
      topRm(str,boo){
        this.valObj.popular = str;
        this.schoolObj.follow = str;
        this.teacherObj.follow = str;
        if(boo)return
        this.topYY();
      },

      //获取升序或降序
      topSort(str,boo){
        this.valObj.sort = str;
        if(boo)return
        this.topYY();
      },

      //获取定位
      getPosition(){
        let obj = this.getItem('position');
        let num = chinaCityList['0'].indexOf(obj.provincialLevel);
        let num1 = chinaCityList['0_'+num].indexOf(obj.cityLevel);
        let type = js.condList[7].type = ['不限'];
        this.schoolObj.oneaddress = obj.provincialLevel;
        this.teacherObj.oneaddress = obj.provincialLevel;
        this.valObj.addressList = obj.provincialLevel  //.replace(/省|市/g,'');
        this.condList[3].type = ['不限'];
        if(num1>-1){
          this.schoolObj.twoaddress = obj.cityLevel;
          this.teacherObj.twoaddress = obj.cityLevel;
          this.valObj.addressList += obj.cityLevel   // .replace(/省|市/g,'');
        }else{
          num1 = chinaCityList['0_'+num].indexOf(obj.provincialLevel);
          this.schoolObj.twoaddress = obj.provincialLevel;
          this.teacherObj.twoaddress = obj.provincialLevel;
          this.condList[3].type = this.condList[3].type.concat(chinaCityList["0_"+num+"_0"]);
        } 
        js.condList[7].type=type.concat(chinaCityList['0_'+num+"_"+num1]);
      },   
      
      //自动设置选择条件
      setSelectTag(contentArr,numArr){
        setTimeout(() => {
          if(contentArr[0])this.selectTag(0,numArr[0]*1+1,true)
          if(contentArr[0]==='其他课程')return
          setTimeout(() => {
            if(contentArr[1])this.selectTag(1,numArr[1]*1+1,true)
            setTimeout(() => {
              if(contentArr[2])this.selectTag(2,numArr[2]*1+1,true)
              this.tagsVal();
            }, 5);
          }, 5);
        }, 5);
      },

      //返回时获取选项
      getSelect(){
        let cl = this.condList;
        let lt = this.listType;
        let vo = this.valObj;
        let so = this.schoolObj;
        let to = this.teacherObj;
        for(let i in cl){
          let obj = cl[i];
          if(obj.isShow&&lt==='curriculum'){
            if(obj.className==='课程分类') vo.category =obj.selNum===0?'':obj.type[obj.selNum];
            if(obj.className==='年级分类') vo.grade = obj.selNum===0?'':obj.type[obj.selNum];
            if(obj.className==='科目分类') vo.subject = obj.selNum===0?'':obj.type[obj.selNum];
            if(obj.className==='上课地点') vo.address = obj.selNum===0?'':obj.type[obj.selNum];
            if(obj.className==='上课时间') vo.time = obj.selNum===0?'':obj.type[obj.selNum];
            if(obj.className==='课程级别') vo.level = obj.selNum===0?'':obj.type[obj.selNum];
          }
          if(obj.isShow&&lt==='school'){
            if(obj.className==='行业分类') so.type = obj.selNum===0?'':obj.type[obj.selNum];
            if(obj.className==='区域选择') so.thressaddress = obj.selNum===0?'':obj.type[obj.selNum];
          }
          if(obj.isShow&&lt==='teacher'){
            if(obj.className==="字母检索") to.letter = obj.selNum===0?'':obj.type[obj.selNum];
          }
        }
      },

 //筛选条件时要传到后端的值
      tagsVal(){
        let val = this.tags;
        let valObj = this.valObj;
        let schoolObj = this.schoolObj;
        let teacherObj = this.teacherObj;

        //课程条件
        valObj.category = "";
        valObj.subject = "";
        valObj.grade = "";
        valObj.address = "";
        valObj.time = "";
        valObj.level = "";

        //学校条件
        schoolObj.type = "";
        schoolObj.thressaddress = "";

        //教师条件
        teacherObj.letter = "";
        for(let obj of val){
          switch(obj.type){
            case 0:valObj.category = obj.name;
            break;
            case 1:  valObj.grade = obj.name;
            break;
            case 2:  valObj.subject = obj.name;
            break;
            case 3:  valObj.address = obj.name;
            break;
            case 4:  valObj.time = obj.name;
            break;
            case 5:  valObj.level = obj.name;
            break;
            case 6:  schoolObj.type = obj.name;
            break;
            case 7:  schoolObj.thressaddress = obj.name;
            break;
            case 8:  teacherObj.letter = obj.name;
            break
          }
        }
        this.topYY();
      },

    },
    created(){
      this.getPosition();
      // 点击首页（热门学校|热门课程） 更多按钮时触发
      let {contentArr,hot,numArr} = this.$route.query;
      if (hot) this.topRm(hot);
      
      // 判断渲染为课程列表  学校列表还是名师推荐
      let listType = this.$route.fullPath.substring(7);
      if (listType.indexOf('?') > -1){
        listType = listType.split('?')[0]
      }
      this.listType = listType
      this.getSelect();
      if(!contentArr&&!hot)this.topYY();
      if(contentArr&&numArr)this.setSelectTag(contentArr,numArr);
    },
    watch: {
      /**
       * 监听路由变化获取路由信息 用于判断当前处于那个页面
       */
      $route(e){
        let val = e.fullPath.substring(7);
        val = this.getRouterValue(val);
        this.listType = val;
        this.deleteTag('all');
        this.valObj.keywords = e.query.search;
        this.schoolObj.name = e.query.search;
        this.teacherObj.name =  e.query.search;
      },

      // //筛选条件时要传到后端的值
      // "tags":function(val){
      //   let valObj = this.valObj;
      //   let schoolObj = this.schoolObj;
      //   let teacherObj = this.teacherObj;

      //   //课程条件
      //   valObj.category = "";
      //   valObj.subject = "";
      //   valObj.grade = "";
      //   valObj.address = "";
      //   valObj.time = "";
      //   valObj.level = "";

      //   //学校条件
      //   schoolObj.type = "";
      //   schoolObj.thressaddress = "";

      //   //教师条件
      //   teacherObj.letter = "";
      //   for(let obj of val){
      //     switch(obj.type){
      //       case 0:valObj.category = obj.name;
      //       break;
      //       case 1:  valObj.grade = obj.name;
      //       break;
      //       case 2:  valObj.subject = obj.name;
      //       break;
      //       case 3:  valObj.address = obj.name;
      //       break;
      //       case 4:  valObj.time = obj.name;
      //       break;
      //       case 5:  valObj.level = obj.name;
      //       break;
      //       case 6:  schoolObj.type = obj.name;
      //       break;
      //       case 7:  schoolObj.thressaddress = obj.name;
      //       break;
      //       case 8:  teacherObj.letter = obj.name;
      //       break
      //     }
      //   }
      //   this.topYY('筛选条件改变时');
      // },
      addressUpdate(val){    //当地址改变时
        if (val) {
          this.getPosition();
          this.topYY();
          this.$store.commit('changeAddressUpdate', false);
        }
      }
    }
  }
</script>

<style lang="less">
.cul-app{
  width: 100%;
  min-width: 1200px;
  .cul_titleNav{
    width: 100%;
    flex-direction: row;
    justify-content: center;
  }
  .cul_div{
    width: 1200px;
    margin:auto;
    .cul_list{
      padding-top:20px;
      flex-direction: row;
      justify-content: space-between;
      .list_left{
        width: 886px;
        background-color: white;
        // padding-bottom: 60px;
        border-radius: 5px;
      }
      .list_right{
        width: 284px;
      }
    }
  }
}
</style>