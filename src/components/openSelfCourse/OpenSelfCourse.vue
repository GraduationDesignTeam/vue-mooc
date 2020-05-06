<template>
    <div>
        <div class="bread">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/personalHomepage' }">个人主页</el-breadcrumb-item>
                <el-breadcrumb-item><span style="color: #2d8cf0">课程</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row style="margin-top: 10px">
            <el-col :span="22" v-for="(item,index) in pageInfo.list" :key="index" :offset="1" class="content">
                <el-card :body-style="{ padding: '5px' }" style="background-color: #eeeeee;height: 200px">
                    <el-row :gutter="20">
                        <el-col :span="5"><div>
                            <img v-if="item.photo" :src="`${path}/${item.photo}`" class="image" @click="handleDetail(item.id)">
                            <img v-else :src="img" class="image" @click="handleDetail(item.id)">
                        </div></el-col>
                        <el-col :span="19"><div>
                            <div class="remark">
                                <h2 class="title" @click="handleDetail(item.id)">{{item.name}}</h2>
                                <div class="">
                                    <el-row>
                                        <el-col :span="12">
                                            <strong class="price">教师: {{item.teacherName}}</strong>
                                        </el-col>
                                        <el-col :span="12">
                                            <strong class="price" @click="handleDetail(item.id)"><i class="el-icon-edit"></i>最新作业: <span style="font-size: 13px;color: cornflowerblue">第二章回顾</span></strong>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div style="margin-top: 10px">
                                    <el-row>
                                        <el-col :span="12">
                                            <strong class="price"  @click="handleDetail(item.id)">上次学习: <span style="font-size: 13px;color: cornflowerblue">第一章</span></strong>
                                        </el-col>
                                        <el-col :span="12">
                                            <strong class="price" @click="handleDetail(item.id)"><i class="el-icon-s-opportunity"></i>最新讨论: <span style="font-size: 13px;color: cornflowerblue">第三章第一讲讨论题</span></strong>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div style="margin-top: 10px">
                                    <p class="price">课程进度</p>
                                    <el-progress :text-inside="true" :stroke-width="16" :percentage="20" style="width: 300px"></el-progress>
                                </div>
                            </div>
                        </div></el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <!--page-size	每页显示条目个数，支持 .sync 修饰符	number	—	10
        total	总条目数
        current-change	currentPage 改变时会触发-->
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
    import {HOST} from '../../common/js/config'
    import {getUser} from "../../common/js/cache";

    export default {
        name: "OpenSelfCourse",
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
                let url = `${HOST}/course/selfList/${this.currPage}`
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
                this.$router.push(`/course/${id}`)
                //this.$router.push(`/bookDetail/${id}`)
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
        height: 190px;
        width: 200px;
        display: block;
        float: left;
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
        color: darkcyan;
    }

    .pagination {
        margin: 20px 0;
        text-align: center;
    }
</style>