import storage from 'good-storage'

//定义存取用户信息的KEY
const USER_KEY = '__user'
//定义存取课程信息的KEY（用于新建课程时保存草稿）
const COURSE_KEY = '__course'


/**
 * 存储用户信息
 * @param obj
 */
export function saveUser(obj){
    storage.set(USER_KEY,obj)
}

/**
 * 取用户信息
 */
export function getUser(){
    return storage.get(USER_KEY,{})
}

/**
 * 清除用户信息
 */
export function clearUser(){
    storage.set(USER_KEY,{})
}

/**
 * 存储课程信息
 * @param obj
 */
export function saveCourse(obj){
    storage.set(COURSE_KEY,obj)
}

/**
 * 取课程信息
 */
export function getCourse(){
    return storage.get(COURSE_KEY,{})
}

/**
 * 清除课程信息
 */
export function clearCourse(){
    storage.set(COURSE_KEY,{})
}
