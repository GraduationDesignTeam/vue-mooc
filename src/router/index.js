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
import Multi from "../views/Multi";
import Index from "../views/index/Index";
import Login from "../components/login/Login";
import Course from '../views/course/Course';
import MessageCentre from "../components/messageCentre/MessageCentre";
import MessageMenu from "../components/messageCentre/MessageMenu";
import MessageSelf from "../components/messageCentre/MessageSelf";
import MessageDiscussion from "../components/messageCentre/MessageDiscussion";
import MessageSystem from "../components/messageCentre/MessageSystem";
import MessageSend from "../components/messageCentre/MessageSend";
import TeacherCourse from "../components/teacherPortal/TeacherCourse";
import TaskAdd from "../components/courseTask/TaskAdd";
import ExamAdd from "../components/courseExam/ExamAdd";
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
import ChapterManage from "../components/courseChapter/ChapterManage";
import DiscussionDetail from "../components/discussion/DiscussionDetail";
import OpenSelfDiscussion from "../components/openSelfDiscussion/OpenSelfDiscussion";
import CourseDiscussion from "../components/courseDiscussion/CourseDiscussion";
import NewDiscussion from "../components/courseDiscussion/NewDiscussion";
import CourseNotice from "../components/courseNotice/CourseNotice";
import CourseTeacher from "../components/courseManage/CourseTeacher";
import CourseAssistant from "../components/courseManage/CourseAssistant";
import UpdateDiscussion from "../components/courseDiscussion/UpdateDiscussion";
import ManageUserStatistic from "../components/manageUserStatistic/ManageUserStatistic";
import ManageCourseStatistic from "../components/manageCourseStatistic/ManageCourseStatistic";
import ManageDiscussionStatistic from "../components/manageDiscussionStatistic/ManageDiscussionStatistic";
import AssistantCourse from "../components/teacherPortal/AssistantCourse";
import TaskList from "../components/courseTask/TaskList"
import ExamList from "../components/courseExam/ExamList"
import CourseWareAdd from "../components/courseWare/CourseWareAdd";
import CourseWare from "../components/courseWare/CourseWare";
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
            path: '/m',
            component: Multi
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
                },
                {
                    path: 'messageSelf',
                    component: MessageSelf
                },
                {
                    path: 'messageDiscussion',
                    component: MessageDiscussion
                },
                {
                    path: 'messageSystem',
                    component: MessageSystem
                },
                {
                    path: 'messageSend',
                    component: MessageSend
                },
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
                },
                {
                    path: 'manageUserStatistic',
                    component: ManageUserStatistic
                },
                {
                    path: 'manageCourseStatistic',
                    component: ManageCourseStatistic
                },
                {
                    path: 'manageDiscussionStatistic',
                    component: ManageDiscussionStatistic
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
                    path: 'assistantCourse',
                    component: AssistantCourse
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
                    path: 'courseNotice/:id',
                    component: CourseNotice
                },
                {
                    path: 'chapterManage/:id',
                    component: ChapterManage
                },
                {
                    path: 'courseWare/:id',
                    component: CourseWare
                },
                {
                    path: 'courseWareAdd/:id',
                    component: CourseWareAdd
                },
                {
                    path: 'courseDiscussion/:id',
                    component: CourseDiscussion
                },
                {
                    path: 'newDiscussion/:id',
                    component: NewDiscussion
                },
                {
                    path: 'updateDiscussion/:id',
                    component: UpdateDiscussion
                },
                {
                    path: 'courseTask/:id',
                    component: CourseTask
                },
                {
                    path: 'courseExam/:id',
                    component: CourseExam
                },
                {
                    path: 'taskAdd/:id',
                    component: TaskAdd
                },
                {
                    path: 'examAdd/:id',
                    component: ExamAdd
                },
                {
                    path: 'courseTeacher/:id',
                    component: CourseTeacher
                },
                {
                    path: 'courseAssistant/:id',
                    component: CourseAssistant
                },
                {
                    path: 'taskList/:id',
                    component: TaskList
                },
                {
                    path: 'examList/:id',
                    component: ExamList
                },
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