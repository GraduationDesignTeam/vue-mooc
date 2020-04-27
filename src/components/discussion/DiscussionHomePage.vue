<!--讨论区首页，显示当前系统内所有讨论，用户可以检索、进入讨论-->
<template>
    <div>
        <Top class="top-head"></Top>
        <!--<DiscussionCategory class="category"></DiscussionCategory>-->
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
                                <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 90px">
                                    <el-option label="讨论名" value="1"></el-option>
                                    <el-option label="课程名" value="2"></el-option>
                                    <!--<el-option label="教师名" value="3"></el-option>-->
                                </el-select>
                                <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                            </el-input>
                        </div>
                    </el-col>
                </el-row>
                <!--<el-divider content-position="right"><span style="color: darkcyan">grade</span></el-divider>
                <el-row style="">
                    <el-col :span="2">
                        <strong style="font-size: 14px;margin-left: 20px">学历 ：</strong>
                    </el-col>
                    <el-col :span="22">
                        <span style="font-size: 13px;color: darkcyan"><a href="">全部</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">小学</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">初中</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">高中</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">大专</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">本科</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">研究生</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">博士生</a></span>
                    </el-col>
                </el-row>-->
                <el-divider content-position="right"><span style="color: darkcyan">major</span></el-divider>
                <el-row style="">
                    <el-col :span="2">
                        <strong style="font-size: 14px;margin-left: 20px">专业 ：</strong>
                    </el-col>
                    <el-col :span="22">
                        <span style="font-size: 13px;color: darkcyan"><a style="color: red">全部</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleMajor('文学')">文学</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleMajor('计算机')">计算机</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleMajor('历史')">历史</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleMajor('金融')">金融</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleMajor('天文')">天文</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleMajor('新闻传播')">新闻传播</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleMajor('地理')">地理</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleMajor('物理')">物理</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleMajor('化学')">化学</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleMajor('医学')">医学</a></span>
                    </el-col>
                </el-row>
                <el-divider content-position="right"><span style="color: darkcyan">college</span></el-divider>
                <el-row style="">
                    <el-col :span="2">
                        <strong style="font-size: 14px;margin-left: 20px">院校 ：</strong>
                    </el-col>
                    <el-col :span="22">
                        <span style="font-size: 13px;color: darkcyan"><a style="color: red">全部</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleSchool('清华大学')">清华大学</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleSchool('北京大学')">北京大学</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleSchool('复旦大学')">复旦大学</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleSchool('浙江大学')">浙江大学</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleSchool('南京大学')">南京大学</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleSchool('上海交通大学')">上海交通大学</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleSchool('中国科技大学')">中国科技大学</a></span>
                        <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a @click="handleSchool('东南大学')">东南大学</a></span>
                    </el-col>
                </el-row>
            </el-card>
        </div>
        <div class="discussion-all">
            <div class="choose">
                <a @click="handleNew" class="choose1">最新</a>
                <a @click="handleHot" class="choose2">最热</a>
                <!--<a @click="handleJoin" class="choose3">参与</a>-->
            </div>
            <el-row style="margin-top: 10px">
                <el-col :span="4" v-for="(item,index) in pageInfo.list" :key="index" :offset="1" class="content">
                    <el-card :body-style="{ padding: '0px' }" class="discussionCard">
                        <img v-if="item.courseInfo.photo" :src="`${path}/${item.courseInfo.photo}`" class="image" @click="handleDetail(item.discussionId)">
                        <img v-else :src="img" class="image" @click="handleDetail(item.discussionId)">

                        <div class="remark">
                            <h2 class="title" @click="handleDetail(item.discussionId)">{{item.discussionName}}</h2>
                            <div class="">
                                <strong class="price"  @click="handleDetail(item.discussionId)">{{item.courseInfo.name}}</strong>
                            </div>
                            <div class="" style="margin-top: 6px">
                                <el-row :gutter="4">
                                    <el-col :span="12"><div class="grid-content bg-purple">
                                        <span class="price" style="color: #2d8cf0">{{item.courseInfo.school}}</span>
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
    import {HOST} from '../../common/js/config'
    import Top from '../personalTop/Top.vue'
    //import DiscussionCategory from "./DiscussionCategory";
    export default {
        name: "DiscussionHomePage",
        data(){
            return{
                input3: '',
                select: '',
                discussionDetail:{
                    discussionName:'',
                    courseInfo:{
                        name:''
                    }
                },
                img: require('./no.png'),
                path: '',
                activeIndex: '1',
                currPage: 1,
                pageInfo: {},   //查询的数据,
                loading: false, //正在加载,
            }
        },
        components:{
            Top
        },
        created(){
            this.path = HOST
            this.getNewData()
        },
        methods:{
            handleSearch(){
                if(this.input3!==''&&this.input3!=null){
                    if(this.select==="0"||this.select==="1"){
                        //按讨论名检索
                        this.discussionDetail.discussionName=this.input3
                        this.getHotData()
                    }else{
                        //按课程名检索
                        this.discussionDetail.courseInfo.name=this.input3
                        this.getHotData()
                    }
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
                let url=`${HOST}/discussion/searchNew/${this.currPage}`
                this.$ajax.post(url,this.discussionDetail).then(res=>{
                    this.pageInfo = res.data
                    console.log(res.data)
                    this.discussionDetail.discussionName=''
                    this.discussionDetail.courseInfo.name=''
                    this.loading = false;
                })
            },
            getHotData(){
                //最热
                this.pageInfo={}
                this.loading = true;
                let url=`${HOST}/discussion/searchHot/${this.currPage}`
                this.$ajax.post(url,this.discussionDetail).then(res=>{
                    this.pageInfo = res.data
                    console.log(res.data)
                    this.discussionDetail.discussionName=''
                    this.discussionDetail.courseInfo.name=''
                    this.loading = false;
                })
            },
            //分页跳转
            handleCurrentChange(page){
                this.currPage = page
                this.getData()
            },
            handleDetail(id){
                this.$router.push(`/discussionDetail/${id}`)
            },
            handleMajor(id){
                this.$router.push(`/discussionMajorCategory/${id}`)
            },
            handleSchool(id){
                this.$router.push(`/discussionSchoolCategory/${id}`)
            }
        }
    }
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 1280px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .el-select .el-input {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
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
    .choose3{
        background: #9199a1;
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
</style>