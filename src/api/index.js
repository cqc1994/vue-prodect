/************示例***********/
import{ request } from "@/api/axios";
export function demo(data){
    return request({
        url:'/user/vrVisit/hospital/list',
        method:'POST',
        data
    })
}
