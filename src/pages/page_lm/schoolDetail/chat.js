import socket from '../../../../public/socket.io'
import {mapState} from "vuex";

export default {
    data(){
        return {
            pageNum: 0, // 页数
            pageSize: 4,  // 单页数量
            socket: null,   // socket 对象
            historyText: '点击查看历史消息',    // 历史按钮内容
            input: '',  // 消息内容
            oldScrollHeight: '',    // 更新历史之前保存更新之前的滚动高度
            authScrollHeight: false, // 当为true 则不触发更新生命周期
            userInfo: null,
            dataList: {}    // 消息列表
        }
    },
    methods:{
        /**
         * 获取聊天消息列表
         * @param elId      聊天对象userId
         * @param dataList  当点击查看历史消息时传入
         */
        getDataList(elId, dataList = false) {
            let userInfo = this.userInfo;
            if (userInfo) {
                let {pageNum, pageSize} = this;
                window.localStorage.removeItem('chatShowNumber');
                if (dataList) {
                    pageNum = Math.ceil(dataList.sum / pageSize);
                } else {
                    pageNum = 0;
                    // 获取已渲染消息数量
                    let chatShowNumber = this.getItem('chatShowNumber');
                    if (chatShowNumber) {
                        pageSize = Math.max(pageSize, chatShowNumber * 1);
                    }
                }

                let userId = userInfo.user.id;

                this.fetch({
                    url: 'userMessage/getMessageDetails.do',
                    method: 'post',
                    data: {
                        userId, // 本人id
                        elId, // 聊天对象id
                        pageNum: pageNum.toString(),   // 页数
                        pageSize: pageSize.toString(), // 数量
                        num: '0'    // 系统消息传入 '4' 否则任意值
                    }
                }, 2).then((res) => {
                    if (typeof res.data.message === 'string') {
                        // 未查找到用户 显示404
                        this.hideError = false;
                        this.authScrollHeight = null;
                        return;
                    } else this.hideError = true;

                    let data;
                    data = res.data.object;

                    // 适配器 适配前端数据结构 start
                    let obj = {},
                        number = -1,
                        length = 0;
                    // 存在值则为点击查看历史消息触发
                    let len = data.length;
                    if (dataList) {
                        if (len === 0) {
                            this.historyText = '没有更多数据了';
                            return
                        }

                        length = Object.keys(dataList.list).length;
                        if (length) {
                            obj = dataList;
                            number = 0;
                        }
                    }

                    for (let i = 0; i < len; i++) {
                        let timer = data[i].time.split(' '),
                            timer1 = timer[0],
                            timer2 = timer[1].slice(0, 5);

                        // 是否已有当前 number 的属性存在  且存在属性对象值中的日期时间是否与当前日期时间相等
                        if (number > -1 && obj.list[number].main[0].time.slice(0, 10) === timer1) {
                            data[i].timer = timer2;
                            obj.list[number].main.unshift(data[i]);
                            obj.sum++;
                        } else {
                            // 反之则新增一个数组对象存储消息列表
                            // 获取总条数 设置存储消息的数组
                            if (number === -1) {
                                obj.list = [];
                                obj.sum = 0;
                            }

                            obj.sum++;
                            let d = {};
                            d.timer = timer1;
                            d.main = [];
                            data[i].timer = timer2;
                            d.main[0] = data[i];
                            obj.list.unshift(d);
                            if (!length) number++;
                        }
                        // 等于则为所接收的消息
                        if (data[i].target === userId) {
                            data[i].messageSource = '2'
                        }
                    }
                    obj.fromImgSrc = res.data.head;
                    obj.sendImgSrc = this.getHeadPortraitUrl();
                    obj.name = res.data.name;

                    // 未查找到数据时
                    if (typeof obj.sum === 'undefined') {
                        obj.sum = 0;
                        obj.list = [];
                    }
                    // 适配器  end

                    this.dataList = obj;

                    // 获取当前显示数据的长度， 当刷新时设置pageSize为此数量
                    this.setItem('chatShowNumber', obj.sum);
                });
            }
            
        },
        /**
         * socket
         */
        createSocket(){
            let ws = socket('http://192.168.3.88:9108');
            ws.on('communication', msg => {   // key 用于接受服务端定义为key的对应消息
                this.send(msg, 'from');
            });
            let userId = this.userInfo.user.id;
            ws.emit('username', 'user' + userId);
            this.socket = ws;
        },
        /**
         * 获取历史消息
         * @param elId  聊天对象 用户id
         */
        getHistoryMessage(elId){
            // 使滚动条处于当前消息的位置不变
            this.authScrollHeight = false;
            this.getDataList(elId, this.parse(this.dataList));

            this.closeUpdated();
        },

        /**
         * 获取自身头像
         */
        getHeadPortraitUrl() {
            return this.$store.getters.headPortraitUrl(this);
        },
        /**
         * send  发送消息
         */
        send(input, from){
            // 滚动条滚动到底部
            this.authScrollHeight = true;

            let {dataList} = this,
                nowTimer = this.getTimer();

            if (!input.trim().length) {
                this.$message('请输入内容');
                return;
            }

            if (!dataList.list) {
                dataList.list = [];
                dataList.sendImgSrc = this.getHeadPortraitUrl();
                dataList.fromImgSrcs = '';
                dataList.sum = 0;
            }
            dataList.sum++;

            // dataList 中 选项的的data属性的数据
            let obj = {};

            if (from === 'send') {
                obj.messageContent = input;
                obj.messageSource = '1';
                obj.teacherName = this.getItem('chatNickName');
            } else {
                let arr = input.split(',');
                obj.messageContent = arr[0];
                obj.messageSource = '2';
                obj.teacherName = arr[1];
            }

            // let schoolId = this.$route.query.id;
            // let userId = this.userInfo.user.id;
            let schoolId = this.teacObj.id;
            let userId = this.userInfo.user.id;
            obj.schoolId = schoolId;    // 聊天对象id
            obj.userId = userId;     // 当前用户id
            obj.time = nowTimer;
            obj.timer = nowTimer.slice(11, -3);
            let nowDate = nowTimer.slice(0, 10);

            // 发送时间等于最后的日期  则往日期的data中添加数据
            if (dataList.list.length && nowDate === dataList.list[dataList.list.length - 1].timer) {
                let dataObj = this.dataList.list[dataList.list.length - 1];
                dataObj.main.push(obj);
            } else {    // 新一日的数据
                let dataListOption = {};
                dataListOption.timer = nowDate;
                dataListOption.main = [];
                dataListOption.main.push(obj);
                this.dataList.list.push(dataListOption);
            }

            if (from === 'send') {
                obj = this.parse(obj);
                obj.Target = 'user' + schoolId;
                obj.self = 'user' + userId;
                obj.phone = this.userInfo.user.phone;
                obj.currentId = this.getItem('clientId');
                delete obj.timer;
                
                // 向套接字发送消息
                this.socket.emit('communication', this.stringify(obj));
            }

            this.closeUpdated();

            // 发送完毕 初始化input值
            this.input = '';
        },
        // 关闭 beforeUpdate  updated
        closeUpdated(){
            let timer = setTimeout(()=>{
                this.authScrollHeight = null;
                clearTimeout(timer);
            })
        },
        // 删除
        dlt(i, index, id){
            let dataList  = this.parse(this.dataList);
            if (this.cutBool*1 === 1) {
                // 删除系统消息
                this.fetch({
                    url: 'userMessage/removeSysMessage.do',
                    method: 'post',
                    data: {
                        id,
                        userId: this.userInfo.user.id
                    }
                }, 2).then(()=>{
                    this.dataList = {};
                })
            } else {
                // 客服与学校消息删除单条消息
                let schoolId = this.teacObj.userId;
                this.fetch({
                    url: 'userMessage/removeMessageDetails.do',
                    method: 'post',
                    data: {
                        id,
                        userId: this.userInfo.user.id,
                        schoolId,
                    }
                }, 2).then(()=>{
                    dataList.sum--;
                    dataList.list[i].main.splice(index, 1);
                    if (dataList.list[i].main.length === 0) dataList.list.splice(i, 1);
                    this.dataList = dataList;
                })
            }
        },
        // enter键发送消息
        enterSend(){
            this.send(this.input, 'send');
        },
        init(val){
            this.getDataList(val.id);
        }
    },
    beforeUpdate(){
        // 输入时或者发送消息时不触发获取oldScrollerHeight
        if (this.authScrollHeight === null || this.authScrollHeight) return;

        // 获取更新之前的滚动高度
        let el = this.$refs.scroll;
        this.oldScrollHeight = el.scrollHeight;
    },
    updated() {
        // 输入时不触发更新
        if (this.authScrollHeight === null) return;

        let el = this.$refs.scroll;

        if (this.authScrollHeight) {
            // 滚动到底部
            el.scrollTop = el.scrollHeight;
        } else {
            // 滚动条保持当前位置不变
            el.scrollTop = el.scrollHeight - this.oldScrollHeight;
        }
    },
    created(){
        this.userInfo = this.getItem('userInfo');
        // 建立socket链接
        this.createSocket();
    },
    destroyed(){
        // 断开socket连接
        this.socket.close();
    },
    mounted() {
        let teacObj = this.teacObj;
        if(teacObj.toString()!=='{}'){
            this.init(teacObj);
        }
    },
    computed: {...mapState(['messageSync'])},
    watch: {
        input(value){
            if (!value) return;
            this.authScrollHeight = null;
            if (value.length >= 400) {
                this.input = value.substring(0, 400)
            }
        },
        teacObj(val){
            this.init(val);
        },
        messageSync(val){
            if (val) {
                this.dataList.sendImgSrc = this.getHeadPortraitUrl();
                this.$store.commit('changeMessageSync', false);
            }
        }
    }
}
