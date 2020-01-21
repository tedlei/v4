<template>
    <div class="app">
        <headerNav v-show="showHeader"></headerNav>
        <router-view />
    </div>
</template>

<script>
    export default {
        data(){
            return {
                date: 0
            }
        },
        computed: {
            showHeader(){
                if (this.$route.matched[0].name === '404') {
                    return false;
                }
                return !/^(\/onlineConsulting\?category=3&id=)(\d+)$/.test(this.$route.fullPath);
            }
        },
        created(){
            // store中获取本地用户信息
            this.$store.getters.vm(this);

            // 404时隐藏头部
            if (this.$route.matched[0].name === '404') {
                this.showHeader = false;
                return;
            }

            let cookie = document.cookie;

            let userInfo = this.getItem('userInfo');
            // 需要判断cookie的原因为后台需要用户手机号判断 是否登陆 以及 根据手机号退出
            // 本地用户数据不存在 退出
            if (!userInfo) {
                return ;
            }

            // 本地用户数据存在，但cookie不存在也退出
            if (!cookie) {
                this.removeItemUserInfo();
                return
            }
                  
            let phone = cookie.split("=")[1];

            this.fetch({
                method: 'get',
                url: 'find.do',
                data: {
                    username: phone
                }
            }, 2).then(async result=>{
                let isSuccess = result.data.success;

                // 未在登陆状态 退出
                if (!isSuccess) this.removeItemUserInfo();
                else{
                    
                    userInfo.schoolUser = result.data.message;
                    this.setItem('userInfo',userInfo);
                }
            });
        },
        mounted() {
            // 阻止enter默认事件
            document.addEventListener('keydown', (e)=>{
                if (!e.shiftKey && e.key === 'Enter'){
                    e.preventDefault();
                }
            });

            setTimeout(()=>{
                document.documentElement.scrollTop = 0;
            })
        },
        watch: {
            // 路由改变获取消息
            $route(to, from){
                if (to.path !== from.path) {
                    this.$store.commit('changeHeadMessageSync', true);
                }
            }
        }
    }
</script>

<style lang="less">
.app{
    min-width: 1200px;
}
</style>
