// import引入组件

// 登陆、注册
const loginAndRegister = ()=> import('../pages/page_lm/loginAndRegister/loginAndRegister')
import login from '../pages/page_lm/loginAndRegister/login/login'
import register from '../pages/page_lm/loginAndRegister/register'
import forgetPassword from '../pages/page_lm/loginAndRegister/forgetPassword'

//个人中心
const personalCenter = ()=> import('../pages/page_lm/personalCenter/personalCenter')

//学校详情
const schoolDetail = ()=> import('../pages/page_lm/schoolDetail/schoolDetail')
import homePage from '../pages/page_lm/schoolDetail/homePage/homePage'
import currList from '../pages/page_lm/schoolDetail/currList/currList'
import currDetail from '../pages/page_lm/schoolDetail/currList/currDetail'
import teacList from '../pages/page_lm/schoolDetail/teacList/teacList'
import teacDetail from '../pages/page_lm/schoolDetail/teacList/teacDetail'
import synopsis from '../pages/page_lm/schoolDetail/synopsis/synopsis'
import chatWindow from '../pages/page_lm/schoolDetail/chatWindow'
import discountCoupon from '../pages/page_lm/schoolDetail/discountCoupon'


//学校入驻
const schoolEnter = ()=> import('../pages/page_lm/schoolEnter/schoolEnter')

//学校保证金
const cashDeposit = ()=> import('../pages/page_lm/cashDeposit/cashDeposit')
import payment from '../pages/page_lm/cashDeposit/payment'
import dutyPaid from '../pages/page_lm/cashDeposit/dutyPaid'
import sendBack from '../pages/page_lm/cashDeposit/sendBack'

//关于雏鸟
const nestling = ()=> import('../pages/page_lm/nestling/nestling')
import inRegardTo from '../pages/page_lm/nestling/inRegardTo'
import privacy from '../pages/page_lm/nestling/privacy'
import userAgreement from '../pages/page_lm/nestling/userAgreement'
import commonIssue from '../pages/page_lm/nestling/commonIssue'
import coupleBack from '../pages/page_lm/nestling/coupleBack'
import linKswop from '../pages/page_lm/nestling/linKswop'

export default {
    routes: [
        // 登陆、注册
        { path: '/loginAndRegister',component: loginAndRegister,children:[
            {path:'',name:'login',component:login},
            {path:'register',name:'register',component:register},
            {path:'forgetPassword',name:'forgetPassword',component:forgetPassword},
        ]},
        //个人中心
        { path: '/personalCenter',name: 'personalCenter',component: personalCenter },
        { path: '/schoolDetail',component: schoolDetail,children:[
            {path:'',name:'homePage',component:homePage},
            {path:'currList',name:'currList',component:currList},
            {path:'currDetail',name:'currDetail',component:currDetail},
            {path:'teacList',name:'teacList',component:teacList},
            {path:'teacDetail',name:'teacDetail',component:teacDetail},
            {path:'synopsis',name:'synopsis',component:synopsis},
            {path:'chatWindow',name:'chatWindow',component:chatWindow},
            {path:'discountCoupon',name:'discountCoupon',component:discountCoupon},
        ]},

        //学校入驻
        {path:'/schoolEnter',name:'schoolEnter',component:schoolEnter},

        //学校保证金
        {path:'/cashDeposit',component:cashDeposit,children:[
            {path:'',name:'payment',component:payment},
            {path:'dutyPaid',name:'dutyPaid',component:dutyPaid},
            {path:'sendBack',name:'sendBack',component:sendBack},
        ]},

        //关于雏鸟
        {path:'/nestling',component:nestling,children:[
            {path:'/',name:'inRegardTo',component:inRegardTo},
            {path:'privacy',name:'privacy',component:privacy},
            {path:'userAgreement',name:'userAgreement',component:userAgreement},
            {path:'commonIssue',name:'commonIssue',component:commonIssue},
            {path:'coupleBack',name:'coupleBack',component:coupleBack},
            {path:'linKswop',name:'linKswop',component:linKswop},
        ]}
    ]
}
