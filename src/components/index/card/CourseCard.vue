<template>
    <div class="card-container">
        <el-row>
            <el-col :span="4" v-for="(item, index) in cardList" :offset="(index%4===0)?1:2" :key="index">
                <el-card :body-style="{ padding: '0px' }" class="card">
                    <div @click="courseDetailHandle(item.id)">
                        <div v-if="item.imgUrl" style="display:table; width: 100%">
                            <div>
                                <img class="card-image" :src="item.imgUrl">
                            </div>
                        </div>
                        <div style="margin-left: 16px">
                            <h3 class="card-title">{{item.name}}</h3>
                            <p class="card-college">{{item.college}}</p>
                        </div>
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
                    {id:1, name: '计算机二级训练营', college: 'MOOC考培', imgUrl: require("@/assets/course/course1.jpg"), },
                    {id:2, name: '创新与创业管理', college: '南京邮电大学', imgUrl:require('@/assets/course/course2.jpg')},
                    {id:3, name: '计算机网络', college: '哈尔滨工业大学', imgUrl:require('@/assets/course/course3.jpg')},
                    {id:4, name: '会计学原理', college: '江西财经大学', imgUrl:require('@/assets/course/course4.jpg')},
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