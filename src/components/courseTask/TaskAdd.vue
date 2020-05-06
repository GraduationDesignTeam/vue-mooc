<template>
    <div>
        <el-row type="flex" justify="center">
            <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
                <el-col :span="20">
                    <el-form-item label="任务名称" prop="name">
                        <el-input v-model="formData.name" placeholder="请输入任务名称" :maxlength="50" clearable
                                  :style="{width: '40%'}"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="开始时间" prop="openTime">
                        <el-date-picker v-model="formData.startTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                        :style="{width: '30%'}" placeholder="请选择开始时间" clearable ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="结束时间" prop="closeTime">
                        <el-date-picker v-model="formData.endTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                        :style="{width: '30%'}" placeholder="请选择结束时间" clearable ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="20">
                <el-button type="text" @click="dialogFormVisible = true">添加选择题</el-button>
                <el-dialog :span="20" title="添加选择题" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="题目内容" :label-width="formLabelWidth">
                            <el-input v-model="form.content" autocomplete="off" clearable ></el-input>
                        </el-form-item>
                        <el-form-item label="选项A" :label-width="formLabelWidth">
                            <el-input v-model="form.op1" autocomplete="off" clearable ></el-input>
                        </el-form-item>
                        <el-form-item label="选项B" :label-width="formLabelWidth">
                            <el-input v-model="form.op2" autocomplete="off" clearable ></el-input>
                        </el-form-item>
                        <el-form-item label="选项C" :label-width="formLabelWidth">
                            <el-input v-model="form.op3" autocomplete="off" clearable ></el-input>
                        </el-form-item>
                        <el-form-item label="选项D" :label-width="formLabelWidth">
                            <el-input v-model="form.op4" autocomplete="off" clearable ></el-input>
                        </el-form-item>
                        <el-form-item label="答案" :label-width="formLabelWidth">
                            <el-radio v-model="form.answer" label="1">A</el-radio>
                            <el-radio v-model="form.answer" label="2">B</el-radio>
                            <el-radio v-model="form.answer" label="3">C</el-radio>
                            <el-radio v-model="form.answer" label="4">D</el-radio>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitChoice">确 定</el-button>
                    </div>
                </el-dialog>
                    <el-button type="text" @click="removechoicelist">删除选择题</el-button>
                    <el-dialog :span="20" title="删除选择题" :visible.sync="dialogFormVisible4">
                        <el-table
                                border
                                :data="choiceData"
                                style="width: 100%"
                                class="content">
                            <el-table-column
                                    label="题目"
                                    prop="content"
                                    width="400">
                            </el-table-column>
                            <el-table-column
                                    label="删除"
                                    width="150"
                            >
                                <template scope="scope">
                                    <el-button type="small" @click="removechoice(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible4 = false">结 束</el-button>
                        </div>
                    </el-dialog>
                </el-col>



                <el-col :span="20">
                <el-popover
                        placement="right"
                        width="500"
                        trigger="click">
                    <el-table :data="choiceData">
                        <el-table-column width="300" property="content" label="题目"></el-table-column>
                        <el-table-column width="100" property="op1" label="选项A"></el-table-column>
                        <el-table-column width="100" property="op2" label="选项B"></el-table-column>
                        <el-table-column width="100" property="op3" label="选项C"></el-table-column>
                        <el-table-column width="100" property="op4" label="选项D"></el-table-column>
                    </el-table>
                    <el-button slot="reference" @click="listchoice">查看选择题</el-button>
                </el-popover>
                </el-col>
                <el-col :span="20">
                    <el-button type="text" @click="dialogFormVisible2 = true">添加判断题</el-button>
                    <el-dialog :span="20" title="添加判断题" :visible.sync="dialogFormVisible2">
                        <el-form :model="formjudge">
                            <el-form-item label="题目内容" :label-width="formLabelWidth">
                                <el-input v-model="formjudge.content" autocomplete="off" clearable ></el-input>
                            </el-form-item>
                            <el-form-item label="答案" :label-width="formLabelWidth">
                                <el-radio v-model="formjudge.answer" label="0" >对</el-radio>
                                <el-radio v-model="formjudge.answer" label="1">错</el-radio>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                            <el-button type="primary" @click="submitjudge">确 定</el-button>
                        </div>
                    </el-dialog>

                    <el-button type="text" @click="removejudgelist">删除判断题</el-button>
                    <el-dialog :span="20" title="删除判断题" :visible.sync="dialogFormVisible5">
                        <el-table
                                border
                                :data="judgeData"
                                style="width: 100%"
                                class="content">
                            <el-table-column
                                    label="题目"
                                    prop="content"
                                    width="400">
                            </el-table-column>
                            <el-table-column
                                    label="删除"
                                    width="150"
                            >
                                <template scope="scope">
                                    <el-button type="small" @click="removejudge(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible5 = false">结 束</el-button>
                        </div>
                    </el-dialog>
                </el-col>

                <el-col :span="20">
                    <el-popover
                            placement="right"
                            width="500"
                            trigger="click">
                        <el-table :data="judgeData">
                            <el-table-column width="300" property="content" label="题目"></el-table-column>
