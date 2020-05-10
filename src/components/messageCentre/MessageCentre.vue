<template>
    <div>
        <el-container>
            <el-header>
                <Top></Top>
            </el-header>
        </el-container>
        <el-container>
            <el-aside style="width: 220px">
                <MessageMenu></MessageMenu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import Top from '../personalTop/Top.vue'
    import MessageMenu from './MessageMenu'
    export default {
        name: "MessageCentre" ,
        components:{
            Top,
            MessageMenu,


        },
    }
</script>

<style scoped>
    .el-header{
        padding: 0 0;
    }
</style>