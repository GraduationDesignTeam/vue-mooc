<template>
    <div>
        <div class="bread">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/personalHomepage/openSelfCourse' }">个人主页</el-breadcrumb-item>
                <el-breadcrumb-item><span style="color: #2d8cf0">讨论</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row style="margin-top: 10px">
            <el-col :span="5" v-for="(item,index) in pageInfo.list" :key="index" :offset="1" class="content">
                <el-card :body-style="{ padding: '0px' }" class="discussionCard">
                    <img v-if="item.courseInfo.photo" :src="`${path}/${item.courseInfo.photo}`" class="image" @click="handleDetail(item.discussionId)">
                    <img v-else :src="img" class="image" @click="handleDetail(item.discussionId)">

                    <div class="remark">
                        <h2 class="title" @click="handleDetail(item.discussionId)"> <i class="el-icon-s-opportunity" style="color: chartreuse;margin-top: 10px"></i> {{item.discussionName}}</h2>
                        <div class="">
                            <span class="price"  @click="handleDetail(item.discussionId)"> <i class="el-icon-s-management" style="color: #ff7a3e;margin-top: 10px"></i> {{item.courseInfo.name}}</span>
                        </div>
                        <div class="" style="margin-top: 6px">
                            <el-row :gutter="4">
                                <el-col :span="12"><div class="grid-content bg-purple">
                                    <span class="price" style="color: #9199a1"> <i class="el-icon-school" style="color: #2d8cf0;margin-top: 10px"></i> {{item.courseInfo.school}}</span>
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
</template>

<script>
    import {HOST,Discussion_HOST} from '../../common/js/config'
    import {getUser} from "../../common/js/cache";

    export default {
        name: "OpenSelfDiscussion",
        data(){
            return{
                user:{},
                img: require('./no.png'),
                path: '',
                activeIndex: '1',
                currPage: 1,
                pageInfo: {},   //查询的数据,
                loading: false, //正在加载,
            }
        },
        created(){
            this.path = HOST
            this.user=getUser()
            this.getData()
        },
        methods:{
            getData(){
                this.loading = true;
                let url = `${Discussion_HOST}/discussion/searchSelf/${this.currPage}`
                this.$ajax.post(url,this.user).then(res=>{
                    this.pageInfo = res.data
                    console.log(this.pageInfo)
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
            }
        }/*,
        filters: {
            //截取当前数据小数点后两位
            numFilter(value) {
                const realVal=parseInt(value).toFixed(2);
                return realVal;
            }
        }*/
    }
</script>

<style scoped>
    .bread{
        margin-left: 10px;
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