<template>
    <!--  banner  -->
    <div class="wrap">
        <div class="courseClassificationList fx">
            <ul class="boxSing initI" @mouseleave="initI">
                <li class="boxSing initISub" v-for="(item, i) in courseClassificationList" :key="i" @mouseenter="getI(i)">
                    <!-- 左边导航列表 -->
                    <div class="fx courseClassificationListLeft">
                        <i>{{item.tit}}</i><em class="iconfont icondayu"></em>
                    </div>
                    <!-- 右边显示内容 -->
                    <div v-if="id === i" class="courseClassificationListRight">
                        <div v-for="(value, index) in item.option" :key="index">
                            <h5 v-if="value.optionTit">{{value.optionTit}}</h5>
                            <ul class="courseClassificationListRightUl fx">
                                <li class="col333 pointer"
                                    v-for="(val, j) in value.optionContextList"
                                    :key="j"                      
                                    @click="toPage([i, index, j], [item.tit, value.optionTit, val])">{{val}}</li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
            <!-- <div class="banner" id="banner">
                <el-carousel class="banner-carousel" trigger="click" height="462px">
                    <el-carousel-item v-for="(item, idx) in bannerPic" :key="idx">
                        <a :href="item.url"><img v-lazy="item.pic" alt=""></a>
                    </el-carousel-item>
                </el-carousel>
            </div> -->
            <div class="banner" id="banner">
                <el-carousel class="banner-carousel" trigger="click" height="462px">
                    <el-carousel-item v-for="(item, idx) in bannerPic" :key="idx">
                        <a :href="item.url"><img v-lazy="item.pic" alt=""></a>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                id: -1,
                // 课程分类导航列表
                courseClassificationList: [
                    {
                        tit: '学前辅导',
                        option: [
                            {
                                optionTit: '',
                                optionContextList: [
                                    '幼儿英语', '幼儿算术', '幼儿诗歌', '幼儿智力开发'
                                ]
                            }
                        ]
                    },
                    {
                        tit: '小学辅导',
                        option: [
                            {
                                optionTit: '一年级',
                                optionContextList: [
                                    '数学', '英语', '语文', '冬/夏令营'
                                ]
                            },
                            {
                                optionTit: '二年级',
                                optionContextList: [
                                    '数学', '英语', '语文', '冬/夏令营'
                                ]
                            },
                            {
                                optionTit: '三年级',
                                optionContextList: [
                                    '数学', '英语', '语文', '冬/夏令营'
                                ]
                            },
                            {
                                optionTit: '四年级',
                                optionContextList: [
                                    '数学', '英语', '语文', '冬/夏令营'
                                ]
                            },
                            {
                                optionTit: '五年级',
                                optionContextList: [
                                    '数学', '英语', '语文', '冬/夏令营'
                                ]
                            },
                            {
                                optionTit: '六年级',
                                optionContextList: [
                                    '数学', '英语', '语文', '冬/夏令营'
                                ]
                            },
                            {
                                optionTit: '一对一',
                                optionContextList: [
                                    '数学', '英语', '语文'
                                ]
                            }
                        ]
                    },
                    {
                        tit: '中学辅导',
                        option: [
                            {
                                optionTit: '初一',
                                optionContextList: [
                                    '数学', '英语', '语文', '物理', '化学', '生物',
                                    '历史', '地理', '政治', '冬/夏令营'
                                ]
                            },
                            {
                                optionTit: '初二',
                                optionContextList: [
                                    '数学', '英语', '语文', '物理', '化学', '生物',
                                    '历史', '地理', '政治', '冬/夏令营'
                                ]
                            },
                            {
                                optionTit: '初三（中考）',
                                optionContextList: [
                                    '数学', '英语', '语文', '物理', '化学', '生物',
                                    '历史', '地理', '政治', '冬/夏令营'
                                ]
                            },
                            {
                                optionTit: '高一',
                                optionContextList: [
                                    '数学', '英语', '语文', '物理', '化学', '生物',
                                    '历史', '地理', '政治', '冬/夏令营'
                                ]
                            },
                            {
                                optionTit: '高二',
                                optionContextList: [
                                    '数学', '英语', '语文', '物理', '化学', '生物',
                                    '历史', '地理', '政治', '冬/夏令营'
                                ]
                            },
                            {
                                optionTit: '高三（高考）',
                                optionContextList: [
                                    '数学', '英语', '语文', '物理', '化学', '生物',
                                    '历史', '地理', '政治', '冬/夏令营'
                                ]
                            },
                            {
                                optionTit: '一对一',
                                optionContextList: [
                                    '数学', '英语', '语文', '物理', '化学', '生物',
                                    '历史', '地理', '政治'
                                ]
                            }
                        ]
                    },
                    {
                        tit: '艺术培训',
                        option: [
                            {
                                optionTit: '',
                                optionContextList: [
                                    '音乐', '美术', '舞蹈', '演讲', '摄影', '棋类', '播音主持', '艺术高考'
                                ]
                            }
                        ]
                    },
                    {
                        tit: '学历提升',
                        option: [
                            {
                                optionTit: '成人自考',
                                optionContextList: [
                                    '自考', '成人高考', '专升本'
                                ]
                            },
                            {
                                optionTit: '考研考博',
                                optionContextList: [
                                    '考研', '在职硕士', '在职博士', 'MBA'
                                ]
                            },
                            {
                                optionTit: '出国留学',
                                optionContextList: [
                                    '英国', '美国', '德国', '法国', '日本', '韩国', '澳大利亚', '其他国家'
                                ]
                            }
                        ]
                    },
                    {
                        tit: '职业培训',
                        option: [
                            {
                                optionTit: '驾驶',
                                optionContextList: [
                                    '驾驶证E', '驾驶证D', '驾驶证C', '驾驶证B', '驾驶证A'
                                ]
                            },
                            {
                                optionTit: '宠物',
                                optionContextList: [
                                    '宠物美容'
                                ]
                            },
                            {
                                optionTit: 'IT',
                                optionContextList: [
                                    '游戏开发', '办公软件', '软件系统', 'JAVA', 'iPhone开发', 'Android开发', '办公应用',
                                    '软件开发', '影视动漫', '软件测试', 'PHP', '软件制图', '平面设计师', '网页设计师'
                                ]
                            },
                            {
                                optionTit: '中西餐饮',
                                optionContextList: [
                                    '厨师', '小吃', '面试', '西点烘焙'
                                ]
                            },
                            {
                                optionTit: '美容化妆',
                                optionContextList: [
                                    '化妆', '美容', '美发', '美甲', '礼仪', '形象设计'
                                ]
                            },
                            {
                                optionTit: '数控机械',
                                optionContextList: [
                                    '电工 ', '模具设计', 'PLC编程'
                                ]
                            },
                            {
                                optionTit: '健康养生',
                                optionContextList: [
                                    '针刀整骨', '保健按摩', '插花花艺', '催乳师', '针灸'
                                ]
                            }
                        ]
                    },
                    {
                        tit: '资格证书',
                        option: [
                            {
                                optionTit: '会计',
                                optionContextList: [
                                    '会计实操', '初级会计职称', '中级会计职称', '高级会计职称', '注册会计师'
                                ]
                            },
                            {
                                optionTit: '医药',
                                optionContextList: [
                                    '临床医师', '中医医师', '药师'
                                ]
                            },
                            {
                                optionTit: '建筑',
                                optionContextList: [
                                    '建造师', '消防工程师', '造价员', '造价工程师', '建筑九大员'
                                ]
                            },
                            {
                                optionTit: '外贸',
                                optionContextList: [
                                    '报关员', '物流师'
                                ]
                            },
                            {
                                optionTit: '国家公职',
                                optionContextList: [
                                    '公务员', '教师资格证'
                                ]
                            },
                            {
                                optionTit: '职称考证',
                                optionContextList: [
                                    '内审员', '外审员', '人力资源师'
                                ]
                            },
                            {
                                optionTit: '其他职业资格',
                                optionContextList: [
                                    '育婴师', '瑜伽教练', '心理咨询师'
                                ]
                            }
                        ]
                    },
                    {
                        tit: '其他课程',
                        option: [
                            {
                                optionTit: '',
                                optionContextList: [
                                    '其他课程'
                                ]
                            }
                        ]
                    }
                ],
                bannerPic: [],
            }
        },
        methods: {
            initI(){this.id = -1}, // 初始化i 显示轮播
            getI(i){this.id = i}, // 获取i显示课程分类的哪一个内容
            /**
             * 跳转到课程列表 并将查询条件传递过去
             */
            toPage(numArr, contentArr){
                this.push({path: '/index/curriculum', query: {numArr, contentArr}});
            },
            /**
             * 初始化数据  update -> courseClassificationList bannerPic
             */
            async initialize(){
                //请求接口获取轮播图片
                this.bannerPic = await this.getAdvertisingData(4);
            }
        },
        created() {
            this.initialize();
        }
    }
