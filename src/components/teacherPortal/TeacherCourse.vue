<template>
    <div style="margin: 0 30px">
        <el-button type="primary" plain icon="el-icon-plus" @click="handleCourseAdd">开设课程</el-button>
        <br><br>
        <CourseList :courseList="courseList" :mode="1"></CourseList>
        <div v-if="courseList.length===0" style="font-size: 18px;">
            <p>您还未开设过任何课程</p>
        </div>
    </div>
</template>

<script>
    import CourseList from "../course/CourseList";
    import {HOST} from "../../common/js/config";
    import {getUser} from "../../common/js/cache";
    export default {
        name: "TeacherCourse",
        components: {CourseList},
        data(){
            return{
                courseList:[]
            }
        },
        created() {
            this.loadData();
        },
        methods:{
            loadData(){
                let url = `${HOST}/course/list_by_teacher_id`;
                let param = new URLSearchParams();
                param.append('teacherId', getUser().userId);
                this.$ajax.post(url, param).then((res)=> {
                    this.courseList = res.data;
                })
            },
            handleCourseAdd(){
                this.$router.push('/personalHomepage/courseAdd')
            }
        }
    }
</script>

<style scoped>

</style>