<!--讨论区首页，显示当前系统内所有讨论，用户可以检索、进入讨论-->
<template>
    <div>
        <Top class="top-head"></Top>
        <DiscussionCategory class="category"></DiscussionCategory>
        <div class="discussion-all">
            <div class="choose">
                <a @click="handleNew" class="choose1">最新</a>
                <a @click="handleHot" class="choose2">最热</a>
                <a @click="handleJoin" class="choose3">参与</a>
            </div>
            <el-row style="margin-top: 10px">
                <el-col :span="4" v-for="(item,index) in pageInfo.list" :key="index" :offset="1" class="content">
                    <el-card :body-style="{ padding: '0px' }" class="discussionCard">
                        <img v-if="item.picture" :src="`${path}/${item.picture}`" class="image" @click="handleDetail(item.id)">
                        <img v-else :src="img" class="image" @click="handleDetail(item.id)">

                        <div class="remark">
                            <h2 class="title" @click="handleDetail(item.id)">{{item.discussionName}}</h2>
                            <div class="">
                                <strong class="price"  @click="handleDetail(item.id)">{{item.courseInfo.name}}</strong>
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
    import DiscussionCategory from "./DiscussionCategory";
    export default {
        name: "DiscussionHomePage",
        data(){
            return{
                searchform:{
                    //discussionName:'',
                    /*courseName:'',
                    teacherName:'',*/
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
            Top,
            DiscussionCategory
        },
        created(){
            this.path = HOST
            this.getData()
        },
        methods:{
            handleNew(){

            },
            handleHot(){

            },
            handleJoin(){

            },
            getData(){
                this.loading = true;
                let url=`${HOST}/discussion/search/${this.currPage}`
                this.$ajax.post(url,this.searchform).then(res=>{
                    this.pageInfo = res.data
                    //console.log(this.pageInfo)
                    this.loading = false;
                })
            },
            //分页跳转
            handleCurrentChange(page){
                this.currPage = page
                this.getData()
            },
            handleDetail(id){
                console.log(id)
            }
        }
    }
</script>

<style scoped>
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
    font-size: 16px;
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