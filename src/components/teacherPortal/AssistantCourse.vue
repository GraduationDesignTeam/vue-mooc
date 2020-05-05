<template>
    <div style="margin: 0 30px">
        <CourseList :courseList="courseList" :mode="1"></CourseList>
        <div v-if="courseList.length===0" style="font-size: 18px;">
            <p>您尚未成为任何课程的助教！</p>
        </div>
    </div>
</template>

<script>
    import CourseList from "../course/CourseList";
    import {HOST} from "../../common/js/config";
    import {getUser} from "../../common/js/cache";

    export default {
        name: "AssistantCourse",
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
                let url = `${HOST}/course/list_by_assistant_id`;
                let param = new URLSearchParams();
                param.append('assistantId', getUser().userId);
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