/**
 * Created by Administrator on 2017/5/23.
 */
//转换mysql的datetime日期时间格式
function makeDate(date) {
    try {
        let newDate = new Date(date);
        //在小于10的月份前补0
        let month = eval(newDate.getMonth() + 1) < 10 ? '0'+eval(newDate.getMonth() + 1) : eval(newDate.getMonth() + 1);
        //在小于10的日期前补0
        let day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
        //在小于10的小时前补0
        let hours = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();
        //在小于10的分钟前补0
        let minutes = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();
        //在小于10的秒数前补0
        let seconds = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds(): newDate.getSeconds();
        //拼接时间
        return newDate.getFullYear() + '-' + month + '-' + day + " " + hours + ":" + minutes + ":" + seconds;
    }catch(e){
        return "0000-00-00 00:00:00";
    }

}

function makeSimpleDate(date) {
    try {
        let newDate = new Date(date);
        //在小于10的月份前补0
        let month = eval(newDate.getMonth() + 1) < 10 ? '0'+eval(newDate.getMonth() + 1) : eval(newDate.getMonth() + 1);
        //在小于10的日期前补0
        let day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
        //拼接时间
        return newDate.getFullYear() + '-' + month + '-' + day;
    }catch(e){
        return "0000-00-00";
    }
}

export{
    //dateDiff,
    makeDate,
    makeSimpleDate
}
