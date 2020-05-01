<template>
    <div>
        <div>
            <div style="position: relative; height: 60px;">
                <p class="pull-left title">公告</p>
                <div class="pull-right title-button">
                    <el-button v-if="!isEdit" type="primary" icon="el-icon-plus" @click="isEdit=true">发布公告</el-button>
                    <el-button v-else type="primary" @click="isEdit=false">取消</el-button>
                </div>
                <div style="clear: both"></div>
            </div>
        </div>
        <NewCourseNotice v-if="isEdit"></NewCourseNotice>
        <el-divider></el-divider>
        <div style="margin-right: 30px" v-for="notice in noticeList" :key="notice.id">
            <div v-html="notice.content"></div>
            <div class="user" v-if="notice.name">{{notice.name}}</div>
            <div class="user" v-else>{{notice.username}}</div>
            <div class="time">{{convertDate(notice.createTime)}}</div>
            <!--仅允许教师、发布者本人删除公告-->
            <el-button v-if="role===1||userId===notice.userId" class="delete-button" @click="del(notice.id)" type="primary">删除</el-button>
            <div style="clear: both"></div>
            <el-divider></el-divider>
        </div>
        <el-pagination
                v-loading="loading"
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-size="pageInfo.pageSize"
                :total="pageInfo.total"
                class="pagination"
        >
        </el-pagination>
    </div>
</template>

<script>
    import NewCourseNotice from "./NewCourseNotice";
    import {getCourse, getUser} from "../../common/js/cache";
    import {HOST} from "../../common/js/config";
    import {makeDate} from "../../common/js/dateformat"; //引入编辑器
    export default {
        name: 'App',
        components: {NewCourseNotice},
        data(){
            return {
                isEdit: false,
                loading: false, //正在加载,
                role: 0,
                userId: 0,
                noticeList: [
                    {id:1, userId:1, content:'<h1>公告测试</h1><p>公告内容1</p>', createTime:'2020-03-12 10:00:00', username:'zs', name:'张三'}
                ],
                currPage: 1,
                pageInfo: {pageSize: 6, total:1}
            }
        },
        created() {
            this.userId = getUser().userId;
            this.role = getCourse().role;
            this.loadData();
        },
        methods: {
            loadData(){
                this.loading = true;
                let url = `${HOST}/course_notice/list/${this.currPage}`;
                let param = new URLSearchParams();
                param.append('courseId', getCourse().id);
                this.$ajax.post(url, param, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res)=> {
                        console.log(res.data)
                        this.pageInfo = res.data;
                        this.noticeList = res.data.list;
                        this.loading = false;
                })
            },
            //分页跳转
            handleCurrentChange(page){
                this.currPage = page;
                this.loadData()
            },
            del(id){
                const _this = this;
                this.$confirm('确定要删除这个公告？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url = `${HOST}/course_notice/del/${id}`;
                    _this.$ajax.get(url).then((res)=> {
                        let result = res.data;
                        if(result.code===0){
                            _this.$message({
                                message:'删除成功！',
                                type: 'success'
                            });
                            _this.loadData();
                        }else {
                            _this.$message.error(result.msg);
                        }
                    })
                }).catch(() => {});
            },
            convertDate(date){
                return makeDate(date);
            }
        }
    }
</script>

<style>
    @import '../../common/style/font.css';
    .pull-left{
        float:left;
    }
    .title{
        font-size: 24px;
    }
    .title-button{
        line-height: 80px;
        margin-right: 30px;
    }
    .pull-right{
        float:right;
    }
    .user, .time{
        color: #aaa;
        text-align: right;
        font-size: 14px;
        margin: 4px 0;
    }
    .delete-button{
        float: right;
        margin-top: 20px;
        margin-right: 10px;
    }
</style>