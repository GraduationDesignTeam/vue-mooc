<template>
    <div>
        <el-button type="primary" plain icon="el-icon-plus" @click="handleCourseAdd">添加考试</el-button>
        <el-table
                ref="singleTable"
                :data="pageInfo.list"
                highlight-current-row
                style="width: 100%"
                @current-change="handleCurrentChange2"
        >
            <el-table-column
                    property="id"
                    label="编号"
                    width="80">
            </el-table-column>
            <el-table-column
                    property="name"
                    label="考试名称"
                    width="150">
            </el-table-column>
            <el-table-column
                    property="startTime"
                    label="开始时间"
                    width="200"
                    :formatter="dateFormatter">
                <!--                {{convertDate(pageInfo.list.startTime)}}-->
            </el-table-column>
            <el-table-column
                    property="endTime"
                    label="结束时间"
                    width="200"
                    :formatter="dateFormatter">
                <!--                {{convertDate(pageInfo.list.endTime)}}-->

            </el-table-column>
        </el-table>
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

</template>

<script>
    import {HOST} from "../../common/js/config";
    import {getCourse, getUser} from "../../common/js/cache";
    import {convertDate, makeDate} from "../../common/js/dateformat";

    export default {
        name: "TaskInfo",
        data(){
            return{
                id:'',
                path:'',
                currPage:1,//当前页
                loading:false,
                pageInfo:{

                },
                user:{},
            }
        },
        created() {
            this.path=HOST,
                this.user=getUser(),
                this.course=getCourse(),
                this.getRecords()

        },
        methods:{
            getRecords(){
                let url = `${HOST}/coursetask/listExamAll/${this.currPage}`;
                this.loading=true
                this.$ajax.post(url,this.course).then((res)=> {
                    this.pageInfo=res.data
                    console.log(this.pageInfo.list)
                    this.loading=false
                })
            },
            handleCourseAdd(){
                let id = this.$route.params.id;
                this.$router.push('/courseManage/examAdd/'+id)
            },
            handleCurrentChange(val){
                this.currPage=val
                this.getRecords()
            },
            convertDate(time){
                return convertDate(time)
            },
            //日期格式化
            dateFormatter(row, column, cellValue){
                return makeDate(cellValue)
            },
            handleCurrentChange2(val){
                this.$router.push('/courseManage/examList/'+val.id)
            },

        }
    }
</script>

<style scoped>

</style>