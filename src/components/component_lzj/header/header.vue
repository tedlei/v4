    <template>
        <div class="header">
            <div class="main">
                <ul class="fx" style="align-items: center;">
                    <li class="list pointer" @click="toPage('/')">首页</li>
                    <li class="list" :class="disembark ? '' : 'pointer'">
                        <span @click="toPersonalCenter(disembark ? 'none' : 'toLogin')">
                            {{disembark ? nickName : '登录/注册'}}
                        </span>
                        <span v-show="disembark" class="quit pointer" @click="toPersonalCenter('quit')">退出</span>
                    </li>
                    <li class="list pointer" style="position:relative;">
                        <span v-if="inSchool < 1 || inSchool === 2"
                              @click="toPage('/schoolEnter')"
                              @mouseenter="updateUserInfoData">学校注册/入驻</span>
                        <el-dropdown v-else @command="toPage">
                            <div class="el-dropdown-link" @mouseenter="updateUserInfoData">
                                <span>学校中心</span>
                                <svg class="icon" aria-hidden="true" style="width:8px;">
                                    <use xlink:href="#icon-down"></use>
                                </svg>
                            </div>
                            <!-- 用户学校权限审核中 -->
                            <el-dropdown-menu v-if="inSchool === 1" slot="dropdown" class="in-school">
                                <el-dropdown-item command="/" style="line-height: 20px;padding: 10px 16px 20px;">
                                    系统正在加急审核机构信息中，请耐心等待，为您带来的不便，请敬请谅解！！如有问题请致电客服。
                                </el-dropdown-item>
                            </el-dropdown-menu>

                            <!-- 用户获得学校权限 -->
                            <el-dropdown-menu v-else-if="inSchool === 3" slot="dropdown" class="in-school">
                                <el-dropdown-item command="schoolAdmin">学校后台</el-dropdown-item>
                                <!-- <el-dropdown-item command="/schoolEnter?id=1">学校资料</el-dropdown-item>                               -->
                                <el-dropdown-item command="/cashDeposit">保证金</el-dropdown-item>
                                <!-- <el-dropdown-item command="/cashDeposit">学校年份VIP</el-dropdown-item>-->
                            </el-dropdown-menu>

                            <!-- 用户学校权限被封 -->
                            <el-dropdown-menu v-else slot="dropdown" class="in-school">
                                <el-dropdown-item command="/" style="line-height: 20px;padding: 10px 16px 20px;">
                                    由于您操作违反了用户协议，学校权限暂被关闭，为您带来的不便，请敬请谅解！如有问题请致电客服。
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>

                    <!-- 个人中心 -->
                    <li class="list pointer">
                        <el-dropdown @command="toPersonalCenter" :show-timeout="100">
                            <div class="el-dropdown-link">
                                <span>个人中心</span>
                                <svg class="icon" aria-hidden="true" style="width:8px;">
                                    <use xlink:href="#icon-down"></use>
                                </svg>
                            </div>

                            <!-- 未登陆的状态 -->
                            <el-dropdown-menu v-if="!disembark" slot="dropdown" class="disembark1">
                                <el-dropdown-item command="quit">请登录</el-dropdown-item>
                            </el-dropdown-menu>

                            <!-- 登陆时的状态 -->
                            <el-dropdown-menu v-else slot="dropdown" class="el-dropdown-menu-left">
                                <el-dropdown-item class="fx" command="updateLoad">
                                    <img width="32px" height="32px"
                                         :src="this.$store.getters.headPortraitUrl(this)" alt="">
                                    <span>{{nickName}}</span>
                                </el-dropdown-item>
                                <el-dropdown-item command="1" divided>个人资料</el-dropdown-item>
                                <el-dropdown-item command="2">我的关注</el-dropdown-item>
                                <el-dropdown-item command="3">我的预约  </el-dropdown-item>
                                <!-- <el-dropdown-item command="4">卡券</el-dropdown-item>-->
                                <el-dropdown-item command="5">设置</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                    <!-- 消息导航 -->
                    <li class="list pointer" >
                        <el-dropdown hide-on-click @visible-change="isShow"
                                     @command="toPage" :show-timeout="100">
                            <div class="el-dropdown-link">
                                <div v-show="messageList.length" class="el-dropdown-menu-left1-main-num"></div>
                                <span>消息</span>
                                <svg class="icon" aria-hidden="true" style="width:8px;">
                                    <use xlink:href="#icon-down"></use>
                                </svg>
                            </div>

                            <!-- 未登陆的状态 -->
                            <el-dropdown-menu v-if="!disembark" slot="dropdown" class="disembark2">
                                <el-dropdown-item><span @click="toPersonalCenter('quit')">请登录</span></el-dropdown-item>
                            </el-dropdown-menu>

                            <!-- 登陆时的状态 -->
                            <el-dropdown-menu v-else slot="dropdown" class="el-dropdown-menu-left1 fx">
                                <el-dropdown-item class="el-dropdown-menu-left1-tit">
                                    <i>消息</i>
                                    <span
                                        v-show="messageList.length"
                                        class="clear col999 pointer"
                                        @click.stop="centerDialogVisible = true">清空</span>
                                </el-dropdown-item>

                                <!-- 无消息 -->
                                <el-dropdown-item
                                    divided
                                    class="el-dropdown-menu-left1-main"
                                    v-show="!messageList.length">
                                    <svg class="icon" aria-hidden="true" style="font-size: 150px;">
                                        <use xlink:href="#icon-wuxiaoxi1"></use>
                                    </svg>
                                    <div>没有新消息</div>
                                </el-dropdown-item>

                                <!-- 有消息 -->
                                <el-dropdown-item
                                    divided
                                    v-show="messageList.length"
                                    class="el-dropdown-menu-left1-main el-dropdown-menu-left1-main1">
                                    <div @click.stop="()=>{}">
                                        <el-dialog
                                                class="dialog main_message"
                                                :modal="false"
                                                title="确定清空？"
                                                :visible.sync="centerDialogVisible"
                                                center
                                                :modal-append-to-body="false"
                                                :destroy-on-close="true">
                                            <span slot="footer" class="dialog-footer">
                                                <el-button @click="centerDialogVisible = false">取 消</el-button>
                                                <el-button type="primary" @click="clearMessage">确 定</el-button>
                                            </span>
                                        </el-dialog>
                                    </div>
                                    <div v-for="(item, i) in messageList" :key="i" class="pointer fx main_message" @click="toMsgPage(item.name, item.id)">
                                        <div class="el-dropdown-menu-left1-main-num"></div>
                                        <span class="col333">{{item.name === 'kefu' ? item.nickName : item.userName}}</span>
                                        <span class="col666 messageContent">{{item.messageContent}}</span>
                                    </div>
                                </el-dropdown-item>

                                <el-dropdown-item divided class="el-dropdown-menu-left1-footer" command="/systemMessage">
                                    <span>查看更多消息</span>
                                    <svg class="icon" aria-hidden="true" style="width:8px;">
                                        <use xlink:href="#iconyou"></use>
                                    </svg>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>

                    <!-- 网站导航 -->
                    <li class="list pointer">
                        <el-dropdown @command="websiteGuide" :show-timeout="100">
                            <div class="el-dropdown-link">
                                <span>网址导航</span>
                                <svg class="icon" aria-hidden="true" style="width:8px;">
                                    <use xlink:href="#icon-down"></use>
                                </svg>
                            </div>
                            <el-dropdown-menu slot="dropdown" class="el-dropdown-menu-left2">
                                <el-dropdown-item command="curriculum">找课程</el-dropdown-item>
                                <el-dropdown-item command="school">找学校</el-dropdown-item>
                                <el-dropdown-item command="teacher">找老师</el-dropdown-item>
                                <el-dropdown-item command="information">看资讯</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                </ul>
            </div>

            <!-- 图片上传 -->
            <imageUpload ref="imageUpload"></imageUpload>
        </div>
    </template>

    <script>
        import imageUpload from './imageUpload'
        import {mapState} from 'vuex'
        export default {
            components: {imageUpload},
            data(){
                return {
                    centerDialogVisible: false, // 清楚框是否显示
                    imageUpload: false,  // 控制上传弹窗是否显示
                    disembark: false,    // 是否登陆
                    inSchool: 0,    // 是否为学校入驻 -1未登录 0未注册学校 1审核中 2审核失败 3审核成功 4违规学校权限被封
                    messageList: [],
                    nickName: ''
                }
            },
            created(){
                this.getInfo();

                if (this.disembark) this.getServiceMessage();
            },
            computed: {...mapState(['updateUserInfo', 'headMessageSync'])},
            watch: {
                updateUserInfo(value){
                    if (value) {
                        this.getInfo();
                        this.$store.commit('changeUpdateUserInfo', false);
                    }
                },
                headMessageSync(value){
                    if (value) {
                        this.getServiceMessage();
                        this.$store.commit('changeHeadMessageSync', false);
                    }
                },
                '$route':function(to, from){
                    if (from.fullPath === '/loginAndRegister') {
                        this.getInfo();
                    }
                    if (to.path === '/index' && this.disembark) {
                        this.getServiceMessage();
                    }
                }
            },
            methods: {
                // 获取客服消息
                getServiceMessage(){
                    if (!this.userInfo) return;
                    let userInfo = this.userInfo;
                    
                    this.fetch({
                        url: 'userMessage/selectSchoolService.do',
                        method: 'post',
                        data: {
                            phone: userInfo.user.phone,
                            schoolId: userInfo.schoolUser ? userInfo.schoolUser.id : ''
                        }
                    }, 2).then((res)=>{
                        let data = res.data;
                            // isService = false;
                        if (data !== '') {
                            data = data.object.mess;
                            // isService = true;
                        } else {
                            data = [];
                        }
                        
                        // 过滤已读消息
                        for (let len = data.length-1, i = len; i > -1; i--) {
                            if (data[i].usedStatus === '2') {
                                data.splice(i, 1)
                            }
                        }

                        // this.getMessage(data, isService);
                        this.getMessage(data);
                    })
                },
                /**
                 * 获取判断信息
                 */
                getInfo(){
                    this.nickName = this.$store.getters.nickName(this);

                    this.disembark = this.isLogin();

                    // 是否为学校入驻 -1未登录 0未注册学校 1审核中 2审核失败 3审核成功 4违规学校权限被封
                    this.inSchool = this.getRoleName();
                },


                /**
                 * 获取未读消息列表
                 */
                getMessage(kefu){
                    let userInfo = this.userInfo;
                    if (userInfo) {
                        let addData = function(data, arr, name){
                            // 大于5取5  反之正常取
                            let len = data.length > 5 ? 5 : data.length;
                            for (let i = 0; i < len; i++) {
                                data[i].name = name;
                                arr.push(data[i]);
                            }
                        }
                        this.fetch({
                            url: 'userMessage/getMessage.do',
                            method: 'post',
                            data: {
                                userId: userInfo.user.id + '',
                            }
                        }, 2).then((res)=>{
                            let {mess, sys} = res.data;
                            let arr = [];
                            
                            // 动态修改优先级 便于维护
                            let sequence = [
                                {
                                    el: kefu,
                                    name: 'kefu'
                                },
                                {
                                    el: mess,
                                    name: 'mess'
                                },
                                {
                                    el: sys,
                                    name: 'sys'
                                }
                            ];

                            if (sequence[0].el.length) {
                                addData(sequence[0].el, arr, sequence[0].name)
                            }
                            if (arr.length < 5 && sequence[1].el.length) {
                                addData(sequence[1].el, arr, sequence[1].name)
                            }
                            if (arr.length < 5 && sequence[2].el.length) {
                                addData(sequence[2].el, arr, sequence[2].name)
                            }
                            
                            this.messageList = arr;
                        });
                    }
                },
                /**
                 * 清除消息（改为已读）
                 */
                clearMessage(){
                    let serviceSchoolId = this.getItem('serviceSchoolId');
                    this.centerDialogVisible = false;
                    this.fetch({
                        url: 'userMessage/updateMessage.do',
                        method: 'post',
                        data: {
                            id: '',
                            userId: this.getItem('clientId') + '',
                            schoolId: serviceSchoolId || '',
                            num: '4'
                        }
                    }, 2).then(()=>{
                        this.messageList = [];
                        this.$router.go(0);
                    })
                },
                /**
                 * [isShow 消息下拉框是否显示
                 * @param  val {[Boolean]} [false 关闭清除框]
                 * @return {void}
                 */
                isShow(val){
                    if (val) return;
                    this.centerDialogVisible = false
                },
                /**
                 * [toPersonalCenter description]
                 * @return {[void]}
                 * @param command
                 */
                toPersonalCenter(command){
                    if (command === 'none') {
                        // 
                    } else if (command === 'toLogin') {
                        this.push('/loginAndRegister');
                    } else if (command === 'quit') {
                        this.quit();
                    } else if (command === 'updateLoad') {
                        // 开启弹窗
                        this.$refs.imageUpload.imageUploadOpen();
                    } else this.push({path: '/personalCenter', query: {command}})
                },
                websiteGuide(command){
                    this.push('/index/' + command)
                },
                toPage(url){
                    if(!url) return;
                    let userInfo = this.userInfo;
                    if(url==='schoolAdmin'){   //跳转到学校后台
                        location.href = "http://www.chuniaoedu.com.cn/#/index?schoolNum="+this.compile(userInfo.user.phone);
                        return
                    }

                    if (this.$router.history.current.path === '/systemMessage' && url === '/systemMessage') return;
                    let query = {};
                    if (url === '/systemMessage') query.category = 1;
                    this.push({path: url, query});
                },

                compile(code){      //对id进行简单加密
                    var c=String.fromCharCode(code.charCodeAt(0)+code.length);
                    for(var i=1;i<code.length;i++){
                        c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
                    }
                    return escape(c);
                },

                /**
                 * toMsgPage   鉴别参数
                 */
                async toMsgPage(val, id){
                    let query = {};
                    if (val === 'sys') {
                        query.category = 1
                    } else if(val === 'kefu') {
                        query.category = 2
                    } else query.category = 3;
                    // 将消息改为已读
                    await this.readTheMessage(query.category, id);

                    let current = this.$router.history.current;
                    // 如果当前处于消息页面 则只更改category值

                    if (current.path === '/systemMessage' && current.query.category*1 === query.category) {
                        this.$store.commit('changeMessageSync', true);
                        return;
                    }
                    this.push({path: '/systemMessage', query});
                },
                /**
                 * 将消息改为已读
                 */
                readTheMessage(num, id){
                    num = num + '';
                    if (num !== '1') {
                        num = '3';
                    }

                    this.fetch({
                        url: 'userMessage/updateMessage.do',
                        method: 'post',
                        data: {
                            id: id,
                            userId: this.userInfo.user.id + '',
                            num
                        }
                    }, 2).then(()=>{
                        // 状态更改重新获取未读消息
                        this.getServiceMessage();
                    })
                },
                /**
                 * 更新本地数据
                 */
                updateUserInfoData(){
                    if (!this.disembark) return;
                    this.fetch({
                        url: '/user/findByStatus.do',
                        method: 'get',
                        data: {
                            phone: this.userInfo.user.phone
                        }
                    }, 2).then((res)=>{
                        this.inSchool = res.data*1;
                    })
                }
            }
        }
    </script>

    <style type="text/css" lang="less">
        .el-dropdown-menu.el-popper.el-dropdown-menu-left{
            z-index: 999999999999999999!important;
            width: 180px;
            span{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .el-dropdown-menu-left .el-dropdown-menu__item:nth-child(1){
            align-items: center;
        }
        .el-dropdown-menu-left img{
            margin-right: 10px;
            border-radius: 50%;
        }
        .el-dropdown-menu-left1{
            flex-direction: column;
            justify-content: space-between;
            width: 350px;
            height: 370px;
        }
        .el-dropdown-menu-left1 .el-dropdown-menu-left1-tit{
            position: relative;
            font-size: 18px;
            color: #333333;
            text-align: center;
        }
        .el-dropdown-menu-left1 .el-dropdown-menu-left1-tit:hover{
            background-color: #fff;
            color: #333333;
        }
        .el-dropdown-menu-left1 .el-dropdown-menu-left1-tit {
            .clear{
                position: absolute;
                top: 0;
                bottom: 0;
                overflow-y: hidden!important;
                right: 30px;
                margin: auto 0;
                font-size: 15px;
            }
        }
        .el-dropdown-menu-left1 .el-dropdown-menu-left1-footer{
            color: #999;
            text-align: center;
            font-size: 14px;
        }
        .el-dropdown-menu-left1 .el-dropdown-menu-left1-main{
            flex: 1;
            color: #999;
            text-align: center;
            font-size: 14px;
        }
        .el-dropdown-menu-left1 .el-dropdown-menu-left1-main:hover{
            background-color: #fff;
            color: #999;
        }
        .el-dropdown-menu-left1 .el-dropdown-menu-left1-main svg{
            margin: 35px 0 24px;
        }
        .el-dropdown-menu-left1-main.el-dropdown-menu-left1-main1{
            overflow: hidden;
            padding: 0;
            text-align: left;
            .el-dialog__wrapper{
                overflow: hidden;
                height: 128px;
            }
            .messageContent{
                display: inline-block;
                overflow: hidden;
                width: 225px;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .el-dropdown-menu-left1-main.el-dropdown-menu-left1-main1 .el-dialog__body{
            padding: 0;
        }
        .el-dropdown-menu-left1-main1 .main_message{
            position: relative;
            padding: 10px 20px;
            line-height: 22px;
            border-bottom: 1px solid #E6E6E6;
            font-size: 0;
            span, div{
                font-size: 14px;
            }
            span{
                overflow: hidden;
                margin-right: 5px;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .el-dropdown-menu-left1-main.el-dropdown-menu-left1-main1 .pointer:hover span{
            color: #2AB0EA;
        }
        .el-dropdown-menu-left1-main1 .el-dropdown-menu-left1-main-num, .el-dropdown-menu-left1-main-num{
            position: absolute;
            width: 6px;
            height: 6px;
            background-color: #FF0000;
            color: #fff;
            text-align: center;
            line-height: 16px;
            border-radius: 4px;
        }
        .el-dropdown-menu-left1-main1 .el-dropdown-menu-left1-main-num{
            top: 8px;
            left: 12px;
        }
        .el-dropdown-menu-left1-main-num{
            left: -7px;
            top: 1px;
        }
        .disembark{
            box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.1);
            border-radius:5px;
        }
        .disembark{
            box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.1);
            border-radius:5px;
        }

        .el-dropdown-menu-left1-main .dialog{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            padding: 0;
            width: 240px;
            height: 200px;
        }
        .el-dropdown-menu-left1-main .dialog > div{
            box-sizing: border-box;
            margin: 0!important;
            width: 240px;
            height: 200px;
            padding: 0;
            border: 1px solid #e5e5e5;
        }
        .in-school{
            width: 121px;
        }
    </style>
    <style scoped lang="less">
    .header{
        width: 100%;
        border-bottom: 1px solid #ccc;
        background-color: #E6E6E6;
        .main{
            width: 1200px;
            min-width: 1200px;
            height: 38px;
            margin: 0 auto;
            .fx{
                justify-content: flex-end;
                align-items: center;
                height: 38px;
                .list{
                    /*overflow: hidden;*/
                    position: relative;
                    font-size: 14px;
                    color: #808080;
                    padding-right: 40px;
                    .icondown{
                        font-size: 12px;
                    }
                    .quit{
                        color: #FF0000!important;
                    }
                }
                & .list:nth-last-child(1){
                    padding-right: 0;
                }
            }
        }
    }
    </style>