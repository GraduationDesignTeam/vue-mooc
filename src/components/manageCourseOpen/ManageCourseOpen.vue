<!--管理员开课审核模块
By朱翔鹏
未通过审核的课程默认是封禁状态，通过审核的课程解封-->
<template>
    <div class="wrap">
        <div class="bread">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/administrator' }">管理员主页</el-breadcrumb-item>
                <el-breadcrumb-item>课程管理</el-breadcrumb-item>
                <el-breadcrumb-item><span style="color: #2d8cf0">开课审核</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="stateCard">
            <el-card v-for="(item,index) in pageInfo.list" :key="index" class="box-card">
                <div slot="header" class="clearfix">
                    <span>{{item.name}}</span>
                    <el-button style="float: right" type="primary" size="mini" @click="accessState(item)">通过申请</el-button>
                </div>
                <el-row>
                    <el-col :span="6">
                        <template>
                            <img v-if="item.picture" :src="`${path}/${item.picture}`" />
                            <img v-else :src="img" class="image" style="width: 100px;height: 100px">
                        </template>
                    </el-col>
                    <el-col :span="18">
                        <template>
                            <span style="font-size: 13px;color: darkcyan">{{item.detail}}</span>
                        </template>
                    </el-col>
                </el-row>
                <p>
                    <el-row :gutter="20">
                        <el-col :span="8"><div class="grid-content bg-purple">
                            <span style="font-size: 80%;color: darkcyan">权限：</span>
                            <template>
                                <span v-if="item.courseAuthority===0">该校学生可选</span>
                                <span v-else-if="item.courseAuthority===1">所有人可选</span>
                            </template>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple">
                            <span style="font-size: 80%;color: darkcyan">类别：</span>
                            {{item.type}}
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple">
                            <span style="font-size: 80%;color: darkcyan;margin-right: 3px">开课时间: </span>
                            <span>{{item.openTime | formatDate}}</span>
                        </div></el-col>
                    </el-row>
                </p>
                <p>
                    <el-row :gutter="20">
                        <el-col :span="8"><div class="grid-content bg-purple">
                            <span style="font-size: 80%;color: darkcyan;margin-right: 3px">开课教师编号: </span>
                            {{item.teacherId}}
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple">
                            <span style="font-size: 80%;color: darkcyan;margin-right: 3px">开课教师姓名: </span>
                            {{item.teacherName}}
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple">
                            <span style="font-size: 80%;color: darkcyan;margin-right: 3px">结课时间: </span>
                            <span>{{item.closeTime | formatDate}}</span>
                        </div></el-col>
                    </el-row>
                </p>
            </el-card>
            <!--分页-->
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="pageInfo.pageSize"
                    :current-page="currPage"
                    @current-change="handleCurrentChange"
                    :total="pageInfo.total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {HOST} from "../../common/js/config";
    import {makeSimpleDate} from "../../common/js/dateformat";

    export default {
        name: "ManageCourseOpen",
        data(){
            return{
                img: require('./no.png'),
                path:'',
                currPage:1,//当前页
                loading:false,
                pageInfo:{

                },
                searchform: {
                    checkState:0,
                },
            }
        },
        created() {
            this.path=HOST
            this.getRecords()
        },
        methods:{
            getRecords(){
                this.loading=true
                let url=`${HOST}/course/list/${this.currPage}`
                this.$ajax.post(url,this.searchform).then((res)=>{
                    this.pageInfo=res.data
                    console.log(this.pageInfo)
                    this.loading=false
                })
            },
            //val:跳转到哪一页
            handleCurrentChange(val){
                this.currPage=val
                this.getRecords()
            },
            accessState(item){
                item.checkState=1
                let url=`${HOST}/course/update`
                this.$confirm('确认通过该课程的开课申请?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.post(url,item).then((res)=>{
                        if(res.data.code===0){
                            this.$message({
                                message: '已通过该课程的开课申请',
                                type: 'success'
                            });
                            this.getRecords()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        },
        filters: {
            formatDate(time) {
                let date = new Date(time)
                return makeSimpleDate(date)
            }
        }
    }
</script>

<style scoped>
    .wrap {
        margin: 10px 0 0 10px;
    }
    .bread{
        margin-top: 10px;
    }
    .stateCard{
        margin: 20px 10px 10px 10px;
    }
    .box-card{
        margin: 20px 20px 20px 0;
        width: 600px;
    }
</style>