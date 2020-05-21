<template>
    <div class="wrap">
        <div class="bread">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/administrator/manageUserProhibit' }">管理员主页</el-breadcrumb-item>
                <el-breadcrumb-item>讨论管理</el-breadcrumb-item>
                <el-breadcrumb-item><span style="color: #2d8cf0">封禁管理</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="user_table">
            <el-form :inline="true" :model="discussionDetail" class="query">
                <el-form-item label="讨论标题">
                    <el-input v-model="discussionDetail.discussionName" placeholder="讨论名"></el-input>
                </el-form-item>
                <el-form-item label="所属课程" style="margin-left: 10px">
                    <el-input v-model="discussionDetail.courseInfo.name" placeholder="课程名"></el-input>
                </el-form-item>
                <p></p>
                <el-form-item label="所属专业">
                    <el-input v-model="discussionDetail.courseInfo.type" placeholder="专业"></el-input>
                </el-form-item>
                <el-form-item label="开设学校" style="margin-left: 10px">
                    <el-input v-model="discussionDetail.courseInfo.school" placeholder="开设学校"></el-input>
                </el-form-item>
               <!-- <el-form-item label="所属课程">
                    <el-input v-model="searchform.courseName" placeholder="讨论名"></el-input>
                </el-form-item>
                <el-form-item label="开设教师">
                    <el-input v-model="searchform.teacherName" placeholder="讨论名"></el-input>
                </el-form-item>-->

                <el-form-item style="margin-left: 10px">
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table
                    v-loading="loading"
                    :data="pageInfo.list"
                    border
                    stripe
                    style="width: 100%">
                <el-table-column
                        align="center"
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="discussionName"
                        label="讨论标题"
                        width="150">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="courseInfo.name"
                        label="所属课程"
                        width="150">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="teacher.userName"
                        label="开设教师"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="courseInfo.school"
                        label="学校"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="assistantId"
                        label="助教编号"
                        width="100">
                </el-table-column>
                <!--<el-table-column
                        align="center"
                        prop="sex"
                        label="性别"
                        width="70">
                    <template scope="scope">
                        <span v-if="scope.row.sex===0">男</span>
                        <span v-else-if="scope.row.sex===1">女</span>
                    </template>
                </el-table-column>-->
                <el-table-column
                        align="center"
                        prop="openDate"
                        label="开设时间"
                        width="100"
                        :formatter="dateFormatter">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="closeDate"
                        label="结束时间"
                        width="100"
                        :formatter="dateFormatter">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="discussionDescription"
                        label="讨论区描述"
                        width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="discussionAuthority"
                        label="课程权限"
                        width="140">
                    <template scope="scope">
                        <span v-if="scope.row.discussionAuthority===0" style="color: green">仅改课学生可参与</span>
                        <span v-else-if="scope.row.discussionAuthority===1" style="color: green;">所有学生可参与</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="discussionState"
                        label="讨论状态"
                        width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.discussionState==0"><el-button type="success" @click="handleSwitch(scope.row)">解封</el-button></span>
                        <span v-if="scope.row.discussionState==1"><el-button type="danger" @click="handleSwitch(scope.row)">封禁</el-button></span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80px">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
    import {Discussion_HOST} from '../../common/js/config'
    import {makeDate} from '../../common/js/dateformat'
    //import ElOption from "element-ui/packages/select/src/option";
    export default {
        name: "ManageDiscussionProhibit",
        data() {
            return {
                discussionDetail:{
                    discussionName:'',
                    courseInfo:{
                        name:'',
                        type:'',
                        school:''
                    }
                },
                pageInfo:{

                },
                currPage:1,//当前页
                loading:false,
            }
        },
        created(){
            this.getAllDiscussion()
        },
        methods: {
            onSearch() {
                this.getAllDiscussion()
            },
            getAllDiscussion(){
                this.loading=true
                let url=`${Discussion_HOST}/discussion/searchNew/${this.currPage}`
                this.$ajax.post(url,this.discussionDetail).then((res)=>{
                    this.pageInfo=res.data
                    //console.log(this.pageInfo)
                    this.loading=false
                })
            },
            //val:跳转到哪一页
            handleCurrentChange(val){
                this.currPage=val
                this.getAllDiscussion()
            },
            /*dateFormatter(row, column, cellValue){
                console.log(cellValue)
                return makeSimpleDate(cellValue)
            },*/
            handleSwitch(row){
                if(row.discussionState==0){
                    row.discussionState=1
                }else if(row.discussionState==1){
                    row.discussionState=0
                }
                let url=`${Discussion_HOST}/discussion/update`
                this.$ajax.post(url,row).then((res)=>{
                    if(res.data!==null){
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        })
                    }
                })
            },
            handleDelete(id){
                let url=`${Discussion_HOST}/discussion/delete/${id}`
                this.$ajax.get(url).then((res)=>{
                    if(res.data.code===0){
                        this.currPage=1
                        this.getAllCourse()
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                    }
                })
            },
            //日期格式化
            dateFormatter(row, column, cellValue){
                return makeDate(cellValue)
            }
        }
    }
</script>

<style scoped>
    .bread{
        margin-top: 10px;
    }
    .book_table{
        margin: 20px 10px 10px 10px;
    }
    .photo{
        width: 80px;
        height: 80px;
    }
    .wrap {
        margin: 10px 0 0 10px;
    }

    .wrap .query {
        margin-top: 20px;
    }

    .wrap .photo {
        cursor: pointer;
    }

    .wrap .photo:hover {
        transition: all 0.6s;
        transform: scale(2);  /*以y轴为中心旋转*/
    }
</style>