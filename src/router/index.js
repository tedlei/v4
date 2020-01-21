
import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('../pages/index/index')
import components_lzj from './router_lzj'
import components_lm from './router_lm'

const merge = require('webpack-merge');

import main from '../pages/index/main'
//课程列表、学校列表、名师推荐
import curriculumList from '../pages/page_lm/curriculumList/curriculumList'
import curriculumDetail from "../pages/page_lm/curriculumDetail/curriculumDetail"

// 教育资讯
import information from "../pages/page_lm/information/information"
import infoList from '../pages/page_lm/information/infoList/infoList'
import infoDetail from '../pages/page_lm/information/infoDetail/infoDetail'
// teacher
import teacherDetail from '../pages/page_lm/teacherDetail/teacherDetail'

import error from "../components/component_lzj/error"

Vue.use(Router);

const router =  new Router(merge({
    scrollBehavior(){
        return { x: 0, y: 0 };
    },
    routes: [
        // index 首页
        { path: '/', redirect: '/index' },
        { path: '/index',component: Index, props: true,
            children: [
                {
                    path: '',
                    component: main
                },
                {
                    path: 'curriculum',
                    component: curriculumList,
                    props: true

                },
                {
                    path: 'school',
                    component: curriculumList,
                    props: true
                },
                {
                    path: 'teacher',
                    component: curriculumList,
                    props: true
                },
                {
                    path: 'information',
                    component: information,
                    children:[
                        {path:'',name:'infoList',component:infoList},
                        {path:'infoDetail',name:'infoDetail',component:infoDetail},
                    ]
                },
                {
                    path: 'curriculum/curriculumDetail',
                    component: curriculumDetail,
                },
                //教师详情
                {
                    path: 'teacher/teacherDetail',
                    name: 'teacherDetail',
                    component: teacherDetail
                }
    ]
        },
        {path: '*', component: error, name: '404'}
    ]
}, components_lzj, components_lm));

export default router;



