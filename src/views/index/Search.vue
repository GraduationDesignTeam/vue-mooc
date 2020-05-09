<template>
    <div class="app">
        <div class="nav">
            <NavMenu menuIndex='1'></NavMenu>
        </div>
        <div class="main">
            <div style="margin: 0 60px">
                <p class="title" v-if="search">共{{pageInfo.total}}个相关的课程</p>
                <CourseList :course-list="courseList" :mode="0"></CourseList>
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
        </div>
    </div>
</template>

<script>
    import CourseList from "../../components/course/CourseList";
    import NavMenu from "../../components/index/nav/NavMenu";
    import {HOST} from "../../common/js/config";

    export default {
        name: "Search",
        components:{NavMenu, CourseList},
        data(){
            return{
                queryInfo: '',
                courseList:[],
                search: false,
                loading: false,
                currPage: 1,
                pageInfo: {pageSize: 6, total:0}
            }
        },
        mounted() {
            this.loadData();
        },
        methods:{
            loadData(){
                if(JSON.stringify(this.$route.query)!=='{}'){
                    this.queryInfo = this.$route.query.query;
                    this.search = true;
                }
                this.loading = true;
                let course = {name:this.queryInfo};
                let url = `${HOST}/course/list/${this.currPage}`;
                this.$ajax.post(url, course).then((res)=> {
                    console.log(res.data);
                    this.pageInfo = res.data;
                    this.courseList = res.data.list;
                    this.loading = false;
                })
            },
            handleCurrentChange(page){
                this.currPage = page;
                this.loadData()
            },
        },
        watch: {
            '$route.query' (){
                this.loadData();
            }
        }
    }
</script>

<style scoped>
    .app{
        display: flex;
        display: -webkit-flex;
        align-items:center;
        justify-content:center;
    }

    .nav{
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 100;
    }

    .main{
        height: auto;
        background-color: #F5F5F5;
        position: relative;
        top:60px;
        z-index: 1;
    }

    .title{
        margin-bottom: 0;
        font-family: 微软雅黑, "Microsoft YaHei";
        font-size: 22px;
    }
</style>