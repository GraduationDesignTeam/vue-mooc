<template>
    <div>
        首页
        <!--开发时用于打开个人主页-->
        <p><el-button @click="personHomepage">个人主页</el-button></p>
        <!--开发时临时用于登录-->
        <div class="wrap">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.userPassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {HOST} from '../../common/js/config'
    import {saveUser} from '../../common/js/cache'

    export default {
        name: "Index",
        data(){
            return{
                form:{
                    userName:'',
                    userPassword:'',
                },
                user:{

                }
            }
        },
        methods:{
            personHomepage(){
                this.$router.push("/personalHomepage")
            },
            onSubmit(){
                let url=`${HOST}/user/timelyLogin`
                this.$ajax.post(url,this.form).then((res)=>{
                    let result = res.data
                    if(result.code===0){//登录成功
                        this.user=result.object
                        saveUser(this.user)
                        this.personHomepage()
                    } else{//失败
                        this.$message(result.msg)
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>