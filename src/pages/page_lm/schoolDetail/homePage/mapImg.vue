<template>
  <div class="reco-app">
    <div class="reco_div">学校地址</div>
    <div class="map_a1 fx" v-if="teacObj">
      <div class="map_div">
        <!-- <div class="reco_span">学校固话：{{teacObj.schoolPhone}}</div> -->
        <!-- 学校地址： -->
        <div class="reco_span">{{teacObj.schoolAddress}}</div>
        <div class="reco_qrCode"> 
          <img :src="teacObj.schoolPublicCode" alt="正在加载……">
        </div>
      </div>
      <div class="map_div back">
        <img :src="teacObj.schoolMapImage" alt="正在加载……">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['teacObj'],
    data() {
      return {
      }
    }
  }
</script>

<style lang="less" scoped>
.reco-app{
  margin:auto; 
  width: 1200px;
  .reco_div{
    font-size: 22px;
    color:rgba(51,51,51,1);
  }
  .map_a1{
    .map_div{
      width: 50%;
      height: 400px;
      .reco_qrCode{
        margin-top:40px;
        width:200px;
        height:200px;
        background:rgba(217,217,217,1);
        img{
          width: 100%;
          height: 100%;
        }
      }
      img{
        width: 100%;
        height: 100%;
      }
      .reco_span{
        // margin-top:20px;
        font-size: 22px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color:rgba(51,51,51,1);
      }
      div:nth-child(1){
        margin-top: 30px;
      }
    }
    .back{
      background:rgba(217,217,217,1);
    }
  }
}
</style>