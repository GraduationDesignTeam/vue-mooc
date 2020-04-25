<template>
    <div class="main">
        <div style="position: relative">
            <h2 style="float: left">章节目录</h2>
            <div class="pull-right title-button">
                <span v-if="!isCollapsed" @click="collapseAll" class="edit-button" style="margin-right: 30px">全部折叠</span>
                <span v-else @click="expendAll" class="edit-button" style="margin-right: 30px">全部展开</span>
                <span v-if="!isEditable" @click="isEditable=true" class="edit-button" style="margin-right: 10px">编辑</span>
                <span v-else @click="isEditable=false" class="edit-button" style="margin-right: 10px">返回</span>
            </div>
            <div style="clear: both"></div>
        </div>
        <el-divider></el-divider>
        <div class="chapter-box" v-for="(chapter,index) in chapterList" :key="index" :class="[isVisible[index]?'chapter-expanded':'chapter-collapsed']">
            <div class="chapter-line">
                <div class="chapter-switch" @click="clickCollapseButton(index)">
                    <i v-if="isVisible[index]===true" class="el-icon-remove-outline"></i>
                    <i v-else class="el-icon-circle-plus-outline"></i>
                </div>
                <div class="chapter-title-container">
                    <span class="chapter-number">第{{chapter.number}}章</span>
                    <span class="chapter-title" :title="chapter.name">{{chapter.name}}</span>
                    <div class="pull-right" v-if="isEditable">
                        <span @click="editChapter(chapter.id)" class="edit-button" style="margin-right: 30px">编辑</span>
                        <span @click="deleteChapter(chapter.id)" class="edit-button" style="margin-right: 10px">删除</span>
                    </div>
                </div>
            </div>

            <div class="section-list-container" v-if="isVisible[index]===true">
                <div class="section-box" v-for="(section) in chapterList[index].sectionList" :key="section.number">
                    <div class="section-branch"></div>
                    <div class="section-title-container">
                        <span class="section-number">{{chapter.number}}.{{section.number}}</span>
                        <span class="section-title" :title="section.name">{{section.name}}</span>
                        <div class="pull-right" v-if="isEditable">
                            <span @click="editSection(section.id)" class="edit-button" style="margin-right: 30px">编辑</span>
                            <span @click="deleteSection(section.id)" class="edit-button" style="margin-right: 10px">删除</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="clear: both;"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChapterManage",
        data(){
            return{
                test:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
                chapterList:[
                    {id:1, number:1, name:'课程介绍', sectionList:[{id:1, number:1, name:'测试小节1.1'},{id:2, number:2, name:'测试小节1.2'}]},
                    {id:2, number:2, name:'课程概述', sectionList:[{id:3, number:1, name:'测试小节2.1'},{id:4, number:2, name:'测试小节2.2'}]},
                    {id:3, number:3, name:'操作实验方法', sectionList:[{id:5, number:1, name:'测试小节3.1'},{id:6, number:2, name:'测试小节3.2'}]},
                ],
                isVisible:[],
                isCollapsed: false,
                isEditable: false
            }
        },
        created() {
            this.loadData();
        },
        methods:{
            loadData(){
                this.isVisible = new Array(this.chapterList.length).fill(true);
                this.chapterList[0].name = this.test;
                this.chapterList[0].sectionList[0].name = this.test;
                // this.chapterList.splice(2,)
            },
            collapseAll(){
                this.isVisible = new Array(this.chapterList.length).fill(false);
                this.isCollapsed = true;
            },
            expendAll(){
                this.isVisible = new Array(this.chapterList.length).fill(true);
                this.isCollapsed = false;
            },
            clickCollapseButton(index){
                this.isVisible.splice(index, 1, !this.isVisible[index]);
            },
            editChapter(id){
                console.log(id)

            },
            deleteChapter(id){
                console.log(id)
                this.$confirm('确定要删除本章？删除后本章和小节都将消失，课件仍将保留。', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {});
            },
            editSection(id){
                console.log(id)
            },
            deleteSection(id){
                console.log(id)
            }
        }
    }
</script>

<style scoped>
    .main{
        margin: 0 20px;
    }

    .pull-right{
        float: right;
    }

    h2{
        font-size: 22px;
        font-weight: 500;
    }

    .title-button{
        line-height: 100px;
        height: 60px;
    }

    .clearfix:after{
        clear: both;
        display:block;
        margin-bottom: 60px;
    }

    .chapter-box{
        position: relative;
    }

    .edit-button{
        cursor: pointer;
        color:#339933;
    }

    .chapter-expanded{
        margin-bottom: 56px
    }

    .chapter-collapsed{
        margin-bottom: 24px;
    }

    .chapter-line{
        float: left;
        width: 900px;
        height: 36px;
    }

    .chapter-switch{
        font-size: 18px;
        width: 18px;
        height: 36px;
        line-height: 36px;
        margin-right: 10px;
        float: left !important;
        cursor: pointer;
    }

    .chapter-title-container{
        width: 860px;
        height: 32px;
        border-left: 4px solid #337ab7;
        line-height: 32px;
        background-color: #f9f9f9;
        margin-top: 3px;
        float: left !important;
    }

    .chapter-number{
        margin: 0 24px 0 18px;
        float: left;
        display: inline-block;
    }

    .chapter-title{
        margin: 0;
        max-width: 600px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
    }

    .el-divider--horizontal{
        margin-top: 6px;
    }

    .section-list-container{
        float: left;
        border-left: 1px solid rgb(223, 227, 233);
        width: 880px;
        margin-top: -9px;
        margin-left: 9px;
    }

    .section-box{
        margin-top: 18px;
        height: 36px;
        width: 850px;
        position: relative;
        top: 18px;
        left: 0px;
    }

    .section-branch{
        width: 48px;
        height: 36px;
        background: url("./branch.png") left center no-repeat;
        float: left;
    }

    .section-title-container{
        float: left;
        color: #333;
        width: 800px;
        height: 36px;
        line-height: 36px;
        background-color: #f9f9f9;
    }

    .section-number{
        margin: 0 25px 0 12px;
        float: left;
        display: inline-block;
    }

    .section-title{
        max-width: 600px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
    }

</style>