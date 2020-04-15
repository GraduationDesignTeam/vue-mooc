<template>
    <div>
        <el-card v-for="item in courseList" :key="item.id"
                 :body-style="{ padding: '10px' }" shadow="hover" class="card">
            <div @click="handleCourse(item.id)" style="height: 160px">
                <div v-if="item.imgUrl" style="float: left; position: relative">
                    <div>
                        <img class="card-image" :src="item.imgUrl">
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
                    <p class="card-info" v-if="item.openTime&&item.closeTime">{{item.openTime}}&nbsp;-&nbsp;{{item.closeTime}}</p>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "CourseList",
        // 传入参数 courseList-课程列表 mode-指定该组件内点击课程后跳转的页面
        props:["courseList", "mode"],
        methods:{
            handleCourse(id){
                switch (this.mode) {
                    case 0:
                        this.$route.push('/course/'+id);
                        break;
                    case 1:
                        this.$route.push('/teacher/manage_course/'+id);
                        break;
                }
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