<template>
    <div class="box fx">
        <titleNav />
        <div class="main">
            <router-view ></router-view>
        </div>
        <footAdvertising />
        <indexFooter/>
    </div>
</template>

<script>
    import titleNav from './titleNav'
    import footAdvertising from './footAdvertising'
    import {mapMutations} from 'vuex'
    export default {
        components: {titleNav, footAdvertising},
        methods: {
            ...mapMutations(['changeNumber']),
            watchRoute(route){
                let val = route.fullPath.substring(7);

                window.localStorage.setItem('number', this.$store.state.number);

                if (/^curriculum/.test(val)) this.changeNumber(1);
                else if (/^school/.test(val)) this.changeNumber(2);
                else if (/^teacher/.test(val)) this.changeNumber(3);
                else if (/^information/.test(val)) this.changeNumber(4);
                else this.changeNumber(0);
            }
        },
        watch: {
            $route(e){this.watchRoute(e)}
        },
        created() {
            let number = window.localStorage.getItem('number');
            if (number) this.changeNumber(number*1);

            this.watchRoute(this.$route);
        }
    }
</script>

<style lang="less" scoped>
    .box{
        flex-direction: column;
        align-items: center;
    }
</style>
