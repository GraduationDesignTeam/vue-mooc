<template>
    <div>
        <el-dialog
                :title="titles[mode]"
                :visible.sync="visible"
                custom-class="customWidth"
                @close="$emit('update:show', false)"
        >
            <el-row :gutter="15">
                <el-form ref="elForm" :model="form" :rules="rules" size="medium" label-width="100px">
                    <el-col :span="8">
                        <el-form-item label="查询条件" prop="condition">
                            <el-select v-model="form.condition" placeholder="请选择查询条件" :style="{width: '100%'}">
                                <el-option v-for="(item, index) in conditionOptions" :key="index"
                                           :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item label-width="0" prop="queryInfo">
                            <el-input v-model="form.queryInfo" :placeholder="`请输入${conditionOptions[form.condition].label}进行搜索`" clearable
                                      :style="{width: '90%'}"></el-input>
                            <el-button style="float: right" icon="el-icon-search" size="medium" circle @click="queryUser"></el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <el-table
                    v-if="showResult"
                    v-loading="loading"
                    :data="userList"
                    border
                    style="width: 100%"
                    max-height="350">
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
                        <el-avatar :src="`${path}/${scope.row.picture}`" :size="70"></el-avatar>
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
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="grade"
                        label="职称"
                        width="120">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" plain
                                   @click="handleAdd(scope.row.userId)">添加到课程</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <el-pagination
                    v-if="showResult"
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :current-page="currPage"
                    :page-size="pageInfo.pageSize"
                    :total="pageInfo.total">
            </el-pagination>
        </el-dialog>
    </div>
</template>

<script>
    import {HOST} from '../../common/js/config'
    import {getCourse, getUser} from '../../common/js/cache'
    export default {
        name: 'SearchUserModal',
        props: {mode:{type:Number},show:{type:Boolean}},
        data() {
            return {
                titles:['邀请教师', '邀请助教'],
                form: {
                    condition: 0,
                    queryInfo: ''
                },
                rules: {
                    condition: [{
                        required: true,
                        message: '请选择查询条件',
                        trigger: 'change'
                    }],
                    queryInfo: [{
                        required: false,
                        message: '请输入姓名进行搜索',
                        trigger: 'blur'
                    }],
                },
                conditionOptions: [{
                    "label": "姓名",
                    "value": 0
                }, {
                    "label": "用户名",
                    "value": 1
                }],
                path: HOST,
                visible: this.show,
                showResult: false,
                loading: false,
                userList:[
                    getUser(), getUser(), getUser(), getUser(), getUser()
                ],
                currPage: 1,    //当前页,
                pageInfo: {pageSize:6, total:1},   //查询的数据,
            }
        },
        methods: {
            getData(){
                this.showResult = true;
                this.loading = true;
                let user = {};
                if(this.form.condition === 0)
                    user.name = this.form.queryInfo;
                else
                    user.userName = this.form.queryInfo;
                let url = `${HOST}/user/queryAll/${this.currPage}`;
                this.$ajax.post(url, user).then((res)=>{
                    this.pageInfo = res.data;
                    this.userList = res.data.list;
                    this.loading = false;
                    if(res.data.list.length === 0)
                        this.$message("没有找到任何符合条件的用户！");
                })
            },
            queryUser(){
                this.getData();
            },
            //分页跳转
            handleCurrentChange(page){
                this.currPage = page;
                this.getData();
            },
            handleAdd(userId){
                const _this = this;
                // 添加授课教师
                if(this.mode === 0){
                    console.log("添加教师  "+userId)
                    let url = `${HOST}/course_manage/add_teacher`;
                    let param = new URLSearchParams();
                    param.append('courseId', getCourse().id);
                    param.append('teacherId', userId);
                    this.$ajax.post(url, param, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res)=> {
                        let result = res.data;
                        if(result.code===0){
                            _this.$message({
                                message:'添加成功！',
                                type: 'success'
                            });
                            _this.$router.go(0);
                        }else {
                            _this.$message.error(result.msg);
                        }
                    })
                }else if(this.mode === 1){
                    console.log("添加助教  "+userId)
                    let url = `${HOST}/course_manage/add_assistant`;
                    let param = new URLSearchParams();
                    param.append('courseId', getCourse().id);
                    param.append('assistantId', userId);
                    this.$ajax.post(url, param, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res)=> {
                        let result = res.data;
                        if(result.code===0){
                            _this.$message({
                                message:'添加成功！',
                                type: 'success'
                            });
                            _this.$router.go(0);
                        }else {
                            _this.$message.error(result.msg);
                        }
                    })
                }
            }
        },
        watch: {
            show () {
                this.visible = this.show;
            }
        }
    }


</script>

<style>
    .el-dialog.customWidth{
        width: 1000px;
    }
</style>