<template>
  <div class="cd_app" v-if="obj">
    <p>{{obj.couponPrice}}元通用券{{isGz}}</p>
    <p>{{showPic(obj)}}</p>
    <p>有效日期至：{{obj.createTime.split(' ')[0]}}</p>
    <p @click="clickDraw(obj,isDraw,isGz)">{{isDraw?'已领取':down}}</p>
  </div>
</template>

<script>
export default {
  props:['obj','isGz'],
  data () {
    return {
      isDraw:false,  //是否领取
      userInfo:null   //用户数据
      
    };
  },
  created(){
    this.userInfo = this.getItem('userInfo');
    if(this.userInfo){
      this.seachIsDraw(this.obj.id,this.userInfo.user.id);
    }
  },
  methods: {
    //显示使用条件
    showPic(item){
      if(item.courseId){
        return '仅用于课程：'+item.courseName
      }else{
        if(item.useReRule==='0') return '无门槛使用'
        else return '满'+item.useReRule+'元使用'
      }
    },

    //领取优惠卷
		clickDraw(item,isDraw,schoolIsAttention){
      let ui = this.userInfo;
      let {id,isFollow} = item;
      let url = 'coup/receive.do'
      if(!ui){
        this.$message({message:'请登录后在领取优惠卷',type:'warning'});
        return
      }
			if(isDraw){
        this.$message({message:'你已领取次优惠卷',type:'warning'});
        return
      }
			if(isFollow==='1'&&!schoolIsAttention){
        this.$message({message:'请在关注后领取优惠卷',type:'warning'});
				return
      }
      let data = {couponId:id,userId:ui.user.id,status:item.isUniversal}
			this.fetch({url,data,method:'post'},4).then(res=>{
				let {message,success} = res.data;
				this.$message({message,type:success?'success':'warning'});
				this.isDraw = success;
			})
    },

    //查看是否领取
		seachIsDraw(couponId,userId){
			let url = 'coup/isReceive.do'
			let data = {couponId,userId}
			this.fetch({url,data,method:'post'},4).then(res=>{
				this.isDraw = res.data;
			})
		}
  },
  computed:{
    //领取显示
		down(){
			let isFollow = this.obj.isFollow;
			if(isFollow==='0') return '立即领取'
			if(this.isGz) return '立即领取'
			else return '请关注后在领取'
    }
  }
}

</script>

<style lang='less' scoped>
.cd_app{
  p{
    padding-top: 25px;
  font-size: 18px;
  color:rgba(51,51,51,1);
  }
  p:last-child{
    padding-top: 40px;
    text-align: center;
    color:rgba(42,176,234,1);
    cursor: pointer;
  }
}
</style>