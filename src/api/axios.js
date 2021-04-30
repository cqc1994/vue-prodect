/**
 *封装axios 方便使用 增加接口防抖处理 是否显示loading 是否使用公共错误提示
* */
import axios from 'axios'
import { ElLoading,ElMessage } from 'element-plus'
const loading = { //loading加载对象
    loadingInstance: null,
    //打开加载
    open(){
        if(this.loadingInstance===null){ // 如果实例 为空，则创建
            this.loadingInstance=ElLoading.service({
                text:'加载中...', //加载图标下的文字
                spinner: 'el-icon-loading', //加载图标
                background:'rgba(0, 0, 0, 0.5)', //背景色
                customClass:'loading' //自定义样式的类名
            })
        }
    },
    //关闭加载
    close(){
        // 不为空时, 则关闭加载窗口
        if(this.loadingInstance !== null) {
            this.loadingInstance.close()
        }
        this.loadingInstance = null
    }
}

// 环境的切换
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = '/api';}
else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = 'https://www.ceshi.com';
}
else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'https://www.production.com';
}

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求队列
const queue = []
// axios内置的中断ajax的方法
const cancelToken = axios.CancelToken
// 同样的url、方法、参数可以视为相同的请求
const token = config => {
    return `${config.url}_${config.method}_${config.data}`
}
// 中断重复的请求，并从队列中移除
const removeQueue = config => {
    for (let i = 0, size = queue.length; i < size; i++) {
        const task = queue[i]
        if (task.token === token(config) && (token(config).indexOf('order/warehouseInfo/query') == -1) || (task.token.indexOf('trader/findClientAllList/select') != -1 && token(config).indexOf('trader/findClientAllList/select') != -1)) {
            task.cancel()
            queue.splice(i, 1)
            break
        }
    }
}

//请求拦截
axios.interceptors.request.use(config=>{
    removeQueue(config) // 中断之前的同名请求---这是axios的防抖处理  防止用户多次点击的情况下产生的多次请求的问题
    // 添加cancelToken
    config.cancelToken = new cancelToken(c => {
        queue.push({token: token(config), cancel: c})
    })

    //一定要将config return 出去
    return config
})
//响应拦截
axios.interceptors.response.use(response=>{
    console.log(1111,response) //建议打印一下 有些后台返回回来的数据格式不同  可根据自己的数据格式进行调整
    removeQueue(response.config)
    return response
},error => {
    return Promise.reject(error)
})
const http = axios.create()
export const request = (data,showError = true,Loading = true)=>{
    if (Loading){
        loading.open() //打开加载窗口
    }
    return http(data).then(response=>{
        if (Loading){
            loading.close() //关闭加载窗口
        }
        //成功的返回
        if(response.status===200){ //状态码
            switch (response.data.code) {
                case '200': //系统交易成功
                    return Promise.resolve(response.data); //将data中需要的数据返回  可根据自己项目中的数据格式进行调整
                case '401': //登录失效
                    break
                default:
                    if (showError){
                        ElMessage({
                            message: '接口异常',//这里可以根据后段接口优化成具体错误信息
                            type:'error',
                            duration:5000
                        })
                    }
                    return Promise.resolve(response.data)
            }

        }else{
            //错误提示
            ElMessage({
                message: '接口异常',//这里可以根据后段接口优化成具体错误信息
                type:'error',
                duration:5000
            })
        }
    })

}
// export default request()
// export default axios.create()

