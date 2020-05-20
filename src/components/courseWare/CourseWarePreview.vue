<template>
    <div>
        <div>
            <div style="position: relative; height: 60px;">
                <p class="pull-left title">课件：
                    <span>{{title}}</span>
                </p>
                <div class="pull-right title-button">
                    <el-button style="margin-right: 30px" type="primary" icon="el-icon-download" @click="download"
                               title="请在新的标签页内右键保存！">下载</el-button>
                    <el-button icon="el-icon-back" @click="goBack">返回</el-button>
                </div>
                <div style="clear: both"></div>
            </div>
        </div>
        <el-divider></el-divider>
        <div class="video-box" v-if="type==='视频'">
            <VideoPreview></VideoPreview>
        </div>
        <div class="image-box" v-else-if="type==='图片'">
            <div class="cell">
                <img :src="src" style="" />
            </div>
        </div>
        <iframe :src="src" v-else-if="type==='PDF文件'" style="width: 1250px; height: 800px;"></iframe>
        <p style="font-size:22px" v-else>非常抱歉，当前文件并不支持预览</p>
    </div>
</template>

<script>
    import {COURSE_WARE_HOST} from "../../common/js/config";
    import {getCourseWare} from "../../common/js/cache";
    import VideoPreview from "./VideoPreview";
    export default {
        name: "CourseWarePreview",
        components: {VideoPreview},
        data(){
            return{
                path: "",
                title: "",
                name: "",
                type: "",
                ext: "",
                src: ""
            }
        },
        mounted() {
            // this.path = COURSE_WARE_HOST;
            this.title = getCourseWare().title;
            this.name = getCourseWare().name;
            this.type = getCourseWare().type;
            this.ext = this.name.lastIndexOf('.')!==-1?this.name.substring(this.name.lastIndexOf('.')+1):'';
            this.src = `${COURSE_WARE_HOST}/${this.name}`;
        },
        methods:{
            goBack(){
                // 回到课件管理页
                this.$router.push(`/courseManage/courseWare/${getCourseWare().courseId}`);
            },
            download(){
                // 下载课件， 在新弹出的标签页右键保存！
                this.$message({type:'success', message:'如有新的标签页弹出，请右键保存资源！'});
                let newName = this.ext!==''?(this.title+'.'+this.ext):this.title;
                window.open(`${COURSE_WARE_HOST}/course_ware/download/${this.name}?newName=${newName}`);
                // window.open(`${COURSE_WARE_HOST}/CourseWare/${this.name}`);
                // let a = document.createElement("a");
                // a.href = `${COURSE_WARE_HOST}/CourseWare/${this.name}`;
                // a.download = `${this.title}.${this.ext}`;
                // a.click();
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
    .video-box{
        width: 1200px;
    }
    .image-box{
        display: flex !important;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    img{
        width: 776px;
    }
</style>