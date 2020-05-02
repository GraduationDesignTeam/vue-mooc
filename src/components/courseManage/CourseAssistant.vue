<template>
    <div>
        <div>
            <div style="position: relative; height: 60px;">
                <p class="pull-left title">助教</p>
                <div class="pull-right title-button">
                    <el-button type="primary" icon="el-icon-plus" @click="showModal=true" :disabled="!isTeacher">邀请助教</el-button>
                </div>
                <div style="clear: both"></div>
            </div>
        </div>
        <el-divider></el-divider>
        <SearchUserModal :show.sync="showModal" :mode="mode"></SearchUserModal>
        <el-table
                v-loading="loading"
                :data="assistantList"
                border
                style="width: 100%">
            <el-table-column
                    align="center"
                    label="序号"
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="userName"
                    label="用户名"
                    width="120">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="头像"
                    width="120">
                <template slot-scope="scope">
                    <el-avatar :src="`${path}/${scope.row.picture}`" :size="80"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="school"
                    label="学校"
                    width="120">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="major"
                    label="专业"
                    width="180">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="grade"
                    label="学历"
                    width="120">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" plain
                               @click="handleMessage(scope.row.userId)">发送私信</el-button>
                    <el-button size="mini" type="danger" plain  :disabled="!isTeacher"
                               @click="handleDelete(scope.row.userId)" >移除助教</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getCourse, getUser} from "../../common/js/cache";
    import {HOST} from "../../common/js/config";
    import SearchUserModal from "./SearchUserModal";

    export default {
        name: "CourseAssistant",
        components: {SearchUserModal},
        data(){
            return{
                isTeacher: false,
                loading: false,
                assistantList:[],
                showModal: false,
                mode: 1
            }
        },
        created(){
            this.path = HOST;
            this.loadData();
            this.isTeacher = (getCourse().role===1);
        },
        methods:{
            loadData(){
                this.loading = true;
                let url = `${HOST}/course_manage/get_assistant/${getCourse().id}`;
                this.$ajax.get(url).then((res)=> {
                    this.assistantList = res.data;
                    this.loading = false;
                })
            },
            handleMessage(userId){
                console.log(userId)
            },
            handleDelete(userId){
                const _this = this;
                this.$confirm('确定要移除助教？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(userId === getUser().userId){
                        _this.$message.error("无法移除自身！");
                        return
                    }
                    let url = `${HOST}/course_manage/remove_assistant`;
                    let param = new URLSearchParams();
                    param.append('courseId', getCourse().id);
                    param.append('assistantId', userId);
                    _this.$ajax.post(url, param, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res)=> {
                        let result = res.data;
                        if(result.code===0){
                            _this.$message({message:'操作成功！', type: 'success'});
                            _this.loadData();
                        }else {
                            _this.$message.error(result.msg);
                        }
                    })
                }).catch(() => {});
            }
        }
    }
</script>

<style scoped>
    .pull-left{
        float:left;
    }
    .pull-right{
        float:right;
    }
    .title{
        font-size: 24px;
    }
    .title-button{
        line-height: 80px;
        margin-right: 30px;
    }

    .el-table th.gutter{
        display: table-cell!important;
    }
</style>