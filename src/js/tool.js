/**
 * 深度克隆方法 会在vue上进行挂载，使用方法this.$deepCopy(obj)
 **/
const deepCopy = (obj, cache = []) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    const objType = Object.prototype.toString.call(obj).slice(8, -1);

    // 考虑 正则对象的copy
    if (objType === 'RegExp') {
        return new RegExp(obj);
    }

    // 考虑 Date 实例 copy
    if (objType === 'Date') {
        return new Date(obj);
    }

    // 考虑 Error 实例 copy
    if (objType === 'Error') {
        return new Error(obj);
    }

    const hit = cache.filter((c) => c.original === obj)[0];

    if (hit) {
        return hit.copy;
    }

    const copy = Array.isArray(obj) ? [] : {};

    cache.push({original: obj, copy});

    Object.keys(obj).forEach((key) => {
        copy[key] = deepCopy(obj[key], cache);
    });

    return copy;
}
/**
 * 防抖函数
 **/
const debounce = (fn, delay = 1000) => {
    let timer
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn()
        }, delay)
    }
}
/**导出**/
export default {
    deepCopy,
    debounce
}

