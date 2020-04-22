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
                    <div class="course-info">
                        审核状态：
                        <span v-if="course.checkState===0" style="color:#ff7a3e">尚未通过审核</span>
                        <span v-else-if="course.checkState===1" style="color:#56B929">通过审核</span>
                    </div>
                </div>
                <div class="course-button">
                    <el-button type="warning" :disabled="course.courseState===2" @click="editCourseInfo">编辑课程</el-button>
                </div>
            </div>
        </div>
        <div class="content">
            <h2>课程详情</h2>
            <el-divider></el-divider>
            <div class="course-intro-box" v-if="course.intro.trim().length!==0">
                <div class="intro">{{course.intro}}</div>
                <div class="team">—— 课程团队</div>
            </div>
            <div class="category-title">
                <i class="el-icon-menu"></i>
                <span class="title">课程概述</span>
            </div>
            <div class="detail">
                {{course.detail}}
                <span v-if="course.detail.trim().length===0">无</span>
            </div>
            <div class="category-title">
                <i class="el-icon-star-on"></i>
                <span class="title">课程目标</span>
            </div>
            <div class="detail">
                {{course.target}}
                <span v-if="course.target.trim().length===0">无</span>
            </div>
            <div class="category-title">
                <i class="el-icon-reading"></i>
                <span class="title">参考资料</span>
            </div>
            <div class="detail detail_no_pre">
                {{course.reference}}
                <span v-if="course.reference.trim().length===0">无</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {getUser} from "../../common/js/cache";
    import {HOST} from "../../common/js/config";
    import {convertDate} from "../../common/js/dateformat";

    export default {
        name:"CoursePortal",
        data() {
            return {
                path: '',
                no_img: require("@/assets/no.png"),
                course: {
                    courseId: 0,
                    name: '',
                    type: '',
                    openTime: '2020/06/01',
                    closeTime: '2020/12/01',
                    photo: '',
                    intro: '',
                    detail: '',
                    target: '',
                    reference: '',
                    courseState: 1,
                    checkState: 1,
                    courseAuthority: 0,
                },
            }
        },
        mounted() {
            this.loadData();
        },
        methods: {
            loadData() {
                this.path=HOST;
                let courseId = this.$route.params.id;
                let url = `${HOST}/course/sel/${courseId}`;
                let param = new URLSearchParams();
                param.append('userId', getUser().userId);
                this.$ajax.post(url, param).then((res)=> {
                    if(res.data.role!==1 && res.data.role!==2){
                        this.$message.error("您没有访问当前页面的权限!");
                        this.$router.push('/');
                    }else{
                        this.course = res.data;
                    }
                })
            },
            editCourseInfo(){
              this.$router.push(`/courseManage/courseUpdate/${this.course.id}`)
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
        height: 280px;
    }

    .left-panel{
        width: 450px;
        height: 250px;
    }

    .course-image{
        height: 250px;
    }

    .right-panel{
        margin-left: 30px;
        width: 500px;
        height: 250px;
    }

    .course-detail-content{
        height: 200px;
    }

    .course-name{
        font: 24px Arial,"microsoft yahei";
        color: #333333;
        line-height: 28px;
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

    .content{
        margin: 0 50px;
    }

    .content h2{
        font-weight: 500;
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
</style>
