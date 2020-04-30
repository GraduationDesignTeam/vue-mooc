<template>
    <div>
        <div class="bread">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: `/courseManage/courseDiscussion/${course.id}` }">课程讨论区</el-breadcrumb-item>
                <el-breadcrumb-item><span style="color: #2d8cf0">新建讨论</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="discussion_form" style="margin-top: 20px;margin-left: 10px">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="讨论名" prop="discussionName">
                    <el-col :span="12">
                        <el-input v-model="form.discussionName"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="讨论内容" prop="discussionDescription">
                    <el-col :span="12">
                        <el-input type="textarea" v-model="form.discussionDescription"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="讨论时间">
                    <el-col :span="5">
                        <el-date-picker type="date" placeholder="开设日期" v-model="form.openDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col :span="1" style="color: darkcyan">
                        ------
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker type="date" placeholder="关闭日期" v-model="form.closeDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="所属课程">
                    <el-col :span="12">
                        <span>{{course.name}}</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="开设教师">
                    <el-col :span="12">
                        <span>{{user.userName}}</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="参与权限">
                    <el-select v-model="form.discussionAuthority" placeholder="请选择参与权限">
                        <el-option label="仅选课用户可参与" value=0></el-option>
                        <el-option label="所有用户可参与" value=1></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">确认创建</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {HOST} from '../../common/js/config'
    import {getUser} from "../../common/js/cache";

    export default {
        name: "NewDiscussion",
        data(){
            return{
                path: '',
                form: {
                    discussionName: '',     //讨论名
                    discussionDescription: '',      //讨论内容
                    openDate:'',      //开设时间
                    closeDate:'',    //关闭时间
                    courseId:0,   //所属课程id
                    teacherId:0,   //开设教师id
                    discussionAuthority:0,   //参与权限
                },
                user:'',
                rules: {
                    discussionName: [
                        { required: true, message: '请输入讨论名', trigger: 'blur' },
                    ],
                    discussionDescription: [
                        { required: true, message: '请输入讨论内容', trigger: 'blur' },
                    ]
                },
                course: {
                    id:'',
                    name:'',
                    teacherName:''
                }
            }
        },
        created(){
            this.course.id=this.$route.params.id
            this.path=HOST
            this.user=getUser()
            this.getCourse()
        },
        methods:{
            getCourse(){
                this.form.courseId=this.course.id
                this.form.teacherId=this.user.userId
                let url = `${HOST}/course/sel/${this.course.id}`;
                let param = new URLSearchParams();
                param.append('userId', this.user.userId);
                this.$ajax.post(url, param).then((res)=> {
                    this.course = res.data;
                    console.log(res.data)
                })
            },
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        let url=`${HOST}/discussion/create`
                        this.$ajax.post(url,this.form).then((res)=>{
                            if(res.data.code===0){
                                this.$message({
                                    message: '创建成功',
                                    type: 'success'
                                });
                                this.$router.push(`/courseManage/courseDiscussion/${this.course.id}`)
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .avatar{
        width: 100px;
        height: 100px;
    }
    .bread{
        margin-left: 10px;
        margin-bottom: 10px;
    }
</style>