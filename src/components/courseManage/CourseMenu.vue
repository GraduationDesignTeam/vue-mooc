<template>
    <div style="height: 100%">
        <!--  注：overflow: overlay;仅能在chrome浏览器生效  -->
        <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                style="height: 100%; overflow-y: overlay;">
            <el-menu-item index="1" @click="open">
                <i class="el-icon-s-management"></i>
                <span slot="title">课程基本信息</span>
            </el-menu-item>
            <el-menu-item index="2" @click="open">
                <i class="el-icon-date"></i>
                <span slot="title">课程公告</span>
            </el-menu-item>
            <el-menu-item index="3" @click="open">
                <i class="el-icon-tickets"></i>
                <span slot="title">课程章节</span>
            </el-menu-item>
            <el-menu-item index="4" @click="open">
                <i class="el-icon-s-help"></i>
                <span slot="title">课件管理</span>
            </el-menu-item>
            <el-menu-item index="5" @click="open">
                <i class="el-icon-edit"></i>
                <span slot="title">课程任务</span>
            </el-menu-item>
            <el-menu-item index="6" @click="open">
                <i class="el-icon-s-opportunity"></i>
                <span slot="title">课程讨论区</span>
            </el-menu-item>
            <el-menu-item index="7" @click="open">
                <i class="el-icon-s-custom"></i>
                <span slot="title">师生</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "CourseMenu",
        methods:{
            open(){}
        }
    }
</script>

<style scoped>

</style>