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
import ManageDiscussionProhibit from "../components/manageDiscussionProhibit/ManageDiscussionProhibit";
import test from "../views/index/test";
import Index from "../views/index/Index";
import Login from "../components/login/Login";
import Course from '../views/course/Course';
import MessageCentre from "../components/messageCentre/MessageCentre";
import MessageMenu from "../components/messageCentre/MessageMenu";
import TeacherCourse from "../components/teacherPortal/TeacherCourse";
import CourseAdd from "../components/course/CourseAdd";
import CourseHomePage from "../components/courseManage/CourseHomePage";
import CoursePortal from "../components/courseManage/CoursePortal";
import CourseExam from "../components/courseExam/ExamInfo";
import CourseTask from "../components/courseTask/TaskInfo";
import OpenSelfCourse from "../components/openSelfCourse/OpenSelfCourse";
import CourseUpdate from "../components/course/CourseUpdate";
import DiscussionHomePage from "../components/discussion/DiscussionHomePage";
import DiscussionMajorCategory from "../components/discussion/DiscussionMajorCategory";
import DiscussionSchoolCategory from "../components/discussion/DiscussionSchoolCategory";
import ChapterManage from "../components/chapter/ChapterManage";
import DiscussionDetail from "../components/discussion/DiscussionDetail";
import OpenSelfDiscussion from "../components/openSelfDiscussion/OpenSelfDiscussion";
import CourseDiscussion from "../components/courseDiscussion/CourseDiscussion";
import NewDiscussion from "../components/courseDiscussion/NewDiscussion";

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
            path: '/course/:id',
            component: Course
        },
        {
            path: '/MessageCentre',
            component: MessageCentre,
            children:[
                {
                    path: 'messagemenu',
                    component: MessageMenu
                }
            ]

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
                },
                {
                    path: 'manageDiscussionProhibit',
                    component: ManageDiscussionProhibit
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
                },
                {
                    path: 'teacherCourse',
                    component: TeacherCourse
                },
                {
                    path: 'courseAdd',
                    component: CourseAdd
                },
                {
                    path: 'openSelfCourse',
                    component: OpenSelfCourse
                },
                {
                    path: 'openSelfDiscussion',
                    component: OpenSelfDiscussion
                }
            ]
        },
        {
            path:'/courseManage',
            component: CourseHomePage,
            children: [
                {
                    path: 'courseInfo/:id',
                    component: CoursePortal
                },
                {
                    path: 'courseUpdate/:id',
                    component: CourseUpdate
                },
                {
                    path: 'chapterManage/:id',
                    component: ChapterManage
                },
                {
                    path: 'courseDiscussion/:id',
                    component: CourseDiscussion
                },
                {
                    path: 'newDiscussion/:id',
                    component: NewDiscussion
                }
            ]
        },
        {
            path: '/courseTask/:id',
            component: CourseTask
        },
        {
            path: '/courseExam/:id',
            component: CourseExam
        },
        {
            path: '/discussionHomePage',
            component: DiscussionHomePage
        },
        {
            path: '/discussionMajorCategory/:id',
            component: DiscussionMajorCategory
        },
        {
            path: '/discussionSchoolCategory/:id',
            component: DiscussionSchoolCategory
        },
        {
            path: '/discussionDetail/:id',
            component: DiscussionDetail
        }
    ]
});
//导出路由对象
export default  router