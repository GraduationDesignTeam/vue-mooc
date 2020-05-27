<template>
    <div>
        <el-row type="flex" justify="center">
            <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
                <el-col :span="20">
                    <el-form-item label="课程名称" prop="name">
                        <el-input v-model="formData.name" placeholder="请输入课程名称课程名称" :maxlength="50" clearable
                                  :style="{width: '40%'}"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="课程类型" prop="type">
                        <el-select v-model="formData.type" placeholder="请选择课程类型" clearable :style="{width: '40%'}">
                            <el-option v-for="(item, index) in typeOptions" :key="index" :label="item"
                                       :value="item" :disabled="item.disabled"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="开始时间" prop="openTime">
                        <el-date-picker v-model="formData.openTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                        :style="{width: '30%'}" placeholder="请选择开始时间" clearable></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="结束时间" prop="closeTime">
                        <el-date-picker v-model="formData.closeTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                        :style="{width: '30%'}" placeholder="请选择结束时间" clearable></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="封面图片">
                        <el-upload
                                class="avatar-uploader"
                                :action="`${path}/upload`"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess">
                            <img v-if="formData.photo" :src="`${path}/${formData.photo}`" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="课程引言" prop="intro">
                        <el-input v-model="formData.intro" type="textarea" placeholder="请输入课程引言" :maxlength="300"
                                  show-word-limit :autosize="{minRows: 2, maxRows: 4}" :style="{width: '100%'}"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="课程概述" prop="detail">
                        <el-input v-model="formData.detail" type="textarea" placeholder="请输入课程概述" :maxlength="1000"
                                  show-word-limit :autosize="{minRows: 4, maxRows: 8}" :style="{width: '100%'}"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="授课目标" prop="target">
                        <el-input v-model="formData.target" type="textarea" placeholder="请输入授课目标" :maxlength="500"
                                  show-word-limit :autosize="{minRows: 4, maxRows: 6}" :style="{width: '100%'}"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="参考资料" prop="reference">
                        <el-input v-model="formData.reference" type="textarea" placeholder="请输入课程参考资料参考资料"
                                  :maxlength="500" show-word-limit :autosize="{minRows: 4, maxRows: 6}" :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label-width="168px" label="允许非本校学生选课" prop="courseAuthority" required>
                        <el-switch v-model="formData.courseAuthority" :active-value='0' :inactive-value='1'></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item size="large">
                        <el-button type="primary" plain @click="submitForm">保存更改</el-button>
                        <el-button @click="goBack">返回</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item size="large">
                        <el-button title="课程状态将变为已结束，之后无法修改课程信息。" type="danger" plain @click="closeCourse">关闭课程</el-button>
                        <el-button title="处于进行中状态的课程无法删除！" type="danger" @click="deleteCourse" :disabled="formData.courseState === 1">删除课程</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>
</template>
<script>
    import {getCourse, getUser, saveCourse} from "../../common/js/cache";
    import {HOST} from "../../common/js/config";

    export default {
        components: {},
        props: [],
        data() {
            return {
                path: '',
                formData: {
                    name: '',
                    type: undefined,
                    openTime: '2020/06/01',
                    closeTime: '2020/12/01',
                    photo: '',
                    intro: '',
                    detail: '',
                    target: '',
                    reference: '',
                    courseAuthority: 0,
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入课程名称课程名称',
                        trigger: 'blur'
                    }],
                    type: [{
                        required: true,
                        message: '请选择课程类型',
                        trigger: 'change'
                    }],
                    openTime: [{
                        required: true,
                        message: '请选择开始时间',
                        trigger: 'change'
                    }],
                    closeTime: [{
                        required: true,
                        message: '请选择结束时间',
                        trigger: 'change'
                    }],
                    intro: [],
                    detail: [],
                    target: [],
                    reference: [],
                },
                typeOptions: ["外语","计算机","考研","四六级","经济","会计学","管理学","创新创业","电气信息","机械","力学"],
            }
        },
        mounted() {
            this.loadData();
        },
        methods: {
            loadData() {
                this.path=HOST;
                if(getUser()===null || getUser().userId===undefined){
                    const _this = this;
                    this.$message.error("用户登录信息已过期，请重新登录！");
                    setTimeout(() =>{_this.$router.push('/login')}, 3000);
                    return;
                }
                let courseId = this.$route.params.id;
                let url = `${HOST}/course/sel/${courseId}`;
                let param = new URLSearchParams();
                param.append('userId', getUser().userId);
                this.$ajax.post(url, param).then((res)=> {
                    this.formData = res.data;
                    saveCourse(res.data);
                })
            },
            /**
             * 上传图片成功回调方法
             * @param res
             */
            handleAvatarSuccess(res) {
                this.formData.photo = res;
            },
            submitForm() {
                let user = getUser();
                if(user.userId===undefined){
                    this.$message("用户登录信息已过期,请重新登录！");
                    this.$router.push('/login');
                }else if(this.formData.role !== 1){
                    this.$message("您没有权限更改当前课程信息！");
                    this.$router.push('/personalHomepage');
                }else{
                    this.$refs['elForm'].validate(valid => {
                        if(valid){
                            //发送信息
                            let url=`${HOST}/course/update`;
                            this.$ajax.post(url,this.formData).then((res)=>{
                                let result = res.data;
                                if(result.code===0){//课程更新成功
                                    this.$message({
                                        message:'课程信息更新成功！',
                                        type: 'success'
                                    });
                                }else {
                                    this.$message.error(result.msg);
                                }
                            })
                        }
                    })
                }
            },
            goBack(){
                this.$router.push(`/courseManage/courseInfo/${this.formData.id}`);
            },
            deleteCourse(){
                this.$confirm('确定要删除当前课程？注意：本课程相关的一切信息都会被删除！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        let url=`${HOST}/course/delete/${this.formData.id}`;
                        this.$ajax.post(url).then((res)=> {
                            let result = res.data;
                            if(result.code===0){//成功
                                this.$message({
                                    message:'成功删除！',
                                    type: 'success'
                                });
                                this.$router.push('/personalHomepage/teacherCourse');
                            }else {
                                this.$message.error(result.msg);
                            }
                        })
                })
            },
            closeCourse(){
                this.$confirm('确定要关闭当前课程？关闭课程后，将无法再编辑课程信息！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url=`${HOST}/course/update`;
                    let course = getCourse();
                    course.courseState = 2;
                    this.$ajax.post(url, course).then((res)=> {
                        let result = res.data;
                        if(result.code===0){//成功
                            this.$message({
                                message:'操作成功！',
                                type: 'success'
                            });
                            saveCourse(course);
                            this.$router.push(`/courseManage/courseInfo/${this.formData.id}`);
                        }else {
                            this.$message.error(result.msg);
                        }
                    })
                })
            }
        }
    }

</script>
<style>
</style>
