<!--用户个人主页页面左侧导航栏组件
BY朱翔鹏-->
<template>
    <div>
        <el-row class="tac">
            <el-col :span="4">
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
                    <el-menu-item index="1">
                        <i class="el-icon-s-management"></i>
                        <span slot="title" @click="openSelfCourse">课程</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-date"></i>
                        <span slot="title" @click="openSelfSchedule">课表</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-edit"></i>
                        <span slot="title" @click="openSelfHomework">作业</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-s-opportunity"></i>
                        <span slot="title" @click="openSelfDiscussion">讨论</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <i class="el-icon-s-custom"></i>
                        <span slot="title" @click="openSelfTeachCourse">授课</span>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <i class="el-icon-s-help"></i>
                        <span slot="title" @click="openSelfAssistCourse">助课</span>
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
                this.$router.push("/")
            },
            openSelfAssistCourse(){
                this.$router.push("/")
            }
        }
    }
</script>

<style scoped>

</style>