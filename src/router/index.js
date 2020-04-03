import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index/Index'
import NotFound from '../views/404.vue'
import PersonalHomepage from "../components/personalHomepage/PersonalHomepage";
import Administrator from "../components/administrator/Administrator";
import PersonalInfo from "../components/personalInfo/PersonalInfo";
import PersonalPortal from "../components/personalPortal/PersonalPortal";
import AdministratorPortal from "../components/administratorPortal/AdministratorPortal";
import AdministratorInfo from "../components/administratorInfo/AdministratorInfo";
import ManageUserProhibit from "../components/manegeUserProhibit/ManageUserProhibit";

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
            path: '/administrator',
            component: Administrator,
            children: [
                {
                    path: '/',
                    component: AdministratorPortal
                },
                {
                    path: 'administratorInfo',
                    component: AdministratorInfo
                },
                {
                    path: 'manageUserProhibit',
                    component: ManageUserProhibit
                }
            ]
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