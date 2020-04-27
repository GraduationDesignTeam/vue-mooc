<template>
    <div>
        <Top class="top-head"></Top>
        <MessageMenu ></MessageMenu>
    </div>
</template>

<script>
    import Top from '../personalTop/Top.vue'
    import MessageMenu from './MessageMenu'
    export default {
        name: "MessageCentre" ,
        components:{
            Top,
            MessageMenu

        },
    }
</script>

<style scoped>

</style>