import {CHECK_AUTH, SET_QUERY} from '../constants'

//检查权限
export const checkAuth = hasAuth => ({type: CHECK_AUTH, hasAuth})
//设置参数
export const setPageQuery = query => ({type: SET_QUERY, query})
