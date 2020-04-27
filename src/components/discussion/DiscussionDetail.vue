<template>
    <!--讨论内部主页-->
    <div>
        <Top class="top-head"></Top>
        <div>
            <el-card class="box-card">
                <el-row :gutter="24">
                    <el-col :span="6">
                        <i class="el-icon-s-opportunity" style="color: chocolate;margin-left: 40px;margin-top: 10px"></i> <strong style="font-size: 20px">讨论区</strong>
                    </el-col>
                    <el-col :span="6">
                    </el-col>
                    <el-col :span="6">
                    </el-col>
                    <el-col :span="6" style="float: right">
                        <i class="el-icon-s-management" style="color: #9199a1;margin-top: 10px"></i> <span style="font-size: 16px" @click="openCourse">{{discussionDetail.courseInfo.name}}</span> <el-divider direction="vertical"></el-divider> <i class="el-icon-school" style="color: #9199a1;margin-top: 10px"></i> <span style="font-size: 16px">{{discussionDetail.courseInfo.school}}</span>
                    </el-col>
                </el-row>
            </el-card>
        </div>
        <div>
            <el-row :gutter="20">
                <el-col :span="4"><div>
                        <img v-if="discussionDetail.courseInfo.photo" :src="`${path}/${discussionDetail.courseInfo.photo}`" class="image" @click="openCourse">
                        <img v-else :src="img" class="image" @click="openCourse">
                    <el-card class="box-card3" style="height: 190px;width: 160px;margin-left: 32px">
                        <span style="margin-left: 30px;font-size: 14px;color: darkcyan">课程首页</span>
                        <el-divider></el-divider>
                        <span style="margin-left: 30px;font-size: 14px;color: darkcyan">课程讨论</span>
                        <el-divider></el-divider>
                        <span style="margin-left: 30px;font-size: 14px;color: darkcyan">课程作业</span>
                        <el-divider></el-divider>
                        <span style="margin-left: 30px;font-size: 14px;color: darkcyan">课程章节</span>
                    </el-card>
                </div></el-col>
                <el-col :span="18"><div>
                    <el-card class="box-card2" style="height: 1000px;width: 1050px">
                        <el-card class="box-card4">
                            <strong>{{discussionDetail.discussionName}}</strong>
                            <p></p>
                            <span style="color: #313131">  {{discussionDetail.discussionDescription}}</span>
                            <el-divider></el-divider>
                            <span style="float: left;margin-bottom: 6px"><el-button size="mini" plain @click="handleRecord">回帖</el-button></span>
                        </el-card>
                        <div style="margin-top: 20px">
                            <span style="font-size: 12px;color: #9199a1">共{{discussionDetail.recordNum}}回帖</span>
                            <el-divider></el-divider>
                            <div v-for="o in discussionDetail.recordList" :key="o" class="recordList">
                                <span v-if="o.replyRecordId" style="font-size: 12px;color: #337ab7">回复：{{o.replyRecordId}}楼<p></p></span>
                                <span v-else></span>
                                <span style="font-size: 14px;color: #333333">{{o.discussContent}}</span>
                                <p><span style="font-size: 12px;color: #56B929">{{o.userName}}</span>
                                <span style="margin-left: 10px;font-size: 10px;color: #9199a1">{{convertDate(o.lastUpdateTime)}}</span>
                                <span style="float: right"><el-button size="mini" plain @click="handleRecordBack(o.discussRecordId)">回复</el-button></span></p>
                                <el-divider></el-divider>
                            </div>
                        </div>
                    </el-card>
                </div></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import Top from "../personalTop/Top";
    import {HOST} from "../../common/js/config";
    import {convertDate} from "../../common/js/dateformat";
    export default {
        name: "DiscussionDetail",
        components:{
            Top
        },
        data(){
            return{
                path:'',
                img: require('./no.png'),
                loading: false, //正在加载,
                discussionDetail:{
                    discussionId:0,

                }
            }
        },
        created() {
            this.path=HOST
            this.discussionDetail.discussionId=this.$route.params.id
            this.getData()
        },
        methods:{
            getData(){
                this.loading = true;
                let url=`${HOST}/discussion/open/${this.discussionDetail.discussionId}`
                this.$ajax.get(url).then(res=>{
                    this.discussionDetail = res.data
                    console.log(this.discussionDetail)
                    this.loading = false;
                })
            },
            openCourse(){
                //跳转到讨论所属课程页面
            },
            //日期格式化
            convertDate(time){
                return convertDate(time)
            },
            handleRecord(){
                //回帖，回复主楼
            },
            handleRecordBack(id){
                //回复，回复某一支楼
                console.log(id)
            }
        }
    }
</script>

<style scoped>
    .box-card {
        width: 1262px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card2 {
        width: 880px;
    }
    .image {
        height: 150px;
        width: 100%;
        display: block;
        margin-left: 10px;
    }
    .el-divider--horizontal{
        margin: 12px 0;
        background: 0 0;
        border-top: 1px dashed #e8eaec;
    }
    .recordList{

    }
</style>