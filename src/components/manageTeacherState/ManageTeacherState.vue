<!--管理员教师认证功能页面
BY朱翔鹏-->
<template>
    <div class="wrap">
        <div class="bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/administrator' }">管理员主页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>教师认证</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="stateCard">
            <el-card v-for="(item,index) in pageInfo.list" :key="index" class="box-card">
                <div slot="header" class="clearfix">
                    <span>{{item.userName}}</span>
                    <el-button style="float: right" type="primary" size="mini" @click="accessState(item)">通过认证</el-button>
                </div>
                <p>
                    <el-row :gutter="20">
                        <el-col :span="8"><div class="grid-content bg-purple">
                            <span style="font-size: 80%;color: darkcyan">性别：</span>
                            <template>
                                <span v-if="item.sex===0">男</span>
                                <span v-else-if="item.sex===1">女</span>
                            </template>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple">
                            <span style="font-size: 80%;color: darkcyan">学校：</span>
                            {{item.school}}
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple">
                            <span style="font-size: 80%;color: darkcyan;margin-right: 3px">电话号码: </span>
                            {{item.phone}}
                        </div></el-col>
                    </el-row>
                </p>
                <p>
                    <el-row :gutter="20">
                        <el-col :span="8"><div class="grid-content bg-purple">
                            <span style="font-size: 80%;color: darkcyan;margin-right: 3px">学历: </span>
                            {{item.grade}}
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple">
                            <span style="font-size: 80%;color: darkcyan;margin-right: 3px">专业: </span>
                            {{item.major}}
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple">
                            <span style="font-size: 80%;color: darkcyan;margin-right: 3px">真实姓名: </span>
                            {{item.name}}
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
    //import {saveUser} from "../../common/js/cache";

    export default {
        name: "ManageTeacherState",
        data(){
            return{
                currPage:1,//当前页
                loading:false,
                pageInfo:{

                },
                searchform: {
                    teacherState:0,
                },
            }
        },
        created() {
            this.getRecords()
        },
        methods:{
            getRecords(){
                this.loading=true
                let url=`${HOST}/user/queryAll/${this.currPage}`
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
                item.teacherState=1
                let url=`${HOST}/user/update`
                this.$confirm('确认通过该用户的教师认证?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.post(url,item).then((res)=>{
                        if(res.data.code===0){
                            this.$message({
                                message: '已通过该用户的教师认证',
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