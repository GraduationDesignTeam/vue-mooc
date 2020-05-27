<template>
    <div class="nav">
        <Nav v-if="isLogin==0" :menu-index="menuIndex" :left-menu-item-list="leftMenuItemList" :right-menu-item-list="rightMenuItemList1"/>
        <Nav v-else-if="isLogin==1" :menu-index="menuIndex" :left-menu-item-list="leftMenuItemList" :right-menu-item-list="rightMenuItemList2"/>
        <Nav v-else-if="isLogin==2" :menu-index="menuIndex" :left-menu-item-list="leftMenuItemList" :right-menu-item-list="rightMenuItemList3"/>
    </div>
</template>

<script>
    import Nav from "../nav/Nav"
    import {getUser} from "../../../common/js/cache";

    export default {
        name: "NavMenu",
        props: ['menuIndex'],
        components: {
            Nav
        },
        data(){
            return{
                isLogin: 0,//0表示未登录；1表示普通用户登录；2表示管理员登录
                user:{},
                leftMenuItemList: [
                    {
                        optionName: '首页',
                        url: '/'
                    },
                    {
                        optionName: '课程总览',
                        url: '/search'
                    },
                    // {
                    //     optionName: '合作院校',
                    //     url: '/b'
                    // },
                ],
                rightMenuItemList1:[
                {
                    optionName: '登录',
                    url: '/login'
                },
                {
                    optionName: '注册',
                    url: '/register'
                }
                ],
                rightMenuItemList2:[
                    {
                        optionName: '个人中心',
                        url: '/personalHomepage'
                    },
                    {
                        optionName: '消息',
                        url: '/info'
                    }
                ],
                rightMenuItemList3:[
                    {
                        optionName: '管理中心',
                        url: '/administrator'
                    },
                    {
                        optionName: '消息',
                        url: '/info'
                    }
                ],
            }
        },
        created() {
            this.user=getUser();
            if(this.user!=null && this.user.userId!==undefined){
                if(this.user.userStatus==="000"){
                    this.isLogin=2
                }else{
                    this.isLogin=1
                }
                if(this.user.teacherState === 1)
                    this.rightMenuItemList2[0].url='/personalHomepage/teacherCourse';
                else
                    this.rightMenuItemList2[0].url='/personalHomepage/openSelfCourse';
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
    .nav{
        -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
    }
</style>