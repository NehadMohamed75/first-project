import { AxiosError } from "axios";

interface HostError{
    error: string
}

class ApiError{
    message: string | null = null
    
    static from(error: AxiosError){
        console.log(error);
        
        return (error.response?.data as HostError).error
    }
}

export default ApiError