<template>
    <div>
        <div class="nav">
            <NavMenu menuIndex='0'></NavMenu>
        </div>
        <div class="back1">
            <div class="wrap">
                <el-row :gutter="24">
                    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">
                        <el-form ref="form" :model="form" label-width="80px" style="text-align: center;width: 350px;margin-top: 50px">
                            <el-form-item label="用户名">
                                <el-input v-model="form.userName"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="form.userPassword"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="warning" plain @click="onSubmit" style="border-color: #eeeeee">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
                </el-row>
            </div>
        </div>
    </div>

</template>

<script>
    import NavMenu from "../../components/index/nav/NavMenu";
    import {HOST} from '../../common/js/config'
    import {saveUser} from '../../common/js/cache'
    export default {
        name: "Login",
        components: {
            NavMenu,
        },
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
            administrator(){
                this.$router.push("/administrator")
            },
            onSubmit(){
                let url=`${HOST}/user/timelyLogin`
                this.$ajax.post(url,this.form).then((res)=>{
                    let result = res.data
                    if(result.code===0){//登录成功
                        this.user=result.object
                        saveUser(this.user)
                        if(this.user.userStatus==="000"){
                            this.administrator()
                        }else{
                            this.personHomepage()
                        }
                    } else{//失败
                        this.$message(result.msg)
                    }
                })
            },
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
    .back1{
        height: 600px;
        background: url("header.jpg") 0 0 no-repeat;
        background-size: 100% 100%;
    }
    .wrap{
        margin-top: 62px;
    }
    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .el-icon-share{
        margin-bottom: 30px;
        font-size: 30px;
        color: cornflowerblue;
    }

</style>