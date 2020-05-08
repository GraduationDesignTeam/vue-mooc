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
    // import {HOST} from "../../common/js/config";
    import NavMenu from "../../components/index/nav/NavMenu";
    import Carousel from "../../components/index/carousel/Carousel";
    import CourseCard from "../../components/index/card/CourseCard";
    import {HOST} from "../../common/js/config";
    export default {
        name: "test",
        components: {
            Carousel,
            NavMenu,
            CourseCard
        },
        data(){
            return{
                carouselList: [],
                cardList: []
                // carouselList:[
                //     {id:1, imgUrl: require("@/assets/index/temp1.png"), name: '2021考研数学一/三全程班'},
                //     {id:1, imgUrl: require("@/assets/index/temp2.png"), name: '2021考研政治弟子班'},
                //     {id:1, imgUrl: require("@/assets/index/temp3.png"), name: '词汇速记营: 从0暴涨到20000+'}
                // ],
                // cardList:[
                //     {id:11, name: '计算机二级训练营', college: 'MOOC考培', imgUrl: require("@/assets/course/course1.jpg"), },
                //     {id:12, name: '创新与创业管理', college: '南京邮电大学', imgUrl:require('@/assets/course/course2.jpg')},
                //     {id:13, name: '计算机网络', college: '哈尔滨工业大学', imgUrl:require('@/assets/course/course3.jpg')},
                //     {id:14, name: '会计学原理', college: '江西财经大学', imgUrl:require('@/assets/course/course4.jpg')},
                //     {id:15, name: '走进中华优秀传统文化', college: '南京大学', imgUrl:require('@/assets/course/course5.jpg')},
                //     {id:16, name: '营养与健康讲座', college: '南京大学', imgUrl:require('@/assets/course/course6.jpg')},
                //     {id:17, name: '翻转课堂的教学方法', college: '北京大学', imgUrl:require('@/assets/course/course7.jpg')},
                //     {id:18, name: '思维导图的教学应用', college: '爱课程', imgUrl:require('@/assets/course/course8.jpg')},
                // ]
            }
        },
        created(){
            this.getData()
        },
        methods:{
            getData(){
                let carouse_url = `${HOST}/course/list_by_student_number`;
                this.$ajax.get(carouse_url).then(res=>{
                    this.carouselList = res.data;
                });
                let card_url = `${HOST}/course/list_by_create_time`;
                this.$ajax.get(card_url).then(res=>{
                    this.cardList = res.data;
                });
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
        top:60px;
        z-index: 1;
    }

    .title{
        margin-left: 64px;
        margin-bottom: 0;
        font-family: 微软雅黑, "Microsoft YaHei";
        font-size: 28px;
    }
</style>