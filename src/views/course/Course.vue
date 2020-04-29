<template>
    <div class="app">
        <div class="nav">
            <NavMenu menuIndex=''></NavMenu>
        </div>
        <div class="main">
            <div>
                <CourseInfo :course="course"></CourseInfo>
            </div>
        </div>
    </div>
</template>

<script>
    import CourseInfo from "../../components/course/CourseInfo";
    import {HOST} from "../../common/js/config";
    import {getUser} from "../../common/js/cache";
    import NavMenu from "../../components/index/nav/NavMenu";
    export default {
        name: "Course",
        components: {NavMenu,CourseInfo},
        data(){
            return{
                course: {
                    id: 0,
                    name: '',
                    type: '',
                    openTime: '2020/06/01',
                    closeTime: '2020/12/01',
                    photo: '',
                    intro: '',
                    detail: '',
                    target: '',
                    reference: '',
                    courseState: 1,
                    checkState: 1,
                    courseAuthority: 0,
                    teacherList:[],
                    role:0
                },
            }
        },
        created() {
            this.loadData();
        },
        methods:{
            loadData(){
                this.path=HOST;
                let courseId = this.$route.params.id;
                let url = `${HOST}/course/sel/${courseId}`;
                let param = new URLSearchParams();
                param.append('userId', getUser().userId);
                this.$ajax.post(url, param).then((res)=> {
                    this.course = res.data;
                })
            }
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

    .main{
        height: auto;
        background-color: #F5F5F5;
        position: relative;
        top:60px;
        z-index: 1;
    }

</style>