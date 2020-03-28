<template>
    <div class="footAdvertising">
        <a :href="picObject.url">
            <img v-lazy="picObject.pic"
             class="advertising"
             alt="" />
        </a>
        <div class="context">
            <h5>友情链接</h5>
            <ul class="fx">
                <li class="pointer" @click="toPage(item.url)" v-for="(item, i) in schoolList" :key="i">{{item.title}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                picObject: '',
                schoolList: ['西南大学', '重庆工商大学', '洞庭湖大学', '重庆工商大学', '洞庭湖大学'
                    , '重庆工商大学', '洞庭湖大学', '重庆工商大学', '洞庭湖大学', '重庆工商大学', '洞庭湖大学'
                    , '重庆工商大学', '洞庭湖大学', '重庆工商大学', '洞庭湖大学', '重庆工商大学', '洞庭湖大学'
                    , '重庆工商大学', '洞庭湖大学', '重庆工商大学', '洞庭湖大学', '重庆工商大学','西南大学'
                    , '重庆工商大学', '洞庭湖大学', '重庆工商大学', '洞庭湖大学'
                    , '重庆工商大学', '洞庭湖大学', '重庆工商大学', '洞庭湖大学', '重庆工商大学', '洞庭湖大学'
                    , '重庆工商大学', '洞庭湖大学', '重庆工商大学', '洞庭湖大学', '重庆工商大学', '洞庭湖大学'
                    , '重庆工商大学', '洞庭湖大学', '重庆工商大学', '洞庭湖大学', '重庆工商大学']
            }
        },
        methods: {
            /**
             * 初始换数据
             */
            initialize(){
                // 广告图获取
                this.getPic();

                // this.fetch({
                //     method: 'post',
                //     url: '',
                //     data: {}
                // }).then(result=>{
                //
                // })
            },
            async getPic(){
              this.picObject = (await this.getAdvertisingData(5))[0];
            },
            toPage(url){
                window.open(url);
            }
        },
        created() {
            this.initialize();
        }
    }
</script>

<style lang="less" scoped>
    .footAdvertising{
        margin-top: 52px;
        .advertising{
            width: 1200px;
            min-width: 1200px;
            height: 120px;
        }
        .context{
            padding-bottom: 30px;
            color: #999999;
            h5{margin-top: 30px;}
            ul{
                flex-wrap: wrap;
                max-width: 1200px;
                margin-top: 10px;
                li{
                    padding-right: 20px;
                    line-height: 30px;
                }
            }
        }
    }
</style>
