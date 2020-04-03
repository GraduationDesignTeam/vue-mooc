<template>
    <div>
        <div class="bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/personalHomepage' }">个人主页</el-breadcrumb-item>
                <el-breadcrumb-item>个人设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="user_form">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="用户名" prop="userName">
                    <el-col :span="12">
                        <el-input v-model="form.userName"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="密码" prop="userPassword">
                    <el-col :span="12">
                        <el-input v-model="form.userPassword"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="慕课身份">
                    <el-col :span="12">
                        <el-select v-model="form.userStatus">
                            <el-option label="学生" value="001"></el-option>
                            <el-option label="教师" value="010"></el-option>
                            <el-option label="助教" value="100"></el-option>
                            <el-option label="学生兼教师" value="011"></el-option>
                            <el-option label="学生兼助教" value="101"></el-option>
                            <el-option label="教师兼助教" value="110"></el-option>
                            <el-option label="教师兼助教兼学生" value="111"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="sex1">
                        <el-radio label="0">男</el-radio>
                        <el-radio label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="学校">
                    <el-col :span="12">
                        <el-input v-model="form.school"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="电话">
                    <el-col :span="12">
                        <el-input v-model="form.phone"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="学历">
                    <el-col :span="12">
                        <el-select v-model="form.grade">
                            <el-option label="无学历" value="无学历"></el-option>
                            <el-option label="小学" value="小学"></el-option>
                            <el-option label="初中" value="初中"></el-option>
                            <el-option label="高中" value="高中"></el-option>
                            <el-option label="大学" value="大学"></el-option>
                            <el-option label="研究生" value="研究生"></el-option>
                            <el-option label="博士生" value="博士生"></el-option>
                            <el-option label="博士后" value="博士后"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="专业">
                    <el-col :span="12">
                        <el-input v-model="form.major"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-col :span="12">
                        <el-input v-model="form.name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="教师认证">
                    <el-col :span="12">
                        <span>{{teacherState1}}</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="封禁状态">
                    <el-col :span="12">
                        <span>{{prohibitState1}}</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="头像">
                    <el-upload
                            class="avatar-uploader"
                            :action="`${path}/upload`"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                        <img v-if="imageUrl" :src="`${path}/${imageUrl}`" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <img v-if="!imageUrl && form.picture" :src="`${path}/${form.picture}`" class="avatar">
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">确认修改</el-button>
                    <template>
                        <el-button type="danger" @click="deleteUser">注销账户</el-button>
                    </template>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {getUser, saveUser} from "../../common/js/cache";
    import {HOST} from '../../common/js/config'

    export default {
        name: "PersonalInfo",
        data(){
            return{
                path: '',
                imageUrl: '',
                form: {
                    userName: '',     //用户名
                    userPassword: '',      //密码
                    userStatus:'',      //慕课身份
                    picture:'',    //头像
                    sex:0,   //性别
                    school:'',   //学校
                    phone:'',    //电话
                    grade:'',   //学历
                    major:'',   //专业
                    name:'',    //真实姓名
                    teacherState:'',  //教师身份认证状态
                    prohibitState:'',  //封禁状态
                },
                user:{},
                changeForm:{
                    userId:'',
                    targetId:''
                },
                teacherState1:'',
                prohibitState1:'',
                grade1:'',
                sex1:'0',
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    userPassword: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                }
            }
        },
        created(){
            this.path=HOST
            this.form=getUser()
            this.user=getUser()
            if(this.form.teacherState===1){
                this.teacherState1='已认证'
            }else{
                this.teacherState1='未认证'
            }
            if(this.form.prohibitState1===1){
                this.prohibitState1='已封禁'
            }else{
                this.prohibitState1='未封禁'
            }
            if(this.form.sex===1){
                this.sex1='1'
            }
            this.grade1=this.form.grade
        },
        methods:{
            submitForm(formName){
                if(this.sex1==='0'){
                    this.form.sex=0
                }else{
                    this.form.sex=1
                }
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        let url=`${HOST}/user/update`
                        this.$ajax.post(url,this.form).then((res)=>{
                            if(res.data.code===0){
                                this.$message({
                                    message: '修改成功,请重新登录',
                                    type: 'success'
                                });
                                this.changeUser()
                                this.$router.push("/")
                            }
                        })
                    }
                })
            },
            changeUser(){
                let url=`${HOST}/user/checkInfo`
                this.changeForm.userId=this.user.userId
                this.changeForm.targetId=this.user.userId
                this.$ajax.post(url,this.changeForm).then((res)=>{
                    if(res.data.code===0){
                        this.user=res.data.userInfo
                        saveUser(this.user)
                    }
                })
            },
            /**
             * 上传图片成功回调方法
             * @param res
             */
            handleAvatarSuccess(res) {
                console.log(res)
                this.imageUrl = res;
                this.form.picture = res
                //console.log(this.imageUrl)
            },
            deleteUser(){
                this.$confirm('此操作将永久注销该账号, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url=`${HOST}/user/delete/${this.user.userId}`
                    this.$ajax.get(url).then((res)=>{
                        if(res.data.code===0){
                            this.$message({
                                message: '注销成功,你可以注册新的账号',
                                type: 'success'
                            });
                            saveUser(null)
                            this.$router.push("/")
                        }
                    })
                    this.$message({
                        type: 'success',
                        message: '注销成功,你可以注册新的账号!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .book_form{
        margin: 20px 0 0 10px;
    }
    .avatar{
        width: 100px;
        height: 100px;
    }
    .bread{
        margin-left: 10px;
        margin-bottom: 10px;
    }
</style>