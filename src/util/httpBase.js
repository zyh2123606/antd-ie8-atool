import Axios from 'axios'
import qs from 'qs'
import { Message } from 'antd'

/**
 * ajax请求基类
 * 
 * @class HttpBase
 */
class HttpBase {
    constructor(base_url){
        const cancelToken = Axios.CancelToken
        this.source = cancelToken.source()
        this.$http = Axios.create({baseURL: base_url})
        this.dataMethodDefault = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            withCredentials: true,
            //transformRequest: [data => qs.stringify(data)],
            timeout: 30000
        }
        //添加拦截器，提前处理返回的数据
        this.$http.interceptors.response.use(response => {
            return response.data
        }, err => {
            if (err && err.response) {
                switch (err.response.status) {
                    case 400: err.message = '请求错误'
                        break
                    case 401: err.message = '未授权，请登录'
                        break
                    case 403: err.message = '拒绝访问'
                        break
                    case 404: err.message = `请求地址出错: ${err.response.config.url}`
                        break
                    case 408:
                        err.message = '请求超时'
                        break
                    case 500: err.message = '服务器内部错误'
                        break
            
                    case 501: err.message = '服务未实现'
                        break
                    case 502: err.message = '网关错误'
                        break
                    case 503: err.message = '服务不可用'
                        break
                    case 504: err.message = '网关超时'
                        break
                    case 505: err.message = 'HTTP版本不受支持'
                        break
                    default:
                }
            }
            Message.warning(err.message)
        })
    }
    /**
     * get 请求
     * 
     * @param {any} url 请求地址
     * @param {any} [config={}] 参数
     * @returns 
     * @memberof HttpBase
     */
    get(url, config = {}){
        return this.$http.get(url, {...this.dataMethodDefault, ...config})
    }
    /**
     * pos请求
     * 
     * @param {any} url 请求地址
     * @param {any} [data=undefined] 携带的数据
     * @param {any} config 参数
     * @returns 
     * @memberof HttpBase
     */
    post(url, data=undefined, config={}){
        return this.$http.post(url, data, {...this.dataMethodDefault, ...config})
    }
    /**
     * 主要用于更新
     * 
     * @param {any} url 请求地址
     * @param {any} [data=undefined] 携带的数据
     * @param {any} config 参数
     * @returns 
     * @memberof HttpBase
     */
    put(url, data=undefined, config={}){
        return this.$http.put(url, data, { ...this.dataMethodDefault, ...config })
    }
    /**
     * 删除
     * 
     * @param {any} url 请求地址
     * @param {any} [config={}] 参数
     * @returns 
     * @memberof HttpBase
     */
    delete(url, config={}){
        return this.$http.delete(url, { ...this.dataMethodDefault, ...config })
    }
    /**
     * 取消请求
     */
    cancel(){
        return this.source.cancel()
    }
}

export default HttpBase