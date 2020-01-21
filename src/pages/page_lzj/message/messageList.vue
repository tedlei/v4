<template>
    <div v-if="messageObj.total" class="right-content fx">
        <div class="content">
            <div class="content-option">
                <div class="content-option-content">
                    <span class="timer col999">{{(function(){
                            let str = '系统消息列表';
                            if(cutBool*1 === 2) str = '用户消息列表';
                            if(cutBool*1 === 3) str = '学校消息列表';
                            return str;
                        }())}}</span>
                </div>
                <div class="content-option-content" v-for="(item, idx) in messageObj.rows" :key="idx"
                     @click="updateChat(item.userId, item.id, item.schoolId, idx)"
                     @mouseenter="hoverMessage(idx)"
                     @mouseleave="deleteBtn = -1">
                    <div class="bor-bottom">
                        <div class="content-option-message pointer fx">
                            <span class="col333">{{'【' + (isService && cutBool*1 === 2 ? item.nickName : item.userName) + '】'}}</span>
                            <span class="col666">{{item.messageContent}}</span>
                            <span class="content-option-message-time">{{item.time}}</span>
                        </div>
                    </div>
                    <div v-if="item.usedStatus === '1'" class="number"></div>
                    <div v-if="deleteBtn === idx"
                         class="delete iconfont iconcuohao pointer"
                         @click.stop="dlt(idx, item.userId, item.schoolId)"></div>
                </div>
            </div>
        </div>

        <!-- 分页  -->
        <el-pagination
                class="paging fx fxCenter"
                background
                layout="prev,pager,next"
                :prev-text="currentPage === 1 ? '' : '上一页'"
                :next-text="currentPage >= messageObj.total/pageSize ? '' : '下一页'"
                :page-size="pageSize"
                :total="messageObj.total"
                :hide-on-single-page="true"
                :current-page="currentPage"
                @current-change="currentChange">
        </el-pagination>
    </div>
    <div v-else class="noMessage fx fxCenter">
        <span>暂无消息</span>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                cutTimer: 0,    // 切换时间间隔  用于函数节流
                currentPage: 1, // 当前页
                pageSize: 8,
                oldSystemMessageObj: {},
                oldChatMessageObj: {},
                oldServiceMassage: {},
                messageObj: {}, // 显示数据，根据路由切换获取更新
                deleteBtn: -1 // 渲染数据对象的两个序号， 用于判断是否显示删除按钮
            }
        },
        props: ['cutBool', 'isChat', 'oldCurrentPage1', 'oldCurrentPage2', 'oldCurrentPage3', 'isSchool', 'isService'],
        methods: {
            currentChange(value){
                let category = this.$route.query.category;
                switch (category*1) {
                    case 1:
                        this.$emit('update:oldCurrentPage1', value);
                        this.systemMessage(value);
                        break;
                    case 2:
                        this.$emit('update:oldCurrentPage2', value);
                        this.serviceMassage(value);
                        break;
                    case 3:
                        this.$emit('update:oldCurrentPage3', value);
                        this.chatMessage(value);
                        break;
                    // not default
                }
            },
            /**
             * 获取系统消息列表
             */
            systemMessage(value){
                value = value || this.oldCurrentPage1;
                this.getMessageList('oldSystemMessageObj', '1', 'sys', value);
            },
            /**
             * 客服聊天消息列表
             */
            async serviceMassage(value){
                value = value || this.oldCurrentPage2;
                this.currentPage = value;
                let {isSchool, currentPage, pageSize} = this;
                // 为非学校用户且是客服时获取客服消息 反之获取系统消息
                let isService = await this.$parent.getIsService(currentPage - 1, pageSize);
                
                if ((isSchool && isService) || !isSchool) {
                    this.getMessageList('oldServiceMassage', '3', 'kefu', value, isService);
                } else this.getMessageList('oldSystemMessageObj', '1', 'sys', this.oldCurrentPage1);
            },
            /**
             * 获取学校聊天消息列表
             */
            chatMessage(value){
                value = value || this.oldCurrentPage3;
                this.currentPage = value;
                this.getMessageList('oldChatMessageObj', '3', 'mess', value);
            },
            /**
             * @param oldMessageName
             * @param num string 0 所有  1系统  2 客服  3学校
             * @param selectObj     查询对象
             * @param value 各个列表所保存的页数
             * @param serviceList   客服消息列表
             * @returns {Promise<void>}
             */
            async getMessageList(oldMessageName, num, selectObj, value, serviceList = []){
                let userInfo = this.getItem('userInfo');

                if (userInfo) {
                    if (selectObj === 'kefu') {
                        serviceList = {rows: serviceList, total: serviceList.length};
                        this.processorMessageData(serviceList, oldMessageName, selectObj);
                        return;
                    }
                    let userId = userInfo.user.id;
                    if (selectObj === 'mess') {
                        userId = this.getItem('clientId');
                    }
                    
                    this.fetch({
                        url: 'userMessage/message.do',
                        method: 'post',
                        data: {
                            userId: userId,
                            phone: userInfo.user.phone + '',
                            pageNum: value - 1 + '',
                            pageSize: this.pageSize + '',
                            num
                        }
                    }, 2).then((res)=>{
                        this.processorMessageData(res.data, oldMessageName, selectObj, value);
                    });
                }
            },
            processorMessageData(data, oldMessageName, selectObj, value){
                for (let len = data.rows.length-1, i = len; i > -1; i--) {
                    let time = data.rows[i].time;
                    time = time.slice(0, 10);
                    time = time.replace(/-/g, (str, i) => i === 4 ? '年' : '月') + '日';
                    data.rows[i].time = time;
                }
                data.el = selectObj;
                this.messageObj = this[oldMessageName] = this.parse(data);
                // this[oldMessageName] = this.parse(data);
                // 定位当前页必须写在分页组件获得数据之后
                this.currentPage = value;
            },
            // 初始化数据
            init(value){
                switch (value) {
                    case 1:
                        this.systemMessage();
                        break;
                    case 2:
                        this.serviceMassage();
                        break;
                    case 3:
                        this.chatMessage();
                        break;
                    // not default
                }
            },
            updateChat(userId, id, schoolId, idx){
                // 获取聊天对象userId传递给chat
                let result = '',
                    el = this.messageObj.el;

                result = el !== 'sys' ? userId: id;
                // console.log(userId, schoolId);
                // if (el !== 'sys') {
                //     result = el === 'mess' ? schoolId : userId;
                // } else {
                //     result = id;
                // }
                console.log(result, userId,schoolId,  444);

                this.$emit('changeChat', result, schoolId);
                // 将消息改为已读
                this.readTheMessage(id, idx);

                this.$store.commit('changeHeadMessageSync', true);
            },
            // hover时显示删除按钮
            hoverMessage(idx){
                this.deleteBtn = idx;
            },
            dlt(idx, userId, schoolId){
                this.fetch({
                    url: 'userMessage/removeMessage.do',
                    method: 'post',
                    data: {
                        userId: schoolId,
                        schoolId: userId,
                        num: '3'
                    }
                }, 2).then(()=>{
                    this.messageObj.rows.splice(idx, 1);
                })
            },
            /**
             * 将消息改为已读
             */
            readTheMessage(id, idx){
                let userInfo = this.getItem('userInfo');
                let num = this.cutBool*1;
                num = num !== 1 ? '3' : '1';

                if (userInfo) {
                    this.fetch({
                        url: 'userMessage/updateMessage.do',
                        method: 'post',
                        data: {
                            id,
                            userId: userInfo.user.id,
                            num
                        }
                    }, 2).then(()=>{
                        // 更新当前点击用户为已读
                        this.messageObj.rows[idx].usedStatus = '2';
                    })
                }
            }
        },
        created(){
            this.init(this.cutBool);
        },
        computed: {...mapState(['messageSync'])},
        watch: {
            cutBool(value){
                let {cutTimer, oldSystemMessageObj, oldChatMessageObj, oldServiceMassage} = this,
                    date = new Date();
                // 切换未超过2s则用本地存储数据
                if ((date - cutTimer) < 2000){
                    let result = null;
                    switch (value) {
                        case 2:
                            this.currentPage = this.oldCurrentPage2;
                            result = oldServiceMassage;
                            break;
                        case 3:
                            this.currentPage = this.oldCurrentPage3;
                            result = oldChatMessageObj;
                            break;
                        default:
                            this.currentPage = this.oldCurrentPage1;
                            result = oldSystemMessageObj;
                            break;
                    }
                    // 旧数据不为空则执行赋值操作
                    if (Object.keys(result).length){
                        this.messageObj = this.parse(result);
                        return;
                    }
                }
                if (value !== 2 && value !== 3) value = 1;
                this.init(value);
                this.cutTimer = date;
            },
            // 当路由指向当前页面时， 点击头部未读消息更改状态时 同步更改当前页面状态
            messageSync(value){
                if (value) {
                    this.init(this.cutBool);
                    this.$store.commit('changeMessageSync', false);
                }
            }
        }
    }
