import {useState} from "react";
import {AxiosError, AxiosResponse} from "axios";

export const useFetching = (callback: (...props: any) => Promise<AxiosResponse>):
    [
        (...props: any) => Promise<AxiosResponse<any, any> | undefined>,
        boolean,
    ] => {
    const [isLoading, setIsLoading] = useState(false);


    const fetching = async () => {
        try {
            setIsLoading(true);
            return await callback();
        }
        catch (e) {
        if (e instanceof AxiosError) {
            return e.response;
        }
        }
        finally {
            setIsLoading(false);
        }
    }
    return [fetching, isLoading];
}