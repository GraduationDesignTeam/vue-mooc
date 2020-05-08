<template>
    <div class="carousel-container">
        <div class="flex-box">
            <div class="left-panel">
                <el-carousel :interval="5000" indicator-position="none" @change="carouselChange" height="360px" ref="carousel">
                    <el-carousel-item v-for="(item,index) in carouselList" :key="index">
                        <img v-if="item.photo" class="img" @click="courseDetailHandle(item.id)" :src="`${path}/${item.photo}`">
                        <img v-else class="img" @click="courseDetailHandle(item.id)" :src="no_img">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="right-panel">
                <div class="list-div">
                    <ul>
                        <li v-for="(item,index) in carouselList" :key="index"
                            @click="carouselChange(index)" :class="{selected:index===activeIndex}">
                            {{item.name}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {HOST} from "../../../common/js/config";

    export default {
        name: "Carousel",
        props: ['carouselList'],
        data(){
            return{
                activeIndex:0,
                path: HOST,
                no_img: require("@/assets/no.png"),
                imgUrl: require("@/assets/course/course1.jpg")
            }
        },
        methods: {
            carouselChange(index){
                this.activeIndex = index;
                this.$refs.carousel.setActiveItem(index)
            },
            courseDetailHandle(id){
                //跳转到课程详情页面
                this.$router.push('/course/'+id)
            }
        }
    }
</script>

<style scoped>
    .carousel-container{
        display: flex;
        display: -webkit-flex;
        align-items:center;
        justify-content:center;
    }

    .flex-box{
        display: flex;
        display: -webkit-flex;
        align-items:center;
        justify-content:center;
        width: 1200px;
        height: 400px;
    }

    .left-panel{
        width: 638px;
        height: 360px;
    }

    .right-panel{
        width: 320px;
        height: 360px;
        background: #000;
        background: rgba(0,0,0,.5);
    }

    .list-div{
        position: relative;
        /*left: 8px;*/
    }

    .right-panel ul{
        list-style: none;
    }

    .right-panel ul li{
        color: rgb(184, 184, 184);
        cursor: pointer;
        margin: 1em 0;
    }

    .img{
        cursor: pointer;
        height: 360px;
    }

    .selected{
        color: #ffffff !important;
    }
</style>