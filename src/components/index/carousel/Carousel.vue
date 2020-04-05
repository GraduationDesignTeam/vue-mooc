<template>
    <div class="carousel-container">
        <div class="flex-box">
            <div class="left-panel">
                <el-carousel :interval="5000" indicator-position="none" @change="carouselChange" height="360px" ref="carousel">
                    <el-carousel-item v-for="(item,index) in carouselList" :key="index">
                        <img v-bind:src="item.imgUrl">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="right-panel">
                <div class="list-div">
                    <ul>
                        <li v-for="(item,index) in carouselList" :key="index"
                            @click="carouselChange(index)" :class="{selected:index===activeIndex}">
                            {{item.title}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Carousel",
        data(){
            return{
                activeIndex:0,
                carouselList:[
                    {imgUrl: require("@/assets/index/temp1.png"), title: '2021考研数学一/三全程班'},
                    {imgUrl: require("@/assets/index/temp2.png"), title: '2021考研政治弟子班'},
                    {imgUrl: require("@/assets/index/temp3.png"), title: '词汇速记营: 从0暴涨到20000+'}
                ]
            }
        },
        methods: {
            carouselChange(index){
                this.activeIndex = index;
                this.$refs.carousel.setActiveItem(index)
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
        width: 776px;
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
        left: 8px;
    }

    .right-panel ul{
        list-style: none;
    }

    .right-panel ul li{
        color: rgb(184, 184, 184);
        cursor: pointer;
        margin: 1em 0;
    }

    .selected{
        color: #ffffff !important;
    }
</style>