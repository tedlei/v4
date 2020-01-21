<template>
    <div class="footer fx">
        <div class="main fx">
            <div class="fx">
                <div class="list">
                    <h6 class="col333">关于我们</h6>
                    <ul class="fx">
                        <li class="pointer" @click="toPage('/nestling')">关于雏鸟</li>
                        <li class="pointer" @click="toPage('nestling/privacy?num=1')">隐私协议</li>
                        <li class="pointer" @click="toPage('/nestling/userAgreement?num=2')">用户使用协议</li>
                        <!-- <li @click="toPage">学校协议</li> -->
                    </ul>
                </div>
                <div class="list">
                    <h6 class="col333">帮助中心</h6>
                    <ul class="fx">
                        <li class="pointer" @click="toPage('/schoolEnter')">学校入驻</li>
                        <li class="pointer" @click="toPage('/nestling/commonIssue?num=3')">常见问题</li>
                        <li class="pointer" @click="toPage('/nestling/coupleBack?num=4')">问题反馈</li>
                        <li class="pointer" @click="toPage('/nestling/linKswop?num=5')">链接交换</li>
                    </ul>
                </div>
                <div class="list contactUs">
                    <h6 class="col333">联系我们</h6>
                    <img src="../../.././public/images/qr.jpg" alt="">
                    <span class="weixin">微信公众号</span>
                </div>
                <div class="list download">
                    <img src="../../.././public/images/qr.jpg" alt="">
                    <span class="weixin">APP下载</span>
                </div>
            </div>
            <div class="right fx">
                <p>023-61234567</p>
                <p>周一至周日9：00-18：00</p>
                <p>邮箱：123456789@qq.com</p>
                <p>QQ客服：837125489</p>
            </div>
        </div>
        <div class="last fx">
            <span class="col666">Copyright © 2019-2020 重庆雏鸟教育信息资讯有限公司 All Rights Reserved</span>
            <a href="http://www.beian.miit.gov.cn/state/outPortal/loginPortal.action" target="_blank" class="pointer col666">渝ICP备19014545号-1</a>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toPage(str){
                this.push(str);
            }
        }
    }
</script>

<style lang="less" scoped>
.footer{
    flex-direction: column;
    width: 100%;
    height: 257px;
    padding-top: 30px;
    background-color: #fff;
    .main{
        justify-content: space-between;
        width: 1200px;
        height: 160px;
        margin: 0 auto;
        border-bottom: 1px solid #e6e6e6;
        .list{
            margin-left: 97px;
            h6{font-size: 16px;}
            .fx{
                flex-direction: column;
                height: 145px;
                li{
                    margin-top: 15px;
                    color: #666666;
                    font-size: 12px;
                }
            }
            img{
                display: block;
                width: 82px;
                margin: 13px 0 10px -5px;
            }
            .weixin{
                color: #666666;
                font-size: 12px;
            }
        }
        .download{
            margin-left: 40px;
            img{margin-top: 32px;}
        }
        & .list:nth-child(1){
            margin-left: 0;
        }
        .right{
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
            padding-bottom: 20px;
        }
        .right p{
            text-align: right;
        }
        .right p:nth-child(1){
            margin-bottom: 14px;
            font-size:18px;
            font-weight:bold;
            color:rgba(51,51,51,1);
        }
        .right p:nth-child(2){
            margin-bottom: 9px;
        }
        .right p:nth-child(3){
            margin-bottom: 13px;
        }
        .right p:nth-child(2), .right p:nth-child(3){
            font-size:12px;
            color:rgba(102,102,102,1);
        }
        .right p:nth-child(4){
            width:140px;
            height:30px;
            background:rgba(255,255,255,1);
            border:1px solid var(--colMain);
            color: var(--colMain);
            text-align: center;
            line-height: 30px;
            font-size:12px;
            border-radius:5px;
        }
    }
    .last{
        flex: 1;
        flex-direction: column;
        font-size: 12px;
        text-align: center;
        letter-spacing: 1px;
        & span:nth-child(1){
            margin-top: 13px;
            margin-bottom: 7px;
        }
    }
}
</style>