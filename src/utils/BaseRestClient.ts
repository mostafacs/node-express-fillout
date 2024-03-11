
import {logger} from '../utils/logger';
import axios, {AxiosRequestConfig, AxiosResponse } from 'axios';
export default class BaseRestClient {

    baseUrl: string;
    constructor(baseUrl: string, apiKey: string) {
        this.baseUrl = baseUrl;
        axios.interceptors.request.use(function (config) {
            if(config.url?.startsWith(baseUrl)) {
                config.headers.set('Authorization', 'Bearer '+ apiKey);
            }
            return config;
        }, function (error) {
            logger.error(error);
            return Promise.reject(error);
        });

    }

    // @ts-ignore
    get<R>(path: string, params?: any): Promise<axios.AxiosResponse<T>>{
        return axios.get<R>(this.baseUrl + path, {params});
    }
    // @ts-ignore
    async post<R>(path: string, data: any, config?: AxiosRequestConfig): AxiosResponse<R>{
        return await axios.post<R>(this.baseUrl + path, config);
    }

    // @ts-ignore
    async put<R>(path: string, data: any, config?: AxiosRequestConfig): AxiosResponse<R>{
        return await axios.put<R>(this.baseUrl + path, data, config);
    }
}