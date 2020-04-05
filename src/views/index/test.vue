<template>
    <!--临时主页-->
    <div class="test">
        <div class="nav">
            <NavMenu menuIndex='0'></NavMenu>
        </div>
        <div class="main">
            <div>
                <Carousel></Carousel>
            </div>
            <div v-for="i in 50" :key="i">
                {{i}}
            </div>
        </div>

        <!--下面放课程卡片-->
    </div>
</template>

<script>
    import NavMenu from "../../components/index/nav/NavMenu";
    import Carousel from "../../components/index/carousel/Carousel";
    export default {
        name: "test",
        components: {
            Carousel,
            NavMenu,
        },
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
    .test{
        background-color: #F5F5F5;
        height: 100%;
    }

    .nav{
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 100;
    }

    .main{
        position: relative;
        top:64px;
        z-index: 1;
    }
</style>