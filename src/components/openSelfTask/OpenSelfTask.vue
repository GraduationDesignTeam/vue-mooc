<template>
    <div >
        <Top :index="activeIndex"></Top>
    </div>
</template>

<script>
    import Top from "../personalTop/Top";

    export default {
        name: "OpenSelfTask",
        components:{
            Top

        },
    }
</script>

<style scoped>

</style>