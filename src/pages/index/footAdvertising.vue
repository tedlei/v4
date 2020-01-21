<template>
    <div class="footAdvertising">
        <img v-lazy="picSrc"
             class="advertising"
             alt="" />
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
                picSrc: '',
                schoolList: [
                    {title:'北京大学',url:'https://www.pku.edu.cn/'},
                    {title:'清华大学',url:'https://www.tsinghua.edu.cn/publish/thu2018/index.html'},
                    {title:'重庆大学',url:'http://www.cqu.edu.cn/'},
                    {title:'重庆交通大学',url:'http://www.cqjtu.edu.cn/'},
                ]
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
              this.picSrc = (await this.getAdvertisingData(5))[0].pic;
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
