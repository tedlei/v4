/* eslint-disable no-undef */
/* eslint-disable no-undef */
<template>
    <div style="height: 147px;">
        <div :class="searchFloat ? 'wrapFlt fx' : ''" class="section">
            <div
                    class="wrapper fx"
                    :class="searchFloat ? 'flt' : ''"
                    ref="titleNav">
                <div class="left fx">
                    <img
                        src="../../../public/images/logo.png"
                        class="pointer"
                        alt=""
                        :height="searchFloat ? '40px' : '65px'"
                        @click="toIndex" >

                    <!-- 城市切换 -->
                    <div v-if="!searchFloat"
                         class="pointer citySelect"
                         @click.stop="()=>{}"
                         :style="{backgroundColor: citySelectShow ? '#fff' : '#f5f5f5'}">
                        <div class="citySelectSub"
                             :style="{paddingTop: citySelectShow ? '14px' : 0}"
                             @click="cutCitySelectShow">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-ziyuan"></use>
                            </svg>
                            <span class="cq">{{(function (){
                                    let val = city.cityLevel || city.provincialLevel;
                                    if (/(省|市)$/.test(val)) val = val.substring(0, val.length - 1);
                                    return val;
                                }())}}</span>

                            <svg class="icon" aria-hidden="true" style="width: 11px;color: #ccc;">
                                <use xlink:href="#icon-down"></use>
                            </svg>
                        </div>
                        <div :style="{display: citySelectShow ? 'none' : 'block'}" class="cutCity" @click="cutCitySelectShow">切换城市</div>

                        <!-- 城市定位 -->
                        <titleNavOrientation :style="{display: citySelectShow ? 'block': 'none'}"
                                             :city.sync="city"
                                             ref="orientation"
                                             :citySelectShow.sync="citySelectShow"></titleNavOrientation>
                    </div>
                </div>
                <div class="right fx" :class="searchFloat ? 'right-2' : ''">
                    <ul class="fx" v-if="!searchFloat">
                        <li class="pointer" :class="number === 0 ? 'col_2AB0EA_fff' : ''" @click="number = 0">课程</li>
                        <li class="pointer" :class="number === 1 ? 'col_2AB0EA_fff' : ''" @click="number = 1">学校</li>
                        <li class="pointer" :class="number === 2 ? 'col_2AB0EA_fff' : ''" @click="number = 2">名师</li>
                        <li class="pointer" :class="number === 3 ? 'col_2AB0EA_fff' : ''" @click="number = 3">资讯</li>
                    </ul>
                    <div class="input">
                        <el-input placeholder="初中一对一英语" v-model="searchContent" @keyup.enter.native="search">
                            <template slot="append" @select="search">
                                <el-button slot="append" class="iconfont iconsousuo" @click="search"></el-button>
                            </template>
                        </el-input>
                    </div>
                </div>
            </div>
            <div v-if="!searchFloat" class="fx wrapper2">
                <h4 class="title">
                    <span class="pointer"
                          @click="websiteGuide('', 0)"
                          :class="this.$store.state.number === 0 ? 'colMain' : ''">课程分类</span>
                </h4>
                <ul class="fx col333">
                    <li class="pointer"
                        @click="websiteGuide('curriculum', 1)"
                        :class="this.$store.state.number === 1 ? 'col2AB0EA' : ''"
                        >课程列表</li>
                    <li class="pointer"
                        @click="websiteGuide('school', 2)"
                        :class="this.$store.state.number === 2 ? 'col2AB0EA' : ''"
                        >学校列表</li>
                    <li class="pointer"
                        @click="websiteGuide('teacher', 3)"
                        :class="this.$store.state.number === 3 ? 'col2AB0EA' : ''"
                        >名师推荐</li>
                    <li class="pointer"
                        @click="websiteGuide('information', 4)"
                        :class="this.$store.state.number === 4 ? 'col2AB0EA' : ''"
                        >教育资讯</li>
                </ul>
            </div>
            <!-- 底部线条 -->
            <div v-if="!searchFloat" class="section-bor-bottom"></div>
        </div>
    </div>
</template>

