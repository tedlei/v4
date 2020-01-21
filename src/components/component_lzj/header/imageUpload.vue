<template>
    <!-- 图片上传 -->
    <el-dialog
            title="上传头像"
            :visible.sync="imageUpload"
            width="500px"
            class="imageUpload">
        <div :style="{userSelect: 'none'}">
            <div class="pic">
                <div class="pic-left">
                    <div style="padding-top: 0;position: relative"
                         ref="picParent"
                         @mousedown="down"
                         @mouseenter="enter">
                        <img class="sss" :style="{
                            left: moveObj.x + 'px',
                            top: moveObj.y + 'px',
                            width: imgWH.w + 'px',
                            height: imgWH.h + 'px',
                            transform: 'rotate(' + rotateVal + 'deg)'}"
                             ref="image"
                             :src="currentPic" alt="">
                    </div>
                    <div>
                        <label for="picture">重新上传</label>
                        <span>
                            <i class="iconfont iconiconset0187" @click="scaleSB('small')"></i>
                            <i class="iconfont iconjia" @click="scaleSB('big')"></i>
                            <i class="iconfont iconyulanxuanzhuan" @click="rotate"></i>
                        </span>
                    </div>
                </div>
                <div class="pic-right">
                    <div class="pic-right-top">
                        <div>
                            <img :style="{
                                 position: 'absolute',
                                 left: previewMoveObj.x + 'px',
                                 top: previewMoveObj.y + 'px',
                                 width: previewWh.w + 'px',
                                 height: previewWh.h + 'px',
                                 transform: 'rotate(' + rotateVal + 'deg)'}"
                                 :src="currentPic" alt="">
                        </div>
                        <span>头像预览</span>
                    </div>
                    <div class="pic-right-bottom">
                        <img width="110px"
                             height="110px"
                             :src="lastPic" alt="">
                        <span><i>历史头像</i> <i>使用</i></span>
                    </div>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="uploading">确 定</el-button>
            <el-button @click="imageUpload = false">取 消</el-button>
        </span>
        <input type="file"
               id="picture"
               @change="getPicture"
               style="position: fixed;bottom: -10000px;">
    </el-dialog>
</template>

