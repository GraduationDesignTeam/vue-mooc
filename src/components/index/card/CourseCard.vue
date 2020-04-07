<template>
    <div class="card-container">
        <el-row>
            <el-col :span="4" v-for="(item, index) in cardList" :offset="(index%4===0)?1:2" :key="index">
                <el-card :body-style="{ padding: '0px' }" class="card" @click="courseDetailHandle(item.id)">
                    <div v-if="item.imgUrl" style="display:table; width: 100%">
                        <div>
                            <img class="card-image" :src="item.imgUrl">
                        </div>
                    </div>
                    <div style="margin-left: 16px">
                        <h3 class="card-title">{{item.title}}</h3>
                        <p class="card-college">{{item.college}}</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "CourseCard",
        props: ['cardList'],
        /*
        data(){
            return{
                cardList:[
                    {title: '计算机二级训练营',  college: 'MOOC考培', url:'/', imgUrl: require("@/assets/course/course1.jpg"),},
                    {title: '创新与创业管理',  college: '南京邮电大学', url:'/', imgUrl:require('@/assets/course/course2.jpg')},
                    {title: '计算机网络',  college: '哈尔滨工业大学', url:'/', imgUrl:require('@/assets/course/course3.jpg')},
                    {title: '会计学原理',  college: '江西财经大学', url:'/', imgUrl:require('@/assets/course/course4.jpg')},
                    {title: '走进中华优秀传统文化',  college: '南京大学', url:'/', imgUrl:require('@/assets/course/course5.jpg')},
                    {title: '营养与健康讲座',  college: '南京大学', url:'/', imgUrl:require('@/assets/course/course6.jpg')},
                    {title: '翻转课堂的教学方法',  college: '北京大学', url:'/', imgUrl:require('@/assets/course/course7.jpg')},
                    {title: '思维导图的教学应用',  college: '爱课程', url:'/', imgUrl:require('@/assets/course/course8.jpg')},
                ]
            }
        }
        */
        methods:{
            courseDetailHandle(id){
                //跳转到课程详情页面                //跳转到课程详情页面
                this.$router.push('/course/'+id)
            }
        }
    }
</script>

<style scoped>
    .card{
        text-align:left;
        margin: 24px 0;
        cursor: pointer;
    }

    .card-image{
        width: 100%;
        display: block;
    }

    .card-title{
        font-size:16px;
        font-weight:600;
    }

    .card-college{
        color:rgb(153, 153, 153);
        font-size: 14px;
        margin: 0.75em 0;
    }
</style>