</script>

<style lang="less">
    .paging{
        width: 1120px;
        height: 98px;
        .el-pager li.number,
        .el-pager li.el-icon{
            background-color: #fff;
            color: #B3B3B3;
            font-weight: 400;
        }
        button{
            background-color: #ffffff!important;
            color: #B3B3B3!important;
        }
    }
</style>

<style scoped lang="less">
    .right-content{
        flex: 1;
        flex-direction: column;
        .content{
            overflow: hidden;
            flex: 1;
            padding-top: 6px;
            font-size: 14px;
            .content-option{
                .content-option-content{
                    position: relative;
                    padding: 0 30px;
                    .number, .delete{
                        position: absolute;
                    }
                    .number{
                        top: 16px;
                        left: 26px;
                        height: 8px;
                        width: 8px;
                        background-color: #FF0000;
                        color: #fff;
                        font-size: 12px;
                        text-align: center;
                        border-radius: 4px;
                    }
                    .delete{
                        top: 0;
                        bottom: 0;
                        right: 20px;
                        height: 30px;
                        margin: auto 0;
                        color: #ccc;
                        line-height: 30px;
                    }
                    .delete:hover{
                        color: red;
                    }
                    .content-option-message{
                        position: relative;
                        width: 880px;
                        height: 54px;
                        line-height: 54px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        .col666{
                            overflow: hidden;
                            width: 770px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            text-indent: 8px;
                        }
                        .content-option-message-time{
                            position: absolute;
                            right: -100px;
                            color: #999;
                        }
                    }
                    .timer{
                        display: block;
                        width: 100%;
                        height: 58px;
                        line-height: 58px;
                        text-indent: 5px;
                        border-bottom: 1px solid #e5e5e5;
                    }
                    &:hover{
                        background-color: #FAFAFA;
                    }
                    .bor-bottom{
                        border-bottom: 1px solid rgb(242, 242, 242);
                    }
                }
            }
        }
    }
    .noMessage{
        flex: 1;
        color: #ccc;
        font-size: 40px;
    }
</style>
