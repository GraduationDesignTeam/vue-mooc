<template>
    <div>
        <el-dialog :visible.sync="visible" :show="show" @open="open" @close="close" title="更新课件信息">
            <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="formData.title" placeholder="请输入标题" clearable :style="{width: '100%'}">
                    </el-input>
                </el-form-item>
                <el-form-item label="关联章节" prop="chapterId">
                    <el-select v-model="formData.chapterId" placeholder="请选择所属章节" @change="changeChapter">
                        <el-option v-for="(item, index) in chapterList" :key="index" :disabled="item.disabled"
                                   :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="关联小节" prop="sectionId">
                    <el-select v-model="formData.sectionId" placeholder="请选择所属小节" >
                        <el-option v-for="(item, index) in sectionList" :key="index"
                                   :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="允许下载" prop="downloadFlag" required>
                    <el-switch v-model="formData.downloadFlag" :active-value='1' :inactive-value='0'></el-switch>
                </el-form-item>
                <el-form-item label="是否发布" prop="state" required>
                    <el-switch v-model="formData.state" :active-value='1' :inactive-value='0'></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="handelConfirm">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {getChapterList, getCourseWare} from "../../common/js/cache";
    import {COURSE_WARE_HOST} from "../../common/js/config";

    export default {
        name:"CourseWareUpdate",
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visible: this.show,
                formData: {
                    title: '',
                    downloadFlag: 1,
                    state: 1,
                    chapterId: -1,
                    sectionId: null
                },
                chapterList:[],
                sectionList:[],
                rules: {
                    title: [{
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur'
                    }],
                },
            }
        },
        methods: {
            open() {
                this.formData = getCourseWare();
                let temp_list = getChapterList();
                this.chapterList.push(...temp_list);
                this.chapterList.push({"name": "未关联章节的课件", "id": -1});
                let _this = this;
                if(this.formData.sectionId){
                    for(let i = 0; i < temp_list.length; i++){
                        for(let j = 0; j < temp_list[i].sectionList.length; j++){
                            if(temp_list[i].sectionList[j].id === _this.formData.sectionId){
                                _this.formData.chapterId = temp_list[i].id;
                                _this.sectionList = temp_list[i].sectionList;
                            }
                        }
                    }
                }
            },
            close() {
                this.chapterList = [];
                this.sectionList = [];
                this.$emit('update:show', false)
            },
            changeChapter(chapterId){
                if(chapterId > 0){
                    this.chapterList.forEach((item)=>{
                        if(item.id === chapterId){
                            this.sectionList = item.sectionList;
                            this.formData.sectionId = this.sectionList[0].id;
                        }
                    });
                }else{
                    this.sectionList = null;
                    this.formData.sectionId = null;
                }
            },
            handelConfirm() {
                this.$refs['elForm'].validate(valid => {
                    if (!valid) return;
                    if(valid){
                        let url=`${COURSE_WARE_HOST}/course_ware/update`;
                        this.$ajax.post(url, this.formData).then((res)=>{
                            let result = res.data;
                            if(result.code===0){
                                this.$message({
                                    message:'课件信息更新成功！',
                                    type: 'success'
                                });
                                this.$router.go(0);
                            }else {
                                this.$message.error(result.msg);
                            }
                        })
                    }
                    this.close()
                })
            },
        },
        watch: {
            show () {
                this.visible = this.show;
            }
        }
    }

</script>
<style>
</style>
