<template>
    <div>
        <el-card v-for="item in courseList" :key="item.id"
                 :body-style="{ padding: '10px' }" shadow="hover" class="card">
            <div @click="handleCourse(item.id)" style="height: 160px">
                <div style="float: left; position: relative">
                    <div>
                        <img v-if="item.photo" class="card-image" :src="`${path}/${item.photo}`">
                        <img v-else style="height: 150px;" :src="no_img">
                    </div>
                </div>
                <div style="margin-left: 280px">
                    <h3 class="card-title">{{item.name}}</h3>
                    <p class="card-info">
                        <span style="margin-right: 28px">{{item.college}}</span>
                        <span v-for="(teacher,index) in item.teacherList" :key="index">
                            {{teacher}}
                            <span v-if="index!==item.teacherList.length-1">、</span>
                            &nbsp;
                        </span>
                    </p>
                    <p class="card-intro">{{item.intro}}</p>
                    <p class="card-info" v-if="item.openTime&&item.closeTime">
                        {{convertDate(item.openTime)}}&nbsp;~&nbsp;{{convertDate(item.closeTime)}}
                    </p>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {HOST} from "../../common/js/config";
    import {convertDate} from "../../common/js/dateformat";

    export default {
        name: "CourseList",
        // 传入参数 courseList-课程列表 mode-指定该组件内点击课程后跳转的页面
        props:["courseList", "mode"],
        data(){
            return{
                path: HOST,
                no_img: require("@/assets/no.png")
            }
        },
        methods:{
            handleCourse(id){
                switch (this.mode) {
                    case 0:
                        this.$router.push('/course/'+id);
                        break;
                    case 1:
                        this.$router.push('/courseManage/courseInfo/'+id);
                        break;
                }
            },
            convertDate(date){
                return convertDate(date);
            }
        }
    }
</script>

<style scoped>
    .card{
        cursor: pointer;
        margin: 20px 0;
    }

    .card-image{
        width: 265px;
        height: 150px;
        display: block;
    }

    .card-title{
        font-size:18px;
        font-weight:600;
    }

    .card-info{
        color:rgb(153, 153, 153);
        font-size: 14px;
        white-space: pre;
    }

    .card-intro{
        font-size: 16px;
        line-height: 22px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>