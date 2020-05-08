<template>
    <div>
        <div>
            <div style="position: relative; height: 60px;">
                <p class="pull-left title">课件</p>
                <div class="pull-right title-button">
                    <el-button type="primary" icon="el-icon-plus" @click="addCourseWare" :disabled="role!==1&&role!==2">添加课件</el-button>
                </div>
                <div style="clear: both"></div>
            </div>
        </div>
        <el-divider></el-divider>
        <el-row>
            <el-form ref="elForm" :model="formData" size="medium" label-width="100px">
                <el-col :span="8">
                    <el-form-item  label-width="0" prop="chapterId">
                        <el-select v-model="formData.chapterId" placeholder="请选择所属章节" :style="{width: '80%'}" @change="changeChapter">
                            <el-option v-for="(item, index) in chapterList" :key="index" :disabled="item.disabled"
                                       :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item v-if="formData.chapterId>0"  label-width="0" prop="sectionId">
                        <el-select v-model="formData.sectionId" placeholder="请选择所属小节" :style="{width: '80%'}">
                            <el-option v-for="(item, index) in sectionList" :key="index"
                                       :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item>
                        <el-button type="primary" plain @click="getData">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
        <CourseWareUpdate :show.sync="showModal"></CourseWareUpdate>
        <el-table
                v-loading="loading"
                :data="courseWareList"
                border
                style="width: 100%">
            <el-table-column
                    align="center"
                    label="序号"
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="title"
                    label="标题"
                    width="160">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="type"
                    label="类型"
                    width="80">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="size"
                    label="大小"
                    width="80">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="scname"
                    label="所属小节"
                    width="160">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="上传者"
                    width="120">
                <template slot-scope="scope">
                    <div v-if="scope.row.uname">{{scope.row.uname}}</div>
                    <div v-else>{{scope.row.username}}</div>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    label="上一次更新时间"
                    width="160">
                <template slot-scope="scope">
                    {{convertDate(scope.row.uploadTime)}}
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="state"
                    label="状态"
                    width="80">
                <template slot-scope="scope">
                    <div v-if="scope.row.state === 0">未发布</div>
                    <div v-else>已发布</div>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="downloadFlag"
                    label="允许下载"
                    width="80">
                <template slot-scope="scope">
                    <div v-if="scope.row.downloadFlag===1">是</div>
                    <div v-else>否</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" plain v-if="scope.row.state===0"
                               @click="handlePublish(scope.row)">发布</el-button>
                    <el-button size="mini" type="success" plain
                               @click="handleView(scope.row)">预览</el-button>
                    <el-button size="mini" type="success" plain :disabled="role!==1&&scope.row.userId!==userId"
                               @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" plain :disabled="role!==1&&scope.row.userId!==userId"
                               @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                v-loading="loading"
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-size="pageInfo.pageSize"
                :total="pageInfo.total"
                class="pagination"
        >
        </el-pagination>
    </div>
</template>

<script>
    import {HOST} from '../../common/js/config'
    import {getCourse, getUser, saveChapterList, saveCourseWare} from "../../common/js/cache";
    import {makeDate} from "../../common/js/dateformat";
    import CourseWareUpdate from "./CourseWareUpdate";
    // import {makeSimpleDate} from '../../common/js/dateformat'
    export default {
        name: "CourseWare",
        components: {CourseWareUpdate},
        data(){
            return{
                path: '',
                currPage: 1,    //当前页,
                pageInfo: {},   //查询的数据,
                loading: false, //正在加载,
                showModal: false, //是否显示更新课件的弹窗
                role: 0,
                userId: 0,
                formData: {
                    chapterId: 0,
                    sectionId: null
                },
                chapterList: [
                    {"name": "全部", "id": 0}
                ],
                sectionList: [],
                courseWareList:[]
            }
        },
        created(){
            this.path = HOST;
            this.loadData();
            this.getData();
        },
        methods: {
            loadData(){
                this.role = getCourse().role;
                this.userId = getUser().userId;
                let url=`${HOST}/chapter/list/`+this.$route.params.id;
                this.$ajax.get(url).then((res)=>{
                    let temp_list = res.data;
                    temp_list.forEach((item)=>{
                        if(item.sectionList.length === 0)
                            item.disabled = true;
                    });
                    saveChapterList(temp_list);
                    this.chapterList.push(...temp_list);
                    this.chapterList.push({"name": "未关联章节的课件", "id": -1});
                });
            },
            getData(){
                this.loading = true;
                let courseId = this.$route.params.id;
                let param = new URLSearchParams();
                param.append('courseId', courseId);
                let url;
                if(this.formData.chapterId === 0){
                    url = `${HOST}/course_ware/selectByCourseId/${this.currPage}`;
                    this.$ajax.post(url, param, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res)=> {
                        this.pageInfo = res.data;
                        this.courseWareList = res.data.list;
                        this.loading = false;
                    })
                }else if(this.formData.chapterId === -1){
                    url = `${HOST}/course_ware/selectUnassociatedByCourseId/${this.currPage}`;
                    this.$ajax.post(url, param, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res)=> {
                        this.pageInfo = res.data;
                        this.courseWareList = res.data.list;
                        this.loading = false;
                    })
                }else{
                    url = `${HOST}/course_ware/selectBySectionId/${this.currPage}`;
                    param.append('sectionId', this.formData.sectionId);
                    this.$ajax.post(url, param, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res)=> {
                        this.pageInfo = res.data;
                        this.courseWareList = res.data.list;
                        this.loading = false;
                    })
                }

            },
            convertDate(date){
                return makeDate(date);
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
            //分页跳转
            handleCurrentChange(page){
                this.currPage = page;
                this.getData();
            },
            addCourseWare(){
                this.$router.push('/courseManage/courseWareAdd/' + this.$route.params.id)
            },
            handlePublish(course_ware){
                course_ware.state = 1;
                let url=`${HOST}/course_ware/update`;
                this.$ajax.post(url, course_ware).then((res)=>{
                    let result = res.data;
                    if(result.code===0){
                        this.$message({
                            message:'发布成功！',
                            type: 'success'
                        });
                        this.getData();
                    }else {
                        this.$message.error(result.msg);
                    }
                });
            },
            handleView(course_ware){
                saveCourseWare(course_ware);
                this.$router.push('/courseManage/courseWarePreview');
            },
            handleEdit(course_ware){
                saveCourseWare(course_ware);
                this.showModal = true;
            },
            handleDelete(id){
                const _this = this;
                this.$confirm('确定要删除这个课件？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url=`${HOST}/course_ware/del/${id}`;
                    _this.$ajax.get(url).then((res)=>{
                        let result = res.data;
                        if(result.code===0){
                            _this.$message({
                                message:'删除成功！',
                                type: 'success'
                            });
                            _this.getData();
                        }else {
                            _this.$message.error(result.msg);
                        }
                    });
                }).catch(() => {});
            }

        }

    }
</script>

<style scoped>
    .pull-left{
        float:left;
    }
    .pull-right{
        float:right;
    }
    .title{
        font-size: 24px;
    }
    .title-button{
        line-height: 80px;
        margin-right: 30px;
    }
</style>