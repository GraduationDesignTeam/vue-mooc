<!--讨论区首页页头，包含输入检索，分类检索等固定功能的组件-->
<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="24">
                <el-col :span="6">
                    <i class="el-icon-s-opportunity" style="color: chocolate;margin-left: 40px;margin-top: 10px"></i> <strong style="font-size: 20px">讨论区</strong>
                </el-col>
                <el-col :span="6">
                </el-col>
                <el-col :span="4">
                </el-col>
                <el-col :span="8" style="float: right">
                    <div>
                        <el-input  size="small" placeholder="搜索感兴趣的话题" v-model="input3" class="input-with-select">
                            <el-select v-model="select" slot="prepend" placeholder="请选择">
                                <el-option label="讨论名" value="1"></el-option>
                                <el-option label="课程名" value="2"></el-option>
                                <el-option label="教师名" value="3"></el-option>
                            </el-select>
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
            <!--<el-divider content-position="right"><span style="color: darkcyan">grade</span></el-divider>
            <el-row style="">
                <el-col :span="2">
                    <strong style="font-size: 14px;margin-left: 20px">学历 ：</strong>
                </el-col>
                <el-col :span="22">
                    <span style="font-size: 13px;color: darkcyan"><a href="">全部</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">小学</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">初中</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">高中</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">大专</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">本科</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">研究生</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">博士生</a></span>
                </el-col>
            </el-row>-->
            <el-divider content-position="right"><span style="color: darkcyan">major</span></el-divider>
            <el-row style="">
                <el-col :span="2">
                    <strong style="font-size: 14px;margin-left: 20px">专业 ：</strong>
                </el-col>
                <el-col :span="22">
                    <span style="font-size: 13px;color: darkcyan"><a href="">全部</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">文学</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">计算机</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">历史</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">地理</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">天文</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">新闻传播</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">经济</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">物理</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">化学</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">医学</a></span>
                </el-col>
            </el-row>
            <el-divider content-position="right"><span style="color: darkcyan">college</span></el-divider>
            <el-row style="">
                <el-col :span="2">
                    <strong style="font-size: 14px;margin-left: 20px">院校 ：</strong>
                </el-col>
                <el-col :span="22" v-model="searchform.school">
                    <span style="font-size: 13px;color: darkcyan"><a href="">全部</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">清华大学</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">北京大学</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">复旦大学</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">浙江大学</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">南京大学</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">上海交通大学</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">中国科技大学</a></span>
                    <span style="font-size: 13px;color: darkcyan;margin-left: 30px"><a href="">东南大学</a></span>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "DiscussionCategory",
        data() {
            return {
                input3: '',
                select: '',
                searchform:{
                    major:'',
                    school:''
                }
            }
        }
    }
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 1280px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .el-select .el-input {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    a{
        color: darkcyan;
        text-decoration: none;
    }
</style>