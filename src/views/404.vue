<template>
    <div>
        <div class="page-container">
            <h1>很抱歉，你要访问的页面不存在！</h1>
            <strong>你可以尝试以下操作：</strong>
            <ul>
                <li>检查网址是否正确</li>
                <li><b>{{count}}</b>秒后回到<a href="/">网站首页</a>，重新搜索您需要浏览的内容。</li>
            </ul>
        </div>
    </div>

</template>

<script>
    export default {
        name: "NotFound",
        data(){
          return {
              count:3,
          }
        },
        mounted() {
            setInterval(this.timeGo, 1000);
        },
        methods: {
            timeGo(){
                this.count--;
                if(this.count === 0)
                    this.$router.push("/");
            }
        }
    }
</script>

<style scoped>
    .page-container{
        width:600px;
        margin:0 auto;
        padding:50px 0;
        font-size:16px;
    }
    .page-container h1 {
        font-size:18px;
        line-height:2em;
    }

    .page-container ul li {
        list-style:decimal;
        margin: 20px 0 20px 28px;
    }
</style>