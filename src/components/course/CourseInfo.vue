<template>
    <div>
        <div class="flex-box">
            <div class="left-panel">
                <img v-if="course.photo" class="course-image" v-bind:src="`${path}/${course.photo}`">
                <img v-else style="height: 250px" v-bind:src="no_img">
            </div>
            <div class="right-panel">
                <div class="course-detail-content">
                    <div class="course-name">
                        {{course.name}}
                    </div>
                    <div class="course-type">
                        类型：{{course.type}}
                    </div>
                    <div class="course-info">
                        开课时间：
                        {{convertDate(course.openTime)}}&nbsp;~&nbsp;{{convertDate(course.closeTime)}}
                    </div>
                    <div class="course-info">
                        课程状态：
                        <span v-if="course.courseState===0" style="color:#3366CC">尚未开课</span>
                        <span v-else-if="course.courseState===1" style="color:#339933">正在进行</span>
                        <span v-else style="color:#666666">已结课</span>
                    </div>
                    <div class="course-info" v-if="course.role!==0">
                        审核状态：
                        <span v-if="course.checkState===0" style="color:#ff7a3e">尚未通过审核</span>
                        <span v-else-if="course.checkState===1" style="color:#56B929">通过审核</span>
                    </div>
                </div>
                <div class="course-button">
                    <el-button v-if="course.role===1||course.role===2" type="warning" @click="editCourseInfo">管理课程</el-button>
                    <el-button v-else-if="course.role===0&&course.courseState!==2" type="warning" :disabled="course.checkState===0" @click="joinCourse">参加课程</el-button>
                    <el-button v-else-if="course.checkState===1" type="warning" @click="handleCourseDetail">已结课，查看内容</el-button>
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
        <div class="detail-box">
            <div class="left-content-box">
                <div class="left-content">
                    <el-tabs v-model="activeName" active-text-color="#ffd04b">
                        <el-tab-pane class="course-tab" label="课程介绍" name="first">
                            <div class="course-intro-box" v-if="course.intro&&course.intro.trim().length!==0">
                                <div class="intro">{{course.intro}}</div>
                                <div class="team">—— 课程团队</div>
                            </div>
                            <div class="category-title">
                                <i class="el-icon-menu"></i>
                                <span class="title">课程概述</span>
                            </div>
                            <div class="detail">
                                {{course.detail}}
                                <span v-if="!course.detail||course.detail.trim().length===0">无</span>
                            </div>
                            <div class="category-title">
                                <i class="el-icon-star-on"></i>
                                <span class="title">课程目标</span>
                            </div>
                            <div class="detail">
                                {{course.target}}
                                <span v-if="!course.target||course.target.trim().length===0">无</span>
                            </div>
                            <div class="category-title">
                                <i class="el-icon-reading"></i>
                                <span class="title">参考资料</span>
                            </div>
                            <div class="detail detail_no_pre">
                                {{course.reference}}
                                <span v-if="!course.reference||course.reference.trim().length===0">无</span>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="章节目录" name="second">
                            <!--尚未完成-->

                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="right-content-box">
                <div class="right-content">
                    <div class="t-title">
                        <span class="title">授课教师</span>
                    </div>
                    <div class="teacher-list_box">
                        <div class="teacher-list_item" v-for="teacher in course.teacherList" :key="teacher.userId">
                            <div class="t-info-box">
                                <img class="t-img" :src="`${path}/${teacher.picture}`" width="55" height="55" :alt="teacher.name">
                                <div class="t-detail">
                                    <p class="t-name">{{teacher.name}}</p>
                                    <p class="t-grade">{{teacher.grade}}</p>
                                </div>
                                <div style="clear: both"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
    </div>
</template>

