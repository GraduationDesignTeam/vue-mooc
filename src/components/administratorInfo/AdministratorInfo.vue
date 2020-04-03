<!--管理员个人信息设置页
由于管理员身份特殊，所有可以修改的信息有限制
BY朱翔鹏-->
<template>
    <div>
        <div class="bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/administrator' }">管理员主页</el-breadcrumb-item>
                <el-breadcrumb-item>个人设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="user_form">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="用户名" prop="userName">
                    <el-col :span="12">
                        <span>{{form.userName}}</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="密码" prop="userPassword">
                    <el-col :span="12">
                        <el-input v-model="form.userPassword"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="sex1">
                        <el-radio label="0">男</el-radio>
                        <el-radio label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="电话">
                    <el-col :span="12">
                        <el-input v-model="form.phone"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-col :span="12">
                        <el-input v-model="form.name"></el-input>
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
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {getUser, saveUser} from "../../common/js/cache";
    import {HOST} from '../../common/js/config'

    export default {
        name: "AdministratorInfo",
        data() {
            return {
                path: '',
                imageUrl: '',
                form: {
                    userName: '',     //用户名
                    userPassword: '',      //密码
                    picture: '',    //头像
                    sex: 0,   //性别
                    phone: '',    //电话
                    name: '',    //真实姓名
                },
                user: {},
                changeForm: {
                    userId: '',
                    targetId: ''
                },
                sex1: '0',
                rules: {
                    userPassword: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ]
                }
            }
        },
        created() {
            this.path = HOST
            this.form = getUser()
            this.user = getUser()
            if (this.form.sex === 1) {
                this.sex1 = '1'
            }
        },
        methods: {
            submitForm(formName) {
                if (this.sex1 === '0') {
                    this.form.sex = 0
                } else {
                    this.form.sex = 1
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url = `${HOST}/user/update`
                        this.$ajax.post(url, this.form).then((res) => {
                            if (res.data.code === 0) {
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
            changeUser() {
                let url = `${HOST}/user/checkInfo`
                this.changeForm.userId = this.user.userId
                this.changeForm.targetId = this.user.userId
                this.$ajax.post(url, this.changeForm).then((res) => {
                    if (res.data.code === 0) {
                        this.user = res.data.userInfo
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