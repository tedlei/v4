<template>
    <div class="orien-app">
        <div class="orien_search fx">
            <div style="width: 90px;">城市搜索：</div>
            <el-input v-model="inputVal"
                      @change="changeValue"
                      @keyup.enter.native="changeValue(inputVal)"
                      placeholder="请输入城市"
                      suffix-icon="el-icon-search"></el-input>
        </div>
        <ul class="orien_ul1 fx">
            <li v-for="(item,i) of provinceList" :key="i" class="boxSing">
                <div :class="[i===plNum?'divBgColor':'', item ? '' : 'without']"
                     @click.stop="topSel(item)"
                >{{item || '未查找到该地址'}}</div>
            </li>
        </ul>

        <p style="color:rgba(51,51,51,1);font-size:14px;margin-top:30px;">{{provinceList[plNum]}}</p>

        <ul class="orien_ul1 fx">
            <li v-for="(item,i) in areaList" :key="i" class="boxSing">
                <div :class="i===alNum?'divBgColor':''" @click="topSelarea(i, item)">{{item}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import chinaCityList from '../../../public/js/chinaCityList.js';
    export default {
        data() {
            return {
                inputVal:'',   //输入
                provinceList:[],    //省列表
                plNum:0,  //选择的省
                areaList:[],     //市列表
                alNum:0,     //选择的市
                cityInfo: {}
            }
        },
        props: ['city', 'citySelectShow'],
        methods:{
            // 修改城市信息
            updateCityInfo(city){
                this.$emit('update:city', city);
            },
            //选择省
            topSel:function(city){
                if (this.provinceList.length === 1) return;
                let num = chinaCityList[0].indexOf(city);
                let list = chinaCityList['0_'+num];
                this.alNum = -1;
                this.plNum = num;

                if(list.length>1){
                    this.areaList = list;
                }else{
                    this.areaList = chinaCityList['0_'+num+'_0'];
                }

                let cityInfo = {
                    provincialLevel: city,
                    cityLevel: ''
                };
                this.updateCityInfo(cityInfo);
                this.cityInfo = cityInfo;
            },

            //选择区
            topSelarea(num, city){
                let cityInfo = this.parse(this.cityInfo);
                cityInfo.cityLevel = city;

                this.updateCityInfo(cityInfo);
                this.cityInfo = cityInfo;
                this.alNum = num;

                if (num === -2) return;
                // 关闭当前组件
                this.closeCurrent();
            },
            /**
             * changeValue 值更改改变显示内容
             */
            changeValue(newValue){
                let provinceListData = chinaCityList['0'];
                if (!newValue.trim()) {
                    this.provinceList = provinceListData;
                } else {
                    // 省列表中搜索
                    let result = provinceListData.find(item => {
                        return item === newValue || item === newValue + '省' || item === newValue + '市'
                    });

                    // 根据省级搜索结果获取市级列表
                    if (result) {
                        this.provinceList = [result];
                        this.plNum = 0;

                        let provinceListNumber = provinceListData.indexOf(result);
                        this.areaList =
                            chinaCityList['0_' + provinceListNumber].length === 1
                            ? chinaCityList['0_' + provinceListNumber + '_0']
                            : chinaCityList['0_' + provinceListNumber];
                    } else {
                        // 市级搜索
                        this.cityLevelListSearch(newValue);
                    }
                    if (!result) return;

                    this.topSelarea(-2, result);
                }
            },
            /**
             * 市级搜索
             * */
            cityLevelListSearch(value){
                let obj = {},
                    open = true;
                for (value in chinaCityList){
                    obj.value = chinaCityList[name].find((item)=>{
                        if (item === value || item === value + '市' || item === value + '区' || item === value + '县') {
                            obj.key = name;
                            open = false;
                            return true;
                        }
                    });
                    if (!open) break;
                }

                // 更新值
                if (obj.value) {
                    // 获取对应的省级城市

                    let province = chinaCityList[0][obj.key.substring(2, 3)];
                    this.plNum = 0;

                    // 更新省列表
                    this.provinceList = [province];

                    // 更新市列表
                    this.areaList = chinaCityList[obj.key];
                    this.alNum = chinaCityList[obj.key].indexOf(obj.value);

                    // 更新定位信息
                    this.updateCityInfo({
                        provincialLevel: province,
                        cityLevel: obj.value
                    })
                } else {
                    this.areaList = [];
                    this.provinceList = [''];
                }
            },
            /**
             * 父级获取到定位时， 更新当前组件信息
             */
            initCityInfo(cityInfo){
                // 省级序号
                let provincialLevelNumber = chinaCityList[0].indexOf(cityInfo.provincialLevel);
                // 市级序号
                let cityLevelNumber = 0,
                    cityLevelList = [];
                // 判断是否未直辖市   获取市级列表
                if (chinaCityList['0_' + provincialLevelNumber].length === 1) cityLevelList = chinaCityList['0_' + provincialLevelNumber + '_0'];
                else cityLevelList = chinaCityList['0_' + provincialLevelNumber];

                cityLevelNumber = cityLevelList.indexOf(cityInfo.cityLevel);

                // 赋值
                this.areaList = cityLevelList;

                this.plNum = provincialLevelNumber;
                this.alNum = cityLevelNumber;

                this.cityInfo = cityInfo;
            },
            // 关闭当前组件
            closeCurrent(){
                this.$emit('update:citySelectShow', false);
            }
        },
        created() {
            this.provinceList = chinaCityList['0'];

            // 初始化城市信息
            if (Object.keys(this.city).length) {
                this.initCityInfo(this.city);
            }

            // 注册关闭事件
            document.body.addEventListener('click', this.closeCurrent);
        },
        watch: {
            city(value){
                this.initCityInfo(value);
            }
        },
        destroyed() {
            // 注销关闭事件
            document.body.removeEventListener('click', this.closeCurrent);
        }
    }
</script>

<style lang="less">
    .orien_search .el-input__suffix{
        right: 0;
        .el-input__icon.el-icon-search{
            width: 40px;
            background-color: #2AB0EA;
            color: #fff;
        }
    }
</style>

<style lang="less" scoped>
    .orien-app{
        position: absolute;
        top: 100%;
        left: 0;
        width:510px;
        padding:20px;
        background:rgba(255,255,255,1);
        border-radius:5px;
        .orien_search{
            align-items: center;
            div{
                font-size: 14px;
                color:rgba(51,51,51,1);
            }
            input{
                margin-left: 15px;
                padding-left: 10px;
                width:200px;
                height:30px;
                font-size:14px;
                background:rgba(255,255,255,1);
                border:1px solid rgba(230,230,230,1);
                border-radius:5px;
            }
        }
        .orien_ul1{
            margin-top: 10px;
            flex-wrap: wrap;
            li{
                padding:4px 10px;
                div{
                    padding:3px;
                    text-align: center;
                    font-size: 14px;
                    color:rgba(128,128,128,1);
                    cursor: pointer;
                }
                .divBgColor{
                    background:rgba(255,0,0,1);
                    border-radius:2px;
                    color:white;
                }
                .without{
                    background-color: #fff;
                    color: #808080;
                }
            }
        }
    }
</style>