<template>
    <div>
        首页
        <p><el-button @click="personHomepage">个人主页</el-button></p>
    </div>
</template>

<script>
    export default {
        name: "Index",
        methods:{
            personHomepage(){
                this.$router.push("/personalHomepage")
            }
        }
    }
</script>

<style scoped>

</style>