<template>
    <div>
        <el-table
                v-loading="loading"
                border
                :data="pageInfo.list"
                style="width: 100%"
                class="content">
            <el-table-column

                    label="时间"
                    width="250"
                    prop="sendTime">
            </el-table-column>
            <el-table-column

                    label="发送人"
                    prop="senderId"
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
    export default {
        name: "MessageMenu",
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
            this.getRecords()

        },
        methods:{
            getRecords(){
                console.log(this.user)
                this.loading=true
                let url=`${HOST}/information/querybyaddresser/${this.currPage}`
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
        }

    }
</script>

<style scoped>
    .content {
        margin-top: 20px;
    }
</style>