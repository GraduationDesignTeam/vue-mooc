import storage from 'good-storage'

//定义存取用户信息的KEY
const USER_KEY = '__user'
//这义存取用户选取的购物车商品的KEY
const CART_KEY = '_cart'

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
 * 存储选中的购物车商品
 * @param obj
 */
export function saveCart(obj){
    storage.set(CART_KEY,obj)
}

/**
 * 取选中的购物车商品
 */
export function getCart(){
    return storage.get(CART_KEY,[])
}

/**
 * 清除选中的购物车商品
 */
export function clearCart(){
    storage.set(CART_KEY,[])
}
