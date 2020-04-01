import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index/Index'
import NotFound from '../views/404.vue'
import PersonalHomepage from "../components/personalHomepage/PersonalHomepage";
import PersonalInfo from "../components/personalInfo/PersonalInfo";
import PersonalPortal from "../components/personalPortal/PersonalPortal";

Vue.use(Router);

//创建路由对象并配置路由
const router = new Router({
    routes: [
        {
            path: '/',
            component: Index
        },
        {
            path: '/404',
            component: NotFound,
            hidden: true
        },
        {
            path: '*',
            hidden: true,
            redirect: { path: '/404' }
        },
        {
            path:'/personalHomepage',
            component: PersonalHomepage,
            children: [
                {
                    path: '/',
                    component: PersonalPortal
                },
                {
                    path: 'personalInfo',
                    component: PersonalInfo
                }
            ]
        }
    ]
});
//导出路由对象
export default  router