<!--                            <el-table-column width="100" property="answer" label="答案" :formatter="formatAnswer"></el-table-column>-->
                        </el-table>
                        <el-button slot="reference" @click="listjudge">查看判断题</el-button>
                    </el-popover>
                </el-col>
                <el-col :span="20">
                    <el-button type="text" @click="dialogFormVisible3 = true">添加主观题</el-button>
                    <el-dialog :span="20" title="添加主观题" :visible.sync="dialogFormVisible3">
                        <el-form :model="formsubjective">
                            <el-form-item label="题目内容" :label-width="formLabelWidth">
                                <el-input v-model="formsubjective.content" autocomplete="off"  type="textarea" clearable ></el-input>
                            </el-form-item>
                            <el-form-item label="答案" :label-width="formLabelWidth">
                                <el-input v-model="formsubjective.answer" autocomplete="off"  type="textarea" clearable ></el-input>

                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                            <el-button type="primary" @click="submitsubjective">确 定</el-button>
                        </div>
                    </el-dialog>

                    <el-button type="text" @click="removesubjectivelist">删除主观题</el-button>
                    <el-dialog :span="20" title="删除主观题" :visible.sync="dialogFormVisible6">
                        <el-table
                                border
                                :data="subData"
                                style="width: 100%"
                                class="content">
                            <el-table-column
                                    label="题目"
                                    prop="content"
                                    width="400">
                            </el-table-column>
                            <el-table-column
                                    label="删除"
                                    width="150"
                            >
                                <template scope="scope">
                                    <el-button type="small" @click="removesubjective(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible6 = false">结 束</el-button>
                        </div>
                    </el-dialog>
                </el-col>
                <el-col :span="20">
                    <el-popover
                            placement="right"
                            width="500"
                            trigger="click">
                        <el-table :data="subData">
                            <el-table-column width="300" property="content" label="题目"></el-table-column>
                            <el-table-column width="100" property="answer" label="答案"></el-table-column>
                        </el-table>
                        <el-button slot="reference" @click="listsubjective">查看主观题</el-button>
                    </el-popover>
                </el-col>
                <el-col :span="12">
                    <el-form-item size="large">
                        <el-button type="primary" plain @click="submitForm">创建任务</el-button>
                        <el-button @click="goBack">返回</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item size="large">
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>



</template>

