<!--登录模态框
暂时没用到-->
<template>
    <div class="modal-backdrop">
        <div class="modal" :style="mainStyles">
            <div class="modal-header">
                <h2>登录</h2>
            </div>
            <div class="modal-body">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input  v-model="form.password"></el-input >
                    </el-form-item>
                </el-form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-confirm" @click="onSubmit">确认</button>
                <button type="button" class="btn-close" @click="closeSelf">关闭</button>
            </div>
        </div>

    </div>
</template>



<script>
    import {HOST} from '../../common/js/config'
    import {saveUser} from '../../common/js/cache'
    export default {
        name: 'Modal',
        props: {

        },
        data() {
            return {
                form: {
                    userName: '',
                    userPassword: ''
                }
            }
        },
        methods: {
            closeSelf() {
                //调用父组件绑定的方法
                this.$emit("closeme");
            },
            onSubmit(){
                let url = `${HOST}/user/timelyLogin`;
                this.$ajax.post(url,this.form).then((res)=>{
                    let result = res.data
                    switch (result.code){
                        case 0: //成功
                            saveUser(result.object)
                            this.form.userName = '',
                                this.form.userPassword = '',
                                this.$emit("closeme");
                            break;
                        default: //失败
                            this.$message.error(result.msg)
                    }

                })

            }
        }
    }


</script>

<style scoped>
    .modal-backdrop {
        z-index: 9999;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0,0,0,.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal {
        background-color: #fff;
        box-shadow: 2px 2px 20px 1px;
        overflow-x:auto;
        display: flex;
        flex-direction: column;
        border-radius: 16px;
        width: 500px;
    }
    .modal-header {
        border-bottom: 1px solid #eee;
        color: #313131;
        justify-content: space-between;
        padding: 15px;
        display: flex;
    }
    .modal-footer {
        border-top: 1px solid #eee;
        justify-content: flex-end;
        padding: 15px;
        display: flex;
    }
    .modal-body {
        position: relative;
        padding: 20px 10px;
    }
    .btn-close, .btn-confirm {
        border-radius: 8px;
        margin-left:16px;
        width:56px;
        height: 36px;
        border:none;
        cursor: pointer;
    }
    .btn-close {
        color: #313131;
        background-color:transparent;
    }
    .btn-confirm {
        color: #fff;
        background-color: #2d8cf0;
    }


</style>