import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
let userInfo = null;
const store = new Vuex.Store({
    // 全局状态
    state: {
        number: 0, // titleNav组件的列表切换
        addressUpdate: false,   // 地区更换时  更新响应信息
        updateUserInfo: false,
        messageSync: false,  // 点击头部消息列表时，控制消息界面消息的状态的同步
        headMessageSync: false  // 点击消息列表更改状态时，控制头部消息的状态的同步
    },
    // store的计算属性
    getters: {
        headPortraitUrl: ({updateUserInfo}) => {
            return (vm) => {
                if (updateUserInfo) {
                    userInfo = vm.getItem('userInfo');
                }
                return userInfo && userInfo.user.head;
            }
        },
        nickName: ({updateUserInfo}) => {
            return (vm) => {
                if (updateUserInfo) {
                    userInfo = vm.getItem('userInfo');
                }
                return userInfo && userInfo.user.nickName;
            }
        },
        vm: ()=>{
            return (v) => {
                userInfo = v.getItem('userInfo');
                return null;
            }
        }
    },
    // state更改api
    mutations: {
        changeNumber(state, newValue){
            state.number = newValue;
        },
        changeAddressUpdate(state, newValue){
            state.addressUpdate = newValue;
        },
        changeUpdateUserInfo(state, newValue){
            state.updateUserInfo = newValue;
        },
        changeMessageSync(state, newValue){
            state.messageSync = newValue;
        },
        changeHeadMessageSync(state, newValue){
            state.headMessageSync = newValue;
        }
    },
    // 用于异步触发mutations里面的方法
    actions: {
        asyncTestChange(content, newValue){
            content.commit('testChange', newValue)
        }
    }
});

export default store
