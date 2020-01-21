<template>
    <div class="section fx">
        <!-- 热门学校 热门课程 非一次性获取 分开渲染 增加渲染速度 -->
        <div>
            <div class="head fx">
                <h3>热门学校</h3>
                <div class="fx pointer" @click="more(false)">
                    <span>更多</span>
                    <span class="iconfont icondayu"></span>
                </div>
            </div>
            <optionNav :value="value" v-for="(value, i) in popularSchool" :key="i" />
        </div>
        <div>
            <div class="head fx">
                <h3>热门课程</h3>
                <div class="fx pointer" @click="more(true)">
                    <span>更多</span>
                    <span class="iconfont icondayu"></span>
                </div>
            </div>
            <optionNav :value="value" v-for="(value, i) in popularCourse" :cuClass="true" :key="i" />
        </div>
    </div>
</template>
    
<script>
    import optionNav from './option.vue'
    export default {
        components: {optionNav},
        data(){
            return {
                // 熱門學校
                popularSchool: [],
                // 熱門課程
                popularCourse: []
            }
        },
        methods: {
            /**
             * 初始化数据
             */
            initialize(){
                // 请求数据更改 listData

                // 热门学校
                this.getPopularSchoolData();

                // 热门课程
                this.getPopularCourseData();
            },
            /**
             * 热门学校数据获取
             * */
            async getPopularSchoolData(){
                let data = await this.getAdvertisingData(2);
                if (data.length !== 6){
                    for (let i = 0, len = data.length; i < (6 - len); i++) {
                        data.push(data[0])
                    }
                    this.popularSchool = data;
                } else {
                    this.popularSchool = data;
0               }
            },
            /**
             * 热门课程数据获取
             */
            async getPopularCourseData(){
                this.popularCourse = await this.getAdvertisingData(3);
            },
            /**
             * 更多内容
             */
            more(index){
                let url = index ? '/index/curriculum' : '/index/school';
                this.push({path: url, query: {hot: '2'}});
            }
        },
        created() {
            this.initialize();
        }
    }
</script>

<style lang="less" scoped>
    .section{
        flex: 1;
        flex-direction: column;
        align-items: flex-end;
        margin-bottom: -19px;
        .head{
            justify-content: space-between;
            width: 284px;
            margin-top: 48px;
            margin-bottom: 19px;
            color: #666666;
            font-size: 22px;
            & div:nth-last-child(1){
                align-items: center;
                color: #999;
                font-size: 14px;
                .icondayu{
                    font-size: 12px;
                }
            }
            & div:nth-last-child(1):hover{
                color: #2ab0ea;
            }
        }
    }
</style>