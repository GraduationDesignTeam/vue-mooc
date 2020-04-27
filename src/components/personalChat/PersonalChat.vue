<template>
    <div class="chat-box">
        <Top :index="activeIndex"></Top>
        <el-row >
            <el-col :span="20" class="chart">
                <h2>VIP在线客服</h2>
                <div class="container">
                    <div class="msg">
                        <div class="panel-body">
                            <ul>
                                <li v-for="(item,index) in contents" :key="index">
                                    <!-- 客服连接应答系统消息 -->
                                    <div v-if="item.type==='connecting'" class="sys">
                                        <div class="time">{{item.time}}</div>
                                        <div>
                                            <span class="content">您好,{{item.sender}}客服{{item.content}}</span>
                                        </div>
                                    </div>
                                    <!-- 聊天消息 -->
                                    <div v-else>
                                        <div class="time">{{item.time}}</div>
                                        <div :class="{'self':item.sender===user.username}">
                                            <span>[{{item.sender}}]: </span>
                                            <span>{{item.content}}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <el-row>
                        <el-col :span="20">
                            <el-input v-model="input" placeholder="请输入内容" @keyup.enter.native="send"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button @click="send">发送</el-button>
                        </el-col>
                    </el-row>


                </div>
            </el-col>
            <el-col :span="4" class="online">
                <h2>在线客服({{onLineMsg.onlineNum}})</h2>
                <ul>
                    <li v-for="(item,index) in onLineMsg.users" :key="index" @click="selService(item.username)">
                        <div>
                            <!-- 显示所有的客服,被选中项为红色背景-->
                            <span :class="{'sel':receiver===item.username}">客服{{item.username}}</span>
                        </div>
                    </li>
                </ul>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import Top from '../personalTop/Top.vue'
    import {WS_HOST} from '../../common/js/config'
    export default {
        name: "PersonalChat",
        data(){
            return{
                //接收及发送普通消息对象
                msg: {
                    time: '',         //时间
                    content: '',     //消息内容
                    sender: '',      //发送人
                    receiver: '',    //接收人
                    code: '',        //消息类型编码
                    type: ''         //消息类型
                },
                onLineMsg: { //在线客服
                    onlineNum: 0,   //在线人数
                    users: [],       //在线用户
                    code: '',        //消息类型编码
                    type: '',        //消息类型
                },
                input: '',
                webSocket: null,
                contents: [],       //消息列表
                receiver: '',      //当前选中的客服
                activeIndex: '3',
            }
        },
        components:{
            Top

        },
        created(){
            this.$store.dispatch('increment',1)
            //this.user = getUser()
            this.initWebSocket()
        },
        destroyed(){//离开页面
            //关闭WebSocket连接
            this.webSocket.close()
        },
        methods:{
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
                console.log('chart连接成功')
            },
            //处理接收消息
            webSocketMessage(e){
                //把接收到的消息字符串转换json格式的对象
                let message = JSON.parse(e.data)
                console.log(message)
                switch (message.code){
                    case 'online': //在线人数的消息
                        //取出只是客服的用户
                        var users = message.users.filter((item)=>{
                            return item.role === 1
                        })
                        this.onLineMsg.users = users
                        this.onLineMsg.onlineNum = users.length
                        break;
                    case 'normal': //普通消息
                        this.msg = message
                        this.contents.push(this.msg)
                        break;

                }

            },
            //发送消息
            send(){
                if(!this.receiver) return
                let message = {
                    time: makeDate(new Date()),
                    content: this.input,
                    sender: this.user.username,
                    receiver: this.receiver
                }
                this.contents.push(message)
                //发送消息到服务器
                this.webSocket.send(JSON.stringify(message))
            },
            //选择客服
            selService(username){
                //设置接收人名
                this.receiver = username
                let message = {
                    time: makeDate(new Date()),
                    content: '请求客服服务...',
                    sender: this.user.username,
                    receiver: username,
                    type: 'connecting'
                }
                //发送消息到服务器
                this.webSocket.send(JSON.stringify(message))
            }
        },
        computed:{
            // 使用对象展开运算符将 getters 混入 computed 对象中
            ...mapGetters([
                'user'
            ])
        },
    }
</script>

<style scoped>

</style>