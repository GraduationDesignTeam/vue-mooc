<template>
    <div>
        <div>
            <p style="font-size: 20px">上传课件</p>
        </div>
        <div>
            <el-row :gutter="15">
                <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
                    <el-col :span="10">
                        <el-form-item label="标题" prop="title">
                            <el-input v-model="formData.title" placeholder="请输入标题" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="上传" prop="name" required>
                            <el-upload
                                    v-loading="loading"
                                    element-loading-text="上传中..."
                                    class="upload-demo"
                                    drag
                                    :limit="1"
                                    :action="`${path}/uploadCourseWare`"
                                    :on-success = 'handleSuccess'
                                    :auto-upload="true"
                                    :on-error="handleError"
                                    :on-remove="handleRemove"
                                    :before-upload="handleBefore">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>选择文件</em></div>
                                <div class="el-upload__tip" slot="tip">上传的文件大小请不要超过500MB</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="关联章节" prop="chapterId">
                            <el-select v-model="formData.chapterId" placeholder="请选择所属章节" @change="changeChapter">
                                <el-option v-for="(item, index) in chapterList" :key="index"
                                           :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="formData.chapterId!==0">
                        <el-form-item  label="关联小节" prop="sectionId">
                            <el-select v-model="formData.sectionId" placeholder="请选择所属小节" >
                                <el-option v-for="(item, index) in sectionList" :key="index"
                                           :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="允许下载" prop="downloadFlag" required>
                            <el-switch v-model="formData.downloadFlag" :active-value='1' :inactive-value='0'></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="立即发布" prop="state" required>
                            <el-switch v-model="formData.state" :active-value='1' :inactive-value='0'></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item size="large">
                            <el-button type="primary" @click="submitForm">提交</el-button>
                            <el-button @click="resetForm">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {HOST} from "../../common/js/config";
    import {getCourse, getUser} from "../../common/js/cache";
    import {resolveFileType} from "../../common/js/fileformat";

    export default {
        name: "CourseWareAdd",
        data() {
            return {
                formData: {
                    title: '',
                    file: null,
                    downloadFlag: 1,
                    state: 1,
                    name: null,
                    type: '',
                    size: '',
                    courseId: '',
                    chapterId: 0,
                    sectionId: '',
                    userId: ''
                },
                rules: {
                    title: [{
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur'
                    }],
                },
                fileList: [],
                loading: false,
                chapterList: [
                    {"name": "未关联任何章节", "id": 0},
                ],
                sectionList: [],
                path: ''
            }
        },
        computed: {},
        watch: {},
        created() {
            this.path = HOST;
            this.getData();
        },
        methods: {
            getData(){
                this.formData.courseId = getCourse().id;
                this.formData.userId = getUser().userId;
                let url=`${HOST}/chapter/list/`+this.$route.params.id;
                this.$ajax.get(url).then((res)=>{
                    this.chapterList.push(...res.data);
                });
            },
            changeChapter(){
                this.sectionList = this.chapterList[this.formData.chapterId].sectionList;
                this.formData.sectionId = (this.formData.chapterId === 0)?null:this.sectionList[0].id;
            },
            submitForm() {
                this.$refs['elForm'].validate(valid => {
                    if (valid) {
                        let url=`${HOST}/course_ware/add`;
                        this.$ajax.post(url, this.formData).then((res)=>{
                            let result = res.data;
                            if(result.code===0){
                                this.$message({
                                    message:'课件添加成功！',
                                    type: 'success'
                                });
                                this.$router.push('/courseManage/courseWare/'+this.$route.params.id);
                            }else {
                                this.$message.error(result.msg);
                            }
                        })
                    }
                })
            },
            resetForm() {
                this.$refs['elForm'].resetFields()
            },
            handleSuccess(res){
                this.formData.name = res;
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
                // this.formData.file =
                this.loading = false;
            },
            handleError(res){
                console.log(res);
                this.$message.error('上传失败！');
                this.loading = false
            },
            handleBefore(file) {
                this.loading = true;
                if (file.size / 1024 / 1024 > 500) {
                    this.$message.error('文件大小超过 500MB');
                    this.loading = false;
                    return false;
                }
                // let fileExt = file.name.replace(/.+\./, "");
                // if (['jpg','png','txt','zip', 'rar','pdf','doc','docx','xlsx'].indexOf(fileExt.toLowerCase()) === -1){
                //     this.$message({
                //         type: 'warning',
                //         message: '请上传后缀名为jpg、png、txt、pdf、doc、docx、xlsx、zip或rar的附件！'
                //     });
                //     this.loading = false;
                //     return false;
                // }
                if(file.size / 1024 / 1024 > 1)
                    this.formData.size = (file.size/1024/1024).toFixed(2) + "MB";
                else
                    this.formData.size = (file.size/1024).toFixed(2) + "KB";
                this.formData.type = resolveFileType(file.name);
                return true;
            },
            handleRemove(){
                // 删除已经上传到服务器上的文件
                if(this.formData.name !== ''){
                    let url=`${HOST}/course_ware/remove/`+this.formData.name;
                    this.$ajax.post(url).then(()=>{});
                }
            },
        }
    }
</script>

<style scoped>

</style>