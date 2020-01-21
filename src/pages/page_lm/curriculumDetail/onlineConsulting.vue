<template>
    <div class="right-content fx col333">
        <h5>在线咨询</h5>

        <!-- 根据日期显示消息 -->
        <div ref="scroll" class="right-content-main fx">

            <!-- 点击查看历史消息 -->
            <div class="historyMessage pointer" @click="getHistoryMessage"><span>{{historyText}}</span></div>

            <div v-for="(item, i) in dataList.list" :key="i" class="list">
                <!-- 聊天消息 根据id区分是发出的消息还是接受的消息 切换right-content-main-from 与 right-content-main-send类名  -->
                <div v-for="(value, index) in item.main"
                     :key="index"
                     class="messageList"
                     :class="value.messageSource === '2' ? 'right-content-main-from fx' : 'right-content-main-send fx'">
                    <div class="messageList_tit fx">
                        <span>{{value.messageSource === '2' ? dataList.nickname : '我'}}</span>
                        <span class="timer" v-html="value.timer"></span>
                    </div>
                    <!-- 聊天信息 -->
                    <div class="messageContext">
                        <span v-if="value.messageSource === '2'" style="display:block;margin-bottom: 9px;font-size: 16px;">{{value.teacherName}}</span>
                        <div class="details">
                            <p>{{value.messageContent}}</p>
                            <div class="triangle"></div><!-- 箭头 -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="right-content-footer-message">
                <el-input
                        class="chat"
                        type="textarea"
                        :autosize="{ minRows: 1, maxRows: 2}"
                        placeholder="请输入内容"
                        @focus="focus"
                        @blur="blur"
                        @keydown.enter.native="enterSend"
                        v-model="input">
                </el-input>
                <span class="number col999">{{200 - input.length}}字</span>
            </div>
            <div class="send" :class="input.length ? 'isSend' : ''" @click="send(input, 'send')">发送</div>
        </div>
    </div>
</template>