<script>
    import {convertDate} from "../../common/js/dateformat";
    import {HOST} from "../../common/js/config";

    export default {
        name:"CourseInfo",
        props: ['course'],
        data() {
            return {
                path: '',
                no_img: require("@/assets/no.png"),
                activeName:'first'
                // course: {
                //     courseId: 0,
                //     name: '',
                //     type: '',
                //     openTime: '2020/06/01',
                //     closeTime: '2020/12/01',
                //     photo: '',
                //     intro: '',
                //     detail: '',
                //     target: '',
                //     reference: '',
                //     courseState: 1,
                //     checkState: 1,
                //     courseAuthority: 0,
                //     role:0
                // },
            }
        },
        mounted() {
            this.path=HOST;
        },
        methods: {
            // loadData() {
            //     this.path=HOST;
            //     let courseId = this.$route.params.id;
            //     let url = `${HOST}/course/sel/${courseId}`;
            //     let param = new URLSearchParams();
            //     param.append('userId', getUser().userId);
            //     this.$ajax.post(url, param).then((res)=> {
            //         this.course = res.data;
            //     })
            // },
            editCourseInfo(){
                this.$router.push(`/courseManage/courseUpdate/${this.course.id}`)
            },
            joinCourse(){
                //学生选课
            },
            handleCourseDetail(){
                //跳转到课程详情页面 可进行学习
            },
            convertDate(date){
                return convertDate(date);
            }
        }
    }

</script>

<style scoped>
    .flex-box{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
        height: 320px;
        padding: 20px 0 30px;
        background-color: #ffffff;
    }

    .left-panel{
        width: 570px;
        height: 320px;
    }

    .course-image{
        height: 320px;
    }

    .right-panel{
        margin-left: 40px;
        width: 640px;
        height: 328px;
    }

    .course-detail-content{
        height: 200px;
    }

    .course-name{
        font: 24px Arial,"microsoft yahei";
        color: #333333;
    }

    .course-type, .course-info{
        margin-top: 10px;
        margin-bottom: 10px;
        color: #333333;
        line-height: 20px;
    }

    .course-type{
        font-size: 18px;
    }

    .course-button{
        bottom: 0;
    }

    .detail-box{
        width: 1250px;
        margin: 50px auto 0;
    }

    .left-content-box{
        width: 920px;
        margin-right: 30px;
        float: left;
    }

    .left-content, .right-content{
        background-color: #ffffff;
        padding: 20px 30px;
    }

    .el-tabs >>> .el-tabs__header{
        margin-bottom: 30px;
    }

    .el-tabs >>> .el-tabs__item{
        font-size: 20px;
    }

    .el-tabs >>> .el-tabs__item.is-active {
        color: #67c23a;
    }

    .el-tabs >>> .el-tabs__active-bar {
        width: 80px;
        background-color: #67c23a;
    }

    .course-intro-box{
        background-color: #F5F8F4;
        padding: 30px 30px 20px;
        color: #333333;
    }

    .course-intro-box .intro{
        line-height: 20px;
    }

    .course-intro-box .team{
        font-size: 18px;
        line-height: 28px;
        text-align: right;
    }

    .category-title{
        padding: 30px 0 20px;
        font-size: 20px;
        font-weight: bold;
    }

    .category-title i{
        color: #56B929;
    }

    .category-title .title{
        margin-left: 20px;
    }

    .detail{
        /*保留空白符，正常换行*/
        white-space: pre-wrap;
        font-size: 18px;
        font-family: '等线';
        line-height: 22px;
    }

    .detail_no_pre{
        /*仅显示换行，合并空白符*/
        white-space: pre-line !important;
    }

    .right-content-box{
        width: 300px;
        float: right;
    }

    .t-title{
        font-size: 20px;
        padding-left: 10px;
        line-height: 20px;
        border-left: 4px solid #56B929;
        margin-bottom: 20px;
    }

    .t-info-box{
        height: 60px;
        margin: 20px 0;
    }

    .t-img{
        float:left;
        border: 1px solid #E6E6E6;
        border-radius: 50%;
    }

    .t-detail{
        margin-left: 70px;
    }

    .t-name{
        font-size: 18px;
        color: #333;
        margin-bottom: 10px;
    }

    .t-grade{
        color: #999;
        margin: 0 0;
    }
</style>
