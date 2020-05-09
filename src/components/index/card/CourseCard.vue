<template>
    <div class="card-container">
        <el-row>
            <el-col :span="4" v-for="(item, index) in cardList" :offset="(index%4===0)?1:2" :key="index">
                <el-card :body-style="{ padding: '0px' }" class="card">
                    <div @click="courseDetailHandle(item.id)">
                        <div style="display:table; width: 100%">
                            <div>
                                <img v-if="item.photo" class="card-image" :src="`${path}/${item.photo}`">
                                <img v-else style="height: 150px;" :src="no_img">
                            </div>
                        </div>
                        <div style="margin-left: 16px">
                            <h3 class="card-title">{{item.name}}</h3>
                            <p class="card-college">{{item.school}}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {HOST} from "../../../common/js/config";

    export default {
        name: "CourseCard",
        props: ['cardList'],
        data(){
            return{
                path: HOST,
                no_img: require("@/assets/no.png")
            }
        },
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