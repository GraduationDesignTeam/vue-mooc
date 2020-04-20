<!--课程管理页面上方页头组件-->
<template>
    <div class="nav-container">
        <el-menu
                default-active="2"
                mode="horizontal"
                @select="handleSelect"
                background-color="#222"
                text-color="#f5f5f5"
                active-text-color="#ffd04b">
            <el-menu-item index="1" style="width: 220px; text-align: center">
                <img class="img" v-bind:src="logoUrl" alt="MOOC"/>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="el-icon-s-management"></i>
                <span slot="title">{{courseName}}</span>
            </el-menu-item>
            <el-menu-item index="5" style="float: right">退出登录</el-menu-item>
            <el-menu-item index="4" style="float: right">
                <i class="el-icon-s-custom"></i>
                个人主页
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import {clearCourseDraft, clearUser} from "../../common/js/cache";

    export default {
        name: "CourseTop",
        data(){
            return{
                logoUrl: require("@/assets/logo_white.png"),
                courseName:'会计学原理'
            }
        },
        methods:{
            handleSelect(key) {
                switch(key){
                    case  '1':
                        //跳转到慕课网首页
                        this.$router.push("/")
                        break;
                    case  '2':
                        this.$router.push("/courseManage/"+this.$route.params.id);
                        break;
                    case  '3':
                        //跳转到讨论页
                        this.$router.push("/")
                        break;
                    case  '4':
                        //跳转到个人主页
                        this.$router.push("/personalHomepage")
                        break;
                    case  '5':
                        //跳转到首页，未登录状态
                        clearUser();
                        clearCourseDraft();
                        this.$router.push("/");
                        break;
                }
            },
        }
    }
</script>

<style scoped>
    a{
        text-decoration: none;
    }

    .img{
        height: 48px;
        vertical-align:middle;
        text-align: center;
    }

    .nav-container{
        padding-right: 20px;
        background-color:#222;
        color: #fff;
    }
</style>