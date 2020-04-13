import Vue from 'vue'
import Router from 'vue-router'
// import Index from '../views/index/Index'
import NotFound from '../views/404.vue'
import PersonalHomepage from "../components/personalHomepage/PersonalHomepage";
import Administrator from "../components/administrator/Administrator";
import PersonalInfo from "../components/personalInfo/PersonalInfo";
import PersonalPortal from "../components/personalPortal/PersonalPortal";
import AdministratorPortal from "../components/administratorPortal/AdministratorPortal";
import AdministratorInfo from "../components/administratorInfo/AdministratorInfo";
import ManageUserProhibit from "../components/manegeUserProhibit/ManageUserProhibit";
import ManageTeacherState from "../components/manageTeacherState/ManageTeacherState";
import ManageCourseProhibit from "../components/manageCourseprohibit/ManageCourseProhibit";
import ManageCourseOpen from "../components/manageCourseOpen/ManageCourseOpen";
import test from "../views/index/test";
import Index from "../views/index/Index";
import Login from "../components/login/Login";

//避免因重复路由引起的报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

Vue.use(Router);

//创建路由对象并配置路由
const router = new Router({
    routes: [
        {
            path: '/',
            component: test
        },
        {
            path: '/tempIndex',
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
            path: '/login',
            component: Login
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
                },
                {
                    path: 'manageTeacherState',
                    component: ManageTeacherState
                },
                {
                    path: 'manageCourseProhibit',
                    component: ManageCourseProhibit
                },
                {
                    path: 'manageCourseOpen',
                    component: ManageCourseOpen
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