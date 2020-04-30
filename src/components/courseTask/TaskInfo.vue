<template>
    <div>
        <el-button type="primary" plain icon="el-icon-plus" @click="handleCourseAdd">添加作业</el-button>
    </div>
</template>

<script>
    import {HOST} from "../../common/js/config";
    import {getUser} from "../../common/js/cache";

    export default {
        name: "TaskInfo",
        methods:{
            loadData(){
                let url = `${HOST}/course/list_by_teacher_id`;
                console.log(url)
                let param = new URLSearchParams();
                param.append('teacherId', getUser().userId);
                this.$ajax.post(url, param).then((res)=> {
                    this.courseList = res.data;
                })
            },
            handleCourseAdd(){
                let id = this.$route.params.id;
                this.$router.push('/courseManage/taskAdd/'+id)
            }
        }
    }
</script>

<style scoped>

</style>