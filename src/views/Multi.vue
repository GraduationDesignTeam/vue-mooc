<template>
    <div>
        <div class="edit_container">
            <quill-editor
                    v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
            </quill-editor>
            <el-button type="primary" @click="submit">发布</el-button>
        </div>
    </div>
</template>

<script>
    import {addQuillTitle} from "../common/js/quli-editor";
    import * as Quill from 'quill' //引入编辑器
    let fonts = ['SimSun', 'SimHei','Microsoft-YaHei','KaiTi','FangSong','Arial','Times-New-Roman','sans-serif'];
    let sizes = ['12px', '14px', '16px' ,'18px', '22px', '26px', '30px', '36px', '42px'];
    export default {
        name: 'App',
        data(){
            return {
                content: `<h3>公告</h3>`,
                editorOption: {
                    modules:{
                        toolbar:[
                            [{ 'font': fonts }],  //字体
                            [{ 'size': ['12px', '14px', '16px' ,'18px', '22px', '26px', '30px', '36px', '42px'] }],  //字体大小
                            ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
                            ['blockquote', 'code-block'],  //引用，代码块
                            [{ 'header': 1 }, { 'header': 2 }],  // 标题，键值对的形式；1、2表示字体大小
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],  //列表
                            [{ 'script': 'sub'}, { 'script': 'super' }], // 上下标
                            [{ 'indent': '-1'}, { 'indent': '+1' }],  // 缩进
                            [{ 'direction': 'rtl' }],    // 文本方向
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],  //几级标题
                            [{ 'color': [] }, { 'background': [] }],  // 字体颜色，字体背景颜色
                            [{ 'align': [] }], //对齐方式
                            ['clean'], //清除字体样式
                            ['image'], //上传图片
                            // ['video'] //上传视频
                        ]
                    },
                    theme:'snow'
                }
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
        },
        mounted() {
            let Font = Quill.import('formats/font');
            Font.whitelist = fonts; //将字体加入到白名单
            let Size = Quill.import('formats/size');
            Size.whitelist.push(...sizes);
            addQuillTitle();
        },
        methods: {
            onEditorReady() { // 准备编辑器
            },
            onEditorBlur(){}, // 失去焦点事件
            onEditorFocus(){}, // 获得焦点事件
            onEditorChange(){}, // 内容改变事件
            submit(){
                console.log(this.content);
            }
        }
    }
</script>

<style scoped>
    @import '../common/style/font.css';
</style>