<script>
    import commonApi from '../../../../public/js/common'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                userSelect: true, // 上传图片拖动时， 该区域文字无法被选中
                imageUpload: false, // 控制上传弹窗是否显示
                fileObj: null,  // 传递给后台的file对象
                // 裁剪图的定位值
                moveObj: {
                    x: 0,
                    y: 0
                },
                // 裁剪图的宽高
                imgWH: {
                    w: 300,
                    h: 300
                },
                // 预览图的定位值
                previewMoveObj: {
                    x: 0,
                    y: 0
                },
                // 预览图的宽高
                previewWh: {
                    w: 110,
                    h: 110
                },
                imageParent_previewImageParent_scale: 110 / 300,
                rotateVal: 0,  // 旋转角度
                currentPic: '',
                lastPic: ''
            }
        },
        methods: {
            imageUploadOpen() {
                // 暂无更改功能  初始化previewWh
                this.moveObj = {x: 0, y: 0};
                this.imgWH = {w: 300, h: 300};
                this.previewMoveObj = {w: 0, h: 0};
                this.previewWh = {w: 110, h: 110};

                this.imageUpload = true
            },
            /**
             * 鼠标移入 注册滚轮事件  并阻止默认行为
             */
            enter() {
                let picParent = this.$refs.picParent,
                    mousewheel = (e) => {
                        // 控制图片宽高
                        let wh = this.parse(this.imgWH),
                            pWH = this.parse(this.previewWh),
                            size = e.wheelDelta / 20,
                            moveObj = this.parse(this.moveObj),
                            previewMoveObj = this.parse(this.previewMoveObj),
                            imageParent_previewImageParent_scale = this.imageParent_previewImageParent_scale;

                        // 大图缩放
                        wh.w += size;
                        wh.h += size;
                        /**
                         * 控制图片相对当前鼠标位置不变
                         * */
                            // 获取鼠标位置相对于图片父元素的位置比例值
                        let {width, height} = e.target.getBoundingClientRect(),
                            {pageX, pageY} = e,
                            scaleX = (pageX - commonApi.getElementViewLeft(e.target)) / width,
                            scaleY = (pageY - commonApi.getElementViewTop(e.target)) / height;

                        // 获取图片位置信息
                        let img = this.$refs.image,
                            imgWidth = img.getBoundingClientRect().width,
                            imgHeight = img.getBoundingClientRect().height,
                            imgLeft = commonApi.getElementViewLeft(img),
                            imgTop = commonApi.getElementViewTop(img);

                        // 当鼠标在图片中时   图片相对于鼠标位置缩放  否则以父元素中心点缩放
                        if (pageX > imgLeft && pageX < (imgLeft + imgWidth)
                            && pageY > imgTop && pageY < (imgTop + imgHeight)) {
                            scaleX = (pageX - imgLeft) / imgWidth;
                            scaleY = (pageY - imgTop) / imgHeight;
                        }
                        moveObj.x += -size * scaleX;
                        moveObj.y += -size * scaleY;

                        // 预览图缩放
                        pWH.w += size * imageParent_previewImageParent_scale;
                        pWH.h += size * imageParent_previewImageParent_scale;

                        previewMoveObj.x += -size * scaleX * imageParent_previewImageParent_scale;
                        previewMoveObj.y += -size * scaleY * imageParent_previewImageParent_scale;

                        this.imgWH = wh;
                        this.previewWh = pWH;
                        this.moveObj = moveObj;
                        this.previewMoveObj = previewMoveObj;

                        // 是否允许默认行为
                        return false;
                    };


                // 注册缩放事件
                commonApi.mousewheel(picParent, mousewheel);

                // 注销缩放事件
                picParent.onmouseleave = function () {
                    commonApi.removeMousewheel(picParent, mousewheel);
                }
            },
            /**
             * 鼠标按下注册移动事件
             * @param e
             */
            down(e) {
                let self = this,
                    el = e.target,
                    beginPrintX = e.pageX,
                    beginPrintY = e.pageY,
                    {moveObj, previewMoveObj, imageParent_previewImageParent_scale} = self;

                // 鼠标移动事件
                function move(e) {
                    self.moveEvent(e, beginPrintX, beginPrintY, moveObj, previewMoveObj, imageParent_previewImageParent_scale);
                }

                // 注册移动事件
                el.addEventListener('mousemove', move);

                /**
                 * 鼠标抬起注销移动事件
                 */
                window.document.onmouseup = function () {
                    el.removeEventListener('mousemove', move);
                }
            },
            moveEvent(e, beginPrintX, beginPrintY, moveObj, previewMoveObj, imageParent_previewImageParent_scale) {
                // 获取差值

                let obj = {},
                    obj2 = {};

                obj.x = Math.min(moveObj.x + (e.pageX - beginPrintX), 200);
                obj.x = Math.max(obj.x, -200);
                obj.y = Math.min(moveObj.y + (e.pageY - beginPrintY), 200);
                obj.y = Math.max(obj.y, -200);

                obj2.x = Math.min(previewMoveObj.x + (e.pageX - beginPrintX) * imageParent_previewImageParent_scale, 110);
                obj2.x = Math.max(obj2.x, -110);
                obj2.y = Math.min(previewMoveObj.y + (e.pageY - beginPrintY) * imageParent_previewImageParent_scale, 110);
                obj2.y = Math.max(obj2.y, -110);

                this.moveObj = obj;
                this.previewMoveObj = obj2;
            },
            /**
             * 缩小
             */
            scaleSB(type) {
                let moveObj = this.parse(this.moveObj), // 裁剪图定位值对象
                    previewMoveObj = this.parse(this.previewMoveObj),  // 预览图定位置对象
                    imgWH = this.parse(this.imgWH), // 裁剪图宽高
                    previewWh = this.parse(this.previewWh), // 预览图宽高
                    // 两图的父元素比例（初始两图的比例）
                    imageParent_previewImageParent_scale = this.imageParent_previewImageParent_scale;

                let val = type === 'small' ? -10 : 10;

                moveObj.x += -val / 2;
                moveObj.y += -val / 2;
                imgWH.w += val;
                imgWH.h += val;

                previewMoveObj.x += -val / 2 * imageParent_previewImageParent_scale;
                previewMoveObj.y += -val / 2 * imageParent_previewImageParent_scale;
                previewWh.w += val * imageParent_previewImageParent_scale;
                previewWh.h += val * imageParent_previewImageParent_scale;


                this.moveObj = moveObj;
                this.imgWH = imgWH;
                this.previewMoveObj = previewMoveObj;
                this.previewWh = previewWh;
            },
            rotate() {
                this.rotateVal += 90
            },
            // 图片上传并预览
            getPicture(e) {
                let file = e.target.files;
                // 用于上传的图片对象
                if (!file.length) return;
                // 图片文件
                this.fileObj = file[0];
                let reader = new FileReader();
                reader.onload = (e) => {    //成功读取文件
                    this.currentPic = e.target.result;
                    // 上传到图片服务器a
                    this.uploadImageServer(file[0]);
                };
                reader.readAsDataURL(file[0]);
            },
            /**
             * 上传图片服务器
             */
            uploadImageServer(file) {
                let form = new FormData(); // FormData 对象
                form.append("file", file); // 文件对象
                // form.append('_token','{{ csrf_token() }}');
                // 请求接口上传图片 form
                this.fetch({
                    method: 'post',
                    url: 'upload.do',
                    data: form
                }, 2, 'image').then((res) => {
                    this.currentPic = this.lastPic = res.data.message;
                })
            },
            /**
             * 点击确定上传
             */
            uploading() {
                this.fetch({
                    url: 'user/updateHead.do',
                    method: 'get',
                    data: {
                        head: this.currentPic,
                        phone: this.$parent.userInfo.user.phone
                    }
                }, 2).then(()=>{
                    this.$message({message: '修改成功', type: 'success'});
                    this.$parent.userInfo.user.head = this.currentPic;
                    // 更新本地数据
                    this.setItem('userInfo', this.$parent.userInfo);
                    this.$store.commit('changeUpdateUserInfo', true);
                });
                // 关闭弹窗
                this.imageUpload = false;
            },
            getInfo() {
                if (this.isLogin()) this.currentPic = this.lastPic = this.$parent.userInfo.user.head;
            }
        },
        created() {
            this.getInfo();
        },
        computed: {...mapState(['updateUserInfo'])},
        watch: {
            updateUserInfo(value) {
                if (value) {
                    this.getInfo();
                    this.$store.commit('changeUpdateUserInfo', false);
                }
            }
        },
    }
