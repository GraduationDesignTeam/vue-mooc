<!--所有用户的个人主页页面
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
                            <span v-if="teacherState">已认证教师</span>
                            <span v-else>未认证教师</span>
                        </i>
                    </p>
                    <p>{{sex}} | {{user.school}}</p>
                </span>
            </el-col>
            <el-col :span="8"><div></div></el-col>
            <el-col :span="10" style="margin-top: 14px;margin-left: 400px">
                <ul>
                    <li>
                        <span style="color: aliceblue">
                            <p>
                                <strong>0</strong>
                            </p>
                            <p>课程</p>
                        </span>
                    </li>
                    <li>
                        <span style="color: aliceblue">
                            <p>
                                <strong>{{userDiscussionNum}}</strong>
                            </p>
                            <p>讨论</p>
                        </span>
                    </li>
                    <li>
                        <span style="color: aliceblue">
                            <p>
                                <strong>{{userDiscussionNum}}</strong>
                            </p>
                            <p>消息中心</p>
                        </span>
                    </li>
                    <li style="margin-top: 22px">
                        <el-button type="info" icon="el-icon-message" circle></el-button>
                    </li>
                    <li style="margin-top: 22px">
                        <el-button type="info" icon="el-icon-shopping-cart-2" circle></el-button>
                    </li>
                    <li style="margin-top: 5px">
                        <el-button type="info" round class="el-icon-setting" @click="openSelfInfo"> 个人设置</el-button>
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
    import {getUser} from "../../common/js/cache";
    import {WS_HOST} from "../../common/js/config";
    import {HOST} from "../../common/js/config";
    export default {
        name: "PersonalHomepage",
        components:{
            Top,
            Menu
        },
        data () {
            return{
                user:{},
                path:'',
                teacherState:false,//是否已认证教师
                sex:'男',
                userDiscussionNum:0,//用户参加的讨论数量（身份可以是教师、助教、学生中任意一个）

            }
        },
        mounted() {
            this.path=HOST;
            //console.log(this.user)
            this.user=getUser()
            if(this.user.teacherState===1){
                this.teacherState=true
            }
            if(this.user.sex===1){
                this.sex='女'
            }
            //console.log(this.user)
            this.getUserDiscussionNum()
        },
        methods:{
            //取用户参加的讨论数量
            getUserDiscussionNum(){
                let url=`${HOST}/user/getUserDiscussionNum/${this.user.userId}`
                this.$ajax.get(url).then((res)=>{
                    let result = res.data
                    this.userDiscussionNum=result
                })
            },
            openSelfInfo(){
                this.$router.push(`/personalHomepage/personalInfo`)
                this.user=getUser()
            },
            //初始化WebSocket
            initWebSocket(){
                let url = `${WS_HOST}/server/${this.user.username}`
                //创建WebSocket对象
                this.webSocket = new WebSocket(url)
                //指定连接建立成功的回调函数
                this.webSocket.onopen = this.webSocketOpen
                //指定接收消息的回调函数
                this.webSocket.onmessage = this.webSocketMessage
            },
            //处理连接创建成功
            webSocketOpen(){
                console.log('main连接成功')
            },
            //处理接收消息
            webSocketMessage(e){
                //把接收到的消息字符串转换json格式的对象
                let msg = JSON.parse(e.data)
                console.log("main",msg)
                switch (msg.code){
                    case 'online': //在线人数的消息
                        this.num = msg.onlineNum
                        break;
                    default: //其它的消息
                        console.log(msg)
                        this.message = msg
                        this.$notify({
                            title: '通知',
                            message: '您有新短消息',
                            type: 'success'
                        });
                        break;
                }

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