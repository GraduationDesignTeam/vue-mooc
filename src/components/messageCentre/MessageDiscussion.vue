<template>
    <div>
        <el-table
                v-loading="loading"
                border
                :data="pageInfo.list"
                style="width: 100%"
                class="content"
                @current-change="handleCurrentChange2">
            <el-table-column
                    label="讨论区"
                    prop="discussionId"
                    width="150"
                    >
            </el-table-column>
            <el-table-column
                    label="回复人"
                    prop="senderName"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="讨论回复内容"
                    prop="informationContent"
                    width="350">
            </el-table-column>
            <el-table-column
                    label="时间"
                    width="250"
                    prop="sendTime"
                    :formatter="dateFormatter">
            </el-table-column>
            <el-table-column
                    width="118"
                    >
                <template scope="scope">
                    <el-button type="small" @click="toDiscussion(scope.row.discussionId)">进入讨论区</el-button>
                </template>
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
    import {getUser} from "../../common/js/cache";
    import {makeDate} from "../../common/js/dateformat";

    export default {
        data(){
            return{

                path:'',
                currPage:1,//当前页
                loading:false,
                pageInfo:{

                },
                user:{},
                changeForm:{
                    UserId:'',
                    TargetId:''
                },
                userInfo:{}
            }
        },
        created() {
            this.path=HOST,
                this.user=getUser(),
                this.getRecords()

        },
        methods:{
            getRecords(){
                console.log(this.user)
                this.loading=true
                this.user=getUser()
                let url=`${HOST}/information/querydiscussion/${this.currPage}`
                this.$ajax.post(url,this.user).then((res)=>{
                    this.pageInfo=res.data
                    //console.log(this.pageInfo)
                    this.loading=false
                })

            },
            handleCurrentChange(val){
                this.currPage=val
                this.getRecords()
            },
<<<<<<< HEAD
            toDiscussion(id){
                this.$router.push(`/discussionDetail/${id}`)
=======
            handleCurrentChange2(val){
                this.$router.push('/'+val)
            },
            convertDate(time){
                return convertDate(time)
>>>>>>> 56bd5f93248b83fe465f8b92e048379ae7c6b756
            },
            //日期格式化
            dateFormatter(row, column, cellValue){
                return makeDate(cellValue)
            }
        }
    }
</script>

<style scoped>

</style>