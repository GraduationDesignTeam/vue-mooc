<template>
    <div>
        <el-container>
            <el-header>
                <CourseTop></CourseTop>
            </el-header>
        </el-container>
        <el-container>
            <el-aside style="width: 220px">
                <CourseMenu></CourseMenu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import CourseTop from './CourseTop'
    import CourseMenu from "./CourseMenu";
    export default {
        name: "CourseHomePage",
        components:{
            CourseTop,
            CourseMenu
        },
    }
</script>

<style scoped>
    .el-header{
        padding: 0 0;
    }
    /*.el-aside{*/
    /*    display: block;*/
    /*    position: absolute;*/
    /*    top: 60px;*/
    /*    bottom: 0;*/
    /*    overflow-y: unset;*/
    /*}*/
</style>