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

                    label="时间"
                    width="250"
                    prop="sendTime"
                    :formatter="dateFormatter">
            </el-table-column>
            <el-table-column

                    label="收信人"
                    prop="addresserName"
                    width="100">
            </el-table-column>
            <el-table-column
                    label="消息内容"
                    prop="informationContent"
                    width="150">
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
    import {convertDate, makeDate} from "../../common/js/dateformat";

    export default {
        name: "MessageSend",
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
                let url=`${HOST}/information/querybysender/${this.currPage}`
                this.$ajax.post(url,this.user).then((res)=>{
                    this.pageInfo=res.data
                    console.log(this.pageInfo)
                    this.loading=false
                })

            },
            handleCurrentChange(val){
                this.currPage=val
                this.getRecords()
            },
            convertDate(time){
                return convertDate(time)
            },
            handleCurrentChange2(val){
                this.$router.push('/courseManage/personalChat/'+val.addresserId)
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