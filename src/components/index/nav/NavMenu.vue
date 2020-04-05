<template>
    <div class="nav">
        <Nav v-if="isLogin" :menu-index="menuIndex" :left-menu-item-list="leftMenuItemList" :right-menu-item-list="rightMenuItemList1"/>
        <Nav v-else :menu-index="menuIndex" :left-menu-item-list="leftMenuItemList" :right-menu-item-list="rightMenuItemList2"/>
    </div>
</template>

<script>
    import Nav from "../nav/Nav"
    export default {
        name: "NavMenu",
        props: ['menuIndex'],
        components: {
            Nav
        },
        data(){
            return{
                isLogin: false,
                leftMenuItemList: [
                    {
                        optionName: '首页',
                        url: '/'
                    },
                    {
                        optionName: '课程总览',
                        url: '/a'
                    },
                    {
                        optionName: '合作院校',
                        url: '/b'
                    },
                ],
                rightMenuItemList1:[
                    {
                        optionName: '个人中心',
                        url: '/personalHomepage'
                    },
                    {
                        optionName: '消息',
                        url: '/info'
                    }
                ],
                rightMenuItemList2:[
                    {
                        optionName: '登录',
                        url: '/login'
                    },
                    {
                        optionName: '注册',
                        url: '/register'
                    }
                ]
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>