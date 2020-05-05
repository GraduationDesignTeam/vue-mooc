<template>
    <div>
        <h2>{{name}}</h2>
        <el-table
                v-loading="loading"
                border
                :data="choiceanswer"
                style="width: 100%"
                class="content">
                <el-table-column
                        label="题目"
                        prop="content"
                        width="100">
                </el-table-column>
                <el-table-column
                    label="选项A"
                    prop="op1"
                    width="150">
                </el-table-column>
            <el-table-column
                    label="选项B"
                    prop="op2"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="选项C"
                    prop="op3"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="选项D"
                    prop="op4"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="答案"
                    prop="resolution"
                    width="150"
            >
            </el-table-column>
        </el-table>
        <el-divider></el-divider>
        <el-table
                v-loading="loading"
                border
                :data="judgeanswer"
                style="width: 100%"
                class="content">
            <el-table-column
                    label="题目"
                    prop="content"
                    width="100">
            </el-table-column>
            <el-table-column
                    label="答案"
                    prop="resolution"
                    width="150"
            >
            </el-table-column>
        </el-table>

        <el-divider></el-divider>
        <el-table
                v-loading="loading"
                border
                :data="subjectiveanswer"
                style="width: 100%"
                class="content">
            <el-table-column
                    label="题目"
                    prop="content"
                    width="100">
            </el-table-column>
            <el-table-column
                    label="答案"
                    prop="answer"
                    width="150"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {HOST} from "../../common/js/config";
    import {getCourse, getUser} from "../../common/js/cache";

    export default {
        name: "TaskList",
        data(){
            return{
                taskid:'',
                path:'',
                loading:false,
                pageInfo:{

                },
                user:{},
                result:{},
                name:"",
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
                task:{
                    name:'',
                    id:''
                },
                radio:{
                    op1:'',
                    op2:'',
                    op3:'',
                    op4:'',
                },
                row:''
            }
        },
        created() {
                this.path=HOST,
                this.user=getUser(),
                this.course=getCourse(),
                this.taskid = this.$route.params.id,
                this.getRecords()

        },
        methods: {
            getRecords() {
                let url = `${HOST}/choice/listtask/`;
                this.loading = true
                this.task.id = this.$route.params.id
                this.$ajax.post(url, this.task).then((res) => {
                    this.choiceanswer = res.data

                    this.loading = false
                })
                let url4 = `${HOST}/coursetask/seltask/`;
                this.loading = true
                this.task.id = this.$route.params.id
                this.$ajax.post(url4, this.task).then((res) => {
                    this.name = res.data.name
                    console.log(this.task)
                    this.loading = false
                })
                let url1 = `${HOST}/judge/listtask/`;
                this.loading = true
                this.task.id = this.$route.params.id
                this.$ajax.post(url1, this.task).then((res) => {
                    this.judgeanswer = res.data

                    this.loading = false
                })

                let url2 = `${HOST}/subjective/listtask/`;
                this.loading = true
                this.task.id = this.$route.params.id
                this.$ajax.post(url2, this.task).then((res) => {
                    this.subjectiveanswer = res.data

                    this.loading = false
                })
            },
        }
    }
</script>

<style scoped>

</style>