<template>
    <div class="wrap">
        <div class="bread">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/administrator/manageUserProhibit' }">管理员主页</el-breadcrumb-item>
                <el-breadcrumb-item>课程管理</el-breadcrumb-item>
                <el-breadcrumb-item><span style="color: #2d8cf0">数据统计</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="24">
            <el-col :span="17">
                <div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <el-dropdown  @command="handleCommand" size="mini" split-button type="primary" style="float: right;margin-top: 30px">
                            请选择年份
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="2020">2020</el-dropdown-item>
                                <el-dropdown-item command="2019">2019</el-dropdown-item>
                                <el-dropdown-item command="2018">2018</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <div class="bar" ref="myChart"></div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <strong style="font-size: 16px;margin-left: 20px"><i class="el-icon-s-help"></i> 课程热度榜</strong>
                        <p></p>
                        <span style="margin-left: 10px;font-size: 14px;color: darkcyan"><i class="el-icon-trophy" style="color: gold;margin-right: 20px"></i>{{courses[0]}}</span>
                        <p></p>
                        <span style="margin-left: 10px;font-size: 14px;color: darkcyan"><i class="el-icon-trophy" style="color: silver;margin-right: 20px"></i>{{courses[1]}}</span>
                        <p></p>
                        <span style="margin-left: 10px;font-size: 14px;color: darkcyan"><i class="el-icon-trophy" style="color: #339933;margin-right: 20px"></i>{{courses[2]}}</span>
                        <p></p>
                        <span style="margin-left: 44px;font-size: 14px;color: darkcyan">{{courses[3]}}</span>
                        <p></p>
                        <span style="margin-left: 44px;font-size: 14px;color: darkcyan">{{courses[4]}}</span>
                        <p></p>
                        <span style="margin-left: 44px;font-size: 14px;color: darkcyan">{{courses[5]}}</span>
                        <p></p>
                        <span style="margin-left: 44px;font-size: 14px;color: darkcyan">{{courses[6]}}</span>
                        <p></p>
                        <span style="margin-left: 44px;font-size: 14px;color: darkcyan">{{courses[7]}}</span>
                        <p></p>
                        <span style="margin-left: 44px;font-size: 14px;color: darkcyan">{{courses[8]}}</span>
                        <p></p>
                        <span style="margin-left: 44px;font-size: 14px;color: darkcyan">{{courses[9]}}</span>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {HOST} from '../../common/js/config'
    import echarts from 'echarts'
    export default {
        name: "ManageCourseStatistic",
        data(){
            return{
                records: [],
                months: [],
                fees: [],
                increaseRate:'',
                formInline:{
                    year: '2020',
                    major: '',
                    month:'',
                },
                courseRank:[],
                courses:[],
                nums:[],
            }
        },
        mounted(){
            this.drawLine();
            this.getCourseRank()
        },
        methods:{
            getCourseRank(){
                let url=`${HOST}/course/courseRank/${this.formInline.year}`
                this.$ajax.get(url).then((res)=>{
                    this.courseRank=res.data
                    this.courseRank.forEach((item)=>{
                        this.courses.push(item.courseName)
                        this.nums.push(item.popularity)
                    })
                    console.log(this.courseRank)
                })
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(this.$refs.myChart)
                this.drawChart(myChart);
                myChart.showLoading();// 加载动画
                let path = `${HOST}/course/majorRank/${this.formInline.year}`
                this.$ajax.get(path).then((res)=>{
                    this.records = res.data
                    //console.log(this.records)
                    this.records.forEach((item)=>{
                        this.months.push(item.major) //构造x轴数据
                        this.fees.push(item.num) //构造y轴数据
                    })
                    myChart.hideLoading();
                    // 填入数据
                    myChart.setOption({
                        xAxis: {
                            data: this.months
                        },
                        series: [{
                            name: '课程数',
                            data: this.fees
                        }]
                    });
                })

            },
            drawChart(myChart) {

                //指定图表配置项和数据
                var option = {
                    //标题
                    title : {
                        text : `${this.formInline.year}年课程专业分布`,
                        left : 50,//距离左边的像素值
                        borderColor : '#ff4b2d',
                        borderWidth : 1

                    },
                    color: ['#ed0c1b'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    //工具箱
                    toolbox:{
                        show:true,
                        feature:{
                            saveAsImage:{
                                show:true
                            },
                            dataView:{
                                show:true
                            },
                            restore:{
                                show:true
                            },
                            dataZoom:{
                                show:true
                            },
                            magicType:{
                                type:['bar','line']
                            }
                        }
                    },
                    //图例
                    legend:{
                        data:['金额']
                    },
                    //x轴
                    xAxis : {
                        type : 'category',
                        data : [],
                        axisLabel:{
                            interval:0,//全部显示x轴
                            rotate:-30//-30度倾斜显示
                        },
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    //y轴
                    yAxis : {
                        type : 'value'
                    },
                    //数据
                    series : {
                        name : '金额',
                        type : 'bar',//柱状图
                        data : []
                    },
                };
                myChart.setOption(option);
            },
            handleCommand(command) {
                this.records=[]
                this.months=[]
                this.fees=[]
                this.increaseRate=''
                this.formInline.year=command
                this.drawLine();
            }
        }
    }
</script>

<style scoped>
    .bread{
        margin-bottom: 20px;
    }
    .wrap {
        margin: 10px 0 0 10px;
        padding: 10px;
    }

    .wrap .bar{
        margin-top: 10px;
        width:500px;
        height:400px;
    }
</style>