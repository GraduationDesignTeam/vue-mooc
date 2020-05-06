<!--管理员对用户封禁状态等进行管理的界面
是管理员界面的子界面，由/administrator/manageUserProhibit跳转
BY朱翔鹏-->
<template>
    <div class="wrap">
        <div class="bread">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/administrator' }">管理员主页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item><span style="color: #2d8cf0">封禁管理</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="user_table">
            <el-form :inline="true" :model="searchform" class="query">
                <el-form-item label="用户名">
                    <el-input v-model="searchform.userName" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input v-model="searchform.major" placeholder="专业"></el-input>
                </el-form-item>

                <p></p>
                <el-form-item label="学历">
                    <el-col :span="16">
                        <el-select v-model="searchform.grade">
                            <el-option label="-空-" value=""></el-option>
                            <el-option label="小学" value="小学"></el-option>
                            <el-option label="初中" value="初中"></el-option>
                            <el-option label="高中" value="高中"></el-option>
                            <el-option label="大学" value="大学"></el-option>
                            <el-option label="研究生" value="研究生"></el-option>
                            <el-option label="博士生" value="博士生"></el-option>
                            <el-option label="博士后" value="博士后"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="慕课身份">
                    <el-col :span="16">
                        <el-select v-model="searchform.userStatus">
                            <el-option label="-空-" value=""></el-option>
                            <el-option label="学生" value="001"></el-option>
                            <el-option label="教师" value="010"></el-option>
                            <el-option label="助教" value="100"></el-option>
                            <el-option label="学生兼教师" value="011"></el-option>
                            <el-option label="学生兼助教" value="101"></el-option>
                            <el-option label="教师兼助教" value="110"></el-option>
                            <el-option label="教师兼助教兼学生" value="111"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>

                <el-form-item>
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
                        prop="userName"
                        label="用户名"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="用户身份"
                        width="140">
                    <template scope="scope">
                        <span v-if="scope.row.userStatus==='000'">管理员</span>
                        <span v-else-if="scope.row.userStatus==='001'">学生</span>
                        <span v-else-if="scope.row.userStatus==='010'">教师</span>
                        <span v-else-if="scope.row.userStatus==='100'">助教</span>
                        <span v-else-if="scope.row.userStatus==='011'">教师兼学生</span>
                        <span v-else-if="scope.row.userStatus==='101'">助教兼学生</span>
                        <span v-else-if="scope.row.userStatus==='110'">教师兼助教</span>
                        <span v-else-if="scope.row.userStatus==='111'">教师兼助教兼学生</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        label="真实姓名"
                        width="90">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="sex"
                        label="性别"
                        width="70">
                    <template scope="scope">
                        <span v-if="scope.row.sex===0">男</span>
                        <span v-else-if="scope.row.sex===1">女</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="grade"
                        label="学历"
                        width="70">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="major"
                        label="专业"
                        width="70">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="school"
                        label="学校"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="teacherState"
                        label="是否已认证教师"
                        width="140">
                    <template scope="scope">
                        <span v-if="scope.row.teacherState===0" style="color: red">未认证</span>
                        <span v-else-if="scope.row.teacherState===1" style="color: green;">已认证</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="prohibitState"
                        label="是否封禁"
                        width="160">
                    <template slot-scope="scope">
                        <span v-if="scope.row.prohibitState==1"><el-button type="success" @click="handleSwitch(scope.row)">解封</el-button></span>
                        <span v-if="scope.row.prohibitState==0"><el-button type="danger" @click="handleSwitch(scope.row)">封禁</el-button></span>
                        <!--<el-switch v-model="scope.row.prohibitState"
                                   active-color="#13ce66"
                                   inactive-color="#999"
                                   active-value=1
                                   inactive-value=0
                                   @change="handleSwitch(scope.row)"
                        >
                        </el-switch>-->
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="头像"
                        width="120">
                    <template scope="scope">
                        <el-image
                                v-if="scope.row.picture"
                                style="width: 100px; height: 100px"
                                :src="`http://localhost:8082/${scope.row.picture}`"
                                :preview-src-list="[`http://localhost:8082/${scope.row.picture}`]"
                        >
                        </el-image>
                        <!--<img v-if="scope.row.picture" :src="`http://localhost:8082/${scope.row.picture}`" class="photo"/>-->
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="registerTime"
                        label="注册日期"
                        width="180"
                        :formatter="dateFormatter"
                >
                </el-table-column>
                <el-table-column label="操作" width="80px">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleDelete(scope.row.userId)">删除</el-button>
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
    import {HOST} from '../../common/js/config'
    import {makeDate} from '../../common/js/dateformat'
    import ElOption from "element-ui/packages/select/src/option";
    export default {
        components: {ElOption},
        name: "ManageUserProhibit",
        data() {
            return {
                searchform:{
                    userName:'',
                    major:'',
                    userStatus:'',
                    grade:''
                },
                pageInfo:{

                },
                currPage:1,//当前页
                loading:false,
            }
        },
        created(){
            this.getAllUser()
        },
        methods: {
            onSearch() {
                this.getAllUser()
            },
            getAllUser(){
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
                this.getAllUser()
            },
            /*dateFormatter(row, column, cellValue){
                console.log(cellValue)
                return makeSimpleDate(cellValue)
            },*/
            handleSwitch(row){
                if(row.prohibitState==0){
                    row.prohibitState=1
                }else if(row.prohibitState==1){
                    row.prohibitState=0
                }
                let url=`${HOST}/user/update`
                this.$ajax.post(url,row).then((res)=>{
                    if(res.data.code===0){
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        })
                    }
                })
            },
            handleDelete(id){
                let url=`${HOST}/user/delete/${id}`
                this.$ajax.get(url).then((res)=>{
                    if(res.data.code===0){
                        this.currPage=1
                        this.getAllUser()
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