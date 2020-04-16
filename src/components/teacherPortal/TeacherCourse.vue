<template>
    <div style="margin: 0 30px">
        <el-button type="primary" plain icon="el-icon-plus" @click="handleCourseAdd">开设课程</el-button>
        <br><br>
        <CourseList :courseList="courseList" :mode="1"></CourseList>
    </div>
</template>

<script>
    import CourseList from "../course/CourseList";
    export default {
        name: "TeacherCourse",
        components: {CourseList},
        data(){
            return{
                courseList:[
                    {id:1, name: '计算机二级训练营', college: 'MOOC考培', imgUrl: require("@/assets/course/course1.jpg"), teacherList:['王老师','张老师','刘老师'],
                        intro:'计算机二级Office极速通关，7天速成，为您提供计算机二级高频考点指南！',
                        openTime:'2020/03/12', closeTime:'2020/08/01' },
                    {id:2, name: '创新与创业管理', college: '南京邮电大学', imgUrl:require('@/assets/course/course2.jpg'), teacherList:['王老师','张老师','刘老师'],
                        intro:'具有创业思维，保持旺盛的创业精神，把创业精神和技能运用到自己的工作实践中对人们来说非常重要，而对创新与创业的追求会使你更具影响力。课程由南京邮电大学赵波教授为首的教学团队开设，帮助大家了解创业过程、培养创新创业思维，授课对象是对创新与创业感兴趣包括大学生在内的各类群体。',
                        openTime:'2020/03/12', closeTime:'2020/08/01'},
                    {id:3, name: '计算机网络', college: '哈尔滨工业大学', imgUrl:require('@/assets/course/course3.jpg'), teacherList:['王老师','张老师','刘老师'],
                        intro:'计算机二级Office极速通关，7天速成，为您提供计算机二级高频考点指南!'},
                    {id:4, name: '会计学原理', college: '江西财经大学', imgUrl:require('@/assets/course/course4.jpg'), teacherList:['王老师','张老师','刘老师'],
                        intro:'计算机二级Office极速通关，7天速成，为您提供计算机二级高频考点指南!'},
                ]
            }
        },
        methods:{
            loadData(){

            },
            handleCourseAdd(){
                this.$router.push('/personalHomepage/courseAdd')
            }
        }
    }
</script>

<style scoped>

</style>