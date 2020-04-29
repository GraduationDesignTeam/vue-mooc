<template>
    <div>
    <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/personalHomepage' }">个人主页</el-breadcrumb-item>
            <el-breadcrumb-item><span style="color: #2d8cf0">选择课程</span></el-breadcrumb-item>
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
        name: "OpenSelfTask",
        components:{


        },
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
                console.log(id)
                this.$router.push(`/coursettask/${id}`)
            }
        }
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
        height: 200px;
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