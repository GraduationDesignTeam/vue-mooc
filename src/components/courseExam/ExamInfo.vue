<template>
    <div>
    <el-button type="primary" plain icon="el-icon-plus" @click="handleCourseAdd">添加考试</el-button>
        <el-table
                ref="singleTable"
                :data="pageInfo.list"
                highlight-current-row
                style="width: 100%">
            <el-table-column
                    property="name"
                    label="考试名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    property="startTime"
                    label="开始时间"
                    width="120">
                <!--                {{convertDate(pageInfo.list.startTime)}}-->
            </el-table-column>
            <el-table-column
                    property="endTime"
                    label="结束时间">
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
    import {convertDate} from "../../common/js/dateformat";

    export default {
        name: "TaskInfo",
        data(){
            return{

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
                    console.log(this.pageInfo)
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
        }
    }
</script>

<style scoped>

</style>