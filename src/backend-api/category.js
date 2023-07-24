import {backendApi} from "./backend-api"

export const category = (() =>{
    const test = (() => {
        return ""
    })

    const fetchCategory = ( async (subPath) => {
        var url = '/api/category'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeCategory = ( async (subPath, reqBody) => {
        var url = '/api/category/store'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateCategory = ( async (subPath, reqBody) => {
        var url = '/api/category/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    return {fetchCategory, storeCategory, updateCategory, test};

})()