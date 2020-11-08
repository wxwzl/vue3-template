import axios from "axios";
import { Message } from "element-ui";
import ResponseHelper from "@/dataTypes/impl/ResponseHelper";
import { IResponse } from "@/dataTypes/interface/responseHelper";
import { extend } from "@utils/commonUtil";
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000, // request timeout
});

// 请求拦截
// request interceptor
service.interceptors.request.use(
  (config: any) => {
    // do something before request is sent
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json;charset=UTF-8";
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(ResponseHelper.getResponseFromError(error));
  }
);
// 响应拦截
// response interceptor
service.interceptors.response.use(
  (response: any) => {
    const res = ResponseHelper.getResponse(response);
    if (ResponseHelper.isSuccess(response)) {
      return res;
    } else {
      return Promise.reject(res);
    }
  },
  (error: any) => {
    return Promise.reject(ResponseHelper.getResponseFromError(error));
  }
);

function handleErrorMessage(message: string): void {
  Message.error(message);
}

// export default service;
export function request(option: Record<string | number, any>): Promise<IResponse> {
  return service(option)
    .then(
      (res: IResponse): Promise<IResponse> => {
        if (option.validator && option.validator(res) != true) {
          return Promise.reject(res);
        }
        return Promise.resolve(res);
      }
    )
    .catch(
      (err: IResponse): Promise<IResponse> => {
        if (option.ignoreError != true) {
          const message = err.message;
          handleErrorMessage(message);
        }
        return Promise.reject(err);
      }
    );
}

export function get(
  url: string,
  data?: any,
  config?: Record<string | number, any>
): Promise<IResponse> {
  const option = {
    url,
    method: "get",
    params: data || {},
  };
  extend(option, config);
  return request(option);
}

export function post(
  url: string,
  data?: any,
  config?: Record<string | number, any>
): Promise<IResponse> {
  const option = {
    url,
    method: "post",
    data: data || {},
  };
  extend(option, config);
  return request(option);
}

export function put(
  url: string,
  data?: any,
  config?: Record<string | number, any>
): Promise<IResponse> {
  const option = {
    url,
    method: "put",
    data: data || {},
  };
  extend(option, config);
  return request(option);
}

export function del(
  url: string,
  data?: any,
  config?: Record<string | number, any>
): Promise<IResponse> {
  const option = {
    url,
    method: "delete",
    data: data || {},
  };
  extend(option, config);
  return request(option);
}

export function patch(
  url: string,
  data?: any,
  config?: Record<string | number, any>
): Promise<IResponse> {
  const option = {
    url,
    method: "patch",
    data: data || {},
    headers: { "Content-Type": "x-www-form-urlencoded" },
  };
  extend(option, config);
  return request(option);
}
