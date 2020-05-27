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
                        <el-button type="primary" plain @click="submitForm">申请开课</el-button>
                        <el-button @click="goBack">返回</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item size="large">
                        <el-button type="primary" plain @click="saveDraft">保存为草稿</el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>
</template>
<script>
    import {getUser, getCourseDraft, clearCourseDraft, saveCourseDraft} from "../../common/js/cache";
    import {HOST} from "../../common/js/config";

    export default {
        components: {},
        props: [],
        data() {
            return {
                path: '',
                formData: {
                    id:null,
                    name: '',
                    type: undefined,
                    openTime: '2020-06-01',
                    closeTime: '2020-12-01',
                    photo: '',
                    school: '',
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
                let course = getCourseDraft();
                if(course.name!==undefined)
                    this.formData = course;
                let user = getUser();
                if(user.school !== undefined)
                    this.formData.school = user.school;
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
                }else if(user.teacherState!==1){
                    this.$message("您未通过教师身份认证，无法开设课程！");
                }else{
                    this.formData.teacherId = user.userId;
                    this.formData.teacherName = user.name;
                    this.$refs['elForm'].validate(valid => {
                        if(valid){
                            //发送信息
                            let url=`${HOST}/course/add`;
                            this.$ajax.post(url,this.formData).then((res)=>{
                                let result = res.data;
                                if(result.code===0){//课程添加成功
                                    this.$message({
                                        message:'已提交开课申请！',
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
            resetForm() {
                //重置表单 并清空缓存
                this.$refs['elForm'].resetFields();
                clearCourseDraft();
                this.formData.photo = '';
            },
            saveDraft(){
                saveCourseDraft(this.formData);
                this.$message({
                    message:'已成功保存草稿',
                    type: 'success'
                });
            },
            goBack(){
                this.$router.push('/personalHomepage/teacherCourse');
            }
        }
    }

</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 260px;
        height: 140px;
        line-height: 140px;
        text-align: center;
    }
    .avatar {
        width: 260px;
        height: 140px;
        display: block;
    }
</style>
