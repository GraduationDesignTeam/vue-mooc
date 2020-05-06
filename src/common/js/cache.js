import storage from 'good-storage'

//定义存取用户信息的KEY
const USER_KEY = '__user';
//定义存取课程草稿的KEY（用于新建课程时保存草稿）
const COURSE_DRAFT_KEY = '__course_draft';
//定义存取课程草稿的KEY（用于新建课程时保存草稿）
const COURSE_KEY = '__course';
//定义存取课件的KEY（用于编辑课件）
const COURSE_WARE_KEY = '__course_ware';

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
 * 存储课程草稿
 * @param obj
 */
export function saveCourseDraft(obj){
    storage.set(COURSE_DRAFT_KEY,obj)
}

/**
 * 取课程草稿
 */
export function getCourseDraft(){
    return storage.get(COURSE_DRAFT_KEY,{})
}

/**
 * 清除课程草稿
 */
export function clearCourseDraft(){
    storage.set(COURSE_DRAFT_KEY,{})
}

/**
 * 存储课程
 * @param obj
 */
export function saveCourse(obj){
    storage.set(COURSE_KEY,obj)
}

/**
 * 取课程
 */
export function getCourse(){
    return storage.get(COURSE_KEY,{})
}

/**
 * 清除课程
 */
export function clearCourse(){
    storage.set(COURSE_KEY,{})
}

/**
 * 存课件
 * @param obj
 */
export function saveCourseWare(obj){
    storage.set(COURSE_WARE_KEY,obj)
}

/**
 * 取课件
 */
export function getCourseWare(){
    return storage.get(COURSE_WARE_KEY,{})
}