</script>

<style lang="less">
    /*  图片上传  */
    .imageUpload {
        .el-dialog {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 550px;

            .el-dialog__header {
                height: 60px;
                border-bottom: 1px solid #e6e6e6;
            }

            .el-dialog__body {
                flex: 1;
                padding: 20px 40px 0 20px;

                .pic {
                    display: flex;
                    justify-content: space-between;
                    color: #999999;
                    font-size: 14px;

                    .pic-left {
                        div {
                            display: flex;
                            justify-content: space-between;
                            padding-top: 8px;

                            & label:nth-child(1) {
                                color: #2AB0EA;
                            }

                            & span:nth-child(2) {
                                i {
                                    margin-left: 10px;
                                    font-size: 17px;
                                }
                            }
                        }

                        & div:nth-child(1) {
                            overflow: hidden;
                            height: 300px;
                            width: 300px;
                            background: linear-gradient(135deg, #708090 21px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px),
                            linear-gradient(225deg, #708090 21px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px) 0 64px;
                            background-color: #708090;
                            background-size: 64px 128px;

                            img {
                                position: absolute;
                                pointer-events: none
                            }
                        }
                    }

                    .pic-right {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        height: 300px;

                        img {
                            border-radius: 55px;
                        }

                        .pic-right-top, .pic-right-bottom {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            height: 135px;

                            span {
                                display: flex;
                                justify-content: space-between;

                                & i:nth-child(2) {
                                    color: #2AB0EA;
                                }
                            }
                        }

                        .pic-right-top span {
                            justify-content: center;
                        }

                        .pic-right-top div:nth-child(1) {
                            position: relative;
                            overflow: hidden;
                            height: 110px;
                            width: 110px;
                            border-radius: 55px;
                        }
                    }
                }
            }

            .el-dialog__footer {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 123px;
                border-top: 1px solid #e6e6e6;

                & .el-button:nth-child(2) {
                    border-color: #ccc;
                    color: #999;
                }
            }
        }
    }
</style>
