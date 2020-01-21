<template>
    <div class="section">
        <div>
            <h3 class="title">{{value}}</h3>
            <div class="list fx" >
                <optionNav :value="value" :cuClass="true" v-for="(value, i) in listData" :key="i" />
            </div>
    </div>
    </div>
    </template>

    <script>
    import optionNav from './option'
    import {mapState} from 'vuex'
    export default {
        components: {optionNav},
        data(){
            return {
                listData: []
            }
        },
        props: ['value', 'selectArrValue', 'advertisingSixValue'],
        computed: {
            ...mapState(['addressUpdate'])
        },
        methods: {
            /**
             * 请求渲染数据
             */
            initialize(){
                // 获取地址 并拼接
                let position = this.getItem('position');
                
                let val = this.selectArrValue;
                if (val === '其他热门推荐课程') val = 'other';
                
                this.fetch({
                    method: 'post',
                    url: 'curri/indexlist.do',
                    data: {
                        search: val,
                        address: position.provincialLevel,
                        courseThreeAddress: position.cityLevel,
                    }
                }).then(result=>{
                    let res = this.parse(result.data);

                    // 插入广告
                    res[5] = res[4];
                    res[4] = this.advertisingSixValue;

                    // 取res数组中的前五项数据 大于5则filter过滤反之直接赋值
                    this.listData = res.length > 6 ? res.filter((item, index)=>{
                        return index < 6;
                    }) : res;
                });
            }
        },
        watch: {
            addressUpdate(val){
                if (val) {
                    this.initialize();
                    this.$store.commit('changeAddressUpdate', false);
                }
            },
            advertisingSixValue(){
                this.initialize();
            }
        }
    }
</script>

<style lang="less" scoped>
    .section{
        margin-bottom: -16px;
        .title{ 
            margin-top: 48px;
            margin-bottom: 19px;
            font-size:22px;
            color: #666;
        }
        .list{
            flex-wrap: wrap;
            justify-content: space-between;
            width: 876px;
        }
    }
</style>