<template>

    <div class="talk_input">
        <Head :index="activeIndex"></Head>
        <el-row >
            <el-col :span="20" class="chart">
                <h2>{{sender.name}}</h2>
                <div class="container">
                    <div class="msg">
                        <div class="panel-body">
                            <ul>
                                <li v-for="(item,index) in contents" :key="index">

                                      <span> {{item.msgPostname}} {{item.msgTime}}</span>
                                        <div>
                                            <span>{{item.msgContent}}</span>
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
        </el-row>

    </div>
</template>

<script>
    import {HOST} from "../../common/js/config";
    import {getCourse, getUser} from "../../common/js/cache";
    // import {makeDate} from "../../common/js/dateformat";

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
                senderId:2,
                user:{

                    userId:''
                },
                sender:{
                    name:''
                },
                geter:{
                    name:''
                },
                people:{
                    userId:'',
                    name:''
                },
                result:[]
            }
        },
        created() {
            this.path=HOST,
                this.user=getUser(),
                this.course=getCourse(),
                this.senderId= this.$route.params.id,
                this.getRecords()
                this.download()

        },
        methods: {
            getRecords() {
                let url = `${HOST}/message/getUser/`;
                this.loading = true
                this.user.userId=this.senderId
                this.$ajax.post(url,  this.user).then((res) => {
                    this.sender = res.data
                    console.log(this.sender)
                    this.loading = false
                })
            },

            send(){
                let message = {
                    msgType: 0,
                    msgTime: new Date(),
                    msgContent: this.input,
                    msgPost: getUser().userId,
                    msgGet: this.$route.params.id
                }
                let url = `${HOST}/message/add/`;
                this.$ajax.post(url,  message).then((res) => {
                    console.log(res.data)
                    this.loading = false
                    this.download()
                })

            },
            download(){
                let message = {
                    msgType: 0,
                    msgTime: new Date(),
                    msgContent: this.input,
                    msgPost: getUser().userId,
                    msgGet: this.$route.params.id
                }
                this.loading = true
                let url2 = `${HOST}/message/getAll/`;
                this.$ajax.post(url2,  message).then((res) => {
                    console.log(res.data)
                    this.contents=res.data
                    this.handle(this.contents.msgPost)
                    this.loading = false
                })
            },
            handle(id){
                let url = `${HOST}/message/getUser/`;
                this.loading = true
                this.people.userId=id
                this.$ajax.post(url,  this.people).then((res) => {
                    this.result = res.data
                    console.log(this.people)
                    this.loading = false
                })
            }

        }
    }
</script>

<style scoped>
    .chat-box{
        padding: 10px;
    }
    .chat-box .chart h2 {
        height: 50px;
        line-height: 50px;
        background-color: #409EFF;
        color: #fff;
        text-align: center;
        font-size: 20px;
        border-radius: 5px;
    }

    .chat-box .online h2 {
        margin-left: 10px;
        height: 50px;
        line-height: 50px;
        color: #fff;
        background-color: #F56C6C;
        text-align: center;
        font-size: 18px;
        border-radius: 5px;
    }

    .chat-box .online ul{
        list-style: none;
    }

    .chat-box .online ul li{
        line-height: 30px;
        border-bottom: 1px dashed #666;
        font-size: 12px;
        font-family: 微软雅黑;
        color:#242424;
        letter-spacing: 3px;
        padding-left: 20px;
    }

    .chat-box .online ul li .sel {
        background-color: #F56C6C;
        color:#fff;
        font-weight: bold;
    }

    .msg {
        border: 1px solid #ccc;
        padding:20px;
        height:400px;
        line-height: 20px;
        overflow: auto;
    }

    .msg .panel-body ul {
        list-style: none;
    }

    .msg .panel-body li {
        height: 60px;
        color: #333;
        font-size: 14px;
    }

    .msg .panel-body li .sys {
        text-align: center;
    }

    .msg .panel-body li .self {
        background-color: #F56C6C;
        color: #fff;
    }

    .msg .panel-body li .time {
        font-size: 12px;
        color: #999;
    }
    .msg .panel-body li .content {
        font-size: 14px;
        color: #999;
    }
    .time {
        font-size: 12px;
        color: #999;
    }

    .content {
        color: #333;
        font-size: 14px;
    }

    .name {
        padding-right: 5px;
        color: #1d7ad9;
    }
</style>