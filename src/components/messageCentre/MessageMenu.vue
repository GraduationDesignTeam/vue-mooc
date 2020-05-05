<template>
    <div style="height: 100%">
        <!--  注：overflow: overlay;仅能在chrome浏览器生效  -->
        <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo"
                style="height: 100%; overflow-y: overlay;"
                @select="handleSelect">
            <el-menu-item index="1">
                <i class="el-icon-s-management"></i>
                <span slot="title">我收到的信息</span>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="el-icon-date"></i>
                <span slot="title">讨论区消息</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-tickets"></i>
                <span slot="title">系统消息</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-s-help"></i>
                <span slot="title">我发送的消息</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "MessageMenu",
        data(){
            return{
                activeIndex:'2'
            }
        },
        created() {
            this.loadData();
        },
        methods:{
            loadData(){
                let path = this.$route.path;
                switch (path.substring(15, path.lastIndexOf('/'))) {
                    case 'messageSelf':
                        this.activeIndex='1';
                        break;
                    case 'messageDiscussion':
                        this.activeIndex='2';
                        break;
                    case 'messageSystem':
                        this.activeIndex='3';
                        break;
                    case 'messageSend':
                        this.activeIndex='4';
                        break;
                    default:
                        this.activeIndex='1';
                        break;
                }
            },
            handleSelect(key){
                switch(key) {
                    case  '1':
                        //跳转到收到通知页面
                        this.$router.push("/messageCentre/messageSelf/" );
                        break;
                    case  '2':
                        //跳转到讨论区通知页面
                        this.$router.push("/messageCentre/messageDiscussion/" );
                        break;
                    case  '3':
                        //跳转到系统页面
                        this.$router.push("/messageCentre/messageSystem/" );
                        break;
                    case  '4':
                        //跳转到我发送的消息管理
                        this.$router.push("/messageCentre/messageSend/");
                        break;
                }
            }
        },
        watch:{
            // 监听路由变化，相应地改变侧边栏选中的项目
            '$route.path':function pathChange() {
                this.loadData();
            }
        }

    }
</script>

<style scoped>
    .content {
        margin-top: 20px;
    }
</style>