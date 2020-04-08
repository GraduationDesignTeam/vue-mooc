<template>
    <div class="wrap">
        <div class="bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/administrator' }">管理员主页</el-breadcrumb-item>
                <el-breadcrumb-item>课程管理</el-breadcrumb-item>
                <el-breadcrumb-item>封禁管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="user_table">
            <el-form :inline="true" :model="searchform" class="query">
                <el-form-item label="课程名">
                    <el-input v-model="searchform.name" placeholder="课程名"></el-input>
                </el-form-item>
                <el-form-item label="种类">
                    <el-input v-model="searchform.type" placeholder="种类"></el-input>
                </el-form-item>
                <el-form-item label="教师名">
                    <el-input v-model="searchform.teacherName" placeholder="教师名"></el-input>
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
                        prop="name"
                        label="课程名"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="type"
                        label="种类"
                        width="90">
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
                        prop="teacherName"
                        label="开课教师"
                        width="70">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="openTime"
                        label="开课时间"
                        width="100"
                        :formatter="dateFormatter">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="closeTime"
                        label="结课时间"
                        width="100"
                        :formatter="dateFormatter">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="courseState"
                        label="课程状态"
                        width="140">
                    <template scope="scope">
                        <span v-if="scope.row.courseState===0" style="color: red">未开课</span>
                        <span v-else-if="scope.row.courseState===1" style="color: green;">已开课</span>
                        <span v-else-if="scope.row.courseState===2" style="color: green;">已结课</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="CourseState"
                        label="课程权限"
                        width="140">
                    <template scope="scope">
                        <span v-if="scope.row.courseAuthority===0" style="color: green">所有人可选</span>
                        <span v-else-if="scope.row.courseAuthority===1" style="color: green;">该学校学生可选</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="checkState"
                        label="是否封禁"
                        width="80">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.checkState"
                                   active-color="#13ce66"
                                   inactive-color="#999"
                                   active-value="1"
                                   inactive-value="0"
                                   @change="handleSwitch(scope.row)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="封面"
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
    import {HOST} from '../../common/js/config'
    import {makeDate} from '../../common/js/dateformat'
    //import ElOption from "element-ui/packages/select/src/option";
    export default {
        name: "ManageCourseProhibit",
        data() {
            return {
                searchform:{
                    name:'',
                    type:'',
                    teacherName:'',
                },
                pageInfo:{

                },
                currPage:1,//当前页
                loading:false,
            }
        },
        created(){
            this.getAllCourse()
        },
        methods: {
            onSearch() {
                this.getAllCourse()
            },
            getAllCourse(){
                this.loading=true
                let url=`${HOST}/course/list/${this.currPage}`
                this.$ajax.post(url,this.searchform).then((res)=>{
                    this.pageInfo=res.data
                    //console.log(this.pageInfo)
                    this.loading=false
                })
            },
            //val:跳转到哪一页
            handleCurrentChange(val){
                this.currPage=val
                this.getAllCourse()
            },
            /*dateFormatter(row, column, cellValue){
                console.log(cellValue)
                return makeSimpleDate(cellValue)
            },*/
            handleSwitch(row){
                let url=`${HOST}/course/update`
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
                let url=`${HOST}/course/delete/${id}`
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