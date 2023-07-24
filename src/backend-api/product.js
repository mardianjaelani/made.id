import {backendApi} from "./backend-api"

export const product = (() =>{
    const test = (() => {
        return ""
    })

    const fetchProduct = ( async (subPath) => {
        var url = '/api/product'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const searchProduct = ( async (subPath, reqBody) => {
        var url = '/api/product/search'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const storeProduct = ( async (subPath, reqBody) => {
        var url = '/api/product/store'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateProduct = ( async (subPath, reqBody) => {
        var url = '/api/product/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    return {fetchProduct, searchProduct, storeProduct, updateProduct};

})()