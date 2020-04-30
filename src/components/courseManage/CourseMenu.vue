<template>
    <div style="height: 100%">
        <!--  注：overflow: overlay;仅能在chrome浏览器生效  -->
        <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo"
                style="height: 100%; overflow-y: overlay;"
                @select="handleSelect">
            <el-menu-item index="1">
                <i class="el-icon-s-management"></i>
                <span slot="title">课程基本信息</span>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="el-icon-date"></i>
                <span slot="title">课程公告</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-tickets"></i>
                <span slot="title">课程章节</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-s-help"></i>
                <span slot="title">课件管理</span>
            </el-menu-item>
            <el-submenu index="5">
                <template slot="title"><i class="el-icon-edit"></i>课程任务</template>
                <el-menu-item index="5-1">作业</el-menu-item>
                <el-menu-item index="5-2">考试</el-menu-item>
            </el-submenu>
            <el-menu-item index="6">
                <i class="el-icon-s-opportunity"></i>
                <span slot="title">课程讨论区</span>
            </el-menu-item>
            <el-submenu index="7">
                <template slot="title"><i class="el-icon-s-custom"></i>师生</template>
                <el-menu-item index="7-1">教师</el-menu-item>
                <el-menu-item index="7-2">助教</el-menu-item>
                <!--                <el-menu-item index="7-3">学生</el-menu-item>-->
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
   export default {
        name: "CourseMenu",
        data(){
            return{
                activeIndex:'2'
            }
        },
        created() {
            this.loadData();
        },
        methods:{
            loadData(){
                let path = this.$route.path;
                switch (path.substring(14, path.lastIndexOf('/'))) {
                    case 'courseInfo':
                        this.activeIndex='1';
                        break;
                    case 'courseUpdate':
                        this.activeIndex='1';
                        break;
                    case 'courseNotice':
                        this.activeIndex='2';
                        break;
                    case 'chapterManage':
                        this.activeIndex='3';
                        break;
                    case 'courseWare':
                        this.activeIndex='4';
                        break;
                    case 'courseTask':
                        this.activeIndex='5-1';
                        break;
                    case 'courseExam':
                        this.activeIndex='5-2';
                        break;
                    case 'courseDiscussion':
                        this.activeIndex='6';
                        break;
                    case 'courseTeacher':
                        this.activeIndex='7-1';
                        break;
                    case 'courseAssistant':
                        this.activeIndex='7-2';
                        break;
                    default:
                        this.activeIndex='1';
                        break;
                }
            },
            handleSelect(key){
                let id = this.$route.params.id;
                switch(key) {
                    case  '1':
                        //跳转到课程基本信息页面
                        this.$router.push("/courseManage/courseInfo/" + id);
                        break;
                    case  '2':
                        //跳转到课程公告页面
                        this.$router.push("/courseManage/courseNotice/" + id);
                        break;
                    case  '3':
                        //跳转到课程章节页面
                        this.$router.push("/courseManage/chapterManage/" + id);
                        break;
                    case  '4':
                        //跳转到课件管理
                        this.$router.push("/courseManage/courseWare/" + id);
                        break;
                     case  '5-1':
                        //跳转到作业
                        this.$router.push("/courseManage/courseTask/" + id);
                        break;
                    case  '5-2':
                        //跳转到考试
                        this.$router.push("/courseManage/courseExam/" + id);
                        break;
                    case  '6':
                        //跳转到课程讨论区
                        this.$router.push("/courseManage/courseDiscussion/" + id);
                        break;
                    case  '7-1':
                        //跳转到设置教师
                        this.$router.push("/courseManage/courseTeacher/" + id);
                        break;
                    case  '7-2':
                        //跳转到设置助教
                        this.$router.push("/courseManage/courseAssistant/" + id);
                        break;
                }
            }
        },
        watch:{
            // 监听路由变化，相应地改变侧边栏选中的项目
            '$route.path':function pathChange() {
                    this.loadData();
            }
        }
    }
</script>

<style scoped>

</style>