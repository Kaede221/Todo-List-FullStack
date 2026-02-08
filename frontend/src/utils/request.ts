import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export interface ApiResponse<T = unknown> {
  id: number;
  msg: string;
  data: T;
}

class Request {
  private instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => res.data,
      (err: unknown) => Promise.reject(err),
    );
  }

  get<T>(
    url: string,
    params?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.instance.get(url, { ...config, params });
  }

  post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.instance.post(url, data, config);
  }

  put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.instance.put(url, data, config);
  }

  delete<T>(
    url: string,
    params?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.instance.delete(url, { ...config, params });
  }
}

const request = new Request({
  baseURL: "http://127.0.0.1:8080",
  timeout: 5000,
});

export default request;
