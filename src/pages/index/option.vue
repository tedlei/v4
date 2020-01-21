<template>
	<div class="wrap fx pointer" @click="topTj(value.id, cuClass)">
        <img v-lazy="(cuClass ? value.courseImage : value.schoolImage) ||'../../../public/images/currImg.jpg'"
             alt=""
             width="262px"
             height="206px"/>
        <span class="context">{{cuClass ? value.courseName : value.organizationName}}</span>
        <span v-if="cuClass" class="price">价格：￥{{value.coursePrice}}元</span>
        <span v-else class="price">课程数量：{{value.subjectNum}}</span>
    </div>
</template>

<script type="text/javascript">
	export default{
        props: ['cuClass','value'], // 传入cuClass 为true 则为课程  false为学校
        data() {
            return {
                
            }
        },
        methods:{
            //点击课程时
            topTj(id,num){
                let str = num ? '/index/curriculum/curriculumDetail' : '/schoolDetail';
                this.$router.push({path:str,query: {id}})
            }
        }
    }
</script>

<style scoped lang="less">
	.wrap{
        position: relative;
        flex-direction: column;
        width: 282px;
        height: 282px;
        padding: 10px 10px 0;
        background-color: #fff;
        margin-bottom: 15px;
        transition: margin-top 200ms;
        border-radius:5px;
        .context{
            overflow: hidden;
            margin-top: 15px;
            margin-bottom: 10px;
            font-size:14px;
            color:rgba(51,51,51,1);
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .price{
            font-size:12px;
            color: var(--colMain);
        }
        &:hover{
            top: -2px;
            box-shadow: 0 18px 16px -16px rgba(0, 0, 0, 0.2);
        }
    }
</style>