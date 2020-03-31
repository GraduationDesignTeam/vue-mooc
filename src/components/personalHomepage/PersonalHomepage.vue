<!--所有用户的个人主页页面
BY朱翔鹏-->
<template>
    <div>
        <Top class="top-head"></Top>
        <el-row class="row-person">
            <el-col :span="3">
                <div class="demo-basic--circle">
                    <div class="block">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="99"></el-avatar>
                    </div>
                </div>
            </el-col>
            <el-col :span="3" style="margin-top: 14px">
                <span style="color: aliceblue">
                    <p>
                        <strong>小明  </strong>
                        <i class="el-icon-s-custom" style="color: chartreuse">已认证教师</i>
                    </p>
                    <p>女 | 南京大学</p>
                </span>
            </el-col>
            <el-col :span="8"><div></div></el-col>
            <el-col :span="10" style="margin-top: 14px;margin-left: 400px">
                <ul>
                    <li>
                        <span style="color: aliceblue">
                            <p>
                                <strong>88 天</strong>
                            </p>
                            <p>慕龄</p>
                        </span>
                    </li>
                    <li>
                        <span style="color: aliceblue">
                            <p>
                                <strong>3</strong>
                            </p>
                            <p>课程</p>
                        </span>
                    </li>
                    <li>
                        <span style="color: aliceblue">
                            <p>
                                <strong>5</strong>
                            </p>
                            <p>讨论</p>
                        </span>
                    </li>
                    <li style="margin-top: 22px">
                        <el-button type="info" icon="el-icon-message" circle></el-button>
                    </li>
                    <li style="margin-top: 22px">
                        <el-button type="info" icon="el-icon-shopping-cart-2" circle></el-button>
                    </li>
                    <li style="margin-top: 22px">
                        <el-button type="info" round class="el-icon-setting"> 个人设置</el-button>
                    </li>
                </ul>
            </el-col>
        </el-row>
        <Menu class="menu-person"></Menu>
    </div>

</template>

<script>
    import Top from '../personalTop/Top.vue'
    import Menu from '../personalMenu/Menu.vue'
    export default {
        name: "PersonalHomepage",
        components:{
            Top,
            Menu
        },
        data () {

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