<template>
    <div>
        <el-dialog :visible.sync="visible" :show="show" @open="open" @close="close" title="更新课件信息">
            <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="formData.title" placeholder="请输入标题" clearable :style="{width: '100%'}">
                    </el-input>
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
    import {getCourseWare} from "../../common/js/cache";
    import {HOST} from "../../common/js/config";

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
                },
                rules: {
                    title: [{
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur'
                    }],
                },
            }
        },
        mounted() {

        },
        methods: {
            open() {
                this.formData = getCourseWare();
            },
            close() {
                this.$emit('update:show', false)
            },
            handelConfirm() {
                this.$refs['elForm'].validate(valid => {
                    if (!valid) return;
                    if(valid){
                        let url=`${HOST}/course_ware/update`;
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
