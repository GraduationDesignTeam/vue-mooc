<!--管理员个人主页菜单组件
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
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <!--<template slot="title">分组一</template>-->
                            <el-menu-item index="1-1" @click="manageUserProhibit">封禁管理</el-menu-item>
                            <el-menu-item index="1-2" @click="manageTeacherState">教师认证</el-menu-item>
                            <el-menu-item index="1-3" @click="manageUserStatistic">数据统计</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>课程管理</span>
                        </template>
                        <el-menu-item-group>
                            <!--<template slot="title">分组一</template>-->
                            <el-menu-item index="2-1" @click="manageCourseProhibit">封禁管理</el-menu-item>
                            <el-menu-item index="2-2" @click="manageCourseCheckState">开课审核</el-menu-item>
                            <el-menu-item index="2-3" @click="manageCourseStatistic">数据统计</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>讨论管理</span>
                        </template>
                        <el-menu-item-group>
                            <!--<template slot="title">分组一</template>-->
                            <el-menu-item index="3-1" @click="manageDiscussionState">封禁管理</el-menu-item>
                            <el-menu-item index="3-3" @click="manageDiscussionStatistic">数据统计</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
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
        name: "AdministratorMenu",
        methods : {
            manageUserProhibit() {
                this.$router.push("/administrator/manageUserProhibit")
            },
            manageTeacherState() {
                this.$router.push("/administrator/manageTeacherState")
            },
            manageUserStatistic() {
                this.$router.push("/")
            },
            manageCourseProhibit() {
                this.$router.push("/administrator/manageCourseProhibit")
            },
            manageCourseCheckState() {
                this.$router.push("/")
            },
            manageCourseStatistic(){
                this.$router.push("/")
            },
            manageDiscussionState(){

            },
            manageDiscussionStatistic(){

            }
        }
    }
</script>

<style scoped>

</style>