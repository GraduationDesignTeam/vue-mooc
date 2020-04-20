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
                </div>
                <div class="course-button">
                    <el-button type="warning" :disabled="course.courseState===2" @click="editCourseInfo">编辑课程</el-button>
                </div>
            </div>
        </div>
        <div class="detail">
            <h2>课程详情</h2>
            <el-divider></el-divider>
            <span>{{course.intro}}</span>
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
                if(getUser()===null || getUser().userId===undefined){
                    const _this = this;
                    this.$message.error("用户登录信息已过期，请重新登录！");
                    setTimeout(() =>{_this.$router.push('/login')}, 3000);
                    return;
                }
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
</style>
