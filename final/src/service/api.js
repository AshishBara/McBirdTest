import axios from "axios";

const baseURL = "https://dev.api.klaim.yousted.org/api";

const token = "9ee2a77e8ce49c20bfc020303ebacb58a1ccf26248862bc0726f6fbc361f8f28"


export const sendSystemDetails = async (body) => {
    try {
        return await axios.post(`${baseURL}/visitor/store`, body, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log("Error while calling sendSystemDetails api", error)
    }
}



export const submit = async (body) => {
    try{
        return await axios.post(`${baseURL}/user/store`, body, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }catch(error) {
        console.log("Error while calling submit api", error)
    }
}


export const addressSubmit = async (body) => {
    try{
        return await axios.post(`${baseURL}/prev-user/store`, body, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }catch(error) {
        console.log("Erro while calling addressSubmit api", error)
    }
}


export const duplicate = async (body) => {
    try{
        return await axios.post(`${baseURL}/duplicate-check`, body, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }catch(error) {
        console.log("Erro while calling addressSubmit api", error)
    
    }
}