<script>
    import socket from '../../../../public/socket.io';
    import {mapState} from 'vuex';

    export default {
        data(){
            return {
                pageNum: 0, // 页数
                pageSize: 4,  // 单页数量
                historyText: '点击查看历史消息',
                input: '',
                oldScrollHeight: '',    // 更新历史之前保存更新之前的滚动高度
                authScrollHeight: false, // 当为true 则不触发更新生命周期
                userInfo: null,
                dataList: {}
            }
        },
        created(){
            this.userInfo = this.getItem('userInfo');
            // 建立socket链接
            this.createSocket();
        },
        mounted() {
            this.init(this.$route);
        },
        destroyed(){
            // 断开socket连接
            this.socket.close();
        },
        methods:{
            /**
             * socket
             */
            createSocket(){
                let ws = socket('http://120.78.145.39:9108/');
                ws.on('communication', msg => {   // key 用于接受服务端定义为key的对应消息
                    this.send(msg, 'from');
                });
                let userId = this.userInfo.user.id;
                ws.emit('username', 'user' + userId);
                this.socket = ws;
            },
            // enter键发送消息
            enterSend(){
                this.send(this.input, 'send');
            },
            focus(){
                let el = document.querySelector('.right-content-footer-message .chat .el-textarea__inner');

                el.style.backgroundColor = '#fff';
            },
            blur(){
                let el = document.querySelector('.right-content-footer-message .chat .el-textarea__inner');

                el.style.backgroundColor = '#FAFAFA';
            },
            /**
             * 获取聊天消息列表
             */
            getDataList(elId, dataList){
                let userInfo = this.userInfo;
                if (userInfo) {
                    let {pageNum, pageSize} = this;
                    window.localStorage.removeItem('chatShowNumber');
                    if (dataList) {
                        pageNum = Math.ceil(dataList.sum/pageSize);
                    } else {
                        pageNum = 0;
                        // 获取已渲染消息数量
                        let chatShowNumber = this.getItem('chatShowNumber');
                        if (chatShowNumber) {
                            pageSize = Math.max(pageSize, chatShowNumber*1);
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
                            pageSize: pageSize.toString(), // 数.量
                            num: '3'
                        }
                    }, 2).then((res)=>{
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
                        } else if (len === 0) return;

                        for (let i = 0; i < len; i++) {
                            let timer = data[i].time.split(' '),
                                timer1 = timer[0],
                                timer2 = timer[1].slice(0, 5);

                            // 是否已有当前 number 的属性存在  且存在属性对象值中的日期时间是否与当前日期时间相等
                            if (number > -1 && obj.list[number].main[0].time.slice(0, 10) === timer1) {
                                data[i].timer = '(' + timer1 + '&nbsp;&nbsp;' + timer2 + ')';
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
                                // d.timer = timer1;
                                d.main = [];
                                data[i].timer = '(' + timer1 + '&nbsp;&nbsp;' + timer2 + ')';
                                d.main[0] = data[i];
                                obj.list.unshift(d);
                                if (!length)  number++;
                            }

                            // 等于则为所接收的消息
                            if (data[i].target === userId) {
                                data[i].messageSource = '2'
                            }
                        }

                        obj.fromImgSrc = res.data.head;
                        obj.sendImgSrc = this.getHeadPortraitUrl();
                        obj.nickname = res.data.nickname;
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
             * 获取历史消息
             */
            getHistoryMessage(){
                // 使滚动条处于当前消息的位置不变
                this.authScrollHeight = false;
                // 传入当前显示数据  往里面添加
                if (this.historyText !== '没有更多数据了') {
                    this.getDataList(this.$route.query.id, this.parse(this.dataList));
                }

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
                let schoolId = this.$route.query.id;
                let userId = this.userInfo.user.id;

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
                

                obj.schoolId = schoolId;    // 聊天对象id
                obj.userId = userId;     // 当前用户id
                obj.time = nowTimer;
                obj.timer = '(' + nowTimer.slice(0, nowTimer.length - 3) + ')';

                let nowDate = nowTimer.slice(0, 10);

                // 当前无消息时
                if (!dataList.list) dataList.list = [];
                // 存在消息且发送时间等于最后的日期  则往日期的data中添加数据
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
            init(r){
                this.getDataList(r.query.id);
            }
        },
        beforeUpdate(){
            // 输入时或者发送消息时不处罚获取oldScrollerHeight
            if (this.authScrollHeight === null || this.authScrollHeight) return;

            // 获取更新之前的滚动高度
            let el = this.$refs.scroll;
            this.oldScrollHeight = el.scrollHeight;
        },
        updated() {
            // 输入时不触发更新
            if (this.authScrollHeight === null) return;

            let el = this.$refs.scroll;

            if (this.authScrollHeight)  el.scrollTop = el.scrollHeight;
            else el.scrollTop = el.scrollHeight - this.oldScrollHeight;
        },
        computed: {...mapState(['messageSync'])},
        watch: {
            input(value){
                if (!value) return;
                this.authScrollHeight = null;
                if (value.length >= 200) {
                    this.input = value.substring(0, 200)
                }
            },
            $route(r){
                this.init(r);
            },
            messageSync(val){
                if (val) {
                    this.dataList.sendImgSrc = this.getHeadPortraitUrl();
                    this.$store.commit('changeMessageSync', false);
                }
            }
        }
    }
</script>

<style lang="less">
    .right-content{
        .chat {
            .el-textarea__inner{
                min-height: 50px;
                padding-right: 85px;
                background-color: #FAFAFA;
            }
        }
    }
</style>

<style scoped lang="less">
    .right-content{
        flex-direction: column;
        justify-content: space-between;
        width: 100vw;
        height: 100vh;
        background-color: #fff;
        font-size: 14px;
        h5{
            height: 30px;
            padding-left: 20px;
            background-color: #FF7225;
            color: #fff;
            line-height: 30px;
        }
        .right-content-main{
            position: relative;
            overflow-x: hidden;
            flex: 1;
            flex-direction: column;
            align-content: flex-end;
            padding: 40px 30px 0;
            .historyMessage{
                position: absolute;
                top: 9px;
                left: 0;
                right: 0;
                width: 128px;
                margin: auto;
                padding: 4px 16px;
                color: #4a4a4a;
                font-size: 12px;
                background-color: #e1e1e1;
                border-radius: 16px;
            }
            .list{
                flex-direction: column;
            }
            .messageList{
                flex-direction: column;
            }
            .right-content-main-from, .right-content-main-send{
                margin-bottom: 12px;
                font-size: 14px;
                .messageList_tit{
                    margin-bottom: 14px;
                    & span:nth-child(2){
                        margin: 0 10px;
                    }
                }
                .details{
                    display: inline-block;
                    position: relative;
                    padding: 8px;
                    line-height: 24px;
                    border-radius:5px;
                    .triangle{
                        position: absolute;
                        top: 2px;
                        border-width: 8px 15px;
                        border-style: solid;
                    }
                }
            }
            .right-content-main-from{
                .details{
                    background-color: #E6E6E6;
                    color: #333;
                    .triangle{
                        left: -29px;
                        border-color: #fff #e6e6e6 #fff #fff;
                    }
                }
            }
            .right-content-main-send{
                justify-content: end;
                .messageList_tit{
                    flex-direction: row-reverse;
                }
                .details{
                    flex-direction: row-reverse;
                    background-color: #2AB0EA;
                    color: #fff;
                    .triangle{
                        right: -29px;
                        border-color: #fff #fff #fff #2AB0EA;
                    }
                }
                .messageContext{
                    display: flex;
                    justify-content: flex-end;
                }
            }
            /*& > div:nth-last-child(1){*/
            /*    margin-bottom: -30px;*/
            /*}*/
        }
        .footer{
            position: relative;
            height: 130px;
            padding: 15px 30px 15px;
            border-top: 1px solid #FF7225;
            .right-content-footer-message{
                position: relative;
                .number{
                    position: absolute;
                    bottom: 6px;
                    right: 20px;
                    font-size:14px;
                }
            }
            .send{
                float: right;
                width:80px;
                height:40px;
                margin-top: 10px;
                background:rgba(230,230,230,1);
                color:rgba(153,153,153,1);
                font-size:14px;
                text-align: center;
                line-height: 40px;
                border-radius:5px;
            }
            .isSend{
                background-color: #2ab0ea;
                color: #fff;
            }
        }
    }
</style>