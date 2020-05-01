<template>
    <div class="wrap">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品维护</el-breadcrumb-item>
            <el-breadcrumb-item>图书管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="query">
            <el-form-item label="书名">
                <el-input v-model="formInline.bname" placeholder="书名"></el-input>
            </el-form-item>
            <el-form-item label="大类">
                <el-select v-model="formInline.mainType">
                    <el-option label="----请选择----" value=""></el-option>
                    <el-option v-for="(item,index) in mainOpts"
                               :key="index"
                               :label="item"
                               :value="item"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="success" round @click="onAdd">新增</el-button>
                <el-button @click="exportData" type="success" size="mini" icon="el-icon-download">导出数据</el-button>
            </el-form-item>
        </el-form>
        <el-table
                v-loading="loading"
                :data="pageInfo.list"
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
                    prop="bname"
                    label="书名"
                    width="120">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="缩略图"
                    width="100">
                <template slot-scope="scope">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="`${path}/${scope.row.picture}`"
                            :preview-src-list="[`${path}/${scope.row.picture}`]">
                    </el-image>
                    <!--<img v-if="scope.row.picture" width="60" height="80"
                         class="photo"/>-->
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="mainType"
                    label="类别"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="author"
                    label="作者"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="oriPrice"
                    label="原价"
                    width="60">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="curPrice"
                    label="现价"
                    width="60">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="pubDate"
                    label="出版日期"
                    width="120"
                    :formatter="dateFormatter">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="newBook"
                    label="新书"
                    width="80">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.newBook"
                               active-color="#13ce66"
                               inactive-color="#999"
                               active-value="0"
                               inactive-value="1"
                               @change="handleSwitch(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="recBook"
                    label="推荐"
                    width="80">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.recBook"
                               active-color="#13ce66"
                               inactive-color="#999"
                               active-value="0"
                               inactive-value="1"
                               @change="handleSwitch(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="hotBook"
                    label="热卖"
                    width="80">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.hotBook"
                               active-color="#13ce66"
                               inactive-color="#999"
                               active-value="0"
                               inactive-value="1"
                               @change="handleSwitch(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--page-size	每页显示条目个数，支持 .sync 修饰符	number	—	10
            total	总条目数
            current-change	currentPage 改变时会触发-->
        <el-pagination
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
    import {makeSimpleDate} from '../../common/js/dateformat'
    export default {
        name: "CourseWare",
        data(){
            return{
                path: '',
                currPage: 1,    //当前页,
                pageInfo: {},   //查询的数据,
                loading: false, //正在加载,
                mainOpts: ['1','2','3'],   //大类选项
                formInline: {
                    bname: '',
                    mainType: ''
                }
            }
        },
        created(){
            this.path = HOST
            this.getMainType();
            this.getData()
        },
        methods: {
            //获取列表数据
            getData(){
                this.loading = true;
                let url = `${HOST}/book/list/${this.currPage}`
                this.$ajax.post(url,this.formInline).then(res=>{
                    this.pageInfo = res.data
                    console.log(this.pageInfo)
                    this.loading = false;
                })
            },
            //跳转到新增
            onAdd(){
                this.$router.push("/main/bookAdd")
            },
            //日期格式化
            dateFormatter(row, column, cellValue){
                return makeSimpleDate(cellValue)
            },
            //分页跳转
            handleCurrentChange(page){
                this.currPage = page
                this.getData()
            },
            /**
             * 获取所有大类
             */
            getMainType(){
                let url = `${HOST}/mainType/selAll`;
                this.$ajax.get(url).then((res)=>{
                    this.mainOpts = res.data
                })
            },
            //查询
            onSubmit(){
                this.currPage = 1
                this.getData()
            },
            //处理新书，推荐，热卖出价
            handleSwitch(row){
                let url = `${HOST}/book/update`
                this.$ajax.post(url,row).then(res=>{
                    if(res.data.code === 1){
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    }
                })
            },
            //删除
            handleDelete(id){
                let url = `${HOST}/book/del/${id}`
                this.$ajax.get(url).then(res=>{
                    if(res.data.code === 1){
                        this.currPage = 1
                        this.getData()
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    }
                })
            },
            //修改
            handleEdit(id){
                let url = `/main/bookUpdate/${id}`
                this.$router.push(url)
            },
            exportData(){
                let url = `${HOST}/book/export`
                /*表示在当前页面打开新地址*/
                window.open(url,"_parent");
            }

        }
    }
</script>

<style scoped>
    .wrap {
        margin: 10px 0 0 10px;
        padding: 10px;
    }

    .wrap .query {
        margin-top: 20px;
    }

    .wrap .photo {
        cursor: pointer;
    }


</style>