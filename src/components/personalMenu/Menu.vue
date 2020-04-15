<!--用户个人主页页面左侧导航栏组件
BY朱翔鹏-->
<template>
    <div>
        <el-row class="tac">
            <el-col :span="4">
                <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="openSelfCourse">
                        <i class="el-icon-s-management"></i>
                        <span slot="title">课程</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="openSelfSchedule">
                        <i class="el-icon-date"></i>
                        <span slot="title">课表</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="openSelfHomework">
                        <i class="el-icon-edit"></i>
                        <span slot="title">作业</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="openSelfDiscussion">
                        <i class="el-icon-s-opportunity"></i>
                        <span slot="title">讨论</span>
                    </el-menu-item>
                    <el-menu-item index="5" @click="openSelfTeachCourse">
                        <i class="el-icon-s-custom"></i>
                        <span slot="title">授课</span>
                    </el-menu-item>
                    <el-menu-item index="6" @click="openSelfAssistCourse">
                        <i class="el-icon-s-help"></i>
                        <span slot="title">助课</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "menu",
        methods : {
            openSelfCourse() {
                this.$router.push("/")
            },
            openSelfSchedule() {
                this.$router.push("/")
            },
            openSelfHomework() {
                this.$router.push("/")
            },
            openSelfDiscussion() {
                this.$router.push("/")
            },
            openSelfTeachCourse() {
                this.$router.push("/personalHomepage/teacherCourse")
            },
            openSelfAssistCourse(){
                this.$router.push("/")
            }
        }
    }
</script>

<style scoped>

</style>