<template>
    <!--临时首页-->
    <div class="app">
        <div class="nav">
            <NavMenu menuIndex='0'></NavMenu>
        </div>
        <div class="main">
            <div>
                <Carousel :carouselList="carouselList"></Carousel>
            </div>
            <div>
                <p class="title">推荐课程</p>
                <CourseCard :cardList="cardList"></CourseCard>
            </div>
        </div>
    </div>
</template>

<script>
    import NavMenu from "../../components/index/nav/NavMenu";
    import Carousel from "../../components/index/carousel/Carousel";
    import CourseCard from "../../components/index/card/CourseCard";
    export default {
        name: "test",
        components: {
            Carousel,
            NavMenu,
            CourseCard
        },
        data(){
            return{
                carouselList:[
                    {id:1, imgUrl: require("@/assets/index/temp1.png"), title: '2021考研数学一/三全程班'},
                    {id:1, imgUrl: require("@/assets/index/temp2.png"), title: '2021考研政治弟子班'},
                    {id:1, imgUrl: require("@/assets/index/temp3.png"), title: '词汇速记营: 从0暴涨到20000+'}
                ],
                cardList:[
                    {id:1, title: '计算机二级训练营', college: 'MOOC考培', imgUrl: require("@/assets/course/course1.jpg"), },
                    {id:2, title: '创新与创业管理', college: '南京邮电大学', imgUrl:require('@/assets/course/course2.jpg')},
                    {id:3, title: '计算机网络', college: '哈尔滨工业大学', imgUrl:require('@/assets/course/course3.jpg')},
                    {id:4, title: '会计学原理', college: '江西财经大学', imgUrl:require('@/assets/course/course4.jpg')},
                    {id:5, title: '走进中华优秀传统文化', college: '南京大学', imgUrl:require('@/assets/course/course5.jpg')},
                    {id:6, title: '营养与健康讲座', college: '南京大学', imgUrl:require('@/assets/course/course6.jpg')},
                    {id:7, title: '翻转课堂的教学方法', college: '北京大学', imgUrl:require('@/assets/course/course7.jpg')},
                    {id:8, title: '思维导图的教学应用', college: '爱课程', imgUrl:require('@/assets/course/course8.jpg')},
                ]
            }
        }
    }
</script>

<style scoped>

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
        top:64px;
        z-index: 1;
    }

    .title{
        margin-left: 64px;
        margin-bottom: 0;
        font-family: 微软雅黑, "Microsoft YaHei";
        font-size: 28px;
    }
</style>