<script>
    import commonApi from '../../../public/js/common.js'
    import titleNavOrientation from "./titleNavOrientation";
    export default {
        components: {titleNavOrientation},
        data(){
            return {
                searchFloat: false, // 搜索框是否浮动
                number: 0,  // 默认课程搜索
                searchContent: '',// 搜索内容
                city: {},
                citySelectShow: false   // 城市列表是否显示
            }
        },
        methods: {
            toIndex(){
                let path = this.$route.path;
                if (path === '/' || path === '/index') return;
                this.push('/');
            },
            /**
             * 切换城市列表显示与隐藏
             */
             cutCitySelectShow(){this.citySelectShow = !this.citySelectShow},
            /**
             * 头部搜索是否跟随页面
             */
            scroll(){
                // 获取节点高度 与到可视区域左上角的垂直的距离
                let {height} = this.$refs.titleNav.getBoundingClientRect();

                let top = commonApi.getElementViewTop(this.$refs.titleNav);

                let result = top <= 0 && Math.abs(top) >= height;

                if(result === this.searchFloat) return;

                this.searchFloat = result;
            },
            /**
             * 视图滚动事件
             */
            windowScroll(){this.scroll()},
            websiteGuide(command, number){
                this.$store.commit('changeNumber', number);
                this.push('/index/' + command);
            },
            search(){
                // 搜索对象和内容相同则拦截搜索
                let route = this.$route;

                let {number, searchContent} = this,
                    url = '';
                // if (!searchContent.trim()){
                //     this.$message('请输入搜索内容');
                //     return ;
                // }

                switch (number) {
                    case 1:
                        url = '/index/school';
                        break;
                    case 2:
                        url = '/index/teacher';
                        break;
                    case 3:
                        url = '/index/information';
                        break;
                    default :
                        url = '/index/curriculum';
                        break;
                }

                if (route.path === url && route.query.search === searchContent) {
                    return; // 重复搜索
                }

                this.push({path: url, query: {search: searchContent}})
            },
            /**
             * 获取定位信息
             */
            getLocation(){
                return new Promise(resolve => {
                    // eslint-disable-next-line no-undef
                    AMap.plugin('Amap.Geolocation', ()=> {
                        // eslint-disable-next-line no-undef
                        let geolocation = new AMap.Geolocation({
                            enableHighAccuracy: true,//是否使用高精度定位，默认:true
                            timeout: 50000,          //超过10秒后停止定位，默认：5s
                            buttonPosition:'RB',    //定位按钮的停靠位置
                            // eslint-disable-next-line no-undef
                            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                            zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
                        });
                        
                        // map.addControl(geolocation);
                        geolocation.getCurrentPosition((status,result)=>{
                            let cityInfo = {};
                            if(status !== 'error'){
                                // eslint-disable-next-line no-undef
                                // eslint-disable-next-line no-unused-vars
                                let geocoder = new AMap.Geocoder({
                                    city: "010", //城市设为北京，默认：“全国”
                                    radius: 1000 //范围，默认：500
                                });
                                // 获取地址信息
                                cityInfo.provincialLevel = result.addressComponent.province;
                                cityInfo.cityLevel = result.addressComponent.district;
                                // 更新定位子组件信息
                                this.$refs.orientation.initCityInfo(cityInfo);
                            } else {
                                cityInfo.provincialLevel = '重庆市';
                                cityInfo.cityLevel = '南岸区';
                            }
                            resolve(cityInfo);
                        });
                    });
                });
            }
        },
        async created(){
            // 课程学校等搜索的序号
            if (this.getItem('name') === null) this.setItem('name',  0);
            this.number = this.getItem('name')*1;
            // 初始化定位信息
            // 获取定位信息
            if(!this.getItem('position')){
                // 获取定位信息
                let cityInfo = await this.getLocation();
                this.setItem('position', cityInfo);
                this.city = cityInfo;
            } else {
                this.city = this.getItem('position');
            }
        },
        mounted(){
            /**
             * 注册滚动事件
             */
            // commonApi.mousewheel(document.body, () => {
            //     this.scroll();
            //     // 是否允许默认行为
            //     return true;
            // });
            window.addEventListener('scroll', this.windowScroll);
        },
        // 销毁后
        destroyed() {
            // 注销滚动事件
            // commonApi.removeMousewheel();

            window.removeEventListener('scroll', this.windowScroll);
        },
        watch: {
            number(value){
                this.setItem('name',  value);
            },
            city(newValue){
                this.setItem('position', newValue);
                this.$store.commit('changeAddressUpdate', true);
            },
            $route(){
                this.searchContent ='';
            }
        }
    }
</script>
<style lang="less">
    .el-input-group__append{
        width: 80px;
        text-align: center;
        background-color: var(--colMain);
        color: #fff;
        border: 1px solid var(--colMain);
    }
    .el-input__inner:focus{
        border-color: var(--colMain);
    }
</style>
<style lang="less" scoped>
    .col2AB0EA{
        color: var(--colMain);
    }
    .col_2AB0EA_fff{
        background-color: var(--colMain);
        color: #fff!important;
    }
    .wrapper{
        position: relative;
        z-index: 10;
        justify-content: space-between;
        width: 1200px;
        min-width: 1200px;
        height: 118px;
        padding-top: 5px;
        padding-bottom: 23px;
        .left{
            position: relative;
            z-index: 2;
            align-items: center;
            #iconziyuan{
                height: 18px;
                background-color: var(--colMain);
            }
            .citySelect{
                position: relative;
                margin-left: 50px;
                padding: 0 6px;
                .citySelectSub{
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 5px;
                }
            }
            .cq{
                margin: 0 6px 0 2px;
                font-size: 16px;
                text-align: center;
                color: #333333;
            }
            #icondown{
                width:11px;
            }
            .cutCity{
                height: 22px;
                background-color: rgba(242,242,242,1);
                border:1px solid rgba(204,204,204,1);
                color: #999999;
                text-align: center;
                line-height: 22px;
            }
        }
        .right{
            flex-direction: column;
            justify-content: space-between;
            height: 90px;
            .input{
                width: 580px;
                .iconsousuo{
                    font-size: 23px;
                }
            }
            .fx{
                padding-top: 14px;
                color: #999999;
                li{
                    width: 62px;
                    height: 38px;
                    font-size: 14px;
                    text-align: center;
                    line-height: 38px;
                }
            }
        }
        .right-2{
            height: 40px;
        }
    }
    .flt{
        align-items: center;
        height: 60px;
        padding: 0;
    }
    
    .section{
        position: relative;
        .wrapper2{
            padding-bottom: 5px;
            .title{
                width: 200px;
                padding-left: 4px;
                font-size: 18px;
            }
            ul.col333 li{
                margin-left: 66px;
                font-size: 16px;
            }
        }
        .section-bor-bottom{
            position: absolute;
            left: calc(1200px/2 - 100vw/2);
            bottom: 0;
            width: 100vw;
            height: 2px;
            background-color: var(--colMain);
        }
    }
    .wrapFlt{
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 60px;
        background-color: #fff;
        border-bottom: 2px solid var(--colMain);
        z-index: 10;
    }
</style>