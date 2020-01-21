<template>
    <div>
        <listOption :value="item" :advertisingSixValue="advertisingSix[idx]"
                    v-for="(item, idx) in titleArr" :selectArrValue="selectArr[idx]" :key="idx"/>
    </div>
</template>

<script>
    import listOption from './listOption'
    export default {
        components: {listOption},
        data(){
            return {
                selectArr: ['小学辅导', '中学辅导', '艺术培训', '学历提升', '职业培训', 'other'],
                titleArr: ['小学热门推荐课程', '中学热门推荐课程', '艺术热门推荐课程', '学历热门推荐课程', '职业热门推荐课程', '其他热门推荐课程'],
                advertisingSix: []  // 广告位
            }
        },
        async created(){
            // 获取首页右部主体内容广告位置数据（每一类的第二排的第二个）
            this.advertisingSix = await this.getAdvertisingData(1);
        }
    }
</script>

<style lang="less" scoped></style>
