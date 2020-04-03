<!--管理员管理页面，管理员登陆后跳转到此页
BY朱翔鹏-->
<template>
    <div>
        <Top class="top-head"></Top>
        <el-row class="row-person">
            <el-col :span="3">
                <div class="demo-basic--circle">
                    <div class="block">
                        <el-avatar :src="`${path}/${user.picture}`" :size="99"></el-avatar>
                    </div>
                </div>
            </el-col>
            <el-col :span="3" style="margin-top: 14px">
                <span style="color: aliceblue">
                    <p>
                        <strong>{{user.userName}}  </strong>
                        <i class="el-icon-s-custom" style="color: chartreuse">
                            <span>管理员</span>
                        </i>
                    </p>
                    <p>{{sex}}</p>
                </span>
            </el-col>
            <el-col :span="8"><div></div></el-col>
            <el-col :span="10" style="margin-top: 14px;margin-left: 400px">
                <ul>
                    <li style="margin-top: 22px">
                        <el-button type="info" icon="el-icon-message" circle></el-button>
                    </li>
                    <li style="margin-top: 22px">
                        <el-button type="info" round class="el-icon-setting" @click="openSelfInfo"> 个人设置</el-button>
                    </li>
                </ul>
            </el-col>
        </el-row>
        <AdministratorMenu class="menu-person"></AdministratorMenu>
    </div>
</template>

<script>
    import Top from '../personalTop/Top.vue'
    import AdministratorMenu from "../administratorMenu/AdministratorMenu";
    import {getUser} from "../../common/js/cache";
    import {HOST} from "../../common/js/config";

    export default {
        name: "Administrator",
        components:{
            Top,
            AdministratorMenu
        },
        data () {
            return{
                user:{},
                path:'',
                sex:'男',
            }
        },
        mounted() {
            this.path=HOST
            //console.log(this.user)
            this.user=getUser()
            if(this.user.sex===1){
                this.sex='女'
            }
            //console.log(this.user)
        },
        methods:{
            openSelfInfo(){
                this.$router.push(`/administrator/administratorInfo`)
                this.user=getUser()
            }
        }
    }
</script>

<style scoped>
    .top-head{
        height: 60px;
    }
    .menu-person{
        margin-left: 10px;
        margin-top: 30px;
    }
    .row-person{
        height: 105%;
        height: 120px;
        background: url("header.jpg") 0 0 no-repeat;
        background-size: 100% 100%;

    }
    .demo-basic--circle{
        margin-top: 10px;
        margin-left: 40px;
    }
    ul{
        display:inline;
        white-space:nowrap;
    }
    li{
        list-style: none;
        display: inline-block;
        margin-left: 30px;
        float: left;
    }
</style>