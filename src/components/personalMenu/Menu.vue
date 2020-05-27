<!--用户个人主页页面左侧导航栏组件
BY朱翔鹏-->
<template>
    <div>
        <el-row class="tac">
            <el-col :span="4">
                <el-menu
                        :default-active=activeIndex
                        class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="openSelfCourse">
                        <i class="el-icon-s-management"></i>
                        <span slot="title">课程</span>
                    </el-menu-item>
                    <!--<el-menu-item index="2" @click="openSelfSchedule">
                        <i class="el-icon-date"></i>
                        <span slot="title">课表</span>
                    </el-menu-item>-->
                    <el-menu-item index="2" @click="openSelfHomework">
                        <i class="el-icon-edit"></i>
                        <span slot="title">作业</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="openSelfDiscussion">
                        <i class="el-icon-s-opportunity"></i>
                        <span slot="title">讨论</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="openSelfTeachCourse">
                        <i class="el-icon-s-custom"></i>
                        <span slot="title">授课</span>
                    </el-menu-item>
                    <el-menu-item index="5" @click="openSelfAssistCourse">
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
        data(){
            return{
                activeIndex: "1"
            }
        },
        created() {
            this.loadData();
        },
        methods : {
            openSelfCourse() {
                this.$router.push("/personalHomepage/openSelfCourse")
            },
            openSelfHomework() {
                this.$router.push("/personalHomepage/OpenSelfTask")
            },
            openSelfDiscussion() {
                this.$router.push("/personalHomepage/openSelfDiscussion")
            },
            openSelfTeachCourse() {
                this.$router.push("/personalHomepage/teacherCourse")
            },
            openSelfAssistCourse(){
                this.$router.push("/personalHomepage/assistantCourse")
            },
            loadData(){
                let path = this.$route.path;
                let prefixIndex = path.lastIndexOf('/');
                let lastPart = path.substring(prefixIndex+1);
                switch (lastPart) {
                    case 'openSelfCourse':
                        this.activeIndex='1';
                        break;
                    case 'OpenSelfTask':
                        this.activeIndex='2';
                        break;
                    case 'openSelfDiscussion':
                        this.activeIndex='3';
                        break;
                    case 'teacherCourse':
                        this.activeIndex='4';
                        break;
                    case 'assistantCourse':
                        this.activeIndex='5';
                        break;
                    default:
                        this.activeIndex='1';
                }
            }
        }
    }
</script>

<style scoped>

</style>