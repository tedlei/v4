<template>
  <div class="rih-app">
    <div class="rih_div">{{title}}</div>
  </div>
</template>

<script>
  export default {
    props:['title']
  }
</script>

<style lang="less" scoped>
.rih-app{
  width: 100%;
  .rih_div{
    margin:0 auto;
    width: 840px;
    height: 105px;
    line-height: 105px;
    border-bottom: 1px solid rgba(230,230,230,1);
  }
}
</style>