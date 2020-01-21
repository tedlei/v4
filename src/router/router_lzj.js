// import引入组件
import systemMessage from "../pages/page_lzj/message/systemMessage";

// 在线咨询
import onlineConsulting from "../pages/page_lm/curriculumDetail/onlineConsulting";

export default {
    routes: [
        // systemMessage
        {
            path: '/systemMessage',
            name: 'message',
            component: systemMessage
        },
        // onlineConsulting
        {
            path: '/onlineConsulting',
            component: onlineConsulting
        }
    ]
}
