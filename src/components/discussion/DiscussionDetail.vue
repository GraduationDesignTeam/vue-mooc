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
                        <i class="el-icon-s-management" style="color: #ff7a3e;margin-top: 10px"></i> <span style="font-size: 16px" @click="toCourse">{{discussionDetail.courseInfo.name}}</span> <el-divider direction="vertical"></el-divider> <i class="el-icon-school" style="color: #2d8cf0;margin-top: 10px"></i> <span style="font-size: 16px">{{discussionDetail.courseInfo.school}}</span>
                    </el-col>
                    <!--#9199a1-->
                </el-row>
            </el-card>
        </div>
        <div>
            <el-row :gutter="20">
                <el-col :span="4"><div style="margin-top: 5px">
                        <img v-if="discussionDetail.courseInfo.photo" :src="`${path}/${discussionDetail.courseInfo.photo}`" class="image" @click="toCourse">
                        <img v-else :src="img" class="image" @click="toCourse">
                    <el-card class="box-card3" style="height: 140px;width: 167px;margin-left: 24px;background-color: gainsboro;margin-top: 10px">
                        <span style="margin-left: 30px;font-size: 14px;color: darkcyan" @click="toCourse">课程首页</span>
                        <el-divider></el-divider>
                        <span style="margin-left: 30px;font-size: 14px;color: darkcyan" @click="toDiscussionHomepage">讨论区首页</span>
                        <el-divider></el-divider>
                        <span style="margin-left: 30px;font-size: 14px;color: darkcyan" @click="toPersonalHomepage">个人主页</span>
                    </el-card>
                </div></el-col>
                <el-col :span="18"><div>
                    <el-card class="box-card2" style="width: 1050px">
                        <el-card class="box-card4">
                            <strong><i class="el-icon-s-comment" style="color: #ff7a3e"></i>{{discussionDetail.discussionName}}</strong>
                            <span style="font-size: 12px;color: #9199a1;margin-left: 15px">
                                {{discussionDetail.teacher.userName}}
                                <i class="el-icon-s-custom" style="color: chartreuse">
                                    <span>已认证教师</span>
                                </i>
                            </span>
                            <span v-if="discussionDetail.recordNum>10" style="float: right;color: red;font-size: 14px"><i class="el-icon-medal"></i>热门</span>
                            <p></p>
                            <span style="color: #313131">  {{discussionDetail.discussionDescription}}</span>
                            <el-divider></el-divider>
                            <span style="float: left;margin-bottom: 6px"><el-button type="success" size="mini" icon="el-icon-s-promotion" plain @click="handleRecord">回帖</el-button></span>
                            <span v-if="user.userName===discussionDetail.teacher.userName" style="float: right;margin-bottom: 6px"><el-button type="info" size="mini" icon="el-icon-edit" plain @click="handleDiscussionUpdate(discussionDetail.discussionId)">编辑</el-button></span>
                        </el-card>
                        <div style="margin-top: 20px">
                            <div>
                                <span style="font-size: 12px;color: #9199a1">共{{discussionDetail.recordNum}}回帖</span>
                                <el-divider></el-divider>
                                <div v-for="o in pageInfo.list" :key="o" class="recordList">
                                    <div>
                                        <span style="font-size: 12px;color: #337ab7">{{o.storeyId}}楼</span>
                                        <span v-if="o.replyRecordId" style="font-size: 12px;color: #337ab7;margin-left: 20px">回复：<i class="el-icon-s-flag"></i>{{o.replyRecordId}}楼</span>
                                        <span v-else></span>
                                        <!--<span v-if="null" style="float: right;color: red;font-size: 12px"><i class="el-icon-mic"></i>锐帖</span>-->
                                    </div>
                                    <p></p>
                                    <div v-html="o.discussContent" style="font-size: 14px;color: #333333"></div>
                                    <!--<span style="font-size: 14px;color: #333333">{{o.discussContent}}</span>-->
                                    <p><span style="font-size: 12px;color: #56B929"><i class="el-icon-s-custom"></i>{{o.userName}}</span>
                                        <strong v-if="user.userId===o.userId" style="font-size: 14px;color: #3366CC">(我)</strong>
                                        <span style="margin-left: 10px;font-size: 10px;color: #9199a1">{{convertDate(o.lastUpdateTime)}}</span>
                                        <span v-if="user.userId===o.userId" style="float: right"><el-button type="info" size="mini" icon="el-icon-edit" plain @click="handleRecordUpdate(o)">编辑</el-button></span>
                                        <span v-if="user.userId===o.userId" style="float: right;margin-right: 10px"><el-button type="danger" size="mini" icon="el-icon-delete" plain @click="handleRecordDelete(o.discussRecordId)">删帖</el-button></span>
                                        <span v-if="user.userId!==o.userId" style="float: right"><el-button type="success" size="mini" icon="el-icon-s-promotion" plain @click="handleRecordBack(o.storeyId)">回帖</el-button></span></p>
                                    <el-divider></el-divider>
                                </div>
                                <el-pagination
                                        v-loading="loading"
                                        background
                                        layout="prev, pager, next"
                                        @current-change="handleCurrentChange"
                                        :current-page="currPageObject.currPage"
                                        :page-size="pageInfo.pageSize"
                                        :total="pageInfo.total"
                                        class="pagination"
                                >
                                </el-pagination>
                            </div>
                            <div class="textEditor">
                                <quill-editor
                                        v-model="replyContent.discussContent"
                                        :options="editorOption"
                                        id="box1">
                                </quill-editor>
                                <el-button type="primary" style="margin-top: 10px" @click="replyRecord">发帖</el-button>
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
    import {HOST,Discussion_HOST} from "../../common/js/config";
    import {convertDate} from "../../common/js/dateformat";
    import {getUser} from "../../common/js/cache";

    export default {
        name: "DiscussionDetail",
        components:{
            Top
        },
        data(){
            return{
                path:'',
                user:{

                },
                img: require('./no.png'),
                loading: false, //正在加载,
                currPageObject:{
                    currPage: 1
                },
                pageInfo: {},//讨论记录分页数据单
                discussionDetail:{
                    discussionId:0,
                },
                replyContent:{
                    userId:'',
                    discussionId:'',
                    discussRecordId:'',
                    replyRecordId:'',
                    userName:'',
                    storeyId:'',
                    discussContent:''
                },//回帖
                editorOption:{
                    theme:'snow',
                    placeholder:'请输入正文'
                },//富文本编辑框默认主题
            }
        },
        created() {
            this.path=HOST
            this.discussionDetail.discussionId=this.$route.params.id
            this.user=getUser()
            this.getData()
        },
        methods:{
            getData(){
                this.loading = true;
                this.pageInfo={}
                let url=`${Discussion_HOST}/discussion/open/${this.discussionDetail.discussionId}`
                this.$ajax.post(url,this.currPageObject).then(res=>{
                    this.discussionDetail = res.data
                    this.pageInfo=res.data.recordList
                    //console.log(this.currPageObject.currPage)
                    //console.log(this.discussionDetail)
                    this.loading = false;
                })
            },
            //分页跳转
            handleCurrentChange(page){
                this.currPageObject.currPage = page
                this.getData()
            },
            //日期格式化
            convertDate(time){
                return convertDate(time)
            },
            handleRecord(){
                //回帖，回复主楼
                this.replyContent.replyRecordId=null
                document.getElementById('box1').scrollIntoView();
            },
            handleRecordBack(id){
                //回复，回复某一支楼
                this.replyContent.replyRecordId=id
                //锚点跳转到指定位置
                document.getElementById('box1').scrollIntoView();
            },
            replyRecord(){
                //确认发帖
                //console.log(this.replyContent)
                if(this.replyContent.discussRecordId!==null&&this.replyContent.discussRecordId!==''){
                    //当前用户编辑自己发的某贴
                    let url=`${Discussion_HOST}/discussRecord/updateRecord`
                    this.$ajax.post(url,this.replyContent).then(res=>{
                        if(res.data!==null){
                            this.replyContent={}
                            this.replyContent.discussRecordId=''
                            this.getData()
                            this.$message({
                                message: '编辑成功',
                                type: 'success'
                            })
                        }
                    })
                }else{
                    //当前用户新发一帖
                    this.replyContent.userId=this.user.userId
                    this.replyContent.discussionId=this.discussionDetail.discussionId
                    this.replyContent.userName=this.user.userName
                    this.replyContent.storeyId=this.discussionDetail.recordNum+1
                    let url=`${Discussion_HOST}/discussRecord/addRecord`
                    this.$ajax.post(url,this.replyContent).then(res=>{
                        if(res.data!==null){
                            this.replyContent={}
                            this.replyContent.discussRecordId=''
                            this.getData()
                            this.$message({
                                message: '发帖成功',
                                type: 'success'
                            })
                        }
                    })
                }
            },
            handleRecordUpdate(discussRecord){
                //当前用户编辑自己发的某楼层中的记录内容
                this.replyContent=discussRecord
                //锚点跳转到指定位置
                document.getElementById('box1').scrollIntoView();
            },
            handleRecordDelete(id){
                //当前用户删除自己发的某楼层中的记录内容(原楼保留，显示内容为空)
                this.$confirm('确认清空改帖内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url=`${Discussion_HOST}/discussRecord/deleteRecord/${id}`
                    this.$ajax.get(url).then((res)=>{
                        if(res.data!==null){
                            this.$message({
                                message: '删帖成功,该帖内容已清空',
                                type: 'success'
                            });
                            this.getData()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            handleDiscussionUpdate(id){
                //开设当前讨论的教师可以修改讨论内容
                this.$router.push(`/courseManage/updateDiscussion/${id}`)
            },
            toCourse(){
                this.$router.push(`/course/${this.discussionDetail.courseId}`)
            },
            toDiscussionHomepage(){
                this.$router.push("/discussionHomePage")
            },
            toPersonalHomepage(){
                this.$router.push("/personalHomepage/openSelfCourse")
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
        width: 90%;
        display: block;
        margin-left: 20px;
        border-radius: 5px;
    }
    .el-divider--horizontal{
        margin: 12px 0;
        background: 0 0;
        border-top: 1px dashed #e8eaec;
    }
    .recordList{

    }
    .pagination{
        float: right;
    }
    .textEditor{
        margin-top: 50px;
    }
</style>