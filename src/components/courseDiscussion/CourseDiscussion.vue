<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="24">
                <el-col :span="6">
                    <i class="el-icon-s-opportunity" style="color: chocolate;margin-left: 40px;margin-top: 10px"></i> <strong style="font-size: 20px">讨论区</strong>
                </el-col>
                <el-col :span="6">
                </el-col>
                <el-col :span="4">
                </el-col>
                <el-col :span="8" style="float: right">
                    <div>
                        <el-input placeholder="搜索感兴趣的话题" v-model="input3" class="input-with-select">
                            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <div class="discussion-all">
            <div class="choose">
                <a @click="handleNew" class="choose1">最新</a>
                <a @click="handleHot" class="choose2">最热</a>
                <el-button v-if="user.userName===course.teacherName" type="primary" size="small" round style="float: right;margin-right: 130px" @click="newDiscussion">新建讨论</el-button>
                <!--<a @click="handleJoin" class="choose3">参与</a>-->
            </div>
            <el-row style="margin-top: 10px">
                <el-col :span="20" v-for="(item,index) in pageInfo.list" :key="index" :offset="1" class="content">
                    <el-card :body-style="{ padding: '0px' }" class="discussionCard">
                        <!--<img v-if="item.courseInfo.photo" :src="`${path}/${item.courseInfo.photo}`" class="image" @click="handleDetail(item.discussionId)">
                        <img v-else :src="img" class="image" @click="handleDetail(item.discussionId)">-->
                        <div class="remark">
                            <h2 class="title"> <i class="el-icon-s-opportunity" style="color: chartreuse;margin-top: 10px"></i> <span @click="handleDetail(item.discussionId)">{{item.discussionName}}</span>
                                <span v-if="item.recordNum>10" style="margin-left: 10px;color: red;font-size: 14px"><i class="el-icon-medal"></i>热门</span>
                                <span style="font-size: 12px;color: #9199a1;margin-left: 20px">{{item.recordNum}}回帖</span>
                                <el-button v-if="user.userName===course.teacherName" type="primary" size="small" round style="float: right" @click="updateDiscussion(item.discussionId)">修改讨论</el-button>
                            </h2>
                            <div class="">
                                <span class="price"  @click="handleDetail(item.discussionId)" style="margin-left: 20px">{{item.discussionDescription}}</span>
                            </div>
                            <div class="" style="margin-top: 6px">
                                <el-row :gutter="4">
                                    <el-col :span="12"><div class="grid-content bg-purple">
                                        <span class="price" style="color: #9199a1;margin-left: 20px"> <i class="el-icon-s-custom" style="color: #2d8cf0;margin-top: 10px"></i> {{item.teacher.userName}}</span>
                                    </div></el-col>
                                    <el-col :span="12"><div class="grid-content bg-purple">
                                        <span class="price" style="color: aquamarine;float: right">{{item.courseInfo.type}}</span>
                                    </div></el-col>
                                </el-row>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-pagination
                    v-loading="loading"
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :current-page="currPage"
                    :page-size="pageInfo.pageSize"
                    :total="pageInfo.total"
                    class="pagination"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {HOST,Discussion_HOST} from '../../common/js/config'
    import {getUser} from "../../common/js/cache";
    //import DiscussionCategory from "./DiscussionCategory";
    export default {
        name: "CourseDiscussion",
        data(){
            return{
                user:'',
                input3: '',
                discussionDetail:{
                    discussionName:'',
                    courseInfo:{
                        id:0,
                        name:''
                    }
                },
                img: require('./no.png'),
                path: '',
                activeIndex: '1',
                currPage: 1,
                pageInfo: {},   //查询的数据,
                loading: false, //正在加载,
                course: {
                    id:0
                }
            }
        },
        created(){
            this.path = HOST
            this.user=getUser()
            this.discussionDetail.courseInfo.id=this.$route.params.id
            this.course.id=this.$route.params.id
            this.getNewData()
            this.getCourse()
        },
        methods:{
            getCourse(){
                let url = `${HOST}/course/sel/${this.course.id}`;
                let param = new URLSearchParams();
                param.append('userId', this.user.userId);
                this.$ajax.post(url, param).then((res)=> {
                        this.course = res.data;
                })
            },
            handleSearch(){
                if(this.input3!==''&&this.input3!=null){
                        //按讨论名检索
                        this.discussionDetail.discussionName=this.input3
                        this.getHotData()
                }else{
                    this.handleNew()
                }
            },
            handleNew(){
                this.getNewData()
            },
            handleHot(){
                this.getHotData()
            },
            getNewData(){
                //最新
                this.pageInfo={}
                this.loading = true;
                let url=`${Discussion_HOST}/discussion/searchNew/${this.currPage}`
                this.$ajax.post(url,this.discussionDetail).then(res=>{
                    this.pageInfo = res.data
                    console.log(res.data)
                    this.discussionDetail.discussionName=''
                    this.loading = false;
                })
            },
            getHotData(){
                //最热
                this.pageInfo={}
                this.loading = true;
                let url=`${Discussion_HOST}/discussion/searchHot/${this.currPage}`
                this.$ajax.post(url,this.discussionDetail).then(res=>{
                    this.pageInfo = res.data
                    console.log(res.data)
                    this.discussionDetail.discussionName=''
                    this.loading = false;
                })
            },
            //分页跳转
            handleCurrentChange(page){
                this.currPage = page
                this.getHotData()
            },
            handleDetail(id){
                this.$router.push(`/discussionDetail/${id}`)
            },
            newDiscussion(){
                //新建讨论
                this.$router.push(`/courseManage/newDiscussion/${this.course.id}`)
            },
            updateDiscussion(id){
                this.$router.push(`/courseManage/updateDiscussion/${id}`)
            }
        }
    }
</script>

<style scoped>
    .box-card {
        width: 1000px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .el-select .el-input {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    .content {
        margin-top: 10px;
    }

    .image {
        height: 160px;
        width: 100%;
        display: block;
    }

    .remark {
        padding: 14px;
    }
    .remark .title {
        font-weight: bold;
        font-size: 18px;
        color: #666;
        white-space: nowrap;/* 不换行*/
        overflow: hidden;/* 超出不显示*/
        text-overflow:ellipsis;/* 加省略号显示*/
    }

    .remark .price {
        font-size: 14px;
        color: #9199a1;
    }

    .pagination {
        margin: 20px 0;
        text-align: center;
    }
    .discussionCard{
        border-radius: 8px;
    }
    a{
        color: darkcyan;
        text-decoration: none;
    }
    .choose{
        margin-left: 20px;
        margin-top: 20px;
    }
    .choose a{
        margin-left: 20px;
        font-size: 14px;
        color: #FFFFFF;
        padding: 4px 12px;
        line-height: 16px;
        border-radius: 12px;
        cursor: pointer;
    }
    .choose1{
        background: #2d8cf0;
    }
    .choose2{
        background: chocolate;
    }
</style>