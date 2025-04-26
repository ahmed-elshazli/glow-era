import baseURL from "../Api/baseURL";

const useInsertDataWithImage = async (url, parmas) => { 
    const config = {
        headers:{"content-type":"multipart/form-data"}
    }
    const res = await baseURL.post(url, parmas, config);
    // console.log(res.status);
    return res;
}

const useInsertData = async (url, parmas) => { 
    const res = await baseURL.post(url, parmas);
    return res;
}

export {useInsertData, useInsertDataWithImage};