</script>

<style lang="less">
    .el-icon-arrow-left, .el-icon-arrow-right{
        font-size: 30px;
    }
    .el-carousel__arrow--left, .el-carousel__arrow--right{
        z-index: 9;
    }
    .banner-carousel .el-carousel__arrow--left{
        left: 50px;
    }
    .banner-carousel .el-carousel__arrow--right{
        right: 50px;
    }
    #banner{
        left: calc(600px - 50vw);
        width: 100vw;
        .el-carousel__item{
            width: 100vw;
        }
    }
</style>
<style lang="less" scoped>
    .wrap{
        .courseClassificationList{
            position: relative;
            height: 462px;
            .initI{
                position: absolute;
                left: 0;
                top: 0;
                z-index: 3;
                width: 200px;
                height: 462px;
                padding-top: 20px;
                border: 1px solid var(--colMain);
                background-color: #fff;
                .initISub{
                    color: #666;
                    padding-left: 20px;
                    padding-right: 20px;
                    .icondayu{
                        font-size: 14px;
                    }
                    .courseClassificationListLeft{
                        justify-content: space-between;
                        align-items: center;
                        height: 44px;
                        cursor: pointer;
                    }
                    .courseClassificationListRight{
                        position: absolute;
                        top: 0;
                        left: 200px;
                        width: 1000px;
                        height: 462px;
                        padding-top: 24px;
                        padding-left: 6px;
                        background-color: #fff;
                        h5{
                            padding-bottom: 6px;
                            padding-left: 60px;
                            color: #FF7225;
                        }
                        .courseClassificationListRightUl{
                            flex-wrap: wrap;
                            .col333{
                                margin-left: 60px;
                                margin-bottom: 10px;
                                &:hover{
                                    color: #2AB0EA;
                                }
                            }
                        }
                    }
                    &:hover{
                        background-color: var(--colMain);
                        color: #fff;
                    }
                }
            }
            .banner{
                position: absolute;
                left: 0;
                top: 0;
                width: 1200px;
                height: 462px;
                .el-carousel{
                    .el-carousel__item{
                        width: 1200px;
                        img{
                            position: absolute;
                            left: 50%;
                            transform: translateX(-50%);
                            height: 100%;
                        }
                    }
                }
            }
        }
    }

</style>
