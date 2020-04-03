<!--用户个人主页上方页头组件
BY朱翔鹏-->
<template>
    <div>
        <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#000000"
                text-color="#909399"
                active-text-color="#ffd04b">
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">课程</el-menu-item>
            <el-menu-item index="3">讨论</el-menu-item>
            <el-menu-item index="4" style="margin-left: 920px">退出登录</el-menu-item>
        </el-menu>
        </div>
</template>

<script>
    import {saveUser} from "../../common/js/cache";

    export default {
        name: "Top",
        methods:{
            handleSelect(key) {
                switch(key){
                    case  '1':
                        //跳转到慕课网首页
                        this.$router.push("/")
                        break;
                    case  '2':
                        //跳转到课程页
                        this.$router.push("/")
                        break;
                    case  '3':
                        //跳转到讨论页
                        this.$router.push("/")
                        break;
                    case  '4':
                        //跳转到首页，未登录状态
                        saveUser(null)
                        this.$router.push("/")
                        break;
                }
            },
        }
    }
</script>

<style scoped>
    .el-menu-item{
        font-weight: bold;
    }
</style>