<script>
    import {HOST} from "../../common/js/config";
    import {clearCourseDraft, getCourseDraft, getUser, saveCourseDraft,getCourse} from "../../common/js/cache";

    export default {
        components: {},
        props: [],
        data() {
            return {
                path: '',
                formData: {
                    id:null,
                    userId:'',
                    courseId:'',
                    name: '',
                    type: 0,
                    startTime: '2020-06-01',
                    endTime: '2020-12-01',

                },
                dialogTableVisible: false,
                dialogFormVisible: false,
                dialogTableVisible2: false,
                dialogFormVisible2: false,
                dialogTableVisible3: false,
                dialogFormVisible3: false,
                dialogTableVisible4: false,
                dialogFormVisible4: false,
                dialogTableVisible5: false,
                dialogFormVisible5: false,
                dialogTableVisible6: false,
                dialogFormVisible6: false,
                clearable:true,
                form: {
                    content: '',
                    delivery: false,
                    op1:'',
                    op2:'',
                    op3:'',
                    op4:'',
                    answer:"",
                },
                choiceData:[],
                judgeData:{
                    content:'',
                    answer:'',
                    answer2:'',
                }
                ,
                subData:[],
                formjudge:{
                    content:'',
                    answer:''
                },
                formsubjective:{
                    content:'',
                    answer:''
                },
                formremove:{
                    content:'',
                    answer:''
                },
                formLabelWidth: '120px',
                choiceanswer:{
                    content:'',
                    op1:'',
                    op2:'',
                    op3:'',
                    op4:'',
                    resolution:''
                },
                judgeanswer:{
                    content:'',
                    answer:'',
                    resolution:''
                },
                subjectiveanswer:{
                    content:'',
                    answer:'',
                    resolution:''
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入任务名称',
                        trigger: 'blur'
                    }]
                }
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
                switch (this.judgeData.answer) {
                    case "0":
                        this.judgeData.answer='正确';
                        break;
                    case "1":
                        this.judgeData.answer='错误';
                        break;
                }
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
                let course=getCourse();
                if(user.userId===undefined){
                    this.$message("用户登录信息已过期,请重新登录！");
                }else if(user.teacherState!==1){
                    this.$message("您未通过教师身份认证，无法开设课程！");
                }else{
                    this.formData.userId=user.userId
                    this.formData.courseId=course.id
                    this.$refs['elForm'].validate(valid => {
                        if(valid){
                            //发送信息
                            let url=`${HOST}/coursetask/add`;
                            this.$ajax.post(url,this.formData).then((res)=>{
                                let result = res.data;
                                if(result.code===0){//课程添加成功
                                    this.$message({
                                        message:'已创建任务！',
                                        type: 'success'
                                    });
                                    this.$router.push("/courseManage/courseTask/" + course.id);
                                }else {
                                    this.$message.error(result.msg);
                                }
                            })
                        }
                    })
                }

            },
            submitChoice(){
                this.dialogFormVisible=false;
                let url=`${HOST}/choice/add`;
                this.$ajax.post(url,this.form).then((res)=>{
                    let result = res.data;
                    if(result.code===0){//课程添加成功
                        this.$message({
                            message:'已添加成功',
                            type: 'success'
                        });
                    }else {
                        this.$message.error(result.msg);
                    }
                })
            },
            submitjudge(){
                this.dialogFormVisible2=false;
                let url=`${HOST}/judge/add`;
                this.$ajax.post(url,this.formjudge).then((res)=>{
                    let result = res.data;
                    if(result.code===0){//课程添加成功
                        this.$message({
                            message:'已添加成功',
                            type: 'success'
                        });
                    }else {
                        this.$message.error(result.msg);
                    }
                })
            },
            submitsubjective(){
                this.dialogFormVisible3=false;
                let url=`${HOST}/subjective/add`;
                this.$ajax.post(url,this.formsubjective).then((res)=>{
                    let result = res.data;
                    if(result.code===0){//课程添加成功
                        this.$message({
                            message:'已添加成功',
                            type: 'success'
                        });
                    }else {
                        this.$message.error(result.msg);
                    }
                })
            },
            listjudge(){
                let url=`${HOST}/judge/listdraft`;
                this.$ajax.post(url,this.formData).then((res)=>{
                    this.judgeData = res.data;

                })
            },
            formatAnswer(row){
                switch (row.answer) {
                    case "0":
                        return '正确';
                    case "1":
                        return '错误';
                }
            },
            listchoice(){
                let url=`${HOST}/choice/listdraft`;
                this.$ajax.post(url,this.formData).then((res)=>{
                    this.choiceData = res.data;
                })
            },
            listsubjective(){
                let url=`${HOST}/subjective/listdraft`;
                this.$ajax.post(url,this.formData).then((res)=>{
                    this.subData = res.data;
                })
            },
            removechoice(id){
                let url=`${HOST}/choice/delete`;
                console.log(id)
                this.$ajax.post(url,id).then((res)=>{
                    console.log(res.data) ;
                })
                this.removechoicelist()
                this.reload()
            },
            removechoicelist(){
                this.dialogFormVisible4 = true
                let url=`${HOST}/choice/listdraft`;
                this.$ajax.post(url,this.formData).then((res)=>{
                    this.choiceData = res.data;
                })
            },
            removejudge(id){
                let url=`${HOST}/judge/delete`;
                console.log(id)
                this.$ajax.post(url,id).then((res)=>{
                    console.log(res.data) ;
                })

                this.removejudgelist();
                this.reload()
            },
            removejudgelist(){
                this.dialogFormVisible5 = true
                let url=`${HOST}/judge/listdraft`;
                this.$ajax.post(url,this.formData).then((res)=>{
                    this.judgeData = res.data;
                })
            },
            removesubjective(id){
                let url=`${HOST}/subjective/delete`;
                console.log(id)
                this.$ajax.post(url,id).then((res)=>{
                    console.log(res.data) ;
                })
                this.removesubjectivelist()
                this.reload()
            },
            removesubjectivelist(){
                this.dialogFormVisible6 = true
                let url=`${HOST}/subjective/listdraft`;
                this.$ajax.post(url,this.formData).then((res)=>{
                    this.subData = res.data;
                })
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

<style scoped>

</style>