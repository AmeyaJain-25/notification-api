import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config';
import {
  ErrorsValidationInterface,
  SuccessResponseInterface,
} from '../interfaces/api';

class Api {
  baseURL!: string;

  constructor() {
    this.baseURL = config.API_BASE_URL;
  }

  _getAxiosInstance(baseURL: string): AxiosInstance {
    const axiosInstance = axios.create({
      baseURL: baseURL || this.baseURL,
    });

    axiosInstance.interceptors.response.use(
      async (
        response: AxiosResponse<SuccessResponseInterface, any>
      ): Promise<AxiosResponse<SuccessResponseInterface, any>> => {
        return response;
      },
      (error: any): Error | ErrorsValidationInterface => {
        if (error?.response) {
          if (!error?.response?.data?.success) {
            throw new Error(
              error.response.data?.message || 'Error! Please try again.'
            );
          }
        }
        throw new Error('Error! Please try again.');
      }
    );

    return axiosInstance;
  }

  _get = async (
    url: string,
    config?: AxiosRequestConfig<any>
  ): Promise<SuccessResponseInterface> => {
    const axiosInstance = this._getAxiosInstance(this.baseURL);
    const response = await axiosInstance.get(url, config);
    return response.data;
  };

  _post = async (
    url: string,
    data: any,
    config?: AxiosRequestConfig<any>
  ): Promise<SuccessResponseInterface> => {
    const axiosInstance = this._getAxiosInstance(this.baseURL);
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  };
}

const api = new Api();
const get = api._get;
const post = api._post;
export { get, post };
